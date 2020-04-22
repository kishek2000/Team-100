# Run this file directly to generate shows.p
# (neccessary for reviews functionality)

import os
import requests
import gzip
import csv
import pickle
import json
import time

try:
    from .definitions import tmdbToImdb
except ModuleNotFoundError:
    from definitions import tmdbToImdb

# Debug Options
KEEP_SOURCE_FILES = False  # Delete source files after when false
# MUST BE TRUE unless you already have reviews.tsv and episodes.tsv
FORCE_RENEW_SOURCE_FILES = True


def relPath(filename):
    data = os.path.join(os.path.split(__file__)[0], "data")
    return os.path.join(data, filename)


# Constants
REVIEW_FILE = relPath('reviews.tsv')
EPISODE_FILE = relPath('episodes.tsv')
SHOWS_FILE = relPath('episode_collections.p')
TITLES_FILE = relPath('titles.p')
MISSING_RATING = -1

# Returns episode ratings for a shows imdb/tmdb id


def tv_collection_ratings(id):
    # Returned obj will contain an ordered list of seasons,
    # within each of which is an ordered list of episodeObject's
    # episodeObject is of format {
    #   'ttID': str
    #   'season': int
    #   'ep': int
    #   'rating': int
    # }

    # Converts from tmdb ID if needed
    if (id[0] != "t"):
        ttID = tmdbToImdb(id, 'tv')
    else:
        ttID = id

    try:
        return seasons_list(shows[ttID])
    except KeyError:
        return []

# Returns imdb rating for given ID


def title_rating(id, media):
    # Convert tmdb ID -> imdb ID if needed
    if (id[0] != "t"):
        ttID = tmdbToImdb(id, mediaType=media)
    else:
        ttID = id

    try:
        return titles[ttID]
    except KeyError:
        return None

# Take in a list of episodes and sort them into ordered seasons


def seasons_list(episodes):
    # Get max season
    maxSeason = 0
    for ep in episodes:
        if ep['season'] > maxSeason:
            maxSeason = ep['season']

    # Sort episodes into seasons
    seasons = [[] for i in range(maxSeason)]
    for ep in episodes:
        seasons[ep['season'] - 1].append(ep)

    # Sort each season by episode number
    for season in seasons:
        season.sort(key=lambda ep: ep['ep'])

    return seasons

# Downloads url, unzips and writes to out


def get_tsv(url, out):
    # Download and unzip file
    print("Accessing", url)
    r = requests.get(url)
    print("Decompressing...")
    data = gzip.decompress(r.content).decode('utf8')
    with open(out, 'w') as f:
        f.write(data)


# Strips t's from imdb IDs, no conversion
def tt_strip(ttid):
    return ttid[2:]


# Generate dict mapping imdb show IDs to episodes (with ratings)
def generate_shows():
    with open(EPISODE_FILE) as eptsv, open(REVIEW_FILE) as revtsv:
        # Open both files into a reader
        epReader = csv.DictReader(eptsv, dialect='excel-tab')
        revReader = csv.DictReader(revtsv, dialect='excel-tab')
        shows = {}
        currRev = next(revReader)
        # Iterate through both simultaneously, matching reviews to episodes, and compiling episode lists
        # both files are sorted by ascending ALPHANUMERIC tconst
        # (O(n + m)) -> n lines in review file, m lines in episode file (probably)
        reviewID = '0'
        reviewsFound = 0
        reviewsLeft = True
        for ep in epReader:
            epID = tt_strip(ep['tconst'])
            # Get corresponding review if possible
            while reviewID < epID and reviewsLeft:
                try:
                    currRev = next(revReader)
                    reviewID = tt_strip(currRev['tconst'])
                except StopIteration:
                    # No more reviews
                    currRev = None
                    reviewID = '0'
                    reviewsLeft = False
                    break

            # Create episode object
            try:
                epObj = {
                    'ttID': ep['tconst'],
                    'season': int(ep['seasonNumber']),
                    'ep': int(ep['episodeNumber']),
                    'rating': MISSING_RATING
                }
            except ValueError:
                # Exclude episodes missing an episode or season number
                continue

            # Check for review
            if (reviewID == epID):
                reviewsFound += 1
                #print("Review found", currRev['averageRating'])
                # Review found, update epObj
                epObj['rating'] = float(currRev['averageRating'])

            # Check if parentID exists in shows
            if ep['parentTconst'] not in shows.keys():
                # Create episode list
                shows[ep['parentTconst']] = []

            # Append episode list
            shows[ep['parentTconst']].append(epObj)
        print(reviewsFound, "reviews found")
    return shows

# Generates a hash map (dict) from imdb ID to rating


def generate_titles():
    # Open review file, create title -> review mapping
    with open(REVIEW_FILE) as f:
        titles = {}
        reader = csv.DictReader(f, dialect='excel-tab')
        for row in reader:
            titles[row['tconst']] = float(row['averageRating'])

    return titles


def generate_db():
    if FORCE_RENEW_SOURCE_FILES:
        # Refreshes ratings and episode database
        print('Beginning file download with requests')

        reviews_url = 'https://datasets.imdbws.com/title.ratings.tsv.gz'
        episode_url = 'https://datasets.imdbws.com/title.episode.tsv.gz'

        get_tsv(reviews_url, REVIEW_FILE)
        get_tsv(episode_url, EPISODE_FILE)

    print("Compiling episodes into show collections, this may take a minute...")
    # Pre-processes the whole lot into show groups
    shows = generate_shows()
    print(len(shows.keys()), "shows compiled")
    # Dump to pickle
    print("Pickling...")
    pickle.dump(shows, open(SHOWS_FILE, "wb"))

    # Generate overall ratings for shows, reviews for movies
    print("Generating title rating lookup, this may take a minute...")
    titles = generate_titles()
    pickle.dump(titles, open(TITLES_FILE, "wb"))

    if not KEEP_SOURCE_FILES:
        os.remove(REVIEW_FILE)
        os.remove(EPISODE_FILE)


# When run directly, updates imdb database
if __name__ == "__main__":
    generate_db()

# This code is executed on startup
# Loads reviews into memory to cut down response times (will use 1GB RAM, but eliminates response time almost completely)
try:
    print("Loading reviews...", end=" ")
    shows = pickle.load(open(SHOWS_FILE, "rb"))
    titles = pickle.load(open(TITLES_FILE, "rb"))
    print("Finished")
except FileNotFoundError:
    print("missing reviews database")
    print("--- PERFORMING FIRST TIME DATABASE SETUP (should take 3-4 mins) ---")
    generate_db()
    print("Loading reviews...", end=" ")
    shows = pickle.load(open(SHOWS_FILE, "rb"))
    titles = pickle.load(open(TITLES_FILE, "rb"))
    print("Finished")

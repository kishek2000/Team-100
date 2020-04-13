#Run this file directly to generate shows.p
# (neccessary for reviews functionality)

import requests
import gzip
import csv
import pickle
import json
import os
import time

#Debug Options
KEEP_SOURCE_FILES = False #Delete source files after when false
FORCE_RENEW_SOURCE_FILES = True #MUST BE TRUE unless you already have reviews.tsv and episodes.tsv

#Constants
REVIEW_FILE = 'reviews.tsv'
EPISODE_FILE = 'episodes.tsv'
SHOWS_FILE = 'shows.p'
MISSING_RATING = -1

#Returns episodes and ratings for a show
def tv_collection_ratings(ttID):
    shows = pickle.load(open(SHOWS_FILE, "rb"))
    return shows[ttID]


#Downloads url, unzips and writes to out
def get_tsv(url, out):
    #Download and unzip file
    print("Accessing", url)
    r = requests.get(url)
    print("Decompressing and writing", out)
    data = gzip.decompress(r.content).decode('utf8')
    with open(out, 'w') as f:
        f.write(data)


#Strips t's from imdb IDs, no conversion
def tt_strip(ttid):
    return ttid[2:]


#Generate dict mapping imdb show IDs to episodes (with ratings)
def generate_shows():
    with open(EPISODE_FILE) as eptsv, open(REVIEW_FILE) as revtsv:
        #Open both files into a reader
        epReader = csv.DictReader(eptsv, dialect='excel-tab')
        revReader = csv.DictReader(revtsv, dialect='excel-tab')
        shows = {}
        currRev = next(revReader)
        #Iterate through both simultaneously, matching reviews to episodes, and compiling episode lists 
        # both files are sorted by ascending ALPHANUMERIC tconst
        # (O(n + m)) -> n lines in review file, m lines in episode file (probably)
        reviewID = '0'
        reviewsFound = 0
        reviewsLeft = True
        for ep in epReader:
            epID = tt_strip(ep['tconst'])
            #Get corresponding review if possible
            while reviewID < epID and reviewsLeft:
                try:
                    currRev = next(revReader)
                    reviewID = tt_strip(currRev['tconst'])
                except StopIteration:
                    #No more reviews
                    print("No more reviews, currently {0} shows".format(len(shows.keys())))
                    currRev = None
                    reviewID = '0'
                    reviewsLeft = False
                    break
                
            
            #Create episode object
            try:
                epObj = {
                    'ttID': ep['tconst'],
                    'season': int(ep['seasonNumber']),
                    'ep': int(ep['episodeNumber']),
                    'rating': MISSING_RATING
                }
            except ValueError:
                #Exclude episodes missing an episode or season number
                continue

            #Check for review
            if (reviewID == epID):
                reviewsFound += 1
                #print("Review found", currRev['averageRating'])
                #Review found, update epObj
                epObj['rating'] = float(currRev['averageRating'])

            #Check if parentID exists in shows
            if ep['parentTconst'] not in shows.keys():
                #Create episode list
                shows[ep['parentTconst']] = []
                #print("Created...", ep['parentTconst'] + ", show #" + str(len(shows.keys())))
            
            #Append episode list
            shows[ep['parentTconst']].append(epObj)
        print("#reviews found:", reviewsFound)
    return shows


if __name__ == "__main__":
    if FORCE_RENEW_SOURCE_FILES:
        #Refreshes ratings and episode database
        print('Beginning file download with requests')

        reviews_url = 'https://datasets.imdbws.com/title.ratings.tsv.gz'
        episode_url = 'https://datasets.imdbws.com/title.episode.tsv.gz'

        get_tsv(reviews_url, REVIEW_FILE)
        get_tsv(episode_url, EPISODE_FILE)

    print("Compiling episodes into show collections, this may take a minute...")
    #Pre-processes the whole lot into show groups
    shows = generate_shows()
    print(len(shows.keys()), "shows compiled")

    if not KEEP_SOURCE_FILES:
        os.remove(REVIEW_FILE)
        os.remove(EPISODE_FILE)

    #Dump to pickle
    print("Pickling...")
    pickle.dump(shows, open(SHOWS_FILE, "wb" ))


    t1 = time.time()
    #Example usage
    print(tv_collection_ratings('tt0369179')) # two and a half men
    print("retrieval time:", 1000* (time.time() - t1), "ms")
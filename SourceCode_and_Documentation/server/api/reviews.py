import requests
import gzip
import csv

REVIEW_FILE = 'reviews.tsv'
EPISODE_FILE = 'episodes.tsv'
FETCH_NEW = False

def get_tsv(url, out):
    #Download and unzip file
    print("Accessing", url)
    r = requests.get(url)
    print("Decompressing and writing", out)
    with open(out, 'wb') as f:
        f.write(gzip.decompress(r.content))
    
    return

#Takes in an id and binary search to find its corresponding review
def find_review(n, reviews):
    min = 0
    max = len(reviews)
    while (min != max):
        mid = (max + min) // 2 #rounds down
        if n > reviews[mid][0]:
            min = mid
        elif n < reviews[mid][0]:
            max = mid
        else:
            #We found it
            return reviews[mid][1]
    return None


def get_episodes(id):

    with open(EPISODE_FILE) as tsvfile:
        reader = csv.DictReader(tsvfile, dialect='excel-tab')
        episodes = []
        for row in reader:
            if (row['parentTconst'] == id):
                try:
                    episodes.append({'id': row['tconst'], 
                            'season': int(row['seasonNumber']), 
                            'episode': int(row['episodeNumber'])})
                except TypeError:
                    print(row['tconst'])
                    pass
    
    return episodes
        
def get_ratings(episodes):

    with open(REVIEW_FILE) as tsvfile:
        reader = csv.DictReader(tsvfile, dialect='excel-tab')

        #Compile reader into a list of tuples (id, rating)
        reviews = []
        for line in reader:
            reviews.append((int(line['tconst'][2:]), line['averageRating'])) #Converts id from 'ttXXXXXX' to 'XXXXXX'
        
        #Binary search for each episodes review
        for episode in episodes:
            review = find_review(episode['tconst'], reviews)
            try:
                episode['review'] = int(review)
            except TypeError:
                episode['review'] == -1    
    
    return episodes




if __name__ == "__main__" and FETCH_NEW == True:
    #Refreshes ratings and episode database
    print('Beginning file download with requests')

    reviews_url = 'https://datasets.imdbws.com/title.ratings.tsv.gz'
    episode_url = 'https://datasets.imdbws.com/title.episode.tsv.gz'

    get_tsv(reviews_url, REVIEW_FILE)
    get_tsv(episode_url, EPISODE_FILE)


episodes = get_episodes('tt0096697')
episodes = get_ratings(episodes)

print(len(episodes), episodes[0])
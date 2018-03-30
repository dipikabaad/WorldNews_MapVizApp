import json
import geopy
from geopy.distance import VincentyDistance
import random
news_file_name = 'C:\\Dipika\\Eindhoven\\Quater 3\\VCP\\NewsApp\\WorldNews_MapVizApp\\news_cat_classify\\outs\\combined.txt'

news_file=json.load(open(news_file_name))

i = 0
all_posts=[]

labels = [5,4,5,5,4,5,1,2,4,5,1,2,3,2,1,2,3,5,3,1,1,2,1,1,3,3,1,1,1,3,2,2,1,2,1,2,2,1,2,2,5,5,1,2,2,2,5,5,1,3,2,1,3,1,5,1,1,5,2,1,1,5,5,4,5,4,3,4,4,4,5,5,5,2,5,4,5,1,2,1,2,5,2,4,1,4,5,2,4,3,3,4,5,3,2,3,1,1,2,2,2,5,1,1,2,1,3,1,1,1,2,3,3,1,1,1,4,1,2,1,1,3,4,5,1,1,5,4,1,3,3,1,5,1,4,2,2,4,2,2,2,2,2,2,2,3,1,1,1,5,3,5,1,5,4,1,5,4,3,3,4,5,2,2,4,1,2,3,4,1,2,3,4,5,2,5,1,2,3,3,2,4,1,2,1,1,4,1,5,1,1,5,1,1,3,3,4,2,2,3,3,3,3,3,1,1,1,1,3,3,1,2,2,1,3,2,1,5,1,1,2,5,2,2,2,2,5,1,1,3,1,2,3,1,3,5,3,2,2,2,2,2,2,3,3,5,5,2,5,1,5,1,3,3,1,1,3,2,2,3,2,2,3,4,2,2,2,2,2,4,2,5,2,2,5,3,4,3,3,3,1,3,1,1,1,3,3,3,3,3,1,1,1,3,1,3,3,1,3,3,3,3,3,4,3,1,4,2,3,4,4,5,1,1,4,3,2,1,1,1,1,1,1,1,1,1,1,1,2,2,3,2,5,3,3,1,3,5,1,1,1,4,4,2,3,3,4,1,2,3,1,4,3,3,3,1,3,3,3,3,1,1,2,4,2,2,4,4,1,4,2,4,1,2,4,2,2,4,4,2,4,2,4,3,4,4,4,2,4,3,3,2,2,2,5,3,2,4,2,1,4,3,3,2,5,3,3,4,2,4,2,4,4,4,2,4,4,4,2,4,1,1,4,1,1,4,4,5,3,3,2,2,2,2,2,3,2,2,3,3,3,1,1,1,1,1,1,1,5,1,2,2,3,2,2,1,1,3,3,2,4,5,1,5,1,1,1,5,5,1,1,1,2,1,1,3,1,3,3,3,1,3,3,5,1,3,3,1,2,3,5,4,1,1,3,3,3,5,2,5,2,2,1,5,4,2,2,2,2,2,1,2,2,3,1,2,1,2,3,3,4,4,2,2,5,1,3,5,2,3,1,4,3,2,3,2,2,2,3,2,1,1,5,1,1,5,5,1,3,5,1,2,3,1,1,1,1,3,2,1,1,1,1,1,1,3,4,3,3,2,2,1,2,4,3,3]

bbc_news_categories = {
    1:'business',
    2:'entertainment',
    3:'politics',
    4:'sport',
    5:'tech'
}

las = [(51.487941, 75.225694),(51.150431, 70.946143),(49.737285, 70.122169),(49.652006, 70.363868),(52.056300, 73.253726),
(50.981354, 69.685916),(49.554181, 74.651736)]
dist_1 = []
j=0
for country in news_file:
    c_posts = country['posts']
    location = country['extra']
    dist1 = []
    dist1 = random.sample(range(5, 50), len(c_posts))
    k = 0	
    for post in c_posts:
        if k == 0:
            origin = geopy.Point(location['lat'], location['lng'])
            destination = origin
        else:
            destination = VincentyDistance(kilometers=dist1[k]).destination(origin, k*30)
        k += 1
        category = bbc_news_categories[int(labels[i])]
        i += 1
		#print("INDEX",i,"CATEGORY",category)
        post['index'] = i
        loc_info = {} 
        post['category'] = category
        '''if location['country']=='KZ':
            loc_info['lat'] = las[j][0]
            loc_info['lng'] = las[j][1]
            
            j=j+1
        else:'''
        loc_info['lat'] = destination.latitude
        loc_info['lng'] = destination.longitude
        loc_info['country'] = location['country']
        post['loc_info'] = loc_info
        if location['country'] == 'KZ':
            print(post['loc_info'],loc_info)
        if location['country'] == "IS":
            continue
        all_posts.append(post)
       
#for post in all_posts:
    

with open('C:\\Dipika\\Eindhoven\\Quater 3\\VCP\\NewsApp\\WorldNews_MapVizApp\\dist\\all_data.json','w') as outfile:
	json.dump(all_posts, outfile) 

with open('C:\\Dipika\\Eindhoven\\Quater 3\\VCP\\NewsApp\\WorldNews_MapVizApp\\dist\\all_data.json','r') as infile:
    postss=json.load(infile)
    print(len(postss))
    
    for p in postss:
        if p['loc_info']['country'] == 'KZ':
            print(p['loc_info'])

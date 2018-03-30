import json
import geopy
from geopy.distance import VincentyDistance

news_file_name = './outs/combined.txt'

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

las = [(50.534827, 72.720889),(51.103963, 72.874697),(52.211403, 71.408023),(51.820935, 70.034732),(52.056300, 73.253726),
(50.981354, 69.685916),(49.554181, 74.651736)]

j=0
for country in news_file:
	
	c_posts = country['posts']
	location = country['extra']
	
	k = 0	
	for post in c_posts:
		if k == 0:
			origin = geopy.Point(location['lat'], location['lng'])
			destination = origin
		else:
			destination = VincentyDistance(kilometers=100).destination(origin, k*50)
		k += 1
		category = bbc_news_categories[int(labels[i])]
		i += 1
		#print("INDEX",i,"CATEGORY",category)
		post['index'] = i
		post['category'] = category
		if location['country']=='KZ':
			location['lat'] = las[j][0]
			location['lng'] = las[j][1]
			j=j+1
		else:
			location['lat'] = destination.latitude
			location['lng'] = destination.longitude
		post['loc_info'] = location
		if location['country'] == 'KZ':
			print(location)	
		all_posts.append(post)


with open('../WorldNews_MapVizApp/dist/all_data.json','w') as outfile:
	json.dump(all_posts, outfile) 	

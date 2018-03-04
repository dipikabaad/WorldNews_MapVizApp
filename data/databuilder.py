import json
from random import randint
import numpy as np

f1 = open('cities.json').read()
f1_data = json.loads(f1)

#positions = [[point['latitude'],point['longitude']] for point in f1_data]

positions=[]
unique = {}
for point in f1_data:
	key = str(point['latitude']).strip()+';;'+str(point['longitude']).strip()
	if key == '47.6062095;;-122.3320708':
		print("YES")
	if key in unique:
		continue
	else:
		unique[key] = 1
		positions.append([point['latitude'],point['longitude']])


arr = np.array(positions)

unique, counts = np.unique(arr, return_counts=True)
 

for i in counts:
	if i!=1:
		print("Error")


"""i=0
positions=[]
for line in f1:
	if i==0:
		i +=1
		continue
	if len(positions)>101:
		break
	points = line.strip().split(',')
	print(type(points))
	positions.append(points[1:])
	i += 100"""
	
print(len(positions))


all_articles = []

j=0

def read_data(category):
	global j
	filename = 'us_'+category+'.json'
	f2_b = open(filename).read()
	data_b = json.loads(f2_b)
	articles = data_b['articles']

	for article in articles:
		point = positions[(j+1)]
		j = j+1		
		article['lat']=point[0]
		article['lng']=point[1]
		article['category']=category
		all_articles.append(article)
		



read_data('business')
read_data('sports')
read_data('technology')
read_data('general')
read_data('entertainment')

print(len(all_articles),all_articles[0])


with open('../dist/data.json','w') as outfile:
	json.dump(all_articles,outfile)

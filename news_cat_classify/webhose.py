import webhoseio
import json
import time

webhoseio.config(token="e0e8b2b9-80ce-4cdc-bde9-b730ada6c3f9")

f1 = open('cities_code_latlng.csv')

locs = []
i= 0
for l in f1:
	#print(l)
	if i==0:
		i=1
		continue
	ls = l.strip().split(',')
	#print(ls)
	#print(ls[0])
	#print(ls[2])
	locs.append((ls[1],ls[2],ls[3],ls[4]))

#print(locs[0])
def get_data(place,country,lat,lng):
	print(place,country)
	query_params = {
		"q": "language:english site_type:news thread.country:{} location:{}".format(country,place),
		"sort": "relevancy",
		"size":10
	}

	output = webhoseio.query("filterWebContent", query_params)
	output["extra"]={"place":place,"country":country,"lat":lat,"lng":lng}
	print("LLLLLLLLLLLLLLL",len(output['posts']))	
	f = open("./outs/"+place+"_"+country,"w")
	f.write(json.dumps(output))
	#print(json.dumps(output))
	#print(output['posts'][0]['text']) # Print the text of the first post
	#print output['posts'][0]['published'] # Print the text of the first post publication date

	# Get the next batch of posts
	#output = webhoseio.get_next()
	#print output['posts'][0]['thread']['site'] # Print the site of the first post

	time.sleep(10)
	f.close()

for loc in locs:
	get_data(*loc)
	#break

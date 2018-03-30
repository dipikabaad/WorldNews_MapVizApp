import json


data = json.load(open('./data.txt'))

posts = data['posts']

i = 1

for post in posts:
	title = post['title']
	desc = post['text']

	text = title + '\n' + desc

	f = open("test_"+str(i),"w")
	f.write(text)
	f.close()
	i += 1

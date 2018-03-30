import webhoseio
import asyncio
import aiohttp
import urllib.parse

webhoseio_token="e0e8b2b9-80ce-4cdc-bde9-b730ada6c3f9"


base_url = 'http://webhose.io/filterWebContent?'

async def get_data(session,place, country):


	q = {
		"language":"english",
		"site_type":"news",
		"location":place,
		"thread.country":country,
        	"sort": "relevancy"
	}

	urlencoded = urllib.parse.urlencode(q)
	urlencoded = urlencoded.replace('=',':')
	urlencoded = urlencoded.replace('&',"%20")

	print("BEFORE", urlencoded)
	#urlencoded = urllib.parse.urlencode(urlencoded)

	query_params = {
		"token":webhoseio_token,
		"format":"json",
		"q":urlencoded 
	}

	url = base_url+"token={}&format=json&q={}".format(webhoseio_token,urlencoded)
	url = url.replace(':','%3A').replace('+','%20')
	print(url)
	#return
 
	output = await session.get(url)
	print(await output.text())
	#output_data = await output.json()
	#print(len(output_data['posts']))
	#print(output['posts'][0]['title']) # Print the text of the first post
	#print(output['posts'][0]['published']) # Print the text of the first post publication date
    
	# Get the next batch of posts
	#output = webhoseio.get_next()
	# Print the title of the first post
	#print(len(output['posts']))
	#print(output['posts'][0]['title'])
	return True

locations = [('san francisco','US')]

#futures = [get_data(*location) for location in locations]

async def main():
	returns = []
	async with aiohttp.ClientSession() as session:
		for location in locations:
			returned = await get_data(session,*location)
			returns.append(returned)
loop = asyncio.get_event_loop()
loop.run_until_complete(main())

import requests
import urllib.request, urllib.parse
from bs4 import BeautifulSoup
import wikipedia


query = input()
response = requests.get(wikipedia.page(query).url)
src = response.content

soup = BeautifulSoup(src, "lxml")

base = 'https://en.wikipedia.org'
links = soup.select("p a[href*=wiki]") # only part of html wanted

# Json info going to input into db
json_db = {}
json_db.setdefault('name', query)
# json_db.setdefault('content', wikipedia.summary(query))
json_db.setdefault('url', wikipedia.page(query).url)
children = []

for i in range(3):
    url = urllib.parse.urljoin(base, links[i]['href'])
    title = url.split('/')[-1]
    # content = wikipedia.summary(title)

    child_dict.setdefault("name", title)
    # child_dict.setdefault("content", content)
    child_dict.setdefault("url", url)
    child_dict.setdefault('children', [])
    children.append(child_dict)
    
json_db.setdefault('children', children)

print(json_db)

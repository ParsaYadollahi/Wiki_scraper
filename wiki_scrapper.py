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
content = wikipedia.summary(query).split('.')
desc = ''
for c in range(3):
    desc += content[c] + '.'

json_db.setdefault('content', desc)
json_db.setdefault('url', wikipedia.page(query).url)
children = []

# add children to root
for i in range(3):
    child_dict = {}
    url = urllib.parse.urljoin(base, links[i]['href'])
    title = url.split('/')[-1]
    content = wikipedia.summary(title)
    content = content.split('.')
    decr = ''
    for c in range(3):
        decr += content[c] + '.'

    child_dict.setdefault("name", title)
    child_dict.setdefault("content", decr)
    child_dict.setdefault("url", url)
    child_dict.setdefault('children', [])
    children.append(child_dict)
    
json_db.setdefault('children', children)

print(json_db)

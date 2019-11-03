import requests
import urllib.request, urllib.parse
import time
from bs4 import BeautifulSoup
import wikipedia

query = input()
wp = wikipedia.page(query).url
url = wp
response = requests.get(url)
src = response.content

soup = BeautifulSoup(src, "lxml")

base = 'https://en.wikipedia.org'
links = soup.select("p a[href*=wiki]")
for i in range(5):
    url = urllib.parse.urljoin(base, links[i]['href'])
    title = url.split('/')[-1]
    print(title + ' - ' + url)
import requests
import urllib.request, urllib.parse
import time
from bs4 import BeautifulSoup
import wikipedia
import json

class scrapperWiki():

    base = 'https://en.wikipedia.org'

    def __init__(self, name):
        self.name = name
        self.content = self.setContent(name)
        self.children = self.setChildren()
    
    def setContent(self, name):
        response = requests.get(wikipedia.page(name).url)
        content = response.content
        return content

    def setChildren(self):
        soup = BeautifulSoup(self.content, "lxml")
        links = soup.select("p a[href*=wiki]") # only the part of the entire html page we want
        # Json info going to input into db
        json_db = {}
        urls = json_db.setdefault('children', {})

        for i in range(2):
            url = urllib.parse.urljoin(self.base, links[i]['href'])
            title = url.split('/')[-1]
            urls.setdefault(title, url)
        
        return json.dumps(json_db)
    
    def getUrl(self):
        print(self.base+'/'+self.name)
        return str(self.base+'/'+self.name)
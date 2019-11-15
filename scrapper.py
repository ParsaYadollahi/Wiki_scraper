import requests
import urllib.request, urllib.parse
import time
from bs4 import BeautifulSoup
import wikipedia
import json

class scrapperWiki():

    base = 'https://en.wikipedia.org/wiki'

    def __init__(self, name):
        self.name = name
        self.content = self.setContent(name)
        self.soup = BeautifulSoup(self.content, "lxml")
        self.paragraph = self.setParagraph()
        self.url = self.getUrl()
        self.children = self.setChildren()
        self.full = self.getFull()
        
    
    def setContent(self, name):
        response = requests.get(wikipedia.page(name).url)
        return response.content
            
    def setParagraph(self):
        paragraph = wikipedia.summary(self.name).split('.')
        desc = ''
        for c in range(3):
            desc += paragraph[c] + '.'
        return desc

    def getUrl(self):
        return str(self.base+'/'+self.name)

    def setChildren(self):

        links = self.soup.select("p a[href*=wiki]")
        children = []

        for i in range(3):
            child_dict = {}
            url = urllib.parse.urljoin(self.base, links[i]['href'])
            title = url.split('/')[-1]
            content = wikipedia.summary(title)
            content = content.split('.')
            decr = ''
            for c in range(3):
                decr += content[c] + '.'

            child_dict.setdefault('name', title)
            child_dict.setdefault('content', decr)
            child_dict.setdefault('url', url)
            child_dict.setdefault('children', [])
            children.append(child_dict)
        
        return children

    def getFull(self):
        json_db = {}
        json_db.setdefault('name', self.name)
        json_db.setdefault('url', self.url)
        json_db.setdefault('content', self.paragraph)
        json_db.setdefault('children', self.children)
        return json_db
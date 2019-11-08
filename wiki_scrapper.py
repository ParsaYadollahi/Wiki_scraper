import requests
import urllib.request, urllib.parse
import time
from bs4 import BeautifulSoup
import wikipedia
import pydot
from IPython.display import Image, display

query = input()
response = requests.get(wikipedia.page(query).url)
src = response.content

soup = BeautifulSoup(src, "lxml")

base = 'https://en.wikipedia.org'
links = soup.select("p a[href*=wiki]") # only the part of the entire html page we want

# Json info going to input into db
json_db = {}
json_db.setdefault('Source', query)
urls = json_db.setdefault('Destination', {})

for i in range(5):
    url = urllib.parse.urljoin(base, links[i]['href'])
    title = url.split('/')[-1]
    urls.setdefault(title, url)

print(json_db)


####
# graph 1
####
graph1 = pydot.Dot(graph_type='digraph') # create graph obj
root = pydot.Node(url.split('/')[-1])
graph1.add_node(root) # add root node
for v in urls: # add children (not url but name of wiki content)
    node = pydot.Node(v.split('/')[-1], style="filled", fillcolor="green")
    graph1.add_node(node)
    graph1.add_edge(pydot.Edge(root,node))

####
# graph 2
####

graph2 = pydot.Dot(graph_type='digraph')
root = pydot.Node(5)
graph2.add_node(root)
for i in range(3):
    node = pydot.Node(i, style='filled', fillcolor='blue')
    graph2.add_node(node)
    graph2.add_edge(pydot.Edge(root, node))

####
# Merge Graph 1 & 2 into 3
####
graph3 = pydot.Dot(graph_type='digraph')
for node in graph1.get_nodes(): # add nodes to graph 3
    graph3.add_node(node)
for node in graph2.get_nodes():
    graph3.add_node(node)
for edge in graph1.get_edges(): # add edges to graph 3
    graph3.add_edge(edge)
for edge in graph2.get_edges():
    graph3.add_edge(edge)

# display(Image(graph3.create_png())) -> Display the graph

# link the root and children of graph 1 and graph 2
source = graph1.get_node(graph1.get_edges()[0].get_destination())[0]
dest = graph2.get_node(graph2.get_edges()[0].get_source())[0]

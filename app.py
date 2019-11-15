from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from random import randint
from scrapper import scrapperWiki
import json

app = Flask(__name__)
db = SQLAlchemy(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://nikolai:kevin1234@scrapeitup-db.cfedpg5iwaqw.us-east-1.rds.amazonaws.com:5432/postgres"
app.debug = True

if __name__ == '__main__':
    app.run(host='127.0.0.1',port=5000)

class node(db.Model):
    __tablename__ = 'nodetable'
    pkey = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text())
    url = db.Column(db.Text())
    parent = db.Column(db.Integer)
    content = db.Column(db.Text())    

    def __init__(self, pkey, name, url, parent, content):
        self.pkey = pkey
        self.name = name
        self.url = url
        self.parent = parent
        self.content = content

@app.route('/')
def index():
    return render_template('index.html'),
    

@app.route('/submit', methods=['POST'])
def submitNode():
    if request.method ==  'POST':
        
        parentKey = 0
        req_data = request.get_json(silent=True)
        print(req_data)
        name = req_data['name']
        worker = scrapperWiki(name)
        pkey = randint(1300, 4500)
        url = str(worker.getUrl())
        content = worker.paragraph
        '''parent = db.session.query(db.exists().where(nodetable.name == name)).scalar()
            if parent is not None:
                parentKey = parent.pkey
        '''
        json_reponse = json.dumps(worker.full) 
        data = node(pkey, name, url, parentKey, content)
        db.session.add(data)
        db.session.commit()

        for child in worker.children:
            primaryKey = randint(300, 3000)
            data = node(primaryKey, child['name'], child['url'], pkey, child['content'])
            db.session.add(data)
            db.session.commit()

        return json_reponse


        




        
        
            
            

"""if db.session.query(node).filter(node.source == value).count() == 0:
            result = db.session.execute('SELECT 1 FROM nodetable.pkey WHERE pkey = :val', {'val': keyThing})
            while result != 0:
                result = db.session.execute('SELECT 1 FROM nodetable.pkey WHERE pkey = :val', {'val': keyThing})
                pkey = randint(10000, 100000)
            data = node(pkey, value, url, 101, 102, 103)
            db.session.add(data)
            db.session.commit()
        else:
            return "<p> Try Another Word<p>"""

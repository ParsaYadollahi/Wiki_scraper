from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from random import randint
from scrapper import scrapperWiki
import json

app = Flask(__name__)
db = SQLAlchemy(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:globe1234@localhost:5432/scrapper"
app.debug = True

if __name__ == '__main__':
    app.run()

class node(db.Model):
    __tablename__ = 'nodetable'
    pkey = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text())
    url = db.Column(db.Text())
    parent = db.Column(db.Integer)    

    def __init__(self, pkey, name, url, parent):
        self.pkey = pkey
        self.name = name
        self.url = url
        self.parent = parent

@app.route('/')
def index():
    return render_template('index.html'),
    

@app.route('/submit', methods=['POST'])
def submitNode():
    if request.method ==  'POST':
        
        parentKey = 0
        req_data = request.get_json(silent=True)
        name = req_data['name']
        worker = scrapperWiki(name)
        pkey = randint(1300, 4500)
        url = str(worker.getUrl())
        children = json.loads(worker.children)
        '''parent = db.session.query(db.exists().where(nodetable.name == name)).scalar()
            if parent is not None:
                parentKey = parent.pkey
        '''

        
        data = node(pkey, name, url, 0)
        db.session.add(data)
        db.session.commit()


        




        
        
            
            

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
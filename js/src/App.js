import React, { Component } from 'react';
import * as d3 from "d3";
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import Topbar from './topbar.js'
import Tree from 'react-tree-graph'

class App extends React.Component {
  
  render() {
    const data = {
      "name": "Eve",
      "children": [
        {
          "name": "Cain"
        },
        {
          "name": "Seth",
          "children": [
            {
              "name": "Enos"
            },
            {
              "name": "Noam"
            }
          ]
        },
        {
          "name": "Abel"
        },
        {
          "name": "Awan",
          "children": [
            {
              "name": "Enoch"
            }, {
              "name": "yeeew"
            }, {
              "name": "NIKOLAI"
            }, {
              "name": "Parsa"
            }, {
              "name": "HELLO"
            }
          ]
        },
        {
          "name": "Azura"
        }
      ]
    }
    
      return (
          <div>
          <Topbar />
          <Tree
            data={data}
            height={200}
            width={400}/>
          </div>
      );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
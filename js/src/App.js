import React, { Component } from 'react';
import * as d3 from "d3";
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import Topbar from './topbar.js'
import Tree from 'react-tree-graph'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

class App extends React.Component {
  
  render() {
      return (
          <div>
          <Topbar />
          </div>
      );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

class Graph extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      hover: false,
      data: {
        "name": "Eve",
        "content" : 'The is Eve',
        "url" : 'eve.com',
        "children": [
          {
            "name": "Cain",
            "content" : 'The is Cain',
            "url" : 'cain.com',
          },
          {
            "name": "Seth",
            "content" : 'The is Seith',
            "url" : 'seith.com',
            "children": [
              {
                "name": "Enos",
                "content" : 'The is Enos',
                "url" : 'Enos.com',
              },
              {
                "name": "Noam",
                "content" : 'The is Noam',
                "url" : 'Noam.com',
              }
            ]
          },
          {
            "name": "Abel",
            "content" : 'The is Abel',
            "url" : 'Abel.com',
          },
          {
            "name": "Awan",
            "content" : 'The is Awan',
            "url" : 'awan.com',
            "children": [
              {
                "name": "Enoch",
                "content" : 'The is Enoch',
                "url" : 'enoch.com',
              }, {
                "name": "yeeew",
                "content" : 'The is yeh neg',
                "url" : 'yeh neg.com',
              }, {
                "name": "NIKOLAI",
                "content" : 'The is Nik',
                "url" : 'Nik.com',
              }, {
                "name": "Parsa",
                "content" : 'The is PAAAATRICK',
                "url" : 'PATCICK.com',
              }, {
                "name": "HELLO",
                "content" : 'The is gang',
                "url" : 'gang.com',
              }
            ]
          }, {
            "name": "Mia",
            "children": [
              {
                "name": "MIA"
              }
            ]
          }
        ]
      }
    }
  }
  toggleHover(a, b) {
    debugger;
    console.log(b)
  }
  handleClick(a, b) {
    alert(b)
  }

  render() {
    return (
          <TransformWrapper
          defaultScale={1}
          maxScale={8}
          defaultPositionX={100}
          defaultPositionY={100}
          >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>
          <div className="tools">
              <button onClick={zoomIn}>Zoom in</button>
              <button onClick={zoomOut}>Zoom out</button>
            </div>
            <TransformComponent>
          <div>
          <Tree
            data={this.state.data}
            duration = {500}
            nodeRadius={15}
            margins={{ top: 20, bottom: 10, left: 30, right: 200 }}
            height={600}
            width={600}
            animated
            duration={800}
            gProps={{
              onMouseEnter: this.toggleHover,
              onClick :this.handleClick
            }}
          />
          </div>
          </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
      );
  }
}

ReactDOM.render(<Graph />, document.getElementById('graph'));

export default App;


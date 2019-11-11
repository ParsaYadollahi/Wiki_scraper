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
        }
      ]
    }
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
            data={data}
            duration = {500}
            nodeRadius={15}
            margins={{ top: 20, bottom: 10, left: 30, right: 200 }}
            height={600}
            width={600}
            animated
            duration={800}/>
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
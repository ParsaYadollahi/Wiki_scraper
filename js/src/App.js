import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Topbar from './topbar.js'
import Tree from 'react-tree-graph'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import axios from 'axios'
import { Button, Popup } from 'semantic-ui-react'

class App extends React.Component {
  
  render() {
      return (
          <div>
          <Topbar />
          </div>
      );
        alert(this.input_form)
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

class Graph extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      popupShow : false,
      popupContent: 'GAYYYY',
      hover: false,
      name: '',
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
        ]
      }
    }
  }
  
  getContentFromName = (n) => {
    axios.get(
      'http://localhost:3000/getContentHover',
      {params: {name: n}})
    .then((response) => {
      console.log(response);
    });
  }
  
  toggleHover = (obj, n) => {
    this.setState({
      popupShow : true,
      popupContent: this.getContentFromName(n)
      // popupContent: FUNCTION THAT RETURNS CONTENT ex: getContent(n)
    });
    
    axios.get(
      'http://localhost:3000/hoverContent',
      {params: {name: n}})
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  removeHover = () => {
    this.setState({popupShow : false})
  }

  handleClick = (obj, n) => {
    axios.post(
      'http://localhost:3000/getContent', null,
      {params: {name: n}})
    .then((response) => {
      console.log(response);
      this.setState({data : response.body})

    }, (error) => {
      console.log(error);
    });
  }

  PopUp = () => (
    <Popup trigger={<p>{this.state.popupContent}</p>}/>
  )

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
              <button className="zoom" onClick={zoomIn}>+</button>
              <button className="zoom" onClick={zoomOut}>-</button>
            </div>
            <TransformComponent>
              <div className="custom-container">
                <Tree
                  data={this.state.data}
                  duration = {500}
                  nodeRadius={12}
                  margins={{ top: 20, bottom: 10, left: 30, right: 200 }}
                  height={400}
                  width={400}
                  animated
                  duration={800}
                  gProps={{
                    onMouseEnter: this.toggleHover,
                    onMouseLeave: this.removeHover,
                    onClick :this.handleClick
                  }}
                  svgProps={{
                    className: 'custom'
                  }}/>
                />
              </div>
            </TransformComponent>
            <div>
              {this.state.popupShow ? this.PopUp() : null}
            </div>
          </React.Fragment>
        )}
      </TransformWrapper>
    );
  }
}

ReactDOM.render(<Graph />, document.getElementById('graph'));

export default App;


import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Topbar from './topbar.js'
import Tree from 'react-tree-graph'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import axios from 'axios'
import { Popup } from 'semantic-ui-react'

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
          "name": "dog",
          "url": "https://en.wikipedia.org/wiki/dog",
          "content": "The domestic dog (Canis lupus familiaris when \
            considered a subspecies of the wolf or Canis familiaris when considered a distinct species) is a member of the genus \
            Canis (canines), which forms part of the wolf-like canids, and is the most widely abundant terrestrial carnivore. The \
            dog and the extant gray wolf are sister taxa as modern wolves are not closely related to the wolves that were first \
            domesticated, which implies that the direct ancestor of the dog is extinct. The dog was the first species to be \
            domesticated and has been selectively bred over millennia for various behaviors, sensory capabilities, and physical \
            attributes.",
          "children":[ 
             { 
                "name": "Carl_Linnaeus",
                "content": "Carl Linnaeus (; 23 May 1707 \u2013 10 January 1778), \
                  also known after his ennoblement as Carl von Linn\u00e9 (Swedish pronunciation: [\u00b9k\u0251\u02d0\u026d f\u0254n \
                  l\u026a\u00b9ne\u02d0] (listen)), was a Swedish botanist, zoologist, and physician who formalised binomial nomenclature, \
                  the modern system of naming organisms. He is known as the \"father of modern taxonomy\". Many of his writings were in \
                  Latin, and his name is rendered in Latin as Carolus Linn\u00e6us (after 1761 Carolus a Linn\u00e9).",
                "url": "https://en.wikipedia.org/wiki/Carl_Linnaeus",
                "children":[ 
       
                ]
             },
             { 
                "name": "Subspecies",
                "content": "In biological \
                  classification, the term subspecies refers to one of two or more populations of a species living in different \
                  subdivisions of the species' range and varying from one another by morphological characteristics.\nA single subspecies \
                  cannot be recognized independently: a species is either recognized as having no subspecies at all or at least two, \
                  including any that are extinct. The term may be abbreviated to subsp.",
                "url": "https://en.wikipedia.org/wiki/Subspecies",
                "children":[ 
       
                ]
             },
             { 
                "name":"Wolf",
                "content": "The wolf (Canis lupus), also \
                  known as the gray/grey wolf, is a canine native to the wilderness and remote areas of Eurasia and North America. It is \
                  the largest extant member of its family, with males averaging 40 kg (88 lb) and females 35.5\u201337.",
                "url": "https://en.wikipedia.org/wiki/Wolf",
                "children":[ 
       
                ]
             }
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
    <Popup 
    mouseLeaveDelay={55500}
    trigger={
      <div>
          <p className="show_content" style={{ borderLeft: '4px solid #2BDE3F' }}>
            <h3 style={{marginTop : '0px', marginLeft : '30px' }}>URL</h3>
            <p className="show_content_text">          
              {this.state.popupContent} https://en.wikipedia.org/wiki/Carl_Linnaeus
            </p>
          </p>
          <p className="show_content" style={{ borderLeft: '4px solid #1D72F3' }}>
          <h3 style={{marginTop : '0px' , marginLeft : '30px' }}>
            Content
          </h3>
          <p className="show_content_text">          
            {this.state.popupContent} The domestic dog (Canis lupus familiaris when
              considered a subspecies of the wolf or Canis familiaris when considered a distinct species) is a member of the genus 
              Canis (canines), which forms part of the wolf-like canids, and is the most widely abundant terrestrial carnivore. The 
              dog and the extant gray wolf are sister taxa as modern wolves are not closely related to the wolves that were first 
              domesticated, which implies that the direct ancestor of the dog is extinct. The dog was the first species to be 
              domesticated and has been selectively bred over millennia for various behaviors, sensory capabilities, and physical 
              attributes.
            </p>
          </p>
      </div>
    }/>
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


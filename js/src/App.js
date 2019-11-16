import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Topbar from './topbar.js'
import G from './Tree.js'
import Tree from 'react-tree-graph'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import axios from 'axios'
import { Popup } from 'semantic-ui-react'

// Import the icons
import { Icon } from 'react-icons-kit'
import {zoom_in} from 'react-icons-kit/ikons/zoom_in'
import {zoom_out} from 'react-icons-kit/ikons/zoom_out'
import {link} from 'react-icons-kit/icomoon/link'
import {info} from 'react-icons-kit/icomoon/info'

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
  render() {
    return (
        <div>
        <G />
        </div>
    );
  } 
}

ReactDOM.render(<Graph />, document.getElementById('graph'));

export default App;


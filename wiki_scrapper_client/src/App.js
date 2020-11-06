import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Topbar from './topbar.js'
import G from './Tree.js'

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


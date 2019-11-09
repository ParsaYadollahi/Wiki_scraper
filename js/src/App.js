import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import Topbar from './topbar.js'

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

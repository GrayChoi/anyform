import React, { Component } from 'react';
import { connect } from 'react-redux'
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from '../components/Items/Card';
import Form from '../components/Items/Form';

import './App.css';

class App extends Component {
  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div className="App">
          <div className="Sidebar">
            <Card text="input" />
          </div>
          <div className="Main">
            <Form />
          </div>
        </div>
      </DragDropContextProvider>
    );
  }
}

export default connect()(App);
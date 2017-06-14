import React, { Component } from 'react';
import { connect } from 'react-redux'
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import FormItem from '../components/Items/FormItem';
import FormContainer from './FormContainer';

import styles from './App.css';

class App extends Component {
  render() {
    const { App, Sidebar, Main } = styles;
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div className={App}>
          <div className={Sidebar}>
            <FormItem label="input" type="input" />
          </div>
          <div className={Main}>
            <FormContainer />
          </div>
        </div>
      </DragDropContextProvider>
    );
  }
}

export default connect()(App);
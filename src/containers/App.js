import React, { Component } from 'react';
import { connect } from 'react-redux'
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import FormItem from '../components/Items/FormItem';
import FormContainer from './FormContainer';

import styles from './App.module.css';

import formItems from '../master_data/formItems';

class App extends Component {
  renderFormItems = () => {
    return formItems.map((({ type, label, color }) => (
        <FormItem key={type} label={label} type={type} color={color} />
    )));
  }
  render() {
    const { App, Sidebar, Main } = styles;
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div className={App}>
          <div className={Sidebar}>
            {this.renderFormItems()}
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
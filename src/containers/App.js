import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as actionTypes from '../constants/actionTypes';

import FormItem from '../components/Items/FormItem';
import ToggleButton from '../components/ToggleButton';
import Sidebar from '../components/Sidebar';

import FormContainer from './FormContainer';

import styles from './App.module.css';

import formItems from '../master_data/formItems';

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {

  static propTypes = {
    togglePanel: PropTypes.func.isRequired,
    leftPanelOpend: PropTypes.bool.isRequired,
  };

  renderFormItems = () => {
    return formItems.map((({ type, label, color }) => (
        <FormItem key={type} label={label} type={type} color={color} />
    )));
  }

  render() {
    const { App, Main } = styles;
    const { togglePanel, leftPanelOpend } = this.props; 
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div className={App}>
          <ToggleButton onPress={togglePanel} />
          <Sidebar
            onPressClose={togglePanel}
            open={leftPanelOpend} >
            {this.renderFormItems()}
          </Sidebar>
          <div className={Main}>
            <FormContainer />
          </div>
        </div>
      </DragDropContextProvider>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    togglePanel: () => dispatch({ type: actionTypes.TOGGLE_LEFT_PANEL }),
  };
}

function mapStateToProps({
  app: { leftPanelOpend },
}) {
  return {
    leftPanelOpend,
  };
}

export default App;
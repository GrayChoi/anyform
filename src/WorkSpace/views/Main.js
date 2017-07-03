import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { TOGGLE_LEFT_PANEL } from '../actions';
import FormItem from './FormItem';
import ToggleButton from './ToggleButton';
import Sidebar from './Sidebar';
import FormContainer from './FormContainer';

import styles from './Main.module.css';

import formItems from '../data/formItems';

@connect(mapStateToProps, mapDispatchToProps)
class Main extends Component {

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
    const { Main, Form } = styles;
    const { togglePanel, leftPanelOpend } = this.props; 
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div className={Main}>
          <ToggleButton onPress={togglePanel} />
          <Sidebar
            onPressClose={togglePanel}
            open={leftPanelOpend} >
            {this.renderFormItems()}
          </Sidebar>
          <div className={Form}>
            <FormContainer />
          </div>
        </div>
      </DragDropContextProvider>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    togglePanel: () => dispatch(TOGGLE_LEFT_PANEL),
  };
}

function mapStateToProps({
  app: { leftPanelOpend },
}) {
  return {
    leftPanelOpend,
  };
}

export default Main;
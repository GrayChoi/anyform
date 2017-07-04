import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { view as Form } from '../../Form';

import { toggleLeftPanel } from '../actions';
import FormItem from './FormItem';
import ToggleButton from './ToggleButton';
import Sidebar from './Sidebar';
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
    const { Main, FormStyle } = styles;
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
          <div className={FormStyle}>
            <Form />
          </div>
        </div>
      </DragDropContextProvider>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    togglePanel: () => dispatch(toggleLeftPanel()),
  };
}

function mapStateToProps({
  workspace: { leftPanelOpend },
}) {
  return {
    leftPanelOpend,
  };
}

export default Main;
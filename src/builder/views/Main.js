import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { view as Stage } from '../../stage';

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
    // type is unique
    return formItems.map((({ type, label, color }, index) => (
        <FormItem key={type} label={label} type={type} color={color} />
    )));
  }

  render() {
    const { main, stage, sidebarOpenedStage } = styles;
    const { togglePanel, leftPanelOpend } = this.props; 
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div className={main}>
          <ToggleButton onPress={togglePanel} />
          <Sidebar
            onPressClose={togglePanel}
            open={leftPanelOpend} >
            {this.renderFormItems()}
          </Sidebar>
          <div className={leftPanelOpend ? sidebarOpenedStage : stage }>
            <Stage />
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
  builder: { leftPanelOpend },
}) {
  return {
    leftPanelOpend,
  };
}

export default Main;
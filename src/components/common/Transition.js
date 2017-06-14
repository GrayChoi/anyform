import React, { Component  } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import './Transition.css';

export default class Transition extends Component {
  render() {
    const { children } = this.props;
    return (
      <CSSTransitionGroup
        transitionName="trans"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        {children}
      </CSSTransitionGroup>
    );
  }
}

export { Transition };
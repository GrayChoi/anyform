import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import styles from './FormItemWrapper.module.css';

const springSetting1 = {stiffness: 70, damping: 10};

// TODO: color border
export default class FormItemWrapper extends Component {
  state = {
    className: styles.wrapper,
  };
  renderBody = () => {
    const { children } = this.props;
    return (
      <div className={this.state.className}>
        {children}
      </div>
    );
  }
  render() {
    return (
      <Motion defaultStyle={{ scale: 1.2 }} style={{ scale: spring(1, springSetting1), }}>
        {
          ({ scale }) => (
            <div style={{
              transform: `scale(${scale})`
            }} >
              {this.renderBody()}
            </div>
          )
        }
      </Motion>
    );
  }
}
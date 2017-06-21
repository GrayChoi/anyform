import React, { Component } from 'react';
import rebound from '../../utils/rebound';
import styles from './FormItemWrapper.module.css';

// TODO: color border
export default class FormItemWrapper extends Component {
  state = {
    className: styles.wrapper,
  };
  componentDidMount() {
    rebound(
      () => this.setState({ className: `${styles.wrapper} ${styles.wrapperScaled}` }),
      () => this.setState({ className: `${styles.wrapper}` }),
      2
    );
  }
  renderBody = () => {
    const { children } = this.props;
    const { configCardVisible } = this.state;
    if (configCardVisible) {
      return (
        <div>
          {children}
        </div>
      );
    }
    return children;
  }
  render() {
    
    return (
      <div
        className={this.state.className}
      >
        {this.renderBody()}
      </div>
    );
  }
}
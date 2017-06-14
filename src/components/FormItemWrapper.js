import React, { Component } from 'react';
import { Card } from 'antd';
import debounce from 'lodash.debounce';
import styles from './FormItemWrapper.module.css';

export default class FormItemWrapper extends Component {
  state = {
    configCardVisible: false,
  };
  onMouseOver = () => {
    this.setState({ configCardVisible: true })
  }
  onMouseLeave = () => {
    debounce(
      () => this.setState({ configCardVisible: false }),
      1000,
    )();
  }
  renderBody = () => {
    const { children } = this.props;
    const { configCardVisible } = this.state;
    if (configCardVisible) {
      return (
        <Card title="設定" bordered={false} style={styles.card}>
          {children}
        </Card>
      );
    }
    return children;
  }
  render() {
    
    return (
      <div
        className={styles.wrapper}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
      >
        {this.renderBody()}
      </div>
    );
  }
}
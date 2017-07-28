import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import { Button } from 'antd';
import * as propTypes from '../propTypes';
import styles from './FormItemWrapper.module.css';

const springSetting1 = {stiffness: 70, damping: 10};

// TODO: color border
export default class FormItemWrapper extends Component {

  static propTypes = {
    children: propTypes.children.isRequired,
    item: propTypes.formItem.isRequired,
    onClickFormItem: propTypes.action.isRequired,
    onClickDeleteButton: propTypes.action.isRequired,
    selected: propTypes.bool.isRequired,
  };

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

  handleMaskClick = () => {
    const { onClickFormItem, item } = this.props;
    onClickFormItem(item);
  }

  handleDeleteButtonClick = () => {
    const { onClickDeleteButton, item } = this.props;
    onClickDeleteButton(item);
  }

  renderMask = ({ selected }) => {
    const className = selected ? styles.maskIsSelected : styles.mask;
    return (
      <div  
        className={className}
        onClick={this.handleMaskClick}
      />
    );
  }

  renderIconBar = ({ selected }) => {
    if (selected) {
      return (
        <div className={styles.iconBar}>
          <Button
            icon="setting"
            shape="circle"
            type="primary"
            className={styles.settingBtn}
          />
          <Button
            icon="delete"
            shape="circle"
            type="ghost"
            onClick={this.handleDeleteButtonClick}
            className={styles.deleteBtn}
          />
        </div>
      );
    }
    return null;
  }

  render() {
    const { selected } = this.props;
    return (
      <Motion defaultStyle={{ scale: 1.2 }} style={{ scale: spring(1, springSetting1), }}>
        {
          ({ scale }) => (
            <div style={{
              transform: `scale(${scale})`
            }} >
              {this.renderBody()}
              {this.renderMask({ selected })}
              {this.renderIconBar({ selected })}
            </div>
          )
        }
      </Motion>
    );
  }
}
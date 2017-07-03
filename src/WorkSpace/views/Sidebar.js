import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import styles from './Sidebar.module.css';

export default class Sidebar extends PureComponent {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    onPressClose: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
  }
  
  className = () => {
    const { open } = this.props;
    const { Sidebar, SidebarOpened } = styles;
    return open ? SidebarOpened : Sidebar;
  }

  render() {
    const { children, onPressClose } = this.props;
    return (
      <div className={this.className()}>
        <div className={styles.Toolbar}>
          <span>入力項目</span>
          <span onClick={onPressClose} className={styles.CloseButton}>
            <Icon type="close" />
          </span>
        </div>
        {children}
      </div>
    );
  }
}
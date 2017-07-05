import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import styles from './SideNavbar.module.css';

import { Menu } from 'antd';

@connect(null, mapDispatchToProps)
export default class SideNavbar extends PureComponent {

  static propTypes = {
    open: PropTypes.func.isRequired,
  }

  state = {
    current: '',
  }

  handleClick = (e) => {
    this.setState({ current: e.key },
      () => this.props.open(e.key))
  }

  render() {
    const { sideNavbar } = styles;
    return (
      <div className={sideNavbar}>
        <Menu
          mode="inline"
          selectedKeys={[this.state.current]}
          style={{ width: '100%', borderRight: 'none' }}
          onClick={this.handleClick}
        >
          <Menu.Item key="myforms">My Forms</Menu.Item>
          <Menu.Item key="favorites">Favorites</Menu.Item>
          <Menu.Item key="archive">Archive</Menu.Item>
          <Menu.Item key="trash">Trash</Menu.Item>
        </Menu>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    open: key => dispatch(push(`/forms/${key}`)),
  }
}
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Container.module.css';

import Toolbar from './Toolbar';
import SideNavBar from './SideNavbar';
import * as categorys from '../constants/categorys';

export default class Container extends Component {

  static propTypes = {
    params: PropTypes.shape({
      category: PropTypes.oneOf([
        categorys.MY_FORMS,
        categorys.FAVORITES,
        categorys.ARCHIVE,
        categorys.TRASH,
      ]),
    }),
  }

  static defaultProps = {
    params: {
      category: categorys.MY_FORMS,
    }
  }

  render() {
    const {
      container,
      toolbarWrapper,
      bodyWrapper,
      sideNavBarWrapper,
      mainWrapper,
    } = styles;
    console.log(this.props.params.category)
    return (
      <div className={container}>
        <div className={toolbarWrapper}>
          <Toolbar />
        </div>
        <div className={bodyWrapper}>
          <div className={sideNavBarWrapper}>
            <SideNavBar />
          </div>
          <div className={mainWrapper}>
          </div>
        </div>
      </div>
    );
  }
}
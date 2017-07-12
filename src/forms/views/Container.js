import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Container.module.css';

import Toolbar from './Toolbar';
import SideNavBar from './SideNavbar';
import Main from './Main';
import * as categorys from '../constants/categorys';
import * as actions from '../actions';

@connect(({ forms })=> {
 return {
   formRecords: forms.records,
 };
}, (dispatch) => {
  return {
    updateForm: payload => dispatch(actions.updateForm(payload)),
    createForm: payload => dispatch(actions.createForm(payload)),
    removeForm: payload => dispatch(actions.removeForm(payload)),
  };
})
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
    const {
      formRecords,
      createForm,
      updateForm,
    } = this.props;
    return (
      <div className={container}>
        <div className={toolbarWrapper}>
          <Toolbar
            onClickCreateButton={createForm}
          />
        </div>
        <div className={bodyWrapper}>
          <div className={sideNavBarWrapper}>
            <SideNavBar />
          </div>
          <div className={mainWrapper}>
            <Main
              records={formRecords}
              onCellChange={updateForm}
            />
          </div>
        </div>
      </div>
    );
  }
}

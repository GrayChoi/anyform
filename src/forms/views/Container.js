import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as propTypes from '../propTypes';
import styles from './Container.module.css';

import Toolbar from './Toolbar';
import SideNavBar from './SideNavbar';
import Main from './Main';
import * as categorys from '../constants/categorys';
import * as actions from '../actions';

@connect(({ forms })=> {
 return {
   formRecords: forms.records,
   selectedFormKeys: forms.selectedFormKeys,
 };
}, (dispatch) => {
  return {
    updateForm: payload => dispatch(actions.updateForm(payload)),
    createForm: payload => dispatch(actions.createForm(payload)),
    removeForm: payload => dispatch(actions.removeForm(payload)),
    selectForm: selectedFormKeys => dispatch(actions.selectForm(selectedFormKeys)),
  };
})
export default class Container extends Component {

  static propTypes = {
    params: propTypes.category,
    formRecords: propTypes.form,
    selectedFormKeys: propTypes.selectedFormKeys.isRequired,
    createForm: propTypes.action.isRequired,
    updateForm: propTypes.action.isRequired,
    selectForm: propTypes.action.isRequired,
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
    const {
      formRecords,
      createForm,
      updateForm,
      selectForm,
      selectedFormKeys,
    } = this.props;
    console.log(this.props.params);
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
              selectForm={selectForm}
              selectedFormKeys={selectedFormKeys}
              onCellChange={updateForm}
            />
          </div>
        </div>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
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
    removeForms: selectedFormKeys => dispatch(actions.removeForms(selectedFormKeys)),
    selectForm: selectedFormKeys => dispatch(actions.selectForm(selectedFormKeys)),
    editFormDetail: key => dispatch(push(`/build/${key}`)),
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
    removeForms: propTypes.action.isRequired,
    editFormDetail: propTypes.action.isRequired,
  }

  static defaultProps = {
    params: {
      category: categorys.MY_FORMS,
    }
  }

  handleClickCreateForms = (data) => {
    this.props.createForm({ form: data });
  }

  handleClickRemoveForms = () => {
    const { selectedFormKeys, removeForms } = this.props;
    removeForms({ formIds: selectedFormKeys });
  }

  handleClickEditForm = () => {
    const { selectedFormKeys, editFormDetail } = this.props;
    editFormDetail(selectedFormKeys[0]);
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
      updateForm,
      selectForm,
      selectedFormKeys,
    } = this.props;
    // the remove button of toolbar is visible ?
    const removeButtonVisible = selectedFormKeys.length > 0;
    const editButtonVisible = selectedFormKeys.length === 1;
    return (
      <div className={container}>
        <div className={toolbarWrapper}>
          <Toolbar
            onClickCreateButton={this.handleClickCreateForms}
            onClickRemoveButton={this.handleClickRemoveForms}
            onClickEditButton={this.handleClickEditForm}
            removeButtonVisible={removeButtonVisible}
            editButtonVisible={editButtonVisible}
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

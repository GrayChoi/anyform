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
    removeForms: selectedFormKeys => dispatch(actions.removeForms(selectedFormKeys)),
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
    removeForms: propTypes.action.isRequired,
  }

  static defaultProps = {
    params: {
      category: categorys.MY_FORMS,
    }
  }

  handleCreateForms = (data) => {
    this.props.createForm(data);
  }

  handleRemoveForms = () => {
    const { selectedFormKeys, removeForms } = this.props;
    removeForms(selectedFormKeys);
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
    console.log(removeButtonVisible);
    return (
      <div className={container}>
        <div className={toolbarWrapper}>
          <Toolbar
            onClickCreateButton={this.handleCreateForms}
            onClickRemoveButton={this.handleRemoveForms}
            removeButtonVisible={removeButtonVisible}
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

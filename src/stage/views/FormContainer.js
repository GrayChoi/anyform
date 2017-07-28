import React from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import * as propTypes from '../propTypes';
import * as actions from '../actions';

@connect(({ stage: { candidateItem, formItems, selectedFormItemKey } }) => ({
  candidateItem, formItems, selectedFormItemKey,
}), mapDispatchToState)
export default class FormContainer extends React.Component {
  static propTypes = {
    saveCandidateFormItem: propTypes.action.isRequired,
    removeCandidateFormItem: propTypes.action.isRequired,
    saveFormItem: propTypes.action.isRequired,
    removeFormItem: propTypes.action.isRequired,
    selectFormItem: propTypes.action.isRequired,
    candidateItem: propTypes.formItem.isRequired,
    formItems: propTypes.formItems.isRequired,
    selectedFormItemKey: propTypes.string,
  }
  render() {
    const {
      saveCandidateFormItem,
      removeCandidateFormItem,
      saveFormItem,
      removeFormItem,
      selectFormItem,
      candidateItem,
      formItems,
      selectedFormItemKey,
    } = this.props;
    return (
      <Form
        saveCandidateFormItem={saveCandidateFormItem}
        removeCandidateFormItem={removeCandidateFormItem}
        saveFormItem={saveFormItem}
        removeFormItem={removeFormItem}
        candidateItem={candidateItem}
        selectFormItem={selectFormItem}
        formItems={formItems}
        selectedFormItemKey={selectedFormItemKey}
      />
    )
  }
}

function mapDispatchToState(dispatch) {
  return {
    saveCandidateFormItem: payload => dispatch(actions.saveCandidateFormItem(payload)),
    removeCandidateFormItem: () => dispatch(actions.removeCandidateFormItem()),
    saveFormItem: payload => dispatch(actions.saveFormItem(payload)),
    selectFormItem: formItem => dispatch(actions.selectFormItem(formItem)),
    removeFormItem: formItem => dispatch(actions.removeFormItem(formItem)),
  };
}
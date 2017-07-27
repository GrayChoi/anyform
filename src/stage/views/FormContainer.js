import React from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import * as propTypes from '../propTypes';
import { saveCandidateFormItem, removeCandidateFormItem, saveFormItem } from '../actions';

@connect(({ stage: { candidateItem, formItems } }) => ({
  candidateItem, formItems,
}), mapDispatchToState)
export default class FormContainer extends React.Component {
  static propTypes = {
    saveCandidateFormItem: propTypes.action.isRequired,
    removeCandidateFormItem: propTypes.action.isRequired,
    saveFormItem: propTypes.action.isRequired,
    candidateItem: propTypes.formItem.isRequired,
    formItems: propTypes.formItems.isRequired
  }
  render() {
    const {
      saveCandidateFormItem,
      removeCandidateFormItem,
      saveFormItem,
      candidateItem,
      formItems,
    } = this.props;
    return (
      <Form
        saveCandidateFormItem={saveCandidateFormItem}
        removeCandidateFormItem={removeCandidateFormItem}
        saveFormItem={saveFormItem}
        candidateItem={candidateItem}
        formItems={formItems}
      />
    )
  }
}

function mapDispatchToState(dispatch) {
  return {
    saveCandidateFormItem: payload => dispatch(saveCandidateFormItem(payload)),
    removeCandidateFormItem: () => dispatch(removeCandidateFormItem()),
    saveFormItem: payload => dispatch(saveFormItem(payload)),
  };
}
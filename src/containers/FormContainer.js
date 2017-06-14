import React from 'react';
import { connect } from 'react-redux';
import Form from '../components/Form';
import * as actionTypes from '../constants/actionTypes';

@connect(({ form }) => ({ form }), mapDispatchToState)
export default class FormContainer extends React.Component {
  render() {
    const {
      saveCandidateFormItem,
      removeCandidateFormItem,
      saveFormItem,
      form,
    } = this.props;
    return (
      <Form
        saveCandidateFormItem={saveCandidateFormItem}
        removeCandidateFormItem={removeCandidateFormItem}
        saveFormItem={saveFormItem}
        form={form}
      />
    )
  }
}

function mapDispatchToState(dispatch) {
  return {
    saveCandidateFormItem: payload => dispatch({ type: actionTypes.SAVE_CANDIDATE_FORM_ITEM, payload }),
    removeCandidateFormItem: () => dispatch({ type: actionTypes.REMOVE_CANDIDATE_FORM_ITEM }),
    saveFormItem: () => dispatch({ type: actionTypes.SAVE_FORM_ITEM }),
  };
}
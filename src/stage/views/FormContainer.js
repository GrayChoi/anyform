import React from 'react';
import { connect } from 'react-redux';
import Form from './Form';
import { saveCandidateFormItem, removeCandidateFormItem, saveFormItem } from '../actions';

@connect(({ stage }) => ({ stage }), mapDispatchToState)
export default class FormContainer extends React.Component {
  render() {
    const {
      saveCandidateFormItem,
      removeCandidateFormItem,
      saveFormItem,
      stage,
    } = this.props;
    return (
      <Form
        saveCandidateFormItem={saveCandidateFormItem}
        removeCandidateFormItem={removeCandidateFormItem}
        saveFormItem={saveFormItem}
        stage={stage}
      />
    )
  }
}

function mapDispatchToState(dispatch) {
  return {
    saveCandidateFormItem: payload => dispatch(saveCandidateFormItem(payload)),
    removeCandidateFormItem: () => dispatch(removeCandidateFormItem()),
    saveFormItem: () => dispatch(saveFormItem()),
  };
}
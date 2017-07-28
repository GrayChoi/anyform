import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { isEmpty } from 'ramda';
import { Input, InputNumber, Select, DatePicker, Rate, Button } from 'antd';

import ItemTypes from '../../common/constants/ItemTypes';
import FormItemWrapper from './FormItemWrapper';
import PlaceHolder from './PlaceHolder';
import styles from './Form.module.css';
import FormItemTypes from '../../common/constants/FormItemTypes';
import * as propTypes from '../propTypes';

const FormItemTarget = {
  drop({ saveFormItem, removeCandidateFormItem }, monitor) {
    saveFormItem(monitor.getItem());
    removeCandidateFormItem();
  },
  hover({ saveCandidateFormItem, candidateItem }, monitor) {
    if (isEmpty(candidateItem)) {
      saveCandidateFormItem(monitor.getItem())
    }
  },
};

@DropTarget(
  ItemTypes.FormItem,
  FormItemTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  })
)
export default class Form extends Component {
  static propTypes = {
    connectDropTarget: propTypes.dndAction.isRequired,
    isOver: propTypes.bool.isRequired,
    canDrop: propTypes.bool.isRequired,
    removeCandidateFormItem: propTypes.action.isRequired,
    selectFormItem: propTypes.action.isRequired,
    removeFormItem: propTypes.action.isRequired,
    candidateItem: propTypes.formItem.isRequired,
    formItems: propTypes.formItems.isRequired,
    selectedFormItemKey: propTypes.string,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOver !== this.props.isOver && !nextProps.isOver) {
      this.props.removeCandidateFormItem();
    }
  }

  renderCandidateItem() {
    const { candidateItem } = this.props;
    if (!isEmpty(candidateItem)) {
      return (
        <div style={{ opacity: 0.5, margin: '15px' }}>
          {generateFormItem(candidateItem)}
        </div>
      );
    }
  }

  renderFormItem = () => {
    const { formItems, selectFormItem, removeFormItem, selectedFormItemKey } = this.props;
    return formItems.map(formItem => {
      const { key = 'candidate' } = formItem;
      const selected = (selectedFormItemKey === key);
      return (
        <FormItemWrapper
          key={key}
          item={formItem}
          onClickFormItem={selectFormItem}
          onClickDeleteButton={removeFormItem}
          selected={selected}
        >
          {generateFormItem(formItem)}
        </FormItemWrapper>
      );
    });
  }

  renderFormContent = () => {
    return (
      <div>
        {this.renderFormItem()}
        {this.renderCandidateItem()}
      </div>
    );
  }

  isEmptyForm = () => {
    return this.props.formItems.length === 0;
  }

  render() {
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      <div className={styles.Form}>
        { this.isEmptyForm() ?  <PlaceHolder /> : this.renderFormContent() } 
      </div>
    );
  }
}

const renderButton = (formItem) => {
  return (<Button type="primary">送信</Button>);
}

function generateFormItem(formItem) {
  const { type } = formItem;
  switch (type) {
    case FormItemTypes.INPUT: {
      return <Input />
    }
    case FormItemTypes.INPUT_NUMBER: {
      return <InputNumber />
    }
    case FormItemTypes.DATE_PICKER: {
      return <DatePicker />
    }
    case FormItemTypes.SELECT: {
      return (
        <Select
          style={{ width: 200 }}
        />
      );
    }
    case FormItemTypes.RATE: {
      return <Rate />
    }
    case FormItemTypes.SUBMIT_BUTTON: {
      return renderButton(formItem);
    }
    default:
      return <Input />
  }
}
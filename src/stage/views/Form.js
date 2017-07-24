import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { isEmpty, compose } from 'ramda';
import { Input, InputNumber, Select, DatePicker, Rate } from 'antd';

import ItemTypes from '../../common/constants/ItemTypes';
import FormItemWrapper from './FormItemWrapper';
import PlaceHolder from './PlaceHolder';
import styles from './Form.module.css';
import FormItemTypes from '../../common/constants/FormItemTypes';
import * as propTypes from '../propTypes';

const FormItemTarget = {
  drop({ saveFormItem }) {
    saveFormItem();
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
    candidateItem: propTypes.formItem.isRequired,
    formItems: propTypes.formItems.isRequired,
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
    const { formItems } = this.props;
    return formItems.map(compose(wrap, generateFormItem))
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

function generateFormItem(candidateItem) {
  const { type } = candidateItem;
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
    default:
      return <Input />
  }
}

function wrap(item) {
  return <FormItemWrapper>{item}</FormItemWrapper>
}
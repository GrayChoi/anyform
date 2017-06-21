import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../Items/ItemTypes';
import FormItemTypes from '../../constants/FormItemTypes';
import FormItemWrapper from './FormItemWrapper';
import PlaceHolder from './PlaceHolder';
import styles from './Form.module.css';

import R from 'ramda';
import { Input, InputNumber, Select, DatePicker, Rate } from 'antd';

const FormItemTarget = {
  drop({ saveFormItem }) {
    saveFormItem();
  },
  hover({ saveCandidateFormItem, form }, monitor) {
    const { candidateItem } = form;
    if (R.isEmpty(candidateItem)) {
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
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOver !== this.props.isOver && !nextProps.isOver) {
      this.props.removeCandidateFormItem();
    }
  }

  renderCandidateItem() {
    const { candidateItem } = this.props.form;
    if (!R.isEmpty(candidateItem)) {
      return (
        <div style={{ opacity: 0.5, margin: '15px' }}>
          {generateFormItem(candidateItem)}
        </div>
      );
    }
  }

  renderFormItem = () => {
    const { formItems } = this.props.form;
    return formItems.map(R.compose(wrap, generateFormItem))
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
    return this.props.form.formItems.length === 0;
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

function generateFormItem({ type }) {
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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import R from 'ramda';
import { Input } from 'antd';

const style = {
  flex: 1,
  alignSelf: 'stretch',
};

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
    if (candidateItem.type === 'input') {
      return <div style={{ opacity: 0.5 }}><Input /></div>;
    }
  }

  renderFormItem = () => {
    const { formItems } = this.props.form;
    return formItems.map((item, index) => (<div key={index}><Input /></div>))
  }

  render() {
    const { connectDropTarget } = this.props;
    let backgroundColor = 'whitesmoke';

    return connectDropTarget(
      <div style={{ ...style, backgroundColor }}>
        {this.renderFormItem()}
        {this.renderCandidateItem()}
      </div>
    );
  }
}
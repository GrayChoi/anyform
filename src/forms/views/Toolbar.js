import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'antd'; 

import styles from './Toolbar.module.css';
import CreateFormModal from './CreateFormModal';
import { createForm } from '../actions';

@connect(null, mapDispatchToProps)
export default class ToolBar extends PureComponent {
  state = {
    visible: false,
  }
  showModal = () => {
    this.setState({ visible: true });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form:', values);
      this.props.createForm(values);
      form.resetFields();
      this.setState({ visible: false });
    });
  }
  saveFormRef = (form) => {
    this.form = form;
  }
  render() {
    const {
      toolbar,
      createFormWrapper,
      formActionsWrapper,
    } = styles;
    return (
      <div className={toolbar}>
        <CreateFormModal
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCreate={this.handleCreate}
          onCancel={this.handleCancel}
        />
        <div className={createFormWrapper}>
          <Button type="primary" size="large" icon="file" onClick={this.showModal}>
            create form
          </Button>
        </div>
        <div className={formActionsWrapper}>
          <Input.Search
            placeholder="Search"
            style={{ width: '200px' }}
          />
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createForm: payload => dispatch(createForm(payload)),
  }
}
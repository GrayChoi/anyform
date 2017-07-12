import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'antd'; 

import styles from './Toolbar.module.css';
import CreateFormModal from './CreateFormModal';

const noop = () => {};
export default class Toolbar extends PureComponent {
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
      this.props.onClickCreateButton(values);
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

Toolbar.propTypes = {
  onClickCreateButton: PropTypes.func,
};

Toolbar.defaultProps = {
  onClickCreateButton: noop,
};
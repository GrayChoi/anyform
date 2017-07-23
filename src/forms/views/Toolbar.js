import React, { PureComponent } from 'react';
import * as propTypes from '../propTypes';
import { Button, Input } from 'antd'; 

import styles from './Toolbar.module.css';
import CreateFormModal from './CreateFormModal';

export default class Toolbar extends PureComponent {

  static propTypes = {
    onClickCreateButton: propTypes.action.isRequired,
    onClickRemoveButton: propTypes.action.isRequired,
    removeButtonVisible: propTypes.action,
  };

  static defaultProps = {
    removeButtonVisible: false,
  };

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

  renderRemoveButton = () => {
    const { removeButtonVisible, onClickRemoveButton } = this.props;
    if (removeButtonVisible) {
      return (
        <div className={styles.removeButton}>
          <Button type="primary" size="large" icon="delete" onClick={onClickRemoveButton}>
            Delete
          </Button>
        </div>
      );
    }
    return null;
  }

  renderInputSeach = () => (
    <div className={styles.inputSearch}>
      <Input.Search
        placeholder="Search"
        style={{ width: '200px' }}
      />
    </div>
  );

  renderActionButtons = () => (
    <div className={styles.actionButtons}>
      {this.renderRemoveButton()}
    </div>
  );

  renderActions = () => (
    <div className={styles.formActionsWrapper}>
      {this.renderActionButtons()}
      {this.renderInputSeach()}
    </div>
  );

  render() {
    const {
      toolbar,
      createFormWrapper,
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
        {this.renderActions()}
      </div>
    );
  }
}
import React, { PureComponent } from 'react';
import styles from './Toolbar.module.css';
import CreateFormModal from './CreateFormModal';

import { Button, Input } from 'antd'; 

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
  render() {
    const {
      toolbar,
      createFormWrapper,
      formActionsWrapper,
    } = styles;
    return (
      <div className={toolbar}>
        <CreateFormModal
          visible={this.state.visible}
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

import React, { PureComponent } from 'react';
import styles from './Toolbar.module.css';

import { Button, Input } from 'antd'; 

export default class ToolBar extends PureComponent {
  render() {
    const {
      toolbar,
      createFormWrapper,
      formActionsWrapper,
    } = styles;
    return (
      <div className={toolbar}>
        <div className={createFormWrapper}>
          <Button type="primary" size="large" icon="file">
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

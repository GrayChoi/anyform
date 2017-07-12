import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon } from 'antd';

import styles from './FormList.module.css';
import { EditableCell } from '../../common/components'

const noop = () => {};
export default class FormList extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [{
      render: (text, record, index) => (
        <Icon type="star-o" style={{ fontSize: '24px' }}/>
      ),
    }, {
      title: 'name',
      dataIndex: 'name',
      width: '60%',
      render: (text, record, index) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(record.key, 'name')}
        />
      )
    }, {
      render: (text, record, index) => (
        <Icon type="star-o" style={{ fontSize: '24px' }}/>
      ),
    }]
    this.rowSelection = {
      onChange: this.onRowChange,
      getCheckboxProps: this.getCheckboxProps,
    };
  }

  onCellChange = (key, prop) => {
    return (value) => {
      this.props.onCellChange({
        [prop]: value,
        key,
      });
    };
  }

  rowKey = record => record.key;

  rowClassName = () => styles.recordRow;

  onRowChange = (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  }

  getCheckboxProps = record => ({
    disabled: record.name === 'Disabled User',
  })

  render() {
    const { dataSource } = this.props;
    return (
      <Table
        dataSource={dataSource}
        columns={this.columns}
        rowKey={this.rowKey}
        pagination={false}
        showHeader={false}
        rowClassName={this.rowClassName}
        rowSelection={this.rowSelection}
      />
    );
  }
}

FormList.propTypes = {
  onClickRecordRow: PropTypes.func,
  onCellChange: PropTypes.func,
};

FormList.defaultProps = {
  onClickRecordRow: noop,
  onCellChange: noop,
};
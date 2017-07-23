import React, { PureComponent } from 'react';
import { Table, Icon } from 'antd';
import { contains, equals, reject } from 'ramda';
import * as propTypes from '../propTypes';
import styles from './FormList.module.css';
import { EditableCell } from '../../common/components'

export default class FormList extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = [{
      width: 20,
      render: (text, record, index) => (
        <Icon type="star-o" style={{ fontSize: '24px' }}/>
      ),
    }, {
      title: 'name',
      dataIndex: 'name',
      render: (text, record, index) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(record.key, 'name')}
        />
      )
    }]
  }

  onCellChange = (key, prop) => {
    return (value) => {
      this.props.onCellChange({
        [prop]: value,
        key,
      });
    };
  }

  handleRowClick = (record, index, evnet) => {
    const { selectedFormKeys } = this.props;
    const { key } = record;
    const isSelected = contains(key, selectedFormKeys);
    if (isSelected) {
      this.props.selectForm(
        reject(equals(key), selectedFormKeys));
    } else {
      this.props.selectForm([...selectedFormKeys, key]);
    }
  }

  rowKey = record => record.key;

  rowClassName = () => styles.recordRow;

  onRowChange = (selectedRowKeys, selectedRows) => {
    this.props.selectForm(selectedRowKeys);
  }

  render() {
    const { dataSource, selectedFormKeys } = this.props;
    this.rowSelection = {
      selectedRowKeys: selectedFormKeys,
      onChange: this.onRowChange,
    };
    return (
      <Table
        dataSource={dataSource}
        columns={this.columns}
        rowKey={this.rowKey}
        pagination={false}
        showHeader={false}
        onRowClick={this.handleRowClick}
        rowClassName={this.rowClassName}
        rowSelection={this.rowSelection}
      />
    );
  }
}

FormList.propTypes = {
  dataSource: propTypes.formList.isRequired,
  selectForm: propTypes.action.isRequired,
  onCellChange: propTypes.action.isRequired,
  // Selected form keys
  selectedFormKeys: propTypes.selectedFormKeys.isRequired,
};
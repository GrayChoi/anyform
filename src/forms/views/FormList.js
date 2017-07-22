import React, { PureComponent } from 'react';
import { Table, Icon } from 'antd';
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
        rowClassName={this.rowClassName}
        rowSelection={this.rowSelection}
      />
    );
  }
}

FormList.propTypes = {
  onClickRecordRow: propTypes.action.isRequired,
  dataSource: propTypes.form.isRequired,
  selectForm: propTypes.action.isRequired,
  onCellChange: propTypes.action.isRequired,
  // Selected form keys
  selectedFormKeys: propTypes.selectedFormKeys.isRequired,
};
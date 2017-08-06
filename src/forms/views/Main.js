import React, { PureComponent } from 'react';
import * as propTypes from '../propTypes';
import FormList from './FormList';
import styles from './Main.module.css';

export default class Main extends PureComponent {
  static propTypes = {
    records: propTypes.form,
    selectedFormKeys: propTypes.selectedFormKeys.isRequired,
    selectForm: propTypes.action.isRequired,
    onCellChange: propTypes.action.isRequired,
  };
  static defaultProps = {
    records: {},
  };
  handleCellChange = (form) => {
    this.props.onCellChange({ form });
  }
  renderFormList = () => {
    const records = Object.values(this.props.records);
    const { selectedFormKeys, selectForm } = this.props;
    return (
      <FormList
        onCellChange={this.handleCellChange}
        selectForm={selectForm}
        dataSource={records}
        selectedFormKeys={selectedFormKeys}
      />
    );
  }
  render() {
    const {
      container,
    } = styles;
    return (
      <div className={container}>
        {this.renderFormList()}
      </div>
    );
  }
}

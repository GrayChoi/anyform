import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormList from './FormList';
import styles from './Main.module.css';

export default class Main extends PureComponent {
  static propTypes = {
    records: PropTypes.objectOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      createdAt: PropTypes.number.isRequired,
      updatedAt: PropTypes.number.isRequired,
    })),
  };
  static defaultProps = {
    records: {},
  };
  handleCellChange = (payload) => {
    this.props.onCellChange(payload);
  }
  renderFormList = () => {
    const records = Object.values(this.props.records);
    return (
      <FormList
        onCellChange={this.handleCellChange}
        dataSource={records}
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

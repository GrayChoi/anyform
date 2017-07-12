import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Main extends PureComponent {
  static propTypes = {
    records: PropTypes.object,
  };
  static defaultProps = {
    records: {},
  };
  renderFormList = () => {
    const records = Object.values(this.props.records);
    console.log(records);
    return records.map(record => <div key={record.key}>{record.name}</div>);
  }
  render() {
    return (
      <div>
        {this.renderFormList()}
      </div>
    );
  }
}

import React, { PureComponent } from 'react';
import { Input, Icon } from 'antd';
import * as propTypes from '../propTypes';
import styles from './EditableCell.module.css';

const noop = () => {};
export default class EditableCell extends PureComponent {
  static propTypes = {
    value: propTypes.string,
    onChange: propTypes.func,
  }

  static defaultProps = {
    value: '',
    onChange: noop,
  }

  state = {
    value: this.props.value,
    editable: false,
  }

  componentWillReceiveProps(props) {
    if (props.value !== this.state.value) {
      this.setState({
        value: props.value,
      });
    }
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange &&
      this.state.value !== this.props.value) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    const {
      editableCell,
      editableCellInputWrapper,
      editableCellTextWrapper,
      editableCellIcon,
      editableCellIconCheck,
    } = styles;
    return (
      <div className={editableCell}>
        {
          editable ?
            <div className={editableCellInputWrapper}>
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className={editableCellIconCheck}
                onClick={this.check}
              />
            </div>
            :
            <div className={editableCellTextWrapper}>
              {value || ' '}
              <Icon
                type="edit"
                className={editableCellIcon}
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}

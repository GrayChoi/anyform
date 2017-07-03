import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

import styles from './ToggleButton.module.css';

export default class ToggleButton extends PureComponent {
  
  static propTypes = {
    onPress: PropTypes.func.isRequired,
  };

  render() {
    const { onPress } = this.props;
    return (
      <span onClick={onPress} className={styles.toggleButton}>
        <span className={styles.text}>入力項目</span>
        <span className={styles.plusNormal}><Icon type="plus" /></span>
      </span>
    );
  }
}

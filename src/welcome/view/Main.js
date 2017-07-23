import React, { PureComponent } from 'react';
import styles from './Main.module.css';

export default class Welcome extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <h2 className={styles.topHeaderCatch}>
          フォームの作成はANY FORM!
          <br/>
          独自のURLですぐ配布できる
          <br/>
          <span className={styles.topHeaderSubCatch}>
            アンケート、ペーメントを、無料で簡単に
          </span>
        </h2>
        <a className={styles.startBtn} href="/forms">
          無料で始まる
        </a>
      </div>
    );
  }
}
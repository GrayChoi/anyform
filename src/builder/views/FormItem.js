import React from 'react';
import { DragSource } from 'react-dnd';
import * as propTypes from '../propTypes';
import ItemTypes from '../../common/constants/ItemTypes';
import styles from './FormItem.module.css';

const formItemSource = {
  beginDrag({ label, type }) {
    return {
      label,
      type,
    };
  }
};

@DragSource(
  ItemTypes.FormItem,
  formItemSource, 
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)
export default class FormItem extends React.Component {
  static propTypes = {
    label: propTypes.label.isRequired,
    type: propTypes.type.isRequired,
    color: propTypes.color.isRequired,
    // Injected by React DnD:
    connectDragSource: propTypes.dndAction.isRequired,
    isDragging: propTypes.isDragging.isRequired,
  }

  render() {
    const {
      isDragging,
      connectDragSource,
      label,
      color,
    } = this.props;
    return connectDragSource(
      <div className={styles.item} style={{ opacity: isDragging ? 0.5 : 1, backgroundColor: color }}>
        {label}
      </div>
    );
  }
}
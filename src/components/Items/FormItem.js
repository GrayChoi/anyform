import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';
import styles from './FormItem.css';

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
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    // Injected by React DnD:
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  }

  render() {
    const {
      isDragging,
      connectDragSource,
      label,
    } = this.props;
    return connectDragSource(
      <div className={styles.item} style={{ opacity: isDragging ? 0.5 : 1 }}>
        {label}
      </div>
    );
  }
}
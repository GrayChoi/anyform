import React from 'react';
import { Form, Modal } from 'antd';

const CreateFormModal = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Create a new Form"
        okText="OK"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
      </Modal>
    );
  }
);

export default CreateFormModal;
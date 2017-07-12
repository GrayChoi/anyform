import React from 'react';
import { Form, Modal, Input } from 'antd';

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
        <Form layout="vertical">
          <Form.Item label="name">
            {
              getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input the name of form.' }],
              })(
                <Input />
              )
            }
          </Form.Item>
        </Form>
      </Modal>
    );
  }
);

export default CreateFormModal;
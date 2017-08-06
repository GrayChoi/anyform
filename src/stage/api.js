import request from '../request';

export const addFormItem = ({ formId, formItem }) => {
  request(`/form/${formId}/formItem`, {
    method: 'POST',
    data: formItem,
  });
};

export const deleteFormITem = ({ formId, formItemId }) => {
  request(`/form/${formId}/formItem/${formItemId}`, {
    method: 'DELETE',
  });
};


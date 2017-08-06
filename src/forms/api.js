import request from '../request';

export const createForm = (data) => {
  request('/form', {
    method: 'POST',
    data,
  });
};

export const deleteForms = (data) => {
  request('/form/deletes', {
    method: 'POST',
    data,
  });
};

export const updateForm = (data) => {
  const { key } = data;
  request(`/form/${key}`, {
    method: 'PUT',
    data,
  });
};
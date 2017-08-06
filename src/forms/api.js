import request from '../request';

export const createForm = (data) => {
  request('/forms', {
    method: 'POST',
    data,
  });
};

export const deleteForms = (data) => {
  request('/forms/deletes', {
    method: 'POST',
    data,
  });
};

export const updateForm = (data) => {
  const { key } = data;
  request(`/forms/${key}`, {
    method: 'PUT',
    data,
  });
};
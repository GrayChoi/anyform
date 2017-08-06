import request from '../request';

export const createForm = (data) => {
  request('/forms', {
    method: 'POST',
    data,
  });
}

export const deleteForms = (data) => {
  request('/forms/deletes', {
    method: 'POST',
    data,
  });
}
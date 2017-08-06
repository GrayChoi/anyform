import request from '../request';

export const createForm = (data) => {
  request('/forms', {
    method: 'POST',
    data,
  });
}
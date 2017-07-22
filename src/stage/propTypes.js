import PropTypes from 'prop-types';

export const action = PropTypes.func;

export const formItem = PropTypes.shape({
  key: PropTypes.string,
  type: PropTypes.string.isRequired,
});

export const formItems = PropTypes.arrayOf(formItem);

export const dndAction = PropTypes.func;

export const bool = PropTypes.bool;

export const children = PropTypes.oneOfType([
  PropTypes.element,
  PropTypes.arrayOf(PropTypes.element),
]);
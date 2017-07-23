import PropTypes from 'prop-types';
import * as categorys from './constants/categorys';

export const category = PropTypes.objectOf(PropTypes.oneOf([
  categorys.MY_FORMS,
  categorys.FAVORITES,
  categorys.ARCHIVE,
  categorys.TRASH,
]));

export const form =  PropTypes.shape({
  key: PropTypes.string,
  name: PropTypes.string,
  createdAt: PropTypes.number,
  updatedAt: PropTypes.number,
});

export const formList = PropTypes.arrayOf(form);

export const action = PropTypes.func;

export const selectedFormKeys = PropTypes.arrayOf(PropTypes.string);

export const bool = PropTypes.bool;

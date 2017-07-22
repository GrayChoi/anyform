import PropTypes from 'prop-types';
import * as categorys from './constants/categorys';

export const category = PropTypes.objectOf(PropTypes.oneOf([
  categorys.MY_FORMS,
  categorys.FAVORITES,
  categorys.ARCHIVE,
  categorys.TRASH,
]));

export const form =  PropTypes.objectOf(PropTypes.shape({
  key: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  updatedAt: PropTypes.number.isRequired,
}));

export const action = PropTypes.func;

export const selectedFormKeys = PropTypes.arrayOf(PropTypes.string);

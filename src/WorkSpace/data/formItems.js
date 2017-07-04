import types from '../../common/constants/FormItemTypes';

const formItems = [
  {
    type: types.INPUT,
    label: 'テキスト入力',
    color: '#F44336',
  },
  {
    type: types.INPUT_NUMBER,
    label: '数値入力',
    color: '#E91E63',
  },
  {
    type: types.SELECT,
    label: 'プル・ダウン',
    color: '#9C27B0',
  },
  {
    type: types.DATE_PICKER,
    label: 'カレンダー',
    color: '#673AB7',
  },
  {
    type: types.RATE,
    label: 'レート',
    color: '#3F51B5',
  },
];

export default formItems;
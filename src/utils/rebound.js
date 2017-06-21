import debounce from 'lodash.debounce';

export default (func1, func2, times) => {
  let wait = 100;
  for (let i = 0; i < times; i++) {
    if (i % 2 === 0) {
      debounce(
        func1,
        wait,
      )();
    } else {
      debounce(
        func2, 
        wait,
      )();
    }
    wait += 100;
  }
}
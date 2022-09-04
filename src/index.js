import add, { deepClone } from '../utils/add';
import './vueApp/main';
import './css/index.css';
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
// var _ = require('lodash');
import _ from 'lodash';

console.log(add(1, 2));
console.log(deepClone({ a: 'a', b: 'b' }));

var array = [1];
var other = _.concat(array, 2, [3], [[4]]);

console.log(other);

let p = new Promise((resolve, reject) => {
  resolve(11);
});

p.then((res) => {
  console.log(res);
});

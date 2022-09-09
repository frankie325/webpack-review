import './utils/ArrayBuffer';
import './utils/fileOperate';
import add from './utils/add';
import './vueApp/main';
import './css/index.css';
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
// var _ = require('lodash');
import _ from 'lodash';
import Cookies from 'js-cookie';

console.log(add(1, 3));
// console.log(deepClone({ a: 'a', b: 'b' }));

var array = [1];
var other = _.concat(array, 2);

console.log(other);

let p = new Promise((resolve, reject) => {
  resolve(11);
});

p.then((res) => {
  console.log(res);
});

function setCookie() {
  console.log(111);
  // http://localhost:8081/
  Cookies.set('myTest', 'hello', {
    domain: 'baike.baidu.com',
  });
  // Cookies.remove('myTest');
  // document.cookie = 'myTest=Hello; domain=baidu.com; secure';

  console.log(document.cookie);
}

setCookie();

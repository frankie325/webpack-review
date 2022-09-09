function add(a: number, b: number) {
  return a + b;
}

export const mul = (x: number, y: number) => {
  return x * y;
};

// const setTag = '[object Set]';
// const mapTag = '[object Map]';
// const objectTag = '[object Object]';
// const arrayTag = '[object Array]';

// // 下面是不可遍历的对象

// // 基本类型的包装对象
// const stringTag = '[object String]';
// const numberTag = '[object Number]';
// const booleanTag = '[object Boolean]';
// const errorTag = '[object Error]';
// const dateTag = '[object Date]';
// const regexpTag = '[object RegExp]';

// const deepTag = [setTag, mapTag, objectTag, arrayTag];

// function isObject(target) {
//   return typeof target === 'object' && target !== null;
// }

// // 保证原型是和拷贝对象的一样，保持继承关系
// function getInit(target) {
//   return new target.constructor();
// }

// function getType(target) {
//   return Object.prototype.toString.call(target);
// }

// // lodash克隆Symbol的方法，可以不克隆，
// // function cloneSymbol(target) {
// //   return Object(Symbol.prototype.valueOf.call(target));
// // }

// // 克隆正则
// function cloneRegExp(target) {
//   /*
//    假如正则为 /\d+/ig

//    target.source可以获取表达式部分，也就是\d+
//    使用/\w*$/.exec(target)，可匹配到修饰符部分，也就是ig
//   */
//   const reFlags = /\w*$/; //匹配修饰符部分

//   const result = new target.constructor(target.source, reFlags.exec(target));
//   result.lastIndex = target.lastIndex; //lastIndex属性不仅可读还可写，所以需要更新lastIndex
//   return result;
// }

// function cloneOtherType(target, type) {
//   const Ctor = target.constructor;
//   switch (type) {
//     case stringTag:
//     case numberTag:
//     case booleanTag:
//     case errorTag:
//     case dateTag:
//       return new Ctor(target);
//     case regexpTag:
//       return cloneRegExp(target);

//     // 如果还有特殊的对象类型需要处理，加在switch语句中即可

//     default:
//       return null;
//   }
// }

// export function deepClone(target, map = new WeakMap()) {
//   // 非引用类型直接返回
//   if (!isObject(target)) {
//     return target;
//   }

//   let cloneTarget;

//   const type = getType(target);

//   if (deepTag.includes(type)) {
//     cloneTarget = getInit(target);
//   } else {
//     return cloneOtherType(target, type);
//   }

//   if (map.get(target)) {
//     // 说明target是循环引用的数据，直接返回之前保存的该数据对应的克隆的数据
//     return map.get(target);
//   }
//   map.set(target, cloneTarget);

//   // 克隆Set，因为WeakSet是弱引用，无法遍历，且弱引用没有拷贝的必要性
//   if (type === setTag) {
//     target.forEach((value) => {
//       cloneTarget.add(deepClone(value, map));
//     });
//     return cloneTarget;
//   }

//   // 克隆Map，因为WeakMap是弱引用，无法遍历，且弱引用没有拷贝的必要性
//   if (type === mapTag) {
//     target.forEach((value, key) => {
//       cloneTarget.set(key, deepClone(value, map));
//     });
//     return cloneTarget;
//   }

//   // 克隆数组和对象
//   if (type === objectTag || type === arrayTag) {
//     for (const key of Object.keys(target)) {
//       cloneTarget[key] = deepClone(target[key], map);
//     }
//   }

//   return cloneTarget;
// }

// let proto = {
//   fun() {},
// };

// const set = new Set();
// set.add(1);
// set.add(2);

// const map = new Map();
// map.set(1, { a: 'a' });
// map.set(2, { b: 'b' });

// let obj = {
//   name: 'kfg',
//   age: 12,
//   set,
//   map,
//   symbol: Symbol(),
//   objString: new String('str'),
//   objNumber: new Number(1),
//   objBoolean: new Boolean(true),
//   reg: /\d+/gi,
// };

// Object.setPrototypeOf(obj, proto);

// obj['circle'] = obj;

// console.log(deepClone(obj));

export default add;

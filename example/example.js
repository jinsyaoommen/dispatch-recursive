'use strict';

var isArray = require('lodash/lang/isArray');
var isPlainObject = require('lodash/lang/isPlainObject');
var isString = require('lodash/lang/isString');
var mapValues = require('lodash/object/mapValues');
var dispatch = require('../es5');

function reverseString(target) {
  if (isString(target)) {
    return target.split('').reverse().join('');
  }

  return undefined;
}

function reverseArray(target, rev) {
  // Recursion!!!
  // Reverses each member of the array, and then reverses the whole array.
  if (isArray(target)) {
    return target.map(rev).reverse();
  }

  return undefined;
}

function reverseObjectProperties(target, rev) {
  // Recursion!!!
  // Original rev function is used to transform the next layer
  // of object properties.
  if (isPlainObject(target)) {
    return mapValues(target, rev);
  }

  return undefined;
}

function irreversible(target) {
  console.log(target, 'irreversible');
  return target;
}

var rev = dispatch(
  reverseString,
  reverseArray,
  reverseObjectProperties,
  irreversible
);

rev(42); // 42 'irreversible'

console.log(rev('abc')); // 'cba'

console.log(rev(['a', 'b', 'c'])); // [ 'c', 'b', 'a' ]

console.log(rev([['c', 'b', 'a'], 'oof', 32, null, {foo: 'rab'}]));
// [ { foo: 'bar' }, null, 32, 'foo', [ 'a', 'b', 'c' ] ]

console.log(
  rev(
    {
      beep: ['p', 'o', 'o', 'b'],
      nested: {
        nope: null,
        abc: 'cba',
        abcArr: ['c', 'b', 'a']
      },
      missed: 0
    }
  )
);
//{
//  beep: [ 'b', 'o', 'o', 'p' ],
//  nested: {
//    nope: null,
//    abc: 'abc',
//    abcArr: [ 'a', 'b', 'c' ]
//  },
//  missed: 0
//}

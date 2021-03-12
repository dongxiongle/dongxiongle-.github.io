Function.prototype._call = function (context, ...args) {
  context = (typeof context === 'object' && context !== null) ? context : window;
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};

// const arr = [1, 2, 3, 4];
// Array.prototype.splice._call(arr, 1, 2);
// console.log(arr);
// Array.prototype.shift._call(arr);
// console.log(arr);

Function.prototype._apply = function (context, args = []) {
  context = typeof context === 'object' && context !== null ? context : window;
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};

// const b = [5,6,7,8];
// Array.prototype.unshift._apply(b, [3,4]);
// console.log(b);
// Array.prototype.shift._apply(b);
// console.log(b);

Function.prototype._bind = function (context, ...bindArgs) {
  return (...args) => {
    this.call(context, ...bindArgs, ...args);
  };
};

function list() {
  return Array.prototype.slice.call(arguments);
}
var list1 = list(1, 2, 3);
var leadingThirtysevenList = list._bind(null, 37);
var list2 = leadingThirtysevenList();
var list3 = leadingThirtysevenList(1, 2, 3);
console.log(list1);
console.log(list3);
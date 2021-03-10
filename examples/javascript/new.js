function Person(name, age) {
  this.name = name;
  this.age = age;
  // return null;
}
Person.prototype = {
  getName() {
    return this.name;
  }
};

function _new (...args) {
  const obj = {};
  // 获取构造函数
  const Constructor = Array.prototype.shift.apply(args);
  // 链接
  obj.__proto__ = Constructor.prototype;
  const result = Constructor.apply(obj, args);
  return !!result && (typeof result === 'object' || typeof result === 'function') ? result : obj;
}

var person = new Person('老王', 18);
var xiaoming = _new(Person, '老王', 18);
console.log(person.getName());
console.log(xiaoming.getName());
> **new** 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。

要手动实现，需要知道**new**进行了什么操作。
> 1. 创建一个空的简单js对象
> 2. 链接该对象到另一个对象(原型链)
> 3. 将步骤1新创建的对象作为**this**的上下文
> 4. 如果该函数没有返回对象，则返回**this**

### 示例
```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype = {
  getName() {
    return this.name;
  }
};

var person = new Person('老王', 18);
```
### 分析
1. 创建一个空对象
```js
var obj = {};
```
2. 链接该对象到另一个对象
```js
obj.__proto__ = Person.prototype;
```
3. 将步骤1新创建的对象作为this的上下文
```js
Person.apply(obj, ['老王', 18]);
```
4. 如果该函数没有返回对象，则返回this
```js
// Person 没有返回值，或者返回的不是对象类型
var person = obj;
```

### 封装
```js
function _new (...args) {
  const obj = {};
  // 获取构造函数
  const Constructor = Array.prototype.shift.apply(args);
  // 链接到另一个对象，把obj的__proto__指向构造函数的原型
  obj.__proto__ = Constructor.prototype;
 // 将obj作为this的上下文，并获取返回值
  const result = Constructor.apply(obj, args);
  // 如果该函数没有返回对象，则返回this
  return !!result && (typeof result === 'object' || typeof result === 'function') ? result : obj;
}
```
### 测试
```js
const per1 = new Person('老王', 18);
const per2 = _new(Person, '老王'， 18);
per1.getName(); // 老王
per2.getName(); // 老王
```
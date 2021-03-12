## 手写call、apply、bind
> call、apply、bind都是用来改变this指向的。

### call
> call 方法接收的是一个参数列表
> function.call(thisArg, arg1, arg2, ...)
> 方法立即执行

```js
Function.prototype._call = function (context, ...args) {
  // 此时this为fun，（fun._call）
  // 判断传入的thisArg是否为对象，如果不是则thisArg为window
  context = typeof context === 'object' ? context : window;
  // 防止属性重复
  const key = Symbol();
  // 把fun赋值给context的key属性
  context[key] = this;
  // 执行context[key], 此时 context[key]方法里的this指向了context,即obj
  const result = context[key](...args);
  delete context[key];
  return result;
};
function fun() {}
fun._call(obj);
```

### apply
> apply 方法接收的是一个参数数组
> function.apply(thisArg, [argsArray])
> 方法立即执行

```js
Function.prototype._apply = function (context, args = []) {
  context = typeof context === 'object' ? context : window;
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
}
```

### bind
> bind 方法接收一个参数列表
> function.bind(thisArg[, arg1[, arg2[, ...]]])
> 返回一个新的方法
> bind 的另一个用法是使一个寒素拥有预设的初始参数。只要将这些参数作为bind的参数写在this后面。当绑定函数被调用时，这些参数会被插入到目标函数的参数列表的开始位置

```js
Function.prototype._bind = function(context, ...bindArgs) {
  context = typeof context === 'object' ? context : window;
  return (...args) => {
    this.call(context, ...bindArgs, ...args);
  }
}
```
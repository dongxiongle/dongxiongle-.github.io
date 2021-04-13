### promise 基础功能

> Promise 是一个类，在执行这个类的时候会传入一个执行器，这个执行器会立即执行
> Promise 有三种状态：Pending、Fulfilled、Rejected
> 状态一旦改变就不能更改：Pending → Fulfilled 或者 Pending → Rejected
> Promise 使用 resolve 和 reject 两个函数来更改状态
> then 方法内部做的事情就是判断状态：如果成功(Fulfilled)，调用成功回调函数；如果失败(Rejected)，则调用失败回调函数

### 定义 Promise 类以及三种状态

```ts
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class MyPromise {
  status = PENDING;
  // 传入一个执行器
  constructor(executor: Function) {
    // 执行器立即执行
    executor(this.reslove, this.reject);
  }
  // 更改成功后的状态
  reslove = () => {};
  // 更改失败后的状态
  reject = () => {};
}
```

### 更改状态

```ts
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class MyPromise {
  status = PENDING;
  value: unknown;
  error: unknown;
  // 传入一个执行器
  constructor(executor: Function) {
    // 执行器立即执行
    executor(this.reslove, this.reject);
  }
  // 更改成功后的状态
  reslove = (value: unknown) => {
    if (status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
    }
  };
  // 更改失败后的状态
  reject = (error: unknown) => {
    if (status === PENDING) {
      this.status = REJECTED;
      this.error = error;
    }
  };
}
```

### then 实现

```ts
  then(onFulfilled: Function, onRejected: Function) {
    if (this.status === FULFILLED) {
      // 成功回调
      onFulfilled(this.value);
    } else if (this.status === REJECTED) {
      // 失败回调
      onRejected(this.error);
    }
  }
```

### 异步

> 缓存成功与失败回调

```ts
class MyPromise {
  //...
  onFulfilledCallback!: Function;
  onRejectedCallback!: Function;
  // ...
  resloved = (value: unknown) => {
    if (this.status === PENDING) {
      this.value = value;
      this.status = FULFILLED;
      // 执行成功回调
      this.onFulfilledCallback && this.onFulfillCallback(value);
    }
  };
  reject = (error: unknown) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.error = error;
      // 执行失败回调
      this.onRejectedCallback && this.onRejectedCallback(error);
    }
  };
  then(onFulfilled: Function, onRejected?: Function) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    } else if (this.status === REJECTED) {
      onRejected && onRejected(this.error);
    } else if (this.status === PENDING) {
      // 存储回调方法
      this.onFulfilledCallback = onFulfilled;
      if (onRejected) {
        this.onRejectedCallback = onRejected;
      }
    }
  }
}
```

### 实现 then 方法多次调用

> 以上代码在多次调用 then 方法后，只执行最后一个。每调用一次 then 方法，前面缓存的回调会被后面的覆盖。因此应该使用数组来存储回调方法

```ts
class MyPromise {
  //...
  // 成功回调缓存
  onFulfilledCallbacks: Function[] = [];
  // 失败回调缓存
  onRejectedCallbacks: Function[] = [];
  // ...
  resloved = (value: unknown) => {
    if (this.status === PENDING) {
      this.value = value;
      this.status = FULFILLED;
      // 执行缓存的所有成功回调
      while (this.onFulfilledCallbacks.length) {
        const cb = this.onFulfilledCallbacks.shift();
        cb && cb(value);
      }
    }
  };
  reject = (error: unknown) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.error = error;
      // 执行缓存的所有失败回调
      while (this.onRejectedCallbacks.length) {
        const cb = this.onRejectedCallbacks.shift();
        cb && cb(error);
      }
    }
  };
  then(onFulfilled: Function, onRejected?: Function) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    } else if (this.status === REJECTED) {
      onRejected && onRejected(this.error);
    } else if (this.status === PENDING) {
      // 缓存回调
      this.onFulfilledCallbacks.push(onFulfilled);
      if (onRejected) {
        this.onRejectedCallbacks.push(onRejected);
      }
    }
  }
}
```

### 实现 then 方法的链式调用

> then 方法要链式调用那么就需要返回一个 Promise 对象
> then 方法里面 return 一个返回值作为下一个 then 方法的参数，如果是 return 一个 Promise 对象，那么就需要判断它的状态

```ts
function resolvePromise(
  promise: MyPromise,
  value: any,
  resolve: Function,
  reject: Function
) {
  if (promise === value) {
    return reject(
      new TypeError('Chaining cycle detected for promise #<Promise>')
    );
  }
  if (value instanceof MyPromise) {
    value.then(resolve, reject);
  } else {
    resolve(value);
  }
}
const promise2 = new MyPromise((resolve: Function, reject: Function) => {
  if (this.status === FULFILLED) {
    // 新建一个微任务
    queueMicrotask(() => {
      try {
        // 执行成功回调
        const value = onFulfilled(this.value);
        resolvePromise(promise2, value, resolve, reject);
      } catch (error) {
        reject(error);
      }
    });
  } else if (this.status === REJECTED) {
    queueMicrotask(() => {
      try {
        const error = (onRejected as Function)(this.error);
        resolvePromise(promise2, error, resolve, reject);
      } catch {
        reject(this.error);
      }
    });
  } else if (this.status === PENDING) {
    // 缓存回调
    this.onFulfilledCallbacks.push(() => {
      queueMicrotask(() => {
        try {
          // 执行成功回调
          const value = onFulfilled(this.value);
          resolvePromise(promise2, value, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    });
    this.onRejectedCallbacks.push(() => {
      queueMicrotask(() => {
        try {
          const error = (onRejected as Function)(this.error);
          resolvePromise(promise2, error, resolve, reject);
        } catch {
          reject(this.error);
        }
      });
    });
  }
});
```
### 全部代码
```ts
const PENDING = 'pending'; // pending 状态
const FULFILLED = 'fulfilled'; // 成功状态
const REJECTED = 'rejected'; // 失败状态

function resolvePromise(
  promise: MyPromise,
  value: any,
  resolve: Function,
  reject: Function
) {
  if (promise === value) {
    return reject(
      new TypeError('Chaining cycle detected for promise #<Promise>')
    );
  }
  if (value instanceof MyPromise) {
    value.then(resolve, reject);
  } else {
    resolve(value);
  }
}
class MyPromise {
  // promise状态
  status = PENDING;
  // 成功回调参数
  value: unknown;
  // 失败回调参数
  error: unknown;
  // 成功回调缓存
  onFulfilledCallbacks: Function[] = [];
  // 失败回调缓存
  onRejectedCallbacks: Function[] = [];
  constructor(executor: Function) {
    try {
      // 执行器
      executor(this.reslove, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }
  reslove = (value: unknown) => {
    if (this.status === PENDING) {
      // 该变状态
      this.status = FULFILLED;
      this.value = value;
      // 执行缓存的所有成功回调
      while (this.onFulfilledCallbacks.length) {
        const cb = this.onFulfilledCallbacks.shift();
        cb && cb();
      }
    }
  };
  reject = (error: unknown) => {
    if (this.status === PENDING) {
      // 改变状态
      this.status = REJECTED;
      this.error = error;
      // 执行缓存的所有失败回调
      while (this.onRejectedCallbacks.length) {
        const cb = this.onRejectedCallbacks.shift();
        cb && cb();
      }
    }
  };
  then(onFulfilled: Function, onRejected?: Function) {
    // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value: any) => value;
    // onRejected如果不是函数，就忽略onRejected，直接扔出错误
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (err: any) => {
            throw err;
          };
    const promise2 = new MyPromise((resolve: Function, reject: Function) => {
      if (this.status === FULFILLED) {
        // 新建一个微任务
        queueMicrotask(() => {
          try {
            // 执行成功回调
            const value = onFulfilled(this.value);
            resolvePromise(promise2, value, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.status === REJECTED) {
        queueMicrotask(() => {
          try {
            const error = (onRejected as Function)(this.error);
            resolvePromise(promise2, error, resolve, reject);
          } catch {
            reject(this.error);
          }
        });
      } else if (this.status === PENDING) {
        // 缓存回调
        this.onFulfilledCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              // 执行成功回调
              const value = onFulfilled(this.value);
              resolvePromise(promise2, value, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const error = (onRejected as Function)(this.error);
              resolvePromise(promise2, error, resolve, reject);
            } catch {
              reject(this.error);
            }
          });
        });
      }
    });
    return promise2;
  }
}
export default MyPromise;

```
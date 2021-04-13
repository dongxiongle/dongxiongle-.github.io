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

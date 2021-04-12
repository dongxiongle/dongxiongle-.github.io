const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class MyPromise {
  status = PENDING;
  value: unknown;
  error: unknown;
  constructor(executor: Function) {
    executor(this.reslove, this.reject);
  }
  reslove = (value: unknown) => {
    if (status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
    }
  };
  reject = (error: unknown) => {
    if (status === PENDING) {
      this.status = REJECTED;
      this.error = error;
    }
  };
  then(onFulfilled: Function, onRejected: Function) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    } else if (this.status === REJECTED) {
      onRejected(this.error);
    }
  }
}

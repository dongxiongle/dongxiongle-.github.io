import MyPromise from './promise';
const promise = new MyPromise((resolve: Function, reject: Function) => {
  setTimeout(() => {
    resolve('success');
  }, 5000);
});

promise
  .then((value: any) => {
    console.log(1);
    console.log(1, value);
  }, () => {
    console.log(1, 'error')
  })
  .then((res: any) => {
    throw new Error('error');
  })
  .then(
    (res: any) => {
      console.log(3, res);
    },
    (err: any) => {
      console.log(3, 'err');
      return err;
    }
  ).then((res: any) => {
    console.log(4, 'res');
  }, () => {
    console.log(444);
  });
  promise.then(() => {
    console.log(55);
  })
// promise
//   .then(() => {
//     console.log(2);
//   })
//   .then(() => {
//     console.log(3);
//   });

// const p1 = new Promise((resolve) => {
//   setTimeout(() => {
//     resolve('success');
//   }, 200);
// })
// p1.then().then((res: any) => {
//   console.log(2,res);
//   console.log(2)
// });

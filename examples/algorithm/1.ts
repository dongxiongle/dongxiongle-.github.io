// 实现一个函数模拟除法，用括号把无限循环小数扩起来，例如 1/3 = 0.333333，该函数需要返回'0.(3)'。
// 其实只需要找到小数位中，存在计算到某个位置的时候他的商和余数等于前面某个位置上的商和余数就能确定这之间的这部分就是循环的部分
const fn = (dividend: number, divisor: number) => {
  let a = dividend; // 被除数
  let b = divisor; // 除数
  const loop = new Map();
  let quotient = Math.floor(a / b); // 商
  let remainder = a % b; // 余数
  let i = 0;
  let str = '(';
  for (; i < 100; i++) {
    quotient = Math.floor(remainder * 10 / b);
    remainder = remainder * 10 / b;
    if (loop[quotient] === remainder) {
      break;
    }
    loop.set(quotient, remainder);
  }
  if (i < 100) {
    loop.forEach((value, key) => {
      str += value;
    });
  }
};
console.log(fn(1, 3));
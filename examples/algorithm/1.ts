// 实现一个函数模拟除法，用括号把无限循环小数扩起来，例如 1/3 = 0.333333，该函数需要返回'0.(3)'。
// 其实只需要找到小数位中，存在计算到某个位置的时候他的商和余数等于前面某个位置上的商和余数就能确定这之间的这部分就是循环的部分
/**
 * 
 * @param dividend number 被除数
 * @param divisor number 除数
 */
const fn = (dividend: number, divisor: number) => {
  const loop = new Map();
  let quotient = Math.floor(dividend / divisor); // 商
  let remainder = dividend % divisor; // 余数
  let i = 0;
  let str = '';
  for (; i < 100; i++) {
    quotient = Math.floor(remainder * 10 / divisor);
    remainder = remainder * 10 % divisor;
    if (loop.get(remainder) === quotient) {
      break;
    }
    loop.set(remainder, quotient);
  }
  if (i < 100) {
    str = Math.floor(dividend / divisor) + '.(';
    loop.forEach((value, key) => {
      str += value;
    });
    return str += ')';
  }
  return -1;
};
console.log(fn(1, 3));
console.log(fn(2, 3));
console.log(fn(1, 7));
console.log(fn(1, 9));
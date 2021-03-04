// 无限序列查找第n个数
// 在无限的整数序列 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...中找到第 n 个数字

/**
 * 无限序列查找第n个数
 * @param n number
 */
function fundNum(n: number) {
  if (n <= 9) {
    return n;
  }
  let a = 1; // 所处位置 几位数
  let b = 9; // 序列长度
  // 获取几位数
  while (n > b) {
    a++;
    b += 9 * Math.pow(10, a - 1) * a;
  }
  // 获取数字
  const surplus = n - Math.pow(10, a - 1) + 1;
  const current = Math.pow(10, a - 1) + Math.ceil(surplus / a) - 1;
  const c = surplus % a;
  return c === 0 ? current.toString()[a - 1] : (current).toString()[c - 1];
}

console.log(fundNum(15));
console.log(fundNum(17));
console.log(fundNum(19));
console.log(fundNum(25));
console.log(fundNum(525));
console.log(fundNum(1525));

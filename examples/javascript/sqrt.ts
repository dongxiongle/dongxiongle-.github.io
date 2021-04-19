const sqrt = (n: number) => {
  if (n < 0) {
    return -1;
  }
  if (n === 0 || n === 1) {
    return n;
  }
  let start = 0;
  let end = n;
  let middle = (start + end) / 2;
  let target = 0;
  while(Math.abs(middle - target) >= Number.EPSILON) {
    if (middle**2 > n) {
      end = middle;
    } else if (middle**2 < n) {
      start = middle;
    } else {
      return middle;
    }
    target = middle;
    middle = (start + end) / 2;
  }
  return middle;
};

console.log(sqrt(4));
console.log(sqrt(9));
console.log(sqrt(16));
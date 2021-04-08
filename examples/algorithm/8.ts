function binarySearch<T>(arr: T[], value: T) {
  const sortArr = arr;
  let first = 0;
  let last = sortArr.length - 1;
  while (last >= first) {
    // 中间值
    const middle = Math.floor((first + last) / 2);
    const element = sortArr[middle];
    if (value > element) {
      first = middle + 1;
    } else if (value < element) {
      last = middle - 1;
    } else {
      return middle;
    }
  }
  return -1;
}

console.log(binarySearch([1, 2, 3, 4, 5, 6], 6));
console.log(binarySearch([1, 2, 3, 4, 5, 6], 1));
console.log(binarySearch([1, 2, 3, 4, 5, 6], 4));
console.log(binarySearch([1, 2, 3, 4, 5, 6], 7));

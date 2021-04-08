function binarySearch9<T>(arr: T[], value: T) {
  const sortArr = arr;
  const start = 0;
  const end = sortArr.length - 1;
  return binarySearchRecursive(sortArr, value, start, end);
}
function binarySearchRecursive<T>(
  arr: T[],
  value: T,
  start: number,
  end: number
): Function | number {
  if (start <= end) {
    const middle = Math.floor((start + end) / 2);
    const element = arr[middle];
    if (element < value) {
      return binarySearchRecursive(arr, value, middle + 1, end);
    } else if (element > value) {
      return binarySearchRecursive(arr, value, start, middle - 1);
    } else {
      return middle;
    }
  }
  return -1;
}

console.log(binarySearch9([1, 2, 3, 4, 5, 6], 6));
console.log(binarySearch9([1, 2, 3, 4, 5, 6], 1));
console.log(binarySearch9([1, 2, 3, 4, 5, 6], 4));
console.log(binarySearch9([1, 2, 3, 4, 5, 6], 7));
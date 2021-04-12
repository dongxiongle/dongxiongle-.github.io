function largestNumber(nums: number[]): string {
  const arr = nums.sort((a: number, b: number) => {
    return +(''+b+a) - +(''+a+b);
  });
  let str = '';
  if (arr[0] == 0) {
    str = '0';
  } else {
    str = arr.join('');
  }
  return str;
}

console.log(largestNumber([2,3,4,43,45]));
console.log(largestNumber([0,0,0]));
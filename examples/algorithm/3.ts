/**
 * 输入一个int型数组，数组中的一个或多个连续整数组成一个子数组。求所有子数组中和的最大值。输入的数组中保证至少有一个正数
 * @param arr number[]
 */
function maxSum(arr: number[]) {
  let max = -Infinity;
  let temp = arr[0];
  const { length } = arr;
  for(let i = 1; i < length; i++) {
    if (Math.abs(arr[i] - arr[i - 1]) === 1) {
      temp += arr[i];
    } else {
      temp = arr[i];
    }
    max = Math.max(max, temp);
  }
  return max;
}

const max = maxSum([9,10,11,12,13,3,25,4,1,47,6,7,8,5,14,15]);
const max2 = maxSum([8,9,10,11,12,3,25,4,1,47,6,7,8,5,18,19,20]);
console.log(max); // 55
console.log(max2); // 57
// 寻找两个正序数组的中位数
// 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数
// https://leetcode-cn.com/problems/median-of-two-sorted-arrays/
/**
 * 暴力合并排序求值
 * @param nums1
 * @param nums2 
 * @returns 
 */
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  let i = 0;
  let j = 0;
  let arr = [];
  while (i < nums1.length && j < nums2.length) {
    arr.push(nums1[i] < nums2[j] ? nums1[i++] : nums2[j++]);
  }
  arr.push(...(i == nums1.length ? nums2.slice(j) : nums1.slice(i)));
  const { length } = arr;
  console.log(arr);
  return (arr[Math.floor(length / 2)] + arr[Math.floor((length - 1) / 2)]) / 2;
}

console.log(findMedianSortedArrays([1,3], [2]));
console.log(findMedianSortedArrays([1,2], [3,4]));
console.log(findMedianSortedArrays([0,0], [0,0]));
console.log(findMedianSortedArrays([], [1]));

/**
 * 二分法
 * @param nums1 
 * @param nums2 
 * @returns 
 */
function findMedianSortedArrays2(nums1: number[], nums2: number[]): number {
  let i = 0;
  let j = 0;
  let arr = [];
  while (i < nums1.length && j < nums2.length) {
    arr.push(nums1[i] < nums2[j] ? nums1[i++] : nums2[j++]);
  }
  arr.push(...(i == nums1.length ? nums2.slice(j) : nums1.slice(i)));
  const { length } = arr;
  console.log(arr);
  return (arr[Math.floor(length / 2)] + arr[Math.floor((length - 1) / 2)]) / 2;
}

console.log(findMedianSortedArrays2([1,3], [2]));
console.log(findMedianSortedArrays2([1,2], [3,4]));
console.log(findMedianSortedArrays2([0,0], [0,0]));
console.log(findMedianSortedArrays2([], [1]));
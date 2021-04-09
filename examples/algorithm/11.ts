// 已知一个长度为 n 的数组，预先按照升序排列，经由 1 到 n 次 旋转 后，得到输入数组。例如，原数组 nums = [0,1,4,4,5,6,7] 在变化后可能得到：
// 若旋转 4 次，则可以得到 [4,5,6,7,0,1,4]
// 若旋转 7 次，则可以得到 [0,1,4,4,5,6,7]
// 链接：https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii
/**
 * 寻找宣战排序数组中的最小组
 * @param nums 已升序数组
 */
function findMin11(nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;
  while(left < right) {
    let middle = Math.floor((left + right) / 2);
    if (nums[middle] > nums[right]) {
      left = middle + 1;
    } else if (nums[middle] < nums[right]) {
      right = middle;
    } else {
      right--;
    }
  }
  return nums[left];
}
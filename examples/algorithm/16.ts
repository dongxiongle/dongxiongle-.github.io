// 打家劫舍1
function rob(nums: number[]): number {
  const { length } = nums;
  if (length === 0) {
    return 0
  }
  if (length == 1) {
    return nums[0];
  }
  let first = nums[0];
  let second = Math.max(first, nums[1]);
  for (let i = 2; i < length; i++) {
    const temp = second;
    second = Math.max(second, first + nums[i]);
    first = temp;
  }
  return second;
}
// 打家劫舍2，环形
function rob2(nums: number[]): number {
  const { length } = nums;
  if (length === 0) {
    return 0;
  }
  if (length === 1) {
    return nums[0];
  } else if (length === 2) {
    return Math.max(nums[0], nums[1]);
  }
  const robRang = (nums: number[], start: number, end: number): number => {
    let first = nums[start];
    let second = Math.max(first, nums[start+1]);
    for(let i = start + 2; i <= end; i++) {
      const temp = second;
      second = Math.max(second, first + nums[i]);
      first = temp;
    }
    return second;
  }
  return Math.max(robRang(nums, 0, length - 2), robRang(nums, 1, length - 1))
}
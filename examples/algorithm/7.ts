/**
 * 划分操作
 * @param target 选择的数组
 * @param left 数组最左边
 * @param right 数组的最右边
 * @returns 划分操作后的数组
 */
function partition<T>(target: T[], left: number, right: number) {
  const pivot = target[Math.floor((left + right) / 2)];
  let i = left; 
  let j = right;
  while(i <= j) {
    while(target[i] < pivot) {
      i++;
    }
    while(target[j] > pivot) {
      j--;
    }
    if (i <= j) {
      const temp = target[i];
      target[i] = target[j];
      target[j] = temp;
      i++;
      j--;
    }
  }
  return i;
}
/**
 * 递归函数
 * @param target 选择的数组
 * @param left 数组的最左边
 * @param right 数组的最右边
 * @returns 排序后的数组
 */
function quick<T>(target: T[], left: number, right: number) {
  let index: number;
  if(target.length > 1) {
    index = partition(target, left, right);
    if (left < index - 1) {
      quick(target, left, index - 1);
    }
    if (left < right) {
      quick(target, index, right);
    }
  }
  return target;
}
/**
 * 快速排序入口
 * @param target 要排序的数组
 * @returns 排序后的数组
 */
function quickSort<T>(target: T[]) {
  const arr = target;
  return quick(arr, 0, arr.length - 1);
}
console.log(quickSort([5, 2, 3, 6, 1]));

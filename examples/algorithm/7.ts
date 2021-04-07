/**
 * 快速排序入口
 * @param arr 待排序的数组
 */
function quickSort<T>(arr: T[]) {
  return quick(arr, 0, arr.length - 1);
}
/**
 * 排序递归函数
 * @param arr 待排序的数组
 * @param left 最左侧指针
 * @param right 最右侧指针
 * @returns 排序后的数组
 */
function quick<T>(arr: T[], left: number, right: number) {
  let index: number;
  if (arr.length > 1) {
    // 划分，获取指针
    index = partition(arr, left, right);
    // 对比主元小的子数组排序
    if (index - 1 > left) {
      quick(arr, left, index - 1);
    }
    // 对比主元大的子数组排序
    if (index < right) {
      quick(arr, index, right);
    }
  }
  return arr;
}
/**
 * 划分操作
 * @param arr 待排序数组
 * @param left 左侧指针
 * @param right 右侧指针
 * @returns 左侧指针
 */
function partition<T>(arr: T[], left: number, right: number) {
  const pivot = arr[Math.floor((left + right) / 2)];
  let i = left;
  let j = right;
  // 直到左侧指针超过右侧指针
  while (i <= j) {
    // 左侧，找到比主元大的值
    while (arr[i] < pivot) {
      i++;
    }
    // 右侧，找到比主元小的值
    while (arr[j] > pivot) {
      j--;
    }
    // 交换
    if (i <= j) {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      i++;
      j--;
    }
  }
  return i;
}
console.log(quickSort([5, 2, 1, 3, 4, 6, 1, 6, 9, 7]));

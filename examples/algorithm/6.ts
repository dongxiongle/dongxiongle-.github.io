// https://leetcode-cn.com/problems/merge-intervals/

const merge = function(intervals: number[][]) {
  const sortArr = intervals.sort((a, b) => a[0] - b[0]);
  const arr = [sortArr[0]];
  let i = 1;
  while (i < sortArr.length) {
    let flag = true;
    for (let k = 0; k < arr.length; k++) {
      const start = sortArr[i][0];
      const end = sortArr[i][1];
      // 连续 相交
      if (start <= arr[k][1] && end >= arr[k][0]) {
        arr[k][0] = Math.min(start, arr[k][0]);
        arr[k][1] = Math.max(end, arr[k][1]);
        flag = false;
        break;
      }
    }
    flag && arr.push(sortArr[i]);
    i++;
  }
  return arr;
};
console.log(
  merge([
    [1, 3],
    [2, 4],
    [5, 7],
    [7, 9],
    [6, 10]
  ])
);

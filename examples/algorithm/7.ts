function bucketSort(arr: number[], bucketSize = 5) {
  if (arr.length < 2) {
    return arr;
  }
  const buckets = createBuckets(arr, bucketSize);
  return sortBuckets(buckets);
}
function createBuckets(arr: number[], bucketSize: number) {
  const buckets: number[][] = [];
  let minValue = arr[0];
  let maxValue = arr[0];
  arr.forEach((item) => {
    minValue = Math.min(minValue, item);
    maxValue = Math.max(maxValue, item);
  });
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  for (let i = 0; i < bucketCount; i++) {
    buckets[i] = [];
  }
  arr.forEach((item) => {
    const index = Math.floor((item - minValue) / bucketSize);
    buckets[index].push(item);
  });
  return buckets;
}
function sortBuckets(arr: number[][]) {
  const sortArr: number[] = [];
  arr.forEach(item => {
    sortArr.push(...insertSort(item));
  });
  return sortArr;
}
function insertSort(arr: number[]) {
  const { length } = arr;
  if (length > 1) {
    for (let i = 1; i < length; i++) {
      let j = i;
      let temp = arr[i];
      while(j > 0 && arr[j - 1] > temp) {
        arr[j] = arr[j - 1];
        j--;
      }
      arr[j] = temp;
    }
  }
  return arr;
}
console.log(bucketSort([5, 2, 1, 3, 4, 6, 1, 6, 9, 7, 8, 100, 40]));

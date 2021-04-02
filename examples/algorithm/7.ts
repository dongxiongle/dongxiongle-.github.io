function insertSort(arr: number[]) {
  const { length } = arr;
  let temp;
  for(let i = 1; i < length; i++) {
    let j = i;
    temp = arr[i];
    while(j > 0 && arr[j - 1]  > temp) {
      arr[j] = arr[j-1];
      j--;
    }
    arr[j] = temp;
  }
  return arr;
}
console.log(insertSort([5, 2, 3, 6, 1]));

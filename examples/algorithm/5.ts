// 将字符串打印成三角形
const printS = (target: string) => {
  const length = target.length;
  const arrLength = Math.ceil(Math.sqrt(length));
  const finalArr: string[] = new Array(arrLength);
  for (let i = 0; i < arrLength; i++) {
    const arr = new Array(2 * arrLength - 1).fill(' ');
    const strStart = i ** 2;
    const strLength = 2 * i + 1;
    const str = target.substr(strStart, strLength);

    const arrStart = arrLength - i - 1;
    arr.splice(arrStart, strLength, ...str);
    finalArr[i] = arr.join('');
  }
  finalArr.forEach((item) => {
    console.log(item);
  });
};

printS('abcdefghigklmnopqrst');

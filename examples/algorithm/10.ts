/**
 * 最小零钱
 * @param coins 硬币
 * @param amount 零钱
 * @returns 硬币组合
 */
function minCoinChange(coins: number[], amount: number) {
  const cache: number[][] = [];
  const minChange = (value: number): number[] => {
    if (!value) {
      return [];
    }
    if (cache[value]) {
      return cache[value];
    }
    let min: number[] = [];
    let newMin: number[] = [];
    let newAmount: number;
    for(let i = 0; i<coins.length; i++) {
      newAmount = value - coins[i];
      if (newAmount >= 0) {
        newMin = minChange(newAmount);
      }
      if (newAmount >= 0 && (newMin.length < min.length - 1 || !min.length) && (newMin.length || !newAmount)) {
        min = newMin.concat(coins[i]);
      }
    }
    return (cache[value] = min);
  };
  return minChange(amount);
}

console.log(minCoinChange([1, 5, 10, 25], 36));

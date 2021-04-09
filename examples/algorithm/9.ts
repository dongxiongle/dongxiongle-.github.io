const lengthOfLongestSubstring = function(s: string) {
  const length = s.length;
  let max = 0;
  let tep = 0;
  let current = '';
  for (let i = 0; i < length; i++) {
    const index = current.indexOf(s[i]);
    if (index == -1) {
      current += s[i];
      tep++;
    } else {
      current = current.substring(index+1) + s[i];
      console.log(current);
      tep = current.length;
    }
    max = Math.max(max, tep);
  }
  return max;
};

console.log(lengthOfLongestSubstring('dvdf'));
console.log(lengthOfLongestSubstring('aabaab!bb'));

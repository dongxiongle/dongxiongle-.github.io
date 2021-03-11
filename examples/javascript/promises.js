var lengthOfLongestSubstring = function (s) {
  const length = s.length;
  let max = 0;
  let tep = 0;
  let current = {};
  for (let i = 0; i < length; i++) {
    if (current[s.charAt(i)] == 1) {
      tep = 0;
      current = {[s.charAt(i)]: 1};
    } else {
      current[s.charAt(i)] = 1;
    }
    tep++;
    max = max > tep ? max : tep;
  }
  return max;
};
let obj1 = lengthOfLongestSubstring('dvdf');
console.log(obj1);

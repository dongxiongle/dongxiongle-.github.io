// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

// 有效字符串需满足：

// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
function isValid(s: string): boolean {
  if (s.length % 2 !== 0) {
    return false;
  }
  const stack: string[] = [];
  const fn = (value: string, preValue: string) => {
    switch (value) {
      case '(':
        stack.push(value);
        return true;
      case '[':
        stack.push(value);
        return true;
      case '{':
        stack.push(value);
        return true;
      case ')':
        return preValue == '('? !!stack.pop(): false;
      case ']':
        return preValue == '['? !!stack.pop(): false;
      case '}':
        return preValue == '{'? !!stack.pop(): false
    }
  }
  for(let i = 0; i < s.length; i++) {
    if(!fn(s[i], stack[stack.length - 1] || '')){
      return false;
    }
  }
  return stack.length === 0;
}

console.log(isValid('()'));
console.log(isValid('()[]'));
console.log(isValid('(){}'));
console.log(isValid('({[]})'));
console.log(isValid('({[()])})'));
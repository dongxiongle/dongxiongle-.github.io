// 实现一个函数模拟除法，用括号把无限循环小数扩起来，例如 1/3 = 0.333333，该函数需要返回'0.(3)'。
// 其实只需要找到小数位中，存在计算到某个位置的时候他的商和余数等于前面某个位置上的商和余数就能确定这之间的这部分就是循环的部分
var fn = function (dividend, divisor) {
    console.log(dividend, divisor);
};
console.log(fn(1, 3));

/**
 * 输入一个int型数组，数组中的一个或多个连续整数组成一个子数组。求所有子数组中和的最大值。输入的数组中保证至少有一个正数
 * @param arr number[]
 */
function maxSum(arr) {
    var temp = 0;
    var max = 0;
    arr.forEach(function (value) {
        if (value >= 0) {
            temp += value;
            max = max > temp ? max : temp;
        }
        else {
            temp = 0;
        }
    });
    return max;
}
var max = maxSum([1, 2, 4, 5, 7, -1, 0, 1, -9, -8, 9]);
console.log(max);

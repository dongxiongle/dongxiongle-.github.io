import BinarySearchbst from '../tree/index';
const bst =  new BinarySearchbst();
bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);
let str = '';
bst.inOrderTraverse((key: any) => {
  str += key + ' ';
});
console.log(str);
str = '';
bst.preOrderTraverse((key: any) => {
  str += key + ' ';
});
console.log(str);
str = '';
bst.postOrderTraverse((key: any) => {
  str += key + ' ';
});
console.log(str);

const min = bst.min()?.key;
console.log(min);
const max = bst.max()?.key;
console.log(max);
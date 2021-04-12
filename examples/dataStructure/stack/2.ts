// 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

// push(x) —— 将元素 x 推入栈中。
// pop() —— 删除栈顶的元素。
// top() —— 获取栈顶元素。
// getMin() —— 检索栈中的最小元素。

class MinStack {
  stack: number[];
  minStack: number[];
  min: number = Infinity;
  constructor() {
    this.stack = [];
    this.minStack = [Infinity];
  }

  push(val: number): void {
    this.stack.push(val);
    this.min = Math.min(this.min, val);
    this.minStack.push(this.min);
    console.log('push', this.min);
  }

  pop(): void {
    this.stack.pop();
    this.minStack.pop();
    console.log('pop', this.stack);
    this.min = this.minStack[this.minStack.length - 1];
  }

  top(): number {
    console.log(this.stack);
    return this.stack[this.stack.length - 1];
  }

  getMin(): number {
    return this.min;
  }
}

const minStack = new MinStack();
minStack.push(6);
minStack.push(6);
minStack.push(7);
minStack.getMin();
minStack.pop();
minStack.pop();
minStack.pop();
minStack.push(7);
console.log(minStack.getMin());

minStack.push(-8);

console.log(minStack.top());
console.log(minStack.getMin());

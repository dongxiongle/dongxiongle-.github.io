> Hook 是 React16.8 的新特性。可以在不编写 class 的情况下使用 state 以及其它 React 特性。可以使你在无需修改组件结构的情况下复用状态逻辑

## 为什么要使用 hooks

1. hooks 可以使代码的逻辑性更强，可以抽离公共方法，公共组件
2. hooks 可以用函数声明方式代替 class 声明方式，函数即组件
3. hooks 可能把 class 组件拆分成小组件。

## 主要的 hooks

- userCallback
- useContext
- useEffect
- useLayoutEffect
- useMemo
- useReducer
- useRef
- useState

## hooks 的使用

> 只能在函数最外层调用 hook。不要在循环、条件判断或者子函数中调用
> 只能在函数组件中使用 hook

### **useState** 数据存储，派发更新

> state/props 改变, 组件重新渲染(父组件变化->内部的所有子组件都要重新渲染)
> useState 每次渲染，函数都会重新执行。函数执行完毕，所有的内存都会释放掉。在函数内部创建一个当前函数组件的装填，提供了一个修改状态的方法.
> useState 只有首次渲染的时候才会执行赋值初始值。再次执行获取的不是初始值，而是闭包中的缓存值

```tsx
import React, { useState } from 'react';
const DemoState = () => {
  let [count, setCount] = useState(0);
  const handleAdd = () => {
    count++;
    // count可以是任意值， state的改变都是异步的
    setCount(count);
  };
  return (
    <div>
      <h1>我是hook组件</h1>
      <p>state→{count}</p>
      <button onClick={handleAdd}>加1</button>
    </div>
  );
};
export default DemoState;
```

useState 初始化时可以传入一个回调函数, *setCount*一样可以传入一个回调函数

```tsx
const num = 2;
let [count, setCount] = useState(() => {
  return num * 10;
});
setCount(() => ++count);
```

### **useEffect** 副作用操作

> 副作用 → 没有发生在数据向视图转换过程中的逻辑，分为需要清除的，和不需要清除的
> 函数组件，纯函数，props 这些固定的输入总会得到固定的输出。

1. useEffect 是 componentDidMound、componentDidUpdate 和 componentWillUnmount 的组合
2. useEffect(fn) 接受一个函数，fn 再组件渲染到屏幕之后才会执行。如果有返回值，则返回一个清除副作用的函数，否则不返回
3. 一般是不需要同步执行的，不会阻塞浏览器的渲染。如果需要同步执行 可以使用 useLayoutEffect

```tsx
import React, { useState, useEffect } from 'react';
const DemoHook = () => {
  const num = 2;
  let [count, setCount] = useState(() => {
    return num * 10;
  });
  const handleAdd = () => {
    setCount(() => ++count);
  };
  // Dom渲染完成之后才会执行
  useEffect(() => {
    setTimeout(() => {
      setCount((count) => ++count);
    }, 1000);
  });
  return (
    <div>
      <h1>我是hook组件</h1>
      <p>state→{count}</p>
      <button onClick={handleAdd}>加1</button>
    </div>
  );
};
export default DemoHook;
```

> 运行上面代码之后会发现，数字在不断的自动更新

1. dom 渲染完成后，副作用执行(useEffect 回调执行)
2. 副作用执行过程中，修改了 count,state 状态被修改，从而引发了 dom 的重新渲染，继而副作用执行
3. 形成了无限循环
   解决这种现象和一向 useEffect 传入第二个参数[],数组中定义了组件重新渲染需要的 state 值，只有当数组中 state 值改变了，useEffect 才会执行。如果只传了一个空数组，则在组件重新渲染后，useEffect 不会再执行，可以用来优化
   如果我们需要再组件销毁的阶段，做一些取消事件监听或清除定时器等操作时，再 useEffect 函数第一个参数返回一个函数用于清除这些副作用，相当于 componentWillUnmount.
   清除副作用函数的时机：
4. 在组件的 unmount 之前
5. 如果有多个 useEffect 要执行，则在下一个 useEffect 执行前

### **useLayoutEffect** 渲染更新之前的 useEffect

1. useEffect 执行顺序： 组件更新挂载完成 → 渲染完成 →useEffect 回调执行
2. useLayoutEffect 执行顺序： 组件更新挂载完成 → 执行 useLayoutEffect 回调 → 页面渲染
   useLayoutEffect 会阻止页面渲染，引起页面卡顿

### **useContext**自由获取 context

我们可以使用 useContext 来获取父级组件传递过来的 context 值，这个当前值就是最近的父级组件 Provider 设置的 value 的值，useContext 参数一般是由 createContext 方式引入。useContext 可以代替 context.Consumer 来获取 Provider 中保存的 value 值

1. 创建**provider.tsx**

```tsx
import React, { useState, createContext, Context } from 'react';
export interface ContextValue {
  count: number;
  setCount: Function;
  add: Function;
  reduce: Function;
}
export const context: Context<any> = createContext({});
export const ContextProvider = (props: any) => {
  let [count, setCount] = useState(10);
  const countVal = {
    count,
    setCount,
    add: () => setCount(count + 1),
    reduce: () => setCount(count - 1)
  };
  const { children } = props;
  return <context.Provider value={countVal}>{children}</context.Provider>;
};
```

2. 创建**subContext.tsx**

```tsx
import React, { useContext } from 'react';
import { context, ContextProvider } from './contextDemo';

const Context1 = () => {
  const { count = 0, add, reduce } = useContext(context);
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => add()}>加1</button>
      <button onClick={() => reduce()}>减1</button>
    </div>
  );
};
const subContext = () => (
  <ContextProvider>
    <Context1 />
  </ContextProvider>
);
export default subContext;
```

### **useReducer**无状态组件中的 redux

1. *useReducer*接受的第一个参数是函数，我们可以认为这是一个 reducer，reducer 的参数就是常规的 state 和 action,返回改变后的 state。
2. *useReducer*第二个参数为 state 的初始值。
3. *useReducer*第三个参数为以 state 为参数的回调函数，用来修改初始值
4. *useReducer*返回一个数组，数组的第一项就是更新之后的 state 的值,第二个参数是派发更新的 dispatch 函数
5. dispatch 函数会触发组件的更新
   > 能够促使组件重新渲染的一个*useState*派发更新函数, 另一个就是 useReducer 中的 dispatch。

```tsx
import React, { useReducer } from 'react';
interface State {
  count: number;
  num: number;
}
interface Action {
  type: string;
  value?: any;
}
const initalState: State = {
  count: 0,
  num: 1
};
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'add':
      return { ...state, count: state.count + 1 };
    case 'reduce':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

const ReducerCom = () => {
  const [state, dispatch] = useReducer(reducer, initalState);
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'add' })}>加一</button>
    </div>
  );
};
export default ReducerCom;
```

> 高阶组件

```tsx
import React, { useReducer, FunctionComponent, Context, createContext } from 'react';
export const ProviderContext: Context<any> = createContext({});
// eslint-disable-next-line react/display-name
const HOCComponent = (reducer: any, initState: any) => (Com: FunctionComponent) => {
  // eslint-disable-next-line react/display-name
  return () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state, dispatch] = useReducer(reducer, initState);
    return (
      <ProviderContext.Provider value={{ state, dispatch }}>
        <Com />
      </ProviderContext.Provider>
    );
  };
};

export default HOCComponent;
```

高阶组件使用

```tsx
import React, { useContext } from 'react';
import concat, { ProviderContext } from './HOCComponent';
export const initState = {
  count: 0
};
export const reducer = (state: any, action: Record<string, any>) => {
  switch (action.type) {
    case 'add':
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
};
const ReducerCom2 = () => {
  const { state, dispatch } = useContext(ProviderContext);
  return (
    <div>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: 'add' })}>加1</button>
    </div>
  );
};

export default concat(reducer, initState)(ReducerCom2);
```

### **useRef**获取元素，缓存数据

useRef 有一个参数可以作为缓存数据的初始值，返回值可以被 dom 元素 ref 标记，可以获取被标记的元素节点。

```tsx
import React, { useRef, useState } from 'react';
const RefDemo = () => {
  const [value, setValue] = useState('');
  const inputDom = useRef<HTMLInputElement | null>(null);
  const handlerSubmit = () => {
    const $input = inputDom.current;
    console.log($input);
    console.log($input?.value);
  };
  const reset = () => {
    setValue('');
  };
  const inputChange = () => {
    const $input = inputDom.current;
    if ($input) {
      setValue($input.value);
    }
  };
  console.log(11);
  return (
    <div>
      <input type='text' ref={inputDom} value={value} onChange={() => inputChange()} />
      <button onClick={() => handlerSubmit()}>提交</button>
      <button onClick={() => reset()}>重置</button>
    </div>
  );
};

export default RefDemo;
```

### **useMemo**

1. *useMemo*能形成独立的渲染空间，能够使组件、变量按照约定好的规则更新
2. *useMemo*渲染条件依赖于第二个参数 deps（参考 useEffect）
3. *useMemo*可以避免不必要的更新好不必要的上下文的执行

```tsx
import React, { useMemo, useState } from 'react';
const useMemoDemo = () => {
  const [list, setList] = useState([0, 1, 2]);
  const [number, setNum] = useState(0);
  const [count, setCount] = useState(0);
  const changeList = () => {
    const a = [...list];
    a.push(a.length);
    setList(a);
  };
  // list和number任何一个被改变后useMemo会被重新执行,count被改变后useMemo不会执行
  // 被useMemo包裹的count没有改变，。必须等到useMemo被重新执行后才能获取到最新的count
  const lists = useMemo(() => {
    console.log('又被执行了😔');
    return (
      <div>
        <ul>
          {list.map((item) => {
            console.log('list被渲染了🍺');
            return <li key={item}>{item}</li>;
          })}
        </ul>
        <p>number→{number}</p>
        <span>count→{count}</span>
      </div>
    );
  }, [list, number]);
  return (
    <div>
      <div>
        <span>count→{count}</span>
        <button onClick={() => setCount(count + 1)}>count＋1</button>
      </div>
      <div>
        <span>number→{number}</span>
        <button onClick={() => setNum(number + 1)}>count＋1</button>
      </div>
      {lists}
      <button onClick={() => changeList()}>修改</button>
    </div>
  );
};
export default useMemoDemo;
```
### **useCallback** useMemo版本的回调函数
1. *useCallback*和*useMemo*接受的参数都是一样，都是再其依赖项发生变化后才执行，都返回缓存的值
2. 区别在于*useMemo*返回的是函数运行的结果，*useCallback*返回的是函数。
```tsx
import React, { useCallback, ComponentProps, useState, useEffect } from 'react';
const SubCom = (props: ComponentProps<any>) => {
  console.log('被更新了🚗');
  useEffect(() => {
    props.logInfo('被渲染了');
  }, []);
  return <div>sub</div>;
};
const CallbackDemo = () => {
  const [count, setCount] = useState(0);
  const logInfo = useCallback((subName: string) => {
    console.log(subName);
  }, []);
  return (
    <div>
      <span>count→{count}</span>
      <button onClick={() => setCount(count + 1)}>加一</button>
      <SubCom logInfo={logInfo} />
    </div>
  );
};
export default CallbackDemo;
```

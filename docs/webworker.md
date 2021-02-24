## typescript中使用webworker
### createWorker
```typescript
const CreateWorker = (workContent: Function) => {
  return URL.createObjectURL(
    new Blob(['(', workContent.toString(), ')()'], { type: 'application/javascript' })
  );
}
```
### worker.ts
```typescript
const work = () => {
  // ...
};
```
### main.ts
```typescript
import CreateWorker from './createWorker';
import work from './work';
const myWorker = new Worker(CreateWorker(work), { name: 'myWorker' });
```
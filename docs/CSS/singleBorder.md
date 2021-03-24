## 下面这个图形，只使用一个标签，可以有多少种实现方式

![image](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQUAAABJCAYAAAA0ezMyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAAFFSURBVHhe7dSxCQJRAAVB+6/K3F6uhTP1I2wmBm8WpoV93JL0kSlIOjIFSUemIOnIFCQdmYKko+8pPF8/d10X8EeVKcCgyhRgUGUKMKgyBRhUmQIMqkwBBlWmAIMqU4BBlSnAoMoUYFBlCjCoMgUYVJkCDKpMAQZVpgCDKlOAQZUpwKDKFGBQZQowqDIFGFSZAgyqTAEGVaYAgypTgEGVKcCgyhRgUGUKMKgyBRhUmQIMqkwBBlWmAIMqU4BBlSnAoMoUYFBlCjCoMgUYVJkCDKpMAQZVpgCDKlOAQZUpwKDKFGBQZQowqDIFGFSZAgyqTAEGVaYAgypTgEGVKcCgyhRgUGUKMKgyBRhUmQIMqkwBBlWmAIMqU4BBlSnAoMoUYFBlCjCoMgUYVJkCDKpMAQZV31OQNJ0pSDoyBUlHpiDpo/t+A+8/z2E9Q9MYAAAAAElFTkSuQmCC)

假设单标签是一个**div**

```html
<div></div>
```

通用样式

```css
div {
  position: relative;
  width: 200px;
  height: 50px;
  background: #eee;
  line-height: 50px;
  text-align: center;
  box-sizing: border-box;
  margin: 5px;
}
```

## 方法1： border

```css
div {
  border-left: 20px pink solid;
}
```

## 方法2：伪元素

```css
div:before {
  position: absolute;
  width: 20px;
  height: 100%;
  top: 0;
  left: 0;
  content: '';
  background: pink;
}
```

## 方法3：外阴影

```css
div {
  width: 180px;
  margin-left: 25px;
  box-shadow: -20px 0 0 0 pink;
}
```

## 方法4：内阴影
```css
div {
  box-shadow: 20px 0 0 0 pink inset;
}
```

## 方法5： 渐变
```css
div {
  background-image: linear-gradient(to right, pink 0, pink 20px, #eee 20px);
}
```
## 方法6： drop-shadow
> drop-shadow() 过滤器是创建一个符合图像本身形状的阴影
> drop-shadow(offset-x offset-y blur-radius spread-radius color)
```css
div {
  width: 180px;
  margin-left: 25px;
  filter: drop-shadow(-20px 0 0 pink);
}
```
## 初始化项目

```
yarn init -y
```

## 安装 webpack

```
yarn add -D webpack webpack-cli webpack-dev-server
```

> webpack 最好是安装在本项目中，避免与其它项目冲突

创建*scripts*文件夹,并新建*base.config.js*

```js
const path = require('path');
module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].[contenthash:8].js'
  }
};
```

创建*src*文件夹，并新建*index.js*

```js
console.log('hello');
```

修改*package.json*文件中的打包命令

```
"scripts": {
  "dev": "webpack --config scripts/base.config.js --mode development"
}
```

## 添加 react

```
yarn add react react-dom
```

修改*src/index.js*

```js
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<div>Hello React</div>, document.getElementById('app'));
```

创建*public*文件夹， 并新建*index.html*

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

## 添加 babel

```
yarn add -D @babel/core @babel/preset-env @babel/preset-react babel-loader
```

在根目录下创建*babel.config.js*

```js
module.exports = {
  presets: [['@babel/preset-env', { targets: { ie: 11 } }], '@babel/preset-react'],
  plugins: []
};
```

配置 loader

```js
module: {
  rules: [
    {
      test: /\.jsx?$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }
  ];
}
```

添加*html-webpack-plugin*

```
yarn add -D html-webpack-plugin
```

添加打包配置

```js
plugins: [
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../public/index.html'),
    filename: 'index.html',
    inject: 'body'
  })
];
```

## 环境配置

### 开发环境配置

引入*webpack-merge*

```
yarn add -D webpack-merge
```

创建*dev.config.js*文件

```js
const { merge } = require('webpack-merge');
const baseConfig = require('./base.config');

const devConfig = {
  mode: 'development',
  devServer: {
    port: '9090',
    contentBase: path.resolve(__dirname, '../dist'),
    hot: true,
    open: true
  }
};

module.exports = merge(baseConfig, devConfig);
```

修改打包命令

```
"dev": "webpack serve --config scripts/dev.config.js"
```

### 线上环境配置

创建*pro.config.js*

```js
const { merge } = require('webpack-merge');
const baseConfig = require('./base.config');
const preConfig = {
  mode: 'production'
};

module.exports = merge(baseConfig, preConfig);
```

修改打包命令

```
"build": "webpack --config scripts/pro.config.js"
```

## 使用 typescript

```
yarn add -D typescript ts-node @types/node @types/webpack @types/webpack-dev-server @types/react @types/react-dom @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators @babel/plugin-syntax-dynamic-import
```

1. 添加*tsconfig.json*

```
tsc --init
```

2. 修改*tsconfig.json*

```
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "jsx": "react",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}
```

3. 修改*base.config.js*为 ts 文件

```ts
import * as path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';
const BaseConfig: Configuration = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].[contenthash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      inject: 'body'
    })
  ]
};

export default BaseConfig;
```

4. 修改*dev.config.js*为 ts 文件

```ts
import { merge } from 'webpack-merge';
import * as path from 'path';
import BaseConfig from './base.config';
import { Configuration } from 'webpack';

const devConfig: Configuration = {
  mode: 'development',
  devServer: {
    port: 9000,
    contentBase: path.resolve(__dirname, '../dist'),
    hot: true,
    open: true
  }
};

module.exports = merge(BaseConfig, devConfig);
```

5. 修改*pro.config.js*为 ts 文件

```ts
import { merge } from 'webpack-merge';
import BaseConfig from './base.config';
import { Configuration } from 'webpack';

const config: Configuration = {
  mode: 'production'
};

const preConfig = merge(BaseConfig, config);

export default preConfig;
```

6. 修改*src/index.js*为 tsx 文件
7. 修改打包命令

```
"dev": "webpack serve --config scripts/dev.config.ts",
"build": "webpack --config scripts/pro.config.ts"
```
8. 修改*babel.config.js*
```js
module.exports = {
  //...
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }], // 支持装饰器模式
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-syntax-dynamic-import' // 动态导入
  ]
};
```

## css 打包配置

### 基础配置

使用 style-loader 和 css-loader

1. css-loader 使你能够使用类似@import 和 url()的方法引入 css 文件
2. style-loader 将所有的计算后的样式加入页面中
3. 二者结合能够把样式表嵌入 webpack 打包后的 js 文件中

```
yarn add -D style-loader css-loader
```

修改*base.config.ts*中打包规则

```
{
  test: /\.css$/,
  use: ['style-loader', 'css-loader]
}
```

### 引入 sass

使用*sass*，需要引入*sass-loader*和*node-sass*

```
yarn add -D node-sass sass-loader
```

1. 修改*base.config.ts*中的打包规则

```
{
  test: /\.(sc|c)ss$/,
  include: path.resolve(__dirname, '../src'),
  use: ['style-loader', 'css-loader', 'sass-loader']
}
```

2. 配置公共*sass*属性
   在 src 目录下新建 style 文件夹，并新建*var.sass*文件，写入样式变量

```css
$pink: pink;
@mixin ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

在*index.sass*中引入变量

```css
@import './style/var.scss';
div {
  color: $pink;
  width: 200px;
  @include ellipsis;
}
```

优化引入路径层级

```
{
  test: /\.(sc|c)ss$/,
  include: path.resolve(__dirname, '../src'),
  use: [
    'style-loader',
    'css-loader',
    {
      loader: 'sass-loader',
      options: {
        sassOptions: {
          includePaths: [path.resolve(__dirname, '../src/style')]
        }
      }
    }
  ]
}
// @import var.scss
```

### 引入 postcss

postcss 是一个 js 工具和插件转换 css 代码的工具

> autoprefixer 自动获取浏览器的流行度和能够支持的属性，并根据这些属性自动添加 css 规则添加前缀
> postcss preset env 将最新的 css 语法转换成大多数浏览器都能理解的语法

```
yarn add post-loader postcss-preset-env -D
```

修改打包规则

```
...
'css-loader',
'postcss-loader',
...
```

添加*postcss.config.js*配置

```js
const presetenv = require('postcss-preset-env');
module.exports = {
  plugins: [
    presetenv({
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3
    })
  ]
};
```

## 加载图片字体媒体文件

使用 url-loader 和 file-loader

```
yarn add -D url-loader file-loader
```

修改打包配置

```
{
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 10240,
        name: 'static/img/[name].[hash:8].[ext]'
      }
    }
  ]
},
{
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        limit: 10240,
        name: 'static/font/[name].[hash:8].[ext]'
      }
    }
  ]
},
{
  test: /\.mp3(\?.*)?$/,
  use: [
    {
      loader: 'file-loader',
      options: { name: 'static/media/[name].[hash:8].[ext]' }
    }
  ]
}
```

## 代码校验

使用 eslint prettier husky 和 lint-staged

```
yarn add -D eslint eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-prettier prettier eslint-config-prettier
```

配置编辑器设置

1. 创建*.editorConfig*文件

```
# top-most EditorConfig file
# 表示最顶层的配置文件，发现设为true时，才会停止查找.editorconfig文件
root = true
# 匹配除路径分隔符（/)之外的任意字符
[*]
# 设置编码
charset = utf-8
# 设置换行符，值为lf(常用)、cr和crlf
end_of_line = lf
# 设置缩进风格(tab是硬缩进，space为软缩进)
indent_style = space
# 用一个整数定义的列数来设置缩进的宽度，如果indent_style为tab，则此属性默认为tab_width
indent_size = 2
# 设置为true以删除换行符前面的任何空白字符
trim_trailing_whitespace = true
# 设为true表示使文件以一个空白行结尾
insert_final_newline = true
```

2. 创建*.eslintrc.js*

```js
module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es6: true
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks', 'prettier'],
  globals: {
    // 这里填入你的项目需要的全局变量
    // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
    // React: false,
    // ReactDOM: false
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  },
  rules: {
    'prettier/prettier': 'error',
    // 这里填入你的项目需要的个性化配置，比如：
    'no-console': 'off',
    'no-unused-vars': [
      'warn',
      {
        vars: 'all',
        args: 'none',
        caughtErrors: 'none'
      }
    ],
    'max-nested-callbacks': 'off',
    'react/no-children-prop': 'off',
    'typescript/member-ordering': 'off',
    'typescript/member-delimiter-style': 'off',
    'react/jsx-indent-props': 'off',
    'react/no-did-update-set-state': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    indent: [
      'off',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true
      }
    ]
  }
};

```

3. 创建*.prettierrc.js*

```js
module.exports = {
  // 一行最多 100 字符
  printWidth: 100,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 使用缩进符
  useTabs: false,
  // 行尾需要有分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾不需要逗号
  trailingComma: 'none',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 换行符使用 lf
  endOfLine: 'lf'
};
```

4. 在*package.json*中添加一下内容

```
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
"src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": [
    "prettier --write",
    "eslint --fix"
   ]
 }
```
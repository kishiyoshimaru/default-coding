# default-coding
Webページ作成を行うときの基本環境

## ルール
ディレクトリ構造やコーディングルールなど、進め方に影響するような変更を加える場合、先にREADME.mdにそのルールを書き込んでから変更する！
必ずルールに従って作業し、そのルールをREADMEに記載するため。

## 環境
node: 12.4.0  
npm: 6.9.0  
(エディター: VSCode)

## できること
editorconfigでインデントを設定する。  
pugを記述し、コンパイルすることでHTMLを書き出せる。  
scssを記述し、コンパイルすることでCSSを書き出せる。  
jsを機能ごとに記述し、コンパイルすることで結合しminifyして書き出せる。  

## ディレクトリ
```
.
├── src
│   ├── pug // _(アンダーバー)つきは、includeされるのみでコンパイルしないファイル。
│   │   ├── index.pug
│   │   └── parts
│   │       ├── _header.pug
│   │       └── _footer.pug
│   ├── scss
│   │   ├── foundation
│   │   │   ├── _destyle.scss // https://github.com/nicolas-cusan/destyle.css
│   │   │   ├── _base.scss
│   │   │   ├── _mixins.scss
│   │   │   └── _variables.scss
│   │   ├── layout
│   │   │   └── _layout.scss
│   │   └── style.scss
│   └── js // 機能ごとにファイルを分けて記述
│       ├── main.js
│       └── modules
│           └── scrollShowButton.js
├── dist
│   ├── assets
│   │   ├── css
│   │   │   └── style.css
│   │   ├── js
│   │   │   └── main.js
│   │   └── images // 画像は直接配置
│   │       └── *
│   └── index.html
└── 設定ファイル各種
```

## コマンドなど
### 準備
```
$ npm install
```

### VSCodeの設定
以下の拡張機能をインストールすることを推奨します。

- ESLint
- stylelint
- Code Spell Checker

設定は.vscode/settings.jsonに記述することで共有します。

### 変更する箇所
.browserslistrc 必要に応じて変更
gulpfile.js pathを変更
.editorconfig, .prettierrc.js こだわりがあれば変更

### ビルド
下記コマンド実行でpug, scss, jsがコンパイルされる。
```
$ npm run build
```

### 開発環境サーバー
下記コマンド実行でpug, scss, jsの変更をウォッチしながらローカルサーバーを起動する。
```
$ npm run watch
```

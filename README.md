# default-coding
Webページ作成を行うときの基本環境

## ルール
ディレクトリ構造やコーディングルールなど、進め方に影響するような変更を加える場合、先にREADME.mdにそのルールを書き込んでから変更する！
必ずルールに従って作業し、そのルールをREADMEに記載するため。

## 環境
node: 12.4.0  
npm: 6.9.0  
(説明ではエディターとしてVSCodeを仮定)

## できること
editorconfigでインデントを設定する。  
pugを記述し、コンパイルすることでHTMLを書き出せる。  
scssを記述し、コンパイルすることでCSSを書き出せる。  
jsを機能ごとに記述し、コンパイルすることで結合しminifyして書き出せる。

## ディレクトリ
.
+-- _src
|   +-- pug _(アンダーバー)つきは、includeされるのみでコンパイルしないファイル。
|   |   +-- index.pug
|   |   +-- section
|   |       +-- _header.pug
|   |       +-- *.pug
|   +-- scss
|   |   +-- style.scss
|   |   +-- foundation
|   |   |   +-- _base.scss
|   |   |   +-- _mixins.scss
|   |   |   +-- _sanitize.scss
|   |   |   +-- _variables.scss
|   |   +-- layout
|   |       +-- _layout.scss
|   +-- js
|       +-- *.js 機能ごとにファイルを分けて記述
+-- dist
|   +-- index.html
|   +-- assets
|       +-- css
|       |   +-- style.css
|       +-- js
|           +-- main.js
+-- 設定ファイル各種

## コマンド
```
$ npm install
```

ESLint, stylelintの拡張機能をインストール。  
以下を設定することでESLint, stylelintの自動修正をONにできる。  
自動修正時には、Prettierも実行する。

```
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
},
```

以下実行でpug, scss, jsがコンパイルされる。
```
$ npm run build
```

以下実行でpug, scss, jsの変更をウォッチしながらローカルサーバーを起動する。
```
$ npm run watch
```

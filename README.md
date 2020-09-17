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
├── _src
│   ├── pug // _(アンダーバー)つきは、includeされるのみでコンパイルしないファイル。
│   │   ├── index.pug
│   │   └── section
│   │       ├── _header.pug
│   │       └── _footer.pug
│   ├── scss
│   │   ├── foundation
│   │   │   ├── _sanitize.scss // https://csstools.github.io/sanitize.css/
│   │   │   ├── _base.scss
│   │   │   ├── _mixins.scss
│   │   │   └── _variables.scss
│   │   ├── layout
│   │   │   └── _layout.scss
│   │   └── style.scss
│   └── js // 機能ごとにファイルを分けて記述
│       └── scrollShowButton.js
├── dist
│   ├── assets
│   │   ├── css
│   │   │   └── style.css
│   │   ├── js
│   │   │   └── main.js
│   │   └── image // 画像は直接配置
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
ESLint, stylelintの拡張機能をインストール。  
以下を設定することで、保存時のESLint, stylelintの自動修正をONにできる。  
自動修正時には、Prettierも実行する。

```
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
},
```

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

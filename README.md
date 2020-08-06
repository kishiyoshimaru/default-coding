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

## ディレクトリ
.
+-- _src
|   +-- pug _つきは、includeされるのみでコンパイルしないファイル。
|       +-- index.pug
+-- dist
|   +-- index.html
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

以下実行でpugがコンパイルされる。
```
$ npm run build
```

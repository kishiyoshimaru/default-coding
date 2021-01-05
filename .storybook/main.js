const { resolve } = require('path')

module.exports = {
  stories: ['../src/stories/**/*.stories.js'], // ファイルは読み込まないが、この記述がないと動作しない
  webpackFinal: async(config, {configType}) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
        'import-glob-loader',
      ],
      include: resolve(__dirname, '../src/scss'),
    })
    return config
  }
}

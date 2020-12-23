const { resolve } = require('path')

// 

module.exports = {
  stories: ['../src/pug/stories/**/*.stories.js'],
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

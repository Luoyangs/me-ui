'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

const MarkdwonItContainer = require('markdown-it-container')
const VueMarkdown = {
  preprocess: (MarkdownIt, source) => {
    MarkdownIt.renderer.rules.table_open = function() {
      return '<table class="table">';
    }
    MarkdownIt.renderer.rules.fence = utils.wrapCustomClass(MarkdownIt.renderer.rules.fence);

    const code_inline = MarkdownIt.renderer.rules.code_inline;
    MarkdownIt.renderer.rules.code_inline = function(...args) {
      args[0][args[1]].attrJoin('class', 'code_inline');
      return code_inline(...args);
    }
    return source;
  },
  use: [
    [MarkdwonItContainer, 'demo', {
      validate: params => params.trim().match(/^demo\s*(.*)$/),
      render: function(token, idx) {
        var m = token[idx].info.trim().match(/^demo\s*(.*)$/);
        if (token[idx].nesting === 1) {
          var desc = token[idx + 2].content;
          const html = utils.convertHtml(utils.striptags(token[idx + 1].content, 'script'));
          //移除描述，防止被加到代码块
          token[idx + 2].children = [];
          return `<demo-block>
                    <div slot="desc">${html}</div>
                    <div slot="highlight">`;
        }
        return '</div></demo-block>\n';
      }
    }]
  ]
}


function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './examples/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('examples'),
    }
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('examples'), resolve('test'), resolve('packages')]
      },
      {
        test: /\.md$/,
        loader: 'vue-markdown-loader',
        options: VueMarkdown
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
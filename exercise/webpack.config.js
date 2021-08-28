var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js', //웹팩 변환 대상 파일 경로
  output: { // 결과 파일 정보
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/', //cdn과 관계된 속성
    filename: 'build.js'
  },
  module: { //로더 속성 정의
    rules: [
      { // js가 아닌 파일을 웹팩이 인식할 수 있게 css로더 넣어줌
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      { //js최신 문법을 여러 브라우저가 호환 할 수 있게 바벨 로더 포함
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/ //노드는 배제 
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    mode: 'production',
    alias: { // 별칭
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

// if (process.env.NODE_ENV === 'production') {
//   module.exports.devtool = '#source-map'
//   // http://vue-loader.vuejs.org/en/workflow/production.html
//   module.exports.plugins = (module.exports.plugins || []).concat([
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: '"production"'
//       }
//     }),
//     new webpack.optimize.UglifyJsPlugin({
//       sourceMap: true,
//       compress: {
//         warnings: false
//       }
//     }),
//     new webpack.LoaderOptionsPlugin({
//       minimize: true
//     })
//   ])
// }
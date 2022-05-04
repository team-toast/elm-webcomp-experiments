const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'test1.js'),
  output: {
    publicPath: '/',
    filename: 'test1.js',
  },
  devServer: {
    contentBase: path.join(__dirname),
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader: 'elm-webpack-loader',
        options: {
          cwd: path.resolve(__dirname),
          files: [
            path.resolve(__dirname, 'ToggleComponent.elm'),
            path.resolve(__dirname, 'Incrementor.elm'),
            //path.resolve(__dirname, 'ComponentWithStaticProp.elm'),
          ],
        },
      },
      {
        test: /\.js/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
    noParse: [/.elm$/],
  },
}

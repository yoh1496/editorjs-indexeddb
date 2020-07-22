const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  module: {
    rules: [
      {
        test: /\.svg/,
        use: ['raw-loader'],
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { url: false },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './html/index.html',
      title: 'editorjs-indexeddb',
    }),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    // eslint-disable-next-line
    path: __dirname + '/dist/',
    publicPath: '/editorjs-indexeddb/',
    filename: 'bundle.js',
  },
  devServer: {
    open: true,
    openPage: 'editorjs-indexeddb/',
    inline: true,
    contentBase: './dist/',
    historyApiFallback: {
      rewrites: [{ from: '/', to: '/index.html' }],
    },
  },
};

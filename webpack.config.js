const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

/*We are basically telling webpack to take index.js from entry. Then check for all file extensions in resolve. 
After that apply all the rules in module.rules and produce the output and place it in main.js in the public folder.*/

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js',
  },
  /** "target"
   * setting "node" as target app (server side), and setting it as "web" is
   * for browser (client side). Default is "web"
   */
  target: 'web',
  devServer: {
    port: '9500',
    proxy: {
      '/': {
        target: 'http://localhost:9500',
        router: () => 'http://localhost:8080',
      },
      '/delete': {
        target: 'http://localhost:9500',
        router: () => 'http://localhost:8080',
      },
    },
    static: ['./public'],
    open: true,
    hot: true,
    liveReload: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: './imgs/tomatoMe-32x32.png',
    }),
    // new CopyWebpackPlugin({
    //   patterns: [{ from: './imgs', to: 'imgs' }],
    // }),
  ],
  resolve: {
    /** "extensions"
     * If multiple files share the same name but have different extensions, webpack will
     * resolve the one with the extension listed first in the array and skip the rest.
     * This is what enables users to leave off the extension when importing
     */
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?/, //kind of file extension this rule should look for and apply in test
        exclude: /node_modules/, //folder to be excluded
        use: 'babel-loader', //loader which we are going to use
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /(node_modules)/,
        use: [
          'style-loader',
          'css-loader',
          //   {
          //     loader: 'sass-loader',
          //     options: {
          //       implementation: require('sass'),
          //       sassOptions: {
          //         fiber: false,
          //       }
          //     }
          //   }
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
};

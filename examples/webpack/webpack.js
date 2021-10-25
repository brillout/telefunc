const path = require('path')
const telefunc = require('telefunc/webpack').default

const HtmlWebpackPlugin = require('html-webpack-plugin')

function isSSR() {
  return process.argv.includes('--ssr')
}
const crypto = require("crypto");
const crypto_orig_createHash = crypto.createHash;
crypto.createHash = algorithm => crypto_orig_createHash(algorithm == "md4" ? "sha256" : algorithm);

module.exports = {
  entry: { main: './client.ts' },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: path.resolve(__dirname),
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    telefunc(),
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: true,
    }),
  ],
  output: {
    // setting this in the compiler doesn't work, so users should include this line in their configs
    libraryTarget: isSSR() ? 'commonjs-module' : undefined,
  },
}

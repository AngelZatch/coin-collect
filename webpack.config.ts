/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/app.ts',
    devtool: 'inline-source-map',
    mode: 'development',
    devServer: {
        contentBase: './dist',
        hot: true,
        port: 8080
    },
    plugins: [
        new HtmlWebpackPlugin({ title: 'Coin Collect Dev' }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/assets', to: 'assets' }
            ],
            options: {
                concurrency: 100
            }
        })
    ]
}

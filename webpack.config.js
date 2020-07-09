const path = require('path')
const distPath = path.resolve(__dirname, 'dist')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/app.ts',
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets'
                }
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'main.js',
        path: distPath
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: './src/assets', to: 'assets'}
            ]
        })
    ],
    devServer: {
        contentBase: distPath,
        compress: true,
        port: 9000
    }
}

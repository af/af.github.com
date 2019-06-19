const path = require('path')
const isDev = (process.env.NODE_ENV !== 'production')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')


const config = {
    mode: isDev ? 'development' : 'production',
    entry: './js/main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'assets')
    },
    module: {
        rules: [{
            test: /\.styl$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: process.env.NODE_ENV === 'development',
                    },
                },
                'css-loader', 'stylus-loader'
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({filename: '[name].css', chunkFilename: '[id].css'}),
    ],
    optimization: {
        minimizer: isDev ? [] : [new TerserPlugin()],
    },
    performance: {
        hints: isDev ? false : 'warning'
    }
}

module.exports = config

const path = require('path')
const {NODE_ENV, ANALYZE_BUNDLE} = process.env
const isDev = (NODE_ENV !== 'production')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')


const config = {
    mode: isDev ? 'development' : 'production',
    entry: './js/main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, '_site', 'assets')
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
    },
    stats: 'minimal',
}

if (ANALYZE_BUNDLE) config.plugins.push(new BundleAnalyzerPlugin())

module.exports = config

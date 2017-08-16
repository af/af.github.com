const webpack = require('webpack')
const stylepack = require('stylepack')
const isDev = (process.env.NODE_ENV !== 'production')

const config = {
    entry: './js/main.js',
    output: {
        filename: 'assets/main.js'
    },
    module: {},
    plugins: [],
    resolve: {
        alias: !isDev && { 'd3': `${__dirname}/node_modules/d3/build/d3.min.js` }
    },

    performance: {
        hints: isDev ? false : 'warning'
    }
}

// Unfortunately can't enable uglify because it doesn't support ES6 yet :(
// if (!isDev) config.plugins.push(new webpack.optimize.UglifyJsPlugin())

module.exports = stylepack({
    webpack,
    cssModules: false,
    extractTo: !isDev && 'assets/main.css'
})(config)

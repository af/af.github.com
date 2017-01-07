const stylepack = require('stylepack')
const isDev = (process.env.NODE_ENV !== 'production')

const config = {
    entry: './js/main.js',
    output: {
        filename: 'assets/main.js'
    },
    module: {},
    plugins: [],

    performance: {
        hints: isDev ? false : 'warning'
    }
}

// Unfortunately can't enable uglify because it doesn't support ES6 yet :(
// const webpack = require('webpack')
// if (!isDev) config.plugins.push(new webpack.optimize.UglifyJsPlugin())

module.exports = stylepack({
    cssModules: false,
    extractTo: !isDev && 'assets/main.css'
})(config)

const stylepack = require('stylepack')
const isDev = (process.env.NODE_ENV !== 'production')

const config = {
    entry: './js/main.js',
    output: {
        filename: 'assets/main.js'
    },
    module: {}
}

module.exports = stylepack({
    cssModules: false,
    extractTo: !isDev && 'assets/main.css'
})(config)

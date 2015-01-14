module.exports = {
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "6to5-loader"}
        ]
    }
}

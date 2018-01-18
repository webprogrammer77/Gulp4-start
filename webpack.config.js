const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
    output: {
        filename: 'bundle.js'
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Vue: ['vue/dist/vue.esm.js', 'default'],
        _map: ['lodash', 'map']

        })
    ],
    devtool: 'source-map'
};

module.exports = config;
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'production',
    devServer: {
        host: '',
        port: 3000,
        open: true,
        historyApiFallback: true,
    },
});
const path = require('path');

module.exports = {
    // 设置入口
    //__dirname代表webpack.config.js文件所在的地址
    entry: path.join(__dirname, 'src/index.js'),//将--dirname和后面的路径连接成绝对路径
    // 设置出口
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname,'dist')
    },

    module:{
        rules: [
            {
                test: /.vue$/,
                loader: 'vue-loader'

            }
        ]
    }
};
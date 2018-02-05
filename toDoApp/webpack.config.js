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
                // 加载vue文件
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                // 加载css文件
                test: /\.css$/,
                use: ['css-loader','style-loader']
            },
            {
                test: /\.(gif|jpg|png|jpeg|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        option: {
                            // 设置转换base64文件大小界限,小于该界限就转换base64
                            limit: 1024,
                            // 设置输出名字.扩展名
                            name: '[name]-img.[ext]'
                        }
                    }
                ]
            }
        ]
    }
};
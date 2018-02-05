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
                use: ['style-loader','css-loader']
            },

            {
                //css预处理器
                test: /\.styl/,
                use: [
                    // 注意依赖插件的加载顺序,stylus处理完给css-loader（依赖style-loader），
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                // 加载图片
                test: /\.(gif|jpg|png|jpeg|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
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
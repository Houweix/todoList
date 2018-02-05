const path = require('path');

// 判断是否为开发环境
const isDev = process.env.NODE_ENV === 'development';

const config = {
    // 设置入口
    //__dirname代表webpack.config.js文件所在的地址
    entry: path.join(__dirname, 'src/index.js'),//将--dirname和后面的路径连接成绝对路径
    // 设置出口
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname,'dist')
    },

    module:{
        target: 'web',
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

if(isDev) {
    config.devServer = {
        port: '8000',
        // 使用0.0.0.0不仅可以localhost，也可以ip,手机
        host: '0.0.0.0',
        overlay: {
            //让编译中出现的错误显示在网页上
            errors: true,
        }
    }
}

module.exports = config;
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

// 判断是否为开发环境
const isDev = process.env.NODE_ENV === 'development';

const config = {
    target: 'web',
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
            },


        ]
    },
    plugins: [
        //使用vue、react框架时
        new webpack.DefinePlugin({
            //可以通过process.env.NODE_ENV来判断当前的环境
           'process.env': {
               NODE_ENV: isDev ? '"development"' : '"production"'
           }
        }),

        new HTMLPlugin()


    ]

};

if(isDev) {
    //调试时会显示正常的源码
    config.devtool = '#cheap-model-eval-source-map';
    config.devServer = {
        port: '8000',
        // 使用0.0.0.0不仅可以localhost，也可以ip,手机
        host: '0.0.0.0',
        overlay: {
            //让编译中出现的错误显示在网页上
            errors: true,
        },
        //类似路由的功能，将其他的地址映射到index.js中
        // historyFallback: {
        //
        // },
        //自动打开浏览器
        // open: true,
        //热更新
        hot: true
    };
     config.plugins.push(
         new webpack.HotModuleReplacementPlugin(),
         new webpack.NoEmitOnErrorsPlugin()
     )
}

module.exports = config;
/*
 * @Author: 郑义进
 * @Date: 2020-06-04 00:02:01
 * @LastEditTime: 2020-06-12 19:58:42
 * @LastEditors:  
 * @Description: In User Settings Edit
 * @FilePath: \lwbzzm-frontend\vue.config.js
 */

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    publicPath: isProd ? '././' : './',

    devServer: {
        proxy: {
            '/api': {
                // target: 'https://ydzj.nimble.cn/bzzmapi', //生产
                target: 'https://ydzj.nimble.cn/bzzmapi/uat', //测试
                // target: 'http://172.24.26.13:7058', //测试
                changeOrigin: true,
                wx: true,
                pathRewrite: {
                    '^/api': ' '
                }
            }
        }

        // host: '192.168.43.173'
    }

}
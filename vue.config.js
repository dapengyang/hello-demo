// 配置化文件 vue-cli3推崇零配置,有时候还需要我们配置

module.exports = {
    devServer: {
        open: false, // 是否自动打开浏览器页面
        host: '127.0.0.1', // 指定使用一个 host。默认是 localhost
        port: 9096, // 端口地址
        https: false, // 使用https提供服务
        progress: true,
        // string | Object 代理设置
        proxy: {
            '/rss': {
                target: process.env.VUE_APP_BASE_API || 'http://dev.csstrobot.com:9899/api',
                ws: true, // 是否启用websockets
                changeOrigin: true,
                /* 开启代理,允许跨域 */
                pathRewrite: {
                    '^/rss': ''
                }
            }
        },
    },
    // css相关配置
    css: {
        // 是否使用css分离插件
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false
    },
    productionSourceMap: false,
    parallel: require('os').cpus().length > 1,
    //调整 webpack 配置
    configureWebpack: {

    },
    chainWebpack: config => {
        config.optimization.minimize(true);
        config.optimization.splitChunks({
            chunks: 'all'
        })
        // 用cdn方式引入
        config.externals({
            'vue': 'Vue',
            'element-ui': 'ELEMENT',
            'vuex': 'Vuex',
            'vue-router': 'VueRouter',
            'axios': 'axios'
        })
    }

}
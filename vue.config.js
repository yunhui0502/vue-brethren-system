module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api':{
                target:'http://39.98.126.20:7004',
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            }
        }
    }
}
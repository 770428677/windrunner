moudle.exports = {
  publicPath: '/windrunner',
  devServer: {
    proxy: {
      'api': {
        target: 'http://192.168.0.101',
        changeOrigin: true
      },
      '/api2' : {
        target : 'http://localhost:8080',
        changeOrigin : true
      }
    }
  }
}

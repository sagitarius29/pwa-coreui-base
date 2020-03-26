module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,

  pwa: {
    name: 'tomador-web',
    workboxOptions: {
      navigateFallback: '/index.html',
      skipWaiting: true,
    }
  }
}

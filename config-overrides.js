const {
  overrideDevServer,
  watchAll,
} = require('customize-cra')

module.exports = {
  devServer: overrideDevServer(
    // dev server plugin
    watchAll(),
    (config) => {
      config.client.overlay = false
      return config
    },
  ),
}

module.exports = {
  configureWebpack: {
    externals: {
      puppeteer: 'require("puppeteer")'
    }
  }
};

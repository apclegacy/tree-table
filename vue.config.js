module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('obj')
      .test(/\.(obj)$/)
      .use()
      .loader('file-loader')
      .end();
  },
};

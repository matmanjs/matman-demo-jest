const path = require('path');
const { createPageDriver } = require('../../helpers');

module.exports = async pageDriverOpts => {
  // 创建 PageDriver
  const pageDriver = await createPageDriver(__filename, pageDriverOpts);

  // 页面地址
  await pageDriver.setPageUrl('https://now.qq.com/');

  // 初始化
  await pageDriver.addAction('init', async page => {
    await page.waitFor('#app');
  });

  return await pageDriver.evaluate(path.resolve(__dirname, './crawlers/get-page-info.js'));
};

// 打开以下注释，运行脚本查看运行结果
// module.exports({
//   show: true,
//   doNotCloseBrowser: true,
//   useRecorder: false,
// })
// .then(function (result) {
//   console.log(JSON.stringify(result));
// })
// .catch(function (error) {
//   console.error('failed:', error);
// });

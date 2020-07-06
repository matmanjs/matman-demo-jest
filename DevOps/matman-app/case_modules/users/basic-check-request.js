const path = require('path');
const { createPageDriver } = require('../../helpers');

module.exports = async pageDriverOpts => {
  // 创建 PageDriver
  const pageDriver = await createPageDriver(__filename, pageDriverOpts);

  // 页面地址
  await pageDriver.setPageUrl('https://now.qq.com');

  // 设置浏览器设备型号
  await pageDriver.setDeviceConfig('pc');

  // 初始化
  await pageDriver.addAction('init', async page => {
    await page.waitFor('#app');
    await page.waitFor(1000);
  });

  await pageDriver.addAction('click to change', async page => {
    await page.click('.hello button');
    await page.waitFor(500);
  });

  await pageDriver.addAction('click to change', async page => {
    await page.click('.hello button');
    await page.waitFor(500);
  });

  return await pageDriver.evaluate(path.resolve(__dirname, './crawlers/get-page-info-request.js'));
};

// 打开以下注释，运行脚本查看运行结果
// module.exports({
//   show: true,
//   doNotCloseBrowser: true,
//   useRecorder: true,
//   queryDataMap: {
//     users: 'success_base',
//   },
// })
// .then(function (result) {
//   console.log(JSON.stringify(result));
// })
// .catch(function (error) {
//   console.error('failed:', error);
// });


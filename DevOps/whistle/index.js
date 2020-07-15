const path = require('path');

/**
 * 获得规则名称，默认为项目名字
 *
 * @param {String} [tag] 标记
 * @return {String}
 */
function getRuleName(tag) {
  const name = path.basename(path.join(__dirname, '../../')) || '临时';

  return `[${tag || 'auto'}]${name}`;
}

/**
 * 动态生成 whistle 规则，用于 dev 场景
 *
 * @param {Object} [opts] 参数
 * @param {String} [opts.projectRootPath] 项目的根路径
 * @param {Number} [opts.projectDevPort] 项目启动时需要的端口号
 * @param {Number} [opts.mockstarPort] mockstar 启动时需要的端口号
 * @param {String} [opts.name] whistle 规则集的名字，会展示在 whistle 管理端 Rules 这个 tab 下
 */
function getDevRules(opts = {}) {
  // 项目在 dev 场景下使用的端口，请按自己项目情况进行修改
  // 而这里的写法是因为我们用了 create-react-app
  // https://github.com/facebook/create-react-app/issues/1083
  const projectDevPort =
    opts.projectDevPort || process.env.PROJECT_PORT || 8080;

  // mockstar 启动时需要的端口号
  const mockstarPort = opts.mockstarPort || process.env.MOCKSTAR_PORT || 9527;

  // whistle 规则集的名字，会展示在 whistle 管理端 Rules 这个 tab 下
  // 实际上这个名字是可以任意字符串，详见： http://wproxy.org/whistle/webui/rules.html
  // 我们建议每一个项目都创建一个独立的规则集，因此获取项目名做规则集名字，大部分情况可以区分不同项目了
  const name = opts.name || getRuleName(`dev-${projectDevPort}`);

  // 规则内容，具体语法请参考： http://wproxy.org/whistle/
  // 注意：如果涉及到正则表达式，则 \ 需要修改为 \\ (用两个反斜杠)，否则自动设置到 whistle 时会被丢失
  const ruleList = [
    `/^https?://now\.qq\.com/(.*\.(js|css|png|jpg|gif|jpeg|svg|blob).*)$/ 127.0.0.1:8080/$1`,
    `/(.*)/search/users(.*)/ 127.0.0.1:${mockstarPort}`,
    `now.qq.com  127.0.0.1:${projectDevPort}`,
  ];

  return {
    name: name,
    rules: ruleList.join('\n'),
  };
}

/**
 * 动态生成 whistle 规则，用于 prod 场景
 *
 * @param {Object} [opts] 参数
 * @param {String} [opts.projectRootPath] 项目的根路径
 * @param {Number} [opts.mockstarPort] mockstar 启动时需要的端口号
 * @param {String} [opts.name] whistle 规则集的名字，会展示在 whistle 管理端 Rules 这个 tab 下
 */
function getProdRules(opts = {}) {
  const projectDevPort =
  opts.projectDevPort || process.env.PROJECT_PORT || 8080;

  // mockstar 启动时需要的端口号
  const mockstarPort = opts.mockstarPort || process.env.MOCKSTAR_PORT || 9527;

  // whistle 规则集的名字，会展示在 whistle 管理端 Rules 这个 tab 下
  // 实际上这个名字是可以任意字符串，详见： http://wproxy.org/whistle/webui/rules.html
  // 我们建议每一个项目都创建一个独立的规则集，因此获取项目名做规则集名字，大部分情况可以区分不同项目了
  const name = opts.name || getRuleName(`prod`);

  // 规则内容，具体语法请参考： http://wproxy.org/whistle/
  // 注意：如果涉及到正则表达式，则 \ 需要修改为 \\ (用两个反斜杠)，否则自动设置到 whistle 时会被丢失
  const ruleList = [
    `/^https?://now\.qq\.com/(.*\.(js|css|png|jpg|gif|jpeg|svg|blob).*)$/ 127.0.0.1:8080/$1`,
    `/(.*)/search/users(.*)/ 127.0.0.1:${mockstarPort}`,
    `now.qq.com  127.0.0.1:${projectDevPort}`,
  ];

  return {
    name: name,
    rules: ruleList.join('\n'),
  };
}

module.exports = {
  getDevRules,
  getProdRules,
};

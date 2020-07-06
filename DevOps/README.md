# DevOps

## 如何使用假数据开发？

> 注意，需要全局安装 `sudo npm install mockstar-cli -g` 

- 进入 `mockstar-app` ，运行 `tnpm install` 安装依赖，然后执行 `tnpm start`(后台运行) 或者 `tnpm run dev`（前台运行）
- 默认启动了 `9527` 端口，因此需要在 whistle 中增加配置规则： `now.qq.com/cgi-bin 127.0.0.1:9527` 代理到假数据服务中


## 如何跑端对端测试

> 注意，需要全局安装 `sudo npm install matman-cli -g` 

需要在 `matman-app/src/lib/util.js` 的 `getProxyServer()` 方法里面修改端口为本地 whistle 的端口。

- 启动项目（`tnpm start`），设置代理（因为测试的代码针对的是本地的项目，现网还没发布）
- 按照上面的介绍启动 mockstar 假数据服务
- 进入 `matman-app` ，运行 `tnpm install` 安装依赖
- 运行 `tnpm run build` 构建爬虫脚本（如果修改了 `crawlers` 文件夹下的内容就要执行一次）
- 运行 `tnpm run test`，或者指定 `tnpm run test-phone-page` 等

whistle 配置如下：

```bash

/^https?://now\.qq\.com/(.*\.(js|css|png|jpg|gif|jpeg|svg|blob).*)$/ [project path]/dev/$1
/^https?://now\.qq\.com/h5/personal-center/([\w\-]*).html(.*)$/ [project path]/dev/$1.html

now.qq.com/cgi-bin 127.0.0.1:9527
```
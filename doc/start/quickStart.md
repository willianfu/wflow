# 开始

## 简介

wflow工作流是一个简单易用，面向普通用户的工作流系统，用户只需要接受简单的教学即可上手使用，自行创建所需的日常审批流程。

------

**👀起因：**

第一次接触工作流是由于当时公司业务部门提了一个需求，希望可以实现新产品从提出意向到开发结束的整个生命周期流程的管控，里面包含各级人员和领导等不同角色的审批，任务交接流转。于是网上搜索了一圈，发现了 `activiti`、`flowable` 这两个开源的流程引擎，功能上很强大，能满足需求，但是流程设计器上手真的比较困难，这对于普通用户来说没有经过专业人员进行辅助或者专门培训，基本很难用起来。当时公司用的是某D办公，自带的审批功能在操作一番后感觉相当的友好，遂萌生实现一套类似系统的想法。



## 起步

### 下载并启动项目

```bash
#克隆源码
git clone https://gitee.com/willianfu/jw-workflow-engine.git
cd jw-workflow-engine

#修改main.js中后端接口地址，破坏这个表达式，使其为公开的服务器IP
Vue.prototype.BASE_URL = 'http://' + (process.env.NODE_ENV === 'development-' ? "localhost" : "47.100.202.245");

#小弱鸡服务器，大家不要造垃圾数据，且珍惜😘

#安装依赖
npm install
#启动
npm run dev
```

📢 如果启动报错请检查错误信息看看是否是依赖版本和当前所安装的 node 版本不兼容，自行安装兼容版本的依赖

👍 启动成功后访问 http://localhost:88 即可打开页面



![image-20220720094501757](https://pic.rmb.bdstatic.com/bjh/3da7567c3f36a4d2178d310390bfc1f2.png)
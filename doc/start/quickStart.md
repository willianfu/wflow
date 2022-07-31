# 开始

## 简介

wflow工作流是一个简单易用，面向普通用户的工作流系统，用户只需要接受简单的教学即可上手使用，自行创建所需的日常审批流程。

------

**👀起因：**

第一次接触工作流是由于当时公司业务部门提了一个需求，希望可以实现新产品从提出意向到开发结束的整个生命周期流程的管控，里面包含各级人员和领导等不同角色的审批，任务交接流转。于是网上搜索了一圈，发现了 `activiti`、`flowable` 这两个开源的流程引擎，功能上很强大，能满足需求，但是流程设计器上手真的比较困难，这对于普通用户来说没有经过专业人员进行辅助或者专门培训，基本很难用起来。当时公司用的是某D办公，自带的审批功能在操作一番后感觉相当的友好，遂萌生实现一套类似系统的想法。



## 一起交流

👩‍👦‍👦大家可扫码加入交流群， 如果二维码失效了，可以加我微信 `willianfu_` 备注`wflow` 拉你入群

<img src="https://pic.rmb.bdstatic.com/bjh/97bc3e87a714b783cd3b6cad936e5607.png" alt="image-20220724230831144" style="zoom: 20%;" />       <img src="https://pic.rmb.bdstatic.com/bjh/ed2fd88694486bc83c56e08b83d44205.png" alt="image-20220724230928104" style="zoom:20%;" />



**未完成/待完善的功能**

- 表单明细表组件数据绑定，校验
- 分栏布局组件内表单数据绑定、校验
- 提交表单部分，分栏、明细表及其他组件回显校验
- 提交表单时根据人员设置限制表单权限
- 提交时根据审批流程设计渲染已确定的执行流程步骤及指定人员



## 起步

### 下载并启动项目

**注意：**作者的开发环境是 `node14.18.0` 、`vuecli 4.1.1`、`edge浏览器` 

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
npm run serve
```

📢 如果启动报错请检查错误信息看看是否是依赖版本和当前所安装的 node 版本不兼容，自行安装兼容版本的依赖



👍 启动成功后访问 http://localhost:88 即可打开页面



![image-20220720094501757](https://pic.rmb.bdstatic.com/bjh/3da7567c3f36a4d2178d310390bfc1f2.png)



## 操作教程

### 工作区

点击工作区，进入审批列表，按分组可以进行展开折叠

![image-20220724225022126](https://pic.rmb.bdstatic.com/bjh/1a9bd706586f6cbbc64721ba152edd1a.png)



####  发起审批

点击对应项可弹出提交表单窗口

<img src="https://pic.rmb.bdstatic.com/bjh/5bfb33c6bfd47a327ad3dda3e0d7771f.png" alt="image-20220724225156405" style="zoom:50%;" />



### 管理后台

从首页进入管理后台，展示出来的是所有已经设计好的审批列表

#### 审批列表

审批列表按分组展示，点击每个分组右侧可对分组进行编辑及删除，如果分组内有表单，则删除分组后内部表单会被移动到其他分组（默认）

![image-20220724225423708](https://pic.rmb.bdstatic.com/bjh/91d4d8cdaf632f67916846a69e18d508.png)

#### 分组及表单拖拽排序

##### 分组排序

![image-20220724225749669](https://pic.rmb.bdstatic.com/bjh/e509e35de64a32b949d8cbd48b49fe2a.png)

![image-20220724225853154](https://pic.rmb.bdstatic.com/bjh/bd6f2801c0e87eda065a1bf072d693d2.png)

##### 表单排序

![image-20220724230032985](https://pic.rmb.bdstatic.com/bjh/b820afc407597c6c8900043c62bd4c65.png)



### 表单流程设计器

点击`新建表单/编辑` 进入`审批表单流程设计器`

#### 基础设置

![image-20220724231222926](https://pic.rmb.bdstatic.com/bjh/9b9a47e62cf4d52acaa7eaffa319f688.png)

#### 表单设计

> 表单设计是用来设计发起审批流程时填写的表单的，拖拽式交互

从左侧组件库选取组件放置到中间设计区域，点击设计区组件，可在右侧面板配置组件的设置项

![image-20220724222124900](https://pic.rmb.bdstatic.com/bjh/096e0dacdbc8ced5db475517c325601c.png)



##### 分栏布局

> 普通组件是独占一行的，假设我们要让2个组件并排显示，就需要使用分栏了

<img src="https://pic.rmb.bdstatic.com/bjh/a91a26ab472f42f1d7ebf598641929e4.png" alt="image-20220724233902503" style="zoom:50%;" />

<img src="https://pic.rmb.bdstatic.com/bjh/8e195c2275b19067f21bfc2c48bb1771.png" alt="image-20220724231814888" style="zoom:50%;" />



**❗ 注意事项：**分栏组件会自动按每2个组件为一行进行布局，假设分栏组件内放了5个子组件，那么前四个会两两占用一列，**剩下多的一个会独占一行**

**分栏组件内可以放置其他组件，也可以放置分栏组件进行嵌套！！！！！**

<img src="https://pic.rmb.bdstatic.com/bjh/67cb9c1292785061f49229ae8e5e1163.png" alt="image-20220724233253171" style="zoom:50%;" />



##### 明细表

> 有时候我们需要提交一系列数据，这些数据有表格的性质，这时候可以使用明细表组件

明细表类似分栏容器，可以在内部放置其他组件

![image-20220724234359498](https://pic.rmb.bdstatic.com/bjh/a85f8d76572255ee017a36af0ba1f962.png)



#### 审批流程设计

> 审批流程设计，顾名思义，用来设计用户提交的表单流程，需要经过哪些人的审批流转

<img src="https://pic.rmb.bdstatic.com/bjh/906bfdf30712a132c9b8c906e56e6eea.png" alt="image-20220724234519380" style="zoom: 80%;" />

**支持多种类型节点**

##### 发起人

> 也就是发起，提交这个流程的人员



##### 审批人

> 当任务流转到审批人时，这个节点设置的相关人员需要对这个提交的流程进行审批（同意/驳回）



##### 抄送人

> 当流程到达抄送人节点时，将会通知到相关人员



##### 条件分支

> 有时候我们的流程需要动态的情况，根据一些条件进行不同的处理流程，这时候就可以添加条件分支，设置进入每个流程分支的条件

<img src="https://pic.rmb.bdstatic.com/bjh/e060d19a925bee4f4d10382d2b3a770e.png" alt="image-20220724235146294" style="zoom: 80%;" />



##### 并行分支

> 有时候我们需要审批流程不需要条件选择，同时进行几个步骤，这时候可以利用并行分支，当所有分支的步骤都结束后才会进行到下一步

![image-20220724235422400](https://pic.rmb.bdstatic.com/bjh/4251844922f6ae63cec916ffde02968c.png)



##### 延时处理

> 有时候我们需要让整个流程卡在某个地方，等待一段时间再继续，这时候可以在需要等待的地方插入延时处理节点



##### 触发器

> 本节点属于扩展功能，流程在到达此处时会触发一个动作，应当由开发人员使用，用来打通与其他系统的交互

通过Http请求，来动态修改表单数据或者将表单数据传递给外部系统
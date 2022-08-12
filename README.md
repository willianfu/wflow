<p align="center">
<img src="https://pic.rmb.bdstatic.com/bjh/e2fe27dbed5b8c43bbd59374360c5763.png" width="100px">
</p>


<h1 align="center">wflow 工作流</h1>

[![star](https://gitee.com/willianfu/jw-workflow-engine/badge/star.svg?theme=dark)](https://gitee.com/willianfu/jw-workflow-engine/stargazers) [![fork](https://gitee.com/willianfu/jw-workflow-engine/badge/fork.svg?theme=dark)](https://gitee.com/willianfu/jw-workflow-engine/members) <img src="https://img.shields.io/badge/release-v0.0.1-brightgreen.svg"> <img src="https://shields.io/badge/license-APACHE2.0-blue">


## 📋 简介

`wflow-web` 是 `wflow工作流` 项目的前端设计器，免费且开源，本设计器包含表单设计，审批流程设计。

> 区别于传统Bpmn自带流程设计器，传统设计器晦涩难懂，对于普通企业用户使用门槛偏高，没有经过专业培训根本无从下手，需要相关专业人员辅助来创建流程。而本设计器界面简单，符合普通大众的思维逻辑，易于理解和上手使用。

**注意：** 这是前端设计器部分，配套的工作流后端目前还没有正式开发，个人精力有限慢慢肝，大家可以持续关注下😅

👩‍👦‍👦感兴趣的同学可扫码加入交流群， 如果二维码失效了，可以加我微信 `willianfu_` 备注`wflow` 拉你入群

<p style="text-align: left">
<img src="https://pic.rmb.bdstatic.com/bjh/d1310e3b5158a1cb9c32f455f9cb8565.png" width="200px" >
</p> 



开源不易，用爱发电，觉得不错的话可以给个 ⭐ star 鼓励一下

 😋  [github地址](https://github.com/willianfu/wflow)  |   [码云gitee](https://gitee.com/willianfu/jw-workflow-engine)

  👉 在线体验地址： [戳我打开演示页面](http://47.100.202.245:83) 👈

  📃 详细文档请访问 ： [wflow文档](https://willianfu.github.io/wflow/)



------

### 🚀 wflow-web-pro

`wflow-web`  pro版（💰付费） 即将发布，感兴趣的同学可以访问演示链接预先体验

-  👉 [pro版工作区演示](http:47.100.202.245:85)
-  📃 [pro版移动端表单体验，建议手机访问]([wflow-pro | 表单流程设计](http://47.100.202.245:85/#/admin/design?code=11f6204393b147a9a38f245dd25ff201&mobilePreview=true))

#### pro版新增功能

- 组件库全面支持`PC + 移动端 (ElementUI + Vant)`，一次表单设计，分别渲染成两种效果，即时预览
- 组件库新增组件
  - 省市区选择
  - 手写签字板
  - 单行及多行输入框，支持摄像头扫码录入信息
  - 时间、时间范围选择器
  - 评分
  - 地理位置选择，高德地图选位置
  - 新增几十种常用图标
  - 更多组件后续增加。。。

- 审批流程回显执行步骤
- pro后续更新计划
  - 新增无条件跳转节点，实现流程执行过程的任意指向
  - 新增任务办理节点，只允许提交到下一步，非审批
  - 配套后端开发（暂未估完成时间节点）

**全新工作台面板**

![image-20220813002851111](https://pic.rmb.bdstatic.com/bjh/75bb79771bf78d273917df9495bf35b7.png)

发起审批，左侧表单，右侧显示执行流程步骤

![image-20220813002940384](https://pic.rmb.bdstatic.com/bjh/c2bd3d47d665c98330a2a08e8bf719e5.png)



👇 表单设计器即时预览，根据设备自动适配

![image-20220813004203129](https://pic.rmb.bdstatic.com/bjh/2c429241d6e5cabc18c9f9eac7df5024.png)

------



## 👀开源版界面一览

###  **工作区面板** 

<img src="https://images.gitee.com/uploads/images/2020/1005/140253_39e3f2d5_4928216.png" alt="输入图片说明" title="屏幕截图.png" style="zoom: 50%;" />

<img src="https://images.gitee.com/uploads/images/2020/1005/140329_89cd5aac_4928216.png" alt="输入图片说明" title="屏幕截图.png" style="zoom:50%;" />



### 表单管理

 **工作流表单管理，支持分组和单组表单拖拽排序** 

<img src="https://images.gitee.com/uploads/images/2020/1005/140358_17fc6838_4928216.png" alt="输入图片说明" title="屏幕截图.png" style="zoom:50%;" />

<img src="https://images.gitee.com/uploads/images/2020/1005/140502_bdc2ea04_4928216.png" alt="输入图片说明" title="屏幕截图.png" style="zoom:50%;" />


---------

####  **表单基本设置** 

<img src="https://images.gitee.com/uploads/images/2020/1005/140559_5c51a89b_4928216.png" alt="输入图片说明" title="屏幕截图.png" style="zoom: 50%;" />




--------

####  **表单设计器**

>  支持分栏布局、明细表格、以及多种基础组件，支持自定义开发组件

![image-20220724220114724](https://pic.rmb.bdstatic.com/bjh/b0f1ed22d61ea86b4222b89dbea6ecd1.png)

![image-20220724221040780](https://pic.rmb.bdstatic.com/bjh/73e71e1323812a57802a76beffe27906.png)






---------

 #### 流程设计器

> 任意条件层级审批流程设计， 审批节点支持多种业务类型设置，支持流程校验

![image-20220711111351476](https://pic.rmb.bdstatic.com/bjh/3300dbc60218a8376b45ed6ed46e8162.png)



**自定义审批条件**

![image-20220722182318650](https://pic.rmb.bdstatic.com/bjh/4599e414142004f3b0445e478018b8be.png)


---------

**自定义复杂流转条件**

> 可视化流程逻辑分支条件

![image-20220722182622661](https://pic.rmb.bdstatic.com/bjh/299989bb8b256beae152a29ea611b790.png)

---------



 **支持多种类型业务节点，支持配置校验，灵活配置** 

<img src="https://pic.rmb.bdstatic.com/bjh/e35d8375eae56b4b9bbace88ee2a00fd.png" alt="image-20220722182427315" style="zoom:50%;" />

**支持无限层级嵌套**

![image-20220711111911427](https://pic.rmb.bdstatic.com/bjh/02cd8936e081bdd053bfa695826817ba.png)

**自动校验设置项，列出所有错误提示**

<img src="https://pic.rmb.bdstatic.com/bjh/ddd20cd54d9502f8eec59565864dfb2a.png" alt="image-20220731215022817" style="zoom:50%;" />

**条件节点优先级动态拖拽，实时刷新**

<img src="https://images.gitee.com/uploads/images/2021/0416/200127_a59216a1_4928216.png" alt="输入图片说明" title="屏幕截图.png" style="zoom:50%;" />



## ✍开发



📃 详细文档请访问 ： [wflow文档](https://willianfu.github.io/wflow/)



### 项目结构

```
├─api 接口
├─assets
│  └─image
├─components 通用组件
│  └─common
├─router 路由
├─store vuex，设计器数据存储
├─utils
└─views 主要页面及视图
    ├─admin
    │  └─layout
    │      ├─form 表单设计
    │      └─process 流程设计
    ├─common
    │  ├─form 表单
    │  │  ├─components 表单组件
    │  │  ├─config 表单组件配置
    │  │  ├─expand 扩展组件
    │  │  └─settings 设置
    │  └─process 流程
    │      ├─config 流程节点设置
    │      └─nodes 流程节点
    └─workspace 工作区
```



### 设计器数据

> 设计器的数据都存在Vuex中，需要传递到后端时，直接取出提交到接口

```json
{
    "formId":"37289743892", //表单ID，由后端生成
    "formName":"补卡申请", //表单名称
    "logo":{ //图标
        "icon":"图标/图片base64",
        "background":"#FEFEFE" //如果是图片则不生效
    },
    //表单权限及其他属性设置
    "settings":{
        "commiter": [], //哪些人可以提交发起表单
    	"admin":[], //表单管理员，可以编辑及导出数据
        "singn": false, //全局设置审批时是否需要签字
        "notify":{
            "type": "APP", //通知类型 APP QQ WX DING EMAIL
            "title": "消息通知标题"
        }
    },
    "group":20, //所在分组
    "formItems":[],//表单设计数据
    "process":{}, //流程数据
    "remark":"备注说明"
}
```



## 💗打赏列表 

感谢以下朋友的支持，也感谢关注本项目及提出宝贵建议的各位。

| 昵称 （按时间排序）                                                         | 金额 |
| ------------------------------------------------------------ | ---- |
| * 晓龙 | 400 |
|  * HF | 188   |
|  * 晓龙 | 500   |
|  * 基 | 9.9   |
|  * 学龙 | 30   |
| * 辉  | 50   |
|  * ncert | 50   |
|  。 | 30   |



## 💪支持作者

**开源不易，需要鼓励，如果觉得这个项目有帮助到了你请我喝杯咖啡吧😋** 
<img src="https://pic.rmb.bdstatic.com/bjh/a4a29377ac6ae1f8d4ea4a513a5c5129.png" alt="支持作者" style="zoom:60%;" />
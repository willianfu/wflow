# 项目介绍

## 依赖相关

本项目基于 `Vue2.x`、`ElementUI `  构建，css使用 `Less`，请注意`node`与`less`的版本兼容问题



## 目录结构

```
└─src
    ├─api （Api接口）
    ├─assets （静态资源）
    │  └─image
    ├─components （公共组件，空）
    │  └─common
    ├─router （路由）
    ├─store	（Vuex）
    ├─utils	（工具函数）
    └─views	（页面）
        ├─admin	（表单流程设计器）
        │  └─layout	（布局设计）
        │      ├─form	（表单布局设计）
        │      └─process	（流程布局设计）
        ├─common	（组件）
        │  ├─form	（表单组件）
        │  │  ├─components	（拖拽设计的表单元素组件）
        │  │  └─config	（表单元素组件的右侧配置项面板组件）
        │  └─process	（流程组件）
        │      ├─config	（流程设计的流程节点组件的配置面板组件）
        │      └─nodes	（流程设计的流程节点组件）
        ├─process	（空）
        │  └─node
        └─workspace （工作区，发起流程，设计出来的流程列表）
```



## 集成到现有前端项目

### vue项目

#### 仅使用流程设计器

流程设计器入口文件为 `src\views\admin\layout\ProcessDesign.vue` ，与之相关的所有文件都要引入，主要文件在下图所示，或者也可以参考`master-precessDesign`分支（不一定最新）

<img src="https://pic.rmb.bdstatic.com/bjh/185556f44bdd7c99c427cfde4039b578.png" alt="image-20220731221004670" style="zoom:33%;" />



#### 使用整个表单流程设计器

表单流程设计器入口在 `src\views\admin\FormProcessDesign.vue`，可以直接引入

如果你也需要那个表单列表，文件为 ``src\views\adminFormsPanel.vue` 



### 其他框架

如果是其他不兼容的框架/版本，可以单独部署成一个独立的前端项目，再使用 `<iframe> ` 进行引入
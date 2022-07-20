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




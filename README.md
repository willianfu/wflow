## wflow-web 前端



![](doc/image/README/流程.png)



<h1 align="center">wflow 工作流</h1>

[![star](https://gitee.com/willianfu/jw-workflow-engine/badge/star.svg?theme=dark)](https://gitee.com/willianfu/jw-workflow-engine/stargazers)[![fork](https://gitee.com/willianfu/jw-workflow-engine/badge/fork.svg?theme=dark)](https://gitee.com/willianfu/jw-workflow-engine/members) <img src="https://img.shields.io/badge/release-v0.0.1-brightgreen.svg"><img src="https://shields.io/badge/license-APACHE2.0-blue">



## 简介

`wflow-web` 是 `wflow工作流` 项目的前端设计器，免费且开源，本设计器包含表单设计，审批流程设计。

> 区别于传统Bpmn自带流程设计器，传统设计器晦涩难懂，对于普通企业用户使用门槛偏高，没有经过专业培训根本无从下手，需要相关专业人员辅助来创建流程。而本设计器界面简单，符合普通大众的思维逻辑，易于理解和上手使用。



**感兴趣的小伙伴可以加我微信 `willianfu_`进群交流**

<p style="color: red">请务必备注： wflow </p>


  👉 在线体验地址： [戳我打开演示页面](http://47.100.202.245:83) 👈



## 界面一览

###  **工作区面板** 

<img src="https://images.gitee.com/uploads/images/2020/1005/140253_39e3f2d5_4928216.png" alt="输入图片说明" title="屏幕截图.png" style="zoom: 50%;" />

<img src="https://images.gitee.com/uploads/images/2020/1005/140329_89cd5aac_4928216.png" alt="输入图片说明" title="屏幕截图.png" style="zoom:50%;" />

**设计器表单回显**

![image-20220711112958351](doc/image/README/image-20220711112958351.png)



### 表单管理

 **工作流表单管理，支持分组和单组表单拖拽排序** 

<img src="https://images.gitee.com/uploads/images/2020/1005/140358_17fc6838_4928216.png" alt="输入图片说明" title="屏幕截图.png" style="zoom:50%;" />

<img src="https://images.gitee.com/uploads/images/2020/1005/140502_bdc2ea04_4928216.png" alt="输入图片说明" title="屏幕截图.png" style="zoom:50%;" />


---------

####  **表单基本设置** 

<img src="https://images.gitee.com/uploads/images/2020/1005/140559_5c51a89b_4928216.png" alt="输入图片说明" title="屏幕截图.png" style="zoom: 50%;" />




--------

####  **表单布局设计器**

![image-20220711111255178](doc/image/README/image-20220711111255178.png)


---------

 #### 流程设计器

> 任意条件层级审批流程设计， 审批节点支持多种业务类型设置，支持流程校验

![image-20220711111351476](doc/image/README/image-20220711111351476.png)

**支持无限层级嵌套**

![image-20220711111911427](doc/image/README/image-20220711111911427.png)




---------

**自定义复杂流转条件**

> 可视化流程逻辑分支条件

<img src="https://images.gitee.com/uploads/images/2021/0416/195844_51ece085_4928216.png" alt="输入图片说明" title="屏幕截图.png" style="zoom:50%;" />

---------



 **支持多种类型业务节点，支持配置校验，灵活配置，赋予无限可能** 

![输入图片说明](https://pic.rmb.bdstatic.com/bjh/5393cbdcb4d01fe35a994b87b5488dcc.png)
---------

**条件节点优先级动态拖拽，实时刷新**

<img src="https://images.gitee.com/uploads/images/2021/0416/200127_a59216a1_4928216.png" alt="输入图片说明" title="屏幕截图.png" style="zoom:50%;" />



## 开发

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



### 基础设置

### 表单数据结构

> 利用 vue render() 函数，可以通过js动态渲染表单，参见：[渲染函数 & JSX — Vue.js (vuejs.org)](https://cn.vuejs.org/v2/guide/render-function.html)

#### 组件规范

> 定义一个组件规范，所有的组件都应当符合这个规范，方便后续自行创建各类组件

##### 公共构造

> 为了方便存储和解析，仍然使用json来描述一个组件

```javascript
{
	"name":"TextInput", //组件名称，项目内应当有此组件对应的.vue文件
    "title": '单行文本输入', //组件别名
    "icon": 'el-icon-edit', //组件在组件库显示的图标
    "value": '', //组件绑定的值
    "valueType": 'string', //组件值对应的类型 String, Number,Array, Object, Date, Dept, User
    "props":{
        "mode": 'DESIGN', //组件模式，默认设计模式，DESIGN、PC、MOBILE，根据组件模式渲染不同状态
        "required": false, //是否必填项，作为流程条件的话需要必填
        "enablePrint": true,
        // ....自行扩展其他属性
    }
}
```

不同的组件，它的 `mode` 字段内容是不同的，默认为设计状态，在设计表单时，组件的样式和预览表单时正常显示是不一样的，设计的时候显示的都需要很简洁，预览时才是组件真实的样子。

```vue
<template>
  <div>
    <div v-if="mode === 'DESIGN'">
      <el-input size="medium" disabled :placeholder="placeholder"/>
    </div>
    <div v-else>
      <el-input size="medium" clearable v-model="_value" :placeholder="placeholder"/>
    </div>
  </div>
</template>

<script>
import componentMinxins from '../ComponentMinxins'

export default {
  mixins: [componentMinxins],
  name: "TextInput",
  components: {},
  props: {
    placeholder: {
      type: String,
      default: '请输入内容'
    }
  }
}
</script>

```



### 流程数据结构

#### 流程节点

> 流程设计器中，每一个可视化元素块都是一个节点，渲染器根据节点类型渲染不同组件

```js
{
    //节点ID，当前流程内唯一，由前端随机生成
	"id": "90aasvbsh8a0a7f", 
    "parentId": "7d89sf7d8sasf", //父级节点ID，用来向上搜索
	//节点类型，ROOT(发起人，根节点)、APPROVAL(审批)、CC(抄送)、CONDITION(条件)、CONCURRENT（并行节点）、DELAY(延时节点)、EMPTY(空节点，占位)
    "type":"ROOT", 
    "name": "节点名称",
    "desc":"节点描述",
    "props":{}, //节点属性，见下方props说明
    "children": {}, //子节点项，内部字段与当前结构相同，为条件/并行 节点的组合末端节点
    //子分支 当type 为 CONDITION / CONCURRENT 时，该项存在，内容为条件或并行节点内的所有分支
    "branchs":[] 
}
```



#### 流程节点属性 props

> 不同类型得节点props不同，里面携带了当前节点设置的一些信息

##### ROOT (根节点)

> 根节点是最顶层节点，发起人节点

```js
{
    //发起人权限，哪些 人/部门 可以发起这个审批
   "assignedUser": [
    	{
    		"id": "user_id_001",
    		"name":"张三",
    		"type": "user" //根据类型判断是人或者部门
		},
		{
    		"id": "dept_id_001",
    		"name": "研发部",
    		"type": "dept" ////根据类型判断是人或者部门
		}
    ]
}
```

##### APPROVAL（审批节点）

> 审批节点设置审批人及审批规则

```js
{
    //审批处理的类型 ASSIGN_USER 指定人员、SELF_SELECT 发起人自选、LEADER_TOP 连续多级主管、LEADER 主管、ROLE 指定角色、SELF 发起人自己、REFUSE 自动拒绝
    "assignedType": "类型",
    "mode": "AND", //多人审批时的审批模式，AND 会签、OR 或签、NEXT 顺序依次审批
    "sign": false, //审批同意时是否需要签字
    //审批人为空时的规则
    "nobady": {
       "handler": "PASS", //PASS 直接通过、 TO_ADMIN 转交主管理员、TO_USER 转交指定人员
        "assignedUser":[] //TO_USER 时的指定人员
    },
    //审批超时限制设置
    "timeLimit":{
        //超时时间限制
        "timeout":{
            "unit": "H", //时间单位 M分钟、H小时、D天,
            "value": 2 //时间值
        },
        //超时后的处理规则
        "handler":{
            "type": "REFUSE", //PASS 自动通过、REFUSE 自动驳回、NOTIFY 发送通知进行提醒
            "notify":{
                "once": true, //是否只提醒一次
                "hour": 1 //重复提醒，几小时提醒一次
            }
        }
    },
    "assignedUser":[], //指定审批人员 ASSIGN_USER 时不为空
    //发起人自选
    "selfSelect": {
    	"multiple": true // 是否多选 true/false
	},
    //连续多级主管
    "leaderTop": {
        "endCondition": "TOP", //结束条件 TOP 直到最上级主管、 LEVEL 指定不超过多少级主管
        "endLevel": 1, //指定级别主管审批后结束本节点
    },
    //指定主管审批
    "leader":{
        "level": 1 //发起人指定级别主管
    },
    //指定角色审批
    "role":["admin", "leader", "hr"], //指定审批人为系统角色
}
```



##### CONDITION (条件节点)

> 条件选项节点是 CONDITIONS  的子节点，存在于 branchs 子分支内，用来设置条件

```js
{
    "groupsType":"OR", //条件组逻辑关系 OR、AND
    "groups":[
        {
            "name": "A", //组名 A B C D....依次递增
            "groupType":"AND", //条件组内条件关系 OR、AND
            //组内子条件
            "conditions":[ 
               {
                   "cid": "d78s96fd9s", //组件ID，通过组件ID索引到表单设计器中的组件
                   "compare": ">=", //比较运算符 >大于 <小于 大于等于 小于等于 范围
                   "value": [], //比较值，如果只需要比较一个值，那么只取value[0] 
               }
            ]
        }
    ],
    "expression": "(A AND B) OR C" //自定义表达式，灵活构建逻辑关系
}

```

##### CONCURRENT（并行节点）

> CONCURRENT是CONCURRENTS的字节点，无条件流转，多路分支同时并行进入

```js
无属性设置
```



##### CC（抄送节点）

> 当到达此节点时，流程状态会被发送给指定的用户

```js
{
    "assignedUser":[], //指定抄送人员
}
```



##### DELAY（延时处理节点）

> 流程到达此节点时，会被阻塞一段时间才被放行

```js
{
    "type": "FIXED", //延时类型 FIXED:到达当前节点后延时固定时长 、AUTO:延时到 dateTime设置的时间
    "time": 30, //延时时间
    "unit": "M", //时间单位 D天 H小时 M分钟
    "dateTime": "18:34:00" //如果当天没有超过设置的此时间点，就延时到这个指定的时间，到了就直接跳过不延时
}
```

##### TRIGGER（触发器节点）

> 流程到达此节点时，会触发一个提前设置好的动作，用来与外部系统对接

```js
{
  type: 'WEBHOOK', //触发的动作类型 WEBHOOK、EMAIL
  http:{
    method: 'GET', //请求方法 支持GET/POST
    url: '', //URL地址，可以直接带参数
    headers: [ //http header
      {
        name: '',
        isField: true,
        value: '' //支持表达式 ${xxx} xxx为表单字段名称
      }
    ],
    contentType: 'FORM', //请求参数类型
    params:[ //请求参数
      {
        name: '',
        isField: true, //是表单字段还是自定义
        value: '' //支持表达式 ${xxx} xxx为表单字段名称
      }
    ],
    retry: 1, //重试次数
    handlerByScript: false, //是否使用脚本处理请求结果
    success: 'function resHandler(res) {\n  return true;\n}',
    fail: 'function resHandler(res) {\n  return true;\n}'
  },
  email:{
    subject: '',
    to: [],
    content: ''
  }
}
```

##### EMPTY (空节点）

> 空节点时用来在设计器中每一个子分支末尾占位的，辅助UI构建，无设置项，处理时直接忽略



#### 核心算法

> 利用递归遍历实现 `流程树json` => `DOM` 的转换
>
> 详见组件 `views/admin/layout/process/ProcessTree.vue`

```js
function getDomTree(h, node) {
    if (this.isPrimaryNode(node)){
        //普通业务节点
        let childDoms = this.getDomTree(h, node.children)
        this.decodeAppendDom(h, node, childDoms)
        return [h('div', {}, childDoms)];
    }else if (this.isBranchNode(node)){
        //遍历分支节点，包含并行及条件节点
        let branchItems = node.branchs.map(branchNode => {
            //处理每个分支内子节点
            let childDoms = this.getDomTree(h, branchNode.children)
            this.decodeAppendDom(h, branchNode, childDoms)
            return h('div', {}, childDoms);
        })
        let bchDom = [h('div', {}, branchItems)]
        //继续遍历分支后的节点
        let afterChildDoms = this.getDomTree(h, node.children)
        return [h('div', {}, [bchDom, afterChildDoms])]
    }else if (this.isEmptyNode(node)){
        //空节点，存在于每个分支尾部
        let childDoms = this.getDomTree(h, node.children)
        this.decodeAppendDom(h, node, childDoms)
        return [h('div', {}, childDoms)];
    }else {
        //遍历到了末端，无子节点
        return [];
    }
}
```

 ### 进阶

#### 如何开发新表单组件

1、先在 `@/views/common/form/components/` 目录下创建一个`.vue` 组件，此为组件为表单组件

2、再在 `@/views/common/form/config/` 目录下创建一个`.vue` 组件，此为组件为表单组件的配置面板

3、编写代码，绘制组件

```vue
<template>
  <div>
    <div v-if="mode === 'DESIGN'">
      <!--组件在设计器中的样子-->
    </div>
    <div v-else>
      <!--组件在预览及真实显示的样子-->
    </div>
  </div>
</template>
import componentMinxins from '../ComponentMinxins'

<script>
//混入配置
import componentMinxins from '../ComponentMinxins'

export default {
  mixins: [componentMinxins],
  name: "组件名称",
  components: {},
  props: {
    placeholder: {
      type: String,
      default: '请输入内容'
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
```

最简单的一个组件架子就做完了，其他内部功能自行实现，本组件可以在外部使用 v-model 绑定



#### 如何扩展新流程设计器节点





**开源不易，需要鼓励，如果觉得这个项目有帮助到了你请我喝杯咖啡吧😋** 
<img src="https://pic.rmb.bdstatic.com/bjh/a4a29377ac6ae1f8d4ea4a513a5c5129.png" alt="支持作者" style="zoom:60%;" />

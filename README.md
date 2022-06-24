## jw-workflow-engine 前端

由 `Vue2`  + `ElementUI`  构建，仿钉钉风格

新版本开发中，见dev分支

- 优化渲染算法及代码结构，修复流程设计器所有已知Bug（已完成）**
- 精简代码，规范命名及处理流程
- 删除条件出现异常，分支残缺
- 宽度过大时，左侧无法全预览
- 新增并行分支，延时节点（已完成）
  - 并行分支，所有分支同时无条件进入，直到所有分支全部处理结束进入下一个节点。
  - 延时节点，延时阻塞流程一段时间再进入下一个流程
- 优化表单组件结构（开发中）
- 新增流程发起，在线提交流程，根据设计器渲染表单，根据表单内容条件渲染流程执行树（开发中）
- 流程数据管理，表单关联（开发中）
- 表单打印，审批结束后，前端直接生成最终单据（开发中）
- 开发完整配套工作流后端功能，基于Activity实现（计划中）


**感兴趣的小伙伴可以加我微信 `willianfu_`进群交流**


  👉 在线体验地址(未适配移动端)： [戳我打开演示页面](http://47.100.202.245:83) 👈



## 简介

###  **工作区面板** 

<img src="https://images.gitee.com/uploads/images/2020/1005/140253_39e3f2d5_4928216.png" alt="输入图片说明" title="屏幕截图.png" style="zoom: 50%;" />
<img src="https://images.gitee.com/uploads/images/2020/1005/140329_89cd5aac_4928216.png" alt="输入图片说明" title="屏幕截图.png" style="zoom:50%;" />

[演示视频](https://www.bilibili.com/video/BV1Vh41197Pw/)

### 表单管理

 **工作流表单管理，支持分组和单组表单拖拽排序** 

<img src="https://images.gitee.com/uploads/images/2020/1005/140358_17fc6838_4928216.png" alt="输入图片说明" title="屏幕截图.png" style="zoom:50%;" />

<img src="https://images.gitee.com/uploads/images/2020/1005/140502_bdc2ea04_4928216.png" alt="输入图片说明" title="屏幕截图.png" style="zoom:50%;" />


👉 [演示视频](https://www.bilibili.com/video/BV1dT4y1c7md/)

👉 [演示视频](https://www.bilibili.com/video/BV1Kk4y1C7F5/)


---------

####  **表单基本设置** 

<img src="https://images.gitee.com/uploads/images/2020/1005/140559_5c51a89b_4928216.png" alt="输入图片说明" title="屏幕截图.png" style="zoom: 50%;" />

👉 [演示视频](https://www.bilibili.com/video/BV1Th41197LS/)


--------

####  **表单布局设计器**

<img src="https://images.gitee.com/uploads/images/2020/1005/140740_832d5c2f_4928216.png" alt="输入图片说明" title="屏幕截图.png" style="zoom:50%;" />

👉 [演示视频](https://www.bilibili.com/video/BV1Xi4y1E7gb/)


---------

 #### 流程设计器

> 任意条件层级审批流程设计， 审批节点支持多种业务类型设置

<img src="https://images.gitee.com/uploads/images/2020/1005/141042_119eafd6_4928216.png" alt="输入图片说明" title="屏幕截图.png" style="zoom:50%;" />

<img src="https://images.gitee.com/uploads/images/2020/1005/141155_c6fa5f02_4928216.png" alt="输入图片说明" title="屏幕截图.png" style="zoom:50%;" />



👉 [演示视频](https://www.bilibili.com/video/BV1Nz4y1f7kS/)


---------

**自定义复杂流转条件**

> 可视化流程逻辑分支条件

<img src="https://images.gitee.com/uploads/images/2021/0416/195844_51ece085_4928216.png" alt="输入图片说明" title="屏幕截图.png" style="zoom:50%;" />

---------

**条件节点优先级动态拖拽，实时刷新**

<img src="https://images.gitee.com/uploads/images/2021/0416/200127_a59216a1_4928216.png" alt="输入图片说明" title="屏幕截图.png" style="zoom:50%;" />



## 开发

### 项目结构

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

```json
{
	"name":"my-number-input", //组件名称，项目内应当有此组件
    "isDesign": true, //是否是设计状态，在表单设计时应当为设计状态，发起审批时应当为正常状态
    "required": false, //是否必填项，作为流程条件的话需要必填
    "enablePrint": true, //是否允许打印时显示在表单中
    
    //vue createElement 函数内数据对象(第二个参数)，参见 https://cn.vuejs.org/v2/guide/render-function.html
    "config":{
        "props": {}, //组件的属性，符合vue规范
        "style":{}, //样式
        "class":{} //css类名
        //.....
    }
}
```

不同的组件，它的 `config` 字段内容是不同的，注意还有一个`isDesign` ，默认为设计状态，在设计表单时，组件的样式和预览表单时正常显示是不一样的，设计的时候显示的都需要很简洁，预览时才是组件真实的样子。

```vue
<template>
	<div>
        <div v-if="isDesign">设计状态</div>
        <div v-else>状态预览</div>
    </div>
</template>
<script>
    export default {
      props:[
          isDesign:{
          	type: Boolean,
          	defalut: true
          }
      ],
      data() {
        return {};
      }
	};
</script>
```



### 流程数据结构

#### 流程节点

> 流程设计器中，每一个可视化元素块都是一个节点，渲染器根据节点类型渲染不同组件

```json
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

```json
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

```json
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

```json
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
                   "values": [], //比较值，如果只需要比较一个值，那么只取value[0] 
               }
            ]
        }
    ],
    "expression": "(A AND B) OR C" //自定义表达式，灵活构建逻辑关系
}

```

##### CONCURRENT（并行节点）

> CONCURRENT是CONCURRENTS的字节点，无条件流转，多路分支同时并行进入

```json
无属性设置
```



##### CC（抄送节点）

> 当到达此节点时，流程状态会被发送给指定的用户

```json
{
    "assignedUser":[], //指定抄送人员
}
```



##### DELAY（延时处理节点）

> 流程到达此节点时，会被阻塞一段时间才被放行

```json
{
    "type": "FIXED", //延时类型 FIXED:到达当前节点后延时固定时长 、AUTO:延时到 dateTime设置的时间
    "time": 30, //延时时间
    "unit": "M", //时间单位 D天 H小时 M分钟
    "dateTime": "18:34:00" //如果当天没有超过设置的此时间点，就延时到这个指定的时间，到了就直接跳过不延时
}
```

##### TRIGGER（触发器节点）

> 流程到达此节点时，会触发一个提前设置好的动作，用来与外部系统对接

```json
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

喜欢就点个⭐吧 😀

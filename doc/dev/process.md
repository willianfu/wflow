# 流程设计

流程设计器是用来设计审批流程的，也就是绘制流程图

> 📢 鉴于部分同学针对流程设计器的需求，把流程设计器单独抽取出来，放在 `master-processDesign` 分支



📋 流程设计器核心文件为 `src\views\admin\layout\process\ProcessTree.vue`，整个流程设计器都是基于此组件渲染，手撸 vue-render😅。



## 流程节点数据结构

### 节点数据

整个流程设计器数据存放于 vuex `$store.state.design.process` 中，是一个以根节点为起始的深层嵌套对象，结构如下：

```js
{
	id: "90aasvbsh8a0a7f", 
    parentId: "7d89sf7d8sasf",
    type:"ROOT", 
    name: "发起人",
    props:{}, //节点属性，见下方props说明
    children: {}, 
    branchs:[] 
}
```

| 字段名   | 类型   | 含义         | 说明                                                         |
| -------- | ------ | ------------ | ------------------------------------------------------------ |
| id       | String | 节点ID       | 当前流程内唯一，由前端随机生成                               |
| parentId | String | 父级节点ID   | 用来向上搜索，关联子父                                       |
| type     | String | 节点类型     | ROOT(发起人，根节点)、APPROVAL(审批)、CC(抄送)、CONDITIONS(条件组)、CONCURRENTS（并行节点组）、CONDITION(条件子分支)、CONCURRENT（并行子分支）、DELAY(延时节点)、TRIGGER(触发器)、EMPTY(空节点，占位) |
| name     | String | 节点名称     | 显示在设计器中卡片头部名称                                   |
| props    | Object | 节点属性设置 | 节点的设置项内容                                             |
| children | Object | 子节点项     | 节点下方的子节点，无限嵌套，内部字段与当前结构相同           |
| branchs  | Array  | 子分支项     | 当type 为 CONDITIONS / CONCURRENTS 时，该项存在，内容为条件或并行节点内的所有分支 |



### 节点props设置项

> 每种节点的props设置项结构是不一样的，各自如下



##### ROOT (根节点)

> 根节点是最顶层节点，发起人节点

```js
{
    //发起人权限，哪些 人/部门 可以发起这个审批
   assignedUser: [
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
    ],
    formPerms: [] //表单权限设置
}
```



##### APPROVAL（审批节点）

> 审批节点设置审批人及审批规则

```js
{
    //审批处理的类型 ASSIGN_USER 指定人员、SELF_SELECT 发起人自选、LEADER_TOP 连续多级主管、LEADER 主管、ROLE 指定角色、SELF 发起人自己、REFUSE 自动拒绝、FORM_USER指定表单联系人
    assignedType: "类型",
    mode: "AND", //多人审批时的审批模式，AND 会签、OR 或签、NEXT 顺序依次审批
    sign: false, //审批同意时是否需要签字
    formPerms: [], //表单权限设置
    //审批人为空时的规则
    nobady: {
       handler: "PASS", //PASS 直接通过、 TO_ADMIN 转交主管理员、TO_USER 转交指定人员
        assignedUser:[] //TO_USER 时的指定人员
    },
    //审批超时限制设置
    timeLimit:{
        //超时时间限制
        timeout:{
            unit: "H", //时间单位 M分钟、H小时、D天,
            value: 2 //时间值
        },
        //超时后的处理规则
        handler:{
            type: "REFUSE", //PASS 自动通过、REFUSE 自动驳回、NOTIFY 发送通知进行提醒
            notify:{
                once: true, //是否只提醒一次
                hour: 1 //重复提醒，几小时提醒一次
            }
        }
    },
    assignedUser:[], //指定审批人员 ASSIGN_USER 时不为空
    //发起人自选
    selfSelect: {
    	multiple: true // 是否多选 true/false
	},
    //连续多级主管
    leaderTop: {
        endCondition: "TOP", //结束条件 TOP 直到最上级主管、 LEVEL 指定不超过多少级主管
        endLevel: 1, //指定级别主管审批后结束本节点
    },
    //指定主管审批
    leader:{
        level: 1 //发起人指定级别主管
    },
    //指定角色审批
    role:[
        {id: 'user', name: '普通用户'},
        {id: 'admin', name: '管理员'}
    ], //指定审批人为系统角色
    refuse: { //驳回设置
        //TO_END 驳回直接结束流程、TO_NODE 驳回到指定节点、TO_BEFORE 驳回到上一级
        type: 'TO_END', 
        target: '' //驳回到指定ID的节点
    },
    formUser: ''//类型为指定表单联系人时，对应表单组件ID
}
```



##### CONDITION (条件节点)

> 条件选项节点是 CONDITIONS  的子节点，存在于 branchs 子分支内，用来设置条件

```js
{
    groupsType:"OR", //条件组逻辑关系 OR、AND
    groups:[
        {
            groupType:"AND", //条件组内条件关系 OR、AND
            //组内子条件
            conditions:[ 
               {
                   cid: "d78s96fd9s", //组件ID，通过组件ID索引到表单设计器中的组件
                   compare: ">=", //比较运算符 >大于 <小于 大于等于 小于等于 范围
                   value: [], //比较值，如果只需要比较一个值，那么只取value[0] 
               }
            ]
        }
    ],
    expression: "(A AND B) OR C" //自定义表达式，灵活构建逻辑关系
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
    shouldAdd: false, //允许发起人自选抄送人
    assignedUser:[], //指定抄送人员
}
```



##### DELAY（延时处理节点）

> 流程到达此节点时，会被阻塞一段时间才被放行

```js
{
    type: "FIXED", //延时类型 FIXED:到达当前节点后延时固定时长 、AUTO:延时到 dateTime设置的时间
    time: 30, //延时时间
    unit: "M", //时间单位 D天 H小时 M分钟
    dateTime: "18:34:00" //如果当天没有超过设置的此时间点，就延时到这个指定的时间，到了就直接跳过不延时
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



### 表单权限设置

表单权限设置目前只存在于两种节点，`APPROVEL` 和`ROOT`，都在这俩节点的`props`字段内的 `formPerms`中

🔓 表单权限对应三种类型 

- 👀 只读：R  （该表单项节点关联人员只能看表单结果，不能修改）
- ✍ 可编辑：R （该表单项节点关联人员可以修改表单内容）
- 😎 隐藏：H  （该表单项对该节点关联人员隐藏，不展示）

`formPerms` 的内容如下：

```js
[
    {
        id: "field3781138962528",  //表单字段ID
        perm: "R", //权限标识
        title: "单行文本输入", ///表单名称
	}
]
```



❗ 请注意，如果没有手动修改表单权限设置的话，`formPerms`  内是默认为空的

因此约定 `APPROVEL` 节点默认所有表单权限为只读，`ROOT`节点默认所有权限为可编辑
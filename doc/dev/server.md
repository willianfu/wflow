# 服务端开发指南

目前只开源了前端设计器部分，大家配套后端使用的话，需要自行开发服务端应用，可以参考如下说明



## 基本要求

### 组织机构选择器

组织机构选择器由于在项目很多地方引用了，如果在不修改组件代码的情况下，建议按如下规则适配

> 该组件存在于 `src\components\common\organizationPicker.vue`，对应API接口在 `src/api/org.js`，有2个接口，分别如下

#### 获取组织架构列表

方法： `getOrgTree`

URL：`/oa/org/tree`

请求类型：`GET`

参数：

- deptId： 当前选中的部门ID
- type：`user` - 返回部门和部门内的人员   `dept`-只返回部门   `role`-只返回系统角色

返回结果：（部门和人员结构一致，注意部门应当排序在前）

```json
[
	{
		"id": "部门/人员ID",
		"name": "部门/人员名",
		"avatar":"人员的头像的 base64 / url",
        "type": "本数据对象的类型，user/dept"
	}
]
```



#### 按拼音/姓名搜索人员

>  当在搜索框直接输入拼音/姓名时，将会发起搜索请求，后端应当根据参数内容匹配用户的姓名或者姓名拼音

方法： `getUserByName`

URL：`oa/org/tree/user/search`

请求类型：`GET`

参数：

- userName：搜索参数

返回结果：（人员列表）

```json
[
	{
		"id": "人员ID",
		"name": "人员名",
		"avatar":"人员的头像的 base64 / url",
        "type": "本数据对象的类型，user"
	}
]
```



## 流程解析

流程的数据存储在 vuex的 `state.design.process`中，由于序列化后是json结构，非标准 Bpmn，因此需要在后端做转换，也建议在后端进行转换。

最常用的Java开源流程引擎有 `activiti` 、`Flowable` ，两者同源，差不多用法，都提供了使用代码Api来构建Xml的功能。



### wflow节点与Bpmn概念对应关系



#### 发起人

`发起人` 可以映射为`startEvent`，也可以忽略，发起人主要是为了设置哪些人可以发起该流程，也就是该流程的权限，并且也是默认的候选条件



#### 审批人

审批人对应 `UserTask` ，该节点是需要审批人对发起人提交的表单进行处理，以及如果有需要的话也可以修改提交的表单（要设置表单可编辑权限）

审批意味着主要是做两件事，`同意/驳回` ，同意就进入下一任务， 而驳回的策略有两种，默认直接驳回到`EndEvent` ,如果设置了则驳回到指定节点，因为有2种结果分流，所以此处应该设置条件顺序流。



#### 抄送人

抄送人对应 `ServiceTask`，应当掉用java指定的功能类，传入参数执行发送通知的功能



#### 延时处理

延时处理对应 `intermediateCatchEvent`，设置为定时器类型的中间事件，根据配置解析



#### 触发器

触发器对应 `ServiceTask`，应当掉用java指定的功能类，传入参数执行Http请求或者发邮件，由于触发器支持脚本，因此要完全支持触发器功能的话需要引入`js执行器` 

**务必设置运行资源限制，防止用户上传恶意脚本搞崩服务器。**

```xml
<!-- https://mvnrepository.com/artifact/org.openjdk.nashorn/nashorn-core -->
<dependency>
    <groupId>org.openjdk.nashorn</groupId>
    <artifactId>nashorn-core</artifactId>
    <version>15.3</version>
</dependency>

```



#### 条件分支

条件节点对应 `exclusive gateway` ，这与普通节点有所不同

![image-20220720145227591](https://pic.rmb.bdstatic.com/bjh/fec7f2894a598c5b50f930b3f64ac93c.png)

如上图所示，实际上外部还有一个看不到的节点对象，将这几个子分支条件`包裹起来`，这个红色部分才是条件节点，也就是排他网关，绿色条件块应当解析为**带条件的**`sequenceFlow`连接线，该节点内设置的条件应该作为`sequenceFlow`的条件



#### 并行分支

并行分支对应`parallelGateway` ，与条件分支一样，外部也有一个对象包裹内部的并行分支，外部这个对象应该解析为`并行网关`，但是它的分支节点首部应当看做普通顺序流，由于并行网关成对存在，因此需要注意创建合流的分支，将每个子分支末端连接到合流点

<img src="https://pic.rmb.bdstatic.com/bjh/4ea8259c04daa76b91f8b9863d46a66e.png" alt="image-20220720150019350" style="zoom:50%;" />






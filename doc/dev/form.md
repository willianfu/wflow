# 表单设计

## 数据结构

为了考虑后期对不同UI框架的兼容及数据传输的便捷，表单使用json来进行描述，前端通过json再反向渲染该表单

表单数据存储在vuex中，具体对象为 `$store.state.process.formItems`，是个数组



### 表单组件

表单组件是构成表单的基本元素，一个表单可以有多个组件，在UI中体现为如下图

![image-20220724222124900](https://pic.rmb.bdstatic.com/bjh/096e0dacdbc8ced5db475517c325601c.png)



#### 组件值类型

每个组件都有对应的值，我们需要定义值的类型，有如下类型定义

```js
const ValueType = {
  string: 'String',
  object: 'Object',
  array: 'Array',
  number: 'Number',
  date: 'Date', //yyyy-MM-dd xxx类型的字符串日期格式
  user: 'User', //人员
  dept: 'Dept', //部门
  dateRange: 'DateRange'
}
```



#### 组件数据结构

每个组件需要预先定义好数据结构，存在于文件 `/src/views/common/form/ComponentsConfigExport.js`中，此文件中定义的组件将被展示到表单设计器左侧组件候选区。

**结构如下：**

```js
  {
    title: '多行文本输入', //组件标题
    name: 'TextareaInput', //组件名，组件是根据组件名来决定渲染哪个组件的
    icon: 'el-icon-more-outline', //组件在设计器候选区的图标
    value: '', //组件的值
    valueType: ValueType.string, //组件值数据类型
    props: { //组件的附加属性
      required: false,  //公共属性，是否必填
      enablePrint: true //公共属性，是否允许打印
      //组件其他设置项，根据组件类型来自定义
    }
  }
```



## 表单组件开发

`wflow` 中自带的组件可能并不满足大家的需求，这时候就需要开发自定义组件了，对组件库进行扩充。

### 组件规范

开发的组件尽量符合统一规范，每个组件都以一个独立的 `.vue` 文件存在，组件结构定义应如下：

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



### 示例

我们以系统自带组件库中的 `AmountInput.vue` （金额输入框）组件为例

![image-20220720112056889](https://pic.rmb.bdstatic.com/bjh/f6f53d67ba3929cdc30b21ff59c2a152.png)

#### 定义组件数据结构

打开 `/src/views/common/form/ComponentsConfigExport.js`，往内添加一项

```js
  {
    title: '金额输入框',
    name: 'AmountInput', //定义组件名称
    icon: 'el-icon-coin',
    value: '',
    valueType: ValueType.number, //金额的值类型为数值
    props: {
      required: false,
      enablePrint: true,
      precision: 1, //数值精度，允许的小数位数
      showChinese: true //是否展示中文大写
    }
  }
```



#### 定义组件

打开 `/src/views/common/form/components/` 目录，往内新建一个文件 `AmountInput.vue`，内容如下

```vue
<template>
  <div style="max-width: 350px">
    <div v-if="mode === 'DESIGN'">
      <el-input size="medium" disabled :placeholder="placeholder"/>
      <div style="margin-top: 15px" v-show="showChinese">
        <span>大写：</span>
        <span class="chinese">{{chinese}}</span>
      </div>

    </div>
    <div v-else>
      <el-input-number :min="0" controls-position="right" :precision="precision" size="medium" clearable v-model="_value" :placeholder="placeholder"/>
      <div v-show="showChinese">
        <span>大写：</span>
        <span class="chinese">{{chinese}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import componentMinxins from '../ComponentMinxins'

export default {
  mixins: [componentMinxins],
  name: "AmountInput",
  components: {},
  props: {
    placeholder: {
      type: String,
      default: '请输入金额'
    },
    //是否展示中文大写
    showChinese: {
      type: Boolean,
      default: true
    },
    //数值精度
    precision: {
      type: Number,
      default: 0
    }
  },
  computed:{
    //计算属性绑定金额
    chinese(){
      return this.convertCurrency(this.value)
    },
  },
  data() {
    return {}
  },
  methods: {
    //数字转中文大写金额
    convertCurrency(money) {
      //汉字的数字
      const cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
      //基本单位
      const cnIntRadice = ['', '拾', '佰', '仟'];
      //对应整数部分扩展单位
      const cnIntUnits = ['', '万', '亿', '兆'];
      //对应小数部分单位
      const cnDecUnits = ['角', '分', '毫', '厘'];
      //整数金额时后面跟的字符
      const cnInteger = '整';
      //整型完以后的单位
      const cnIntLast = '元';
      //最大处理的数字
      let maxNum = 999999999999999.9999;
      //金额整数部分
      let integerNum;
      //金额小数部分
      let decimalNum;
      //输出的中文金额字符串
      let chineseStr = '';
      //分离金额后用的数组，预定义
      let parts;
      if (money === '') {
        return '';
      }
      money = parseFloat(money);
      if (money >= maxNum) {
        //超出最大处理数字
        return '';
      }
      if (money === 0) {
        chineseStr = cnNums[0] + cnIntLast + cnInteger;
        return chineseStr;
      }
      //转换为字符串
      money = money.toString();
      if (money.indexOf('.') === -1) {
        integerNum = money;
        decimalNum = '';
      } else {
        parts = money.split('.');
        integerNum = parts[0];
        decimalNum = parts[1].substr(0, 4);
      }
      //获取整型部分转换
      if (parseInt(integerNum, 10) > 0) {
        var zeroCount = 0;
        var IntLen = integerNum.length;
        for (let i = 0; i < IntLen; i++) {
          let n = integerNum.substr(i, 1);
          let p = IntLen - i - 1;
          let q = p / 4;
          let m = p % 4;
          if (n == '0') {
            zeroCount++;
          } else {
            if (zeroCount > 0) {
              chineseStr += cnNums[0];
            }
            //归零
            zeroCount = 0;
            chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
          }
          if (m == 0 && zeroCount < 4) {
            chineseStr += cnIntUnits[q];
          }
        }
        chineseStr += cnIntLast;
      }
      //小数部分
      if (decimalNum !== '') {
        let decLen = decimalNum.length;
        for (let i = 0; i < decLen; i++) {
          let n = decimalNum.substr(i, 1);
          if (n !== '0') {
            chineseStr += cnNums[Number(n)] + cnDecUnits[i];
          }
        }
      }
      if (chineseStr === '') {
        chineseStr += cnNums[0] + cnIntLast + cnInteger;
      } else if (decimalNum === '') {
        chineseStr += cnInteger;
      }
      return chineseStr;
    }
  }
}
</script>

<style scoped>
.chinese{
  color: #afadad;
  font-size: smaller;
}
</style>

```



#### 定义组件配置面板

每个组件的设置项都有可能不一样，因此为了统一，我们给每个组件都添加一个设置面板

在路径 ``/src/views/common/form/config/`目录下， 新建一个`AmountInputConfig.vue` 文件 

```vue
<template>
  <div>
    <el-form-item label="提示文字">
      <el-input size="small" v-model="value.placeholder" placeholder="请设置提示语"/>
    </el-form-item>
    <el-form-item label="保留小数">
      <el-input-number controls-position="right" :precision="0" 
                       :max="3" :min="0" size="small" 
                       v-model="value.precision"  placeholder="小数位数"/>
       位
    </el-form-item>
    <el-form-item label="展示大写">
      <el-switch v-model="value.showChinese"></el-switch>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: "AmountInputConfig",
  components: {},
  props:{
    //value为定义组件的数据结构里面的 props 对象
    value:{
      type: Object,
      default: ()=>{
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

```

建议直接使用 `el-form-item` 组件，方便布局

```vue
<el-form-item label="设置项名称">
	<!-- 设置的组件，比如输入框、下拉选择等 -->
</el-form-item>
```

最终效果如下图

<img src="https://pic.rmb.bdstatic.com/bjh/39e6ac34982ed22f4e9340628638ada6.png" alt="image-20220720135853094" style="zoom:50%;" />



----



### 组件的开发技巧

#### 与后端接口数据交互

有时候我们可能需要一个从后端获取数据的组件，以上面的`金额输入框组件`为例

> 🤐 假设我们需要从后端获取表单提交人账户的可用余额，来限制金额输入框的最大值

此时可以将API请求写在组件的生命周期钩子函数中

```vue
<template>
  <div style="max-width: 350px">
    <div v-if="mode === 'DESIGN'"></div>
    <div v-else>
      <el-input-number :min="0" :max="maxLimit" controls-position="right" 
                       :precision="precision" size="medium" clearable v-model="_value" 
                       :placeholder="placeholder"/>
      <div v-show="showChinese">
        <span>大写：</span>
        <span class="chinese">{{chinese}}</span>
      </div>
      <div>
        <span>可用余额：</span>
        <span>￥ {{maxLimit}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import componentMinxins from '../ComponentMinxins'
//引入接口
import {getAmount} from '../api'

export default {
  mixins: [componentMinxins],
  name: "组件名称",
  components: {},
  props: {},
  data() {
    return {
        maxLimit: 0
    }
  },
  created(){
      //组件创建完成后加载可用余额
      this.loadAmount()
  },
  methods: {
      loadAmount(){
          getAmount(localStroage.getItem('userId')).then(res => {
              this.maxLimit = res.data
          }).catch(err => {
              //......
          })
      }
  }
}
</script>
```



#### 组件内引用其他组件

如果组件过于复杂，可以将组件进行多文件拆分，最后用父组件进行渲染



### 组件动态渲染原理

参见1：[组件基础 — Vue.js (vuejs.org)](https://cn.vuejs.org/v2/guide/components.html#动态组件)

参见2：[渲染函数 & JSX — Vue.js (vuejs.org)](https://cn.vuejs.org/v2/guide/render-function.html)


<template>
  <div>
    <div>
      <!--渲染表单-->
      <el-form label-width="150px" ref="form" :rules="formConfig.rules" :model="formConfig.data">
        <el-form-item :prop="item.id" :label="item.title" v-for="(item, index) in form.formItems" :key="item.name + index">
          <form-design-render v-model="formConfig.data[item.id]" mode="PC" :config="item"/>
        </el-form-item>
      </el-form>
    </div>
    <el-divider>审批流程</el-divider>
    <div>
      <!--渲染流程执行过程-->
      <el-timeline :reverse="false">
      <!--<el-timeline-item v-for="(activity, index) in activities" :key="index">

        </el-timeline-item>-->
      </el-timeline>
    </div>
  </div>
</template>

<script>
import FormDesignRender from '@/views/admin/layout/form/FormDesignRender'
import {getFormDetail} from '@/api/design'
import fromProcessUtil from '@/utils/FromProcessUtil'

export default {
  name: "InitiateProcess",
  components: {FormDesignRender},
  props:{
    code:{
      type: String,
      required: true
    }
  },
  data() {
    return {
      formConfig:{
        //数据字段
        data:{},
        //校验规则
        rules:{}
      },
      form:{
        formId: '',
        formName:"",
        logo:{},
        formItems:[],
        process:{},
        remark: ""
      }
    }
  },
  mounted() {
    this.loadFormInfo(this.code)
  },
  computed:{
    forms() {
      return this.$store.state.design.formItems;
    }
  },
  methods: {
    loadFormInfo(formId){
      getFormDetail(formId).then(rsp => {
        console.log(rsp.data)
        let form = rsp.data;
        form.logo = JSON.parse(form.logo)
        form.settings = JSON.parse(form.settings)
        form.formItems = JSON.parse(form.formItems)
        form.process = JSON.parse(form.process)
        this.form = form
        //构建表单及校验规则
        this.loadFormConf(form.formItems)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadFormConf(formItems){
      const formConf = fromProcessUtil.loadFormConf(formItems)
      this.$set(this.formConfig, 'data', formConf.data)
      this.$set(this.formConfig, 'rules', formConf.rules)
    },
    validate(call){
      this.$refs.form.validate(call);
    }
  }
}
</script>

<style scoped>

</style>

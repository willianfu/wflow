<template>
  <!--渲染表单-->
  <el-form label-width="150px" ref="form" :rules="formConfig.rules" :model="formConfig.data">
    <el-form-item :prop="item.id" :label="item.title" v-for="(item, index) in form.formItems" :key="item.name + index">
      <form-design-render v-model="formConfig.data[item.id]" mode="PC" :config="item"/>
    </el-form-item>
  </el-form>
</template>

<script>
import FormDesignRender from '@/views/admin/layout/form/FormDesignRender'

export default {
  name: "FormRender",
  components: {FormDesignRender},
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
  methods: {}
}
</script>

<style scoped>

</style>

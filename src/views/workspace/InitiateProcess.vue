<template>
  <div v-loading="loading">
    <div v-if="!loading">
      <!--渲染表单-->
      <form-render class="process-form" ref="form" :forms="forms" v-model="formData"/>
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
import FormRender from '@/views/common/form/FormRender'
import FormDesignRender from '@/views/admin/layout/form/FormDesignRender'
import {getFormDetail} from '@/api/design'

export default {
  name: "InitiateProcess",
  components: {FormDesignRender, FormRender},
  props: {
    code: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      formData: {},
      form: {
        formId: '',
        formName: "",
        logo: {},
        formItems: [],
        process: {},
        remark: ""
      }
    }
  },
  mounted() {
    this.loadFormInfo(this.code)
  },
  computed: {
    forms() {
      return this.$store.state.design.formItems;
    }
  },
  methods: {
    loadFormInfo(formId) {
      this.loading = true
      getFormDetail(formId).then(rsp => {
        this.loading = false
        console.log(rsp.data)
        let form = rsp.data;
        form.logo = JSON.parse(form.logo)
        form.settings = JSON.parse(form.settings)
        form.formItems = JSON.parse(form.formItems)
        form.process = JSON.parse(form.process)
        this.form = form
        //构建表单及校验规则
        this.$store.state.design = form
      }).catch(err => {
        this.loading = false
        this.$message.error(err)
      })
    },
    validate(call) {
      this.$refs.form.validate(call);
    }
  }
}
</script>

<style lang="less" scoped>
.process-form {
  /deep/ .el-form-item__label {
    padding: 0 0;
  }
}
</style>

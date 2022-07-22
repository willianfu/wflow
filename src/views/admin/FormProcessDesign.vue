<template>
  <el-container>
    <el-header style="background: white">
      <layout-header v-model="activeSelect" @publish="publishProcess" @preview="preview"></layout-header>
    </el-header>
    <div class="layout-body">
      <form-base-setting ref="baseSetting" v-show="activeSelect === 'baseSetting'"/>
      <form-design ref="formSetting" v-show="activeSelect === 'formSetting'"/>
      <process-design ref="processDesign" v-show="activeSelect === 'processDesign'"/>
      <form-pro-setting ref="proSetting" v-show="activeSelect === 'proSetting'"/>
    </div>
    <org-picker multiple type="role" ref="picker" title="选择人员"/>
  </el-container>

</template>

<script>
import LayoutHeader from './LayoutHeader'
import {getFormDetail, createForm, updateFormDetail} from '@/api/design'
import FormBaseSetting from '@/views/admin/layout/FormBaseSetting'
import FormDesign from '@/views/admin/layout/FormDesign'
import ProcessDesign from '@/views/admin/layout/ProcessDesign'
import FormProSetting from '@/views/admin/layout/FormProSetting'
import OrgPicker from "../../components/common/OrgPicker";

export default {
  name: "FormProcessDesign",
  components: {OrgPicker, LayoutHeader, FormBaseSetting, FormDesign, ProcessDesign, FormProSetting},
  data() {
    return {
      isNew: true,
      activeSelect: 'baseSetting',
      validVisible: false
    }
  },
  computed:{
    setup(){
      return this.$store.state.design
    }
  },
  created() {
    let formId = this.$route.query.code
    //判断传参，决定是新建还是加载原始数据
    this.loadInitFrom()
    if (!this.$isEmpty(formId)){
      this.isNew = false
      this.loadFormInfo(formId)
    }
    let group = this.$route.query.group
    this.setup.groupId = this.$isEmpty(group) ? null : parseInt(group)
  },
  methods:{
    loadFormInfo(formId){
      getFormDetail(formId).then(rsp => {
        console.log(rsp.data)
        let form = rsp.data;
        form.logo = JSON.parse(form.logo)
        form.settings = JSON.parse(form.settings)
        form.formItems = JSON.parse(form.formItems)
        form.process = JSON.parse(form.process)
        this.$store.commit('loadForm', form)
      }).catch(err => {
        this.$message.error(err)
      })
    },
    loadInitFrom(){
      this.$store.commit('loadForm', {
        formId: null,
        formName:"未命名表单",
        logo:{
          icon:"el-icon-eleme",
          background:"#1e90ff"
        },
        settings:{
          commiter: [],
          admin:[],
          sign: false,
          notify:{
            types: ["APP"],
            title: "消息通知标题"
          }
        },
        groupId: undefined,
        formItems:[],
        process:{
          id: "root",
          parentId: null,
          type: "ROOT",
          name: "发起人",
          desc: "任何人",
          props:{
            assignedUser: [],
            formPerms: []
          },
          children: {}
        },
        remark: "备注说明"
      })
    },
    validateDesign(){
      //this.$refs.picker.show()
      this.validVisible = true
    },
    preview(){
      this.validateDesign()
    },
    publishProcess(){
      this.$confirm('您确定审批流程已配置完毕,并需要将其发布，发布后立即生效，是否继续?', '提示', {
        confirmButtonText: '发布',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(this.setup)
        let template = {
          formId: this.setup.formId,
          formName: this.setup.formName,
          logo: JSON.stringify(this.setup.logo),
          settings: JSON.stringify(this.setup.settings),
          groupId: this.setup.groupId,
          formItems: JSON.stringify(this.setup.formItems),
          process: JSON.stringify(this.setup.process),
          remark: this.setup.remark
        }
        if (this.isNew || this.$isEmpty(this.setup.formId)){
          createForm(template).then(rsp => {
           this.$message.success("创建表单成功")
            this.$router.push("/formsPanel")
          }).catch(err => {
            this.$message.error(err)
          })
        }else {
          updateFormDetail(template).then(rsp => {
            this.$message.success("更新表单成功")
            this.$router.push("/formsPanel")
          }).catch(err => {
            this.$message.error(err)
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

.layout-body{
  min-width: 980px;
}

</style>

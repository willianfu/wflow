<template>
  <el-container>
    <el-header style="background: white">
      <layout-header @publish="publishProcess"></layout-header>
    </el-header>
    <div class="layout-body">
      <transition name="router-fade" mode="out-in">
        <keep-alive>
          <router-view v-if="!$route.meta.keepAlive"/>
        </keep-alive>
      </transition>
    </div>
  </el-container>

</template>

<script>
import LayoutHeader from './LayoutHeader'
import {getFormDetail, createForm, updateFormDetail} from '@/api/design'

export default {
  name: "FormProcessDesign",
  components: {LayoutHeader},
  data() {
    return {
      isNew: true
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

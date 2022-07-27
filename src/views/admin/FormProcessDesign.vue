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
    <w-dialog :showFooter="false" v-model="validVisible" title="设置项检查">
      <el-steps align-center :active="validStep" finish-status="success">
        <el-step v-for="(step, i) in validOptions" :title="step.title" :key="i"
                 :icon="step.icon" :status="step.status" :description="step.description"/>
      </el-steps>
      <el-result :icon="validIcon" :title="validResult.title" :subTitle="validResult.desc">
        <i slot="icon" style="font-size: 30px" v-if="!validResult.finished" class="el-icon-loading"></i>
        <template slot="extra">
          <el-button type="primary" v-if="validResult.finished" size="medium" @click="doAfter">
            {{ validResult.action }}
          </el-button>
        </template>
      </el-result>
    </w-dialog>
  </el-container>

</template>

<script>
import LayoutHeader from './LayoutHeader'
import {getFormDetail, createForm, updateFormDetail} from '@/api/design'
import FormBaseSetting from '@/views/admin/layout/FormBaseSetting'
import FormDesign from '@/views/admin/layout/FormDesign'
import ProcessDesign from '@/views/admin/layout/ProcessDesign'
import FormProSetting from '@/views/admin/layout/FormProSetting'

export default {
  name: "FormProcessDesign",
  components: {LayoutHeader, FormBaseSetting, FormDesign, ProcessDesign, FormProSetting},
  data() {
    return {
      isNew: true,
      validStep: 0,
      timer: null,
      activeSelect: 'baseSetting',
      validVisible: false,
      validResult: {},
      validOptions: [
        {title: '基础信息', description: '', icon: '', status: ''},
        {title: '审批表单', description: '', icon: '', status: ''},
        {title: '审批流程', description: '', icon: '', status: ''},
        {title: '扩展设置', description: '', icon: '', status: ''}
      ],
      validComponents: ['baseSetting', 'formSetting', 'processDesign', 'proSetting'],
    }
  },
  computed: {
    setup() {
      return this.$store.state.design
    },
    validIcon() {
      if (!this.validResult.finished) {
        return 'el-icon-loading'
      } else if (this.validResult.success) {
        return 'success'
      } else {
        return 'warning'
      }
    }
  },
  created() {
    this.showValiding()
    let formId = this.$route.query.code
    //判断传参，决定是新建还是加载原始数据
    this.loadInitFrom()
    if (!this.$isEmpty(formId)) {
      this.isNew = false
      this.loadFormInfo(formId)
    }
    let group = this.$route.query.group
    this.setup.groupId = this.$isEmpty(group) ? null : parseInt(group)
  },
  beforeDestroy() {
    this.stopTimer()
  },
  methods: {
    loadFormInfo(formId) {
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
    loadInitFrom() {
      this.$store.commit('loadForm', {
        formId: null,
        formName: "未命名表单",
        logo: {
          icon: "el-icon-eleme",
          background: "#1e90ff"
        },
        settings: {
          commiter: [],
          admin: [],
          sign: false,
          notify: {
            types: ["APP"],
            title: "消息通知标题"
          }
        },
        groupId: undefined,
        formItems: [],
        process: {
          id: "root",
          parentId: null,
          type: "ROOT",
          name: "发起人",
          desc: "任何人",
          props: {
            assignedUser: [],
            formPerms: []
          },
          children: {}
        },
        remark: "备注说明"
      })
    },
    validateDesign() {
      this.validVisible = true
      this.validStep = 0
      this.showValiding()
      this.stopTimer()
      this.timer = setInterval(() => {
        let err = ''//this.$refs[this.validComponents[this.validStep]].validate()
        if (!err || err.trim() === '') {
          this.validStep++;
          if (this.validStep >= this.validOptions.length) {
            this.stopTimer()
            this.showValidFinish(true)
          }
        } else {
          this.stopTimer()
          this.validOptions[this.validStep].status = 'error'
          this.showValidFinish(false, err || this.getValidErr())
        }
      }, 300)
    },
    getValidErr() {
      switch (this.validStep) {
        case 0:
          return '请检查基础设置项';
        case 1:
          return '请检查审批表单相关设置'
        case 2:
          return '请检查审批流程，查看对应标注节点错误信息'
        case 3:
          return '请检查扩展设置'
        default:
          return '未知错误'
      }
    },
    showValidFinish(success, err) {
      this.validResult.success = success
      this.validResult.finished = true
      this.validResult.title = success ? '校验完成 😀' : '校验失败 😥'
      this.validResult.desc = success ? '设置项校验成功，是否提交？' : err
      this.validResult.action = success ? '提 交' : '去修改'
    },
    showValiding() {
      this.validResult = {
        finished: false,
        success: false,
        title: '检查中...',
        action: '处理',
        desc: '正在检查设置项'
      }
      this.validStep = 0
      this.validOptions.forEach(op => {
        op.status = ''
        op.icon = ''
        op.description = ''
      })
    },
    doAfter() {
      if (this.validResult.success) {
        this.doPublish()
      } else {
        this.activeSelect = this.validComponents[this.validStep]
        this.validVisible = false
      }
    },
    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer)
      }
    },
    preview() {
      this.validateDesign()
    },
    publishProcess() {
      this.validateDesign()
    },
    doPublish() {
      this.$confirm('如果您只想预览请选择预览，确认发布后流程立即生效，是否继续?', '提示', {
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
        if (this.isNew || this.$isEmpty(this.setup.formId)) {
          createForm(template).then(rsp => {
            this.$message.success("创建表单成功")
            this.$router.push("/formsPanel")
          }).catch(err => {
            this.$message.error(err)
          })
        } else {
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

.layout-body {
  min-width: 980px;
}

/deep/ .el-step {
  .is-success {
    color: #2a99ff;
    border-color: #2a99ff;
  }
}
</style>

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
var process = {
  type: 'root',
  name: '发起人',
  id: '787489674',
  props:{
    approval:{
      //审批人选项类型
      type:'0',
      //审批模式 会签/或签/依次
      mode:'and',
      //审批时限
      timeLimitType:'hour',
      timeLimitVal: 0,
      timeoutEvent:{
        event:'pass',
        loop: false,
        loopTime: 0
      },
      sign: false,
      //如果审批人为空该如何做
      userEmpty: 'toAdmin',
      //主管级别
      leaderLevel: 1,
      //结束条件
      endCondition: 'top',
      user:{
        users:[],
        select:'one',
        moreLeader:'',
        leader: 1,
        role:'',
        self:'',
      },
    }
  }
}


export default new Vuex.Store({
  state: {
    selectedNode:{},
    template:{
      baseSetup:{
        icon:'el-icon-s-custom',
        background:'#718dff',
        name:'新的审批',
        group: null,
        remark:'',
        sign: false,
        whoCommit:{
          names:[],
          values:[]
        },
        whoEdit:{
          names:[],
          values:[]
        },
        whoExport:[],
        notify:{
          types:[],
          title:''
        }
      },
      //表单设计
      form: [],
      //流程设计
      /* process: {
         name: '发起人',
         type: 'root'
       }*/
      process: process
    }

  },
  mutations: {
    setwhoCommit(state, val){
      state.template.baseSetup.whoCommit = val
    },
    setwhoEdit(state, val){
      state.template.baseSetup.whoEdit = val
    },
    setwhoExport(state, val){
      state.template.baseSetup.whoExport = val
    },
    setTemplate(state, val){
      state.template = val
    },
    clearTemplate(state){
      state.template = {}
    },
    selectedNode(state, val){
      state.selectedNode = val
    },
    selectedApprover(state, val){
      state.selectedNode.props.approval.user.users = val
    },
    setCondition(state, val){
      state.selectedNode.condition = val
    },
    setConditionRootUser(state, val){
      state.selectedNode.condition = val
    },
  },
  getters:{
  },
  actions: {
  },
  modules: {
  }
})

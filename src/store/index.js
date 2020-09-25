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
      type:'1',
      //审批模式 会签/或签/依次
      mode:'and',
      userEmpty: 'toAdmin',
      leaderLevel: 1,
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
        whoCommit:{
          names:[],
          values:[]
        },
        whoEdit:{
          names:[],
          values:[]
        },
        whoExport:[]
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
  },
  getters:{
  },
  actions: {
  },
  modules: {
  }
})

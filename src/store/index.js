import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
var process = {
  type: 'root',
  name: '发起人',
  id: '787489674',
  props:{
    approver: []
  },
  node: {
    type: 'sp',
    id: '45864864',
    name: '审批人',
    node: {
      conditions: [
        {
          condition: [
            {
              name: "条件1"
            }
          ],
          id: '5645455',
          name: "条件1",
          node: {
            name: '审批人',
            id: '896789',
            type: 'sp',
          }
        }, {
          condition: [
            {
              name: "条件2"
            }
          ],
          id: '49689778',
          name: "条件2",
          node: {
            name: '审批人',
            id: '4586786',
            type: 'sp',
          }
        }
      ],
      id: '5645645',
      type: 'condition',
      node: {
        type: 'empty',
        node: {
          name: '抄送人',
          id: '54874878',
          type: 'cs',
        }
      }
    }
  }
}


export default new Vuex.Store({
  state: {
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
    }
  },
  getters:{
  },
  actions: {
  },
  modules: {
  }
})

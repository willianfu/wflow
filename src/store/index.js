import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
var process = {
  type: 'root',
  name: '发起人',
  id: 1,
  node: {
    type: 'sp',
    id: 2,
    name: '审批人',
    node: {
      conditions: [
        {
          condition: [
            {
              name: "条件1"
            }
          ],
          name: "条件1",
          node: {
            name: '审批人',
            id: 3,
            type: 'sp',
          }
        }, {
          condition: [
            {
              name: "条件2"
            }
          ],
          name: "条件2",
          node: {
            name: '审批人',
            id: 4,
            type: 'sp',
          }
        }
      ],
      type: 'condition',
      node: {
        type: 'empty',
        node: {
          name: '抄送人',
          id: 4,
          type: 'cs',
        }
      }
    }
  }
}


export default new Vuex.Store({
  state: {
    baseSetup:{
      icon:'el-icon-s-custom',
      background:'#718dff',
      name:'新的审批',
      group:'',
      remark:'',
      whoCommit:'',
      whoEdit:'',
      whoViewData:''
    },
    //表单设计
    form: [],
    //流程设计
   /* process: {
      name: '发起人',
      type: 'root'
    }*/
    process: process
  },
  mutations: {
    setUser(state, user){
      state.user = user
    },
  },
  getters:{
  },
  actions: {
  },
  modules: {
  }
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    nodeMap: new Map(),
    isEdit: null,
    selectedNode: {},
    design:{
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
      group: 0,
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
    },
  },
  mutations: {
    selectedNode(state, val) {
      state.selectedNode = val
    },
    setIsEdit(state, val){
      state.isEdit = val
    }
  },
  getters: {},
  actions: {},
  modules: {}
})

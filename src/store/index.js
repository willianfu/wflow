import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    nodeMap: new Map(),
    isEdit: null,
    selectedNode: {},
    design:{
      formItems:[],
      process:{
        //节点ID，当前流程内唯一，由前端随机生成
        id: "root",
        parentId: "7d89sf7d8sasf", //父级节点ID，用来向上搜索
        //节点类型，ROOT(发起人，根节点)、APPROVAL(审批)、CC(抄送)、CONDITION(条件)、CONCURRENT（并行节点）、DELAY(延时节点)、EMPTY(空节点，占位)
        type:"ROOT",
        name: "发起人",
        props:{
          assignedUser:[]
        }, //节点属性，见下方props说明
        children: {}, //子节点项，内部字段与当前结构相同，为条件/并行 节点的组合末端节点
      }
    },
  },
  mutations: {
    selectedNode(state, val) {
      state.selectedNode = val
    },
    loadForm(state, val){
      state.design = val
    },
    setIsEdit(state, val){
      state.isEdit = val
    }
  },
  getters: {},
  actions: {},
  modules: {}
})

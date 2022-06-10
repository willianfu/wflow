import Vue from 'vue'
import Vuex from 'vuex'
import {nodeType, getDefaultNodeProps} from '@/components/common/enumConst'

Vue.use(Vuex)

const process = {
  type: nodeType.ROOT,
  name: '发起人',
  id: '10000',
  props: getDefaultNodeProps()
}

export default new Vuex.Store({
  state: {
    nodeMap: new Map(),
    isEdit: null,
    selectedNode: {name:'', type:''},
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
          assignedUser: []
        },
        children: {}
      },
      remark: "备注说明"
    },
    template: {
      baseSetup: {
        icon: 'el-icon-s-custom',
        background: '#718dff',
        name: '新的审批',
        group: null,
        remark: '',
        sign: false,
        whoCommit: {
          names: [],
          values: []
        },
        whoEdit: {
          names: [],
          values: []
        },
        whoExport: [],
        notify: {
          types: [],
          title: ''
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
    setTemplate(state, val) {
      state.template = val
    },
    clearTemplate(state) {
      state.template = {}
    },
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

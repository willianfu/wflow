import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //表单设计
    form: [],
    //流程设计
    process: {
      name: '发起人',
      type: 'root'
    }
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

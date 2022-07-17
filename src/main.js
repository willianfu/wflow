import Vue from 'vue'
import App from './App.vue'
import store from './store'

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "@/assets/theme.less";
import "@/assets/global.css";
import Ellipsis from '@/views/common/Ellipsis'

Vue.use(ElementUI);
Vue.use(Ellipsis);

Vue.config.productionTip = false

Vue.prototype.$isNotEmpty = function(obj){
  return (obj !== undefined && obj !== null && obj !== '' && obj !== 'null')
}

Vue.prototype.$isEmpty = val => {
  return !val || val === '' || val === 'undefined' || val === 'null'
}

Vue.prototype.$getDefalut = function(obj, key, df){
  return (obj === undefined || key === undefined || !this.$isNotEmpty(obj[key])) ? df : obj[key];
}

Vue.prototype.$deepCopy = function (obj){return JSON.parse(JSON.stringify(obj))}

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

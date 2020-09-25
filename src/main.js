import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from './store'

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

Vue.config.productionTip = false

Vue.prototype.$isNotEmpty = function(obj){
  return (obj !== undefined && obj !== null && obj !== '' && obj !== 'null')
}

Vue.prototype.$getDefalut = function(obj, key, df){
  return (obj === undefined || key === undefined || !this.$isNotEmpty(obj[key])) ? df : obj[key];
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

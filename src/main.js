import Vue from 'vue'
import App from './App.vue'

import router from '@/router'

import TypeNav from "@/components/TypeNav";
import Carsousle from "@/components/Carsousle";
import Pagination from "@/components/Pagination"
import store from "@/store";

// 引入mock文件
import '@/mock/mockServer'
// 轮播图样式
import 'swiper/css/swiper.css'

Vue.config.productionTip = false

// 注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carsousle.name, Carsousle)
Vue.component(Pagination.name, Pagination)

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
  // 注册仓库, 组件实例上会多出$store属性
  store
}).$mount('#app')

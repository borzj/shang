import Vue from 'vue'
import App from './App.vue'

import router from '@/router'

import {Button, MessageBox} from 'element-ui'

import VeeValidate from "vee-validate";
import TypeNav from "@/components/TypeNav";
import Carsousle from "@/components/Carsousle";
import Pagination from "@/components/Pagination"
import store from "@/store";

// 引入mock文件
import '@/mock/mockServer'
// 轮播图样式
import 'swiper/css/swiper.css'

import * as API from '@/api'

Vue.config.productionTip = false

// 注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carsousle.name, Carsousle)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button);

Vue.use(VeeValidate)

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
  },
  router,
  // 注册仓库, 组件实例上会多出$store属性
  store
}).$mount('#app')

import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from "@/router/routes";


// 使用路由插件
Vue.use(VueRouter)

// 重写push
const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, reslve, reject) {
    if (reslve && reject) {
        originPush.call(this, location, reslve, reject)
    } else{
        originPush.call(this, location, ()=>{}, ()=>{})
    }
};

export default new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})

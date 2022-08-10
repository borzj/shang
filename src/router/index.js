import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from "@/router/routes";
import store from "@/store";
import user from "@/store/user";


// 使用路由插件
Vue.use(VueRouter)

// 重写push
const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, reslve, reject) {
    if (reslve && reject) {
        originPush.call(this, location, reslve, reject)
    } else {
        originPush.call(this, location, () => {
        }, () => {
        })
    }
};

const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return {y: 0}
    },
})

// 全局前置守卫 (在路由跳转之前判断)
router.beforeEach(async (to, from, next) => {
    // to: 获取将要跳转到的路由的信息
    // from: 从哪个路由来
    // next: 放行函数
    console.log(store)
    const {token, userInfo} = store.state.user
    // 已经登录
    if (token) {
        if (to.path === '/login') {
            return next('/')
        }
        if (!userInfo.name) {
            try {
                await store.dispatch('getUserInfo');
            } catch (err){
                // token失效, 退出并重新登录
                await store.dispatch('logout')
                return next('/login')
            }
        }
        return next()
    }

    // 未登录
    next();
})

export default router

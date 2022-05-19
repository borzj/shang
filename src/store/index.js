import Vue from "vue";
import Vuex from 'vuex'

import home from '@/store/home'
import search from '@/store/search'
import detail from "@/store/detail";

// 使用插件
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        home,
        search,
        detail
    }
})
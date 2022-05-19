/**
 * search模块的小仓库
 */
import {reqSearchInfo} from '@/api'

const state = {
    searchInfo : {}
}

const actions = {
    async getSearchInfo({commit}, params = {}) {
        const res = await reqSearchInfo(params)
        if (res.code === 200) {
            commit('SEARCH_INFO', res.data)
        }
    }
}

const mutations = {
    SEARCH_INFO(state, searchInfo) {
        state.searchInfo = searchInfo
    }
}

const getters = {
    attrsList(state){
        return state.searchInfo.attrsList
    },
    goodsList(state){
        return state.searchInfo.goodsList || []
    },
    trademarkList(state){
        return state.searchInfo.trademarkList
    },
    total(state) {
        return state.searchInfo.total
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}

import {reqGoodsDetail} from '@/api'

const state = {
    goodInfo: {}
}

const actions = {
    async getGoodsInfo({commit}, id) {
        const res = await reqGoodsDetail(id)
        if (res.code === 200) {
            commit('GOODS_INFO', res.data)
        }
    }
}

const mutations = {
    GOODS_INFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}

const getters = {
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}

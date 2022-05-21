import {reqGoodsDetail, reqAddShoppingCar} from '@/api'

const state = {
    goodInfo: {}
}

const actions = {
    async getGoodsInfo({commit}, id) {
        const res = await reqGoodsDetail(id)
        if (res.code === 200) {
            commit('GOODS_INFO', res.data)
        }
    },

    async addOrUpdateShoppingCar({commit}, {skuId, skuNum}) {
        const res = await reqAddShoppingCar(skuId, skuNum);
        console.log(res)
        // if (res.code !== 200) {
        //     return Promise.reject(Error('添加购物车失败'))
        // }
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

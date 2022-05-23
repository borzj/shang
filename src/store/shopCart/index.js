import {reqGetShopCartList} from '@/api'

const state = {
    shopCartList: []
};

const actions = {
    async getShopCartList({commit}) {
        const res = await reqGetShopCartList();
        console.log(res)
        if (res.code === 200) {
            commit('SHOP_CART_LIST', res.data[0].cartInfoList)
        }
    }
};

const mutations = {
    SHOP_CART_LIST(state, shopCartList) {
        state.shopCartList = shopCartList
    }
};

const getters = {};

export default {
    state,
    actions,
    mutations,
    getters
}


import {reqGetShopCartList, reqDeleteShopInCart, reqCheckCart} from '@/api'

const state = {
    shopCartList: []
};

const actions = {
    async getShopCartList({commit}) {
        const res = await reqGetShopCartList();
        if (res.code === 200) {
            commit('SHOP_CART_LIST', res.data[0].cartInfoList)
        }
    },

    async deleteShopInCart({commit}, skuId) {
        const response = await reqDeleteShopInCart(skuId);
        if (response.code !== 200) {
            throw Error('删除失败')
        }
    },

    async checkCart({commit}, {skuId, isChecked}) {
        const res = await reqCheckCart(skuId, isChecked);
        if (res.code !== 200) {
            throw Error('勾选失败')
        }
    },

    deleteChecked(ctx){
        const {shopCartList} = ctx.state
        const promiseAll = []
        for (const {isChecked, skuId} of shopCartList) {
            if (isChecked) {
                promiseAll.push(ctx.dispatch('deleteShopInCart', skuId))
            }
        }
        return Promise.all(promiseAll)
    },

    async allCheck(ctx, {needChangShopSkuIds, isChecked}) {
        return Promise.all(needChangShopSkuIds.map(skuId => ctx.dispatch('checkCart', {skuId, isChecked: Number(isChecked)})))
    },
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


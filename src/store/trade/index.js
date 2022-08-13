import {reqUserAddress, reqTradeInfo} from '@/api'

const state = {
    addresses: [],
    tradeInfo: {}
}

const actions = {

    async getUserAddress({commit}) {
        const res = await reqUserAddress()
        if (res.code === 200) {
            commit('USER_ADDRESS', res.data)
        }
    },

    async getTradeInfo({commit}) {
        const res = await reqTradeInfo();
        if (res.code === 200) {
            commit('TRADE_INFO', res.data)
        }
    },

}

const mutations = {
    USER_ADDRESS(state, addresses) {
        state.addresses = addresses
    },
    TRADE_INFO(state, tradeInfo) {
        state.tradeInfo = tradeInfo
    },
}

const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}
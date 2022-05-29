import {reqGetCode} from '@/api'

const state = {
    code: ''
};

const actions = {
    async getCode({commit}, phone) {
        const res = await reqGetCode(phone);
        if (res.code === 200) {
            commit('CODE', res.data)
        }
    }
}

const mutations = {
    CODE(state, code) {
        state.code = code
    }
}

const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}

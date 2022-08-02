import {reqGetCode, reqRegister} from '@/api'

const state = {
    code: ''
};

const actions = {
    async getCode({commit}, phone) {
        const res = await reqGetCode(phone);
        if (res.code === 200) {
            commit('CODE', res.data)
        }
    },

    async register({commit}, data) {

        const res = await reqRegister(data);
        if (res.code !== 200) {
            return Promise.reject(res.message)
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

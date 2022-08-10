import {reqGetCode, reqRegister, reqLogin, getUserInfo, logout} from '@/api'
import {setTokenToLocalStorage, getTokenFromLocalStorage, removeTokenFromLocalStorage} from "@/utiles/token";

const state = {
    code: '',
    token: getTokenFromLocalStorage(),
    userInfo: {}
};

const actions = {
    async logout({commit}) {
        const res = await logout();
        if (res.code === 200) {
            commit('CLEAR_USER_INFO');
        } else {
            return Promise.reject(Error('退出失败'))
        }
    },

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
    },

    async login({commit}, data) {
        const res = await reqLogin(data);
        if (res.code === 200) {
            commit('SAVE_TOKNE', res.data.token);
            setTokenToLocalStorage(res.data.token)
        } else {
            return Promise.reject(Error('登录失败'))
        }
    },

    async getUserInfo({commit}) {
        const res = await getUserInfo()
        if (res.code === 200) {
            commit('SAVE_USER_INFO', res.data);
        }
    }
}

const mutations = {
    // 清空用户数据
    CLEAR_USER_INFO(state) {
        state.userInfo = {}
        state.token = ''
        removeTokenFromLocalStorage()
    },

    CODE(state, code) {
        state.code = code
    },
    SAVE_TOKNE(state, token) {
        state.token = token
    },
    SAVE_USER_INFO(state, userInfo) {
        console.log(userInfo)
        state.userInfo = userInfo
    }
}

const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}

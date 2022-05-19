import { reqCategoryList, reqContainerList, reqFloorList } from '@/api'

const state = {
    categoryList: [],
    containerList: [],
    floorList: []
}

const actions = {
    async getCategoryList({ commit }) {
        const res = await reqCategoryList()
        if (res.code === 200) {
            commit('CATEGORY_LIST', res.data)
        }
    },

    async getContainerList({ commit }) {
        const res = await reqContainerList()
        if (res.code === 200) {
            commit('CONTAINER_LIST', res.data)
        }
    },

    async getFloorList({ commit }) {
        const res = await reqFloorList()
        if (res.code === 200) {
            commit('FLOOR_LIST', res.data)
        }
    }
}

const mutations = {
    CATEGORY_LIST(state, categoryList) {
        state.categoryList = categoryList
    },
    CONTAINER_LIST(state, containerList) {
        state.containerList = containerList
    },
    FLOOR_LIST(state, floorList) {
        state.floorList = floorList
    }
}

const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}

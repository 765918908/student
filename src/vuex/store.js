import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    subject_code: 'a0'
}

// 定义所需的 mutations
const mutations = {
    setSubject(state, obj) {
        state.subject_code = obj.subject_code;
        state.subject_name = obj.subject_name;
    }
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})
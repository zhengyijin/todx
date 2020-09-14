import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        showLoading: false
    },
    mutations: {
        updateLoading(state, showLoading) {
            state.showLoading = showLoading
        }
    }
})
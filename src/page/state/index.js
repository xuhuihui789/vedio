import Vue from 'vue'
import "babel-polyfill"
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
    chartBoolean:false,//聊天工具
    langFlag:false,//yuyan
};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})

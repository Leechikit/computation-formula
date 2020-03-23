import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    triggerMap: {},
    functionMap: {}
  },
  mutations: {
    addTriggerMap(state, { currentControlkey, functionControlkeys = [] }) {
      functionControlkeys.forEach(controlkey => {
        if (!state.triggerMap[controlkey]) {
          state.triggerMap[controlkey] = new Set()
        }
        state.triggerMap[controlkey].add(currentControlkey)
      })
    },
    addFunctionMap(state, { triggerControlkey, functionStr }) {
      state.functionMap[triggerControlkey] = functionStr
    },
    emptyTriggerMap(state) {
      state.triggerMap = {}
    },
    emptyFunctionMap(state) {
      state.functionMap = {}
    }
  },
  actions: {},
  modules: {}
})

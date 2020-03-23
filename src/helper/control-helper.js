import store from '@/store'

let controlList = {
  F000001: {
    getValue() {
      return '20'
    }
  },
  F000002: {
    getValue() {
      return '30'
    }
  },
  F000003: {
    getValue() {
      return '4'
    }
  }
}

export function init() {
  store.commit('emptyTriggerMap')
  store.commit('emptyFunctionMap')
  let info = {
    F000001: '{F000002}*2+{F000003}',
    F000002: '{F000003}+10'
  }
  for (let controlkey in info) {
    let functionStr = info[controlkey] || ''
    let functionControlkeys = parseFunctionControlkeys(functionStr)
    store.commit('addTriggerMap', {
      currentControlkey: controlkey,
      functionControlkeys
    })
    store.commit('addFunctionMap', {
      triggerControlkey: controlkey,
      functionStr
    })
  }
}

export function trigger(controlkey) {
  let triggerControlkeys = store.state.triggerMap[controlkey] || []
  triggerControlkeys.forEach(controlkey => {
    let functionStr = store.state.functionMap[controlkey]
    console.log(getComputationValue(functionStr))
  })
}

function getComputationValue(functionStr) {
  let functionTemp = functionStr.replace(/{(\w+)}/g, (match, controlkey) => {
    return controlList[controlkey].getValue()
  })
  let fn = new Function(
    '',
    `if(${functionTemp}!==null&&${functionTemp}!==undefined){ return ${functionTemp}}`
  )
  return fn()
}

function parseFunctionControlkeys(functionStr) {
  let functionControlkeys = []
  functionStr.replace(/{(\w+)}/g, (match, controlkey) => {
    functionControlkeys.push(controlkey)
  })
  return functionControlkeys
}

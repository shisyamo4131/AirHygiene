import { collection, onSnapshot } from 'firebase/firestore'

export const state = () => ({
  items: [],
  listener: null,
})

export const getters = {
  get: (state) => (docId) => {
    const result = state.items.find((item) => item.docId === docId)
    return result || {}
  },
  sorted(state) {
    const result = state.items.map((item) => item)
    result.sort((a, b) => {
      if (a.code < b.code) return -1
      if (a.code > b.code) return 1
      return 0
    })
    return result
  },
}

export const mutations = {
  setItem(state, item) {
    const index = state.items.findIndex(({ docId }) => docId === item.docId)
    if (index === -1) state.items.push(item)
    if (index !== -1) state.items.splice(index, 1, item)
  },
  removeItem(state, item) {
    const index = state.items.findIndex(({ docId }) => docId === item.docId)
    if (index !== -1) state.items.splice(index, 1)
  },
  setListener(state, listener) {
    state.listener = listener
  },
  removeListener(state) {
    if (state.listener) state.listener()
    state.listener = null
    state.items.splice(0)
  },
}

export const actions = {
  subscribe({ commit }) {
    const colRef = collection(this.$firestore, 'Units')
    const listener = onSnapshot(colRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') commit('setItem', change.doc.data())
        if (change.type === 'modified') commit('setItem', change.doc.data())
        if (change.type === 'removed') commit('removeItem', change.doc.data())
      })
    })
    commit('setListener', listener)
    // eslint-disable-next-line
    console.info('[VUEX-INFO] Subscription of Units has been started.')
  },
  unsubscribe({ commit }) {
    commit('removeListener')
    // eslint-disable-next-line
    console.info('[VUEX-INFO] Subscription of Units has been unsubscribed.')
  },
}

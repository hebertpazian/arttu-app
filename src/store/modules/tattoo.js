import firebase from '@/firebase'

const db = firebase.firestore()
const storage = firebase.storage()

const state = {
  tattoos: []
}

const getters = {}

const mutations = {
  SET_TATTOOS: (state, tattoos) => (state.tattoos = tattoos),
  REMOVE_TATTOO: (state, tattooId) =>
    (state.tattoos = state.tattoos.filter((item) => item.id !== tattooId))
}

const actions = {
  removeTattoo: ({ commit }, tattooId) => commit('REMOVE_TATTOO', tattooId),
  uploadTattoo: (store, tattoo) => {
    return new Promise((resolve, reject) => {
      const storageRef = storage.ref(`tattoos/${tattoo.source.name}`)
      const uploadTask = storageRef.put(tattoo.source)

      uploadTask.on('state_changed', {
        next: () => {},
        error: (err) => setTimeout(() => alert(err.message || err), 500),
        complete: async () => {
          let source = await uploadTask.snapshot.ref.getDownloadURL()
          db.collection('tattoos')
            .add({
              title: tattoo.title,
              source: source.split('&token')[0],
              created_at: new Date()
            })
            .then(() => {
              setTimeout(() => alert('tattoo adicionada!'), 1000)
              resolve()
            })
            .catch((err) => {
              setTimeout(() => alert(err.message || err), 500)
              reject(err)
            })
        }
      })
    })
  },
  bindTattoos: ({ commit }) =>
    db
      .collection('tattoos')
      .orderBy('created_at')
      .get()
      .then((res) => res.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      .then((data) => commit('SET_TATTOOS', data))
      .catch((err) => setTimeout(() => alert(err.message || err), 500))
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

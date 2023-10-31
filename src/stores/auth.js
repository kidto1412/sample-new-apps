// import axios from "axios";
export default {
  namespaced: true,
  state: {
    user: {},
    apiKey: null,
  },

  mutations: {
    set: (state, payload) => {
      state.user = payload;
    },
    setToken: (state, data) => {
      state.apiKey = data;
    },
  },
  actions: {
    //   set data user yang login pada state user
    set: ({ commit }, payload) => {
      commit("set", payload);
    },
    setToken: ({ commit }, payload) => {
      commit("setToken", payload);
    },
    fetchApiKey: ({ commit }) => {
      commit("setToken", localStorage.getItem("apiKey"));
    },
  },

  getters: {
    // getters user untuk mendapatkan data user pada state serta getters guest akan mengecek apakah ada data user atau tidak,  jika tidak berarti user tersebut belum login alias tamu.

    user: (state) => state.user,
    guest: (state) => Object.keys(state.user).length === 0,
    isLoggedIn: (state) => state.user !== 0,
    apiKey: (state) => state.apiKey,
  },
};

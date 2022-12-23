import Vue from "vue";
import Vuex from "vuex";
import auth from "@/stores/auth";
import alert from "@/stores/alert";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    alert,
  },
});

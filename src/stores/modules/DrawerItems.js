import Vue from 'vue'
import Vuex from 'vuex'
import callService from '../../service';

Vue.use(Vuex)

export const loadDrawerDetails = {
  state: {
    items: []
  },
  getters: {
    getDrawerItems(state) {
      return state.items;
    }
  },
  actions: {
    fetchDrawerItems: ({
      commit
    }, url) => {
      return new Promise((resolve, reject) => {
        callService(url)
          .then((response) => {
            resolve(response);
            commit('fetchDrawerItems', response.data.items);
          }).catch((error) => {
            reject(error);
          })
      })
    }
  },
  mutations: {
    fetchDrawerItems: (state, response) => {
      state.items = response;
    }
  }
}

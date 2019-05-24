import Vue from 'vue'
import Vuex from 'vuex'
import callService from '../../service';

Vue.use(Vuex)

export const loadDuplicateTableDetails = {
  state: {
    headers: [],
    tableItems: []
  },
  getters: {
    addHeadersToDuplicateTable(state) {
      return state.headers;
    },
    addItemsToDuplicateTable(state) {
      return state.tableItems;
    }
  },
  actions: {
    fetchDuplicateTableItems({
      commit
    }, url) {
      return new Promise((resolve, reject) => {
        callService(url).then((response) => {
          resolve(response);
          commit('fetchDuplicateTableItems', response);
        }).catch((error) => {
          reject(error);
        })
      })
    }
  },
  mutations: {
    fetchDuplicateTableItems(state, response) {
      state.headers = response.data.headers;
      state.tableItems = response.data.tableItems;
    }
  }
}

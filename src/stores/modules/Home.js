import Vue from 'vue'
import Vuex from 'vuex'
import callService from '../../service';

Vue.use(Vuex)

export const loadTableItems = {
  state: {
    headers: [],
    tableItems: []
  },
  getters: {
    addHeadersToTable(state) {
      return state.headers;
    },
    addItemsToTable(state) {
      return state.tableItems;
    },
    getMultipleSelects: state => {
      return state.selectedItems;
    },
  },
  actions: {
    fetchTableItems({
      commit
    }, url) {
      return new Promise((resolve, reject) => {
        callService(url).then((response) => {
          resolve(response);
          commit('fetchTableItems', response);
        }).catch((error) => {
          reject(error);
        })
      })
    },
    addMultipleSelects({
      commit
    }, selectedItems) {
      commit('addMultipleSelects', selectedItems);
    }
  },
  mutations: {
    fetchTableItems(state, response) {
      state.headers = response.data.headers;
      state.tableItems = response.data.tableItems;
    },
    addMultipleSelects(state, response) {
      state.selectedItems = response;
    }
  }
}

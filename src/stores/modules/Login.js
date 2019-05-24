import Vue from 'vue'
import Vuex from 'vuex'
import callService from '../../service';

Vue.use(Vuex)

export const loadUserDetails = {
  state: {
    user: []
  },
  getters: {
    getLoginUser(state) {
      return state.user;
    },
    getCurrentUserData(state) {
      return state.currentUserData;
    }
  },
  actions: {
    loginUser: ({
      commit
    }, url) => {
      return new Promise((resolve, reject) => {
        callService(url)
          .then((response) => {
            resolve(response);
            commit('loginUser', response.data.user);
          }).catch((error) => {
            reject(error);
          })
      })
    },
    setCurrentUser({
      commit,
      state
    }, currentUser) {
      let currentUserData = state.user.find(element => {
        return element.userId === currentUser;
      });
      commit('setCurrentUser', currentUserData);
    }
  },
  mutations: {
    loginUser: (state, response) => {
      state.user = response;
    },
    setCurrentUser: (state, response) => {
      state.currentUserData = response;
    }
  }
}

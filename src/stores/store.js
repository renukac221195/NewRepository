import Vue from 'vue'
import Vuex from 'vuex'
import { loadUserDetails } from './modules/Login'
import { loadDrawerDetails } from './modules/DrawerItems'
import { loadTableItems } from './modules/Home'
import { loadDuplicateTableDetails } from './modules/Duplicates'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        loadUserDetails,
        loadDrawerDetails,
        loadTableItems,
        loadDuplicateTableDetails
    }
})
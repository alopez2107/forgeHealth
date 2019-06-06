import Vuex from 'vuex';
import Vue from 'vue';
import idm from './modules/idm';
import commons from './modules/commons';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        idm,
        commons
    }
});
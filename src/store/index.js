import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: { user: user },
  strict: debug,
  state: {
    loadingCount: 0
  },
  mutations: {
    loading (state) {
      state.loadingCount++;
      console.log('Loading Add', state.loadingCount);
    },
    endLoading (state) {
      if(state.loadingCount > 0) {
        state.loadingCount--;
      }
      console.log('Loading Remove', state.loadingCount);
    }
  },
})

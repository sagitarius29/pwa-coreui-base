import router from "../../router";
import api from '@/services/api';

const defaultUser = {
  first_name: '',
  is_super_admin: false
};

const defaultState = () => {
  return {
    user: JSON.parse(localStorage.getItem('user')) || defaultUser,
    token: localStorage.getItem('token') || '',
    permissions: JSON.parse(localStorage.getItem('permissions')) || [],
  };
};

export default {
  namespaced: true,
  state: defaultState(),
  getters: {
    getUser: state => state.user,
    getToken: state => state.token,
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    permissions: state => state.permissions,
    isSuperAdmin: state => state.user.is_super_admin,
    userCan: (state, getters) => permission => {
      if(getters.isSuperAdmin) {
        return true;
      }
      return state.permissions.includes(permission);
    }
  },
  actions: {
    login({commit, dispatch}, data) {
      return api.post('login', data).then((r) => {
        commit('setToken', r.data.token);
        commit('setUser', r.data.user);
        commit('setPermissions', r.data.permissions);
        router.push('/monitor-dashboard');
      });
    },
    logout({ commit }) {
      api.post('logout', null, {
        headers: {
          Authorization: "Bearer " + this.getters['user/getToken']
        }
      });
      commit('resetState');
      router.push('/login');
    },
    resetState({ commit }) {
      commit('resetState');
    },
  },
  mutations: {
    setUser(state, user) {
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    setToken(state, token) {
      localStorage.setItem('token', token);
      state.token = token;
    },
    setPermissions(state, permissions) {
      localStorage.setItem('permissions', JSON.stringify(permissions));
      state.permissions = permissions;
    },
    resetState(state) {
      localStorage.removeItem('token');
      Object.assign(state, defaultState())
    }
  }
}

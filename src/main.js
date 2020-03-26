// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import store from './store'
import api from './services/api'
import './registerServiceWorker'

require('./defaultComponents');

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

window.Swal = require('sweetalert2');
window.moment = require('moment');

const Toast = window.Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 4000
});

window.$ = window.jQuery = require('jquery');

window.api = api;
window._ = require('lodash');

require('./helpers');
require('bootstrap');

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  store,
  components: {
    App
  }
});

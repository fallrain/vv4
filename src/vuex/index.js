import Vue from 'vue';
import Vuex from 'vuex';

import coreSync from './core';
import vipCenterSync from './vipcenter';

Vue.use(Vuex);

const synCenter = Object.assign(coreSync, vipCenterSync);

// console.log(synCenter);
const store = new Vuex.Store({
  modules: synCenter
});

export default store;

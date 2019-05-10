import Vue from 'vue';

const state = {
  userinfo: {}, // 基本信息
  systemMenu: {}, // 菜单
  jurisdictionList: [], // 权限
  isloading: false,
  returnStatus: false,
  bbsuserinfo: {} // 社区用户信息
};

const mutations = {
  setUserInfo(state, data) {
    for (const i in data.menuList) {
      data.menuList[i].isMouse = false;
      data.menuList[i].isNone = true;
      data.menuList[i].isLength = false;
      for (const j in data.menuList[i].children) {
        data.menuList[i].children[j].isHover = false;
      }
    }
    state.userinfo = data.user;
    state.systemMenu = data.menuList;
    // state.jurisdiction = data.oprKeyList;
    if (!data.isAdmin) {
      var o = {};
      for (const i in data.oprKeyList) {
        o[i] = true;
      }
      state.jurisdictionList = o;
      // //console.log("权限:",state.jurisdictionList);
    } else {
      var o = [];
      o.isAdmin = true;
      state.jurisdictionList = o;
    }
  },
  setLoading(state, data) {
    state.isloading = data;
  },
  setReturnStatus(state, data) {
    state.returnStatus = data;
  },
  removeUserInfo(state, data) {
    state.userinfo = {};
    state.systemMenu = {};
  },
  setBBSuserInfo(state, data) {
    state.bbsuserinfo = data;
  }
};

const actions = {
  setUserInfo(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setUserInfo', param);
      resolve('ok');
    }));
  },
  setLoading(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setLoading', param);
      resolve('ok');
    }));
  },
  setReturnStatus(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setReturnStatus', param);
      resolve('ok');
    }));
  },
  removeUserInfo(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('removeUserInfo', param);
      resolve('ok');
    }));
  },
  setBBSuserInfo(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setBBSuserInfo', param);
      resolve('ok');
    }));
  }
};
const getters = {
  getUserInfo(state) {
    return state.userinfo;
  },
  getBBSuserInfo(state) {
    return state.bbsuserinfo;
  },
  getSystemMenu(state) {
    return state.systemMenu;
  },
  getLoading(state) {
    return state.isloading;
  },
  returnStatus(state) {
    return state.returnStatus;
  },
  jurisdiction(state) {
    return state.jurisdictionList;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};

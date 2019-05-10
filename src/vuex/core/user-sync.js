import Vue from 'vue';

// 刷新用户列表
const request = {
  requestUserMgrList(pm) {
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/user/list`,
      params: pm
    }).then(
      (data) => {
        const result = data.data;
        if (result.isSuccess) {
          state.user.data = result.data;
        }
      },
      (error) => {
        // console.log(error);
      }
    );
  }
};

const state = {
  user: {
    data: [], // 未格式化默认JSON
    thisTreeObj: {}, // 当前选中树节点
    subUserData: {
      entities: []
    },
    selectMgrObj: '', // 暂存弹窗前被选中对象,move方法用
    checkRadioObj: '', // table tree单选中对象
    // fixObj: "",
    userCheckbox: [],
    thisUserTreeObj: {}, // 添加用户选中的树节点
    userSelectData: [] // 选择后用户
  }
};

const mutations = {
  // 加载用户页面时初始化用户列表
  setUserMgrData(state, data) {
    state.user.data = data;
  },

  setSelectMgrObj(state, data) {
    state.user.selectMgrObj = data;
  }
};

const actions = {
  setUserMgrData(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setUserMgrData', param);
      resolve('ok');
    }));
  },
  setSelectMgrObj(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setSelectMgrObj', param);
      resolve('ok');
    }));
  }
};
const getters = {
  getUserMgrData(state) {
    return state.user.data;
  },

  getSelectMgrObj(state) {
    return state.user.thisTreeObj;
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
  request
};

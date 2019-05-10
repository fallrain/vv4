import Vue from 'vue';

// 刷新树
const request = {
  requestTreeMenu() {
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/menu/queryVisibleMenus`
    }).then(
      (data) => {
        const result = data.data;
        if (result.isSuccess) {
          const all = {
            name: '所有菜单',
            id: 0,
            level: 0,
            hasAuth: true
          };
          result.data.push(all);
          // shown标识
          result.data.map(v => (v.shown = false));
          state.menu.data = result.data;
        }
      },
      (error) => {
        // console.log(error);
      }
    );
  },
  requestMenuTable(params) {
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/menu/pageMenu`,
      params
    }).then(
      (data) => {
        const result = data.data;
        if (result.isSuccess) {
          if (result.data.entities != null) {
            state.menu.subData = result.data;
          } else {
            state.menu.subData = {
              entities: []
            };
          }
        }
      },
      (error) => {
        // console.log(error);
      }
    );
  }
};

const state = {
  menu: {
    data: [
      {
        name: '所有菜单',
        id: 0,
        level: 0,
        hasAuth: true
      }
    ], // 未格式化默认JSON
    thisTreeObj: {}, // 当前选中树节点
    subData: {
      entities: []
    },
    selectObj: '', // 暂存弹窗前被选中对象,move方法用
    checkRadioObj: '', // table tree单选中对象
    fixObj: ''
  }
};

const mutations = {
  // 加载菜单页面时初始化左侧菜单树
  setMenuData(state, data) {
    const all = {
      name: '所有菜单',
      id: 0,
      level: 0,
      hasAuth: true
    };
    data.push(all);
    // shown标识
    data.map(v => (v.shown = false));
    state.menu.data = data;
    // //console.log(JSON.stringify(state.menu.data));
  },
  // 展示某个菜单的子菜单
  treeMenuDataADD(state, data) {
    // 暂存指向
    state.menu.thisTreeObj = data;

    // 集合处理
    const params = {
      parentId: state.menu.thisTreeObj.treeModel.id,
      pageNo: 1,
      pageSize: 10,
      criteria: ''
    };
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/menu/pageMenu`,
      params
    }).then(
      (data) => {
        const result = data.data;
        if (result.isSuccess) {
          if (result.data.entities != null) {
            state.menu.subData = result.data;
          } else {
            state.menu.subData = {
              entities: []
            };
          }
        }
      },
      (error) => {
        // console.log(error);
      }
    );
  },
  setMenuSelectObj(state, data) {
    state.menu.selectObj = data;
  },
  // 菜单移动
  treeMenuDataMOVE(state, data) {
    const thisObj = state.menu.selectObj;
    const toGroup = state.menu.checkRadioObj;
    thisObj.parentId = toGroup.id;
    thisObj.level = toGroup.level + 1;
    const params = thisObj;
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/menu/update`,
      params
    }).then(
      (data) => {
        const result = data.data;
        if (result.isSuccess) {
          const params = {
            parentId: state.menu.thisTreeObj.treeModel.id,
            pageNo: 1,
            pageSize: 10,
            criteria: ''
          };
          request.requestTreeMenu();
          request.requestMenuTable(params);
        }
      },
      (error) => {
        $('body').append(Vue.prototype.gUtils.myAlert(error.data.resultMsg, 'pop'));
        $('.pop').click(() => {
          $('.maskpop').remove();
        });
        // console.log(error.data.resultMsg);
      }
    );
  },
  // 移动组织中的选中对象
  setMenuCheckRadObj(state, data) {
    state.menu.checkRadioObj = data;
  }
};

const actions = {
  setMenuData(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setMenuData', param);
      resolve('ok');
    }));
  },
  setTreeType(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setTreeType', param);
      resolve('ok');
    }));
  },
  treeMenuDataADD(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('treeMenuDataADD', param);
      resolve('ok');
    }));
  },
  setMenuSelectObj(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setMenuSelectObj', param);
      resolve('ok');
    }));
  },
  treeMenuDataMOVE(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('treeMenuDataMOVE', param);
      resolve('ok');
    }));
  },
  setMenuCheckRadObj(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setMenuCheckRadObj', param);
      resolve('ok');
    }));
  }
};
const getters = {
  getMenuData(state) {
    return state.menu.data;
  },
  getSubMenuData(state) {
    return state.menu.subData;
  },
  getMenuSelectObj(state) {
    return state.menu.thisTreeObj;
  },
  getMenuFixObj(state) {
    return state.menu.fixObj;
  },
  getMenuMoveSelect(state) {
    return state.menu.selectObj;
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
  request
};

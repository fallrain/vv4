import Vue from 'vue';

// 刷新树
const request = {
  requestObjectTypeTree() {
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/objectType/hasRightList`
    }).then(
      (data) => {
        const result = data.data;
        if (result.isSuccess) {
          const all = {
            name: '所有对象类型',
            id: 0,
            level: 0,
            hasAuth: true
          };
          result.data.push(all);
          // shown标识
          result.data.map(v => (v.shown = false));
          state.objectType.data = result.data;
        }
      },
      (error) => {
        // console.log(error);
      }
    );
  },
  requestObjectTypeTable(params) {
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/objectType/pageObjectType`,
      params
    }).then(
      (data) => {
        const result = data.data;
        if (result.isSuccess) {
          if (result.data.entities != null) {
            state.objectType.subData = result.data;
          } else {
            state.objectType.subData = {
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
  objectType: {
    data: [], // 未格式化默认JSON
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
  // 加载对象类型管理页面时初始化左侧对象类型树
  setObjectTypeData(state, data) {
    const all = {
      name: '所有对象类型',
      id: 0,
      level: 0,
      hasAuth: true
    };
    data.push(all);
    // shown标识
    data.map(v => (v.shown = false));
    state.objectType.data = data;
  },
  // 展示某个对象类型的子对象类型
  treeObjectTypeDataADD(state, data) {
    // 暂存指向
    state.objectType.thisTreeObj = data;

    // 集合处理
    const params = {
      parentId: state.objectType.thisTreeObj.treeModel.id,
      pageNo: 1,
      pageSize: 10,
      criteria: ''
    };
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/objectType/pageObjectType`,
      params
    }).then(
      (data) => {
        const result = data.data;
        if (result.isSuccess) {
          if (result.data.entities != null) {
            state.objectType.subData = result.data;
          } else {
            state.objectType.subData = {
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
  setObjectTypeSelectObj(state, data) {
    state.objectType.selectObj = data;
  },
  // 对象类型移动
  treeObjectTypeMOVE(state, data) {
    const thisObj = state.objectType.selectObj;
    const toGroup = state.objectType.checkRadioObj;
    thisObj.parentId = toGroup.id;
    thisObj.level = toGroup.level + 1;
    const params = thisObj;
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/objectType/update`,
      params
    }).then(
      (data) => {
        const result = data.data;
        if (result.isSuccess) {
          const params = {
            parentId: state.objectType.thisTreeObj.treeModel.id,
            pageNo: 1,
            pageSize: 10,
            criteria: ''
          };
          request.requestObjectTypeTree();
          request.requestObjectTypeTable(params);
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
  setObjectTypeCheckRadObj(state, data) {
    state.objectType.checkRadioObj = data;
  }
};

const actions = {
  setObjectTypeData(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setObjectTypeData', param);
      resolve('ok');
    }));
  },
  treeObjectTypeDataADD(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('treeObjectTypeDataADD', param);
      resolve('ok');
    }));
  },
  setObjectTypeCheckRadObj(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setObjectTypeCheckRadObj', param);
      resolve('ok');
    }));
  },
  setObjectTypeSelectObj(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setObjectTypeSelectObj', param);
      resolve('ok');
    }));
  },
  treeObjectTypeMOVE(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('treeObjectTypeMOVE', param);
      resolve('ok');
    }));
  }
};
const getters = {
  getObjectType(state) {
    return state.objectType.data;
  },
  getSubObjectType(state) {
    return state.objectType.subData;
  },
  getObjectTypeFixObj(state) {
    return state.objectType.fixObj;
  },
  getObjectTypeSelectObj(state) {
    return state.objectType.thisTreeObj;
  },
  getObMoveSelect(state) {
    return state.objectType.selectObj;
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
  request
};

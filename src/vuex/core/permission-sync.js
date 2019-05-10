import Vue from 'vue';

// 刷新树
const request = {
  requestPermTree(params) {
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/permission/queryCategory`,
      params
    }).then(
      (data) => {
        const result = data.data;
        if (!result.isSuccess) {
          const all = {
            name: '所有权限分类',
            id: 0,
            level: 0,
            hasAuth: true
          };
          if (result != []) {
            result.push(all);
          }
          // shown标识
          result.map(v => (v.shown = false));
          state.perm.data = result;
          // //console.log(state.perm.data);
        }
      },
      (error) => {
        // console.log(error);
      }
    );
  },

  requestPermTable(params) {
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/permission/pagePermissionCategory`,
      params
    }).then(
      (data) => {
        const result = data.data;
        if (result.isSuccess) {
          if (result.data.entities != null) {
            state.perm.subData = result.data;
          } else {
            state.perm.subData = {
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

  requestPermCldTable(params) {
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/permission/pagePermission`,
      params
    }).then(
      (data) => {
        const result = data.data;

        if (result.entities != null) {
          state.perm.subUserData = result;
        } else {
          state.perm.subUserData = {
            entities: []
          };
        }
      },
      (error) => {
        // console.log(error);
      }
    );
  }
};
const state = {
  perm: {
    objectTypeData: [],
    thisObjectType: '',
    data: [], // 未格式化默认JSON
    thisTreeObj: {}, // 当前选中树节点,
    thisObjectTree: {},
    subData: {
      entities: []
    },
    subUserData: {
      entities: []
    },
    treeType: true,
    selectObj: '', // 暂存弹窗前被选中对象,move方法用
    checkRadioObj: '', // table tree单选中对象
    fixObj: '',
    userCheckbox: [],
    thisUserTreeObj: {}, // 添加用户选中的树节点
    userDefaultData: [], // 非当前权限分类所包含的用户
    userSelectData: [], // 选择后用户
    checkPermsRadioObj: '', // 权限table tree单选中对象
    selectPermsObj: {}
  }
};

const mutations = {
  // 存入对象类型树数据
  setPermObjectTypeData(state, data) {
    const all = {
      name: '所有对象类型',
      id: 0,
      level: 0,
      hasAuth: true
    };
    data.push(all);
    // shown标识
    data.map(v => (v.shown = false));
    state.perm.objectTypeData = data;
  },
  // 加载权限分类
  treePermObjectADD(state, data) {
    state.perm.thisObjectTree = data;
    // 集合处理
    const params = {
      objectType: state.perm.thisObjectTree.treeModel.objectType || ''
    };
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/permission/queryCategory`,
      params
    }).then(
      (data) => {
        const result = data.data;
        if (!result.isSuccess) {
          const all = {
            name: '所有权限分类',
            id: 0,
            level: 0,
            objectType: '',
            hasAuth: true
          };
          if (result != []) {
            result.push(all);
          }
          result.map(v => (v.shown = false));
          state.perm.data = result;
          state.perm.thisObjectType = state.perm.thisObjectTree.treeModel.objectType;

          state.perm.subData = {
            entities: []
          };

          state.perm.subUserData = {
            entities: []
          };
        }
      },
      (error) => {
        // console.log(error);
      }
    );
  },
  setPermTreeType(state, data) {
    state.perm.treeType = data;
  },
  treePermDataADD(state, data) {
    // 暂存指向

    state.perm.thisTreeObj = data;
    // //console.log("点击分类:", data);
    if (state.perm.treeType) {
      // 集合处理
      var params = {
        parentId: state.perm.thisTreeObj.treeModel.id,
        objectType: state.perm.thisObjectTree.treeModel.objectType || '',
        pageNo: 1,
        pageSize: 10,
        criteria: ''
      };
      Vue.http({
        method: 'POST',
        url: `${Vue.prototype.devUrl}/permission/pagePermissionCategory`,
        params
      }).then(
        (data) => {
          const result = data.data;
          if (result.isSuccess) {
            if (result.data.entities != null) {
              state.perm.subData = result.data;
            } else {
              state.perm.subData = {
                entities: []
              };
            }
          }
        },
        (error) => {
          // console.log(error);
        }
      );
    } else {
      // 集合处理
      var params = {
        categoryId: state.perm.thisTreeObj.treeModel.id,
        pageNo: 1,
        pageSize: 99,
        criteria: ''
      };
      Vue.http({
        method: 'POST',
        url: `${Vue.prototype.devUrl}/permission/pagePermission`,
        params
      }).then(
        (data) => {
          const result = data.data;
          if (result.entities != null) {
            state.perm.subUserData = result;
          } else {
            state.perm.subUserData = {
              entities: []
            };
          }
        },
        (error) => {
          // console.log(error);
        }
      );
    }
  },
  // 分类移动
  treePermDataMOVE(state, data) {
    // console.log(data);
    const thisObj = state.perm.selectObj;
    const toGroup = state.perm.checkRadioObj;
    const params = {
      id: thisObj.id,
      parentId: toGroup.id,
      name: thisObj.name,
      level: toGroup.level + 1,
      sort: thisObj.sort,
      objectType: thisObj.objectType,
      enName: thisObj.enName
    };
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/permission/updateCategory`,
      params
    }).then(
      (data) => {
        const result = data.data;
        if (result.isSuccess) {
          const tableparams = {
            parentId: state.perm.thisTreeObj.treeModel.id,
            pageNo: 1,
            pageSize: 10,
            criteria: '',
            objectType: state.perm.thisObjectTree.treeModel.objectType || ''
          };
          const treeparams = {
            objectType: state.perm.thisObjectTree.treeModel.objectType || ''
          };
          request.requestPermTree(treeparams);
          request.requestPermTable(tableparams);
          // alert("权限分类移动成功!");
          $('body').append(Vue.prototype.gUtils.myAlert('权限分类移动成功!', 'pop'));
          $('.pop').click(() => {
            $('.maskpop').remove();
          });
        }
      },
      (error) => {
        $('body').append(Vue.prototype.gUtils.myAlert(error.data.resultMsg, 'pop'));
        $('.pop').click(() => {
          $('.maskpop').remove();
        });
        // //console.log(error.data.resultMsg);
      }
    );
  },
  // 移动权限分类中的选中对象
  setPermCheckRadObj(state, data) {
    state.perm.checkRadioObj = data;
  },
  // 某个权限分类的权限
  queryPermCld(state, data) {
    if (data == 'permcld') {
      if (state.perm.thisTreeObj.treeModel) {
        const params = {
          criteria: '',
          pageNo: 1,
          pageSize: 99,
          categoryId: state.perm.thisTreeObj.treeModel.id
        };

        Vue.http({
          method: 'POST',
          url: `${Vue.prototype.devUrl}/permission/pagePermission`,
          params
        }).then(
          (data) => {
            const result = data.data;
            if (result.entities != null) {
              state.perm.subUserData = result;
            } else {
              state.perm.subUserData = {
                entities: []
              };
            }

            state.perm.treeType = false;
          },
          (error) => {
            // if (error.data.resultMsg.indexOf("categoryId有误") < 0) {
            $('body').append(Vue.prototype.gUtils.myAlert(error.data.resultMsg, 'pop'));
            $('.pop').click(() => {
              $('.maskpop').remove();
            });
            //  }
            // //console.log(error.data.resultMsg);
          }
        );
      }
    } else if (data == 'perm') {
      const sJson = {
        orders: [
          {
            property: 'sort',
            desc: false
          }
        ]
      };
      const tableparams = {
        parentId: state.perm.thisTreeObj.treeModel.id,
        pageNo: 1,
        pageSize: 10,
        criteria: JSON.stringify(sJson),
        objectType: state.perm.thisObjectTree.treeModel.objectType
      };
      request.requestPermTable(tableparams);
      state.perm.treeType = true;
    }
  },
  // 用户列表多选储存域
  setPermCldCheckbox(state, data) {
    state.perm.userCheckbox = data;
  },
  setPermCldSelectData(state, data) {
    state.perm.selectPermsObj = data;
  },
  setPermSelectObj(state, data) {
    state.perm.selectObj = data;
  },
  // 移动权限分类中的选中对象
  setPermsCheckRadObj(state, data) {
    state.perm.checkPermsRadioObj = data;
    // console.log(data);
  },
  // 权限移动
  treePermPldDataMOVE(state, data) {
    // console.log(data);
    const thisObj = state.perm.selectPermsObj;
    const toGroup = state.perm.checkPermsRadioObj;
    const params = {
      id: thisObj.id,
      categoryId: toGroup.id,
      enName: thisObj.enName,
      objectType: thisObj.objectType,
      name: thisObj.name,
      desc: thisObj.desc
    };
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/permission/update`,
      params
    }).then(
      (data) => {
        const result = data.data;
        if (result.isSuccess) {
          const pm = {
            criteria: '',
            pageNo: 1,
            pageSize: 10,
            categoryId: state.perm.thisTreeObj.treeModel.id
          };
          request.requestPermCldTable(pm);
          // alert("权限移动成功!");
          $('body').append(Vue.prototype.gUtils.myAlert('权限移动成功!', 'pop'));
          $('.pop').click(() => {
            $('.maskpop').remove();
          });
        }
      },
      (error) => {
        $('body').append(Vue.prototype.gUtils.myAlert(error.data.resultMsg, 'pop'));
        $('.pop').click(() => {
          $('.maskpop').remove();
        });
        // //console.log(error.data.resultMsg);
      }
    );
  }
};

const actions = {
  setPermObjectTypeData(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setPermObjectTypeData', param);
      resolve('ok');
    }));
  },
  setPermTreeType(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setPermTreeType', param);
      resolve('ok');
    }));
  },
  treePermObjectADD(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('treePermObjectADD', param);
      resolve('ok');
    }));
  },
  treePermDataADD(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('treePermDataADD', param);
      resolve('ok');
    }));
  },
  treePermDataMOVE(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('treePermDataMOVE', param);
      resolve('ok');
    }));
  },
  setPermCheckRadObj(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setPermCheckRadObj', param);
      resolve('ok');
    }));
  },
  queryPermCld(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('queryPermCld', param);
      resolve('ok');
    }));
  },
  setPermCldCheckbox(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setPermCldCheckbox', param);
      resolve('ok');
    }));
  },
  setPermSelectObj(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setPermSelectObj', param);
      resolve('ok');
    }));
  },
  setPermsCheckRadObj(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setPermsCheckRadObj', param);
      resolve('ok');
    }));
  },
  treePermPldDataMOVE(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('treePermPldDataMOVE', param);
      resolve('ok');
    }));
  },
  setPermCldSelectData(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setPermCldSelectData', param);
      resolve('ok');
    }));
  }
};
const getters = {
  getPermObjectTypeData(state) {
    return state.perm.objectTypeData;
  },
  getPermData(state) {
    return state.perm.data;
  },
  getSubPermCldData(state) {
    return state.perm.subUserData;
  },
  getPermFixObj(state) {
    return state.perm.fixObj;
  },
  getSubPermData(state) {
    return state.perm.subData;
  },
  getPermSelectObj(state) {
    return state.perm.thisTreeObj;
  },
  getPermTreeType(state) {
    return state.perm.treeType;
  },
  getAddPermCldDefaultData(state) {
    return state.perm.userDefaultData;
  },
  getAddPermCldSelectData(state) {
    return state.perm.userSelectData;
  },
  getTheObjectType(state) {
    return state.perm.thisObjectType;
  },
  getObjectTree(state) {
    return state.perm.thisObjectTree;
  },
  getPermsMoveSelect(state) {
    return state.perm.selectPermsObj;
  },
  getPermlistMoveSelect(state) {
    return state.perm.selectObj;
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
  request
};

import Vue from 'vue';

// 刷新树
const request = {
  requestTree() {
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/group/queryVisibleGroups`
    }).then(
      (data) => {
        const result = data.data;
        if (result.isSuccess) {
          const all = {
            name: '全部',
            id: 0,
            level: 0,
            hasAuth: true
          };
          result.data.push(all);
          // shown标识
          result.data.map(v => (v.shown = false));
          state.group.data = result.data;
        }
      },
      (error) => {
        // console.log(error);
      }
    );
  },

  requestTable(params) {
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/group/pageGroup`,
      params
    }).then(
      (data) => {
        const result = data.data;
        if (result.isSuccess) {
          if (result.data.entities != null) {
            state.group.subData = result.data;
            // console.log(state.group.subData);
          } else {
            state.group.subData = {
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
  requestUserTable(params) {
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/group/pageUser`,
      params
    }).then(
      (data) => {
        const result = data.data;
        if (result.isSuccess) {
          if (result.data.entities != null) {
            state.group.subUserData = result.data;
          } else {
            state.group.subUserData = {
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
  group: {
    data: [], // 未格式化默认JSON
    thisTreeObj: {}, // 当前选中树节点
    subData: {
      entities: []
    },
    subUserData: {
      entities: []
    },
    selectObj: '', // 暂存弹窗前被选中对象,move方法用
    checkRadioObj: '', // table tree单选中对象
    fixObj: '',
    treeType: true, // 菜单树开关,true组织,false用户,
    userCheckbox: [],
    thisUserTreeObj: {}, // 添加用户选中的树节点
    userDefaultData: [], // 非当前组织所包含的用户
    userSelectData: [] // 选择后用户
  }
};

const mutations = {
  setData(state, data) {
    const all = {
      name: '所有组织',
      id: 0,
      level: 0,
      hasAuth: true
    };
    data.push(all);
    // shown标识
    data.map(v => (v.shown = false));
    state.group.data = data;
    // //console.log("出来吧:", state.group.data);
  },
  setTreeType(state, data) {
    state.group.treeType = data;
  },
  treeDataADD(state, data) {
    // console.log(data);
    // 暂存指向
    state.group.thisTreeObj = data;
    if (state.group.treeType) {
      // 集合处理
      const sJson = {
        orders: [
          {
            property: 'sort',
            desc: false
          }
        ]
      };
      var params = {
        parentId: state.group.thisTreeObj.treeModel.id,
        pageNo: 1,
        pageSize: 10,
        criteria: JSON.stringify(sJson)
      };
      // request.requestTable(params);
      Vue.http({
        method: 'POST',
        url: `${Vue.prototype.devUrl}/group/pageGroup`,
        params
      }).then(
        (data) => {
          const result = data.data;
          if (result.isSuccess) {
            if (result.data.entities != null) {
              state.group.subData = result.data;

              // state.group.userSelectData = [];
              // state.group.userDefaultData = [];

              // 集合处理
              // var pm = {
              //   groupId: state.group.thisTreeObj.treeModel.id,
              // }
              // Vue.http({
              //   method: 'POST',
              //   url: Vue.prototype.devUrl + '/group/queryUserNotInGroup',
              //   params: pm
              // }).then(function (data) {
              //   var result = data.data;
              //   if (result != []) {
              //     result.map(function (v) {
              //       return v.shown = true;
              //     });
              //     state.group.userDefaultData = result;
              //     //console.log(state.group.userDefaultData)
              //   } else {
              //     state.group.userDefaultData = {}
              //   }

              // }, function (error) {
              //   //console.log(error);
              // });
            } else {
              state.group.subData = {
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
        groupId: state.group.thisTreeObj.treeModel.id,
        pageNo: 1,
        pageSize: 10,
        criteria: ''
      };
      // request.requestUserTable(params);

      Vue.http({
        method: 'POST',
        url: `${Vue.prototype.devUrl}/group/pageUser`,
        params
      }).then(
        (data) => {
          const result = data.data;
          if (result.isSuccess) {
            if (result.data.entities != null) {
              state.group.subUserData = result.data;
            }
          }
        },
        (error) => {
          // console.log(error);
        }
      );
    }
  },
  setSelectObj(state, data) {
    state.group.selectObj = data;
  },
  // 组织移动
  treeDataMOVE(state, data) {
    const thisObj = state.group.selectObj;
    const toGroup = state.group.checkRadioObj;
    const params = {
      id: thisObj.id,
      parentId: toGroup.id
    };
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/group/move`,
      params
    }).then(
      (data) => {
        const result = data.data;
        if (result.isSuccess) {
          const params = {
            parentId: state.group.thisTreeObj.treeModel.id,
            pageNo: 1,
            pageSize: 10,
            criteria: ''
          };
          request.requestTree();
          request.requestTable(params);

          state.group.checkRadioObj = '';
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
  setCheckRadObj(state, data) {
    state.group.checkRadioObj = data;
  },
  // 某个组织的用户查询
  queryUser(state, data) {
    if (data == 'user') {
      if (state.group.thisTreeObj.treeModel) {
        var params = {
          criteria: '',
          pageNo: 1,
          pageSize: 12,
          groupId: state.group.thisTreeObj.treeModel.id
        };

        Vue.http({
          method: 'POST',
          url: `${Vue.prototype.devUrl}/group/pageUser`,
          params
        }).then(
          (data) => {
            const result = data.data;
            if (result.isSuccess) {
              if (result.data.entities != null) {
                state.group.subUserData = result.data;
              } else {
                state.group.subUserData = {
                  entities: []
                };
              }
              state.group.treeType = false;
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
      }
    } else if (data == 'group') {
      const sJson = {
        orders: [
          {
            property: 'sort',
            desc: false
          }
        ]
      };
      var params = {
        parentId: state.group.thisTreeObj.treeModel.id,
        pageNo: 1,
        pageSize: 10,
        criteria: JSON.stringify(sJson)
      };
      request.requestTable(params);
      state.group.treeType = true;
    }
  },
  // 用户列表多选储存域
  setUserCheckbox(state, data) {
    state.group.userCheckbox = data;
  },
  // 移除用户
  removeUser(state, data) {
    const params = {
      userIds: state.group.userCheckbox.join(','),
      groupId: state.group.thisTreeObj.treeModel.id
    };
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/group/removeUser`,
      params
    }).then(
      (data) => {
        const result = data.data;
        if (result.isSuccess) {
          const pm = {
            groupId: state.group.thisTreeObj.treeModel.id,
            pageNo: 1,
            pageSize: 10,
            criteria: ''
          };
          request.requestUserTable(pm);
          // alert("移除所选用户成功!");

          $('body').append(Vue.prototype.gUtils.myAlert('移除用户成功!', 'pop'));
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
        // console.log(error.data.resultMsg);
      }
    );
  },
  // 添加用户树节点
  userTreeDataADD(state, data) {
    // console.log(data);
    // state.group.userSelectData = [];
    // state.group.userDefaultData = [];
    // 暂存指向
    // state.group.thisUserTreeObj = data;

    // 集合处理
    const params = {
      groupId: state.group.thisTreeObj.treeModel.id
    };
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/group/queryUserNotInGroup`,
      params
    }).then(
      (data) => {
        const result = data.data;
        if (result != []) {
          result.map(v => (v.shown = true));
          state.group.userDefaultData = result;
          // console.log(state.group.userDefaultData)
        } else {
          state.group.userDefaultData = {};
        }
      },
      (error) => {
        // console.log(error);
      }
    );
  },
  // 选中用户操作
  setSelectData(state, data) {
    if (data.type == 'add') {
      // 左→右
      var thisId = data.id;

      for (var i = 0; i < state.group.userDefaultData.length; i++) {
        var cur = state.group.userDefaultData[i];
        if (cur.id == thisId) {
          state.group.userDefaultData.splice(i, 1);
          i--;
        }
      }

      state.group.userSelectData.push(data);
      Vue.prototype.gUtils.sortArr(state.group.userSelectData, 'id');
    } else if (data.type == 'remove') {
      // 右→左
      var thisId = data.id;
      for (var i = 0; i < state.group.userSelectData.length; i++) {
        var cur = state.group.userSelectData[i];
        if (cur.id == thisId) {
          state.group.userSelectData.splice(i, 1);
          i--;
        }
      }
      state.group.userDefaultData.push(data);
      Vue.prototype.gUtils.sortArr(state.group.userDefaultData, 'id');
    }
  },
  // 保存添加用户
  saveAddUserData(state, data) {
    const userIds = [];
    for (let i = 0; i < state.group.userSelectData.length; i++) {
      userIds.push(state.group.userSelectData[i].id);
    }
    const params = {
      userIds: userIds.join(','),
      groupId: state.group.thisTreeObj.treeModel.id
    };
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/group/addUser`,
      params
    }).then(
      (data) => {
        const result = data.data;
        if (result.isSuccess) {
          // state.group.userSelectData = [];
          // state.group.userDefaultData = [];
          const pm = {
            groupId: state.group.thisTreeObj.treeModel.id,
            pageNo: 1,
            pageSize: 10,
            criteria: ''
          };
          request.requestUserTable(pm);
          // alert("用户保存成功!");
          $('body').append(Vue.prototype.gUtils.myAlert('用户添加成功!', 'pop'));
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
        // console.log(error.data.resultMsg);
      }
    );
  },
  // 关闭后清空数据
  closeRemoveData(state, data) {
    if (data == 'userAdd') {
      state.group.userSelectData = [];
      state.group.userDefaultData = [];
    }
  },
  setAllUser(state, data) {
    state.group.userSelectData = state.group.userDefaultData;
    state.group.userDefaultData = [];
  },
  removeAllUser(state, data) {
    state.group.userDefaultData = state.group.userSelectData;
    state.group.userSelectData = [];
  }
};

const actions = {
  defaultData(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('defaultData', param);
      resolve('ok');
    }));
  },
  setTreeType(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setTreeType', param);
      resolve('ok');
    }));
  },
  treeDataADD(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('treeDataADD', param);
      resolve('ok');
    }));
  },
  setData(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setData', param);
      resolve('ok');
    }));
  },
  setSelectObj(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setSelectObj', param);
      resolve('ok');
    }));
  },
  treeDataMOVE(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('treeDataMOVE', param);
      resolve('ok');
    }));
  },
  setCheckRadObj(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setCheckRadObj', param);
      resolve('ok');
    }));
  },
  queryUser(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('queryUser', param);
      resolve('ok');
    }));
  },
  setUserCheckbox(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setUserCheckbox', param);
      resolve('ok');
    }));
  },
  removeUser(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('removeUser', param);
      resolve('ok');
    }));
  },
  userTreeDataADD(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('userTreeDataADD', param);
      resolve('ok');
    }));
  },
  setSelectData(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setSelectData', param);
      resolve('ok');
    }));
  },
  saveAddUserData(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('saveAddUserData', param);
      resolve('ok');
    }));
  },
  setSearchData(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setSearchData', param);
      resolve('ok');
    }));
  },
  closeRemoveData(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('closeRemoveData', param);
      resolve('ok');
    }));
  },
  setAllUser(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setAllUser', param);
      resolve('ok');
    }));
  },
  removeAllUser(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('removeAllUser', param);
      resolve('ok');
    }));
  }
};
const getters = {
  getData(state) {
    return state.group.data;
  },
  getSubUserData(state) {
    return state.group.subUserData;
  },
  getFixObj(state) {
    return state.group.fixObj;
  },
  getSubData(state) {
    return state.group.subData;
  },
  getSelectObj(state) {
    return state.group.thisTreeObj;
  },
  getTreeType(state) {
    return state.group.treeType;
  },
  getAddUserDefaultData(state) {
    return state.group.userDefaultData;
  },
  getAddUserSelectData(state) {
    return state.group.userSelectData;
  },
  getCheckRadio(state) {
    if (state.group.checkRadioObj) {
      return true;
    }
    return false;
  },
  getGroupMoveSelect(state) {
    return state.group.selectObj;
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
  request
};

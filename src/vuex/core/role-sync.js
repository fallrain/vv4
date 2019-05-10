import Vue from 'vue';

const request = {
  requestRoleList(params) {
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/group/roleList`,
      params
    }).then(
      (data) => {
        const result = data.data;
        if (!result.isSuccess) {
          result.map(v => (v.shown = true));
          state.role.roleList = result;
          // console.log(result);
        }
      },
      (error) => {
        $('body').append(Vue.prototype.gUtils.myAlert(error.data.resultMsg, 'pop'));
        $('.pop').click(() => {
          $('.maskpop').remove();
        });
        // console.log(error);
      }
    );
  },
  requestRoleUserList(params) {
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/manage/user/queryUserByRoleId`,
      params
    }).then(
      (data) => {
        const result = data.data;
        if (result.data.resultList != null) {
          state.role.roleUserList = result.data;
        } else {
          state.role.roleUserList = {
            resultList: []
          };
        }
      },
      (error) => {
        $('body').append(Vue.prototype.gUtils.myAlert(error.data.resultMsg, 'pop'));
        $('.pop').click(() => {
          $('.maskpop').remove();
        });
        // console.log(error);
      }
    );
  },
  requestRolePermTree(params) {
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/objectType/queryObjectList`,
      params
    }).then(
      (data) => {
        const result = data.data;
        // console.log(result);
        if (result.isSuccess) {
          const all = {
            name: '全部',
            objectId: 0,
            level: 0,
            hasAuth: true
          };
          result.data.push(all);
          state.role.rolePermCateList = [];
          state.role.roleObjectCheckArr = [];
          state.role.rolePermCateList = result.data;
          // console.log(state.role.rolePermCateList);
          state.role.modShow = false;
        }
      },
      (error) => {
        $('body').append(Vue.prototype.gUtils.myAlert(error.data.resultMsg, 'pop'));
        $('.pop').click(() => {
          $('.maskpop').remove();
        });
        // console.log(error);
      }
    );
  }
};

function obj2key(obj, keys) {
  let n = keys.length;
  const key = [];
  while (n--) {
    key.push(obj[keys[n]]);
  }
  return key.join('|');
}
// 数组对象去重操作
function uniqeByKeys(array, keys) {
  const arr = [];
  const hash = {};
  for (let i = 0, j = array.length; i < j; i++) {
    const k = obj2key(array[i], keys);
    if (!(k in hash)) {
      hash[k] = true;
      arr.push(array[i]);
    }
  }
  return arr;
}

// 数组去重
function removeRepeatArray(arr) {
  const r = [];
  for (let i = 0; i < arr.length; i++) {
    if (r.indexOf(arr[i]) == -1) {
      r.push(arr[i]);
    }
  }
  return r;
}

const state = {
  role: {
    thisTreeObj: {}, // 当前选中树节点,
    thisRoleObj: {}, // 当前选中角色
    thisRoleTabsObj: {},
    thisUserTreeObj: {}, //
    thisRoleTreeObj: {},
    roleList: [],
    checkRadioObj: '', // move选中
    selectObj: '', // 暂存弹窗前被选中对象,move方法用
    roleObjectList: [],
    roleUserList: [],

    userDefaultData: [],
    userSelectData: [], // 选择后用户
    userCheckbox: [],

    rolePermCateList: [], // 角色权限分类列表
    rolePermList: [], // 角色权限列表
    thisRoleObjectTypeObj: {}, // 对象集合所选中的
    roleObjectCheckArr: [], // 对象集合多选数组
    rolePermsCheckArr: [], // 权限集合多选数组
    rolePermsCheckArrLen: [], // 权限集合多选数组缓存区
    modShow: false, // 对象类型窗口状态,
    permtoInput: false, // 权限传递子栏目
    roleAdminSelect: false // 系统角色选中
  }
};

const mutations = {
  roleDataADD(state, data) {
    // 暂存指向
    // console.log(data);
    state.role.thisTreeObj = data;
    // 集合处理
    const params = {
      groupId: data.treeModel.id
    };
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/group/roleList`,
      params
    }).then(
      (data) => {
        const result = data.data;
        if (!result.isSuccess) {
          result.map(v => (v.shown = true));
          state.role.roleList = result;
          // console.log(result);
          state.role.rolePermCateList = [];
          state.role.rolePermList = [];
          state.role.roleUserList = [];
          state.role.thisRoleTreeObj = {};
        }
      },
      (error) => {
        $('body').append(Vue.prototype.gUtils.myAlert(error.data.resultMsg, 'pop'));
        $('.pop').click(() => {
          $('.maskpop').remove();
        });
        // console.log(error);
      }
    );
  },
  // 角色树指向暂存方法
  roleTreeDataADD(state, data) {
    // 暂存指向

    state.role.thisRoleTreeObj = data;
    state.role.roleUserList = [];
    // //console.log("角色id", state.role.thisRoleTreeObj);
    const params = {
      roleId: state.role.thisRoleTreeObj.id,
      pageNo: 1,
      pageSize: 10,
      criteria: ''
    };
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/manage/user/queryUserByRoleId`,
      params
    }).then(
      (data) => {
        const result = data.data;
        if (result.data.resultList != null) {
          state.role.roleUserList = result.data;
          // console.log(state.role.roleUserList);
        } else {
          state.role.roleUserList = {
            resultList: []
          };
        }

        state.role.rolePermCateList = [];
        state.role.rolePermList = [];
      },
      (error) => {
        $('body').append(Vue.prototype.gUtils.myAlert(error.data.resultMsg, 'pop'));
        $('.pop').click(() => {
          $('.maskpop').remove();
        });
        // console.log(error);
      }
    );
  },
  // 角色权限指向暂存方法
  roleTabsDataADD(state, data) {
    // 暂存指向
    state.role.thisRoleTabsObj = data;
    const params = {
      roleId: state.role.thisRoleTreeObj.id,
      objectType: state.role.thisRoleTabsObj.treeModel.objectType || ''
    };
    state.role.roleObjectCheckArr = [];
    state.role.rolePermCateList = [];
    state.role.rolePermList = [];
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/objectType/queryObjectList`,
      params
    }).then(
      (data) => {
        const result = data.data;
        // //console.log("result", result);
        if (result.isSuccess) {
          state.role.rolePermCateList = result.data;
          state.role.modShow = false;
        }
      },
      (error) => {
        // console.log(error);
        if (error.data.resultMsg.indexOf('roleId') >= 0) {
          $('body').append(Vue.prototype.gUtils.myAlert('未选中角色!', 'pop'));
          $('.pop').click(() => {
            $('.maskpop').remove();
          });
        }
      }
    );
  },
  // 角色选中
  roleSelect(state, data) {
    state.role.thisRoleObj = data;
    // console.log(state.role.thisRoleObj);
  },
  // 移动角色中的选中对象
  setRoleCheckRadObj(state, data) {
    state.role.checkRadioObj = data;
  },
  setRoleSelectObj(state, data) {
    state.role.selectObj = data;
    // console.log(state.role.selectObj);
  },
  // 角色移动
  roleMove(state, data) {
    const thisObj = state.role.selectObj;
    const toGroup = state.role.checkRadioObj;
    const params = {
      roleId: thisObj.id,
      groupId: toGroup.id
    };
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/role/move`,
      params
    }).then(
      (data) => {
        const result = data.data;
        if (result.isSuccess) {
          const params = {
            groupId: state.role.thisTreeObj.treeModel.id
          };
          request.requestRoleList(params);
          // alert("移动角色成功!");
          $('body').append(Vue.prototype.gUtils.myAlert('移动角色成功!', 'pop'));
          $('.pop').click(() => {
            $('.maskpop').remove();
          });

          state.role.checkRadioObj = '';
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
  setRoleObjectList(state, data) {
    state.role.modShow = data;
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/objectType/hasRightList`
    }).then(
      (data) => {
        const result = data.data;
        if (result.isSuccess) {
          // console.log(result);
          state.role.roleObjectList = result.data;
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

  // 用户列表多选储存域
  setRoleUserCheckbox(state, data) {
    state.role.userCheckbox = data;
  },
  // 移除用户
  removeRoleUser(state, data) {
    const params = {
      idsuserIds: state.role.userCheckbox.join(','),
      // groupId: state.role.thisTreeObj.treeModel.id,
      roleId: state.role.thisRoleObj.id
    };
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/manage/user/removeRoleUsers`,
      params
    }).then(
      (data) => {
        const result = data.data;
        if (result.isSuccess) {
          const pm = {
            roleId: state.role.thisRoleTreeObj.id,
            pageNo: 1,
            pageSize: 10,
            criteria: ''
          };
          request.requestRoleUserList(pm);
          // alert("移除所选用户成功!");
          $('body').append(Vue.prototype.gUtils.myAlert('移除所选用户成功!', 'pop'));
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
  roleUserTreeDataADD(state, data) {
    // console.log(data);
    // state.role.userSelectData = [];
    // state.role.userDefaultData = [];
    // 暂存指向
    // state.role.thisUserTreeObj = data;
    // 集合处理
    // var params = {
    //   groupId: state.role.thisTreeObj.treeModel.id,
    //   roleId: state.role.thisRoleObj.id,
    // }
    // Vue.http({
    //   method: 'POST',
    //   url: Vue.prototype.devUrl + '/role/queryUserNotInRole',
    //   params: params
    // }).then(function (data) {
    //   var result = data.data;
    //   if (result != []) {
    //     result.map(function (v) {
    //       return v.shown = true;
    //     });
    //     state.role.userDefaultData = result;
    //   } else {
    //     state.role.userDefaultData = {}
    //   }
    // }, function (error) {
    //   //console.log(error);
    // });
  },
  // 选中用户操作
  setRoleSelectData(state, data) {
    if (data.type == 'add') {
      // 左→右
      var thisId = data.id;

      for (var i = 0; i < state.role.userDefaultData.length; i++) {
        var cur = state.role.userDefaultData[i];
        if (cur.id == thisId) {
          state.role.userDefaultData.splice(i, 1);
          i--;
        }
      }

      state.role.userSelectData.push(data);
      Vue.prototype.gUtils.sortArr(state.role.userSelectData, 'id');
    } else if (data.type == 'remove') {
      // 右→左
      var thisId = data.id;
      for (var i = 0; i < state.role.userSelectData.length; i++) {
        var cur = state.role.userSelectData[i];
        if (cur.id == thisId) {
          state.role.userSelectData.splice(i, 1);
          i--;
        }
      }
      state.role.userDefaultData.push(data);
      Vue.prototype.gUtils.sortArr(state.role.userDefaultData, 'id');
    }
  },
  setRoleAllUser(state, data) {
    state.role.userSelectData = state.role.userDefaultData;
    state.role.userDefaultData = [];
  },
  removeRoleAllUser(state, data) {
    state.role.userDefaultData = state.role.userSelectData;
    state.role.userSelectData = [];
  },
  // 保存添加用户
  saveAddRoleUserData(state, data) {
    const userIds = [];
    for (let i = 0; i < state.role.userSelectData.length; i++) {
      userIds.push(state.role.userSelectData[i].idsUserId);
    }
    const params = {
      idsuserIds: userIds.join(','),
      // groupId: state.role.thisTreeObj.treeModel.id,
      roleId: state.role.thisRoleObj.id
    };
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/manage/user/addRoleUsers`,
      params
    }).then(
      (data) => {
        const result = data.data;
        if (result.isSuccess) {
          state.role.userSelectData = [];
          state.role.userDefaultData = [];
          const pm = {
            roleId: state.role.thisRoleTreeObj.id,
            pageNo: 1,
            pageSize: 10,
            criteria: ''
          };
          request.requestRoleUserList(pm);
          // alert("用户保存成功!");
          $('body').append(Vue.prototype.gUtils.myAlert('用户保存成功!', 'pop'));
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
  closeRemoveRoleData(state, data) {
    if (data == 'userAdd') {
      state.role.userSelectData = [];
      state.role.userDefaultData = [];
    }
  },
  // 对象类型集合树的暂存点击加载权限组的方法
  roleObjectListAdd(state, data) {
    if (!data.checked) {
      state.role.thisRoleObjectTypeObj = data;
      const params = {
        roleId: state.role.thisRoleObj.id,
        objectType: state.role.thisRoleTabsObj.treeModel.objectType,
        objectId: data.treeModel.objectId
      };

      Vue.http({
        method: 'POST',
        url: `${Vue.prototype.devUrl}/right/queryRight`,
        params
      }).then(
        (data) => {
          const result = data.data;
          if (!result.isSuccess) {
            let arr = [];
            state.role.rolePermList = result;
            arr = Vue.prototype.gUtils.getJsonArr(Vue.prototype.gUtils.jsonPermsFormat(result, 0), arr);
            for (let i = 0; i < arr.length; i++) {
              if (!arr[i].hasRight) {
                arr.splice(i, 1);
                i--;
              }
            }
            state.role.rolePermsCheckArr = [];
            state.role.rolePermsCheckArr = arr;

            function a(data) {
              if (data) {
                for (let i = 0; i < data.length; i++) {
                  state.role.rolePermsCheckArrLen.push(data[i]);
                  if (data[i].permissionList == null) {
                    continue;
                  } else {
                    a(data[i].permissionList);
                  }
                }
              }
            }
            a(arr);
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
  },
  // 对象类型集合树的暂存选中对象方法
  roleObjectListCheck(state, data) {
    const o = data;
    var data = data.treeModel.objectId;
    if (!data.checked) {
      console.log('选中:', data);
      var tmp = [];
      if (!state.role.permtoInput) {
        if (state.role.roleObjectCheckArr.length > 0) {
          let l = 0;
          for (var i = 0; i < state.role.roleObjectCheckArr.length; i++) {
            if (state.role.roleObjectCheckArr[i] != data) {
              tmp.push(state.role.roleObjectCheckArr[i]);
            } else {
              l++;
            }
          }
          l <= 0 ? tmp.push(data) : (o.isSelect = false),
          (state.role.rolePermList = []), // //console.log("权限组:", state.role.rolePermList);
          (tmp = removeRepeatArray(tmp));
          state.role.roleObjectCheckArr = tmp;
        } else {
          state.role.roleObjectCheckArr.push(data);
        }
      } else {
        state.role.roleObjectCheckArr = [];
        state.role.roleObjectCheckArr.push(data);
      }

      console.log('对象类型集合树的暂存选中对象方法:', state.role.roleObjectCheckArr);
    } else {
      console.log('Wei选中:', data);
      var tmp = [];
      if (!state.role.permtoInput) {
        if (state.role.roleObjectCheckArr.length > 0) {
          for (var i = 0; i < state.role.roleObjectCheckArr.length; i++) {
            if (state.role.roleObjectCheckArr[i] == data) {
              state.role.roleObjectCheckArr.splice(i, 1);
              return;
            }
          }
        }
      } else {
        state.role.roleObjectCheckArr = [];
        state.role.roleObjectCheckArr.push(data);
      }
      console.log('weixuan对象类型集合树的暂存选中对象方法:', state.role.roleObjectCheckArr);
    }
  },
  // 权限集合树的暂存选中对象方法
  rolePermListCheck(state, data) {
    let flag = true;
    var arr = [];
    let temp = [];
    for (var i = 0; i < state.role.rolePermsCheckArr.length; i++) {
      if (state.role.rolePermsCheckArr[i].name == data.name && state.role.rolePermsCheckArr[i].id == data.id) {
        flag = false;
        break;
      }
    }

    const permissionList = []; // 递归后
    function a(data) {
      if (data.permissionList) {
        for (let i = 0; i < data.permissionList.length; i++) {
          permissionList.push(data.permissionList[i]);
          if (data.permissionList[i] == null) {
            break;
          } else {
            a(data.permissionList[i]);
          }
        }
      }
    }
    a(data);
    // console.log(permissionList);

    if (flag) {
      if (data.permissionList) {
        // 全选
        arr.push(data);
        temp = Vue.prototype.gUtils.getJsonArr(arr, temp);
        // state.role.rolePermsCheckArr = temp
        state.role.rolePermsCheckArr.push.apply(state.role.rolePermsCheckArr, temp);
        state.role.rolePermsCheckArr = uniqeByKeys(state.role.rolePermsCheckArr, ['id', 'name']);

        // if (state.role.rolePermsCheckArrLen - state.role.rolePermsCheckArr.length == 1) {
        // 存入root节点
        var arr = [];
        arr = Vue.prototype.gUtils.getJsonArr(Vue.prototype.gUtils.jsonPermsFormat(state.role.rolePermList, 0), arr);

        var ptmp = '';
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].id == data.parentId) {
            ptmp = arr[i].parentId;
            state.role.rolePermsCheckArr.push(arr[i]);
            break;
          }
        }

        for (var i = 0; i < arr.length; i++) {
          if (arr[i].id == ptmp) {
            state.role.rolePermsCheckArr.push(arr[i]);
            break;
          }
        }
        // }
        console.log('选中:', state.role.rolePermsCheckArr);
      } else {
        // 单选ok
        state.role.rolePermsCheckArr.push(data);
        var arr = [];
        arr = Vue.prototype.gUtils.getJsonArr(Vue.prototype.gUtils.jsonPermsFormat(state.role.rolePermList, 0), arr);

        let cklen = 0;
        let dtlen = 0;
        // 返回数据中含有指定categoryId的数据长度
        dtlen = arr.filter((elem, pos) => elem.categoryId == data.categoryId).length;

        // 选中列表中含有指定categoryId的数据长度
        cklen = state.role.rolePermsCheckArr.filter((elem, pos) => elem.categoryId == data.categoryId).length;

        if (dtlen == cklen) {
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].parentId + 1) {
              if (arr[i].id == data.categoryId) {
                state.role.rolePermsCheckArr.push(arr[i]);
                break;
              }
            }
          }
        }

        // //console.log("点击:",data)
        // if (state.role.rolePermsCheckArrLen - state.role.rolePermsCheckArr.length == 1) {
        // 存入root节点
        var arr = [];
        arr = Vue.prototype.gUtils.getJsonArr(Vue.prototype.gUtils.jsonPermsFormat(state.role.rolePermList, 0), arr);

        var ptmp = '';
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].parentId + 1) {
            if (arr[i].id == data.categoryId) {
              ptmp = arr[i].parentId;
              state.role.rolePermsCheckArr.push(arr[i]);
              break;
            }
          }
        }
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].id == ptmp) {
            state.role.rolePermsCheckArr.push(arr[i]);
            break;
          }
        }

        // }
        // console.log(state.role.rolePermsCheckArr);
        // //console.log(state.role.thisRoleObjectTypeObj.treeModel.hasRight)
      }
    } else if (data.permissionList) {
      if (data.level == 0) {
        // 根节点反选
        // ////console.log("根节点:",data);
        state.role.rolePermsCheckArr = [];
      } else {
        // 子根节点选中
        const hasExist = state.role.rolePermsCheckArr.some(obj => obj.id == data.id && obj.name == data.name);
        if (!hasExist) {
          for (var i = 0; i < data.permissionList.length; i++) {
            state.role.rolePermsCheckArr.push(data.permissionList[i]);
          }
          state.role.rolePermsCheckArr = uniqeByKeys(state.role.rolePermsCheckArr, ['id', 'name']);
        } else {
          var parenttmp = [];
          for (var i = 0; i < permissionList.length; i++) {
            for (var j = 0; j < state.role.rolePermsCheckArr.length; j++) {
              if (
                (state.role.rolePermsCheckArr[j].id == permissionList[i].id
                    && state.role.rolePermsCheckArr[j].name == permissionList[i].name)
                  || (state.role.rolePermsCheckArr[j].id == data.id && state.role.rolePermsCheckArr[j].name == data.name)
              ) {
                parenttmp.push(state.role.rolePermsCheckArr[j].parentId);
                state.role.rolePermsCheckArr.splice(j, 1);
                j--;
              }
            }
          }
          for (var zz = 0; zz < state.role.rolePermsCheckArr.length; zz++) {
            if (state.role.rolePermsCheckArr[zz].id == parenttmp[0]) {
              state.role.rolePermsCheckArr.splice(zz, 1);
              break;
            }
          }

          state.role.rolePermsCheckArr = uniqeByKeys(state.role.rolePermsCheckArr, ['id', 'name']);
        }

        console.log('子根节点选中', state.role.rolePermsCheckArr);
      }
      // state.role.rolePermsCheckArr.splice(index, 3);
      // Vue.prototype.gUtils.sortArr(arr, "sort");
    } else {
      // 单选删除ok
      let isHas = false;
      for (var i = 0; i < state.role.rolePermsCheckArr.length; i++) {
        if (state.role.rolePermsCheckArr[i].name == data.name && state.role.rolePermsCheckArr[i].id == data.id) {
          const removetmp = state.role.rolePermsCheckArr[i].categoryId;
          state.role.rolePermsCheckArr.splice(i, 1);
          for (var j = 0; j < state.role.rolePermsCheckArr.length; j++) {
            if (state.role.rolePermsCheckArr[j].categoryId == removetmp) {
              isHas = true;
              break;
            }
          }

          // 如果不存在任何一个权限节点,则反选根节点
          if (!isHas) {
            var parenttmp = '';
            for (let z = 0; z < state.role.rolePermsCheckArr.length; z++) {
              if (state.role.rolePermsCheckArr[z].id == removetmp) {
                parenttmp = state.role.rolePermsCheckArr[z].parentId;
                state.role.rolePermsCheckArr.splice(z, 1);
                break;
              }
            }

            for (var zz = 0; zz < state.role.rolePermsCheckArr.length; zz++) {
              if (state.role.rolePermsCheckArr[zz].id == parenttmp) {
                state.role.rolePermsCheckArr.splice(zz, 1);
                break;
              }
            }
          }
          break;
        }
      }

      if (state.role.rolePermsCheckArr.length == 1) {
        state.role.rolePermsCheckArr = [];
      }
    }

    if (state.role.rolePermsCheckArr.length > 0) {
      state.role.thisRoleObjectTypeObj.treeModel.hasRight = true;
    } else {
      state.role.thisRoleObjectTypeObj.treeModel.hasRight = false;
    }
    console.log('集合:', state.role.rolePermsCheckArr);
    console.log('集合数:', state.role.rolePermsCheckArr.length);
  },
  // 权限保存
  saveRolePerms(state, data) {
    let objectIds = '';
    const oArr = [];
    if (state.role.permtoInput) {
      // 传递
      const root = state.role.thisRoleObjectTypeObj;
      const arr = [];
      const temp = [];
      arr.push(root);

      function getJsonArr(data) {
        for (const i in data) {
          temp.push(data[i].treeModel.objectId);
          if (data[i].$children.length <= 0) {
            continue;
          } else {
            getJsonArr(data[i].$children);
          }
        }
      }
      getJsonArr(arr);
      objectIds = temp.join(',');
      // console.log(objectIds);
    } else {
      objectIds = state.role.roleObjectCheckArr.join(',');
    }

    for (let i = 0; i < state.role.rolePermsCheckArr.length; i++) {
      if (state.role.rolePermsCheckArr[i].categoryId != undefined) {
        oArr.push(state.role.rolePermsCheckArr[i].id);
      }
    }

    const params = {
      roleId: state.role.thisRoleObj.id,
      objectType: state.role.thisRoleTabsObj.treeModel.objectType,
      objectIds,
      permissionIds: oArr.join(',')
    };
    Vue.http({
      method: 'POST',
      url: `${Vue.prototype.devUrl}/right/saveRight`,
      params
    }).then(
      (data) => {
        const result = data.data;
        if (result.isSuccess) {
          // alert("权限保存成功!");
          $('body').append(Vue.prototype.gUtils.myAlert('权限保存成功!', 'pop'));
          $('.pop').click(() => {
            $('.maskpop').remove();
          });
          state.role.rolePermCateList = []; // 权限分类
          state.role.roleObjectCheckArr = []; // 权限分类选中
          state.role.rolePermList = []; // 权限
          const pm = {
            roleId: state.role.thisRoleTreeObj.id,
            objectType: state.role.thisRoleTabsObj.treeModel.objectType || ''
          };

          request.requestRolePermTree(pm);
        }
      },
      (error) => {
        // alert(error.data.resultMsg);
        if (error.data.resultMsg.indexOf('不能为空') >= 0) {
          $('body').append(Vue.prototype.gUtils.myAlert('未选中任何节点!', 'pop'));
          $('.pop').click(() => {
            $('.maskpop').remove();
          });
        }
        // console.log(error.data.resultMsg);
      }
    );
  },
  // 设置权限传递
  setPermtoInput(state, data) {
    state.role.roleObjectCheckArr = []; // 权限分类选中
    state.role.permtoInput = data;
    // console.log(state.role.permtoInput);
  },
  // 获取系统角色
  setAdminRole(state, data) {
    const pm = {
      groupId: 0
    };
    const thisObj = {
      treeModel: {
        id: 0
      }
    };
    state.role.thisTreeObj = thisObj;
    request.requestRoleList(pm);
  },
  setCloseState(state, data) {
    state.role.modShow = false;
  },
  setRoleSelect(state, data) {
    state.role.roleAdminSelect = data;
  },
  setRoluserDefaultData(state, data) {
    const defdata = state.role.userDefaultData;
    const seldata = state.role.userSelectData;
    if (defdata.length != 0) {
      var flg = 0;
      for (var i = 0; i < defdata.length; i++) {
        if (data[0].dzuid == defdata[i].dzuid) {
          flg++;
        }
      }
      flg <= 0 ? (state.role.userDefaultData = data) : null;
    } else if (seldata.length != 0) {
      var flg = 0;
      for (var i = 0; i < seldata.length; i++) {
        if (data[0].dzuid == seldata[i].dzuid) {
          flg++;
        }
      }
      flg <= 0 ? (state.role.userDefaultData = data) : null;
    } else {
      state.role.userDefaultData = data;
    }
  }
};

const actions = {
  roleDataADD(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('roleDataADD', param);
      resolve('ok');
    }));
  },
  roleTreeDataADD(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('roleTreeDataADD', param);
      resolve('ok');
    }));
  },
  roleTabsDataADD(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('roleTabsDataADD', param);
      resolve('ok');
    }));
  },
  roleSelect(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('roleSelect', param);
      resolve('ok');
    }));
  },
  roleMove(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('roleMove', param);
      resolve('ok');
    }));
  },
  setRoleCheckRadObj(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setRoleCheckRadObj', param);
      resolve('ok');
    }));
  },
  setRoleSelectObj(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setRoleSelectObj', param);
      resolve('ok');
    }));
  },
  setRoleObjectList(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setRoleObjectList', param);
      resolve('ok');
    }));
  },
  removeRoleUser(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('removeRoleUser', param);
      resolve('ok');
    }));
  },
  roleUserTreeDataADD(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('roleUserTreeDataADD', param);
      resolve('ok');
    }));
  },
  setRoleSelectData(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setRoleSelectData', param);
      resolve('ok');
    }));
  },
  saveAddRoleUserData(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('saveAddRoleUserData', param);
      resolve('ok');
    }));
  },
  closeRemoveRoleData(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('closeRemoveRoleData', param);
      resolve('ok');
    }));
  },
  setRoleUserCheckbox(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setRoleUserCheckbox', param);
      resolve('ok');
    }));
  },
  roleObjectListAdd(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('roleObjectListAdd', param);
      resolve('ok');
    }));
  },
  roleObjectListCheck(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('roleObjectListCheck', param);
      resolve('ok');
    }));
  },
  rolePermListCheck(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('rolePermListCheck', param);
      resolve('ok');
    }));
  },
  saveRolePerms(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('saveRolePerms', param);
      resolve('ok');
    }));
  },
  setPermtoInput(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setPermtoInput', param);
      resolve('ok');
    }));
  },
  setAdminRole(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setAdminRole', param);
      resolve('ok');
    }));
  },
  setCloseState(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setCloseState', param);
      resolve('ok');
    }));
  },
  setRoleSelect(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setRoleSelect', param);
      resolve('ok');
    }));
  },
  setRoleAllUser(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setRoleAllUser', param);
      resolve('ok');
    }));
  },
  removeRoleAllUser(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('removeRoleAllUser', param);
      resolve('ok');
    }));
  },
  setRoluserDefaultData(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setRoluserDefaultData', param);
      resolve('ok');
    }));
  }
};
const getters = {
  getTreeSelect(state) {
    return state.role.thisTreeObj;
  },
  getRoleList(state) {
    return state.role.roleList;
  },
  getRoleSelect(state) {
    return state.role.thisRoleObj;
  },
  getRoleObjectList(state) {
    return state.role.roleObjectList;
  },
  getRoleUserList(state) {
    return state.role.roleUserList;
  },
  getRoleAddUserDefaultData(state) {
    return state.role.userDefaultData;
  },
  getRoleAddUserSelectData(state) {
    return state.role.userSelectData;
  },
  getRolePermCateList(state) {
    return state.role.rolePermCateList;
  },
  getRolePermList(state) {
    return state.role.rolePermList;
  },
  getRoleModDigStatus(state) {
    return state.role.modShow;
  },
  getRolePermsCheckRoot(state) {
    return state.role.rolePermsCheckArr;
  },
  getRoleTreeObj(state) {
    return state.role.thisRoleTreeObj;
  },
  getRoleSelect(state) {
    return state.role.roleAdminSelect;
  },
  getRoleCheckRadio() {
    if (state.role.checkRadioObj) {
      return true;
    }
    return false;
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
  request
};

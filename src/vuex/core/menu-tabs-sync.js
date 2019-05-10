import Vue from 'vue';
import groupMod from './group-sync';
import userMod from './user-sync';
import obtymod from './objectType-sync';
import permMod from './permission-sync';
import roleMod from './role-sync';
import menuMod from './menu-sync';

const state = {
  commTabData: localStorage.getItem('historyTabs')
    ? JSON.parse(localStorage.getItem('historyTabs'))
    : [
      {
        name: '首页',
        url: '/home',
        icon: 'icon-weibiaoti5',
        hide: false
      }
    ],
  openTab: localStorage.getItem('openTab')
    ? JSON.parse(localStorage.getItem('openTab'))
    : [
      {
        name: '首页',
        url: '/home',
        icon: 'icon-weibiaoti5'
      }
    ],
  treeFourObjtmp: '',
  treeOneObjtmp: '',
  isclosed: false
};

const mutations = {
  ADD(state, data) {
    const len = state.commTabData.length;
    let m = true;

    // 判断数组中是否重复插入
    for (var i = 0; i < state.commTabData.length; i++) {
      var cur = state.commTabData[i];
      if (cur.name == data.name) {
        m = false;
        state.openTab = data;
        break;
      }
    }

    if (m) {
      if (len >= 6) {
        for (var i = 0; i <= len - 6; i++) {
          Vue.set(state.commTabData[i], 'hide', true);
        }
      }
      state.commTabData.push(data);
    } else if (state.commTabData.length > 6) {
      let dataIndex = '';
      for (var i = 0; i < state.commTabData.length; i++) {
        var cur = state.commTabData[i];
        if (cur.name == data.name) {
          dataIndex = i;
        }
      }

      for (let j = 0; j < state.commTabData.length; j++) {
        Vue.set(state.commTabData[j], 'hide', true);
      }

      if (state.commTabData.length - dataIndex < 6) {
        dataIndex = state.commTabData.length - 6;
      }
      for (let z = dataIndex; z < dataIndex + 6; z++) {
        Vue.set(state.commTabData[z], 'hide', false);
      }
    }

    state.openTab = data;
    // 本地缓存
    localStorage.setItem('historyTabs', JSON.stringify(state.commTabData));
    localStorage.setItem('openTab', JSON.stringify(state.openTab));
  },
  DEL(state, data) {
    for (var i = 0; i < state.commTabData.length; i++) {
      const cur = state.commTabData[i];
      if (cur.name == data.name) {
        state.commTabData.splice(i, 1);
        i--;
        // 获取删除后的可跳转对象
        if (state.commTabData[i]) {
          state.openTab = state.commTabData[i];
          localStorage.setItem('openTab', JSON.stringify(state.openTab));
        } else if (state.commTabData[i + 1]) {
          state.openTab = state.commTabData[i + 1];
          localStorage.setItem('openTab', JSON.stringify(state.openTab));
        } else {
          state.openTab = {
            name: '首页',
            url: '/home'
          };
          localStorage.setItem('openTab', JSON.stringify(state.openTab));
        }
      }
    }
    const len = state.commTabData.length;
    if (len > 6) {
      for (var i = 0; i < len; i++) {
        Vue.set(state.commTabData[i], 'hide', false);
      }
      for (var i = 0; i < len - 6; i++) {
        Vue.set(state.commTabData[i], 'hide', true);
      }
    } else {
      for (var i = 0; i < len; i++) {
        Vue.set(state.commTabData[i], 'hide', false);
      }
    }

    // 本地缓存
    localStorage.setItem('historyTabs', JSON.stringify(state.commTabData));

    // 数据销毁
    if (data.url.indexOf('group') >= 0) {
      groupMod.state.group.subData = {
        entities: []
      };
      groupMod.state.group.treeType = true; // 暂存弹窗前被选中对象,move方法用
    } else if (data.url.indexOf('user') >= 0) {
      userMod.state.user.data = [];
    } else if (data.url.indexOf('role') >= 0) {
      roleMod.state.role.thisRoleObj = {};
      roleMod.state.role.thisRoleTabsObj = {};
      roleMod.state.role.thisUserTreeObj = {};
      roleMod.state.role.thisRoleTreeObj = {};
      roleMod.state.role.roleList = [];
      roleMod.state.role.roleObjectList = [];
      roleMod.state.role.roleUserList = [];
      roleMod.state.role.userDefaultData = [];
      roleMod.state.role.userSelectData = []; // 选择后用户
      roleMod.state.role.userCheckbox = [];
      roleMod.state.role.rolePermCateList = []; // 角色权限分类列表
      roleMod.state.role.rolePermList = []; // 角色权限列表
      roleMod.state.role.thisRoleObjectTypeObj = {}; // 对象集合所选中的
      roleMod.state.role.roleObjectCheckArr = []; // 对象集合多选数组
      roleMod.state.role.rolePermsCheckArr = []; // 权限集合多选数组
      roleMod.state.role.rolePermsCheckArrLen = []; // 权限集合多选数组缓存区
      roleMod.state.role.modShow = false; // 对象类型窗口状态,
      roleMod.state.role.permtoInput = false; // 权限传递子栏目
    } else if (data.url.indexOf('objecttype') >= 0) {
      obtymod.state.objectType.subData = {
        entities: []
      };
    } else if (data.url.indexOf('permission') >= 0) {
      permMod.state.perm.subData = {
        entities: []
      };
      permMod.state.perm.treeType = true;
    } else if (data.url.indexOf('menu') >= 0) {
      menuMod.state.menu.subData = {
        entities: []
      };
    }
  },
  SELECT(state, data) {
    const commdata = state.commTabData;
    let dataIndex = '';
    if (commdata.length > 6) {
      if (data.hide) {
        for (let i = 0; i < commdata.length; i++) {
          const cur = commdata[i];
          if (cur.name == data.name) {
            dataIndex = i;
          }
        }
        for (let j = 0; j < commdata.length; j++) {
          Vue.set(commdata[j], 'hide', true);
        }

        if (commdata.length - dataIndex < 6) {
          dataIndex = commdata.length - 6;
        }
        for (let z = dataIndex; z < dataIndex + 6; z++) {
          Vue.set(commdata[z], 'hide', false);
        }
      }
      Vue.set(data, 'hide', false);
    }
    state.openTab = data;
    localStorage.setItem('historyTabs', JSON.stringify(state.commTabData));
    localStorage.setItem('openTab', JSON.stringify(state.openTab));
    console.log(state.openTab);
  },
  setTreeFourObj(state, data) {
    state.treeFourObjtmp = data;
  },
  setTreeOneObj(state, data) {
    state.treeOneObjtmp = data;
  },
  setClosed(state, data) {
    // state.isclosed = data
  },
  removeAllHistory(state, data) {
    state.commTabData = [
      {
        name: '首页',
        url: '/home',
        icon: 'icon-weibiaoti5',
        hide: false
      }
    ];
    state.openTab = {
      name: '首页',
      url: '/home',
      icon: 'icon-weibiaoti5'
    };

    // 菜单重置
    state.isclosed = false;

    // 数据销毁
    groupMod.state.group.subData = {
      entities: []
    };
    groupMod.state.group.treeType = true; // 暂存弹窗前被选中对象,move方法用
    userMod.state.user.data = [];
    roleMod.state.role.thisRoleObj = {};
    roleMod.state.role.thisRoleTabsObj = {};
    roleMod.state.role.thisUserTreeObj = {};
    roleMod.state.role.thisRoleTreeObj = {};
    roleMod.state.role.roleList = [];
    roleMod.state.role.roleObjectList = [];
    roleMod.state.role.roleUserList = [];
    roleMod.state.role.userDefaultData = [];
    roleMod.state.role.userSelectData = []; // 选择后用户
    roleMod.state.role.userCheckbox = [];
    roleMod.state.role.rolePermCateList = []; // 角色权限分类列表
    roleMod.state.role.rolePermList = []; // 角色权限列表
    roleMod.state.role.thisRoleObjectTypeObj = {}; // 对象集合所选中的
    roleMod.state.role.roleObjectCheckArr = []; // 对象集合多选数组
    roleMod.state.role.rolePermsCheckArr = []; // 权限集合多选数组
    roleMod.state.role.rolePermsCheckArrLen = []; // 权限集合多选数组缓存区
    roleMod.state.role.modShow = false; // 对象类型窗口状态,
    roleMod.state.role.permtoInput = false; // 权限传递子栏目
    obtymod.state.objectType.subData = {
      entities: []
    };
    permMod.state.perm.subData = {
      entities: []
    };
    permMod.state.perm.treeType = true;
    menuMod.state.menu.subData = {
      entities: []
    };
  },
  removeOtherHistory(state, data) {
    const history = [
      {
        name: '首页',
        url: '/home',
        icon: 'icon-weibiaoti5',
        hide: false
      }
    ];
    let open = {};

    if (data.name != '首页') {
      history.push({
        name: data.name,
        url: data.url,
        icon: data.name,
        hide: data.hide
      });

      open = {
        name: data.name,
        url: data.url,
        icon: data.name,
        hide: data.hide
      };
    } else {
      open = {
        name: '首页',
        url: '/home',
        icon: 'icon-weibiaoti5',
        hide: false
      };
    }

    state.commTabData = history;
    state.openTab = open;
  }
};

const actions = {
  ADD(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('ADD', param);
      resolve('ok');
    }));
  },
  DEL(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('DEL', param);
      resolve('ok');
    }));
  },
  SELECT(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('SELECT', param);
      resolve('ok');
    }));
  },
  setTreeFourObj(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setTreeFourObj', param);
      resolve('ok');
    }));
  },
  setTreeOneObj(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setTreeOneObj', param);
      resolve('ok');
    }));
  },
  setClosed(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('setClosed', param);
      resolve('ok');
    }));
  },
  removeAllHistory(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('removeAllHistory', param);
      resolve('ok');
    }));
  },
  removeOtherHistory(store, param) {
    return new Promise(((resolve, reject) => {
      store.commit('removeOtherHistory', param);
      resolve('ok');
    }));
  }
};
const getters = {
  getTabData(state) {
    return state.commTabData;
  },
  getOpenTab(state) {
    return state.openTab;
  },
  getTreeFour(state) {
    return state.treeFourObjtmp;
  },
  getTreeOne(state) {
    return state.treeOneObjtmp;
  },
  getClosed(state) {
    return state.isclosed;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};

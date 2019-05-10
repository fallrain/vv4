import Vue from 'vue';

import groupSync from '../vuex/core/group-sync';
import roleSync from '../vuex/core/role-sync';
import menuSync from '../vuex/core/menu-sync';
import userMgrSync from '../vuex/core/user-sync';
import objectTypeSync from '../vuex/core/objectType-sync';
import permissionSync from '../vuex/core/permission-sync';

Vue.prototype.requestGroup = {
  requestTable: groupSync.request.requestTable,
  requestTree: groupSync.request.requestTree,
  requestUserTable: groupSync.request.requestUserTable
};

Vue.prototype.requestRole = {
  requestRoleList: roleSync.request.requestRoleList,
  requestRoleUserList: roleSync.request.requestRoleUserList
};

Vue.prototype.requestMenu = {
  requestMenuTable: menuSync.request.requestMenuTable,
  requestTreeMenu: menuSync.request.requestTreeMenu
};

Vue.prototype.requestUser = {
  requestUserMgrList: userMgrSync.request.requestUserMgrList
};

Vue.prototype.requestObjType = {
  requestObjectTypeTable: objectTypeSync.request.requestObjectTypeTable,
  requestObjectTypeTree: objectTypeSync.request.requestObjectTypeTree
};

Vue.prototype.requestPerm = {
  requestPermCldTable: permissionSync.request.requestPermCldTable,
  requestPermTable: permissionSync.request.requestPermTable,
  requestPermTree: permissionSync.request.requestPermTree
};

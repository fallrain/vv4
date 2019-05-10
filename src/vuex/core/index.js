import menuTabsSync from './menu-tabs-sync';
import groupSync from './group-sync';
import userSync from './userInfo-sync';
import roleSync from './role-sync';
import menuSync from './menu-sync';
import userMgrSync from './user-sync';
import objectTypeSync from './objectType-sync';
import permissionSync from './permission-sync';

const coreSync = {
  menuTabsSync,
  groupSync,
  userSync,
  roleSync,
  menuSync,
  objectTypeSync,
  permissionSync,
  userMgrSync
};

export default coreSync;

import Vue from 'vue';
import { Message } from 'element-ui';
import qs from 'qs';
import gUtils from '../../../utils/gUtils.js';

function catchMessage(error) {
  // if (error.response.data.errorCode.indexOf('ogin') > 0) {
  //   Message({
  //     showClose: true,
  //     message: '请登录后操作',
  //     type: 'warning'
  //   })
  // } else {
  Message({
    showClose: true,
    message: `请求失败，status:${error.response.status}`,
    type: 'warning'
  });
  // }
  return [];
}

function returnMsg(resultMsg) {
  Message({
    showClose: true,
    message: resultMsg,
    type: 'warning'
  });
}

const request = {
  // 系统策略列表
  queryAllUser(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/auth/queryAllUser`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        returnMsg(data.data.msg);
        return [];
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 系统策略列表
  queryUserFuzzyMatch(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/auth/queryUserFuzzyMatch`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        returnMsg(data.data.msg);
        return [];
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 系统策略列表
  addUser(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/auth/addUser`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        if (data.data.msg) {
          returnMsg(data.data.msg);
        }
        return false;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 查看用户的用户来源标签
  getUserFromTag(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/auth/getUserFromTag`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        returnMsg(data.data.msg);
        return [];
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 修改用户信息
  updateUser(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/auth/updateUser`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        returnMsg(data.data.msg);
        return [];
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 停用
  disableUser(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/auth/disableUser`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        returnMsg(data.data.msg);
        return [];
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 启用
  enableUser(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/auth/enableUser`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        returnMsg(data.data.msg);
        return [];
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 1、显示所有角色列表 / 2、通过角色ID来查看角色详情
  queryAllRole(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/auth/queryAllRole`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        returnMsg(data.data.msg);
        return [];
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 新增角色
  addRole(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/auth/addRole`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        if (data.data.msg) {
          returnMsg(data.data.msg);
        }
        return false;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 修改角色
  updateRole(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/auth/updateRole`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        if (data.data.msg) {
          returnMsg(data.data.msg);
        }
        return false;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 删除角色
  deleteRole(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/auth/deleteRole`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        returnMsg(data.data.msg);
        return [];
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 查看该角色下的所有用户(角色管理界面使用)
  queryUserByRoleId(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/auth/queryUserByRoleId`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        returnMsg(data.data.msg);
        return [];
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 查看所有的对象类型
  queryRightList(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/auth/queryRightList`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        returnMsg(data.data.msg);
        return [];
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 查询对象类型的所有权限
  queryRight(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/auth/queryRight`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        returnMsg(data.data.msg);
        return [];
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 角色中添加用户(给用户赋予角色)
  addRoleUser(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/auth/addRoleUser`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        returnMsg(data.data.msg);
        return [];
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 从角色中移除用户
  removeUser(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/auth/removeUser`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        returnMsg(data.data.msg);
        return [];
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 保存权限,角色授权
  saveRight(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/auth/saveRight`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        returnMsg(data.data.msg);
        return [];
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 获取全部小微信息
  listVipProductAppealXiaoWei(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/auth/listVipProductAppealXiaoWei`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        returnMsg(data.data.msg);
        return [];
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 获取全部产业信息
  listVipRightsIndustry(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/auth/listVipRightsIndustry`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        returnMsg(data.data.msg);
        return [];
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 获取全部产业信息
  getIntegralCenterList(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/auth/getIntegralCenterList `, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        returnMsg(data.data.msg);
        return [];
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 查询有效的预算体编码
  queryJfShopBudgetByPage(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/auth/queryJfShopBudgetByPage`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        returnMsg(data.data.msg);
        return [];
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 创建新的预算体编码
  createJfShopBudget(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/auth/createJfShopBudget`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data;
        }
        returnMsg(data.data.msg);
        return [];
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 获取渠道信息
  listChannel(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/auth/listChannel`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data;
        }
        returnMsg(data.data.msg);
        return [];
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  }
};

export default {
  request
};

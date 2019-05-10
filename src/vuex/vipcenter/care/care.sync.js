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
  // 查询会员权益
  query(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/memberRights/query`, qs.stringify(data))
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
  // 查询当前可用的会员分组
  queryMemberGroup(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/memberRights/queryMemberGroup`, qs.stringify(data))
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
  // 添加会员权益
  add(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/memberRights/add`, data)
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        if (err.response.data.resultMsg && err.response.data.resultMsg) {
          returnMsg(err.response.data.resultMsg);
        } else {
          return catchMessage(err);
        }
      });
  },
  // 修改会员权益
  update(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/memberRights/update`, data)
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        if (err.response.data.resultMsg && err.response.data.resultMsg) {
          returnMsg(err.response.data.resultMsg);
        } else {
          return catchMessage(err);
        }
      });
  },
  // 查询会员权益详情
  queryDetail(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/memberRights/queryDetail`, qs.stringify(data))
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
  // 查询当前可用的会员等级
  queryMemberRank(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/memberRights/queryMemberRank`)
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
  // 活动管理
  // 获取活动列表
  list(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/activity/list`, data)
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
  deleteActivity(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/activity/delete`, qs.stringify(data))
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
  pauseActivity(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/activity/pause`, qs.stringify(data))
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
  startActivity(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/activity/start`, qs.stringify(data))
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
  // 获取活动详情
  getActivity(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/activity/getActivity`, qs.stringify(data))
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
  // 增加活动信息
  addActivity(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/activity/save`, data)
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        returnMsg(data.data.msg);
        return false;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 更新活动信息
  updateActivity(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/activity/update`, data)
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        returnMsg(data.data.msg);
        return false;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 查询模板
  getModel(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/common/getModel`, data)
      .then((data) => {
        if (data.data.isSuccess && data.data.data) {
          return data.data.data;
        }
        returnMsg(data.data.msg);
        return {
          entities: [],
          entityCount: 0
        };
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 保存活动流程
  saveFlow(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/activity/saveFlow`, data)
      .then((data) => {
        console.log('object', data);
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
  // 更新活动流程
  updateFlow(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/activity/updateFlow`, data)
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
  // 获取等级
  getRankCnt(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/rank/getRankCnt`, qs.stringify(data))
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
  // 获取活动场景列表
  listScene(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/activity/listScene`, qs.stringify(data))
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
  // 列出活动流程
  listFlow(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/activity/listFlow`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        if (data.data.msg) {
          returnMsg(data.data.msg);
        }
        return [];
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 分页查询正常分组
  queryGroup(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/vipMembersGroup/queryGroup`, qs.stringify(data))
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
  // 查询产品类别
  getAllProductCategory(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/memberRights/getAllProductCategory`, qs.stringify(data))
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
  // 查询产品类别
  // getAllProductCategory (data) {
  //   return gUtils.trsGetData().post(Vue.prototype.apiUrl + 'vipcenter/memberRights/getAllProductCategory', qs.stringify(data))
  //     .then(function (data) {
  //       if (data.data.isSuccess) {
  //         return data.data.data
  //       } else {
  //           returnMsg(data.data.msg)
  //         return []
  //       }
  //     }).catch(function (err) {
  //       console.warn(err)
  //       return catchMessage(err)
  //     })
  // },
  /**
   * 活动审核
   */
  // 活动审核列表
  listCheckedActivity(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/activity/listCheckedActivity`, data)
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
  // 活动审核
  checkActivity(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/activity/checkActivity`, qs.stringify(data))
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
  // 获取登录用户活动数目
  getActivityCount(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/activity/getActivityCount`, data)
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return {
          wait: 0,
          total: 0,
          finish: 0
        };
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 获取活动列表中参与人数
  getUserCountByActivityIds(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/activity/getUserCountByActivityIds`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        returnMsg(data.data.msg);
        return false;
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

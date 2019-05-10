import Vue from 'vue';
import { Message } from 'element-ui';
import qs from 'qs';
import gUtils from '../../../utils/gUtils.js';

function catchMessage(error) {
  console.log(error);
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
  queryPageByBrand(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/systemStrategy/queryPageByBrand`, qs.stringify(data))
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
  // 新增系统策略
  insertSystemStrategy(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/systemStrategy/insertSystemStrategy`, data)
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        returnMsg(data.data.resultMsg);
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
  // 根据id和brandName获得策略对象
  findById(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/systemStrategy/findById`, qs.stringify(data))
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
  // 改变状态
  systemChangeStatus(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/systemStrategy/changeStatus`, qs.stringify(data))
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
  // 修改系统策略
  updateSystemStrategy(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/systemStrategy/updateSystemStrategy`, data)
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        returnMsg(data.data.resultMsg);
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
  // 等级策略列表
  rankQueryPageByBrand(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/rank/queryPageByBrand`, qs.stringify(data))
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
  // 改变状态
  rankChangeStatus(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/rank/changeStatus`, qs.stringify(data))
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
  // 根据id和brandName获得策略对象
  rankFindById(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/rank/findById`, qs.stringify(data))
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
  // 新增等级策略
  insertRank(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/rank/insertRank`, data)
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
  // 修改等级策略
  updateRank(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/rank/updateRank`, data)
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
  // 成长值策略列表
  growUpQueryPageByBrand(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/growUp/queryPageByBrand`, qs.stringify(data))
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
  // 新增成长值策略
  insertGrowUp(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/growUp/insertGrowUp`, data)
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
        if (err.response.data.resultMsg && err.response.data.resultMsg) {
          returnMsg(err.response.data.resultMsg);
        } else {
          return catchMessage(err);
        }
      });
  },
  // 修改成长值策略
  updateStrategy(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/growUp/updateStrategy`, data)
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        returnMsg(data.data.resultMsg);
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

  // 根据id和brandName获得策略对象
  growUpQueryById(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/growUp/queryById`, qs.stringify(data))
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
  // 改变状态
  growUpChangeStatus(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/growUp/changeStatus`, qs.stringify(data))
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
  // 改变状态
  changeScale(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/growUp/changeScale`, qs.stringify(data))
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
  // 分页查询模板列表
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
  // 改变状态
  ssoLogin(data) {
    return gUtils
      .trsGetData()
      .post('https://point.haier.net/api/user/ssologin_passless', qs.stringify(data))
      .then((data) => {
        if (data.data.success) {
          return data.data.result;
        }
        returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 权益详情
  getStatisticsInfoByRightId(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/getStatisticsInfoByRightId`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data;
        }
        returnMsg(data.data.msg);
        return data.data;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 根据中国区权益id获取中国区分配小微权益统计信息
  getChinaRegionRightsByChinaRightId(data) {
    return gUtils
      .trsGetData()
      .post(
        `${Vue.prototype.apiUrl}vipcenter/ChinaRegionRightsController/getChinaRegionRightsByChinaRightId`,
        qs.stringify(data)
      )
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

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
  // 首页近两周活动提醒数据
  getHomeActivityData(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/userSet/getActivityReport`, qs.stringify(data))
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
  // 首页会员分析图表数据
  getHomeVipAnalData(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/vipTaskUserReport/getMapData`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return [];
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 首页会员漏斗图表数据
  getHomeVipData(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/vipTaskRankReport/getMemberFunnelData`, qs.stringify(data))
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
  // 会员价值报表查询表格数据
  getVipCostlineData(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/vipTaskRankReport/getMapData`, qs.stringify(data))
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
  // 会员价值报表查询表格数据
  getVipCostTableData(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/vipTaskRankReport/getTableData`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return [];
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 金银卡转化报表查询表格数据
  getTableData(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/cardTransForm/getTableData`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return [];
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 金银卡转化报表查询柱状图数据
  getMapData(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/cardTransForm/getMapData`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
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
      .post(`${Vue.prototype.apiUrl}vipcenter/memberRights/queryMemberGroup`, data)
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
  // 查询各种统计数据
  getStatisticsNumData(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/vipTaskRankReport/getStatisticsNumData`, qs.stringify(data))
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
  getMemberFunnelData(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/vipTaskRankReport/getMemberFunnelData`, qs.stringify(data))
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
  // 查询用户订单数据
  getOrderData(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/dealordermanager/queryOrder`, data)
      .then((data) => {
        if (!data.data.isSuccess) {
          returnMsg(data.data.msg);
        }
        return data.data;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 查询用户订单详情
  getOrderDetails(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/dealordermanager/queryOrderInfo`, data)
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
  // 查询用户产品绑定情况
  getBindData(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/dealordermanager/queryRegProduct`, data)
      .then((data) => {
        if (!data.data.isSuccess) {
          returnMsg(data.data.msg);
        }
        return data.data;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 解绑用户产品
  delBindData(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/dealordermanager/deleteRegProduct`, data)
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
  // 删除用户订单
  delOrderData(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/dealordermanager/deleteOrder`, data)
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
  // 按时间查询用户订单
  getTimeOrderData(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/dealordermanager/queryOrderByTime`, qs.stringify(data))
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
  // 检索订单详情
  getSellersOrderData(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/dealordermanager/querySellersOrder`, data)
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
  // 查询权益活动名称
  getRightsName(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/dealordermanager/queryAllRightName`, qs.stringify(data))
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
  // 根据权益id查询礼品名称
  getGiftNameByRightsname(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/dealordermanager/queryRightGiftInfo`, qs.stringify(data))
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
  // 查询小微id
  queryxiaoweiId(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/dealordermanager/queryxiaoweiId`, qs.stringify(data))
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
  // 插入网页
  getUserToken(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/report/getUserToken`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data;
        }
        return data.data;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 强制激活
  activitedRight(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/dealordermanager/activitedRight`, qs.stringify(data))
      .then((data) => {
        if (!data.data.isSuccess) {
          returnMsg(data.data.msg);
        }
        return data.data;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 检索产品
  queryProduct(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/dealordermanager/queryProduct`, qs.stringify(data))
      .then((data) => {
        if (!data.data.isSuccess) {
          returnMsg(data.data.msg);
        }
        return data.data;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 修改价格
  updateBccPrice(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/dealordermanager/updateBccPrice`, qs.stringify(data))
      .then((data) => {
        if (!data.data.isSuccess) {
          returnMsg(data.data.msg);
        }
        return data.data;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 获取小微列表
  getXiaoWeiList(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter//vipDirectSellerAdviser/getXiaoWeiList`, qs.stringify(data))
      .then((data) => {
        if (!data.data.isSuccess) {
          returnMsg(data.data.msg);
        }
        return data.data;
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

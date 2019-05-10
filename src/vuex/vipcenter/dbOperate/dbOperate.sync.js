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
    message: '请求失败',
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
  // 判断是否是中国大区
  isChian(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/ChinaRegionRightsController/isChian`, data)
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
  // 保存权益信息
  saveNextOrderRights(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/saveNextOrderRights`, data)
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
  // 保存权益信息--中国大区-小微
  saveXwNextOrderRights(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/ChinaRegionWxRightsController/saveNextOrderRights`, data)
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data;
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
  // 查询小微配置渠道信息--中国大区-小微
  getDetailByRightsId(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/getDetailByRightsId`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data;
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
  // 保存权益信息--中国大区
  saveChinaNextOrderRights(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/ChinaRegionRightsController/saveNextOrderRights`, data)
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
  // 保存权益信息--中国大区-小微
  saveXwNextOrderRights(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/ChinaRegionWxRightsController/saveNextOrderRights`, data)
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data;
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
  // 点击暂存保存修改服务
  saveMomentOrderRights(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/saveMomentOrderRights`, data)
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
  // 点击暂存保存修改服务--中国大区
  saveChinaMomentOrderRights(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/ChinaRegionRightsController/saveMomentRights`, data)
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
  // 点击下载模版--中国大区
  downloadRightsFile(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/BatchAssignController/downloadRightsFile`, qs.stringify(data))
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
  // 根据id获取订单权益信息
  getOrderRightsById(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/getOrderRightsById`, qs.stringify(data))
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
  // 根据id获取订单权益信息--中国大区
  getRightsById(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/ChinaRegionRightsController/getRightsById`, qs.stringify(data))
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
  // 获取小微城市信息
  listArea(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/listArea`, qs.stringify(data))
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
  // 根据渠道类型获取渠道信息
  listChannelById(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/listChannelById`, qs.stringify(data))
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
  // 获取产业信息
  listIndustry(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/listIndustry`, qs.stringify(data))
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
  // 在直销员评星中获取产业信息
  listSellersProduct(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/HumanTransformationController/listSellersProduct`, qs.stringify(data))
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
  // 根据小微和渠道模糊查询店铺信息
  listShopInfo(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/listShopInfo`, qs.stringify(data))
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
  // 获取权益信息列表页
  listOrderRights(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/listOrderRights`, data)
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return false;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 获取权益信息列表页--中国大区
  pageListRights(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/ChinaRegionRightsController/pageListRights`, data)
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return false;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 获取审核列表页--中国大区
  pageAuditList(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/ChinaRegionRightsController/pageAuditList`, data)
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
  // 根据id暂停活动
  pauseOrderRights(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/pauseOrderRights`, qs.stringify(data))
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
  // 根据id开启活动
  startOrderRights(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/startOrderRights`, qs.stringify(data))
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
  // 根据id逻辑删除
  deleteOrderRights(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/deleteOrderRights`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data;
        }
        returnMsg(data.data.msg);
        return false;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 根据id逻辑删除--中国大区
  deleteRightsById(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/ChinaRegionRightsController/deleteRightsById`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data;
        }
        returnMsg(data.data.msg);
        return false;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 根据id通过审核
  updateAuditStatus(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/updateAuditStatus`, qs.stringify(data))
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
  // 根据id通过审核--中国大区
  updateChinaAuditStatus(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/ChinaRegionRightsController/updateAuditStatus`, qs.stringify(data))
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
  // 获取各状态数量
  getStatusCount(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/getStatusCount`, data)
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
  // 获取各状态数量--中国大区
  getCount(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/ChinaRegionRightsController/getCount`, data)
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return false;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 获取审核列表
  listCheckedOrderRights(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/listCheckedOrderRights`, data)
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
  // 获取审核列表
  listProductInfo(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/listProductInfo`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return false;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  listProductInfoNew(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/listProductInfoNew`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return false;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 获取权益冲突列表
  listRepeatRights(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/listRepeatRights`, qs.stringify(data))
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
  // 获取中国区权益详情
  getChinaDetailById(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/ChinaRegionRightsController/getChinaDetailById`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data;
        }
        returnMsg(data.data.msg);
        return false;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 获取中国区权益--小微详情
  getDetailByRightsId(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/getDetailByRightsId`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data;
        }
        returnMsg(data.data.msg);
        return false;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 获取中国区权益详情--套购详情
  getScoreNum(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/ChinaRegionRightsController/getScoreNum`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data;
        }
        returnMsg(data.data.msg);
        return false;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 获取中国区权益详情--小微--套购详情
  getXwScoreNum(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/getScoreNum`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data;
        }
        returnMsg(data.data.msg);
        return false;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 根据产品编码获取推荐礼品
  listRecommendGift(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/listRecommendGift`, qs.stringify(data))
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
  // 根据检索词查询自定义礼品信息
  listRecommendGiftByKeyWords(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/listRecommendGiftByKeyWords`, qs.stringify(data))
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
  // 获取首页状态数
  getFinishCount(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/getFinishCount`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return false;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 获取待办数量
  getWaitCount(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/getWaitCount`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return false;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 跳转页面 1-权益列表页 2-审核列表页
  listCheckedOrRights(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/listCheckedOrRights`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return false;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 获取权益成本信息
  getCostAmountByGiftConfig(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/getCostAmountByGiftConfig`, qs.stringify(data))
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
  // 获取权益成本信息--中国大区
  getCostAmountByChinaGiftConfig(data) {
    return gUtils
      .trsGetData()
      .post(
        `${Vue.prototype.apiUrl}vipcenter/ChinaRegionRightsController/getCostAmountByGiftConfig`,
        qs.stringify(data)
      )
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return false;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 获取权益成本信息--中国大区-小微
  getCostAmount(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/ChinaRegionWxRightsController/getCostAmount`, qs.stringify(data))
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
  // 获取余额
  getRemainAmount(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/getRemainAmount`, qs.stringify(data))
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
  // 单品统计信息
  getStatisticsInfo(data) {
    return gUtils
      .trsGetData()
      .post(
        `${Vue.prototype.apiUrl}vipcenter/orderRights/getStatisticsInfoByRightIdForSingleProduct`,
        qs.stringify(data)
      )
      .then(data => data.data)
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 单品权益导表
  exportStatisticsInfo(data) {
    return gUtils
      .trsGetData()
      .post(
        `${Vue.prototype.apiUrl}vipcenter/orderRights/exportStatisticsInfoByRightIdForSingleProduct`,
        qs.stringify(data)
      )
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
  // 联合配置详情导表
  exportChinaDetails(data) {
    return gUtils
      .trsGetData()
      .post(
        `${Vue.prototype.apiUrl}vipcenter/ChinaRegionRightsController/exportChinaRegionRightsByChinaRightId`,
        qs.stringify(data)
      )
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
  // 详情
  getStatisticsInfoForCoupleProduct(data) {
    return gUtils
      .trsGetData()
      .post(
        `${Vue.prototype.apiUrl}vipcenter/orderRights/getStatisticsInfoByRightIdForCoupleProductBuyNum`,
        qs.stringify(data)
      )
      .then(data => data.data)
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 详情
  exportStatisticsInfoForCoupleProduct(data) {
    return gUtils
      .trsGetData()
      .post(
        `${Vue.prototype.apiUrl}vipcenter/orderRights/exportStatisticsInfoByRightIdForCoupleProductBuyNum`,
        qs.stringify(data)
      )
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
  // 下载门店excel
  exportShopTemplet(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/BatchAssignController/exportShopTemplet`, qs.stringify(data))
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
  // 独立配置修改时间
  updateRightEndTime(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/updateRightEndTime`, qs.stringify(data))
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
  // 小微联合修改时间
  updateRightEndTimeChina(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/ChinaRegionRightsController/updateRightEndTime `, qs.stringify(data))
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
  // 获取积分余额
  getRemainMoney(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/getRemainMoney`, qs.stringify(data))
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
  // 获取渠道信息
  listChannel(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/HumanTransformationController/listChannel`, qs.stringify(data))
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
  getXiaoWeiList(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/xiaoWeiGroup/queryXwAll`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data;
        }
        returnMsg(data.data.msg);
        return false;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },

  getXiaoWeiGroupList(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/xiaoWeiGroup/queryXwGroupAll`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data;
        }
        returnMsg(data.data.msg);
        return false;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },

  getQuDaoList(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/orderRights/listChannelById`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data;
        }
        returnMsg(data.data.msg);
        return false;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },

  getDirectSellers(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/sellerGroupr/querySellerGroupAll`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data;
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

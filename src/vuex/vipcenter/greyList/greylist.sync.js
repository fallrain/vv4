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
  // 直销员灰名单查询
  pageQuerySellersGreyList(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/sellersGreyListController/pageQuerySellersGreyList`, qs.stringify(data))
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
  // 直销员冻结
  frozenSellers(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/sellersGreyListController/frozenSellers`, qs.stringify(data))
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
  // 直销员解冻
  trawSellers(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/sellersGreyListController/trawSellers`, qs.stringify(data))
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
  // 直销员灰名单设置记录
  pageQuerySellersGreyListRecord(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/sellersGreyListController/pageQuerySellersGreyList`, qs.stringify(data))
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

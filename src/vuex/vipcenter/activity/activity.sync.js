import Vue from 'vue';
import { Message } from 'element-ui';
import qs from 'qs';
import gUtils from '../../../utils/gUtils.js';

function catchMessage(error) {
  Message({
    showClose: true,
    message: `请求失败，status:${error.response.status}`,
    type: 'warning'
  });
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
  // 查询抽奖活动
  getLuckyData(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/ActivityLuckeyDrawController/listActivityLuckeyDraw`, data)
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
  // 查看抽奖活动详情
  getLuckyDetails(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/ActivityLuckeyDrawController/getActivityLuckeyDrawById`, qs.stringify(data))
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
  // 新增抽奖活动
  saveLuckyDetails(data) {
    return gUtils.trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/ActivityLuckeyDrawController/saveActivityLuckeyDraw`, data)
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
  // 修改抽奖活动详情
  updateLuckyDetails(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/ActivityLuckeyDrawController/updateActivityLuckeyDraw`, data)
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
  // 修改抽奖活动状态
  updateLuckyStatus(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/ActivityLuckeyDrawController/updateActivityLuckeyDrawStatus`, qs.stringify(data))
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
  // 抽奖活动详情存草稿
  draftLuckyDetails(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/ActivityLuckeyDrawController/saveDraft`, data)
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

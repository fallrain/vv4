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
  // 增加短信模板
  smsAdd(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/sms/add`, data)
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
  // 发送预览
  smsSendTest(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/sms/sendTest`, data)
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
  // 更新短信模板
  smsUpdate(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/sms/update`, data)
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
  // 生成短链接
  smsShort(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/sms/short`, qs.stringify(data))
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
  // 获取短信分页
  smsSearch(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/sms/search`, data)
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
  // 根据id获取详情
  smsGet(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/sms/get`, qs.stringify(data))
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
  // 逻辑删除短信模板
  smsDelete(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/sms/delete`, qs.stringify(data))
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
  // 分页查询微信列表
  weChatSearch(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/weChat/search`, data)
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
  // 增加微信模板
  weChatAdd(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/weChat/add`, data)
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
        if (err.response.data.resultMsg && err.response.data.resultMsg) {
          returnMsg(err.response.data.resultMsg);
        } else {
          return catchMessage(err);
        }
      });
  },
  // 更新微信模板
  weChatUpdate(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/weChat/update`, data)
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
        if (err.response.data.resultMsg && err.response.data.resultMsg) {
          returnMsg(err.response.data.resultMsg);
        } else {
          return catchMessage(err);
        }
      });
  },
  // 根据id获取详情
  weChatGet(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/weChat/get`, qs.stringify(data))
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
  // 逻辑删除微信模板
  weChatDelete(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/weChat/delete`, qs.stringify(data))
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
  // 微信模板发送预览
  weChatSendTest(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/weChat/sendTest`, data)
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
  // 分页查询邮件列表
  emailSearch(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/email/search`, data)
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
  // 增加邮件模板
  emailAdd(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/email/add`, data)
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
        if (err.response.data.resultMsg && err.response.data.resultMsg) {
          returnMsg(err.response.data.resultMsg);
        } else {
          return catchMessage(err);
        }
      });
  },
  // 更新邮件模板
  emailUpdate(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/email/update`, data)
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
        if (err.response.data.resultMsg && err.response.data.resultMsg) {
          returnMsg(err.response.data.resultMsg);
        } else {
          return catchMessage(err);
        }
      });
  },
  // 发布预览
  emailSendTest(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/email/sendTest`, data)
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
        if (err.response.data.resultMsg && err.response.data.resultMsg) {
          returnMsg(err.response.data.resultMsg);
        } else {
          return catchMessage(err);
        }
      });
  },
  // 根据id获取详情
  emailGet(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/email/get`, qs.stringify(data))
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
  // 逻辑删除邮件模板
  emailDelete(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/email/delete`, qs.stringify(data))
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
  // 分页查询站内信列表
  siteMsgSearch(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/siteMsg/search`, data)
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
  // 增加站内信模板
  siteMsgAdd(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/siteMsg/add`, data)
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
        if (err.response.data.resultMsg && err.response.data.resultMsg) {
          returnMsg(err.response.data.resultMsg);
        } else {
          return catchMessage(err);
        }
      });
  },
  // 更新站内信模板
  siteMsgUpdate(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/siteMsg/update`, data)
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
        if (err.response.data.resultMsg && err.response.data.resultMsg) {
          returnMsg(err.response.data.resultMsg);
        } else {
          return catchMessage(err);
        }
      });
  },
  // 根据id获取详情
  siteMsgGet(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/siteMsg/get`, qs.stringify(data))
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
  // 逻辑删除站内信模板
  siteMsgDelete(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/siteMsg/delete`, qs.stringify(data))
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
  // 获取应用
  getApp(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/siteMsg/getApp`, qs.stringify(data))
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
  // 发送限制管理
  limitQuery(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/limit/query`, qs.stringify(data))
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
  limitSave(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/limit/save`, data)
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
  }
};

export default {
  request
};

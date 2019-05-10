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
    message: '请求失败，status:',
    type: 'warning'
  });
  // }
  return false;
}

function returnMsg(resultMsg) {
  Message({
    showClose: true,
    message: resultMsg,
    type: 'warning'
  });
}

const request = {
  // 分页查询客服用户
  queryCustomer(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/customer/queryCustomer`, data)
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
  // 逻辑删除客服分组
  deleteGroup(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/customer/deleteGroup`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return true;
        }
        returnMsg(data.data.msg);
        return false;
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 增加客服用户
  addCustomer(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/customer/addCustomer`, data)
      .then((data) => {
        if (data.data.isSuccess) {
          return true;
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
  // 逻辑删除客服用户
  deleteCustomer(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/customer/deleteCustomer`, qs.stringify(data))
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
  // 分页查询客服分组
  queryGroup(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/customer/queryGroup`, data)
      .then((data) => {
        if (data.data.data && data.data.isSuccess) {
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
  // 增加客服分组
  addGroup(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/customer/addGroup`, data)
      .then((data) => {
        if (data.data.data && data.data.isSuccess) {
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
  // 修改客服分组
  updateGroup(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/customer/updateGroup`, data)
      .then((data) => {
        if (data.data.data && data.data.isSuccess) {
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

  // 查询知识管理
  queryQA(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/customer/queryQA`, data)
      .then((data) => {
        if (data.data.data && data.data.isSuccess) {
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
  // 增加知识
  addQA(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/customer/addQA`, data)
      .then((data) => {
        if (data.data.data && data.data.isSuccess) {
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
  updateQA(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/customer/updateQA`, data)
      .then((data) => {
        if (data.data.data && data.data.isSuccess) {
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
  // 删除知识
  deleteQA(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/customer/deleteQA`, qs.stringify(data))
      .then((data) => {
        if (data.data.data && data.data.isSuccess) {
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
  // 查询历史问题模板
  historyQA(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/customer/historyQA`, data)
      .then((data) => {
        if (data.data.data && data.data.isSuccess) {
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
  // 发送通知
  sendNotice(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/customer/sendNotice`, data)
      .then((data) => {
        if (data.data.data && data.data.isSuccess) {
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
  // 查询发送历史问答模板详情
  getHistoryQA(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/customer/getHistoryQA`, qs.stringify(data))
      .then((data) => {
        if (data.data.data && data.data.isSuccess) {
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
  // 获取分组详情
  getGroup(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/customer/getGroup`, qs.stringify(data))
      .then((data) => {
        if (data.data.data && data.data.isSuccess) {
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
  // 获取邮件模板列表
  listCustomerEmail(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/customer/listCustomerEmail`, data)
      .then((data) => {
        if (data.data.data && data.data.isSuccess) {
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
  // 保存邮件模板
  addCustomerEmail(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/customer/addCustomerEmail`, data)
      .then((data) => {
        if (data.data.data && data.data.isSuccess) {
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
  // 保存邮件模板
  updateCustomerEmail(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/customer/updateCustomerEmail`, data)
      .then((data) => {
        if (data.data.data && data.data.isSuccess) {
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
  // 删除邮件模板
  deleteCustomerEmail(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/customer/deleteCustomerEmail`, qs.stringify(data))
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
  // 查询邮件模板
  getCustomerEmail(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/customer/getCustomerEmail`, qs.stringify(data))
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
  // 查询分类列表
  queryQACategory(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/customer/queryQACategory`, data)
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
  // 新建分类
  addQACategory(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/customer/addQACategory`, data)
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
  // 评价并联查询
  pageResearchConfigTmGd(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/ResearchConfigTmGdController/pageResearchConfigTmGd`, qs.stringify(data))
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
  // 评价导出excel
  exportEvaluate(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/ResearchConfigTmGdController/exportEvaluate`, qs.stringify(data))
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
  // 模板下载
  exportEvaluateTemplate(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/ResearchConfigTmGdController/exportEvaluateTemplate`, qs.stringify(data))
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
  // 获取大类一二级对应关系
  getDeptInfo(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/VipCasartePriceController/getDeptInfo`, qs.stringify(data))
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
  // 获取大类一二级对应关系
  getPageVipCasartePrice(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/VipCasartePriceController/getPageVipCasartePrice`, data)
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
  // 修改价格状态
  updateStatus(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/VipCasartePriceController/updateStatus`, qs.stringify(data))
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
  // 根据9位码获取产品描述
  getProductDescByMdm(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/VipCasartePriceController/getProductDescByMdm`, qs.stringify(data))
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
  // 保存卡萨帝产品价格
  saveVipCasartePrice(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/VipCasartePriceController/saveVipCasartePrice`, data)
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
  // 根据型号模糊检索产品信息
  getProductInfoByMdm(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/VipCasartePriceController/getProductInfoByMdm`, qs.stringify(data))
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
  // 更新卡萨帝产品价格
  updateVipCasartePrice(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/VipCasartePriceController/updateVipCasartePrice`, data)
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

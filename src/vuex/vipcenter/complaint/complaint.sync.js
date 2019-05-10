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
  list(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/productappeal/list`, data)
      .then(data => data.data)
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  assign(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/productappeal/assign`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  audit(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/productappeal/audit`, qs.stringify(data))
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
  del(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/productappeal/del`, data)
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  listxiaowei(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/productappeal/listxiaowei`, data)
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  listxiaoweiname(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/productappeal/listxiaoweiname`, data)
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  contentSave(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/content/save`, data)
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
  listlabel(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/content/listlabel`, data)
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 获取产品大类列表列表
  listProductCategory(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/content/listProductCategory`, data)
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 根据栏目id获取文章内容
  listContentByColumnId(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/content/listContentByColumnId`, data)
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
  // 根据id获取文章内容
  getContentById(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/content/getContentById`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 修改内容信息
  updateContent(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/content/updateContent`, data)
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 根据id逻辑删除文章信息
  contentDel(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/content/del`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 修改企业咨询推荐状态
  updateCommend(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/content/updateCommend`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 展示权益列表
  wechatRightsList(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/wechatrights/list`, data)
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
  // 添加权益信息
  wechatRightsSave(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/wechatrights/save`, data)
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 修改权益信息
  wechatRightsUpdate(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/wechatrights/update`, data)
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 获取等级信息
  queryRank(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/wechatrights/queryRank`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 根据id获取权益信息
  getWechatRightsById(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/wechatrights/getWechatRightsById`, qs.stringify(data))
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
  // 根据id逻辑删除权益信息
  wechatRightDelete(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/wechatrights/del`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 分页展示权益优惠券信息
  wechatRightsCardList(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/wechatRightCard/list`, data)
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
  // 保存权益优惠券信息
  wechatRightCardSave(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/wechatRightCard/save`, data)
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 修改权益信息
  wechatRightCardUpdate(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/wechatRightCard/update`, data)
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 根据id获取权益优惠券信息
  getWechatRightsCardById(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/wechatRightCard/getWechatRightsCardById`, qs.stringify(data))
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
  // 根据id逻辑删除权益优惠券信息
  wechatRightCardDelete(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/wechatRightCard/delete`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 修改权益优惠券状态信息
  updateRightStatus(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/wechatRightCard/updateRightStatus`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 根据id获取文章二维码
  getQRCodeById(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/content/getQRCodeById`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 获取banner图列表
  listContentBanner(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/contentBanner/listContentBanner`, data)
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 根据id逻辑删除banner图信息
  deleteContentBanner(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/contentBanner/deleteContentBanner`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 根据id获取banner图信息
  getContentBannerById(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/contentBanner/getContentBannerById`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 保存banner图信息
  saveContentBanner(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/contentBanner/saveContentBanner`, data)
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 修改banner图信息
  updateContentBanner(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/contentBanner/updateContentBanner`, data)
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 修改banner图上下架状态
  updateStatus(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/contentBanner/updateStatus`, qs.stringify(data))
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 保存banner图信息
  saveAddpoint(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/addpointmanager/addpoint`, data)
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
  // 查询套购积分
  querytgPoint(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/addpointmanager/query`, data)
      .then((data) => {
        if (data.data.isSuccess) {
          return data.data.data;
        }
        return returnMsg(data.data.msg);
      })
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 新增开门红
  saveOpenRed(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/UploadPicController/saveUploadPic`, data)
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
  // 获取开门红列表
  getOpenList(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/UploadPicController/listUploadPicQo`, data)
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
  // 根据id查找开门红
  getOpenRedById(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/UploadPicController/getUploadPicById`, qs.stringify(data))
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
  // 修改开门红
  udateOpenRed(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/UploadPicController/updateUploadPic`, data)
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
  // 删除开门红
  deleteOpenRed(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/UploadPicController/deleteUploadPic`, qs.stringify(data))
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
  // 卡萨帝产品注册
  casatelist(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/regproduct/list`, data)
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
  // 释放卡萨帝产品序列号
  casaterelease(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/regproduct/release`, qs.stringify(data))
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
  // 兑呗操作指导保存栏目
  saveUseHelpColumn(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/UseHelpController/saveUseHelpColumn`, data)
      .then(data => data.data)
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 兑呗操作指导查询栏目
  selectUseHelpColumn(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/UseHelpController/selectUseHelpColumn`, data)
      .then(data => data.data)
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 兑呗操作指导删除栏目
  deleteUseHelpColumnAndTitle(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/UseHelpController/deleteUseHelpColumnAndTitle`, qs.stringify(data))
      .then(data => data.data)
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 保存兑呗操作指导
  saveUseHelpTitle(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/UseHelpController/saveUseHelpTitle`, data)
      .then(data => data.data)
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 查询兑呗操作指导
  selectAllUseHelpTitle(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/UseHelpController/selectAllUseHelpTitle`, qs.stringify(data))
      .then(data => data.data)
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 修改兑呗操作指导状态
  deleteUseHelpTitle(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/UseHelpController/deleteUseHelpTitle`, qs.stringify(data))
      .then(data => data.data)
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 根据id查询兑呗操作指导状态
  selectUseHelpTitle(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/UseHelpController/selectUseHelpTitle`, qs.stringify(data))
      .then(data => data.data)
      .catch((err) => {
        console.warn(err);
        return catchMessage(err);
      });
  },
  // 查询直销员信息
  pageSellersInfo(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/HumanTransformationController/pageSellersInfo`, data)
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
  // 审批直销员
  ratingSellers(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/HumanTransformationController/ratingSellers`, qs.stringify(data))
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
  // 导出
  exportSellersInfo(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/HumanTransformationController/exportSellersInfo`, data)
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
  // 分页查询消息
  selectAllMessageRemindingTitle(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/MessageRemindingTitleController/selectAllMessageRemindingTitle`, data)
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
  // 修改消息状态
  deleteMessageRemindingTitle(data) {
    return gUtils
      .trsGetData()
      .post(
        `${Vue.prototype.apiUrl}vipcenter/MessageRemindingTitleController/deleteMessageRemindingTitle`,
        qs.stringify(data)
      )
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
  // 查询消息详情
  selectMessageRemindingTitle(data) {
    return gUtils
      .trsGetData()
      .post(
        `${Vue.prototype.apiUrl}vipcenter/MessageRemindingTitleController/selectMessageRemindingTitle`,
        qs.stringify(data)
      )
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
  // 获取消息栏目
  selectMessageRemindingColumn(data) {
    return gUtils
      .trsGetData()
      .post(
        `${Vue.prototype.apiUrl}vipcenter/MessageRemindingColumnController/selectMessageRemindingColumn`,
        qs.stringify(data)
      )
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
  // 修改消息栏目
  saveMessageRemindingColumn(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/MessageRemindingColumnController/saveMessageRemindingColumn`, data)
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
  // 删除消息栏目
  deleteMessageRemindingColumnAndTitle(data) {
    return gUtils
      .trsGetData()
      .post(
        `${Vue.prototype.apiUrl}vipcenter/MessageRemindingColumnController/deleteMessageRemindingColumnAndTitle`,
        qs.stringify(data)
      )
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
  // 保存修改消息
  saveMessageRemindingTitle(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/MessageRemindingTitleController/saveMessageRemindingTitle`, data)
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
  // 获取直销员模范顾问列表
  getAdviserList(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/vipDirectSellerAdviser/getAdviserList`, data)
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
  // 新增直销员模范顾问
  addAdviser(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/vipDirectSellerAdviser/addAdviser`, data)
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
  // 获取直销员模范顾问详情
  getAdviserDetail(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/vipDirectSellerAdviser/getAdviserDetail`, qs.stringify(data))
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
  // 更新直销员模范顾问状态
  updateAdviserStatus(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/vipDirectSellerAdviser/updateAdviserStatus`, data)
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
  // 逻辑删除直销员模范顾问
  deleteAdviser(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/vipDirectSellerAdviser/deleteAdviser`, qs.stringify(data))
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
  // 修改直销员模范顾问
  updateAdviser(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/vipDirectSellerAdviser/updateAdviser`, data)
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
  // 新增直销员星级升级路径
  addStarUp(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/vipDirectSellerStarUp/addStarUp`, data)
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
  // 获取直销员星级升级路径列表
  getStarUpList(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/vipDirectSellerStarUp/getStarUpList`, data)
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
  // 逻辑删除直销员星级升级路径
  deleteStarUp(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/vipDirectSellerStarUp/deleteStarUp`, qs.stringify(data))
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
  // 更新直销员星级升级路径状态
  updateStarUpStatus(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/vipDirectSellerStarUp/updateStarUpStatus`, data)
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
  // 获取直销员星级升级路径详情
  getStarUpDetail(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/vipDirectSellerStarUp/getStarUpDetail`, qs.stringify(data))
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
  // 更新直销员星级升级路径
  updateStarUp(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/vipDirectSellerStarUp/updateStarUp`, data)
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
  // 是有已有该直销员星级升级路径
  isThereStarUp(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/vipDirectSellerStarUp/isThereStarUp`, qs.stringify(data))
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
  // 自定义发送消息提醒
  customSendReminding(data) {
    return gUtils
      .trsGetData()
      .post(`${Vue.prototype.apiUrl}vipcenter/MessageRemindingTitleController/customSendReminding`, data)
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

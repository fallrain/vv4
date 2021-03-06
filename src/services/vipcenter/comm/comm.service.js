import Vue from 'vue';
import commSync from '../../../vuex/vipcenter/comm/comm.sync';
import serviceSync from '../../../vuex/vipcenter/service/service.sync';
import strategySync from '../../../vuex/vipcenter/strategy/strategy.sync';
import careSync from '../../../vuex/vipcenter/care/care.sync';
import vipSync from '../../../vuex/vipcenter/vip/vip.sync';
import powerSync from '../../../vuex/vipcenter/power/power.sync';
import reportSync from '../../../vuex/vipcenter/report/report.sync';
import complaintSync from '../../../vuex/vipcenter/complaint/complaint.sync';
import rightsSync from '../../../vuex/vipcenter/rights/rights.sync';
import activitySync from '../../../vuex/vipcenter/activity/activity.sync';
import managementSync from '../../../vuex/vipcenter/management/management.sync';
import greylistSync from '../../../vuex/vipcenter/greyList/greylist.sync';

// 灰名单设置
Vue.prototype.requesgreyList = {
  pageQuerySellersGreyList: greylistSync.request.pageQuerySellersGreyList,
  frozenSellers: greylistSync.request.frozenSellers,
  trawSellers: greylistSync.request.trawSellers,
  pageQuerySellersGreyListRecord: greylistSync.request.pageQuerySellersGreyListRecord
};

// 权益
Vue.prototype.requestRights = {
  isChian: rightsSync.request.isChian,
  saveNextOrderRights: rightsSync.request.saveNextOrderRights,
  saveXwNextOrderRights: rightsSync.request.saveXwNextOrderRights,
  saveChinaNextOrderRights: rightsSync.request.saveChinaNextOrderRights,
  getDetailByRightsId: rightsSync.request.getDetailByRightsId,
  getOrderRightsById: rightsSync.request.getOrderRightsById,
  getRightsById: rightsSync.request.getRightsById,
  getHonorEnjoyCards: rightsSync.request.getHonorEnjoyCards,
  listArea: rightsSync.request.listArea,
  listChannelById: rightsSync.request.listChannelById,
  listIndustry: rightsSync.request.listIndustry,
  listSellersProduct: rightsSync.request.listSellersProduct,
  listShopInfo: rightsSync.request.listShopInfo,
  listOrderRights: rightsSync.request.listOrderRights,
  pageListRights: rightsSync.request.pageListRights,
  pageAuditList: rightsSync.request.pageAuditList,
  getStatusCount: rightsSync.request.getStatusCount,
  getCount: rightsSync.request.getCount,
  listCheckedOrderRights: rightsSync.request.listCheckedOrderRights,
  listProductInfo: rightsSync.request.listProductInfo,
  listProductInfoNew: rightsSync.request.listProductInfoNew,
  listRepeatRights: rightsSync.request.listRepeatRights,
  getChinaDetailById: rightsSync.request.getChinaDetailById,
  getXiaoWeiList: rightsSync.request.getXiaoWeiList,
  getXiaoWeiGroupList: rightsSync.request.getXiaoWeiGroupList,
  getQuDaoList: rightsSync.request.getQuDaoList,
  getDirectSellers: rightsSync.request.getDirectSellers,
  // getDetailByRightsId: rightsSync.request.getDetailByRightsId,
  getScoreNum: rightsSync.request.getScoreNum,
  getXwScoreNum: rightsSync.request.getXwScoreNum,
  listRecommendGift: rightsSync.request.listRecommendGift,
  listRecommendGiftByKeyWords: rightsSync.request.listRecommendGiftByKeyWords,
  deleteOrderRights: rightsSync.request.deleteOrderRights,
  deleteRightsById: rightsSync.request.deleteRightsById,
  updateAuditStatus: rightsSync.request.updateAuditStatus,
  updateChinaAuditStatus: rightsSync.request.updateChinaAuditStatus,
  saveMomentOrderRights: rightsSync.request.saveMomentOrderRights,
  saveChinaMomentOrderRights: rightsSync.request.saveChinaMomentOrderRights,
  downloadRightsFile: rightsSync.request.downloadRightsFile,
  getFinishCount: rightsSync.request.getFinishCount,
  getWaitCount: rightsSync.request.getWaitCount,
  listCheckedOrRights: rightsSync.request.listCheckedOrRights,
  getCostAmountByGiftConfig: rightsSync.request.getCostAmountByGiftConfig,
  getCostAmountByChinaGiftConfig: rightsSync.request.getCostAmountByChinaGiftConfig,
  getCostAmount: rightsSync.request.getCostAmount,
  pauseOrderRights: rightsSync.request.pauseOrderRights,
  startOrderRights: rightsSync.request.startOrderRights,
  getRemainAmount: rightsSync.request.getRemainAmount,
  getStatisticsInfo: rightsSync.request.getStatisticsInfo,
  exportStatisticsInfo: rightsSync.request.exportStatisticsInfo,
  exportChinaDetails: rightsSync.request.exportChinaDetails,
  getStatisticsInfoForCoupleProduct: rightsSync.request.getStatisticsInfoForCoupleProduct,
  exportStatisticsInfoForCoupleProduct: rightsSync.request.exportStatisticsInfoForCoupleProduct,
  updateRightEndTime: rightsSync.request.updateRightEndTime,
  updateRightEndTimeChina: rightsSync.request.updateRightEndTimeChina,
  exportShopTemplet: rightsSync.request.exportShopTemplet,
  getRemainMoney: rightsSync.request.getRemainMoney,
  listChannel: rightsSync.request.listChannel
};

Vue.prototype.requestComplaint = {
  assign: complaintSync.request.assign,
  audit: complaintSync.request.audit,
  del: complaintSync.request.del,
  list: complaintSync.request.list,
  listxiaowei: complaintSync.request.listxiaowei,
  listxiaoweiname: complaintSync.request.listxiaoweiname,
  contentSave: complaintSync.request.contentSave,
  listlabel: complaintSync.request.listlabel,
  listProductCategory: complaintSync.request.listProductCategory,
  listContentByColumnId: complaintSync.request.listContentByColumnId,
  getContentById: complaintSync.request.getContentById,
  updateContent: complaintSync.request.updateContent,
  wechatRightsList: complaintSync.request.wechatRightsList,
  wechatRightsSave: complaintSync.request.wechatRightsSave,
  wechatRightsUpdate: complaintSync.request.wechatRightsUpdate,
  queryRank: complaintSync.request.queryRank,
  getWechatRightsById: complaintSync.request.getWechatRightsById,
  wechatRightDelete: complaintSync.request.wechatRightDelete,
  wechatRightsCardList: complaintSync.request.wechatRightsCardList,
  wechatRightCardSave: complaintSync.request.wechatRightCardSave,
  wechatRightCardUpdate: complaintSync.request.wechatRightCardUpdate,
  getWechatRightsCardById: complaintSync.request.getWechatRightsCardById,
  wechatRightCardDelete: complaintSync.request.wechatRightCardDelete,
  updateRightStatus: complaintSync.request.updateRightStatus,
  getQRCodeById: complaintSync.request.getQRCodeById,
  contentDel: complaintSync.request.contentDel,
  updateCommend: complaintSync.request.updateCommend,
  listContentBanner: complaintSync.request.listContentBanner,
  deleteContentBanner: complaintSync.request.deleteContentBanner,
  getContentBannerById: complaintSync.request.getContentBannerById,
  saveContentBanner: complaintSync.request.saveContentBanner,
  updateContentBanner: complaintSync.request.updateContentBanner,
  updateStatus: complaintSync.request.updateStatus,
  saveAddpoint: complaintSync.request.saveAddpoint,
  querytgPoint: complaintSync.request.querytgPoint,
  saveOpenRed: complaintSync.request.saveOpenRed,
  udateOpenRed: complaintSync.request.udateOpenRed,
  getOpenRedById: complaintSync.request.getOpenRedById,
  getOpenList: complaintSync.request.getOpenList,
  deleteOpenRed: complaintSync.request.deleteOpenRed,
  saveUseHelpColumn: complaintSync.request.saveUseHelpColumn,
  selectUseHelpColumn: complaintSync.request.selectUseHelpColumn,
  deleteUseHelpColumnAndTitle: complaintSync.request.deleteUseHelpColumnAndTitle,
  saveUseHelpTitle: complaintSync.request.saveUseHelpTitle,
  selectAllUseHelpTitle: complaintSync.request.selectAllUseHelpTitle,
  deleteUseHelpTitle: complaintSync.request.deleteUseHelpTitle,
  selectUseHelpTitle: complaintSync.request.selectUseHelpTitle,
  casatelist: complaintSync.request.casatelist,
  casaterelease: complaintSync.request.casaterelease,
  pageSellersInfo: complaintSync.request.pageSellersInfo,
  ratingSellers: complaintSync.request.ratingSellers,
  exportSellersInfo: complaintSync.request.exportSellersInfo,
  selectAllMessageRemindingTitle: complaintSync.request.selectAllMessageRemindingTitle,
  deleteMessageRemindingTitle: complaintSync.request.deleteMessageRemindingTitle,
  selectMessageRemindingTitle: complaintSync.request.selectMessageRemindingTitle,
  selectMessageRemindingColumn: complaintSync.request.selectMessageRemindingColumn,
  saveMessageRemindingColumn: complaintSync.request.saveMessageRemindingColumn,
  deleteMessageRemindingColumnAndTitle: complaintSync.request.deleteMessageRemindingColumnAndTitle,
  saveMessageRemindingTitle: complaintSync.request.saveMessageRemindingTitle,
  getAdviserList: complaintSync.request.getAdviserList,
  addAdviser: complaintSync.request.addAdviser,
  getAdviserDetail: complaintSync.request.getAdviserDetail,
  updateAdviserStatus: complaintSync.request.updateAdviserStatus,
  deleteAdviser: complaintSync.request.deleteAdviser,
  updateAdviser: complaintSync.request.updateAdviser,
  addStarUp: complaintSync.request.addStarUp,
  getStarUpList: complaintSync.request.getStarUpList,
  deleteStarUp: complaintSync.request.deleteStarUp,
  updateStarUpStatus: complaintSync.request.updateStarUpStatus,
  getStarUpDetail: complaintSync.request.getStarUpDetail,
  updateStarUp: complaintSync.request.updateStarUp,
  isThereStarUp: complaintSync.request.isThereStarUp,
  customSendReminding: complaintSync.request.customSendReminding
};

Vue.prototype.requestComm = {
  smsAdd: commSync.request.smsAdd,
  smsSendTest: commSync.request.smsSendTest,
  smsUpdate: commSync.request.smsUpdate,
  smsShort: commSync.request.smsShort,
  smsGet: commSync.request.smsGet,
  smsDelete: commSync.request.smsDelete,
  smsSearch: commSync.request.smsSearch,
  weChatSearch: commSync.request.weChatSearch,
  weChatAdd: commSync.request.weChatAdd,
  weChatUpdate: commSync.request.weChatUpdate,
  weChatGet: commSync.request.weChatGet,
  weChatDelete: commSync.request.weChatDelete,
  weChatSendTest: commSync.request.weChatSendTest,
  emailSearch: commSync.request.emailSearch,
  emailAdd: commSync.request.emailAdd,
  emailSendTest: commSync.request.emailSendTest,
  emailGet: commSync.request.emailGet,
  emailUpdate: commSync.request.emailUpdate,
  emailDelete: commSync.request.emailDelete,
  siteMsgSearch: commSync.request.siteMsgSearch,
  siteMsgAdd: commSync.request.siteMsgAdd,
  siteMsgUpdate: commSync.request.siteMsgUpdate,
  siteMsgGet: commSync.request.siteMsgGet,
  siteMsgDelete: commSync.request.siteMsgDelete,
  getApp: commSync.request.getApp,
  limitQuery: commSync.request.limitQuery,
  limitSave: commSync.request.limitSave
};

Vue.prototype.requestService = {
  queryCustomer: serviceSync.request.queryCustomer,
  addCustomer: serviceSync.request.addCustomer,
  deleteCustomer: serviceSync.request.deleteCustomer,
  queryGroup: serviceSync.request.queryGroup,
  addGroup: serviceSync.request.addGroup,
  updateGroup: serviceSync.request.updateGroup,
  queryQA: serviceSync.request.queryQA,
  deleteQA: serviceSync.request.deleteQA,
  addQA: serviceSync.request.addQA,
  historyQA: serviceSync.request.historyQA,
  sendNotice: serviceSync.request.sendNotice,
  getHistoryQA: serviceSync.request.getHistoryQA,
  getGroup: serviceSync.request.getGroup,
  deleteGroup: serviceSync.request.deleteGroup,
  updateQA: serviceSync.request.updateQA,
  listCustomerEmail: serviceSync.request.listCustomerEmail,
  addCustomerEmail: serviceSync.request.addCustomerEmail,
  updateCustomerEmail: serviceSync.request.updateCustomerEmail,
  deleteCustomerEmail: serviceSync.request.deleteCustomerEmail,
  getCustomerEmail: serviceSync.request.getCustomerEmail,
  queryQACategory: serviceSync.request.queryQACategory,
  addQACategory: serviceSync.request.addQACategory,
  pageResearchConfigTmGd: serviceSync.request.pageResearchConfigTmGd,
  exportEvaluate: serviceSync.request.exportEvaluate,
  exportEvaluateTemplate: serviceSync.request.exportEvaluateTemplate,
  getDeptInfo: serviceSync.request.getDeptInfo,
  getPageVipCasartePrice: serviceSync.request.getPageVipCasartePrice,
  updateStatus: serviceSync.request.updateStatus,
  getProductDescByMdm: serviceSync.request.getProductDescByMdm,
  saveVipCasartePrice: serviceSync.request.saveVipCasartePrice,
  getProductInfoByMdm: serviceSync.request.getProductInfoByMdm,
  updateVipCasartePrice: serviceSync.request.updateVipCasartePrice
};

Vue.prototype.requestStrategy = {
  queryPageByBrand: strategySync.request.queryPageByBrand,
  insertSystemStrategy: strategySync.request.insertSystemStrategy,
  systemChangeStatus: strategySync.request.systemChangeStatus,
  findById: strategySync.request.findById,
  updateSystemStrategy: strategySync.request.updateSystemStrategy,
  rankQueryPageByBrand: strategySync.request.rankQueryPageByBrand,
  rankFindById: strategySync.request.rankFindById,
  insertRank: strategySync.request.insertRank,
  updateRank: strategySync.request.updateRank,
  growUpQueryPageByBrand: strategySync.request.growUpQueryPageByBrand,
  insertGrowUp: strategySync.request.insertGrowUp,
  updateStrategy: strategySync.request.updateStrategy,
  growUpQueryById: strategySync.request.growUpQueryById,
  growUpChangeStatus: strategySync.request.growUpChangeStatus,
  rankChangeStatus: strategySync.request.rankChangeStatus,
  changeScale: strategySync.request.changeScale,
  getModel: strategySync.request.getModel,
  ssoLogin: strategySync.request.ssoLogin,
  getStatisticsInfoByRightId: strategySync.request.getStatisticsInfoByRightId,
  getChinaRegionRightsByChinaRightId: strategySync.request.getChinaRegionRightsByChinaRightId
};

Vue.prototype.requestCare = {
  query: careSync.request.query,
  add: careSync.request.add,
  update: careSync.request.update,
  queryMemberRank: careSync.request.queryMemberRank,
  queryDetail: careSync.request.queryDetail,
  list: careSync.request.list,
  deleteActivity: careSync.request.deleteActivity,
  pauseActivity: careSync.request.pauseActivity,
  addActivity: careSync.request.addActivity,
  updateActivity: careSync.request.updateActivity,
  startActivity: careSync.request.startActivity,
  getModel: careSync.request.getModel,
  saveFlow: careSync.request.saveFlow,
  updateFlow: careSync.request.updateFlow,
  queryMemberGroup: careSync.request.queryMemberGroup,
  getRankCnt: careSync.request.getRankCnt,
  listScene: careSync.request.listScene,
  getActivity: careSync.request.getActivity,
  listFlow: careSync.request.listFlow,
  queryGroup: careSync.request.queryGroup,
  getAllProductCategory: careSync.request.getAllProductCategory,
  listCheckedActivity: careSync.request.listCheckedActivity,
  checkActivity: careSync.request.checkActivity,
  getActivityCount: careSync.request.getActivityCount,
  getUserCountByActivityIds: careSync.request.getUserCountByActivityIds
};

Vue.prototype.requestVip = {
  queryCustomer: vipSync.request.queryCustomer,
  tagChangeStatus: vipSync.request.tagChangeStatus,
  insertVipMembersTag: vipSync.request.insertVipMembersTag,
  insertVipMembersGroup: vipSync.request.insertVipMembersGroup,
  updateVipMembersGroup: vipSync.request.updateVipMembersGroup,
  queryForPageByBrandName: vipSync.request.queryForPageByBrandName,
  memberChangeStatus: vipSync.request.memberChangeStatus,
  updateVipMembersTag: vipSync.request.updateVipMembersTag,
  groupFindById: vipSync.request.groupFindById,
  matchMember: vipSync.request.matchMember,
  queryMember: vipSync.request.queryMember,
  tagMember: vipSync.request.tagMember,
  groupMember: vipSync.request.groupMember,
  getUserInfo: vipSync.request.getUserInfo,
  getRankList: vipSync.request.getRankList,
  getIntegralAction: vipSync.request.getIntegralAction,
  getBasicTagById: vipSync.request.getBasicTagById,
  getRegProductInfo: vipSync.request.getRegProductInfo,
  getIntegralDetail: vipSync.request.getIntegralDetail,
  showRankHistory: vipSync.request.showRankHistory,
  getGroupMember: vipSync.request.getGroupMember,
  setGroup: vipSync.request.setGroup,
  setRight: vipSync.request.setRight,
  setTag: vipSync.request.setTag,
  queryPageByBrandName: vipSync.request.queryPageByBrandName,
  listTitle: vipSync.request.listTitle,
  addScore: vipSync.request.addScore,
  getCount: vipSync.request.getCount,
  sendTemplate: vipSync.request.sendTemplate,
  listWechatModel: vipSync.request.listWechatModel,
  getListCount: vipSync.request.getListCount,
  setMemberGroup: vipSync.request.setMemberGroup,
  setBusinessTag: vipSync.request.setBusinessTag,
  setRankOfUser: vipSync.request.setRankOfUser,
  queryGroup: vipSync.request.queryGroup,
  getRight: vipSync.request.getRight,
  getInfo: vipSync.request.getInfo,
  fuzzySearchBasicTag: vipSync.request.fuzzySearchBasicTag,
  updateTaskStatus: vipSync.request.updateTaskStatus
};

Vue.prototype.requestPower = {
  queryAllUser: powerSync.request.queryAllUser,
  addUser: powerSync.request.addUser,
  getUserFromTag: powerSync.request.getUserFromTag,
  updateUser: powerSync.request.updateUser,
  disableUser: powerSync.request.disableUser,
  enableUser: powerSync.request.enableUser,
  queryAllRole: powerSync.request.queryAllRole,
  addRole: powerSync.request.addRole,
  updateRole: powerSync.request.updateRole,
  deleteRole: powerSync.request.deleteRole,
  queryUserByRoleId: powerSync.request.queryUserByRoleId,
  queryRightList: powerSync.request.queryRightList,
  queryRight: powerSync.request.queryRight,
  addRoleUser: powerSync.request.addRoleUser,
  removeUser: powerSync.request.removeUser,
  saveRight: powerSync.request.saveRight,
  queryUserFuzzyMatch: powerSync.request.queryUserFuzzyMatch,
  listVipProductAppealXiaoWei: powerSync.request.listVipProductAppealXiaoWei,
  listVipRightsIndustry: powerSync.request.listVipRightsIndustry,
  getIntegralCenterList: powerSync.request.getIntegralCenterList,
  queryJfShopBudgetByPage: powerSync.request.queryJfShopBudgetByPage,
  createJfShopBudget: powerSync.request.createJfShopBudget,
  listChannel: powerSync.request.listChannel
};

Vue.prototype.requestReport = {
  getHomeActivityData: reportSync.request.getHomeActivityData,
  getHomeVipAnalData: reportSync.request.getHomeVipAnalData,
  getHomeVipData: reportSync.request.getHomeVipData,
  getVipCostlineData: reportSync.request.getVipCostlineData,
  getVipCostTableData: reportSync.request.getVipCostTableData,
  getTableData: reportSync.request.getTableData,
  getMapData: reportSync.request.getMapData,
  getStatisticsNumData: reportSync.request.getStatisticsNumData,
  getMemberFunnelData: reportSync.request.getMemberFunnelData,
  getOrderData: reportSync.request.getOrderData,
  getOrderDetails: reportSync.request.getOrderDetails,
  getBindData: reportSync.request.getBindData,
  delOrderData: reportSync.request.delOrderData,
  delBindData: reportSync.request.delBindData,
  getTimeOrderData: reportSync.request.getTimeOrderData,
  getSellersOrderData: reportSync.request.getSellersOrderData,
  getRightsName: reportSync.request.getRightsName,
  getGiftNameByRightsname: reportSync.request.getGiftNameByRightsname,
  queryxiaoweiId: reportSync.request.queryxiaoweiId,
  getUserToken: reportSync.request.getUserToken,
  activitedRight: reportSync.request.activitedRight,
  queryProduct: reportSync.request.queryProduct,
  updateBccPrice: reportSync.request.updateBccPrice,
  getXiaoWeiList: reportSync.request.getXiaoWeiList
};

Vue.prototype.requestActivity = {
  getLuckyData: activitySync.request.getLuckyData,
  saveLuckyDetails: activitySync.request.saveLuckyDetails,
  getLuckyDetails: activitySync.request.getLuckyDetails,
  updateLuckyDetails: activitySync.request.updateLuckyDetails,
  updateLuckyStatus: activitySync.request.updateLuckyStatus,
  draftLuckyDetails: activitySync.request.draftLuckyDetails
};

Vue.prototype.requestManagement = {
  addVipSource: managementSync.request.addVipSource,
  getVipSourceList: managementSync.request.getVipSourceList,
  addVipRemind: managementSync.request.addVipRemind,
  getVipRemindList: managementSync.request.getVipRemindList,
  getVipSourceDetail: managementSync.request.getVipSourceDetail,
  updateVipSource: managementSync.request.updateVipSource,
  getVipRemindDetail: managementSync.request.getVipRemindDetail,
  updateVipRemind: managementSync.request.updateVipRemind,
  pageVipUserManageConfigVO: managementSync.request.pageVipUserManageConfigVO,
  updateVipSourceStatus: managementSync.request.updateVipSourceStatus,
  saveupdateVipUserManageConfig: managementSync.request.saveupdateVipUserManageConfig,
  getVipUserManageConfigVOById: managementSync.request.getVipUserManageConfigVOById,
  listSellersProduct: managementSync.request.listSellersProduct,
  updateVipRemindStatus: managementSync.request.updateVipRemindStatus,
  listSource: managementSync.request.listSource,
  listOnExecuteUserManage: managementSync.request.listOnExecuteUserManage,
  getUserAndSellersCount: managementSync.request.getUserAndSellersCount,
  pageVipUserManageCardType: managementSync.request.pageVipUserManageCardType,
  saveUserManageCarTyep: managementSync.request.saveUserManageCarTyep,
  checkConfig: managementSync.request.checkConfig,
  updateUserManageCardStatus: managementSync.request.updateUserManageCardStatus,
  getVipUserManageCardTypeVoById: managementSync.request.getVipUserManageCardTypeVoById,
  updateUserManageCarType: managementSync.request.updateUserManageCarType,
  listOnExecuteCardType: managementSync.request.listOnExecuteCardType,
  getAuditUserInfo: managementSync.request.getAuditUserInfo,
  deleteVipUserManageConfig: managementSync.request.deleteVipUserManageConfig,
  startOrPauseConfig: managementSync.request.startOrPauseConfig,
  updateAuditStatus: managementSync.request.updateAuditStatus,
  calculateAmount: managementSync.request.calculateAmount,
  listTopTen: managementSync.request.listTopTen,
  downloadSellers: managementSync.request.downloadSellers,
  getConfigUseTheSource: managementSync.request.getConfigUseTheSource,
  getBuildCardType: managementSync.request.getBuildCardType
};

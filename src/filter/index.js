export default {
  giftNameByType(val) {
    /* gift type对应礼品名 */
    const giftObj = {
      1: '海贝积分',
      2: '卡萨帝积分',
      3: '实物礼品',
      5: '虚拟礼品'
    };
    return giftObj[val] || val;
  }
};

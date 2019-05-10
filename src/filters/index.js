import Vue from 'vue';

Vue.filter('uppercase', value => value.toUpperCase());

Vue.filter('lowercase', value => value.toLowerCase());

Vue.filter('number', (value) => {
  console.log(value);
});

Vue.filter('brandFilter', (brand) => {
  brand = brand == 'haier' ? '海尔' : '卡萨帝';
  return brand;
});

Vue.filter('descFilter', (form, rankList, caRankList) => {
  let desc = [];
  const dataRange = [
    { value: 1, label: '全部' },
    { value: 2, label: '近一月' },
    { value: 3, label: '近三个月' },
    { value: 4, label: '近半年' },
    { value: 5, label: '近一年' }
  ];

  // 用户范围
  switch (form.type) {
    case '1':
      desc.push('线上用户');
      break;
    case '2':
      desc.push('线下用户');
      break;
  }

  // 标签

  if (form.queryParam.tagIdsArr.length > 0) {
    const { tagIdsArr } = form.queryParam;
    const tagNameArr = [];
    for (var i = 0; i < tagIdsArr.length; i++) {
      tagNameArr.push(tagIdsArr[i].name);
    }
    desc.push(`拥有基础标签：${tagNameArr.join('、')}`);
  }

  if (form.queryParam.businessTagArr.length > 0) {
    const { businessTagArr } = form.queryParam;
    const businessTagNameArr = [];
    for (var i = 0; i < businessTagArr.length; i++) {
      businessTagNameArr.push(businessTagArr[i].split(':')[1]);
    }
    desc.push(`拥有业务标签：${businessTagNameArr.join('、')}`);
  }

  // 等级、成长值

  if (form.queryParam.hrRankId.length > 0) {
    const rank = [];
    for (var i = 0; i < form.queryParam.hrRankId.length; i++) {
      for (var j = 0; j < rankList.length; j++) {
        if (form.queryParam.hrRankId[i] == rankList[j].id) {
          rank.push(rankList[j].rankName);
        }
      }
    }
    desc.push(`海尔会员等级：${rank.join('、')}`);
  }

  if (form.queryParam.hrGrowupValueContentArr[0].value != '') {
    desc.push(
      `海尔会员成长值：${
        dataRange[parseInt(form.queryParam.hrGrowupValueMatch) - 1].label
      }时间内成长值${
        form.queryParam.hrGrowupValueContentArr[0].value
      }到${
        form.queryParam.hrGrowupValueContentArr[1].value}`
    );
  }

  if (form.queryParam.caRankId.length > 0) {
    const caRank = [];
    for (var i = 0; i < form.queryParam.caRankId.length; i++) {
      for (var j = 0; j < caRankList.length; j++) {
        if (form.queryParam.caRankId[i] == caRankList[j].id) {
          caRank.push(caRankList[j].rankName);
        }
      }
    }
    desc.push(`卡萨帝会员等级：${caRank.join('、')}`);
  }

  if (form.queryParam.caGrowupValueContentArr[0].value != '') {
    desc.push(
      `卡萨帝会员成长值：${
        dataRange[parseInt(form.queryParam.caGrowupValueMatch) - 1].label
      }时间内成长值${
        form.queryParam.caGrowupValueContentArr[0].value
      }到${
        form.queryParam.caGrowupValueContentArr[1].value}`
    );
  }

  // 交互行为
  if (form.queryParam.hrIntegrateContentArr[0].value) {
    desc.push(
      `海尔积分：${
        dataRange[parseInt(form.queryParam.hrIntegrateMatch) - 1].label
      }${form.queryParam.hrIntegrateContentArr[0].value
      }到${
        form.queryParam.hrIntegrateContentArr[1].value}`
    );
  }

  if (form.queryParam.hrActionContent.length > 0) {
    desc.push(
      `${dataRange[parseInt(form.queryParam.hrActionMatch) - 1].label
      }时间内有过交互行为${
        form.queryParam.hrActionContent.join('、')}`
    );
  }

  if (form.queryParam.caIntegrateContentArr[0].value) {
    desc.push(
      `卡萨帝积分：${
        dataRange[parseInt(form.queryParam.caIntegrateMatch) - 1].label
      }${form.queryParam.caIntegrateContentArr[0].value
      }到${
        form.queryParam.caIntegrateContentArr[1].value}`
    );
  }

  if (form.queryParam.caActionContent.length > 0) {
    desc.push(
      `${dataRange[parseInt(form.queryParam.caActionMatch) - 1].label
      }时间内有过交互行为${
        form.queryParam.caActionContent.join('、')}`
    );
  }

  // 产品购买
  const transformType = ['准金卡', '准银卡'];
  const buyAndRegType = ['购买未注册', '部分产品注册', '全部产品注册'];

  if (form.queryParam.hrRankTransformType != '') {
    desc.push(`海尔_${transformType[parseInt(form.queryParam.hrRankTransformType) - 1]}`);
  }

  if (form.queryParam.hrBugProductTypeContent != '') {
    desc.push(
      `海尔产品购买情况：${
        dataRange[parseInt(form.queryParam.hrBugProductMatch) - 1].label
      }时间内购买产品类别${
        form.queryParam.hrBugProductTypeContent
      }类以上，购买金额${
        form.queryParam.hrBugProductAmountContentArr[0].value
      }到${
        form.queryParam.hrBugProductAmountContentArr[1].value}`
    );
  }

  if (form.queryParam.hrRegProductAmountContentArr[0].value != '') {
    desc.push(
      `海尔产品注册情况：${
        dataRange[parseInt(form.queryParam.hrRegProductAmountMatch) - 1].label
      }时间内注册金额${
        form.queryParam.hrRegProductAmountContentArr[0].value
      }到${
        form.queryParam.hrRegProductAmountContentArr[1].value}`
    );
  }

  if (form.queryParam.hrBuyAndRegType != '') {
    desc.push(`海尔产品购买注册情况为：${buyAndRegType[parseInt(form.queryParam.hrBuyAndRegType) - 1]}`);
  }

  if (form.queryParam.caRankTransformType != '') {
    desc.push(`卡萨帝_${transformType[parseInt(form.queryParam.caRankTransformType) - 1]}`);
  }

  if (form.queryParam.caBugProductTypeContent != '') {
    desc.push(
      `卡萨帝产品购买情况：${
        dataRange[parseInt(form.queryParam.caBugProductMatch) - 1].label
      }时间内购买产品类别${
        form.queryParam.caBugProductTypeContent
      }类以上，购买金额${
        form.queryParam.caBugProductAmountContentArr[0].value
      }到${
        form.queryParam.caBugProductAmountContentArr[1].value}`
    );
  }

  if (form.queryParam.caRegProductAmountContentArr[0].value != '') {
    desc.push(
      `卡萨帝产品注册情况：${
        dataRange[parseInt(form.queryParam.caRegProductAmountMatch) - 1].label
      }时间内注册金额${
        form.queryParam.caRegProductAmountContentArr[0].value
      }到${
        form.queryParam.caRegProductAmountContentArr[1].value}`
    );
  }

  if (form.queryParam.caBuyAndRegType != '') {
    desc.push(`卡萨帝产品购买注册情况为：${buyAndRegType[parseInt(form.queryParam.caBuyAndRegType) - 1]}`);
  }

  // 特殊限制

  if (form.queryParam.blackFlag != '' && form.queryParam.blackFlag == 0) {
    desc.push('排出黑名单用户');
  }

  if (form.queryParam.groupIdsArr.length > 0) {
    const groupIdsArr = [];
    for (var i = 0; i < form.queryParam.groupIdsArr.length; i++) {
      groupIdsArr.push(form.queryParam.groupIdsArr[i].split(':')[1]);
    }
    desc.push(`排除分组：${groupIdsArr.join('、')}`);
  }

  if (
    form.queryParam.hrSmsContactContent == -1
    || form.queryParam.hrWeixinContactContent == -1
    || form.queryParam.hrSiteMsgContactContent == -1
  ) {
    const contactContent = [];
    if (form.queryParam.hrSmsContactContent == -1) {
      contactContent.push('短信');
    }
    if (form.queryParam.hrWeixinContactContent == -1) {
      contactContent.push('微信');
    }
    if (form.queryParam.hrSiteMsgContactContent == -1) {
      contactContent.push('站内信');
    }
    desc.push(
      `排除海尔${
        dataRange[parseInt(form.queryParam.hrContactMatch) - 1].label
      }时间内有过${
        contactContent.join('、')
      }交互行为的用户`
    );
  }

  if (
    form.queryParam.caSmsContactContent == -1
    || form.queryParam.caWeixinContactContent == -1
    || form.queryParam.caSiteMsgContactContent == -1
  ) {
    const caContactContent = [];
    if (form.queryParam.caSmsContactContent == -1) {
      caContactContent.push('短信');
    }
    if (form.queryParam.caWeixinContactContent == -1) {
      caContactContent.push('微信');
    }
    if (form.queryParam.caSiteMsgContactContent == -1) {
      caContactContent.push('站内信');
    }
    desc.push(
      `排除卡萨帝${
        dataRange[parseInt(form.queryParam.caContactMatch) - 1].label
      }时间内有过${
        caContactContent.join('、')
      }交互行为的用户`
    );
  }

  desc = desc.join(',');
  return desc;
});

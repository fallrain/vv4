var data = [
  {
    name: '会员信息',
    level: 1,
    id: 1,
    icon: 'icon-geren',
    // url: '/manage/earlywarning',
    children: [
      {
        name: '会员筛选器',
        level: 2,
        id: 121,
        url: '/vip/filters'
      },
      {
        name: '会员分组',
        level: 2,
        id: 122,
        url: '/vip/vipgroup'
      },
      {
        name: '会员标签',
        level: 2,
        id: 123,
        url: '/vip/label'
      }
    ]
  },
  {
    name: '策略管理',
    level: 1,
    id: 2,
    icon: 'icon-strategy',
    children: [
      {
        name: '等级策略',
        level: 2,
        id: 221,
        url: '/strategy/level'
      },
      {
        name: '成长策略',
        level: 2,
        id: 222,
        url: '/strategy/growup'
      },
      {
        name: '系统策略',
        level: 2,
        id: 223,
        url: '/strategy/system'
      }
    ]
  },
  {
    name: '沟通管理',
    level: 1,
    id: 3,
    icon: 'icon-mark',
    children: [
      {
        name: '短信',
        level: 2,
        id: 321,
        url: '/communication/msglist'
      },
      {
        name: '邮件',
        level: 2,
        id: 322,
        url: '/communication/maillist'
      },
      {
        name: '站内信',
        level: 2,
        id: 323,
        url: '/communication/sitemsglist'
      },
      {
        name: '微信',
        level: 2,
        id: 324,
        url: '/communication/wechatlist'
      },
      {
        name: '发送限制管理',
        level: 2,
        id: 325,
        url: '/communication/sendinglimit'
      }
    ]
  },
  {
    name: '关怀管理',
    level: 1,
    id: 4,
    icon: 'icon-yuangongguanhuai',
    children: [
      {
        name: '权益管理',
        level: 2,
        id: 421,
        url: '/rights/rights'
      },
      {
        name: '活动管理',
        level: 2,
        id: 422,
        url: '/care/activity'
      }
    ]
  },
  {
    name: '客服管理',
    level: 1,
    id: 5,
    icon: 'icon-kefu',
    children: [
      {
        name: '人员管理',
        level: 2,
        id: 521,
        url: '/service/personnel'
      },
      {
        name: '分组管理',
        level: 2,
        id: 522,
        url: '/service/group'
      },
      {
        name: '常用知识管理',
        level: 2,
        id: 523,
        url: '/service/faqs'
      },
      {
        name: '发送管理',
        level: 2,
        id: 524,
        url: '/service/sendnotice'
      }
    ]
  },
  {
    name: '会员报表',
    level: 1,
    id: 6,
    icon: 'icon-baobiao',
    children: [
      {
        name: '权益实用类',
        level: 2,
        id: 621
      },
      {
        name: '活动类',
        level: 2,
        id: 622
      },
      {
        name: '数据运营核心指标',
        level: 2,
        id: 623,
        url: '/report/operation'
      },
      {
        name: '订单处理',
        level: 2,
        id: 624,
        url: '/report/activereport'
      },
      {
        name: '订单查询',
        level: 2,
        id: 625,
        url: '/report/timeorderreport'
      },
      {
        name: '订单详情',
        level: 2,
        id: 626,
        url: '/report/sellersorderreport'
      }
    ]
  },
  {
    name: '权限管理',
    level: 1,
    id: 7,
    icon: 'icon-quanxianguanli1',
    children: [
      {
        name: '用户管理',
        level: 2,
        id: 721,
        url: '/power/user'
      },
      {
        name: '角色管理',
        level: 2,
        id: 722,
        url: '/power/role'
      }
    ]
  },
  {
    name: '服务号活动',
    level: 1,
    id: 8,
    icon: 'icon-fuwuhaohuodong',
    children: [
      {
        name: '活动配置',
        level: 2,
        id: 821,
        url: '/wxactivity/luckyactivity'
      }
    ]
  },
  {
    name: '用户经营',
    level: 1,
    id: 9,
    icon: 'icon-fuwuhaohuodong',
    children: [
      {
        name: '资源位配置',
        level: 2,
        id: 921,
        url: '/management/resources'
      },
      {
        name: '关怀提醒',
        level: 2,
        id: 922,
        url: '/management/carereminding'
      },
      {
        name: '直销员权益发放',
        level: 2,
        id: 923,
        url: '/management/rightsdirectlist'
      },
      {
        name: '权益券配置',
        level: 2,
        id: 924,
        url: '/management/rightsvoucher'
      }
    ]
  }
];

export default data;

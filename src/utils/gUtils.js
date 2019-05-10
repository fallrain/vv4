var axios = require('axios');
import Vue from 'vue';

const gUtils = {
  sortArr: function(arr, field) {
    arr.sort(function(a, b) {
      return a[field] - b[field];
    });
    return arr;
  },
  jsonFormat: function(data, pid) {
    var result = [];
    var temp;
    for (var i = 0; i < data.length; i++) {
      // data[0].parentId = 0;
      if (data[i].parentId == pid) {
        var obj = {
          name: data[i].name,
          id: data[i].id,
          parentId: data[i].parentId || '',
          level: data[i].level,
          crTime: data[i].crTime,
          crUserId: data[i].crUserId,
          sort: data[i].sort,
          upTime: data[i].upTime,
          upUserId: data[i].upUserId,
          icon: data[i].icon,
          url: data[i].url,
          hasAuth: data[i].hasAuth,
          objectType: data[i].objectType
        };
        temp = this.jsonFormat(data, data[i].id);
        if (temp.length > 0) {
          this.sortArr(temp, 'sort');
          obj.children = temp;
        }
        result.push(obj);
      }
    }
    return result;
  },
  jsonFormatSide: function(data, pid) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].parentId == pid && data[i].id != 8 && data[i].id != 9) {
        result.push(data[i]);
      }
    }
    return result;
  },
  jsonFormatTopset: function(data, pid) {
    var result = [];
    var children = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].parentId == pid && data[i].id == 9) {
        result.push(data[i]);
      }
    }
    if (result.length != 0) {
      for (let i in result) {
        children = result[0].children;
      }
    }
    return children;
  },
  jsonFormatTopmana: function(data, pid) {
    var result = [];
    var children = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].parentId == pid && data[i].id == 8) {
        result.push(data[i]);
      }
    }
    if (result.length != 0) {
      for (let i in result) {
        children = result[0].children;
      }
    }
    return children;
  },
  jsonRoleFormat: function(data, pid) {
    var result = [];
    var temp;
    for (var i = 0; i < data.length; i++) {
      // data[0].parentId = 0;
      if (data[i].parentId == pid) {
        var obj = {
          name: data[i].name,
          id: data[i].id,
          parentId: data[i].parentId || '',
          level: data[i].level,
          crTime: data[i].crTime,
          crUserId: data[i].crUserId,
          sort: data[i].sort,
          upTime: data[i].upTime,
          upUserId: data[i].upUserId,
          enName: data[i].enName,
          objectType: data[i].objectType,
          hasChild: data[i].hasChild,
          pojoClassName: data[i].pojoClassName,
          queryServiceBeanName: data[i].queryServiceBeanName,
          remark: data[i].remark,
          hasAuth: data[i].hasAuth
        };
        temp = this.jsonRoleFormat(data, data[i].id);
        if (temp.length > 0) {
          this.sortArr(temp, 'sort');
          obj.children = temp;
        }
        result.push(obj);
      }
    }
    return result;
  },
  jsonObjectFormat: function(data, pid) {
    var result = [];
    var temp;

    for (var i = 0; i < data.length; i++) {
      // data[0].parentId = 0;
      if (data[i].parentId == pid) {
        var obj = {
          crUserId: data[i].crUserId,
          crTime: data[i].crTime,
          upUserId: data[i].upUserId,
          upTime: data[i].upTime,
          delFlag: data[i].delFlag,
          hasChild: data[i].hasChild,
          enName: data[i].enName,
          objectType: data[i].objectType,
          id: data[i].id,
          parentId: data[i].parentId || '',
          name: data[i].name,
          queryServiceBeanName: data[i].queryServiceBeanName,
          pojoClassName: data[i].pojoClassName,
          remark: data[i].remark,
          level: data[i].level,
          sort: data[i].sort,
          hasAuth: data[i].hasAuth
        };
        temp = this.jsonObjectFormat(data, data[i].id);
        if (temp.length > 0) {
          this.sortArr(temp, 'sort');
          obj.children = temp;
        }
        result.push(obj);
      }
    }
    return result;
  },
  jsonMenuFormat: function(data, pid) {
    var result = [];
    var temp;
    for (var i = 0; i < data.length; i++) {
      // data[0].parentId = 0;
      if (data[i].parentId == pid) {
        var obj = {
          crTime: data[i].crTime,
          crUserId: data[i].crUserId,
          desc: data[i].desc,
          hasChild: data[i].hasChild,
          icon: data[i].icon,
          id: data[i].id,
          level: data[i].level,
          name: data[i].name,
          parentId: data[i].parentId || '',
          sort: data[i].sort,
          upTime: data[i].upTime,
          upUserId: data[i].upUserId,
          url: data[i].url,
          hasAuth: data[i].hasAuth
        };
        temp = this.jsonMenuFormat(data, data[i].id);
        if (temp.length > 0) {
          this.sortArr(temp, 'sort');
          obj.children = temp;
        }
        result.push(obj);
      }
    }
    return result;
  },
  jsonRoleListFormat: function(data, pid) {
    var result = [];
    var temp;
    for (var i = 0; i < data.length; i++) {
      // data[0].parentId = 0;
      if (data[i].parentId == pid) {
        var obj = {
          hasChild: data[i].hasChild,
          level: data[i].level,
          name: data[i].name,
          objectId: data[i].objectId,
          objectType: data[i].objectType,
          parentId: data[i].parentId,
          sort: data[i].sort,
          hasRight: data[i].hasRight,
          hasAuth: data[i].hasAuth
        };
        temp = this.jsonRoleListFormat(data, data[i].objectId);
        if (temp.length > 0) {
          this.sortArr(temp, 'sort');
          obj.children = temp;
        }
        result.push(obj);
      }
    }
    return result;
  },
  jsonPermsFormat: function(data, pid) {
    var result = [];
    var m = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    var temp;
    for (var i = 0; i < data.length; i++) {
      // data[0].parentId = 0;
      if (data[i].parentId == pid) {
        var obj = {
          crTime: data[i].crTime,
          crUserId: data[i].crUserId,
          enName: data[i].enName,
          hasChild: data[i].hasChild,
          hasRight: data[i].hasRight,
          id: data[i].id,
          level: data[i].level,
          name: data[i].name,
          objectType: data[i].objectType,
          parentId: data[i].parentId,
          permissionList: data[i].permissionList,
          groupId: m[i] + data[i].id,
          hasAuth: data[i].hasAuth
        };
        temp = this.jsonPermsFormat(data, data[i].id);
        if (temp.length > 0) {
          this.sortArr(temp, 'sort');
          obj.permissionList = temp;
        }
        result.push(obj);
      }
    }
    return result;
  },
  jsonTreeFormat: function(data, pid) {
    var result = [];
    var temp;
    for (var i = 0; i < data.length; i++) {
      // data[0].parentId = 0;
      if (data[i].parentid == pid) {
        var obj = {
          level: data[i].level,
          name: data[i].name,
          sort: data[i].sort,
          channelid: data[i].channelid,
          parentid: data[i].parentid,
          type: data[i].type,
          typedesc: data[i].typedesc
        };
        temp = this.jsonTreeFormat(data, data[i].channelid);
        if (temp.length > 0) {
          this.sortArr(temp, 'sort');
          obj.children = temp;
        }
        result.push(obj);
      }
    }
    return result;
  },
  getJsonArr: function(data, arr) {
    for (var i in data) {
      arr.push(data[i]);
      if (data[i].permissionList == undefined || data[i].permissionList == null || data[i].permissionList == '') {
        continue;
      } else {
        this.getJsonArr(data[i].permissionList, arr);
      }
    }

    return arr;
  },
  changeToDate: function(date) {
    var input = date;
    if (input) {
      var now = new Date(parseInt(input));
      var yy = now.getFullYear(); // 年
      var mm = now.getMonth() + 1; // 月
      var dd = now.getDate(); // 日
      var hh = now.getHours(); // 时
      var ii = now.getMinutes(); // 分
      var ss = now.getSeconds(); // 秒
      input = yy + '-';
      if (mm < 10) input += '0';
      input += mm + '-';
      if (dd < 10) input += '0';
      input += dd + ' ';
      if (hh < 10) input += '0';
      input += hh + ':';
      if (ii < 10) input += '0';
      input += ii + ':';
      if (ss < 10) input += '0';
      input += ss;
    }
    return input;
  },
  myAlert: function(msg, id) {
    var html = '';
    html =
      '<div class="g-diglog-mask mask' +
      id +
      '"><div class="g-diglog-wrapper" ><div class="g-diglog-container" style="width:300px;min-height:150px" >' +
      '<div class="g-diglog-header"><h2>信息</h2></div>' +
      '<div class="g-diglog-body"><div style="font-size:16px;text-align:center;margin:0"><i class="iconfont icon icon-shuoming"></i><span class="desc">' +
      msg +
      '</span></div></div>' +
      '<div class="g-diglog-footer"><span class="g-button g-button-blue ' +
      id +
      '">确定</span></div>' +
      '</div></div></div>';

    return html;
  },
  Dictionary: function() {
    this.data = new Array();

    this.put = function(key, value) {
      this.data[key] = value;
    };

    this.get = function(key) {
      return this.data[key];
    };

    this.remove = function(key) {
      this.data[key] = null;
    };

    this.isEmpty = function() {
      return this.data.length == 0;
    };

    this.size = function() {
      return this.data.length;
    };
  },
  formatDateTime: function(date, type) {
    if (!!date && typeof date === 'object') {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      var d = date.getDate();
      d = d < 10 ? '0' + d : d;
      var h = date.getHours();
      h = h < 10 ? '0' + h : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? '0' + minute : minute;
      if (!type) {
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':00';
      } else {
        return y + '-' + m + '-' + d + ' ' + '23:59:59';
      }
    } else {
      return date;
    }
  },
  // 高级搜索公共方法
  adSearchCommFn: function(pm, fn, sort, obj) {
    var tempArr = [];
    for (var item in pm) {
      if (pm[item].val != '') {
        if (pm[item].type == 'Date') {
          tempArr.push({
            property: item.split('_')[0],
            dataType: pm[item].type,
            expression:
              item.split('_')[1] == 'S'
                ? '>=' + this.formatDateTime(pm[item].val)
                : '<=' + this.formatDateTime(pm[item].val)
          });
        } else {
          tempArr.push({
            property: item,
            dataType: pm[item].type,
            expression: pm[item].val
          });
        }
      }
    }
    if (sort) {
      var sortArr = [
        {
          property: sort.key,
          desc: sort.desc
        }
      ];
    }
    var sJson = {
      criterions: tempArr,
      order: sortArr
    };

    var tempId = {};
    if (obj) {
      tempId = obj;
    }
    var params = {
      pageNo: 1,
      pageSize: 10,
      criteria: JSON.stringify(sJson)
    };

    params = Object.assign(params, tempId);
    fn(params);
  },
  downloadExl: function(json, type) {
    var tmpDown; // 导出的二进制对象
    var keyMap = []; // 获取键
    for (var k in json[0]) {
      keyMap.push(k);
    }
    var tmpdata = []; // 用来保存转换好的json
    json
      .map((v, i) =>
        keyMap.map((k, j) =>
          Object.assign(
            {},
            {
              v: v[k],
              position: (j > 25 ? this.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
            }
          )
        )
      )
      .reduce((prev, next) => prev.concat(next))
      .forEach(
        (v, i) =>
          (tmpdata[v.position] = {
            v: v.v
          })
      );
    var outputPos = Object.keys(tmpdata); // 设置区域,比如表格从A1到D10
    var tmpWB = {
      SheetNames: ['mySheet'], // 保存的表标题
      Sheets: {
        mySheet: Object.assign(
          {},
          tmpdata, // 内容
          {
            '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] // 设置填充区域
          }
        )
      }
    };
    tmpDown = new Blob(
      [
        this.s2ab(
          XLSX.write(
            tmpWB,
            {
              bookType: type == undefined ? 'xlsx' : type,
              bookSST: false,
              type: 'binary'
            } // 这里的数据是用来定义导出的格式类型
          )
        )
      ],
      {
        type: ''
      }
    ); // 创建二进制对象写入转换好的字节流
    var href = URL.createObjectURL(tmpDown); // 创建对象超链接
    document.getElementById('export').href = href; // 绑定a标签
    document.getElementById('export').click(); // 模拟点击实现下载
    setTimeout(function() {
      // 延时释放
      URL.revokeObjectURL(tmpDown); // 用URL.revokeObjectURL()来释放这个object URL
    }, 100);
  },
  s2ab: function(s) {
    // 字符串转字符流
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  },
  getCharCol: function(n) {
    // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
    let temCol = '';
    let s = '';
    let m = 0;
    while (n > 0) {
      m = (n % 26) + 1;
      s = String.fromCharCode(m + 64) + s;
      n = (n - m) / 26;
    }
    return s;
  },
  getMenuId: function(data, url) {
    var menuId = '';
    for (var i = 0; i < data.length; i++) {
      if (data[i].url == url) {
        menuId = data[i].id;
      }
    }
    return menuId;
  },
  // 网络请求
  trsGetData: function() {
    const httpServer = axios.create({
      withCredentials: true
    });
    // httpServer.interceptors.request.use((config) => {
    //   config.headers['X-Requested-With'] = 'XMLHttpRequest'
    //   return config
    // })

    httpServer.interceptors.response.use(
      function(response) {
        if (response.data.msg && response.data.msg.indexOf('请登录') >= 0) {
          window.location.href = Vue.prototype.loginUrl; // 跳转用户中心运营平台
        }
        return response;
      },
      function(err) {
        // return Promise.reject (err)
      }
    );

    return httpServer;
  },
  // 时间格式转换
  dateFormat: function(date, format) {
    if (typeof date === 'string' && date.indexOf('-') > 0) {
      date = date.replace(/-/g, '/');
    }

    if (date === '') {
      return '';
    }

    date = new Date(date);

    var o = {
      'M+': date.getMonth() + 1, // month
      'd+': date.getDate(), // day
      'H+': date.getHours(), // hour
      'm+': date.getMinutes(), // minute
      's+': date.getSeconds(), // second
      'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
      S: date.getMilliseconds() // millisecond
    };

    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }

    return format;
  },
  // 小微名和id
  getXWname: [
    {
      id: '',
      value: '所有小微'
    },
    {
      id: '12D01',
      value: '上海小微'
    },
    {
      id: '12702',
      value: '乌鲁木齐小微'
    },
    {
      id: '12703',
      value: '兰州小微'
    },
    {
      id: '12106',
      value: '内蒙小微'
    },
    {
      id: '12C01',
      value: '北京小微'
    },
    {
      id: '12302',
      value: '南京小微'
    },
    {
      id: '12206',
      value: '南宁小微'
    },
    {
      id: '12902',
      value: '南昌小微'
    },
    {
      id: '12B02',
      value: '厦门小微'
    },
    {
      id: '12901',
      value: '合肥小微'
    },
    {
      id: '12503',
      value: '哈尔滨小微'
    },
    {
      id: '12105',
      value: '唐山小微'
    },
    {
      id: '12504',
      value: '大连小微'
    },
    {
      id: '12102',
      value: '天津小微'
    },
    {
      id: '12002',
      value: '太原小微'
    },
    {
      id: '12306',
      value: '宁波小微'
    },
    {
      id: '12201',
      value: '广州小微'
    },
    {
      id: '12805',
      value: '徐州小微'
    },
    {
      id: '12601',
      value: '成都小微'
    },
    {
      id: '12305',
      value: '无锡小微'
    },
    {
      id: '12603',
      value: '昆明小微'
    },
    {
      id: '12303',
      value: '杭州小微'
    },
    {
      id: '12401',
      value: '武汉小微'
    },
    {
      id: '12501',
      value: '沈阳小微'
    },
    {
      id: '12802',
      value: '济南小微'
    },
    {
      id: '12803',
      value: '济宁小微'
    },
    {
      id: '12205',
      value: '海口小微'
    },
    {
      id: '12204',
      value: '深圳小微'
    },
    {
      id: '12A01',
      value: '烟台小微'
    },
    {
      id: '12001',
      value: '石家庄小微'
    },
    {
      id: '12B01',
      value: '福州小微'
    },
    {
      id: '12402',
      value: '襄樊小微'
    },
    {
      id: '12705',
      value: '西宁小微'
    },
    {
      id: '12701',
      value: '西安小微'
    },
    {
      id: '12604',
      value: '贵州小微'
    },
    {
      id: '12E01',
      value: '郑州小微'
    },
    {
      id: '12602',
      value: '重庆小微'
    },
    {
      id: '12704',
      value: '银川小微'
    },
    {
      id: '12505',
      value: '锦州小微'
    },
    {
      id: '12502',
      value: '长春小微'
    },
    {
      id: '12403',
      value: '长沙小微'
    },
    {
      id: '12A02',
      value: '青岛小微'
    }
  ],
  getApiUrl() {
    return Vue.prototype.apiUrl;
  },
  simpleDeepCopy(data) {
    /* 简单类型深拷贝 */
    if (data) {
      return JSON.parse(JSON.stringify(data));
    }
  }
};

export default gUtils;

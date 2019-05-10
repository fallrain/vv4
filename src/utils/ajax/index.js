import axios from 'axios';
import { Message } from 'element-ui';
import qs from 'qs';
const ax = axios.create();
ax.defaults = Object.assign(ax.defaults, {
  withCredentials: true,
  baseURL: process.env.VUE_APP_API_URL
});
ax.interceptors.request.use(config => {
  return config;
});
ax.interceptors.response.use(
  function(response) {
    // 关闭遮罩
    // Vue.$vux.loading.hide();
    if (response.data.msg && response.data.msg.indexOf('请登录') >= 0) {
      window.location.href = process.env.loginUrl; // 跳转用户中心运营平台
    }
    if (!(response.config.params && response.config.params.requestNoToast)) {
      if (!response.data.isSuccess) {
        response.data.data = false;
        Message({
          showClose: true,
          message: response.data.msg || '请求失败',
          type: 'warning'
        });
      }
    }

    return response.data.data;
  },
  function() {
    // Vue.$vux.loading.hide();
    Message({
      showClose: true,
      message: '请求失败',
      type: 'warning'
    });
    return false;
  }
);
const axGet = function(url, params) {
  return ax.get(url, {
    params: params
  });
};

const axPost = function(url, data, params) {
  return ax({
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    url: url,
    data: qs.stringify(data),
    params: params
  });
};
const axPostJson = function(url, data, params) {
  return ax({
    method: 'post',
    url: url,
    data: data,
    params: params
  });
};
export default ax;

export { axGet, axPost, axPostJson };

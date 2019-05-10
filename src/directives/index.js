import Vue from 'vue';

Vue.directive('g-number', {
  // 当绑定元素插入到 DOM 中。
  update(el) {
    const r = /^\d*$/;
    if (r.test(el.value)) {
      return el.value;
    }
    return (el.value = '');
  }
});

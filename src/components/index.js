// 组件全局注册
import Vue from 'vue';
import draggable from 'vuedraggable';
import table from './common/comm.table.vue';
import pager from './common/comm.pager.vue';
import button from './common/comm.button.vue';
import dialog from './common/comm.dialog.vue';
import searchbox from './common/comm.search.vue';
import loading from './common/comm.loading.vue';
import searchpro from './common/comm.search.pro.vue';
import select from './common/comm.select.vue';
import tree from './common/comm.tree.vue';
import upload from './common/comm.upload.vue';

Vue.component(table.name, table);
Vue.component(pager.name, pager);
Vue.component(button.name, button);
Vue.component(dialog.name, dialog);
Vue.component(searchbox.name, searchbox);
Vue.component(loading.name, loading);
Vue.component(searchpro.name, searchpro);
Vue.component(select.name, select);
Vue.component(tree.name, tree);
Vue.component(upload.name, upload);
Vue.component(draggable.name, draggable);

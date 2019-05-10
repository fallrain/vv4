import mainbody from '../../components/layout/layout.mainBody.vue';

export default {
  _router: [
    {
      path: '/:module/',
      component: mainbody,
      children: []
    }
  ]
};

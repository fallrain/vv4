<template>
  <div class="search">
    <div class="search-input">
      <input
        type="text"
        autocomplete="off"
        class="g-input"
        :placeholder="placeholder"
        :name="name"
        v-model="searchModel"
        :style="myStyle"
        @keyup.enter="search()"
        @keyup="keyup()"
      />
      <i class="iconfont icon-1"></i>
    </div>
    <eg-button v-show="isbtnShow" type="" my-style="min-width:30px;height:30px" @click="search()">搜索</eg-button>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'eg-search',
  data() {
    return {
      searchModel: ''
    };
  },
  props: ['placeholder', 'name', 'myStyle', 'isbtnShow', 'Fn', 'pid', 'pm', 'oid', 'rid'],
  methods: {
    search() {
      this.$emit('keyupEnter', this.searchModel);
      let sJson = '';
      if ($.trim(this.searchModel) != '') {
        this.pm ? (this.pm.criterions[0].expression = this.searchModel) : null;
        sJson = this.pm;
      } else {
        sJson = {
          orders: [
            {
              property: 'sort',
              desc: false
            }
          ]
        };
      }
      const params = {
        parentId: this.pid ? this.pid.treeModel.id : '',
        groupId: this.pid ? this.pid.treeModel.id : '',
        objectType: this.oid ? this.oid.treeModel.objectType : '',
        categoryId: this.pid ? this.pid.treeModel.id : '',
        roleId: this.rid ? this.rid.id : '',
        pageNo: 1,
        pageSize: 10,
        criteria: JSON.stringify(sJson)
      };
      this.Fn ? this.Fn(params) : null;
    },
    keyup(v) {
      this.$emit('keyup', this.searchModel);
    }
  }
};
</script>

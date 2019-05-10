<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand">
        <i></i>基本信息
        <el-input
          class="fr"
          placeholder="邮箱、证件号、手机号"
          icon="search"
          v-model="whereCondition"
          :on-icon-click="handleIconClick"
          @keyup.enter.native="handleIconClick"
          style="width: 300px"
        >
        </el-input>
      </p>
      <div class="clear"></div>
    </div>
    <div class="vip-user-info">
      <table style="table-layout:fixed">
        <tr>
          <td width="10%">姓名</td>
          <td width="23.3%">
            <b>{{ userInfo.xcs_hrgw_attrib_18 }}</b>
          </td>
          <td width="10%">电话</td>
          <td width="23.3%">
            <b>{{ userInfo.cst_mobile }}</b>
          </td>
          <td width="10%">用户ID</td>
          <td width="23.3%">
            <b>{{ userInfo.cst_id }}</b>
          </td>
        </tr>
        <tr>
          <td>海尔会员帐号</td>
          <td>
            <b>{{ userInfo.xcs_hrgw_loginname }}</b>
          </td>
          <td>会员级别</td>
          <td>
            <b style="margin-right: 12px;">{{ userInfo.xcs_hp_vip_type | rankFilter }}</b>
          </td>
          <td>证件号</td>
          <td>
            <b>{{ userInfo.cst_idcardnum }}</b>
          </td>
        </tr>
        <tr>
          <td>生日</td>
          <td>
            <b v-if="userInfo.cst_birthyear">{{
              userInfo.cst_birthyear + '-' + userInfo.cst_birthmonth + '-' + userInfo.cst_birthday
            }}</b>
          </td>
          <td>年龄</td>
          <td>
            <b v-if="userInfo.cst_birthyear">{{
              gUtils.dateFormat(new Date(), 'yyyy') - parseInt(userInfo.cst_birthyear)
            }}</b>
          </td>
          <td>email</td>
          <td>
            <b>{{ userInfo.cst_email }}</b>
          </td>
        </tr>
        <tr>
          <td>详细地址</td>
          <td>
            <b>{{ userInfo.cst_address }}</b>
          </td>
        </tr>
        <tr>
          <td>品牌</td>
          <td>
            <b>{{ userInfo.xcs_hrgw_attrib_19 }}</b>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import gUtils from '../../utils/gUtils.js';

export default {
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction',
      getUserInfo: 'getUserInfo'
    })
  },
  data() {
    return {
      whereCondition: '',
      userInfo: []
    };
  },
  filters: {
    rankFilter(value) {
      value = `${value}`;
      switch (value) {
        case '0':
          value = '银卡';
          break;
        case '1':
          value = '金卡';
          break;
        default:
          value = '';
          break;
      }
      return value;
    }
  },
  methods: {
    handleIconClick() {
      const self = this;

      this.requestVip
        .getInfo({
          whereCondition: self.whereCondition
        })
        .then((data) => {
          self.userInfo = data;
        });
    }
  }
};
</script>

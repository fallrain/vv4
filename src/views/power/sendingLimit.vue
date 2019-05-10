<template>
  <div class="vip-content sending-limit">
    <p class="limit-title"><i></i>单人短信发送限制</p>
    <div>
      <p>每周至多发送 <el-input-number v-model="form.smsnumperweek" :min="1" :max="99"></el-input-number> 次</p>
      <p>每月至多发送 <el-input-number v-model="form.smsnumpermonth" :min="1" :max="99"></el-input-number> 次</p>
    </div>

    <p class="limit-title"><i></i>单人邮件发送限制</p>
    <div>
      <p>每周至多发送 <el-input-number v-model="form.emailnumperweek" :min="1" :max="99"></el-input-number> 次</p>
      <p>每月至多发送 <el-input-number v-model="form.emailnumpermonth" :min="1" :max="99"></el-input-number> 次</p>
    </div>
    <el-button
      v-if="jurisdiction['marketingOperations:siteMsgManager:save']"
      type="primary"
      style="margin-left: 183px;"
      :loading="saveing"
      @click="limitSave"
      >保存</el-button
    >
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    })
  },
  data() {
    return {
      saveing: false,
      form: {
        id: 14,
        smsnumperweek: 1,
        smsnumpermonth: 1,
        emailnumperweek: 1,
        emailnumpermonth: 1
      }
    };
  },
  methods: {
    limitQuery() {
      const self = this;
      this.requestComm.limitQuery().then((data) => {
        if (data.length > 0) {
          self.form = {
            id: data[0].id,
            smsnumperweek: data[0].smsnumperweek || 1,
            smsnumpermonth: data[0].smsnumpermonth || 1,
            emailnumperweek: data[0].emailnumperweek || 1,
            emailnumpermonth: data[0].emailnumpermonth || 1
          };
        }
      });
    },
    limitSave() {
      const self = this;
      const data = this.form;
      self.saveing = true;
      this.requestComm.limitSave(data).then((data) => {
        self.saveing = false;
        if (data.isSuccess) {
          self.$message({
            type: 'success',
            message: '保存成功'
          });
        }
      });
    }
  },
  mounted() {
    this.limitQuery();
  }
};
</script>

<template>
  <div>
    <el-dialog
      v-if="member == 0"
      title="导入"
      ref="userDialog"
      :visible.sync="display"
      custom-class="edit-role"
      :modal-append-to-body="false"
      @close="closeDialog"
    >
      <p
        v-if="member == 0"
        style=" width: 540px; height: 36px; line-height: 36px; text-align: center; color: #1689e4 font-size: 30px; margin: 10px auto;"
      >
        正在导入...
      </p>
      <p style=" width: 540px; height: 22px; margin: 10px auto;"><img src="../../../assets/images/load.gif" /></p>
    </el-dialog>
    <el-dialog
      v-if="member == 1"
      title="保存"
      ref="userDialog"
      :visible.sync="display"
      custom-class="edit-role"
      :modal-append-to-body="false"
      @close="closeDialog"
    >
      <p
        style=" width: 540px; height: 36px; line-height: 36px; text-align: center; color: #1689e4 font-size: 30px; margin: 10px auto;"
      >
        正在保存...
      </p>
      <p style=" width: 540px; height: 22px; margin: 10px auto;"><img src="../../../assets/images/load.gif" /></p>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import gUtils from '../../../utils/gUtils.js';

export default {
  props: [
    //    "dialogChange",
    //    "form",
    //    "random",
    'dialogDisplay',
    'closeDialog',
    'memberCount'
  ],
  data() {
    return {
      display: false,
      member: ''
    };
  },
  mounted() {
    this.display = this.dialogDisplay;
    this.member = this.memberCount;
  },
  methods: {},
  watch: {
    dialogDisplay(curVal) {
      this.display = this.dialogDisplay;
    },
    memberCount(curVal) {
      this.member = this.memberCount;
    }
  }
};
</script>

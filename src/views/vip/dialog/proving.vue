<template>
  <div>
    <el-dialog
      title="保存"
      ref="userDialog"
      :visible.sync="display"
      custom-class="edit-role"
      :modal-append-to-body="false"
      @close="closeDialog"
    >
      <p
        style=" width: 540px; height: 36px; line-height: 36px; text-align: left; color: #1689e4 font-size: 30px; margin: 10px auto;"
      >
        导入会员总数：{{ total }}
      </p>
      <p
        style=" width: 540px; height: 36px; line-height: 36px; text-align: left; color: #1689e4 font-size: 30px; margin: 10px auto;"
      >
        核实会员总数：{{ exit }}
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveModel()">确 定</el-button>
      </span>
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
    'exitCount',
    'totalCount',
    'saveModel'
  ],
  data() {
    return {
      display: false,
      exit: '',
      total: ''
    };
  },
  mounted() {
    this.display = this.dialogDisplay;
    this.exit = this.exitCount;
    this.total = this.totalCount;
  },
  methods: {},
  watch: {
    dialogDisplay(curVal) {
      this.display = this.dialogDisplay;
    },
    exitCount(curVal) {
      this.exit = this.exitCount;
    },
    totalCount(curVal) {
      this.total = this.totalCount;
    }
  }
};
</script>

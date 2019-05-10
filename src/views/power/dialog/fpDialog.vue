<template>
  <div>
    <el-dialog
      title="分配小微"
      ref="userDialog"
      :visible.sync="dialogDisplay"
      custom-class="fpdialog"
      :modal-append-to-body="false"
      @close="dialogClose"
    >
      <el-form :model="data" ref="customer" label-width="150px">
        <el-form-item label="当前城市：" style="margin-bottom:10px">
          <!-- <el-input v-model="formData.name" auto-complete="off"></el-input> -->
          <p style="padding: 11px 12px 11px 0; line-height: 1;color:blue" v-html="data.city"></p>
        </el-form-item>
        <el-form-item label="选择小微：" style="margin-bottom:0px">
          <!-- <el-input v-model="formData.name" auto-complete="off"></el-input> -->
          <el-select v-model="xwName" placeholder="请选择">
            <el-option v-for="item in initOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogClose">取 消</el-button> -->
        <el-button type="primary" @click="sub(data.city)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['data', 'random', 'display', 'jurisdiction', 'close', 'options', 'reset'],
  data() {
    return {
      dialogDisplay: false,
      selvalue: '',
      xwName: ''
    };
  },
  computed: {
    initOptions() {
      const _this = this;
      const tmp = [];
      for (const i in _this.options) {
        tmp.push({
          value: _this.options[i],
          label: _this.options[i]
        });
      }
      return tmp;
    }
  },
  methods: {
    dialogClose() {
      this.close();
    },
    sub(city) {
      const self = this;
      self
        .$confirm('是否确认分配?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          const data = {
            city,
            xwName: self.xwName
          };
          self.requestComplaint.assign(data).then((data) => {
            if (data != []) {
              self.$message({
                type: 'success',
                message: '分配成功!'
              });

              self.reset();
              self.close();
            }
          });
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.dialogDisplay = this.display;
  },
  watch: {
    random() {},
    display(curValue) {
      this.dialogDisplay = curValue;
    }
  }
};
</script>
<style>
.fpdialog {
  width: 450px;
}

.fpdialog .el-input__icon {
  display: block !important;
}
</style>

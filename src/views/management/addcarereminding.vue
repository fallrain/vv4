<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand"><i></i>关怀提醒事项配置</p>
      <div class="clear"></div>
    </div>
    <el-form ref="form" :model="form" label-width="200px" class="addcare-form">
      <el-form-item label="提醒类型：" class="required">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">生日类关怀提醒</el-radio>
          <!--<el-radio :label="2">权益发放类提醒</el-radio>-->
          <el-radio :label="3">权益到期类提醒</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="关怀提醒名称：" class="required">
        <el-input
          style="width: 300px"
          :maxlength="6"
          v-model="form.name"
          placeholder="请填写关怀提醒名称"
          @keyup.native="form.name = form.name.replace(/\s+/g, '')"
        ></el-input>
        <span style="margin-left: 5px;">* 该名称展示在小程序前端提醒按钮内，最好不超过6个汉字</span>
      </el-form-item>
      <el-form-item label="优先级：" class="required">
        <el-select v-model="form.sort" placeholder="请选择优先级">
          <el-option v-for="item in sortoptions" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
        <span style="margin-left: 5px;">* 同一用户同一时间有多个关怀提醒时合并为一个提醒，数字越小优先级越高</span>
      </el-form-item>
      <el-form-item label="距离用户生日：" v-if="form.type == 1" class="required">
        <el-input
          style="width: 60px"
          :maxlength="3"
          v-model="form.startBeforeDays"
          @keyup.native="form.startBeforeDays = form.startBeforeDays.replace(/\D/g, '').slice(0, 3)"
          @change="daysChange"
        ></el-input>
        —
        <el-input
          style="width: 60px"
          :maxlength="3"
          v-model="form.endBeforeDays"
          @keyup.native="form.endBeforeDays = form.endBeforeDays.replace(/\D/g, '').slice(0, 3)"
          @change="daysChange"
        ></el-input>
        天，提示直销员对用户进行生日关怀
      </el-form-item>
      <el-form-item label="距离权益过期：" v-if="form.type == 3" class="required">
        <el-input
          style="width: 60px"
          :maxlength="3"
          v-model="form.startBeforeDays"
          @keyup.native="form.startBeforeDays = form.startBeforeDays.replace(/\D/g, '').slice(0, 3)"
          @change="daysChange"
        ></el-input>
        —
        <el-input
          style="width: 60px"
          :maxlength="3"
          v-model="form.endBeforeDays"
          @keyup.native="form.endBeforeDays = form.endBeforeDays.replace(/\D/g, '').slice(0, 3)"
          @change="daysChange"
        ></el-input>
        天，进行过期提醒
      </el-form-item>
      <el-form-item label="展示权益选择：" v-show="form.type == 3">
        <el-button type="primary" @click="qyfocus">选择展示权益</el-button>
        <span style="margin-left: 5px;">* 选填，可多选</span>
        <div class="product-tap">
          <div v-for="(item, index) in allright">
            <span :title="item.value">{{ item.value }}</span>
            <i class="ico-del" @click="deleteright(index)"></i>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="提醒描述摘要：" class="required">
        <el-input style="width: 300px" v-model="form.summary" placeholder="请填写提醒描述摘要"></el-input>
        <span style="margin-left: 5px;">* 最多不超过20字，展示在小程序端该关怀提醒页</span>
      </el-form-item>
      <el-form-item label="说明配置：" class="required">
        <span style="margin-left: 5px;"
          >*该说明在兑呗前端展示给直销员，告知直销员该资源是什么，如何使用，或者是可发给哪些用户对象等等，分行描述</span
        >
        <div>
          <ueditor
            :value="form.desc"
            :config="config"
            v-on:input="input"
            v-on:ready="ready"
            :random="editorRandom"
          ></ueditor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add(3)">保存</el-button>
        <el-button type="primary" @click="add(1)">提交</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      class="addcare-dialog"
      title="展示权益选择"
      :modal-append-to-body="false"
      :visible.sync="qydialog"
      size="tiny"
      @close="qyclose"
    >
      <el-checkbox-group v-model="right">
        <el-checkbox :label="item" v-for="item in qytable">{{ item.value }}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="qysure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ueditor from '../comm/components/ueditor.vue';

export default {
  components: {
    ueditor
  },
  name: 'addcarereminding',
  data() {
    return {
      sortoptions: [],
      form: {
        startBeforeDays: '',
        endBeforeDays: '',
        desc: '',
        name: '',
        rightId: '',
        sort: '',
        summary: '',
        type: 1,
        status: ''
      },
      textContent: '',
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 320
      },
      editorRandom: Math.random(),
      qydialog: false,
      allright: [],
      oldright: [],
      qytable: [],
      right: []
    };
  },
  created(e) {
    const _this = this;
    for (let i = 1; i < 21; i++) {
      this.sortoptions.push(i);
    }
    this.requestManagement.listOnExecuteUserManage().then((data) => {
      if (data.isSuccess) {
        if (data.data) {
          data.data.forEach((el) => {
            _this.qytable.push({
              id: el.id,
              value: el.name
            });
          });
        }
      }
      if (_this.$route.query.id) {
        _this.requestManagement.getVipRemindDetail({ id: _this.$route.query.id }).then((data) => {
          if (data.isSuccess) {
            _this.form = data.data;
            _this.textContent = data.data.desc;
            let right = [];
            right = data.data.rightId ? data.data.rightId.split(',') : [];
            setTimeout(() => {
              for (let a = 0; a < right.length; a++) {
                for (let b = 0; b < _this.qytable.length; b++) {
                  if (right[a] == _this.qytable[b].id) {
                    _this.right.push(_this.qytable[b]);
                  }
                }
              }
            }, 200);
            if (data.data.rightId) {
              for (const i in data.data.rightId.split(',')) {
                _this.allright.push({
                  id: data.data.rightId.split(',')[i],
                  value: data.data.rightName.split(',')[i]
                });
              }
            }

            _this.oldright = _this.right;
          }
        });
      }
    });
  },
  methods: {
    daysChange(e) {
      if (this.form.startBeforeDays && this.form.endBeforeDays) {
        if (this.form.startBeforeDays > this.form.endBeforeDays) {
          this.$message.warning('结束时间不能小于开始时间');
        }
      }
    },
    input(content) {
      this.textContent = content.content;
    },
    ready() {},
    // 提交的时候this.editorRandom = Math.random();
    qyfocus() {
      this.qydialog = true;
    },
    qysure() {
      this.qydialog = false;
      this.oldright = this.right;
      this.allright = this.right;
    },
    qyclose() {
      this.right = this.oldright;
    },
    deleteright(e) {
      this.right.splice(e, 1);
    },
    add(e) {
      const self = this;
      this.editorRandom = Math.random();
      setTimeout(() => {
        self.form.desc = self.textContent;
        self.form.status = e;
        const data = JSON.parse(JSON.stringify(self.form));
        const right = [];
        if (self.right) {
          self.right.forEach((el) => {
            right.push(el.id);
          });
        }
        if (data.type == 3) {
          data.rightId = right.join(',');
        }

        if (data.name == '') {
          self.$message({
            type: 'warning',
            message: '请输入关怀提醒名称！'
          });
          return;
        }
        if (e == 1) {
          if (data.sort == '') {
            self.$message({
              type: 'warning',
              message: '请选择优先级！'
            });
            return;
          }
          if (data.startBeforeDays == '') {
            self.$message({
              type: 'warning',
              message: '请输入距离开始时间！'
            });
            return;
          }
          if (data.endBeforeDays == '') {
            self.$message({
              type: 'warning',
              message: '请输入距离开始时间！'
            });
            return;
          }
          if (data.summary == '') {
            self.$message({
              type: 'warning',
              message: '请输入提醒描述摘要！'
            });
            return;
          }
          if (data.desc == '') {
            self.$message({
              type: 'warning',
              message: '请输入说明配置！'
            });
            return;
          }
        }
        if (self.$route.query.id) {
          data.id = self.$route.query.id;
          self.requestManagement.updateVipRemind(data).then((data) => {
            if (data.isSuccess) {
              self.$router.push({
                path: '/management/carereminding'
              });
            }
          });
        } else {
          self.requestManagement.addVipRemind(data).then((data) => {
            if (data.isSuccess) {
              self.$router.push({
                path: '/management/carereminding'
              });
            }
          });
        }
      }, 500);
    }
  }
};
</script>
<style scoped>
.product-tap div {
  width: auto;
  display: inline-block;
  position: relative;
  margin-top: 10px;
  margin-right: 10px;
  width: 174px;
}
.product-tap div span {
  display: inline-block;
  line-height: 26px;
  border: 1px solid #c3e0fd;
  background: #fff;
  width: 174px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 10px;
  font-size: 12px;
}

.product-tap div .ico-del {
  width: 16px;
  height: 16px;
  cursor: pointer;
  display: inline-block;
  position: absolute;
  right: -5px;
  top: -5px;
  background: url('../../assets/images/ico-del.png') no-repeat;
  background-size: 100% 100%;
}
.product-tap {
  max-width: 622px;
}
.product-tap div {
  width: auto;
  display: inline-block;
  position: relative;
  /*margin-top: 10px;*/
  margin-right: 10px;
  /*width: 174px;*/
}

.product-tap div span {
  display: inline-block;
  line-height: 26px;
  border: 1px solid #c3e0fd;
  background: #fff;
  max-width: 174px;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 10px;
}

.product-tap div .ico-del {
  width: 16px;
  height: 16px;
  cursor: pointer;
  display: inline-block;
  position: absolute;
  right: -5px;
  top: -5px;
  background: url('../../assets/images/ico-del.png') no-repeat;
  background-size: 100% 100%;
}
</style>
<style>
.addcare-dialog .el-checkbox {
  display: block;
}
.addcare-dialog .el-checkbox + .el-checkbox {
  margin-left: 0;
}
.addcare-dialog .el-dialog__body {
  padding: 10px 20px;
}
</style>

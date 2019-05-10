<template>
  <div>
    <el-dialog
      title="用户设置"
      ref="userDialog"
      :visible.sync="dialogDisplay"
      custom-class="user-setting"
      :modal-append-to-body="false"
      @close="dialogClose"
    >
      <el-radio-group v-model="radio3">
        <el-radio-button label="品牌"></el-radio-button>
        <el-radio-button label="用户来源"></el-radio-button>
      </el-radio-group>
      <div v-if="radio3 == '品牌'" class="checkbox-group" @change="settingChange(checkList, 'brandName')">
        <el-checkbox-group v-model="checkList">
          <el-checkbox v-for="brand in brandArr" :label="brand.tagName"></el-checkbox>
        </el-checkbox-group>
      </div>
      <div v-if="radio3 == '用户来源'" class="checkbox-group" @change="settingChange(userFromSelected, 'userFrom')">
        <el-checkbox-group v-model="userFromSelected">
          <el-checkbox v-for="app in fromArr" :label="app.tagName"></el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="save" :loading="saveing">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['data', 'random', 'display', 'jurisdiction', 'close', 'brandArr', 'fromArr', 'refresh'],
  data() {
    return {
      saveing: false,
      radio3: '品牌',
      userFromArr: [],
      checkList: '',
      userFromSelected: '',
      customer: {
        name: '',
        email: '',
        mobile: ''
      },
      userForm: {},
      dialogDisplay: false,
      setting: {
        brandName: this.data.brandName,
        userFrom: this.data.userFrom
      }
    };
  },
  methods: {
    dialogClose() {
      this.close();
    },
    save() {
      const self = this;

      this.settingChange(this.checkList, 'brandName');
      this.settingChange(this.userFromSelected, 'userFrom');

      self.saveing = true;
      if (self.data.id) {
        self.requestPower
          .updateUser({
            userId: self.data.id,
            brandName: self.setting.brandName.join(','),
            userFrom: self.setting.userFrom.join(',')
          })
          .then((data) => {
            self.saveing = false;
            self.$message({
              type: 'success',
              message: '设置成功!'
            });
            self.close();
            self.refresh();
          });
      }
    },
    settingChange(selected, type) {
      let data = [];

      if (type == 'brandName') {
        data = this.brandArr;
      }

      if (type == 'userFrom') {
        data = this.fromArr;
      }

      if (selected) {
        const idArr = [];
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < selected.length; j++) {
            if (selected[j] == data[i].tagName) {
              idArr.push(data[i].tagCode);
            }
          }
        }
        this.setting[type] = idArr;
      }
    }
  },
  mounted() {
    this.dialogDisplay = this.display;
    this.userForm = this.data;
    this.checkList = this.data.brandName;
    this.userFromSelected = this.data.userFrom;
  },
  watch: {
    random() {
      this.radio3 = '品牌';
      this.checkList = this.data.brandName;
      this.userFromSelected = this.data.userFrom;
    },
    formData(curValue) {
      this.userForm = this.data;
      this.checkList = this.data.brandName;
      this.userFromSelected = this.data.userFrom;
    },
    display(curValue) {
      this.dialogDisplay = curValue;
    }
  }
};
</script>

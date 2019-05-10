<template>
  <div>
    <el-dialog
      title="新建用户"
      ref="userDialog"
      :visible.sync="dialogDisplay"
      custom-class="add-personnel"
      :modal-append-to-body="false"
      @close="dialogClose"
    >
      <el-form :model="customer" :rules="rules" ref="newUser" label-width="110px">
        <p class="litter-titel">预算项：</p>
        <el-form-item label="积分平台">
          <el-select v-model="xinxi" placeholder="请选择平台信息" @change="xinxiChange">
            <el-option v-for="item in options" :key="item.platformName" :label="item.platformName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商城预算体">
          <el-select v-model="customer.budgetCenterId" placeholder="请选择商城预算体" class="budget">
            <el-option v-for="item in budoptions" :key="item.id" :label="item.budgetName" :value="item.id"> </el-option>
          </el-select>
          <el-button type="text" style="margin-left: 9px;" @click="addBudget">新增商城预算体</el-button>
        </el-form-item>
        <p class="litter-titel">基本信息：</p>
        <el-form-item label="工号" prop="employeeNumber">
          <el-input
            v-model="customer.employeeNumber"
            auto-complete="off"
            @input.native="customer.employeeNumber = customer.employeeNumber.replace(/\s+/g, '')"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="customer.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="customer.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model.number="customer.mobile" :maxlength="11"></el-input>
        </el-form-item>
        <p class="litter-titel">平台部门：</p>
        <el-form-item label="小微" prop="xwId">
          <el-select v-model="customer.xwId" placeholder="请选择"
            ><!--:disabled="customer.industry != '' || customer.chineseArea"-->
            <el-option v-for="item in xwArr" :key="item.xwId" :label="item.xwName" :value="item.xwId"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产业" prop="industry">
          <el-select v-model="customer.industry" placeholder="请选择"
            ><!--:disabled="customer.xwId != '' || customer.chineseArea"-->
            <el-option v-for="item in industryArr" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="渠道">
          <el-select v-model="customer.channelName" placeholder="请选择">
            <el-option v-for="item in channelArr" :key="item" :label="item" :value="item"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="中国区营销" prop="chineseArea">
          <el-checkbox
            v-model="customer.chineseArea"
            style="text-align:left"
            :disabled="customer.xwId != '' || customer.industry != ''"
            >是</el-checkbox
          >
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="save" :loading="saveing">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="新增商城预算体"
      ref="userDialog"
      :visible.sync="budgetDialog"
      custom-class="add-personnel"
      :modal-append-to-body="false"
      @close="budgetClose"
    >
      <el-form :model="budmodel" :rules="budrules" ref="budget" label-width="110px">
        <el-form-item label="预算体名称" prop="budgetName">
          <el-input
            :maxlength="20"
            v-model="budmodel.budgetName"
            placeholder="请输入预算体名称"
            @input.native="budmodel.budgetName = budmodel.budgetName.replace(/\s+/g, '')"
          ></el-input>
        </el-form-item>
        <el-form-item label="预算体编码" prop="budgetCode">
          <el-input
            :maxlength="5"
            v-model="budmodel.budgetCode"
            placeholder="请输入预算体编码"
            @keyup.native="budmodel.budgetCode = budmodel.budgetCode.replace(/[^\d]/g, '')"
          ></el-input>
        </el-form-item>
        <el-form-item label="分摊到产业" class="is-required">
          <el-radio-group v-model="budmodel.chinaRegionFlag">
            <el-radio :label="-1">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button
          @click="
            budgetDialog = false;
            dialogDisplay = true;
          "
          >取 消</el-button
        >
        <el-button type="primary" @click="budsave" :loading="budsaveing">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['data', 'random', 'display', 'jurisdiction', 'close', 'change', 'refresh'],
  data() {
    const emailValidator = (rule, value, callback) => {
      if (!value) {
        // return callback(new Error('请输入客服邮箱'));
        callback();
      } else {
        if (
          /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(
            value
          ) == false
        ) {
          callback(new Error('邮箱格式有误'));
        }
        callback();
      }
    };

    const moblieValidator = (rule, value, callback) => {
      if (!value) {
        // return callback(new Error('请输入客服手机号'));
        callback();
      } else {
        if (/^[1][2-8][0-9]{9}$/.test(value) == false) {
          callback(new Error('手机号格式有误'));
        }
        callback();
      }
    };

    const isNotEmpty = (rule, value, callback) => {
      if (!value || $.trim(value) == '') {
        return callback(new Error(''));
      }
      callback();
    };

    return {
      budmodel: {
        budgetName: '',
        budgetCode: '',
        chinaRegionFlag: -1
      },
      budgetDialog: false,
      saveing: false,
      budsaveing: false,
      dialogDisplay: false,
      customer: {
        employeeNumber: '',
        userName: '',
        mobile: '',
        email: '',
        xwId: '',
        industry: '',
        chineseArea: false,
        platformCode: '',
        appSecret: '',
        appKey: '',
        budgetCenterId: '',
        channelName: ''
      },
      xinxi: '',
      options: [],
      budoptions: [],
      xwArr: [],
      industryArr: [],
      channelArr: [],
      rules: {
        employeeNumber: [
          {
            required: true, validator: isNotEmpty, message: '请输入工号', trigger: 'blur'
          },
          { max: 20, message: '长度不可超过20个字符', trigger: 'blur' }
        ],
        userName: [
          {
            required: true, validator: isNotEmpty, message: '请输入用户名', trigger: 'blur'
          },
          { max: 20, message: '长度不可超过20个字符', trigger: 'blur' }
        ],
        email: [{ validator: emailValidator, trigger: 'blur' }],
        mobile: [{ validator: moblieValidator, trigger: 'blur' }],
        budgetCenterId: [{
          required: true, validator: isNotEmpty, message: '请选择商城预算体', trigger: 'blur'
        }]
      },
      budrules: {
        budgetName: [{
          required: true, validator: isNotEmpty, message: '请输入预算体名称', trigger: 'blur'
        }],
        budgetCode: [{
          required: true, validator: isNotEmpty, message: '请输入预算体编码', trigger: 'blur'
        }]
      }
    };
  },
  methods: {
    listChannel() {
      const _this = this;
      this.requestPower.listChannel().then((data) => {
        if (data.isSuccess) {
          _this.channelArr = data.data;
        }
      });
    },
    budgetClose() {
      this.dialogDisplay = true;
      this.budgetDialog = false;
    },
    addBudget() {
      this.dialogDisplay = false;
      this.budgetDialog = true;
    },
    xinxiChange(e) {
      for (const i in this.options) {
        if (e == this.options[i].id) {
          this.customer.platformCode = this.options[i].platformCode;
          this.customer.appSecret = this.options[i].appSecret;
          this.customer.appKey = this.options[i].appKey;
        }
      }
    },
    getIntegralCenterList() {
      const _this = this;
      this.requestPower.getIntegralCenterList().then((data) => {
        if (data) {
          _this.options = data;
        }
      });
    },
    queryJfShopBudgetByPage() {
      const _this = this;
      const pare = {
        pageNo: 1,
        pageSize: 10000
      };
      this.requestPower.queryJfShopBudgetByPage(pare).then((data) => {
        if (data) {
          _this.budoptions = data.entities;
        }
      });
    },
    dialogClose() {
      this.close();
    },
    budsave() {
      const self = this;
      this.$refs.budget.validate((valid) => {
        if (valid) {
          self.budsaveing = true;
          const params = JSON.parse(JSON.stringify(self.budmodel));
          self.requestPower.createJfShopBudget(params).then((data) => {
            self.budsaveing = false;
            if (data.isSuccess) {
              self.budgetDialog = false;
              (self.budmodel = {
                budgetName: '',
                budgetCode: '',
                chinaRegionFlag: -1
              }),
              self.queryJfShopBudgetByPage();
              self.customer.budgetCenterId = data.data.id;
              self.dialogDisplay = true;
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    save() {
      const self = this;
      this.$refs.newUser.validate((valid) => {
        if (valid) {
          // if (id) {
          //  self.requestVip.updateVipMembersTag({
          //     "id": id,
          //     "employeeNumber": self.user.employeeNumber,
          //     "userName": self.user.userName,
          //     "mobile": self.user.mobile,
          //     "email": self.user.email,
          //   }).then(function(data){
          //     self.$message({
          //       type: 'success',
          //       message: '添加成功!'
          //     });
          //     self.refresh()
          //   })
          // } else {
          self.saveing = true;

          const params = {
            employeeNumber: self.customer.employeeNumber,
            userName: self.customer.userName,
            mobile: self.customer.mobile,
            email: self.customer.email,
            xwId: self.customer.xwId,
            industry: self.customer.industry,
            chineseArea: self.customer.chineseArea,
            platformCode: self.customer.platformCode,
            appSecret: self.customer.appSecret,
            appKey: self.customer.appKey,
            budgetCenterId: self.customer.budgetCenterId,
            channelName: self.customer.channelName
          };

          if (params.chineseArea) {
            params.chineseArea = 1;
          } else {
            delete params.chineseArea;
          }

          self.requestPower.addUser(params).then((data) => {
            self.saveing = false;
            if (data) {
              self.$message({
                type: 'success',
                message: '添加成功!'
              });
              self.dialogDisplay = false;
              self.close();
              self.refresh();
            }
          });
          // }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    listVipProductAppealXiaoWei() {
      const _this = this;
      this.requestPower.listVipProductAppealXiaoWei().then((data) => {
        if (data) {
          _this.xwArr = data;
        }
      });
    },
    listVipRightsIndustry() {
      const _this = this;
      this.requestPower.listVipRightsIndustry().then((data) => {
        if (data) {
          const IndustryArr = [];
          for (const item in data) {
            IndustryArr.push({
              label: item,
              value: data[item]
            });
          }

          _this.industryArr = IndustryArr;
        }
      });
    }
  },
  mounted() {
    this.dialogDisplay = this.display;
    this.listVipProductAppealXiaoWei();
    this.listVipRightsIndustry();
    this.getIntegralCenterList();
    this.queryJfShopBudgetByPage();
    this.listChannel();
  },
  watch: {
    random() {
      if (this.$refs.newUser) {
        this.$refs.newUser.resetFields();
        this.xinxi = '';
        this.customer.budgetCenterId = '';
        this.customer.channelName = '';
      }
      if (this.$refs.budget) {
        this.$refs.budget.resetFields();
        this.budmodel = {
          budgetName: '',
          budgetCode: '',
          chinaRegionFlag: -1
        };
      }
    },
    display(curValue) {
      this.dialogDisplay = curValue;
    }
  }
};
</script>
<style scoped>
.litter-titel {
  border-left: 2px solid rgb(255, 162, 79);
  padding-left: 5px;
  line-height: 1.3;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
<style>
.budget .el-input {
  width: 190px !important;
}
</style>

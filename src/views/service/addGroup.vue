<template>
  <div class="vip-groupDesc msg-template vip-content">
    <p class="template-brand">
      <i></i>{{ title
      }}<a href="javascript:;" class="color-link fr" @click="goback"
        ><i class="iconfont icon-chevron-copy-copy"></i>返回</a
      >
    </p>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="分组名称" label-width="150px" prop="groupName">
        <el-input v-model="form.groupName" style="width: 432px;" :disabled="isView"></el-input>
        <a v-if="!isView" href="javascript:;" class="color-link" style="margin-left: 10px" @click="groupSelect"
          >添加人员</a
        >
      </el-form-item>
      <el-form-item label="分组描述" label-width="150px" prop="groupDesc">
        <el-input type="textarea" v-model="form.groupDesc" :disabled="isView"></el-input>
      </el-form-item>
      <el-form-item label="已添加人员" label-width="150px">
        <!-- <el-select v-model="userIdList" multiple style="width: 432px" @change="recipientChange" :disabled="isView" :placeholder="''" popper-class="no-droplist">
              <el-option v-for="item in recipient" :key="item.id" :label="item.label" :value="item.id">
              </el-option>
            </el-select> -->
        <el-tag
          :key="tag.id"
          type="primary"
          v-for="(tag, $index) in userIdList"
          :closable="!isView"
          :close-transition="false"
          @close="handleClose($index)"
          style="margin-right: 10px"
        >
          {{ tag.userName }}
        </el-tag>
      </el-form-item>
      <el-form-item label-width="150px">
        <el-button v-if="!isView" type="primary" @click="emailAdd" :loading="saveing">确定</el-button>
        <!-- <el-button type="primary" @click="goback">返回</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ueditor from '../comm/components/ueditor.vue';
import customerSelect from './dialog/customer.vue';

export default {
  components: {
    ueditor,
    customerSelect
  },
  data() {
    const isNotEmpty = (rule, value, callback) => {
      if (!value || $.trim(value) == '') {
        return callback(new Error(''));
      }
      callback();
    };
    return {
      title: '新建分组',
      saveing: false,
      form: {
        userIdList: [],
        groupDesc: '',
        groupName: ''
      },
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 320
      },
      userIdList: [],
      recipient: [],
      value10: [],
      template: '新建通知内容',
      historyTemplate: {
        groupName: '',
        groupDesc: ''
      },
      isView: false,
      rules: {
        groupName: [
          {
            required: true, validator: isNotEmpty, message: '请输入分组名称', trigger: 'blur'
          },
          { max: 30, message: '长度不可超过30个字符', trigger: 'blur' }
        ],
        groupDesc: [
          {
            required: true, validator: isNotEmpty, message: '请输入分组描述', trigger: 'blur'
          },
          { max: 200, message: '长度不可超过200个字符', trigger: 'blur' }
        ]
      },
      selectedGroupArr: []
    };
  },
  filters: {
    nameFilter(value) {
      if (value.indexOf(':') > 0) {
        value = value.split(':')[1];
      }
      return value;
    }
  },
  methods: {
    handleClose(index) {
      this.userIdList.splice(index, 1);
    },
    // recipientChange: function () {
    //   let ids = []
    //   for (var i = 0; i < this.userIdList.length; i++) {
    //     if (this.userIdList[i].indexOf('分组') == 0){
    //       ids.push(this.userIdList[i].substring(2,3))
    //     }
    //   }

    //   let recipient = []

    //   for (var i = 0; i < this.recipient.length; i++) {
    //     if ($.inArray('' + this.recipient[i].id, ids) >= 0) {
    //       recipient.push(this.recipient[i])
    //     }
    //   }

    //   this.recipient = recipient
    // },
    selectedGroup(group) {
      const self = this;
      const { recipient } = this;
      this.recipient = group;
      for (var i = 0; i < group.length; i++) {
        group[i].selected = false;
      }

      const groups = [];
      for (var i = 0; i < group.length; i++) {
        if (!group[i].selected) {
          // group[i].label = '用户' + group[i].id + ':' + group[i].userName

          groups.push(group[i]);
        }
      }

      this.selectedGroupArr = groups;
      // this.userIdList = this.userIdList.concat(groups)

      // var userIdList = []
      // for (var i = 0; i < this.userIdList.length; i++) {
      //   if (($.inArray(this.userIdList[i], groups) >= 0 || this.userIdList[i].indexOf('分组') < 0) && $.inArray(self.userIdList[i], userIdList) < 0) {
      //     userIdList.push(self.userIdList[i])
      //   }
      // }

      // this.userIdList = userIdList
    },
    groupSelect() {
      const self = this;
      const h = this.$createElement;

      this.$msgbox({
        title: '添加人员',
        customClass: 'select-group',
        message: h('div', null, [
          h('customer-select', {
            props: {
              selectGroup: this.selectedGroup,
              recipient: this.recipient,
              random: Math.random()
            }
          })
        ]),
        showCancelButton: true,
        // showConfirmButton: true,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';

            // let groups = self.selectedGroupArr
            // console.log(groups)
            // self.userIdList = self.userIdList.concat(groups)

            // var userIdList = []
            // for (var i = 0; i < self.userIdList.length; i++) {
            //   if (($.inArray(self.userIdList[i], groups) >= 0 || self.userIdList[i].indexOf('分组') < 0) && $.inArray(self.userIdList[i], userIdList) < 0) {
            //     userIdList.push(self.userIdList[i])
            //   }
            // }
            const groupIdsArr = [];
            for (var i = 0; i < self.userIdList.length; i++) {
              groupIdsArr.push(self.userIdList[i].id);
            }

            const { userIdList } = self;
            for (var i = 0; i < self.selectedGroupArr.length; i++) {
              if ($.inArray(self.selectedGroupArr[i].id, groupIdsArr) < 0) {
                userIdList.push(self.selectedGroupArr[i]);
              }
            }
            self.userIdList = userIdList;

            // self.$message({
            //   type: 'success',
            //   message: '添加成功!'
            // });
            done();
            instance.confirmButtonLoading = false;
          } else {
            done();
          }
        }
      }).then((action) => {
        console.log(action);
        if (action === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        }
      });
    },
    input(groupDesc) {
      this.form.groupDesc = groupDesc.groupDesc;
    },
    ready() {},
    goback() {
      history.go(-1);
    },
    emailAdd() {
      const self = this;

      this.$refs.form.validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.form));

          if (this.form.groupName == '') {
            self.$message({
              type: 'warning',
              message: '请填写分组名称'
            });
            return;
          }

          this.form.userIdList = [];
          for (let i = 0; i < this.userIdList.length; i++) {
            // if (this.userIdList[i].indexOf('用户') == 0){
            //     let user = this.userIdList[i].split(':')[0]
            //    this.form.userIdList.push(user.substring(2,user.length))
            // } else {
            this.form.userIdList.push(this.userIdList[i].id);
            // }
          }

          data.userIdList = this.form.userIdList.join(',');

          self.saveing = true;
          if (!data.id) {
            this.requestService.addGroup(data).then((data) => {
              if (data) {
                if (data) {
                  self.saveing = false;
                  // 跳转列表页
                  self.$router.push({
                    path: '/service/group'
                  });

                  self.$message({
                    type: 'success',
                    message: '保存成功!'
                  });
                }
              }
            });
          } else {
            this.requestService.updateGroup(data).then((data) => {
              if (data) {
                if (data) {
                  self.saveing = false;
                  // 跳转列表页
                  self.$router.push({
                    path: '/service/group'
                  });

                  self.$message({
                    type: 'success',
                    message: '保存成功!'
                  });
                }
              }
            });
          }
        }
      });
    },
    emailGet() {
      const self = this;
      if (self.$route.query.id) {
        this.requestService
          .getGroup({
            id: self.$route.query.id
          })
          .then((data) => {
            self.form = {
              id: data.id,
              userIdList: [],
              groupDesc: data.groupDesc,
              groupName: data.groupName
            };

            // self.userIdList = []
            // for (var i = 0; i < data.userList.length; i++) {
            //  // self.userIdList.push(data.userList[i].userName)
            //  self.userIdList.push('用户' + data.userList[i].id + ':' + data.userList[i].userName)
            //  self.form.userIdList.push('用户' + data.userList[i].id + ':' + data.userList[i].userName)
            // }

            self.userIdList = data.userList;
          });
      } else {
        this.form = {
          userIdList: '',
          groupDesc: '',
          groupName: ''
        };
        this.userIdList = [];
      }
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  },
  mounted() {
    this.emailGet();
    this.isView = !!this.$route.query.type;
    if (this.$route.query.id) {
      this.title = '客服分组详情';
    }
  }
};
</script>

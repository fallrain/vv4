<template>
  <div class="vip-content msg-template">
    <p class="template-brand">
      <i></i>发送通知<a href="javascript:;" class="color-link fr" @click="goback"
        ><i class="iconfont icon-chevron-copy-copy"></i>返回</a
      >
    </p>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item>
        <div class="el-form-item__label" style="width: 70px; margin-bottom: 5px;"><i class="impor">*</i>接收人</div>
        <el-tag
          :key="tag.id"
          type="primary"
          v-for="(tag, $index) in recipient"
          :closable="!isView"
          :close-transition="false"
          @close="handleClose(tag.id, $index)"
        >
          {{ tag.groupName }}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-if="!isView && !inputVisible" class="button-new-tag" size="small" @click="showInput"
          >添加用户</el-button
        >
        <!-- <el-select v-model="groupIdsAndEmails" multiple filterable allow-create style="width: 432px" @change="recipientChange" :disabled="isView" :no-data-text="' '">
              <el-option v-for="item in recipient" :key="item.id" :label="item.label" :value="item.id">
              </el-option>
            </el-select> -->
        <a
          v-if="!isView"
          href="javascript:;"
          class="color-link"
          style="margin-left: 10px"
          @click="groupSelect"
          :disabled="isView"
          >选择分组</a
        >
        <!--<div class="el-form-item__error" style="margin-left: 70px">请选择接收人</div>-->
      </el-form-item>
      <el-form-item label="主题" label-width="150px" prop="subject">
        <el-input v-model="form.subject" style="width: 432px;" :disabled="isView"></el-input>
      </el-form-item>
      <div v-if="!isView" style="margin-left: 150px;">
        <div>
          <!--  <el-radio-group v-model="template" @change="templateSelect">
                <el-radio-button label="新建通知内容"></el-radio-button>
                <el-radio-button label="使用已有模板"></el-radio-button>
              </el-radio-group> -->
          <!-- <el-button type="primary">新建通知内容</el-button> -->

          <!-- <el-button type="primary" @click="templateSelect">使用已有模板</el-button> -->
          <el-button type="primary" @click="qaSelect" style="margin-bottom: 20px">选择常用问答</el-button>
          <!-- <a href="javascript:;" class="color-link" style="margin:10px 0 30px 10px;display: inline-block;" @click="qaSelect">选择常用问答</a> -->
        </div>
      </div>
      <div>
        <div class="el-form-item__label" style="width: 150px;float: left;"><i class="impor">*</i>模板内容</div>
        <el-form-item style="margin-left: 70px" prop="content">
          <ueditor
            :value="form.content"
            :config="config"
            v-on:input="input"
            v-on:ready="ready"
            :disabled="isView"
            :random="editorRandom"
          ></ueditor>
        </el-form-item>
      </div>
      <el-form-item v-if="jurisdiction['servicesOperations:customerNotifyManager:save'] && !isView" label-width="150px">
        <el-button type="primary" @click="emailAdd" :loading="saveing">发送</el-button>
        <el-button type="primary" @click="emailSave" :loading="mailSaveing">保存</el-button>
      </el-form-item>
    </el-form>

    <qa-select
      :random="qaDialog.random"
      :dialogDisplay="qaDialog.display"
      :closeDialog="closeQADialog"
      :selectedModel="selectedQA"
    >
    </qa-select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ueditor from '../comm/components/ueditor.vue';
import groupSelect from './dialog/group.vue';
import templateSelect from './dialog/template.vue';
import qaSelect from './dialog/qa.vue';

export default {
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    })
  },
  components: {
    ueditor,
    groupSelect,
    templateSelect,
    qaSelect
  },
  data() {
    const isNotEmpty = (rule, value, callback) => {
      if (!value || $.trim(value) == '') {
        return callback(new Error(''));
      }
      callback();
    };
    return {
      saveing: false,
      mailSaveing: false,
      isView: false,
      form: {
        groupIdsAndEmails: [],
        content: '',
        subject: ''
      },
      content: '',
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 320
      },
      groupIdsAndEmails: [],
      selectedgroupIdsAndEmails: [],
      recipient: [],
      value10: [],
      template: '新建通知内容',
      historyTemplate: {
        subject: '',
        content: ''
      },
      rules: {
        subject: [
          {
            required: true, validator: isNotEmpty, message: '请输入主题', trigger: 'blur'
          },
          { max: 30, message: '长度不可超过30个字', trigger: 'blur' }
        ]
        //        content: [
        //          { required: true, validator: isNotEmpty, message: '请输入模版内容', trigger: 'blur' },
        //          { max: 500, message: '长度不可超过500个字', trigger: 'blur' }
        //        ],
      },
      qaDialog: {
        display: false,
        random: Math.random()
      },
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      editorRandom: Math.random()
    };
  },
  methods: {
    handleClose(tagId, index) {
      this.groupIdsAndEmails.splice(this.dynamicTags.indexOf(tagId), 1);
      this.selectedgroupIdsAndEmails.splice(index, 1);
      this.recipient = JSON.parse(JSON.stringify(this.selectedgroupIdsAndEmails));
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      if (this.inputValue != '') {
        if (
          /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/.test(
            this.inputValue
          ) == false
        ) {
          this.$message({
            type: 'warning',
            message: '请输入邮箱！'
          });
          this.inputVisible = false;
          this.inputValue = '';
          return false;
        }
        const { inputValue } = this;

        if (inputValue && $.inArray(inputValue, this.groupIdsAndEmails) < 0) {
          this.groupIdsAndEmails.push(inputValue);
          this.selectedgroupIdsAndEmails.push({
            id: inputValue,
            groupName: inputValue
          });
          this.recipient = JSON.parse(JSON.stringify(this.selectedgroupIdsAndEmails));
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    },
    closeQADialog() {
      this.qaDialog.display = false;
    },
    selectedQA(selection) {
      this.qaDialog.display = false;
      for (let i = 0; i < selection.length; i++) {
        this.form.content += `问：${selection[i].question}<br>` + `答：${selection[i].answer}<br>`;
      }
    },
    goback() {
      history.go(-1);
    },
    recipientChange() {
      // let ids = []
      // for (var i = 0; i < this.groupIdsAndEmails.length; i++) {
      //   if (this.groupIdsAndEmails[i].indexOf('分组') == 0){
      //     ids.push(this.groupIdsAndEmails[i].substring(2,3))
      //   }
      // }
      // let recipient = []
      // for (var i = 0; i < this.recipient.length; i++) {
      //   if ($.inArray('' + this.recipient[i].id, ids) >= 0) {
      //     recipient.push(this.recipient[i])
      //   }
      // }
      // this.recipient = recipient
    },
    selectedGroup(group) {
      const self = this;

      // for (var i = 0; i < group.length; i++) {
      //   group[i].selected = false
      // }

      // if (!this.selectedgroupIdsAndEmails) {
      //   this.selectedgroupIdsAndEmails = []
      // }

      const groupIdsAndEmails = [];
      for (var i = 0; i < self.recipient.length; i++) {
        groupIdsAndEmails.push(self.recipient[i].id);
      }
      this.groupIdsAndEmails = groupIdsAndEmails;
      self.selectedgroupIdsAndEmails = JSON.parse(JSON.stringify(self.recipient));

      for (var i = 0; i < group.length; i++) {
        if ($.inArray(group[i].id, this.groupIdsAndEmails) < 0) {
          this.groupIdsAndEmails.push(group[i].id);
          this.selectedgroupIdsAndEmails.push(group[i]);
        }
      }

      // const recipient = this.recipient
      // this.recipient = group

      // var groups = []
      // for (var i = 0; i < group.length; i++) {
      //   if (!group[i].selected) {
      //     group[i].label = group[i].id
      //     groups.push(group[i].label)
      //   }
      // }

      // this.selectedgroupIdsAndEmails = this.groupIdsAndEmails.concat(groups)

      // var groupIdsAndEmails = []
      // for (var i = 0; i < this.selectedgroupIdsAndEmails.length; i++) {
      //   if ($.inArray(self.selectedgroupIdsAndEmails[i], groupIdsAndEmails) < 0) {
      //     groupIdsAndEmails.push(self.selectedgroupIdsAndEmails[i])
      //   }
      // }

      // this.selectedgroupIdsAndEmails = groupIdsAndEmails
      // this.groupIdsAndEmails = groupIdsAndEmails
    },
    selectedTemplate(template) {
      // if (template.question) {
      //   this.historyTemplate.content += '问：' + template.question + '<br>' + '答：' + template.answer + '<br>'
      // } else if (template.length > 0) {
      //   for (var i = 0; i < template.length; i++) {
      //     this.historyTemplate.content += '问：' + template[i].question + '<br>' + '答：' + template[i].answer + '<br>'
      //   }
      // }

      if (template.subject) {
        this.historyTemplate.subject = template.subject;
        this.historyTemplate.content = template.content;
      }
    },
    templateSelect(label) {
      // if (label != '使用已有模板') {
      //   return false
      // }

      const self = this;
      const h = this.$createElement;

      this.$msgbox({
        title: '选择发送模板',
        customClass: 'select-group',
        message: h('div', null, [
          h('template-select', {
            props: {
              selectedTemplate: this.selectedTemplate,
              autoInit: Math.random()
            }
          })
        ]),
        showCancelButton: true,
        // showConfirmButton: true,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';

            self.form.subject = self.historyTemplate.subject;
            self.form.content = self.historyTemplate.content;

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
        if (action === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        }
      });
    },
    groupSelect() {
      const self = this;
      const h = this.$createElement;

      this.$msgbox({
        title: '选择客服分组',
        customClass: 'select-group',
        message: h('div', null, [
          h('group-select', {
            props: {
              selectGroup: this.selectedGroup,
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

            // console.log(self.selectedgroupIdsAndEmails)
            // for (var i = 0; i < self.selectedgroupIdsAndEmails.length; i++) {
            //   if ($.inArray(self.selectedgroupIdsAndEmails[i], self.groupIdsAndEmails) < 0) {
            //     self.groupIdsAndEmails.push(self.selectedgroupIdsAndEmails[i])
            //   }
            // }

            self.recipient = JSON.parse(JSON.stringify(self.selectedgroupIdsAndEmails));

            // self.$message({
            //   type: 'success',
            //   message: '添加成功!'
            // });
            done();
            instance.confirmButtonLoading = false;
          } else {
            const groupIdsAndEmails = [];
            for (let i = 0; i < self.recipient.length; i++) {
              groupIdsAndEmails.push(self.recipient[i].id);
            }
            this.groupIdsAndEmails = groupIdsAndEmails;
            self.selectedgroupIdsAndEmails = JSON.parse(JSON.stringify(self.recipient));
            done();
          }
        }
      }).then((action) => {
        if (action === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        }
      });
    },
    qaSelect() {
      this.qaDialog.display = true;
      this.qaDialog.random = Math.random();
    },
    input(content) {
      this.content = content.content;
    },
    ready() {},
    goback() {
      history.go(-1);
    },
    emailAdd() {
      const self = this;
      if (this.groupIdsAndEmails == '') {
        // console.log(1)
        this.$message({
          type: 'info',
          message: '请选择接收人'
        });
        return;
      }

      this.editorRandom = Math.random();

      setTimeout(() => {
        self.form.content = self.content;

        if (self.form.content == '') {
          // console.log(2)
          self.$message({
            type: 'info',
            message: '请填写模板内容'
          });
          return;
        }

        self.$refs.form.validate((valid) => {
          if (valid) {
            const data = JSON.parse(JSON.stringify(self.form));

            self.form.groupIdsAndEmails = [];
            // for (var i = 0; i < this.groupIdsAndEmails.length; i++) {
            //   if (this.groupIdsAndEmails[i].indexOf('分组') == 0){
            //      this.form.groupIdsAndEmails.push(this.groupIdsAndEmails[i].split(':')[0].split('分组')[1])
            //   } else {
            //     this.form.groupIdsAndEmails.push(this.groupIdsAndEmails[i])
            //   }
            // }

            for (let i = 0; i < self.recipient.length; i++) {
              self.form.groupIdsAndEmails.push(self.recipient[i].id);
            }

            data.groupIdsAndEmails = self.form.groupIdsAndEmails.join(',');

            self.saveing = true;
            self.requestService.sendNotice(data).then((data) => {
              if (data) {
                if (data) {
                  self.saveing = false;

                  self.$message({
                    type: 'success',
                    message: '保存成功！'
                  });

                  // 跳转列表页
                  self.$router.push({
                    path: '/service/faqs'
                  });
                }
              }
            });
          }
        });
      }, 500);
    },
    emailSave() {
      const self = this;
      // if(this.groupIdsAndEmails == ''){
      //   //console.log(1)
      //   this.$message({
      //     type: 'info',
      //     message: '请选择接收人'
      //   });
      //   return
      // }
      this.editorRandom = Math.random();
      setTimeout(() => {
        self.form.content = self.content;
        if (self.form.content == '') {
          // console.log(2)
          self.$message({
            type: 'info',
            message: '请填写模板内容'
          });
          return;
        }

        self.$refs.form.validate((valid) => {
          if (valid) {
            const data = JSON.parse(JSON.stringify(self.form));

            self.form.groupIdsAndEmails = [];
            // for (var i = 0; i < this.groupIdsAndEmails.length; i++) {
            //   if (this.groupIdsAndEmails[i].indexOf('分组') == 0){
            //      this.form.groupIdsAndEmails.push(this.groupIdsAndEmails[i].split(':')[0].split('分组')[1])
            //   } else {
            //     this.form.groupIdsAndEmails.push(this.groupIdsAndEmails[i])
            //   }
            // }

            for (let i = 0; i < self.recipient.length; i++) {
              self.form.groupIdsAndEmails.push(self.recipient[i].id);
            }

            data.groupIdsAndEmails = self.form.groupIdsAndEmails.join(',');

            self.mailSaveing = true;
            if (self.$route.query.id) {
              self.requestService.updateCustomerEmail(data).then((data) => {
                self.mailSaveing = false;
                if (data) {
                  // 跳转列表页
                  self.$router.push({
                    path: '/service/faqs'
                  });

                  self.$message({
                    type: 'success',
                    message: '保存成功！'
                  });
                }
              });
            } else {
              self.requestService.addCustomerEmail(data).then((data) => {
                self.mailSaveing = false;
                if (data) {
                  // 跳转列表页
                  self.$router.push({
                    path: '/service/faqs'
                  });

                  self.$message({
                    type: 'success',
                    message: '保存成功！'
                  });
                }
              });
            }
          }
        });
      }, 500);
    },
    emailGet() {
      const self = this;
      if (self.$route.query.id && self.$route.query.type == 'view') {
        this.requestService
          .getHistoryQA({
            id: self.$route.query.id
          })
          .then((data) => {
            self.form = {
              id: data.id,
              groupIdsAndEmails: data.groupIdsAndEmails,
              content: data.content,
              subject: data.subject
            };

            const idsArr = data.groupIdsAndEmails.split(',');
            const idsNameArr = data.groupNameAndEmails.split(',');
            self.groupIdsAndEmails = [];
            for (let i = 0; i < idsArr.length; i++) {
              self.groupIdsAndEmails.push(idsArr[i]);
              self.selectedgroupIdsAndEmails.push({
                id: idsArr[i],
                groupName: idsNameArr[i]
              });
            }
            self.recipient = JSON.parse(JSON.stringify(self.selectedgroupIdsAndEmails));
          });
      } else if (self.$route.query.id && self.$route.query.type == 'edit') {
        this.requestService
          .getCustomerEmail({
            id: self.$route.query.id
          })
          .then((data) => {
            self.form = {
              id: data.id,
              groupIdsAndEmails: data.groupIdsAndEmails,
              content: data.content,
              subject: data.subject
            };

            if (data.groupIdsAndEmails) {
              const idsArr = data.groupIdsAndEmails.split(',');
              const idsNameArr = data.groupNameAndEmails.split(',');
              self.groupIdsAndEmails = [];
              for (let i = 0; i < idsArr.length; i++) {
                self.groupIdsAndEmails.push(idsArr[i]);
                self.selectedgroupIdsAndEmails.push({
                  id: idsArr[i],
                  groupName: idsNameArr[i]
                });
              }
              self.recipient = JSON.parse(JSON.stringify(self.selectedgroupIdsAndEmails));
            }
          });
      } else {
        this.form = {
          groupIdsAndEmails: '',
          content: '',
          subject: ''
        };
        this.groupIdsAndEmails = [];
        this.selectedgroupIdsAndEmails = [];
        this.recipient = [];
        this.content = '';
      }
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  },
  mounted() {
    this.emailGet();
    this.isView = this.$route.query.type == 'view';
  },
  watch: {
    // 点击左侧菜单刷新页面
    $route(curVal) {
      this.emailGet();
      this.isView = this.$route.query.type == 'view';
    }
  }
};
</script>

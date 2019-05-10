<template>
  <div class="vip-content msg-template">
    <p class="template-brand">
      <i></i>基本信息<a href="javascript:;" class="color-link fr" @click="goback"
        ><i class="iconfont icon-chevron-copy-copy"></i>返回</a
      >
    </p>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="等级名称" label-width="180px" prop="rankName">
        <el-input v-model="form.rankName" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="过期提醒" label-width="180px">
        <!-- <el-radio-group v-model="form.expiredAlarm"> -->
        <!-- <el-radio :label="3">是</el-radio> -->
        <!-- <el-radio :label="6">否 -->
        <div style="border: 1px solid #eee;border-radius: 5px;width: 670px;padding: 5px 0;margin-top: -5px;">
          <span style="margin: 0 5px 0 15px;">提前</span>
          <el-input
            v-model="form.alarmBeforeDays"
            style="width: 50px;margin-bottom: 20px;"
            @keyup.native="scaleChange('alarmBeforeDays')"
          ></el-input>
          <!-- <el-input-number v-model="form.alarmBeforeDays" :min="0" :max="999" style="margin-bottom: 20px;"></el-input-number> -->
          <span style="margin: 0 15px 0 5px;">天提醒</span>
          <br />

          <a
            href="javascript:;"
            class="color-link"
            style="margin: 0 5px 0 15px;"
            @click="templateSelect('expiredAlarmTemplateIds', 0)"
            >邮件</a
          >
          <!-- <el-tag v-for="tag in form.expiredAlarmTemplateIds[0].template" :key="tag.id" :closable="true" @close="clearInput('expiredAlarmTemplateIds', 0)"> {{tag.name}} </el-tag> -->
          <el-tooltip
            v-for="tag in form.expiredAlarmTemplateIds[0].template"
            :disabled="tag.name.length < 6"
            :content="tag.name"
            placement="top"
          >
            <div style="display: inline-block">
              <el-tag :key="tag.id" :closable="true" type="primary" @close="clearInput('expiredAlarmTemplateIds', 0)">
                {{ tag.name | nameSubString }}
              </el-tag>
            </div>
          </el-tooltip>
          <!-- <el-input v-model="form.expiredAlarmTemplateIds[0].template" style="width: 140px" disabled icon="circle-close" :on-icon-click="clearInput" templateType="expiredAlarmTemplateIds" templateIndex="0"></el-input> -->
          <a
            href="javascript:;"
            class="color-link"
            style="margin: 0 5px 0 15px;"
            @click="templateSelect('expiredAlarmTemplateIds', 1)"
            >站内信</a
          >
          <!-- <el-tag v-for="tag in form.expiredAlarmTemplateIds[1].template" :key="tag.id" :closable="true" @close="clearInput('expiredAlarmTemplateIds', 1)"> {{tag.name}} </el-tag> -->
          <el-tooltip
            v-for="tag in form.expiredAlarmTemplateIds[1].template"
            :disabled="tag.name.length < 6"
            :content="tag.name"
            placement="top"
          >
            <div style="display: inline-block">
              <el-tag :key="tag.id" :closable="true" type="primary" @close="clearInput('expiredAlarmTemplateIds', 1)">
                {{ tag.name | nameSubString }}
              </el-tag>
            </div>
          </el-tooltip>
          <!-- <el-input v-model="form.expiredAlarmTemplateIds[1].template" style="width: 140px" disabled icon="circle-close" :on-icon-click="clearInput" templateType="expiredAlarmTemplateIds" templateIndex="1"></el-input> -->
          <a
            href="javascript:;"
            class="color-link"
            style="margin: 0 5px 0 15px;"
            @click="templateSelect('expiredAlarmTemplateIds', 2)"
            >短信</a
          >
          <el-tooltip
            v-for="tag in form.expiredAlarmTemplateIds[2].template"
            :disabled="tag.name.length < 6"
            :content="tag.name"
            placement="top"
          >
            <div style="display: inline-block">
              <el-tag :key="tag.id" :closable="true" type="primary" @close="clearInput('expiredAlarmTemplateIds', 2)">
                {{ tag.name | nameSubString }}
              </el-tag>
            </div>
          </el-tooltip>
          <!-- <el-input v-model="form.expiredAlarmTemplateIds[2].template" style="width: 140px" disabled icon="circle-close" :on-icon-click="clearInput" templateType="expiredAlarmTemplateIds" templateIndex="2"></el-input> -->
          <a
            href="javascript:;"
            class="color-link"
            style="margin: 0 5px 0 15px;"
            @click="templateSelect('expiredAlarmTemplateIds', 3)"
            >微信</a
          >

          <!-- <el-tag v-for="tag in form.expiredAlarmTemplateIds[3].template" :key="tag.id" :closable="true" @close="clearInput('expiredAlarmTemplateIds', 2)"> {{tag.name}} </el-tag> -->
          <el-tooltip
            v-for="tag in form.expiredAlarmTemplateIds[3].template"
            :disabled="tag.name.length < 6"
            :content="tag.name"
            placement="top"
          >
            <div style="display: inline-block">
              <el-tag :key="tag.id" :closable="true" type="primary" @close="clearInput('expiredAlarmTemplateIds', 3)">
                {{ tag.name | nameSubString }}
              </el-tag>
            </div>
          </el-tooltip>
          <!-- <el-input v-model="form.expiredAlarmTemplateIds[3].template" style="width: 140px" disabled icon="circle-close" :on-icon-click="clearInput" templateType="expiredAlarmTemplateIds" templateIndex="3"></el-input> -->
          <!-- </el-radio> -->
          <!-- </el-radio-group> -->
        </div>
      </el-form-item>

      <el-form-item label="升级提醒" label-width="180px">
        <div style="border: 1px solid #eee;border-radius: 5px;width: 670px;">
          <!-- <el-radio-group v-model="form.updateAlarm"> -->
          <!-- <el-radio :label="3">是</el-radio> -->
          <!-- <el-radio :label="6">否 -->
          <a
            href="javascript:;"
            class="color-link"
            style="margin: 0 5px 0 15px;"
            @click="templateSelect('updateAlarmTemplateIds', 0)"
            >邮件</a
          >
          <!-- <el-tag v-for="tag in form.updateAlarmTemplateIds[0].template" :key="tag.id" :closable="true" @close="clearInput('updateAlarmTemplateIds', 0)"> {{tag.name}} </el-tag> -->
          <el-tooltip
            v-for="tag in form.updateAlarmTemplateIds[0].template"
            :disabled="tag.name.length < 6"
            :content="tag.name"
            placement="top"
          >
            <div style="display: inline-block">
              <el-tag :key="tag.id" :closable="true" type="primary" @close="clearInput('updateAlarmTemplateIds', 0)">
                {{ tag.name | nameSubString }}
              </el-tag>
            </div>
          </el-tooltip>
          <!-- <el-input v-model="form.updateAlarmTemplateIds[0].template" style="width: 140px" disabled icon="circle-close" :on-icon-click="clearInput" templateType="updateAlarmTemplateIds" templateIndex="0"></el-input> -->
          <a
            href="javascript:;"
            class="color-link"
            style="margin: 0 5px 0 15px;"
            @click="templateSelect('updateAlarmTemplateIds', 1)"
            >站内信</a
          >
          <!-- <el-tag v-for="tag in form.updateAlarmTemplateIds[1].template" :key="tag.id" :closable="true" @close="clearInput('updateAlarmTemplateIds', 1)"> {{tag.name}} </el-tag> -->
          <el-tooltip
            v-for="tag in form.updateAlarmTemplateIds[1].template"
            :disabled="tag.name.length < 6"
            :content="tag.name"
            placement="top"
          >
            <div style="display: inline-block">
              <el-tag :key="tag.id" :closable="true" type="primary" @close="clearInput('updateAlarmTemplateIds', 1)">
                {{ tag.name | nameSubString }}
              </el-tag>
            </div>
          </el-tooltip>
          <!-- <el-input v-model="form.updateAlarmTemplateIds[1].template" style="width: 140px" disabled icon="circle-close" :on-icon-click="clearInput" templateType="updateAlarmTemplateIds" templateIndex="1"></el-input> -->
          <a
            href="javascript:;"
            class="color-link"
            style="margin: 0 5px 0 15px;"
            @click="templateSelect('updateAlarmTemplateIds', 2)"
            >短信</a
          >
          <!-- <el-tag v-for="tag in form.updateAlarmTemplateIds[2].template" :key="tag.id" :closable="true" @close="clearInput('updateAlarmTemplateIds', 2)"> {{tag.name}} </el-tag> -->
          <el-tooltip
            v-for="tag in form.updateAlarmTemplateIds[2].template"
            :disabled="tag.name.length < 6"
            :content="tag.name"
            placement="top"
          >
            <div style="display: inline-block">
              <el-tag :key="tag.id" :closable="true" type="primary" @close="clearInput('updateAlarmTemplateIds', 2)">
                {{ tag.name | nameSubString }}
              </el-tag>
            </div>
          </el-tooltip>
          <!-- <el-input v-model="form.updateAlarmTemplateIds[2].template" style="width: 140px" disabled icon="circle-close" :on-icon-click="clearInput" templateType="updateAlarmTemplateIds" templateIndex="2"></el-input> -->
          <a
            href="javascript:;"
            class="color-link"
            style="margin: 0 5px 0 15px;"
            @click="templateSelect('updateAlarmTemplateIds', 3)"
            >微信</a
          >
          <!-- <el-tag v-for="tag in form.updateAlarmTemplateIds[3].template" :key="tag.id" :closable="true" @close="clearInput('updateAlarmTemplateIds', 3)"> {{tag.name}} </el-tag> -->
          <el-tooltip
            v-for="tag in form.updateAlarmTemplateIds[3].template"
            :disabled="tag.name.length < 6"
            :content="tag.name"
            placement="top"
          >
            <div style="display: inline-block">
              <el-tag :key="tag.id" :closable="true" type="primary" @close="clearInput('updateAlarmTemplateIds', 3)">
                {{ tag.name | nameSubString }}
              </el-tag>
            </div>
          </el-tooltip>
          <!-- <el-input v-model="form.updateAlarmTemplateIds[3].template" style="width: 140px" disabled icon="circle-close" :on-icon-click="clearInput" templateType="updateAlarmTemplateIds" templateIndex="3"></el-input> -->
          <!-- </el-radio> -->
          <!-- </el-radio-group> -->
        </div>
      </el-form-item>

      <el-form-item label="降级提醒" label-width="180px">
        <div style="border: 1px solid #eee;border-radius: 5px;width: 670px;">
          <!-- <el-radio-group v-model="form.degradeAlarm"> -->
          <!-- <el-radio :label="3">是</el-radio> -->
          <!-- <el-radio :label="6">否 -->
          <a
            href="javascript:;"
            class="color-link"
            style="margin: 0 5px 0 15px;"
            @click="templateSelect('degradeAlarmTemplateIds', 0)"
            >邮件</a
          >
          <!-- <el-tag v-for="tag in form.degradeAlarmTemplateIds[0].template" :key="tag.id" :closable="true" @close="clearInput('degradeAlarmTemplateIds', 0)"> {{tag.name}} </el-tag> -->
          <el-tooltip
            v-for="tag in form.degradeAlarmTemplateIds[0].template"
            :disabled="tag.name.length < 6"
            :content="tag.name"
            placement="top"
          >
            <div style="display: inline-block">
              <el-tag :key="tag.id" :closable="true" type="primary" @close="clearInput('degradeAlarmTemplateIds', 0)">
                {{ tag.name | nameSubString }}
              </el-tag>
            </div>
          </el-tooltip>
          <!-- <el-input v-model="form.degradeAlarmTemplateIds[0].template" style="width: 140px" disabled icon="circle-close" :on-icon-click="clearInput" templateType="degradeAlarmTemplateIds" templateIndex="0"></el-input> -->
          <a
            href="javascript:;"
            class="color-link"
            style="margin: 0 5px 0 15px;"
            @click="templateSelect('degradeAlarmTemplateIds', 1)"
            >站内信</a
          >
          <!-- <el-tag v-for="tag in form.degradeAlarmTemplateIds[1].template" :key="tag.id" :closable="true" @close="clearInput('degradeAlarmTemplateIds', 1)"> {{tag.name}} </el-tag> -->
          <el-tooltip
            v-for="tag in form.degradeAlarmTemplateIds[1].template"
            :disabled="tag.name.length < 6"
            :content="tag.name"
            placement="top"
          >
            <div style="display: inline-block">
              <el-tag :key="tag.id" :closable="true" type="primary" @close="clearInput('degradeAlarmTemplateIds', 1)">
                {{ tag.name | nameSubString }}
              </el-tag>
            </div>
          </el-tooltip>
          <!-- <el-input v-model="form.degradeAlarmTemplateIds[1].template" style="width: 140px" disabled icon="circle-close" :on-icon-click="clearInput" templateType="degradeAlarmTemplateIds" templateIndex="1"></el-input> -->
          <a
            href="javascript:;"
            class="color-link"
            style="margin: 0 5px 0 15px;"
            @click="templateSelect('degradeAlarmTemplateIds', 2)"
            >短信</a
          >
          <!-- <el-tag v-for="tag in form.degradeAlarmTemplateIds[2].template" :key="tag.id" :closable="true" @close="clearInput('degradeAlarmTemplateIds', 2)"> {{tag.name}} </el-tag> -->
          <el-tooltip
            v-for="tag in form.degradeAlarmTemplateIds[2].template"
            :disabled="tag.name.length < 6"
            :content="tag.name"
            placement="top"
          >
            <div style="display: inline-block">
              <el-tag :key="tag.id" :closable="true" type="primary" @close="clearInput('degradeAlarmTemplateIds', 2)">
                {{ tag.name | nameSubString }}
              </el-tag>
            </div>
          </el-tooltip>
          <!-- <el-input v-model="form.degradeAlarmTemplateIds[2].template" style="width: 140px" disabled icon="circle-close" :on-icon-click="clearInput" templateType="degradeAlarmTemplateIds" templateIndex="2"></el-input> -->
          <a
            href="javascript:;"
            class="color-link"
            style="margin: 0 5px 0 15px;"
            @click="templateSelect('degradeAlarmTemplateIds', 3)"
            >微信</a
          >
          <!-- <el-tag v-for="tag in form.degradeAlarmTemplateIds[3].template" :key="tag.id" :closable="true" @close="clearInput('degradeAlarmTemplateIds', 3)"> {{tag.name}} </el-tag> -->
          <el-tooltip
            v-for="tag in form.degradeAlarmTemplateIds[3].template"
            :disabled="tag.name.length < 6"
            :content="tag.name"
            placement="top"
          >
            <div style="display: inline-block">
              <el-tag :key="tag.id" :closable="true" type="primary" @close="clearInput('degradeAlarmTemplateIds', 3)">
                {{ tag.name | nameSubString }}
              </el-tag>
            </div>
          </el-tooltip>
          <!-- <el-input v-model="form.degradeAlarmTemplateIds[3].template" style="width: 140px" disabled icon="circle-close" :on-icon-click="clearInput" templateType="degradeAlarmTemplateIds" templateIndex="3"></el-input> -->
          <!-- </el-radio> -->
          <!-- </el-radio-group> -->
        </div>
      </el-form-item>

      <p class="template-brand"><i></i>成长值设置</p>

      <el-form-item label="范围" label-width="180px">
        <el-input
          v-model="form.growupValueStart"
          style="width: 68px"
          @keyup.native="scaleChange('growupValueStart')"
        ></el-input>
        <span style="margin: 0 10px">—</span>
        <el-input
          v-model="form.growupValueEnd"
          style="width: 68px"
          @keyup.native="scaleChange('growupValueEnd')"
        ></el-input>
        <el-radio-group v-model="form.growupValueOpen" style="margin-left: 18px">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="-1">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="有效期" label-width="180px">
        <el-input
          v-model="form.growupValueValid"
          style="width: 68px"
          @keyup.native="scaleChange('growupValueValid')"
        ></el-input>
        <!-- <el-input-number v-model="form.growupValueValid" :min="0" style="margin-bottom: 20px;"></el-input-number> -->
        <span style="margin: 0 10px">个月</span>
        <span>（ 0 为永久有效）</span>
      </el-form-item>

      <p class="template-brand"><i></i>注册产品累计金额设置</p>

      <el-form-item label="范围" label-width="180px">
        <el-input
          v-model="form.regProductAmountCountStart"
          style="width: 68px"
          @keyup.native="scaleChange('regProductAmountCountStart')"
        ></el-input>
        <span style="margin: 0 10px">—</span>
        <el-input
          v-model="form.regProductAmountCountEnd"
          style="width: 68px"
          @keyup.native="scaleChange('regProductAmountCountEnd')"
        ></el-input>
        <el-radio-group v-model="form.regProductAmountCountOpen" style="margin-left: 18px">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="-1">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="有效期" label-width="180px">
        <el-input
          v-model="form.regProductAmountCountValid"
          style="width: 68px"
          @keyup.native="scaleChange('regProductAmountCountValid')"
        ></el-input>
        <!-- <el-input-number v-model="form.regProductAmountCountValid" :min="0" style="margin-bottom: 20px;"></el-input-number> -->
        <span style="margin: 0 10px">个月</span>
        <span>（ 0 为永久有效）</span>
      </el-form-item>

      <p class="template-brand"><i></i>付费购买金额设置</p>
      <el-form-item label="范围" label-width="180px">
        <el-input
          v-model="form.buyProductAmountCountStart"
          style="width: 68px"
          @keyup.native="scaleChange('buyProductAmountCountStart')"
        ></el-input>
        <span style="margin: 0 10px">—</span>
        <el-input
          v-model="form.buyProductAmountCountEnd"
          style="width: 68px"
          @keyup.native="scaleChange('buyProductAmountCountEnd')"
        ></el-input>
        <el-radio-group v-model="form.buyProductAmountCountOpen" style="margin-left: 18px">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="-1">停用</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label-width="180px">
        <el-button type="primary" @click="weChatAdd" :loading="saveing">保存</el-button>
        <el-button @click="goback">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import templateSelect from './dialog/template.vue';

export default {
  components: {
    templateSelect
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
      form: {
        neverExpired: 0,
        rankName: '',
        alarmBeforeDays: '',
        expiredAlarmTemplateIds: [
          {
            type: 1,
            template: []
          },
          {
            type: 2,
            template: []
          },
          {
            type: 3,
            template: []
          },
          {
            type: 4,
            template: []
          }
        ],
        expiredAlarm: '',
        updateAlarm: '',
        updateAlarmTemplateIds: [
          {
            type: 1,
            template: []
          },
          {
            type: 2,
            template: []
          },
          {
            type: 3,
            template: []
          },
          {
            type: 4,
            template: []
          }
        ],
        degradeAlarm: '',
        degradeAlarmTemplateIds: [
          {
            type: 1,
            template: []
          },
          {
            type: 2,
            template: []
          },
          {
            type: 3,
            template: []
          },
          {
            type: 4,
            template: []
          }
        ],
        growupValueStart: '',
        growupValueEnd: '',
        growupValueOpen: '',
        growupValueValid: '',
        regProductAmountCountStart: '',
        regProductAmountCountEnd: '',
        regProductAmountCountOpen: '',
        regProductAmountCountValid: '',
        buyProductAmountCountStart: '',
        buyProductAmountCountEnd: '',
        buyProductAmountCountOpen: ''
      },
      template: {},
      rules: {
        rankName: [
          {
            required: true, validator: isNotEmpty, message: '请输入等级名称', trigger: 'blur'
          },
          { max: 30, message: '长度不可超过30个字符', trigger: 'blur' }
        ]
      }
    };
  },
  filters: {
    nameSubString(value) {
      if (value.length > 6) {
        value = `${value.substring(0, 5)}...`;
      }
      return value;
    }
  },
  methods: {
    // 数字格式限制
    scaleChange(type) {
      this.form[type] = this.form[type].replace(/\D/g, '');
    },
    goback() {
      history.go(-1);
    },
    selectedTemplate(template) {
      this.template = template;
    },
    templateSelect(templateType, index) {
      const self = this;
      const h = this.$createElement;

      this.$msgbox({
        title: '选择发送模板',
        customClass: 'select-group',
        message: h('div', null, [
          h('template-select', {
            props: {
              selectedTemplate: this.selectedTemplate,
              autoInit: Math.random(),
              type: index + 1
            }
          })
        ]),
        showCancelButton: true,
        // showConfirmButton: true,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';

            // self.form[templateType][index].template = '模板' + this.template.id + '：' + this.template.templateName
            self.form[templateType][index].template = [
              {
                id: self.template.id,
                name: self.template.templateName
              }
            ];

            self.$message({
              type: 'success',
              message: '添加成功!'
            });
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
    weChatAdd() {
      const self = this;
      this.$refs.form.validate((valid) => {
        if (valid) {
          const data = JSON.parse(JSON.stringify(this.form));

          data.degradeAlarmTemplates = [];
          data.expiredAlarmTemplates = [];
          data.updateAlarmTemplates = [];

          if (data.growupValueStart != '' && parseInt(data.growupValueStart) >= parseInt(data.growupValueEnd)) {
            self.$message({
              type: 'warning',
              message: '请确认成长值范围!'
            });
            return false;
          }

          if (
            data.regProductAmountCountStart != ''
            && parseInt(data.regProductAmountCountStart) >= parseInt(data.regProductAmountCountEnd)
          ) {
            self.$message({
              type: 'warning',
              message: '请确认注册产品累计金额范围!'
            });
            return false;
          }

          if (
            data.buyProductAmountCountStart != ''
            && parseInt(data.buyProductAmountCountStart) >= parseInt(data.buyProductAmountCountEnd)
          ) {
            self.$message({
              type: 'warning',
              message: '请确认付费购买金额范围!'
            });
            return false;
          }

          // if (data.expiredAlarmTemplateIds.indexOf('模板') >= 0) {
          //   data.expiredAlarmTemplateIds = data.expiredAlarmTemplateIds.substring(2,3)
          // }
          // if (data.updateAlarmTemplateIds.indexOf('模板') >= 0) {
          //   data.updateAlarmTemplateIds = data.updateAlarmTemplateIds.substring(2,3)
          // }
          // if (data.degradeAlarmTemplateIds.indexOf('模板') >= 0) {
          //   data.degradeAlarmTemplateIds = data.degradeAlarmTemplateIds.substring(2,3)
          // }

          for (var i = 0; i < data.expiredAlarmTemplateIds.length; i++) {
            if (data.expiredAlarmTemplateIds[i].template != '') {
              data.expiredAlarmTemplates.push(
                `${data.expiredAlarmTemplateIds[i].type}:${data.expiredAlarmTemplateIds[i].template[0].id}`
              );
            }
          }

          if (data.expiredAlarmTemplates == '') {
            self.$message({
              type: 'warning',
              message: '请选择过期提醒模板!'
            });
            return false;
          }

          for (var i = 0; i < data.updateAlarmTemplateIds.length; i++) {
            if (data.updateAlarmTemplateIds[i].template != '') {
              data.updateAlarmTemplates.push(
                `${data.updateAlarmTemplateIds[i].type}:${data.updateAlarmTemplateIds[i].template[0].id}`
              );
            }
          }
          for (var i = 0; i < data.degradeAlarmTemplateIds.length; i++) {
            if (data.degradeAlarmTemplateIds[i].template != '') {
              data.degradeAlarmTemplates.push(
                `${data.degradeAlarmTemplateIds[i].type}:${data.degradeAlarmTemplateIds[i].template[0].id}`
              );
            }
          }

          data.degradeAlarmTemplates = data.degradeAlarmTemplates.join(',');
          data.expiredAlarmTemplates = data.expiredAlarmTemplates.join(',');
          data.updateAlarmTemplates = data.updateAlarmTemplates.join(',');

          delete data.expiredAlarmTemplateIds;
          delete data.updateAlarmTemplateIds;
          delete data.degradeAlarmTemplateIds;

          self.saveing = true;
          if (data.id) {
            this.requestStrategy.updateRank(data).then((data) => {
              if (data) {
                self.saveing = false;
                self.$message({
                  type: 'success',
                  message: '保存成功!'
                });
                self.$router.push({
                  path: '/strategy/level'
                });
              }
            });
          } else {
            this.requestStrategy.insertRank(data).then((data) => {
              if (data) {
                self.saveing = false;
                self.$message({
                  type: 'success',
                  message: '保存成功!'
                });
                self.$router.push({
                  path: '/strategy/level'
                });
              }
            });
          }
        }
      });
    },
    weChatGet() {
      const self = this;
      if (self.$route.query.id) {
        this.requestStrategy
          .rankFindById({
            id: self.$route.query.id,
            brandName: self.$route.query.brandName
          })
          .then((data) => {
            if (data) {
              self.form = {
                id: data.id,
                neverExpired: data.neverExpired,
                rankName: data.rankName,
                alarmBeforeDays: data.alarmBeforeDays,
                // expiredAlarmTemplateIds: data.expiredAlarmTemplateIds,
                expiredAlarm: data.expiredAlarm,
                updateAlarm: data.updateAlarm,
                // updateAlarmTemplateIds: data.updateAlarmTemplateIds,
                degradeAlarm: data.degradeAlarm,
                // degradeAlarmTemplateIds: data.degradeAlarmTemplateIds,
                growupValueStart: data.growupValueStart || '',
                growupValueEnd: data.growupValueEnd || '',
                growupValueOpen: data.growupValueOpen || '',
                growupValueValid: data.growupValueValid,
                regProductAmountCountStart: data.regProductAmountCountStart || '',
                regProductAmountCountEnd: data.regProductAmountCountEnd || '',
                regProductAmountCountOpen: data.regProductAmountCountOpen || '',
                regProductAmountCountValid: data.regProductAmountCountValid,
                buyProductAmountCountStart: data.buyProductAmountCountStart || '',
                buyProductAmountCountEnd: data.buyProductAmountCountEnd || '',
                buyProductAmountCountOpen: data.buyProductAmountCountOpen || '',
                expiredAlarmTemplateIds: [
                  { type: 1, template: [] },
                  { type: 2, template: [] },
                  { type: 3, template: [] },
                  { type: 4, template: [] }
                ],
                updateAlarmTemplateIds: [
                  { type: 1, template: [] },
                  { type: 2, template: [] },
                  { type: 3, template: [] },
                  { type: 4, template: [] }
                ],
                degradeAlarmTemplateIds: [
                  { type: 1, template: [] },
                  { type: 2, template: [] },
                  { type: 3, template: [] },
                  { type: 4, template: [] }
                ]
              };

              const expiredAlarmTemplates = data.expiredAlarmTemplates ? data.expiredAlarmTemplates.split(',') : [];
              const expiredAlarmTemplatesName = data.expiredAlarmTemplatesName
                ? data.expiredAlarmTemplatesName.split(',')
                : [];
              for (var i = 0; i < expiredAlarmTemplates.length; i++) {
                // self.form.expiredAlarmTemplateIds[parseInt(expiredAlarmTemplates[i].split(':')[0])-1].template = '模板' + expiredAlarmTemplates[i].split(':')[1]
                self.form.expiredAlarmTemplateIds[parseInt(expiredAlarmTemplates[i].split(':')[0]) - 1].template = [
                  {
                    id: expiredAlarmTemplates[i].split(':')[1],
                    name:
                      expiredAlarmTemplatesName.length == 0
                        ? expiredAlarmTemplates[i].split(':')[1]
                        : expiredAlarmTemplatesName[i].split('：')[1]
                  }
                ];
              }

              const updateAlarmTemplates = data.updateAlarmTemplates ? data.updateAlarmTemplates.split(',') : [];
              const updateAlarmTemplatesName = data.updateAlarmTemplatesName
                ? data.updateAlarmTemplatesName.split(',')
                : [];
              for (var i = 0; i < updateAlarmTemplates.length; i++) {
                // self.form.updateAlarmTemplateIds[parseInt(updateAlarmTemplates[i].split(':')[0])-1].template = '模板' + updateAlarmTemplates[i].split(':')[1]
                self.form.updateAlarmTemplateIds[parseInt(updateAlarmTemplates[i].split(':')[0]) - 1].template = [
                  {
                    id: updateAlarmTemplates[i].split(':')[1],
                    name:
                      updateAlarmTemplatesName.length == 0
                        ? updateAlarmTemplates[i].split(':')[1]
                        : updateAlarmTemplatesName[i].split('：')[1]
                  }
                ];
              }

              const degradeAlarmTemplates = data.degradeAlarmTemplates ? data.degradeAlarmTemplates.split(',') : [];
              const degradeAlarmTemplatesName = data.degradeAlarmTemplatesName
                ? data.degradeAlarmTemplatesName.split(',')
                : [];
              for (var i = 0; i < degradeAlarmTemplates.length; i++) {
                // self.form.degradeAlarmTemplateIds[parseInt(expiredAlarmTemplates[i].split(':')[0])-1].template = '模板' + degradeAlarmTemplates[i].split(':')[1]
                self.form.degradeAlarmTemplateIds[parseInt(expiredAlarmTemplates[i].split(':')[0]) - 1].template = [
                  {
                    id: degradeAlarmTemplates[i].split(':')[1],
                    name:
                      degradeAlarmTemplatesName.length == 0
                        ? degradeAlarmTemplates[i].split(':')[1]
                        : degradeAlarmTemplatesName[i].split('：')[1]
                  }
                ];
              }
            } else {
              self.$message({
                type: 'warning',
                message: '查询策略不存在！'
              });
              self.$router.push({
                path: '/strategy/level'
              });
            }
          });
      } else {
        this.form = {
          neverExpired: 0,
          rankName: '',
          alarmBeforeDays: '',
          expiredAlarmTemplateIds: [
            {
              type: 1,
              template: []
            },
            {
              type: 2,
              template: []
            },
            {
              type: 3,
              template: []
            },
            {
              type: 4,
              template: []
            }
          ],
          expiredAlarm: '',
          updateAlarm: '',
          updateAlarmTemplateIds: [
            {
              type: 1,
              template: []
            },
            {
              type: 2,
              template: []
            },
            {
              type: 3,
              template: []
            },
            {
              type: 4,
              template: []
            }
          ],
          degradeAlarm: '',
          degradeAlarmTemplateIds: [
            {
              type: 1,
              template: []
            },
            {
              type: 2,
              template: []
            },
            {
              type: 3,
              template: []
            },
            {
              type: 4,
              template: []
            }
          ],
          growupValueStart: '',
          growupValueEnd: '',
          growupValueOpen: '',
          growupValueValid: '',
          regProductAmountCountStart: '',
          regProductAmountCountEnd: '',
          regProductAmountCountOpen: '',
          regProductAmountCountValid: '',
          buyProductAmountCountStart: '',
          buyProductAmountCountEnd: '',
          buyProductAmountCountOpen: ''
        };
      }
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    clearInput(type, index) {
      this.form[type][index].template = [];
      // this.form[$(input.target).parent().attr('templateType')][$(input.target).parent().attr('templateIndex')].template = ''
    }
  },
  mounted() {
    this.weChatGet();
  }
};
</script>

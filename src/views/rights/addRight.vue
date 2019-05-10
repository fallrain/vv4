<template>
  <div class="vip-content msg-template">
    <p class="template-brand">
      <i></i>{{ title }}
      <a href="javascript:;" class="color-link fr" @click="goback">
        <i class="iconfont icon-chevron-copy-copy"></i>返回</a
      >
    </p>
    <el-form ref="form" :model="form" :rules="rules" label-width="165px">
      <el-form-item label="权益名称" prop="rightsName">
        <el-input v-model="form.rightsName" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="权益描述" prop="rightsDesc">
        <el-input type="textarea" v-model="form.rightsDesc"></el-input>
      </el-form-item>
      <el-form-item label="权益分类">
        <el-select v-model="form.rightsType" placeholder="请选择权益分类" style="width: 300px;">
          <el-option label="内部权益" value="1"></el-option>
          <el-option label="外部权益" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权益图片">
        <el-upload
          class="upload-demo"
          :action="gUtils.getApiUrl() + 'vipcenter/upload/uploadRightsImage'"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList2"
          list-type="picture"
          :on-success="uploadSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-button v-if="form.rigthsImageUrl == ''" size="small" type="primary">点击上传</el-button>
          <div v-if="form.rigthsImageUrl == ''" slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="有效期">
        <el-radio-group v-model="form.neverExpired" @change="expiredTimeChange">
          <el-radio :label="1">不限</el-radio>
          <el-radio :label="-1">
            <el-date-picker v-model="dateRange[0]" type="date" placeholder="选择日期范围" :editable="false">
            </el-date-picker>
            <span>—</span>
            <el-date-picker v-model="dateRange[1]" type="date" placeholder="选择日期范围" :editable="false">
            </el-date-picker>
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="权益类型">
        <el-select v-model="form.type" placeholder="请选择权益类型" style="width: 300px;" :disabled="isEdit">
          <el-option label="免费清洗" value="1"></el-option>
          <el-option label="免费延保" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="randDisplay" label="适用等级">
        <el-checkbox-group v-model="form.rankUseIds" v-show="form.type == '1'">
          <div v-if="rank.rankName != '黑名单'" v-for="rank in memberRank">
            <el-checkbox :label="rank.rankName" style="width: 50px"></el-checkbox>
            <!-- <el-form-item label="使用频率"> -->
            <span style="margin: 0 10px 0 60px;">使用频率</span>
            <el-radio-group v-model="rank.useFrequency">
              <el-radio :label="1" style="margin-right: 8px">不限</el-radio>
              <el-radio :label="-1">
                <el-select v-model="rank.useFrequencyLimitType" placeholder="请选择频率" style="width: 120px;">
                  <el-option label="每年" value="1"></el-option>
                  <el-option label="每季度" value="2"></el-option>
                  <el-option label="每月" value="3"></el-option>
                  <el-option label="每周" value="4"></el-option>
                  <el-option label="每天" value="5"></el-option>
                </el-select>
                <el-input-number
                  v-model="rank.useFrequencyNums"
                  @change="handleChange"
                  :min="1"
                  style="width:130px;"
                ></el-input-number>
              </el-radio>
            </el-radio-group>
            <!-- </el-form-item> -->
          </div>
        </el-checkbox-group>
        <el-checkbox-group v-model="form.rankUseIds" v-show="form.type == '2'">
          <div v-if="rank.rankName != '黑名单'" v-for="rank in memberRank">
            <el-checkbox :label="rank.rankName" style="width: 50px"></el-checkbox>
            <!-- <el-form-item label="使用频率"> -->
            <span style="margin: 0 10px 0 60px;">期限</span>
            <el-input-number
              :controls="false"
              v-model="rank.useYearLimit"
              style="width: 50px;"
              placeholder="请输入时间"
            ></el-input-number>
            年
            <span style="margin: 0 10px 0 30px;">适用产品大类</span>
            <el-select
              v-if="form.type == 2"
              v-model="rank.productCategory"
              multiple
              placeholder="请选择产品类别"
              style="width: 500px;"
              class="addrightSel"
            >
              <el-option v-for="item in proCategory" :label="item.productCategoryName" :value="item.id"></el-option>
            </el-select>
            <!-- </el-form-item> -->
          </div>
        </el-checkbox-group>
      </el-form-item>

      <!-- <el-form-item label="适用分组"> -->
      <!-- <span v-for="item in recipient">{{item.label}}<br></span> -->
      <!-- <a href="javascript:;" class="color-link" @click="groupSelect">选择分组</a> -->
      <!-- <a href="javascript:;" class="color-link">选择分组</a> -->
      <!-- </el-form-item> -->
      <!-- <el-form-item label="使用频率"> -->
      <!-- <div>
              <span style="margin-right: 10px">使用频率</span>
              <el-radio-group v-model="form.useFrequency">
                <el-radio :label="1">不限</el-radio>
                <el-radio :label="-1">
                  <el-select v-model="form.useFrequencyLimitType" placeholder="请选择频率" style="width: 120px;">
                    <el-option label="每年" value="1"></el-option>
                    <el-option label="每季度" value="2"></el-option>
                    <el-option label="每月" value="3"></el-option>
                    <el-option label="每周" value="4"></el-option>
                    <el-option label="每天" value="5"></el-option>
                  </el-select>
                  <el-input-number v-model="form.useFrequencyNums" @change="handleChange" :min="1" style="width:130px;"></el-input-number>
                </el-radio>
              </el-radio-group>
            </div>
          </el-form-item> -->
      <el-form-item label="状态">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="-3">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--  <el-form-item label="成本核算方式">
            <el-select v-model="form.costAccounting" placeholder="请选择模板分类" style="width: 300px;">
              <el-option label="无" value="0"></el-option>
              <el-option label="售后系统" value="1"></el-option>
              <el-option label="EHaier" value="2"></el-option>
            </el-select>
          </el-form-item> -->
      <el-form-item
        v-if="
          jurisdiction['rightsOperations:rightsStrategy:save'] || jurisdiction['rightsOperations:rightsStrategy:edit']
        "
      >
        <el-button type="primary" @click="weChatAdd" :loading="saveing">保存</el-button>
        <el-button @click="goback">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import groupSelect from '../care/dialog/member.vue';
import gUtils from '../../utils/gUtils.js';


export default {
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    })
  },
  components: {
    groupSelect
  },
  data() {
    const isNotEmpty = (rule, value, callback) => {
      if (!value || $.trim(value) == '') {
        return callback(new Error(''));
      }
      callback();
    };
    return {
      isEdit: false,
      title: '新建权益',
      saveing: false,
      radio: '1',
      num1: '',
      dateRange: [],
      form: {
        rightsName: '',
        rightsDesc: '',
        rightsType: '',
        neverExpired: 1,
        useFrequency: 1,
        status: 1,
        rankUseIds: [],
        useFrequencyLimitType: [],
        useFrequencyNums: 1,
        costAccounting: [],
        rigthsImageUrl: '',
        useYearLimit: '',
        productCategory: '',
        type: 1
      },
      // type: '1',
      recipient: [],
      variable: {
        base: [
          {
            key: '$User.userName',
            desc: '用户名'
          },
          {
            key: '$User.mobile',
            desc: '手机号'
          }
        ],
        extend: [
          {
            key: '$User.rights',
            desc: '享受权益'
          },
          {
            key: '$User.level',
            desc: '用户等级'
          },
          {
            key: '$User.growth',
            desc: '用户成长值'
          }
          // ,{
          //   key: '$User.score',
          //   desc: '用户当前积分数'
          // }
        ]
      },
      memberRank: [],
      randDisplay: false,
      groupIdsAndEmails: [],
      rules: {
        rightsName: [
          {
            required: true,
            validator: isNotEmpty,
            message: '请输入权益名称',
            trigger: 'blur'
          },
          {
            max: 30,
            message: '长度不可超过30个字符',
            trigger: 'blur'
          }
        ],
        rightsDesc: [
          {
            required: true,
            validator: isNotEmpty,
            message: '请输入权益描述',
            trigger: 'blur'
          },
          {
            max: 200,
            message: '长度不可超过200个字符',
            trigger: 'blur'
          }
        ]
      },
      fileList2: [],
      proCategory: []
    };
  },
  methods: {
    uploadSuccess(response, file, fileList) {
      if (response.isSuccess) {
        console.log(response.data.rigthsImageUrl);
        this.form.rigthsImageUrl = response.data.rigthsImageUrl;
      }
    },
    handleRemove(file, fileList) {
      const self = this;
      setTimeout(() => {
        self.form.rigthsImageUrl = '';
      }, 500);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 <= 500;

      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 500kb!');
      }

      if (!isImg) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!');
      }

      return isImg && isLt2M;
    },
    handleChange() {},
    // 变更有效期清空时间
    expiredTimeChange() {
      if (this.form.neverExpired == 1) {
        this.dateRange = [];
      }
    },
    memberRankFilter(rankName) {
      const rankIds = [];
      const self = this;

      for (let i = 0; i < rankName.length; i++) {
        for (let j = 0; j < this.memberRank.length; j++) {
          if (rankName[i] == this.memberRank[j].rankName) {
            rankIds.push({
              rankId: self.memberRank[j].id,
              useFrequency: self.memberRank[j].useFrequency,
              useFrequencyLimitType: self.memberRank[j].useFrequencyLimitType,
              useFrequencyNums: self.memberRank[j].useFrequencyNums,
              useYearLimit: self.memberRank[j].useYearLimit,
              productCategory: self.memberRank[j].productCategory
            });
          }
        }
      }

      return rankIds;
    },
    goback() {
      history.go(-1);
    },
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
          group[i].label = `分组${group[i].id}:${group[i].groupName}`;

          groups.push(group[i].label);
        }
      }

      this.groupIdsAndEmails = this.groupIdsAndEmails.concat(groups);

      const groupIdsAndEmails = [];
      for (var i = 0; i < this.groupIdsAndEmails.length; i++) {
        if (
          ($.inArray(this.groupIdsAndEmails[i], groups) >= 0 || this.groupIdsAndEmails[i].indexOf('分组') < 0)
          && $.inArray(self.groupIdsAndEmails[i], groupIdsAndEmails) < 0
        ) {
          groupIdsAndEmails.push(self.groupIdsAndEmails[i]);
        }
      }

      this.groupIdsAndEmails = groupIdsAndEmails;
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
              recipient: this.recipient
            }
          })
        ]),
        showCancelButton: true,
        // showConfirmButton: true,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';

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
    queryMemberRank(rank) {
      const self = this;
      this.requestCare.queryMemberRank().then((data) => {
        self.memberRank = self.memberRank.concat(data);

        for (var i = 0; i < self.memberRank.length; i++) {
          self.$set(self.memberRank, i, {
            id: self.memberRank[i].id,
            rankName: self.memberRank[i].rankName,
            useFrequency: 1,
            useFrequencyLimitType: [],
            useFrequencyNums: 1,
            useYearLimit: '',
            productCategory: ''
          });
        }

        if (rank) {
          for (var i = 0; i < self.memberRank.length; i++) {
            for (let j = 0; j < rank.length; j++) {
              if (self.memberRank[i].id == rank[j].rankId) {
                self.memberRank[i].useFrequency = rank[j].useFrequency;
                self.memberRank[i].useFrequencyLimitType = rank[j].useFrequencyLimitType;
                self.memberRank[i].useFrequencyNums = rank[j].useFrequencyNums;
                self.memberRank[i].useYearLimit = rank[j].useYearLimit;
                self.memberRank[i].productCategory = rank[j].productCategory;
              }
            }
          }
        }

        self.randDisplay = true;
      });
    },
    weChatAdd() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.form);
          if (this.form.rightsType == '') {
            this.$message({
              type: 'warning',
              message: '请选择适用等级'
            });
            return false;
          }

          const self = this;
          const data = JSON.parse(JSON.stringify(this.form));
          data.rank = self.memberRankFilter(data.rankUseIds);
          for (let i = 0; i < data.rank.length; i++) {
            let productCategory = '';
            if (data.rank[i].productCategory.length > 0) {
              productCategory = data.rank[i].productCategory.join(',');
            }
            data.rank[i].productCategory = productCategory;
          }
          // data.group = []

          // for (var i = 0; i < self.recipient.length; i++) {

          //   data.group.push({
          //     groupId: self.recipient[i].id,
          //     useFrequency: data.useFrequency,
          //     useFrequencyLimitType: data.useFrequencyLimitType || 1,
          //     useFrequencyNums: data.useFrequencyNums
          //   })
          // }

          if (data.neverExpired < 0) {
            data.startTime = gUtils.dateFormat(Date.parse(this.dateRange[0]), 'yyyy-MM-dd');
            data.expiredTime = gUtils.dateFormat(Date.parse(this.dateRange[1]), 'yyyy-MM-dd');
          }

          self.saveing = true;
          if (data.id) {
            this.requestCare.update(data).then((data) => {
              self.saveing = false;
              if (data) {
                const h = self.$createElement;
                self.$notify({
                  message: h('p', {}, '保存成功'),
                  duration: 1000
                });
                self.$router.push({
                  path: '/rights/xrights'
                });
              }
            });
          } else {
            this.requestCare.add(data).then((data) => {
              self.saveing = false;
              if (data) {
                const h = self.$createElement;
                self.$notify({
                  message: h('p', {}, '保存成功'),
                  duration: 1000
                });
                self.$router.push({
                  path: '/rights/xrights'
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
        this.requestCare
          .queryDetail({
            id: self.$route.query.id
          })
          .then((data) => {
            data = data[0];
            // let group = JSON.parse(data.config).group

            self.form = {
              id: data.id,
              rightsName: data.rightsName,
              rightsDesc: data.rightsDesc,
              rightsType: `${data.rightsType}`,
              neverExpired: data.neverExpired,
              // useFrequency: group[0].useFrequency,
              status: data.status,
              rankUseIds: data.rankUseIds.split(','),
              // useFrequencyLimitType: group[0].useFrequencyLimitType,
              // useFrequencyNums: group[0].useFrequencyNums,
              costAccounting: data.costAccounting,
              rigthsImageUrl: data.rigthsImageUrl || '',
              type: `${data.type}`
            };

            if (data.rigthsImageUrl && data.rigthsImageUrl != '') {
              self.fileList2 = [
                {
                  url: data.rigthsImageUrl
                }
              ];
            }
            // for (var i = 0; i < group.length; i++) {
            //   group[i].label = group[i].groupId
            // }

            // self.recipient = group

            // self.memberRank = self.memberRank.concat(data);

            // console.log(self.memberRank)
            // console.log(JSON.parse(data.config).rank)

            const o = JSON.parse(data.config).rank;
            if (data.type == 2) {
              for (let i = 0; i < o.length; i++) {
                o[i].productCategory = o[i].productCategory.split(',');
                console.log(o[i].productCategory);
              }
            }

            self.queryMemberRank(o);

            self.dateRange = [data.startTime, data.expiredTime];
          });
      } else {
        this.queryMemberRank();
        this.form = {
          rightsName: '',
          rightsDesc: '',
          rightsType: '',
          neverExpired: 1,
          useFrequency: 1,
          status: 1,
          rankUseIds: [],
          useFrequencyLimitType: [],
          useFrequencyNums: 1,
          costAccounting: [],
          rigthsImageUrl: '',
          type: '1',
          useYearLimit: '',
          productCategory: ''
        };
      }
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  },
  mounted() {
    this.weChatGet();
    if (this.$route.query.id) {
      this.title = '权益详情';
      this.isEdit = true;
    }

    const _this = this;
    // this.requestCare.getAllProductCategory({}).then(function (data) {
    //   if (data) {
    //     for (var i = 0; i < data.length; i++) {
    //       data[i].id = '' + data[i].id;
    //     }
    //     _this.proCategory = data;
    //   }
    // })
  }
};
</script>

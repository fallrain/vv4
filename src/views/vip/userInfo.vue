<template>
  <div class="vip-content" v-loading="loading" element-loading-text="筛选中">
    <div class="vip-head-tool">
      <p class="template-brand">
        <i></i>基本信息
        <!-- <el-button type="primary" @click="goback" class="fr" style="margin-left: 20px;">返回</el-button> -->
        <!-- <el-button v-if="jurisdiction['member:memberManger:setMemberTab']" type="primary" @click="addTags" class="fr">设置业务标签</el-button> -->
        <el-button
          v-if="jurisdiction['member:memberManager:setMemberGroup']"
          type="primary"
          @click="addGroup"
          class="fr"
          style="margin-right: 10px;padding: 5px 10px;"
          >加入分组</el-button
        >
      </p>
      <div class="clear"></div>
    </div>
    <div class="vip-filter-search">
      <el-input
        :maxlength="40"
        placeholder="登录名、手机号、邮箱"
        icon="search"
        v-model="matchField"
        :on-icon-click="handleIconClick"
        @keyup.enter.native="handleIconClick"
        style="width: 300px"
      >
      </el-input>
    </div>
    <div class="vip-user-info">
      <table style="table-layout:fixed">
        <tr>
          <td width="10%">姓名</td>
          <td width="23.3%">
            <b>{{ userInfo.givenName }}</b>
          </td>
          <td width="10%">电话</td>
          <td width="23.3%">
            <b>{{ userInfo.mobile }}</b>
          </td>
          <td width="10%">用户ID</td>
          <td width="23.3%">
            <b>{{ userInfo.userId }}</b>
          </td>
        </tr>
        <tr>
          <td>会员帐号</td>
          <td>
            <b>{{ userInfo.username }}</b>
          </td>
          <td>会员级别</td>
          <td>
            <b style="margin-right: 12px;">{{ userInfo.rankId }}</b>
            <a
              href="javascript:;"
              class="color-link"
              @click="editRank"
              v-if="userInfo.rankId && jurisdiction['member:memberRecordManager:setRank']"
              >修改</a
            >
          </td>
          <td>会员积分</td>
          <td>
            <b class="user-score">{{ userInfo.integralTotal }}</b>
          </td>
        </tr>
        <tr>
          <td>生日</td>
          <td>
            <b v-if="userInfo.birthday">{{ gUtils.dateFormat(userInfo.birthday.time, 'yyyy-MM-dd') }}</b>
          </td>
          <td>年龄</td>
          <td>
            <b v-if="userInfo.birthday">{{
              gUtils.dateFormat(new Date(), 'yyyy') - gUtils.dateFormat(userInfo.birthday.time, 'yyyy')
            }}</b>
          </td>
          <td>email</td>
          <td>
            <b>{{ userInfo.email }}</b>
          </td>
        </tr>
        <tr>
          <td>详细地址</td>
          <td colspan="5">
            <b
              style="word-wrap: break-word;"
              v-if="
                userInfo.address &&
                  (userInfo.address.province ||
                    userInfo.address.city ||
                    userInfo.address.district ||
                    userInfo.address.line1)
              "
              >{{ userInfo.address.province }}{{ userInfo.address.city }}{{ userInfo.address.district
              }}{{ userInfo.address.line1 }}</b
            >
          </td>
        </tr>
        <tr>
          <td>要求服务地址</td>
          <td colspan="5">
            <b style="word-wrap: break-word;" v-for="item in userInfo.serviceAddress"
              >{{ item.address.province }}{{ item.address.city }}{{ item.address.district }}{{ item.address.town
              }}{{ item.address.line1 }}{{ item.address.line2 }}</b
            >
          </td>
        </tr>
        <tr>
          <td>其他地址</td>
          <td colspan="5"><b></b></td>
        </tr>
        <tr>
          <td>收入水平</td>
          <td>
            <b class="user-score">{{ userInfo.income | incomeFilter }}</b>
          </td>
          <td>成长值</td>
          <td>
            <b>{{ userInfo.growup }}</b>
          </td>
          <td>婚姻状况</td>
          <td>
            <b>{{ userInfo.marriage | marriageFilter }}</b>
          </td>
        </tr>
        <tr>
          <td>品牌</td>
          <td>
            <b>{{ getUserInfo.brandName }}</b>
          </td>
        </tr>
        <tr>
          <td>基础标签</td>
          <td colspan="5">
            <div>
              <el-tag v-for="(tag, index) in userInfo.baseTagName" type="primary" v-if="index < 3 || baseTagMore">{{
                tag
              }}</el-tag>
              <a
                v-if="userInfo.baseTagName.length > 3"
                href="javascript:;"
                class="color-link"
                style="margin-left: 10px;font-size: 12px;"
                @click="more('baseTagMore')"
              >
                <span v-if="!baseTagMore">更多</span>
                <span v-if="baseTagMore">收起</span>
              </a>
            </div>
          </td>
        </tr>
        <!-- <tr>
            <td>业务标签</td>
            <td colspan="5">
              <div>
                <el-tag v-for="(tag, index) in userInfo.businessTag" type="primary" v-if="index < 3 || businessTagMore">{{tag}}</el-tag>
                <a v-if="userInfo.businessTag.length > 3" href="javascript:;" class="color-link" style="margin-left: 10px;font-size: 12px;" @click="more('businessTagMore')">
                  <span v-if="!businessTagMore">更多</span>
                  <span v-if="businessTagMore">收起</span>
                </a>
              </div>
            </td>
          </tr> -->
        <tr>
          <td style="vertical-align: middle;">拥有权益</td>
          <td colspan="5">
            <div v-if="rightList.data">
              <el-tag
                v-for="(tag, index) in rightList.data"
                type="primary"
                v-if="(index < 3 || rightTagMore) && tag.rightsName"
                >{{ tag.rightsName }}</el-tag
              >
              <a
                v-if="rightList.data.length > 3"
                href="javascript:;"
                class="color-link"
                style="margin-left: 10px;font-size: 12px;"
                @click="more('rightTagMore')"
              >
                <span v-if="!rightTagMore">更多</span>
                <span v-if="rightTagMore">收起</span>
              </a>
            </div>
          </td>
        </tr>
        <!--           <tr>
            <td colspan="6"><span>购买历史</span></td>
          </tr> -->
      </table>
    </div>
    <div style="margin-top: 30px;">
      <el-tabs v-model="tag" type="card">
        <el-tab-pane label="权益使用" name="right">
          <div v-loading="rightLoading">
            <el-table :data="rightList.entities" style="width: 100%">
              <el-table-column prop="templateName" label="序号" width="50">
                <template scope="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column prop="brandName" label="权益名称" min-width="9%"> </el-table-column>
              <el-table-column prop="regTime" label="截止时间" min-width="18%" show-overflow-tooltip>
                <template scope="scope">
                  {{ gUtils.dateFormat(scope.row.regTime, 'yyyy-MM-dd') }}
                </template>
              </el-table-column>
              <el-table-column prop="channelName" label="状态" min-width="9%" show-overflow-tooltip> </el-table-column>
              <el-table-column prop="regTime" label="操作日期" min-width="18%" show-overflow-tooltip>
                <template scope="scope">
                  {{ gUtils.dateFormat(scope.row.regTime, 'yyyy-MM-dd') }}
                </template>
              </el-table-column>
              <!-- <el-table-column label="操作" min-width="9%"> -->
              <!-- <template scope="scope"> -->
              <!-- <a v-if="jurisdiction['member:memberGroupManger:update']" href="javascript:;" class="operation-btn" @click="toDetail(scope.row.hrUserId)"><i class="iconfont icon-xiugai"></i>查看</a> -->
              <!-- <a v-if="jurisdiction['member:memberGroupManger:delete']" href="javascript:;" class="color-link operation-btn" @click="deleteTpl(scope.row.id)"><i class="iconfont icon-shanchu-copy"></i>删除</a> -->
              <!-- </template> -->
              <!-- </el-table-column> -->
            </el-table>
            <!--  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" border :current-page.sync="regProductPager.pageNo" :page-sizes="[10, 20, 50, 100]" :page-size="regProductPager.pageSize" layout="sizes, prev, pager, next" :total="regProductInfo.entityCount">
              </el-pagination> -->
          </div>
        </el-tab-pane>
        <el-tab-pane label="产品注册" name="user">
          <div v-loading="goodsLoading">
            <el-table :data="regProductInfo.entities" style="width: 100%">
              <el-table-column prop="templateName" label="序号" width="50">
                <template scope="scope">
                  {{ (regProductPager.pageNo - 1) * regProductPager.pageSize + scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column prop="brandName" label="品牌" min-width="9%"> </el-table-column>
              <el-table-column prop="productCategoryCode" label="产品大类" min-width="9%"> </el-table-column>
              <el-table-column prop="productCode" label="产品型号" min-width="18%"> </el-table-column>
              <el-table-column prop="skuCode" label="成品编码" min-width="18%" show-overflow-tooltip> </el-table-column>
              <el-table-column prop="regTime" label="注册日期" min-width="18%" show-overflow-tooltip>
                <template scope="scope">
                  {{ gUtils.dateFormat(scope.row.regTime, 'yyyy-MM-dd') }}
                </template>
              </el-table-column>
              <el-table-column prop="channelName" label="购买渠道" min-width="9%" show-overflow-tooltip>
              </el-table-column>
              <el-table-column prop="buyPrice" label="参考价格" min-width="10%" show-overflow-tooltip>
              </el-table-column>
              <!-- <el-table-column label="操作" min-width="9%"> -->
              <!-- <template scope="scope"> -->
              <!-- <a v-if="jurisdiction['member:memberGroupManger:update']" href="javascript:;" class="operation-btn" @click="toDetail(scope.row.hrUserId)"><i class="iconfont icon-xiugai"></i>查看</a> -->
              <!-- <a v-if="jurisdiction['member:memberGroupManger:delete']" href="javascript:;" class="color-link operation-btn" @click="deleteTpl(scope.row.id)"><i class="iconfont icon-shanchu-copy"></i>删除</a> -->
              <!-- </template> -->
              <!-- </el-table-column> -->
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              border
              :current-page.sync="regProductPager.pageNo"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="regProductPager.pageSize"
              layout="sizes, prev, pager, next"
              :total="regProductInfo.entityCount"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="会员积分" name="score" v-if="getUserInfo.brandName == 'haier'">
          <div v-loading="vipLoading">
            <el-table :data="integralDetail.data" style="width: 100%">
              <el-table-column prop="templateName" label="序号" width="50">
                <template scope="scope">
                  {{ (integralDetailPager.pageNo - 1) * integralDetailPager.pageSize + scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column prop="pointLable" label="动作"> </el-table-column>
              <el-table-column prop="updatedAt" label="交互日期">
                <template scope="scope">
                  {{ gUtils.dateFormat(scope.row.updatedAt, 'yyyy-MM-dd') }}
                </template>
              </el-table-column>
              <el-table-column prop="channelName" label="交互渠道"> </el-table-column>
              <el-table-column prop="score" label="操作" show-overflow-tooltip>
                <template scope="scope">
                  <span v-if="scope.row.score > 0">+{{ scope.row.score }}分</span>
                  <span v-if="scope.row.score <= 0">{{ scope.row.score }}分</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="integralHandleSizeChange"
              @current-change="integralHandleCurrentChange"
              border
              :current-page.sync="integralDetailPager.pageNo"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="integralDetailPager.pageSize"
              layout="sizes, prev, pager, next"
              :total="integralDetail.total"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="会员积分" name="score" v-if="getUserInfo.brandName == 'casarte'">
          <div v-loading="vipLoading">
            <el-table :data="integralDetail.entities" style="width: 100%">
              <el-table-column prop="templateName" label="序号" width="50">
                <template scope="scope">
                  {{ (integralDetailPager.pageNo - 1) * integralDetailPager.pageSize + scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column prop="outDesc" label="动作"> </el-table-column>
              <el-table-column prop="happenTime" label="交互日期"> </el-table-column>
              <el-table-column prop="outType" label="交互渠道"> </el-table-column>
              <el-table-column prop="scoreValue" label="操作" show-overflow-tooltip>
                <template scope="scope">
                  <span>{{ scope.row.scoreValue }}分</span>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="integralHandleSizeChange"
              @current-change="integralHandleCurrentChange"
              border
              :current-page.sync="integralDetailPager.pageNo"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="integralDetailPager.pageSize"
              layout="sizes, prev, pager, next"
              :total="integralDetail.entityCount"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="会员等级" name="rank">
          <div v-loading="rankLoading">
            <el-table :data="rankHistory.entities" style="width: 100%">
              <el-table-column prop="templateName" label="序号" width="50">
                <template scope="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column prop="newRankName" label="会员等级" min-width="50%"> </el-table-column>
              <el-table-column prop="startTime" label="生效日期" min-width="50%">
                <template scope="scope">
                  {{ gUtils.dateFormat(scope.row.startTime, 'yyyy-MM-dd') }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <add-group
      :dialogChange="addGroupDialogChange"
      :form="userId"
      :random="addGroupDialog.random"
      :dialogDisplay="addGroupDialog.display"
      :closeDialog="closeAddGroupDialog"
    ></add-group>

    <add-tags
      :dialogChange="addTagsDialogChange"
      :form="userId"
      :random="addTagsDialog.random"
      :dialogDisplay="addTagsDialog.display"
      :closeDialog="closeAddTagsDialog"
    ></add-tags>

    <edit-rank
      :dialogChange="editRankDialogChange"
      :form="userId"
      :random="editRankDialog.random"
      :dialogDisplay="editRankDialog.display"
      :closeDialog="closeEditRankDialog"
    ></edit-rank>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import gUtils from '../../utils/gUtils.js';
import addGroup from './dialog/userAddGroup.vue';
import addTags from './dialog/addTags.vue';
import editRank from './dialog/editRank.vue';

export default {
  components: {
    addGroup,
    addTags,
    editRank
  },
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction',
      getUserInfo: 'getUserInfo'
    })
  },
  data() {
    return {
      loading: false,
      matchField: '',
      addGroupDialog: {
        display: false,
        random: Math.random()
      },
      addTagsDialog: {
        display: false,
        random: Math.random()
      },
      editRankDialog: {
        display: false,
        random: Math.random()
      },
      userInfo: {
        baseTagName: [],
        businessTag: [],
        serviceAddress: []
      },
      baseTagMore: false,
      businessTagMore: false,
      rightTagMore: false,
      tag: 'right',
      regProductInfo: {},
      regProductPager: {
        pageNo: 1,
        pageSize: 10
      },
      integralDetail: {},
      integralDetailPager: {
        pageNo: 1,
        pageSize: 10
      },
      rankHistory: {},
      rankHistoryPager: {
        pageNo: 1,
        pageSize: 10
      },
      rightList: {},
      rightListPager: {
        pageNo: 1,
        pageSize: 10
      },
      goodsLoading: false,
      vipLoading: false,
      rankLoading: false,
      rightLoading: false,
      userId: '',
      rankList: []
    };
  },
  filters: {
    marriageFilter(value) {
      switch (value) {
        case '0':
          value = '已婚';
          break;
        case '1':
          value = '未婚';
          break;
      }
      return value;
    },
    incomeFilter(value) {
      switch (value) {
        case '18':
          value = '3000以下';
          break;
        case '19':
          value = '3000~5000';
          break;
        case '20':
          value = '5000~8000';
          break;
        case '21':
          value = '8000~12000';
          break;
        case '22':
          value = '12000~20000';
          break;
        case '23':
          value = '20000以上';
          break;
      }
      return value;
    }
  },
  methods: {
    handleIconClick() {
      this.listSearch();
    },
    // 登录名、手机号、邮箱检索
    listSearch() {
      const self = this;
      this.userId = '';
      this.userInfo = {
        baseTagName: [],
        businessTag: [],
        serviceAddress: []
      };
      if (self.matchField) {
        this.loading = true;
        const data = {
          pageNum: 1,
          pageSize: 10,
          matchField: self.matchField || ' ',
          type: 1 // 精确查找默认查询线上用户
        };

        this.requestVip.matchMember(data).then((result) => {
          self.loading = false;
          if (result && result.entities[0]) {
            self.userId = result.entities[0].userId;
            self.getUser();
            self.regProductInfo = [];
            self.regProductPager.pageNo = 1;
            self.regProductPager.pageSize = 10;
            self.getRegProductInfo();
            self.integralDetail = [];
            self.integralDetailPager.pageNo = 1;
            self.integralDetailPager.pageSize = 10;
            self.getIntegralDetail();
            self.rankHistory = [];
            self.showRankHistory();
            self.rightList = [];
            self.getRightDetail();
          }
        });
      }
    },
    more(type) {
      this[type] = !this[type];
    },
    goback() {
      history.go(-1);
    },
    getUser() {
      const self = this;

      const data = {
        userId: self.userId
      };

      this.requestVip
        .queryPageByBrandName({
          pageNum: 1,
          pageSize: 100,
          brandName: this.getUserInfo.brandName
        })
        .then((rank) => {
          self.rankList = rank.entities;

          self.requestVip.getUserInfo(data).then((data) => {
            if (data) {
              // 标签
              data.baseTagName = data.baseTagName ? data.baseTagName.split(',') : [];
              data.businessTag = data.businessTag ? data.businessTag.split(',') : [];

              for (let i = 0; i < rank.entities.length; i++) {
                if (data.rankId == rank.entities[i].id) {
                  data.rankId = rank.entities[i].rankName;
                  break;
                }
              }

              self.userInfo = data;
            }
          });
        });
    },
    // 产品注册
    getRegProductInfo() {
      const self = this;
      const data = {
        pageNo: self.regProductPager.pageNo,
        pageSize: self.regProductPager.pageSize,
        userId: self.userId
      };

      this.goodsLoading = true;
      this.requestVip.getRegProductInfo(data).then((data) => {
        self.regProductInfo = data;
        self.goodsLoading = false;
      });
    },
    handleSizeChange(pageSize) {
      if (!this.goodsLoading) {
        this.regProductPager.pageNo = 1;
        this.regProductPager.pageSize = pageSize;
        this.getRegProductInfo();
      }
    },
    handleCurrentChange(pageNo) {
      if (!this.rightLoading) {
        this.regProductPager.pageNo = pageNo;
        this.regProductPager.pageNo = pageNo;
        this.getRegProductInfo();
      }
    },
    // 权益使用
    getRightDetail() {
      const self = this;
      const data = {
        userId: self.userId,
        brandName: this.getUserInfo.brandName
      };

      this.rightLoading = true;
      this.requestVip.getRight(data).then((data) => {
        self.rightList = data;
        self.rightLoading = false;
      });
    },
    rightHandleSizeChange(pageSize) {
      // if (!this.rightLoading) {
      //   this.rightListPager.pageNo = 1
      //   this.rightListPager.pageSize = pageSize
      //   this.getRightDetail()
      // }
    },
    rightHandleCurrentChange(pageNo) {
      // if (!this.rightLoading) {
      //   this.rightListPager.pageNo = pageNo
      //   this.rightListPager.pageNo = pageNo
      //   this.getRightDetail()
      // }
    },
    // 积分明细
    getIntegralDetail() {
      const day3 = new Date();
      day3.setTime(day3.getTime() + 24 * 60 * 60 * 1000);
      let month = day3.getMonth() + 1;
      let day = day3.getDate();
      if (month < 10) {
        month = `0${month}`;
      }
      if (day < 10) {
        day = `0${day}`;
      }
      const s3 = `${day3.getFullYear()}-${month}-${day}`;
      const self = this;
      const data = {
        pageNo: self.integralDetailPager.pageNo,
        pageSize: self.integralDetailPager.pageSize,
        userId: self.userId,
        startAt: '1970-01-01',
        endAt: s3
      };

      this.vipLoading = true;
      this.requestVip.getIntegralDetail(data).then((data) => {
        if (self.getUserInfo.brandName == 'casarte') {
          if (data && data.entities && data.entities.length > 0) {
            data.entities.forEach((el) => {
              el.happenTime = el.happenTime.substring(0, 10);
            });
            self.integralDetail = data;
          }
        } else if (data.data && data.data.length > 0) {
          self.integralDetail = data;
        }
        self.vipLoading = false;
      });
    },
    integralHandleSizeChange(pageSize) {
      if (!this.vipLoading) {
        this.integralDetailPager.pageNo = 1;
        this.integralDetailPager.pageSize = pageSize;
        this.getIntegralDetail();
      }
    },
    integralHandleCurrentChange(pageNo) {
      if (!this.vipLoading) {
        this.integralDetailPager.pageNo = pageNo;
        this.getIntegralDetail();
      }
    },
    // 会员等级变更
    showRankHistory() {
      const self = this;
      const data = {
        pageNo: self.regProductPager.pageNo,
        pageSize: self.regProductPager.pageSize,
        userId: self.userId
      };

      self.rankLoading = true;
      this.requestVip
        .queryPageByBrandName({
          pageNum: 1,
          pageSize: 100,
          brandName: this.getUserInfo.brandName
        })
        .then((rank) => {
          self.requestVip.showRankHistory(data).then((data) => {
            self.rankLoading = false;
            if (data.entities) {
              for (let i = 0; i < rank.entities.length; i++) {
                for (let j = 0; j < data.entities.length; j++) {
                  if (data.entities[j].newRank == rank.entities[i].id) {
                    data.entities[j].newRank = rank.entities[i].rankName;
                    break;
                  }
                }
              }
              self.rankHistory = data;
            }
          });

          // self.rankList = rank.entities

          // self.requestVip.getUserInfo(data).then(function (data) {
          //   if (data) {
          //     // 标签
          //     data.baseTagName = data.baseTagName ? data.baseTagName.split(',') : []
          //     data.businessTag = data.businessTag ? data.businessTag.split(',') : []

          //     for (var i = 0; i < rank.entities.length; i++) {
          //       if (data.rankId == rank.entities[i].id) {
          //         data.rankId = rank.entities[i].rankName
          //         break
          //       }
          //     }

          //     self.userInfo = data
          //   }
          // })
        });
    },
    // 添加、设置用户分组
    addGroup(flowtype) {
      this.addGroupDialog.display = true;
      this.addGroupDialog.random = Math.random();
    },
    addGroupDialogChange(group) {
      this.addGroupDialog.display = false;
      this.getUser();
    },
    // 关闭基础标签选择
    closeAddGroupDialog() {
      this.addGroupDialog.display = false;
    },
    // 添加、设置用户标签
    addTags(flowtype) {
      this.addTagsDialog.display = true;
      this.addTagsDialog.random = Math.random();
    },
    addTagsDialogChange(group) {
      this.addTagsDialog.display = false;
      this.getUser();
    },
    // 关闭基础标签选择
    closeAddTagsDialog() {
      this.addTagsDialog.display = false;
    },
    // 修改用户会员等级
    editRank(flowtype) {
      this.editRankDialog.display = true;
      this.editRankDialog.random = Math.random();
    },
    editRankDialogChange(group) {
      this.editRankDialog.display = false;
      this.getUser();
    },
    // 关闭基础标签选择
    closeEditRankDialog() {
      this.editRankDialog.display = false;
    }
  },
  mounted() {
    // this.getUser()
    // this.getRegProductInfo()
    // this.getIntegralDetail()
    // this.showRankHistory()
    // this.getRightDetail()
    // this.userId = this.$route.query.id
  }
};
</script>

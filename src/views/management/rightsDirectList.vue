<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand">
        <i></i>直销员权益发放
        <el-button @click="$router.push({ path: '/management/rightsdirect' })" type="primary" class="fr"
          >新建权益</el-button
        >
      </p>
      <div class="clear"></div>
    </div>
    <div style="margin-top: 20px">
      <p style="display: inline-block">
        活动名称：<el-input
          style="width: 200px;"
          v-model="input.name"
          @keyup.native="input.name = input.name.replace(/\s+/g, '')"
          placeholder="请输入活动名称"
        ></el-input>
      </p>
      <p style="display: inline-block;margin-left: 10px">
        状态：
        <el-select v-model="input.type" placeholder="请选择">
          <el-option v-for="item in statusoptions" :key="item.id" :label="item.value" :value="item.id"> </el-option>
        </el-select>
      </p>
      <el-button style="margin-left: 10px" @click="reset">重置</el-button>
      <el-button type="primary" style="margin-left: 10px" @click="query">查询</el-button>
    </div>
    <div style="margin-top: 20px">
      <el-table border :data="tableData" style="width: 100%;text-align: center">
        <el-table-column prop="name" label="活动名称" width="180"> </el-table-column>
        <el-table-column prop="startTime" label="权益生效期" width="180"> </el-table-column>
        <el-table-column prop="endTime" label="权益失效期" width="180"> </el-table-column>
        <el-table-column label="状态" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top" v-if="scope.row.status == 1">
              <div class="schedule-linebox02">
                <ul class="m-ul">
                  <li>
                    <div class="m-txt">上级领导</div>
                  </li>
                </ul>
              </div>
              <div slot="reference" class="name-wrapper">
                <i class="ico-exam" v-show="scope.row.status == 1">
                  <img src="../../assets/images/ico-sh.png" alt="" />
                </i>
                <span>{{ scope.row.textstatus }}</span>
              </div>
              <div style="margin-left: 18px;margin-top: -10px;">
                审核人：{{ scope.row.nextNodeUserName }} 电话：{{ scope.row.nextNodeUserMobile }}
              </div>
            </el-popover>
            <el-popover trigger="hover" placement="top" v-else-if="scope.row.status == 6">
              <div class="bh-boxbg">
                <p class="m-bhtext"><span>驳回原因：</span>{{ scope.row.rejectReason }}</p>
                <p class="m-bgname">审核人：{{ scope.row.nextNodeUserName }}</p>
              </div>
              <div slot="reference" class="name-wrapper">
                <i class="ico-exam" v-show="scope.row.status == 6">
                  <img src="../../assets/images/ico-bh.png" alt="" />
                </i>
                <span class="bh-color">{{ scope.row.textstatus }}</span>
              </div>
            </el-popover>
            <span v-else>{{ scope.row.textstatus }}</span>
          </template>
        </el-table-column>
        <el-table-column label="详情" width="180">
          <template slot-scope="scope">
            <el-button type="text" @click="seedetails(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              v-if="scope.row.status == 5 || scope.row.status == 6"
              @click="$router.push({ path: '/management/rightsdirect', query: { id: scope.row.id } })"
              >修改</el-button
            >
            <a
              href="javascript:;"
              v-if="scope.row.status == 5 || scope.row.status == 6"
              style="margin-left: 10px"
              @click="qydelete(scope.row.id)"
              >删除</a
            >
            <a
              v-if="scope.row.status == 2 || scope.row.status == 3 || scope.row.status == 7"
              href="javascript:;"
              class="operation-btn"
              @click="zanting(scope.row.id, scope.row.status)"
              ><i
                class="iconfont"
                :class="{
                  'icon-zanting': scope.row.status == 7,
                  'icon-icon-zanting': scope.row.status == 2 || scope.row.status == 3
                }"
              ></i
              >{{ scope.row.status == 2 || scope.row.status == 3 ? '暂停' : '开始' }}</a
            >
            <a
              v-if="scope.row.status == 1 && scope.row.auditSign == 1"
              href="javascript:;"
              class="operation-btn color-link"
              @click="adopt(scope.row)"
              ><i class="iconfont icon-tongguo"></i>通过</a
            >
            <a
              v-if="scope.row.status == 1 && scope.row.auditSign == 1"
              style="color: #666!important;"
              href="javascript:;"
              class="operation-btn color-link"
              @click="reject(scope.row)"
              ><i style="color: #666" class="iconfont icon-bohui1"></i>驳回</a
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        border
        :current-page.sync="pageNo"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>

    <el-dialog
      class="trs-dialog directlist-dialig"
      title=""
      :visible.sync="qydialog"
      size="tiny"
      :modal-append-to-body="false"
    >
      <div class="dialog-box">
        <div class="dialog-jichu">
          <p class="jichu-title">基础信息</p>
          <div class="jichu-box">
            <p class="jichu-everyp">
              <span class="jichu-evname">权益活动名称：</span>
              <el-tooltip class="item jichu-evcontent" effect="light" :content="details.name" placement="top">
                <span>{{ details.name }}</span>
              </el-tooltip>
            </p>
            <p class="jichu-everyp">
              <span class="jichu-evname">权益类型：</span>
              <el-tooltip class="item jichu-evcontent" effect="light" :content="details.buildCardName" placement="top">
                <span>{{ details.buildCardName }}</span>
              </el-tooltip>
            </p>
            <p class="jichu-everyp">
              <span class="jichu-evname">权益券：</span>
              <el-tooltip class="item jichu-evcontent" effect="light" :content="details.type" placement="top">
                <span>{{ details.type }}</span>
              </el-tooltip>
            </p>
            <p class="jichu-everyp">
              <span class="jichu-evname">活动有效期：</span>
              <span>{{ details.startTime | timeFilter }} - {{ details.endTime | timeFilter | endTimeFilter }}</span>
            </p>
            <p class="jichu-everyp">
              <span class="jichu-evname">权益总量：</span>
              <span
                ><em style="color: #ee5851;">{{ details.num }}</em
                >（份）</span
              >
            </p>
            <p class="jichu-everyp">
              <span class="jichu-evname">投入预算：</span>
              <span
                ><em style="color: #ee5851;">{{ details.budgetAmount }}</em
                >（元）</span
              >
            </p>
          </div>
        </div>
        <div class="dialog-jichu">
          <p class="jichu-title">发放范围</p>
          <div class="jichu-box">
            <p class="jichu-everyp">
              <span class="jichu-evname">活动小微：</span>
              <el-tooltip class="item jichu-evcontent" effect="light" :content="details.xiaoweiName" placement="top">
                <span>{{ details.xiaoweiName }}</span>
              </el-tooltip>
            </p>
            <p class="jichu-everyp">
              <span class="jichu-evname">活动渠道：</span>
              <el-tooltip class="item jichu-evcontent" effect="light" :content="details.channel" placement="top">
                <span>{{ details.channel }}</span>
              </el-tooltip>
            </p>
            <p class="jichu-everyp">
              <span class="jichu-evname">活动门店：</span>
              <el-tooltip class="item jichu-evcontent" effect="light" :content="details.shopName" placement="top">
                <span>{{ details.shopName }}</span>
              </el-tooltip>
            </p>
            <p class="jichu-everyp">
              <span class="jichu-evname">经营产业：</span>
              <el-tooltip
                class="item jichu-evcontent"
                effect="light"
                :content="details.productCategoryName | categorynameFilter"
                placement="top"
              >
                <span>{{ details.productCategoryName | categorynameFilter }}</span>
              </el-tooltip>
            </p>
            <p class="jichu-everyp">
              <span class="jichu-evname">资源发放形式：</span>
              <el-tooltip
                class="item jichu-evcontent"
                effect="light"
                :content="details.resourceForm | resourceFilter"
                placement="top"
              >
                <span v-if="details.resourceForm == 1">资源位</span>
                <span v-if="details.resourceForm == 2">入户服务</span>
                <span v-if="details.resourceForm == 3">潜在顾客</span>
              </el-tooltip>
            </p>
            <p class="jichu-everyp" v-if="details.resourceForm == 1">
              <span class="jichu-evname">关联资源位：</span>
              <el-tooltip class="item jichu-evcontent" effect="light" :content="details.sourceName" placement="top">
                <span>{{ details.sourceName }}</span>
              </el-tooltip>
            </p>
            <p class="jichu-everyp">
              <span class="jichu-evname">发放方式：</span>
              <el-tooltip
                class="item jichu-evcontent"
                effect="light"
                :content="details.sendChannelType | typeFilter"
                placement="top"
              >
                <span>{{ details.sendChannelType | typeFilter }}</span>
              </el-tooltip>
            </p>
            <!--<span class="jichu-evcontent">dwdwdwd</span>-->
          </div>
        </div>
      </div>
      <div>
        <p class="jichu-title" style="margin-top: 10px">发放规则</p>
        <div class="guize-box">
          <p class="guize-title" v-if="details.ruleType == 1">按定向人群</p>
          <p class="guize-title" v-if="details.ruleType == 2">按直销员均分</p>
          <div class="junfen" v-if="details.ruleType == 2">
            <p class="junfen-fugai">
              本次权益预计发放覆盖 <span>{{ details.sellersCount }}</span> 位直销员，这些直销员共经营用户量
              <span>{{ details.userCount }}</span> 人
            </p>
            <p class="junfen-celue">您的策略：</p>
            <p class="junfen-fenpei">
              每个直销员分配<span style="margin: 0 10px;">{{ details.config }}</span
              >份
            </p>
          </div>
          <p class="guize-title" v-if="details.ruleType == 3">按直销员销量</p>
          <div class="junfen" v-if="details.ruleType == 3">
            <p style="line-height: 32px;">
              按照
              <span v-if="details.salesVolume == 1" style="color: #FF0000;">近一个月</span>
              <span v-if="details.salesVolume == 2" style="color: #FF0000;">近三个月</span>
              <span v-if="details.salesVolume == 3" style="color: #FF0000;">近半年</span>
              直销员产品销量由高到低分配
            </p>
            <p class="junfen-celue">覆盖范围：</p>
            <div class="xiaoliang-fenpei" v-if="details.topTen">
              <p v-for="item in details.topTen">
                直销员：<span style="min-width: 60px;">{{ item.HNAME }}</span> 经营用户量：<span
                  style="min-width: 48px;"
                  >{{ item.userCount }}</span
                >
                送权益数量：<span style="margin-right: 0;min-width: 45px;">{{ item.cardNum }}</span
                >份
              </p>
              <p v-if="details.topTen.length == 10">.........</p>
              <el-button type="primary" style="padding: 4px 15px;margin-top: 5px;" @click="excelPath"
                ><i class="ico-down"></i>导出详情</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!--驳回-->
    <el-dialog
      title="请填写驳回原因"
      :visible.sync="dialogVisible"
      size="small"
      :before-close="handleClose"
      :modal-append-to-body="false"
    >
      <el-form ref="form" :model="reason" label-width="80px">
        <el-form-item label="驳回原因" style="margin-bottom:0">
          <el-input type="textarea" v-model="reason.reason" :maxlength="50"></el-input>
          <p style="text-align:right;color:#999;">已输入 {{ reason.reason.length }} 个字</p>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="
            dialogVisible = false;
            reason.reason = '';
          "
          >取 消</el-button
        >
        <el-button type="primary" @click="check()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'rightsDirectList',
  data() {
    return {
      input: {
        name: '',
        type: ''
      },
      statusoptions: [
        {
          id: 1,
          value: '审核中'
        },
        {
          id: 2,
          value: '待执行'
        },
        {
          id: 3,
          value: '进行中'
        },
        {
          id: 4,
          value: '已结束'
        },
        {
          id: 5,
          value: '存草稿'
        },
        {
          id: 6,
          value: '已驳回'
        }
      ],
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      qydialog: false,
      details: [],
      dialogVisible: false,
      reason: {
        reason: ''
      },
      rejectedId: ''
    };
  },
  filters: {
    resourceFilter(val) {
      if (val == 1) {
        val = '资源位';
      }
      if (val == 2) {
        val = '入户服务';
      }
      if (val == 3) {
        val = '潜在顾客';
      }
      return val;
    },
    timeFilter(val) {
      if (val) {
        val = val.split(' ')[0];
      }
      return val;
    },
    categorynameFilter(val) {
      if (val) {
        if (val == 'all') {
          val = '所有产业';
        }
      }
      return val;
    },
    typeFilter(val) {
      if (val) {
        const arr = [];
        for (const i in val.split(',')) {
          if (val.split(',')[i] == 1) {
            arr.push('兑呗已录单用户');
          }
          if (val.split(',')[i] == 2) {
            arr.push('微信好友');
          }
        }
        return arr.join('，');
      }
      return val;
    },
    rightSmallTypeFilter(val) {
      if (val == 1) {
        val = '单品权益';
      } else if (val == 2) {
        val = '套购权益';
      } else if (val == 3) {
        val = '台阶积分卡';
      }
      return val;
    },
    endTimeFilter(val) {
      if (val && val.indexOf('2099') == 0) {
        val = '不限结束时间';
      }
      return val;
    }
  },
  methods: {
    excelPath() {
      if (this.details.excelPath) {
        window.location.href = this.details.excelPath;
      } else {
        const data = {
          id: this.details.id,
          type: this.details.salesVolume
        };
        this.requestManagement.downloadSellers(data).then((data) => {
          if (data.isSuccess) {
            window.location.href = data.data.showPath;
          }
        });
      }
    },
    // 重置
    reset() {
      this.input = {
        name: '',
        type: ''
      };
      this.pageVipUserManageConfigVO();
    },
    // 查询
    query() {
      this.pageNo = 1;
      this.pageVipUserManageConfigVO();
    },
    // 通过
    adopt(e) {
      const _this = this;
      this.$confirm('是否确认操作？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const data = {
            id: e.id,
            status: 2
          };
          this.requestManagement.updateAuditStatus(data).then((data) => {
            if (data.isSuccess) {
              _this.pageVipUserManageConfigVO();
            }
          });
        })
        .catch(() => {});
    },
    // 驳回
    check() {
      const _this = this;
      const data = {
        id: this.rejectedId,
        status: 6,
        rejectReason: this.reason.reason
      };
      this.requestManagement.updateAuditStatus(data).then((data) => {
        if (data.isSuccess) {
          _this.pageVipUserManageConfigVO();
        }
      });
      this.dialogVisible = false;
    },
    handleClose() {
      this.dialogVisible = false;
      this.reason.reason = '';
    },
    reject(e) {
      this.rejectedId = e.id;
      this.dialogVisible = true;
    },
    zanting(id, status) {
      const _this = this;
      if (status == 7) {
        var type = 2;
      } else if (status == 2 || status == 3) {
        var type = 7;
      }
      this.requestManagement.startOrPauseConfig({ configId: id, status: type }).then((data) => {
        if (data.isSuccess) {
          _this.pageVipUserManageConfigVO();
        }
      });
    },
    handleSizeChange(pageSize) {
      if (this.tableData.length != 0) {
        this.pageNo = 1;
        this.pageSize = pageSize;
        this.pageVipUserManageConfigVO();
      }
    },
    handleCurrentChange(pageNo) {
      if (this.tableData.length != 0) {
        this.pageNo = pageNo;
        this.pageVipUserManageConfigVO();
      }
    },
    seedetails(e) {
      this.qydialog = true;
      this.details = e;
    },
    qydelete(e) {
      const _this = this;
      this.$confirm('此操作将永久删除该权益, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.requestManagement.deleteVipUserManageConfig({ id: e }).then((data) => {
            if (data.isSuccess) {
              _this.pageVipUserManageConfigVO();
            }
          });
        })
        .catch(() => {});
    },
    pageVipUserManageConfigVO() {
      const _this = this;
      this.tableData = [];
      const data = JSON.parse(JSON.stringify(this.input));
      data.pageNo = this.pageNo;
      data.pageSize = this.pageSize;
      this.requestManagement.pageVipUserManageConfigVO(data).then((data) => {
        if (data.isSuccess) {
          if (data.data.entities) {
            data.data.entities.forEach((el) => {
              if (el.status == -1) {
                el.textstatus = '已删除';
              }
              if (el.status == 1) {
                el.textstatus = '审核中';
              }
              if (el.status == 2) {
                el.textstatus = '待执行';
              }
              if (el.status == 3) {
                el.textstatus = '进行中';
              }
              if (el.status == 4) {
                el.textstatus = '已结束';
              }
              if (el.status == 5) {
                el.textstatus = '存草稿';
              }
              if (el.status == 6) {
                el.textstatus = '已驳回';
              }
              if (el.status == 7) {
                el.textstatus = '暂停中';
              }
              if (el.endTime && el.endTime.indexOf('2099') == 0) {
                el.endTime = '不限结束时间';
              }
              if (el.topTen) {
                el.topTen = JSON.parse(el.topTen);
              }
            });
          }
          _this.tableData = data.data.entities;
          _this.total = data.data.entityCount;
        } else {
          _this.total = 0;
        }
      });
    }
  },
  mounted(e) {
    this.pageVipUserManageConfigVO();
  }
};
</script>

<style scoped>
.dialog-box {
  display: flex;
}
.dialog-jichu {
  flex: 2;
}
.jichu-title {
  font-size: 16px;
  font-weight: bold;
  color: #28272b;
  text-align: left;
  margin-bottom: 10px;
}
.guize-box {
  min-height: 124px;
  border: 1px solid #cccccc;
  padding-top: 15px;
  padding-bottom: 5px;
}
.jichu-box {
  height: 235px;
  min-height: 124px;
  border: 1px solid #cccccc;
  padding-top: 15px;
  padding-bottom: 5px;
}
.jichu-everyp {
  text-align: left;
  line-height: 30px;
  display: flex;
}
.jichu-evname {
  width: 135px;
  text-align: right;
  font-weight: bold;
}
.jichu-evcontent {
  max-width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.junfen {
  margin-left: 50px;
}
.junfen-fugai {
}
.junfen-fugai span {
  font-size: 16px;
  color: #ff0000;
}
.junfen-celue {
  font-weight: bold;
  margin-left: -30px;
}
.junfen-fenpei {
  line-height: 32px;
  margin-top: 5px;
  margin-left: 20px;
}
.dialog-fanwei {
}
.vip-newright {
  float: right;
  display: inline-block;
  position: absolute;
  right: 0;
  top: 19px;
  line-height: 16px;
  cursor: pointer;
  color: #45a0f8;
}
.vip-newright i {
  width: 16px;
  height: 16px;
  display: inline-block;
  float: left;
  margin-right: 8px;
  background: url('../../assets/images/ico-newright.png') no-repeat;
}
.guize-title {
  margin-left: 20px;
  font-weight: bold;
  margin-bottom: 5px;
}
.xiaoliang-fenpei {
}
.xiaoliang-fenpei p {
  margin-top: 5px;
}
.xiaoliang-fenpei p span {
  color: #ff0000;
  font-weight: bold;
  margin-right: 10px;
  display: inline-block;
}
.ico-down {
  width: 16px;
  height: 16px;
  display: inline-block;
  margin-right: 8px;
  vertical-align: -2px;
  background: url('../../assets/images/ico-down.png') no-repeat;
}
.schedule-linebox02 {
  width: 2px;
  height: 3px;
  display: inline-block;
  margin: 21px 179px 53px;
  position: relative;
}

.schedule-linebox02 .m-ul {
  width: 2px;
  position: absolute;
  z-index: 100;
  left: 0;
  top: 0;
}

.schedule-linebox02 .m-ul li {
  width: 30px;
  height: 30px;
  margin-left: -15px;
  display: inline-block;
  float: left;
  margin-top: -13px;
  border: 5px solid transparent;
  background: url('../../assets/images/ico-new.png') no-repeat;
  position: relative;
}

.schedule-linebox02 .m-ul li .m-txt {
  width: 100px;
  display: inline-block;
  position: absolute;
  top: 30px;
  left: 9px;
  margin-left: -50px;
  font-size: 12px;
  color: #ee5851;
  text-align: center;
  border: 5px solid #fff;
}
.bh-boxbg {
  display: inline-block;
  width: 100%;
  height: 100%;
}

.bh-boxbg .m-bhtext {
  width: 100%;
  padding: 5px;
  text-align: left;
}

.bh-boxbg .m-bhtext span {
  color: #ee5851;
  font-size: 14px;
  font-weight: bold;
}

.bh-boxbg .m-bgname {
  width: auto;
  display: inline-block;
  float: left;
  padding: 0 5px 5px;
}
.bh-color {
  color: #f3918d;
}
.name-wrapper {
  display: flex;
  justify-content: center;
}
.ico-exam {
  margin-top: -1px;
}
</style>
<style>
.directlist-dialig .el-dialog {
  width: 820px;
}
.directlist-dialig .el-dialog__body {
  padding-top: 4px;
}
</style>

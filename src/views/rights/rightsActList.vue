<template>
  <div class="vip-content">
    <div>
      <div class="rights-config-header">
        <div class="header-title">
          <span>我的权益活动</span>
        </div>
      </div>
    </div>
    <!-- -->
    <div v-if="!isChian || (isChian && dataTab === 'first')" class="vip-head-tool">
      <el-input
        style="width: 420px;"
        class="trs-input"
        v-model="whereCondetion"
        placeholder="输入权益活动名称"
        icon="search"
        :on-icon-click="handleIconClick"
        @keyup.enter.native="handleIconClick"
      ></el-input>
      <div class="status-filter">
        <a href="javascript:;" class="m-link" @click="searchByStatus(1)">存草稿({{ statusCount[1] }})</a>
        <a href="javascript:;" class="m-link" @click="searchByStatus(2)">审核中({{ statusCount[2] }})</a>
        <a href="javascript:;" class="m-link" @click="searchByStatus(6)">被驳回({{ statusCount[6] }})</a>
        <a href="javascript:;" class="m-link" @click="searchByStatus(7)">待执行({{ statusCount[7] }})</a>
        <a href="javascript:;" class="m-link" @click="searchByStatus(8)">进行中({{ statusCount[8] }})</a>
        <a href="javascript:;" class="m-link" @click="searchByStatus(9)">已结束({{ statusCount[9] }})</a>
        <a href="javascript:;" class="vip-newright" @click="toNewright()">
          <i> <img src="" /> </i>新建权益</a
        >
      </div>
      <div class="clear"></div>
    </div>
    <div v-if="isChian && dataTab === 'second'" class="vip-head-tool">
      <el-input
        style="width: 455px;"
        class="trs-input"
        v-model="whereCondetion"
        placeholder="输入权益活动名称"
        icon="search"
        :on-icon-click="handleIconChinaClick"
        @keyup.enter.native="handleIconChinaClick"
      ></el-input>
      <div class="status-filter" style="margin-left: 220px;">
        <a href="javascript:;" class="m-link" @click="searchChinaByStatus(1)">存草稿({{ chinaStatusCount[1] }})</a>
        <a href="javascript:;" class="m-link" @click="searchChinaByStatus(2)">审核中({{ chinaStatusCount[2] }})</a>
        <a href="javascript:;" class="m-link" @click="searchChinaByStatus(6)">被驳回({{ chinaStatusCount[6] }})</a>
        <a href="javascript:;" class="m-link" @click="searchChinaByStatus(10)">审核通过({{ chinaStatusCount[10] }})</a>
        <a href="javascript:;" class="vip-newright" @click="toNewright()">
          <i> <img src="" /> </i>新建权益</a
        >
      </div>
      <div class="clear"></div>
    </div>
    <div v-if="!isChian" v-loading="msgListLoading" class="rights-act-list">
      <!---->
      <el-table :data="msgListData.entities" border>
        <el-table-column prop="templateName" label="序号" width="50">
          <template slot-scope="scope">
            {{ (msgListData.pageNo - 1) * msgListData.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="创建者" width="120" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="rightName" label="权益活动名称" width="120" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="startTime" label="权益活动有效期" width="190">
          <template slot-scope="scope">
            {{ scope.row.startTime | dateFilter }} - {{ scope.row.endTime | dateFilter | endTimeFilter }}
          </template>
        </el-table-column>
        <el-table-column prop="budgetAmount" label="预算(元)" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.budgetAmount }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="groupName" label="适用分组" min-width="12%" show-overflow-tooltip> </el-table-column>  -->
        <el-table-column prop="remainAmount" label="剩余预算(元)" show-overflow-tooltip>
          <template slot-scope="scope">
            <div
              v-if="isChian || (!isChian && !scope.row.chinaRegionFlag == '1')"
              v-loading="remainAmountLoading"
              style="position: initial;"
            >
              {{ remainAmount.remainHaier }}
            </div>
            <!-- <div v-if="scope.row.remainBrandName == '海尔'" v-loading="remainAmountLoading" style="position: initial;">{{remainAmount.remainHaier}}</div>
    <div v-if="scope.row.remainBrandName == '卡萨帝'" v-loading="remainAmountLoading" style="position: initial;">{{remainAmount.remainCasarte}}</div> -->
          </template>
        </el-table-column>
        <el-table-column prop="xiaoweiName" label="小微" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="channelName" label="渠道" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="time" label="详情" show-overflow-tooltip>
          <template slot-scope="scope">
            <a href="javascript:;" class="color-link" @click="reviewDetail(scope)">查看详情</a>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="权益使用详情" show-overflow-tooltip width="120">
          <template slot-scope="scope">
            <a href="javascript:;" class="color-link" @click="qyReviewDetail(scope)">查看详情</a>
          </template>
        </el-table-column>
        ;
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-popover
              trigger="hover"
              placement="top"
              v-if="scope.row.status == 2 || scope.row.status == 3 || scope.row.status == 4 || scope.row.status == 5"
            >
              <div
                class="schedule-linebox"
                v-if="scope.row.giftSign"
                v-bind:class="{
                  sch01: scope.row.status == 2,
                  sch02: scope.row.status == 5,
                  sch03: scope.row.status == 4,
                  sch04: scope.row.status == 999
                }"
              >
                <!---->
                <i class="ico-line"></i>
                <ul class="m-ul">
                  <li>
                    <div class="m-txt">上级领导</div>
                  </li>
                  <li>
                    <div class="m-txt">积分商城负责人</div>
                  </li>
                  <!--<li><div class="m-txt">积分商城运营</div></li>-->
                  <!--<li><div class="m-txt">积分商城主管</div></li>-->
                </ul>
              </div>
              <div class="schedule-linebox02" v-if="!scope.row.giftSign && scope.row.giftType != 1">
                <ul class="m-ul">
                  <li>
                    <div class="m-txt">上级领导</div>
                  </li>
                </ul>
              </div>
              <div
                class="schedule-linebox"
                v-if="!scope.row.giftSign && scope.row.giftType == 1"
                v-bind:class="{
                  sch01: scope.row.status == 2,
                  sch02: scope.row.status == 5,
                  sch03: scope.row.status == 4,
                  sch04: scope.row.status == 999
                }"
              >
                <!---->
                <i class="ico-line"></i>
                <ul class="m-ul">
                  <li>
                    <div class="m-txt">上级领导</div>
                  </li>
                  <li>
                    <div class="m-txt">积分中心负责人</div>
                  </li>
                  <!--<li><div class="m-txt"> 积分商城负责人</div></li>-->
                  <!--<li><div class="m-txt">积分商城运营</div></li>-->
                  <!--<li><div class="m-txt">积分商城主管</div></li>-->
                </ul>
              </div>
              <div slot="reference" class="name-wrapper">
                <i
                  class="ico-exam"
                  v-show="
                    scope.row.status == 2 || scope.row.status == 3 || scope.row.status == 4 || scope.row.status == 5
                  "
                >
                  <img src="../../assets/images/ico-sh.png" alt="" />
                </i>
                <div>{{ scope.row.status | status }}</div>
              </div>
              <div v-if="scope.row.giftSign" style="margin-left: 18px;margin-top: -10px;">
                审核人：王福文 电话：18615320988
              </div>
              <div v-if="!scope.row.giftSign" style="margin-left: 18px;margin-top: -10px;">
                审核人：孟利利 电话：18661778875
              </div>
            </el-popover>
            <el-popover
              trigger="hover"
              placement="top"
              v-if="scope.row.status == 6"
              v-bind:class="{ 'bh-pad': scope.row.status == 6 }"
            >
              <div class="bh-boxbg">
                <p class="m-bhtext"><span>驳回原因：</span>{{ scope.row.rejectReason }}</p>
                <p class="m-bgname">审核人：{{ scope.row.rejectUserName }}</p>
              </div>
              <div slot="reference" class="name-wrapper">
                <i class="ico-exam" v-show="scope.row.status == 6">
                  <img src="../../assets/images/ico-bh.png" alt="" />
                </i>
                <div class="bh-color">{{ scope.row.status | status }}</div>
              </div>
            </el-popover>
            <div
              v-if="
                scope.row.status == -1 ||
                  scope.row.status == 1 ||
                  scope.row.status == 7 ||
                  scope.row.status == 8 ||
                  scope.row.status == 9 ||
                  scope.row.status == 10
              "
            >
              {{ scope.row.status | status }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <a
              v-if="scope.row.status == 10"
              href="javascript:;"
              class="color-link operation-btn"
              @click="start(scope.row.id)"
              >开启</a
            >
            <a
              v-if="scope.row.stopSign == 1"
              href="javascript:;"
              class="color-link operation-btn"
              @click="pause(scope.row.id)"
              >暂停</a
            >
            <a
              v-if="scope.row.editSign == 1 && scope.row.chinaRegionFlag != 1"
              href="javascript:;"
              class="color-link operation-btn"
              @click="toDetail(scope.row.id, scope.row.rightSmallType)"
              >修改</a
            >
            <a
              v-if="scope.row.editSign == 1 && scope.row.chinaRegionFlag == 1"
              href="javascript:;"
              class="color-link operation-btn"
              @click="toXwDetail(scope.row.id, scope.row.rightSmallType)"
              >修改</a
            >
            <a
              v-if="(scope.row.status == 7 || scope.row.status == 8) && scope.row.modifySign == 1"
              href="javascript:;"
              class="color-link operation-btn"
              @click="edittoDetail(scope.row.id, scope.row.rightSmallType)"
              >修改</a
            >
            <a
              v-if="scope.row.deleteSign == 1"
              href="javascript:;"
              class="operation-btn"
              @click="deleteTpl(scope.row.id)"
              >删除</a
            >
            <a
              v-if="(scope.row.status == 7 || scope.row.status == 8) && scope.row.chinaRegionFlag == 2"
              href="javascript:;"
              class="color-link operation-btn"
              @click="upTime(scope.row, 0)"
              >修改有效期</a
            >
            <a
              v-if="scope.row.status == 2 && scope.row.cancelSign == 1"
              href="javascript:;"
              class="color-link operation-btn"
              @click="withdraw(scope.row.id)"
              >撤回</a
            >
            <!-- <a v-if="scope.row.status == 2" href="javascript:;" class="color-link operation-btn"
               @click="start(scope.row.id)">撤回</a> -->
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
        :total="msgListData.entityCount"
      >
      </el-pagination>
    </div>

    <el-tabs v-if="isChian" v-model="dataTab" type="card">
      <el-tab-pane label="中国区独立配置" name="first">
        <div v-loading="msgListLoading" class="rights-act-list">
          <el-table :data="msgListData.entities" border>
            <el-table-column prop="templateName" label="序号" width="50">
              <template slot-scope="scope">
                {{ (msgListData.pageNo - 1) * msgListData.pageSize + scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="userName" label="创建者" width="120" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="rightName" label="权益活动名称" width="120" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="startTime" label="权益活动有效期" width="190">
              <template slot-scope="scope">
                {{ scope.row.startTime | dateFilter }} - {{ scope.row.endTime | dateFilter | endTimeFilter }}
              </template>
            </el-table-column>
            <el-table-column prop="budgetAmount" label="预算(元)" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.budgetAmount }}
              </template>
            </el-table-column>
            <!-- <el-table-column prop="groupName" label="适用分组" min-width="12%" show-overflow-tooltip> </el-table-column>  -->
            <el-table-column prop="remainAmount" label="剩余预算(元)" width="120" show-overflow-tooltip>
              <template slot-scope="scope">
                <div
                  v-if="isChian || (!isChian && !scope.row.chinaRegionFlag == '1')"
                  v-loading="remainAmountLoading"
                  style="position: initial;"
                >
                  {{ remainAmount.remainHaier }}
                </div>
                <!-- <div v-if="scope.row.remainBrandName == '海尔'" v-loading="remainAmountLoading" style="position: initial;">{{remainAmount.remainHaier}}</div>
<div v-if="scope.row.remainBrandName == '卡萨帝'" v-loading="remainAmountLoading" style="position: initial;">{{remainAmount.remainCasarte}}</div> -->
              </template>
            </el-table-column>
            <el-table-column prop="xiaoweiName" label="小微" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="channelName" label="渠道" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="time" label="详情" show-overflow-tooltip>
              <template slot-scope="scope">
                <a href="javascript:;" class="color-link" @click="reviewDetail(scope)">查看详情</a>
              </template>
            </el-table-column>
            <el-table-column prop="time" label="权益使用详情" show-overflow-tooltip width="120">
              <template slot-scope="scope">
                <a href="javascript:;" class="color-link" @click="qyReviewDetail(scope)">查看详情</a>
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                <el-popover
                  trigger="hover"
                  placement="top"
                  v-if="
                    scope.row.status == 2 || scope.row.status == 3 || scope.row.status == 4 || scope.row.status == 5
                  "
                >
                  <div
                    class="schedule-linebox"
                    v-if="scope.row.giftSign"
                    v-bind:class="{
                      sch01: scope.row.status == 2,
                      sch02: scope.row.status == 5,
                      sch03: scope.row.status == 4,
                      sch04: scope.row.status == 999
                    }"
                  >
                    <!---->
                    <i class="ico-line"></i>
                    <ul class="m-ul">
                      <li>
                        <div class="m-txt">上级领导</div>
                      </li>
                      <li>
                        <div class="m-txt">积分商城负责人</div>
                      </li>
                      <!--<li><div class="m-txt">积分商城运营</div></li>-->
                      <!--<li><div class="m-txt">积分商城主管</div></li>-->
                    </ul>
                  </div>
                  <div class="schedule-linebox02" v-if="!scope.row.giftSign && scope.row.giftType != 1">
                    <ul class="m-ul">
                      <li>
                        <div class="m-txt">上级领导</div>
                      </li>
                    </ul>
                  </div>
                  <div
                    class="schedule-linebox"
                    v-if="!scope.row.giftSign & (scope.row.giftType == 1)"
                    v-bind:class="{
                      sch01: scope.row.status == 2,
                      sch02: scope.row.status == 5,
                      sch03: scope.row.status == 4,
                      sch04: scope.row.status == 999
                    }"
                  >
                    <!---->
                    <i class="ico-line"></i>
                    <ul class="m-ul">
                      <li>
                        <div class="m-txt">上级领导</div>
                      </li>
                      <li>
                        <div class="m-txt">积分中心负责人</div>
                      </li>
                      <!--<li><div class="m-txt"> 积分商城负责人</div></li>-->
                      <!--<li><div class="m-txt">积分商城运营</div></li>-->
                      <!--<li><div class="m-txt">积分商城主管</div></li>-->
                    </ul>
                  </div>
                  <div slot="reference" class="name-wrapper">
                    <i
                      class="ico-exam"
                      v-show="
                        scope.row.status == 2 || scope.row.status == 3 || scope.row.status == 4 || scope.row.status == 5
                      "
                    >
                      <img src="../../assets/images/ico-sh.png" alt="" />
                    </i>
                    <div>{{ scope.row.status | status }}</div>
                  </div>
                  <div v-if="scope.row.giftSign" style="margin-left: 18px;margin-top: -10px;">
                    审核人：王福文　　电话：18615320988
                  </div>
                  <div v-if="!scope.row.giftSign" style="margin-left: 18px;margin-top: -10px;">
                    审核人：孟利利　　电话：18661778875
                  </div>
                </el-popover>
                <el-popover
                  trigger="hover"
                  placement="top"
                  v-if="scope.row.status == 6"
                  v-bind:class="{ 'bh-pad': scope.row.status == 6 }"
                >
                  <div class="bh-boxbg">
                    <p class="m-bhtext"><span>驳回原因：</span>{{ scope.row.rejectReason }}</p>
                    <p class="m-bgname">审核人：{{ scope.row.rejectUserName }}</p>
                  </div>
                  <div slot="reference" class="name-wrapper">
                    <i class="ico-exam" v-show="scope.row.status == 6">
                      <img src="../../assets/images/ico-bh.png" alt="" />
                    </i>
                    <div class="bh-color">{{ scope.row.status | status }}</div>
                  </div>
                </el-popover>
                <div
                  v-if="
                    scope.row.status == -1 ||
                      scope.row.status == 1 ||
                      scope.row.status == 7 ||
                      scope.row.status == 8 ||
                      scope.row.status == 9 ||
                      scope.row.status == 10
                  "
                >
                  {{ scope.row.status | status }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <a
                  v-if="scope.row.status == 10"
                  href="javascript:;"
                  class="color-link operation-btn"
                  @click="start(scope.row.id)"
                  >开启</a
                >
                <a
                  v-if="scope.row.stopSign == 1"
                  href="javascript:;"
                  class="color-link operation-btn"
                  @click="pause(scope.row.id)"
                  >暂停</a
                >
                <a
                  v-if="scope.row.editSign == 1 && scope.row.chinaRegionFlag != 1"
                  href="javascript:;"
                  class="color-link operation-btn"
                  @click="toDetail(scope.row.id, scope.row.rightSmallType)"
                  >修改</a
                >
                <a
                  v-if="scope.row.editSign == 1 && scope.row.chinaRegionFlag == 1"
                  href="javascript:;"
                  class="color-link operation-btn"
                  @click="toXwDetail(scope.row.id, scope.row.rightSmallType)"
                  >修改</a
                >
                <a
                  v-if="(scope.row.status == 7 || scope.row.status == 8) && scope.row.modifySign == 1"
                  href="javascript:;"
                  class="color-link operation-btn"
                  @click="edittoDetail(scope.row.id, scope.row.rightSmallType)"
                  >修改</a
                >
                <a
                  v-if="scope.row.deleteSign == 1"
                  href="javascript:;"
                  class="operation-btn"
                  @click="deleteTpl(scope.row.id)"
                  >删除</a
                >
                <a
                  v-if="scope.row.status == 2 && scope.row.cancelSign == 1"
                  href="javascript:;"
                  class="color-link operation-btn"
                  @click="withdraw(scope.row.id)"
                  >撤回</a
                >
                <a
                  v-if="(scope.row.status == 7 || scope.row.status == 8) && scope.row.chinaRegionFlag == 2"
                  href="javascript:;"
                  class="color-link operation-btn"
                  @click="upTime(scope.row, 0)"
                  >修改有效期</a
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
            :total="msgListData.entityCount"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="中国区小微联合配置" name="second">
        <div v-loading="msgListLoading" class="rights-act-list">
          <el-table :data="msgChinaListData.entities" border>
            <el-table-column prop="templateName" label="序号" width="50">
              <template slot-scope="scope">
                {{ (msgChinaListData.pageNo - 1) * msgChinaListData.pageSize + scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="userName" label="创建者" width="120" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="rightName" label="权益活动名称" width="120" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="startTime" label="权益活动有效期" width="190">
              <template slot-scope="scope">
                {{ scope.row.startTime | dateFilter }} - {{ scope.row.endTime | dateFilter | endTimeFilter }}
              </template>
            </el-table-column>
            <el-table-column prop="budgetAmount" label="预算(元)" show-overflow-tooltip>
              <template slot-scope="scope">
                {{ scope.row.budgetAmount }}
              </template>
            </el-table-column>
            <!-- <el-table-column prop="groupName" label="适用分组" min-width="12%" show-overflow-tooltip> </el-table-column>  -->
            <el-table-column prop="remainAmount" label="剩余预算(元)" show-overflow-tooltip>
              <template slot-scope="scope">
                <div
                  v-if="scope.row.remainBrandName == '海尔'"
                  v-loading="remainAmountLoading"
                  style="position: initial;"
                >
                  {{ remainAmount.remainHaier }}
                </div>
                <div
                  v-if="scope.row.remainBrandName == '卡萨帝'"
                  v-loading="remainAmountLoading"
                  style="position: initial;"
                >
                  {{ remainAmount.remainCasarte }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="xiaoweiName" label="小微" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="channelName" label="渠道" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="time" label="详情" show-overflow-tooltip>
              <template slot-scope="scope">
                <a href="javascript:;" class="color-link" @click="reviewChinaDetail(scope)">查看详情</a>
              </template>
            </el-table-column>
            <el-table-column prop="time" label="权益使用详情" show-overflow-tooltip width="120">
              <template slot-scope="scope">
                <a
                  :href="
                    './#/rights/rightsuseingdetail?id=' +
                      scope.row.id +
                      '&xiaoweiName=' +
                      scope.row.xiaoweiName +
                      '&rightName=' +
                      scope.row.rightName
                  "
                  class="color-link"
                  target="_blank"
                  >查看详情</a
                >
              </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                <el-popover
                  trigger="hover"
                  placement="top"
                  v-if="
                    scope.row.status == 2 || scope.row.status == 3 || scope.row.status == 4 || scope.row.status == 5
                  "
                >
                  <div
                    class="schedule-linebox"
                    v-if="scope.row.giftSign"
                    v-bind:class="{
                      sch01: scope.row.status == 2,
                      sch02: scope.row.status == 5,
                      sch03: scope.row.status == 4,
                      sch04: scope.row.status == 999
                    }"
                  >
                    <!---->
                    <i class="ico-line"></i>
                    <ul class="m-ul">
                      <li>
                        <div class="m-txt">上级领导</div>
                      </li>
                      <li>
                        <div class="m-txt">积分商城负责人</div>
                      </li>
                      <!--<li><div class="m-txt">积分商城运营</div></li>-->
                      <!--<li><div class="m-txt">积分商城主管</div></li>-->
                    </ul>
                  </div>
                  <div class="schedule-linebox02" v-if="!scope.row.giftSign && scope.row.giftType != 1">
                    <ul class="m-ul">
                      <li>
                        <div class="m-txt">上级领导</div>
                      </li>
                    </ul>
                  </div>
                  <div
                    class="schedule-linebox"
                    v-if="!scope.row.giftSign & (scope.row.giftType == 1)"
                    v-bind:class="{
                      sch01: scope.row.status == 2,
                      sch02: scope.row.status == 5,
                      sch03: scope.row.status == 4,
                      sch04: scope.row.status == 999
                    }"
                  >
                    <!---->
                    <i class="ico-line"></i>
                    <ul class="m-ul">
                      <li>
                        <div class="m-txt">上级领导</div>
                      </li>
                      <li>
                        <div class="m-txt">积分中心负责人</div>
                      </li>
                      <!--<li><div class="m-txt"> 积分商城负责人</div></li>-->
                      <!--<li><div class="m-txt">积分商城运营</div></li>-->
                      <!--<li><div class="m-txt">积分商城主管</div></li>-->
                    </ul>
                  </div>
                  <div slot="reference" class="name-wrapper">
                    <i class="ico-exam" v-show="scope.row.status == 2">
                      <img src="../../assets/images/ico-sh.png" alt="" />
                    </i>
                    <div>{{ scope.row.status | status }}</div>
                  </div>
                  <div v-if="scope.row.giftSign" style="margin-left: 18px;margin-top: -10px;">
                    审核人：王福文　　电话：18615320988
                  </div>
                  <div v-if="!scope.row.giftSign" style="margin-left: 18px;margin-top: -10px;">
                    审核人：孟利利　　电话：18661778875
                  </div>
                </el-popover>
                <el-popover
                  trigger="hover"
                  placement="top"
                  v-if="scope.row.status == 6"
                  v-bind:class="{ 'bh-pad': scope.row.status == 6 }"
                >
                  <div class="bh-boxbg">
                    <p class="m-bhtext"><span>驳回原因：</span>{{ scope.row.rejectReason }}</p>
                    <p class="m-bgname">审核人：{{ scope.row.rejectUserName }}</p>
                  </div>
                  <div slot="reference" class="name-wrapper">
                    <i class="ico-exam" v-show="scope.row.status == 6">
                      <img src="../../assets/images/ico-bh.png" alt="" />
                    </i>
                    <div class="bh-color">{{ scope.row.status | status }}</div>
                  </div>
                </el-popover>
                <div v-if="scope.row.status == 1">{{ scope.row.status | status }}</div>
                <div v-if="scope.row.status == 10">审核通过</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <!--<a v-if="scope.row.status == 10" href="javascript:;" class="color-link operation-btn" @click="start(scope.row.id)">开启</a>-->
                <a
                  v-if="scope.row.stopSign == 1"
                  href="javascript:;"
                  class="color-link operation-btn"
                  @click="pause(scope.row.id)"
                  >暂停</a
                >
                <a
                  v-if="scope.row.editSign == 1"
                  href="javascript:;"
                  class="color-link operation-btn"
                  @click="toDetailchina(scope.row.id, scope.row.rightSmallType)"
                  >修改</a
                >
                <a
                  v-if="scope.row.deleteSign == 1"
                  href="javascript:;"
                  class="operation-btn"
                  @click="deleteChinaTpl(scope.row.id)"
                  >删除</a
                >
                <a
                  v-if="scope.row.status == 2 && scope.row.cancelSign == 1"
                  href="javascript:;"
                  class="color-link operation-btn"
                  @click="xwwithdraw(scope.row.id)"
                  >撤回</a
                >
                <a
                  v-if="scope.row.status == 10"
                  href="javascript:;"
                  class="color-link operation-btn"
                  @click="upTime(scope.row, 1)"
                  >修改有效期</a
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleChinaSizeChange"
            @current-change="handleChinaCurrentChange"
            border
            :current-page.sync="pageNoChina"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSizeChina"
            layout="sizes, prev, pager, next"
            :total="msgChinaListData.entityCount"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog class="detail-dialog trs-dialog" title="" :visible.sync="detailDialog" :modal-append-to-body="false">
      <div class="config-item">
        <div class="config-item-1-2">
          <p>基础信息</p>
          <div class=" m-border" style="min-height:300px">
            <label for="">
              <span>权益活动名称：</span>
              <p>{{ detailInfo.rightName }}</p>
            </label>
            <label for="">
              <span>活动有效期：</span>
              <p>{{ detailInfo.startTime | dateFilter }} - {{ detailInfo.endTime | dateFilter | endTimeFilter }}</p>
            </label>
            <label for="">
              <span>礼品兑换有效期：</span>
              <p>
                {{ detailInfo.exchangeStartTime | dateFilter }} -
                {{ detailInfo.exchangeEndTime | dateFilter | endTimeFilter }}
              </p>
            </label>
            <label for="">
              <span>礼品类型：</span>
              <p>{{ detailInfo.giftType | giftNameByType }}</p>
            </label>
            <label for="">
              <span>投入预算：</span>
              <p>
                <span class="color-red" style="width:auto">{{ detailInfo.budgetAmount }}</span> 元
              </p>
            </label>
            <label for="">
              <span>成本合计：</span>
              <p>
                <span class="color-red" style="width:auto">{{ detailInfo.costAmount }}</span> 元
              </p>
            </label>
            <label for="">
              <span>是否认筹：</span>
              <p>{{ detailInfo.recognitionFlag == 1 ? '是' : '否' }}</p>
            </label>
            <!-- <label for=""><span>产出销售额：</span><p>{{detailInfo.salesAmount}} 元</p></label> -->
          </div>
        </div>
        <div class="config-item-1-2">
          <p>活动范围</p>
          <div class=" m-border" style="height:auto;min-height:300px">
            <label for="">
              <span>活动区域：</span>
              <el-tooltip
                class="item"
                :disabled="xwdisabled"
                effect="light"
                :content="detailInfo.xiaoweiName"
                placement="top"
              >
                <p>{{ detailInfo.xiaoweiName | nameFilter }}</p>
              </el-tooltip>
            </label>
            <label for="">
              <span>活动渠道：</span>
              <el-tooltip
                class="item"
                :disabled="qddisabled"
                effect="light"
                :content="detailInfo.channelName"
                placement="top"
              >
                <p class="m-txtomit">{{ detailInfo.channelName | nameFilter }}</p>
              </el-tooltip>
            </label>
            <label for="">
              <span>活动门店：</span>
              <el-tooltip
                class="item"
                :disabled="mddisabled"
                effect="light"
                :content="detailInfo.shopName"
                placement="top"
                v-if="detailInfo.shopSign == 2"
              >
                <p>{{ detailInfo.shopName | nameFilter }}</p>
              </el-tooltip>
              <em v-if="detailInfo.shopSign == 1" class="shopsign-box" @click="shopsee">点击下载</em>
            </label>
            <label for="">
              <span>活动品牌：</span>
              <p>{{ detailInfo.brandName }}</p>
            </label>
            <label for="">
              <span>产业类别：</span>
              <el-tooltip
                class="item"
                :disabled="cydisabled"
                effect="light"
                :content="detailInfo.productCategoryName"
                placement="top"
              >
                <p>{{ detailInfo.productCategoryName | nameFilter }}</p>
              </el-tooltip>
            </label>
            <label for="">
              <span>是否互斥：</span>
              <p>{{ detailInfo.exclusive == 1 ? '是' : '否' }}</p>
            </label>
            <label for="" v-if="detailInfo.exclusive == 1">
              <span>互斥类型：</span>
              <p>
                {{
                  detailInfo.exclusiveType == 1
                    ? '与单品活动不同享'
                    : detailInfo.exclusiveType == 2
                    ? '与套购活动不同享'
                    : detailInfo.exclusiveType == 3
                    ? '与部分活动同享'
                    : detailInfo.exclusiveType == 4
                    ? '与单品和套购均不同享'
                    : '无'
                }}
              </p>
            </label>
            <label for="" v-if="detailInfo.exclusive == 1 && detailInfo.exclusiveType == 3">
              <span>互斥活动：</span>
              <el-tooltip
                class="item"
                effect="light"
                :content="detailInfo.allowedRightNameList"
                placement="right-start"
              >
                <p class="m-txtomit" v-if="detailInfo.allowedRightNameList != null">
                  {{ detailInfo.allowedRightNameList | nameFilter }}
                </p>
                <p class="m-txtomit" v-if="detailInfo.allowedRightNameList == null">无</p>
              </el-tooltip>
            </label>
          </div>
        </div>
      </div>
      <div class="m-border03">
        <p class="m-botitle">型号池</p>
        <div class="m-bocontent xhc">
          <p v-if="detailInfo.buyNumProductCode">
            <span
              v-for="item in detailInfo.buyNumProductCode.productList"
              :title="item.brandName + ' | ' + item.productCategoryCode + ' | ' + item.modelNo"
              >{{ item.brandName }} | {{ item.productCategoryCode }} | {{ item.modelNo }}</span
            >
          </p>
          <p v-else style="font-weight: bold;">型号池为空</p>
        </div>
      </div>
      <div class="m-border03">
        <p class="m-botitle">约束限制</p>
        <div class="m-bocontent">
          <div class="yueshu">
            <p style="font-weight: bold" v-if="detailInfo.priceConstraint && detailInfo.modelConstraint">
              <span
                v-if="
                  detailInfo.priceConstraint.productList.length == 0 &&
                    detailInfo.modelConstraint[0].productList.length == 0 &&
                    detailInfo.modelConstraint[1].productList.length == 0 &&
                    detailInfo.modelConstraint[2].productList.length == 0 &&
                    !(detailInfo.coupleNumber && detailInfo.coupleCategoryNumber)
                "
              >
                暂无约束条件</span
              >
            </p>
            <p style="font-weight: bold" v-if="!detailInfo.priceConstraint && !detailInfo.modelConstraint">
              <span v-if="!(detailInfo.coupleNumber && detailInfo.coupleCategoryNumber)">暂无约束条件</span>
            </p>
            <p class="ys-xing" v-if="detailInfo.coupleNumber && detailInfo.coupleCategoryNumber">
              购买限制：
            </p>
            <li v-if="detailInfo.coupleNumber && detailInfo.coupleCategoryNumber" style="margin-left: 10px;">
              购买限制 <label>{{ detailInfo.coupleNumber }}</label
              ><label v-if="detailInfo.coupleCategoryNumber == 1">类</label
              ><label v-if="detailInfo.coupleCategoryNumber == 2">件</label> 及以上
            </li>
            <p class="ys-xing" v-if="detailInfo.modelConstraint">
              <em
                v-if="
                  detailInfo.modelConstraint[0].productList.length != 0 ||
                    detailInfo.modelConstraint[1].productList.length != 0 ||
                    detailInfo.modelConstraint[2].productList.length != 0
                "
                >型号约束：</em
              >
            </p>
            <em v-if="detailInfo.modelConstraint">
              <li v-if="detailInfo.modelConstraint[0].productList.length != 0">订单内必须含有</li>
              <p class="ys-ysbox" v-if="detailInfo.modelConstraint">
                <label v-for="product in detailInfo.modelConstraint[0].productList" style="display: block;">
                  <label v-for="(item, num) in product">
                    <span :title="item.desc" v-if="item.desc != ''">
                      {{ item.desc }}
                    </span>
                    <span :title="item.brandName + ' | ' + item.productCategoryCode" v-if="item.desc == ''">
                      {{ item.brandName }} | {{ item.productCategoryCode }}
                    </span>
                    <i class="ico-link" v-if="product.length > 1 && num != product.length - 1"></i>
                  </label>
                </label>
              </p>
              <li v-if="detailInfo.modelConstraint[1].productList.length != 0">仅参与计算权益</li>
              <p class="ys-ysbox" v-if="detailInfo.modelConstraint">
                <span v-for="item in detailInfo.modelConstraint[1].productList" :title="item.desc">
                  {{ item.desc }}
                </span>
              </p>
              <li v-if="detailInfo.modelConstraint[2].productList.length != 0">订单内排除</li>
              <p class="ys-ysbox" v-if="detailInfo.modelConstraint">
                <span v-for="item in detailInfo.modelConstraint[2].productList" :title="item.desc">
                  {{ item.desc }}
                </span>
              </p>
            </em>
            <p
              class="ys-xing"
              style="margin-top: 5px"
              v-if="detailInfo.priceConstraint && detailInfo.priceConstraint.productList.length != 0"
            >
              价格约束：
            </p>
            <div v-if="detailInfo.priceConstraint">
              <p class="ys-ysbox" v-if="detailInfo.priceConstraint.productList.length != 0">
                <span
                  :title="
                    item.brandName +
                      ' | ' +
                      item.productCategoryCode +
                      ' | 价格区间' +
                      item.minPrice +
                      '至' +
                      item.maxPrice
                  "
                  v-for="item in detailInfo.priceConstraint.productList"
                >
                  {{ item.brandName }} | {{ item.productCategoryCode }} | 价格区间{{ item.minPrice }}至{{
                    item.maxPrice
                  }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="m-border02" style="display: flex;">
        <div :class="['config-item-1-2 gift m-border-r', 'giftHeight' + giftLength]">
          <p class="m-tit">赠送礼品</p>
          <div style="height:100%;">
            <p v-if="detailInfo.rightSmallType === 2">
              套购赠
              <span
                style="margin-left:20px;font-weight: normal;font-weight: normal;font-size: 12px;color: #ee5851;"
                v-if="detailInfo.casarteFlag === 1"
                >套餐内全部为卡萨帝产品，赠送{{ detailInfo.casarteDouble }}倍积分</span
              >
            </p>
            <div v-if="detailInfo.scoreGiftConfig">
              <span v-if="detailInfo.giftType === 5">
                <ul v-if="detailInfo.scoreGiftConfig.type === '2'">
                  <li
                    class="rightsConfirm-givenCard-example dis-flex-imp"
                    v-for="(item, index) in detailInfo.scoreGiftConfig.rightList"
                    v-show="item.virtualGiftList"
                    :key="index"
                  >
                    <img class="portrait" :src="item.virtualGiftList[0].picUrl" />
                    <div class="cnt">
                      <p>{{ item.virtualGiftList[0].cardName }}</p>
                      <p class="mt20">兑换数量（{{ item.virtualGiftList[0].num }}）</p>
                    </div>
                  </li>
                </ul>
                <ul v-else>
                  <li
                    class="rightsConfirm-givenCard-example dis-flex-imp"
                    v-show="detailInfo.scoreGiftConfig.rightList[0].virtualGiftList"
                  >
                    <img class="portrait" :src="detailInfo.scoreGiftConfig.rightList[0].virtualGiftList[0].picUrl" />
                    <div class="cnt">
                      <p>{{ detailInfo.scoreGiftConfig.rightList[0].virtualGiftList[0].cardName }}</p>
                      <p class="mt20">
                        兑换数量（{{ detailInfo.scoreGiftConfig.rightList[0].virtualGiftList[0].num }}）
                      </p>
                    </div>
                  </li>
                </ul>
              </span>
              <span v-else>
                <div
                  v-for="gift in detailInfo.scoreGiftConfig.rightList"
                  v-if="gift.scoreList || gift.productList || gift.giftList"
                  style="display: block;"
                >
                  <img v-if="gift.giftList && gift.giftList[0]" :src="gift.giftList[0].picUrl" alt="" />
                  <img v-if="gift.scoreList && gift.scoreList[0]" src="../../assets/images/score.jpg" alt="" />
                  <div>
                    <p
                      v-show="cpname && buyAm"
                      style="overflow: hidden; text-overflow:ellipsis; white-space: nowrap; width:200px;"
                      :title="gift.modelNo"
                    >
                      {{ gift.modelNo }}
                    </p>
                    <p
                      v-show="!cpname"
                      style="overflow: hidden; text-overflow:ellipsis; white-space: nowrap; width:200px;"
                      :title="modelNo"
                    >
                      {{ modelNo }}
                    </p>
                    <p
                      v-show="!buyAm"
                      style="overflow: hidden; text-overflow:ellipsis; white-space: nowrap; width:200px;"
                      :title="gift.buyAmount"
                    >
                      满{{ gift.buyAmount }}-{{ gift.maxBuyAmount }}元赠
                    </p>
                    <!--<p v-show="!buyAm && gift.giftList[0]" style="overflow: hidden; text-overflow:ellipsis; white-space: nowrap; width:200px;"-->
                    <!--:title="gift.buyAmount">满{{gift.buyAmount}}元赠</p>-->
                    <p
                      v-if="
                        gift.scoreList && gift.scoreList[0] && gift.scoreList[0].score && gift.scoreList[0].score != ''
                      "
                      class="gift-item"
                    >
                      <i></i>{{ gift.scoreList[0].score }}积分（总数{{ gift.scoreList[0].num }}份）
                      <el-button
                        type="text"
                        v-if="detailInfo.chinaRegionFlag == 1"
                        class="trs-btn"
                        style="width:auto;float: right;margin-top: -7px;"
                        @click="giftXwDetail(gift.buyAmount, detailInfo.id)"
                        >详情
                      </el-button>
                    </p>
                    <p
                      v-if="
                        gift.scoreList &&
                          gift.scoreList[0] &&
                          gift.scoreList[0].priceScale &&
                          gift.scoreList[0].priceScale != ''
                      "
                      class="gift-item"
                    >
                      <i></i>{{ gift.scoreList[0].priceScale }}%积分
                    </p>
                    <p v-if="gift.giftList && gift.giftList[0]" class="gift-item" style="max-width: 275px;">
                      <i></i>
                      <span>{{ gift.giftList[0].productName }}</span
                      >（总数{{ gift.giftList[0].num }}份）<em v-if="gift.giftList[0].type == 1">（线上物品）</em
                      ><em v-if="gift.giftList[0].type == 2">（线下物品）</em>
                    </p>
                  </div>
                </div>
                <div
                  v-if="detailInfo.scoreGiftConfig.type == 3"
                  v-for="gift in detailInfo.scoreGiftConfig.modelNoDetail"
                  style="display:block;"
                >
                  <div v-for="item in gift.rightList">
                    <img v-if="item.giftList && item.giftList[0]" :src="item.giftList[0].picUrl" alt="" />
                    <img v-if="item.scoreList && item.scoreList[0]" src="../../assets/images/score.jpg" alt="" />
                    <div style="margin-bottom:10px;max-width: 270px;">
                      <p
                        style="overflow: hidden; text-overflow:ellipsis; white-space: nowrap; width:200px;"
                        :title="gift.modelNo"
                      >
                        {{ gift.modelNo }}
                      </p>
                      <p class="gift-item" v-if="item.scoreList && item.scoreList[0]">
                        <i></i>{{ item.scoreList[0].score }}积分（总数{{ item.scoreList[0].num }}份）
                      </p>
                      <p class="gift-item" v-if="item.giftList && item.giftList[0]">
                        <i></i><span>{{ item.giftList[0].productName }}</span
                        >（总数{{ item.giftList[0].num }}份）
                      </p>
                    </div>
                  </div>
                </div>
                <div v-if="detailInfo.scoreGiftConfig.twoTypes" style="display:inline-block;margin-right:20px;">
                  <div style="margin-bottom:10px;">
                    <img src="../../assets/images/score.jpg" alt="" />
                    <p>
                      购买 2 <em v-if="detailInfo.coupleCategoryNumber == 2">件</em
                      ><em v-if="detailInfo.coupleCategoryNumber == 1">类</em>产品赠送
                    </p>
                    <p class="gift">
                      {{ detailInfo.scoreGiftConfig.twoTypes.score }}积分（总数{{
                        detailInfo.scoreGiftConfig.twoTypes.num
                      }}份）
                    </p>
                  </div>
                </div>
                <div v-if="detailInfo.scoreGiftConfig.threeTypes" style="display:inline-block;margin-right:20px;">
                  <div style="margin-bottom:10px;">
                    <img src="../../assets/images/score.jpg" alt="" />
                    <p>
                      购买 3 <em v-if="detailInfo.coupleCategoryNumber == 2">件</em
                      ><em v-if="detailInfo.coupleCategoryNumber == 1">类</em>产品赠送
                    </p>
                    <p class="gift">
                      {{ detailInfo.scoreGiftConfig.threeTypes.score }}积分（总数{{
                        detailInfo.scoreGiftConfig.threeTypes.num
                      }}份）
                    </p>
                  </div>
                </div>
                <div v-if="detailInfo.scoreGiftConfig.fourTypes" style="display:inline-block;margin-right:20px;">
                  <div style="margin-bottom:10px;">
                    <img src="../../assets/images/score.jpg" alt="" />
                    <p>
                      购买 4 <em v-if="detailInfo.coupleCategoryNumber == 2">件</em
                      ><em v-if="detailInfo.coupleCategoryNumber == 1">类</em>产品赠送
                    </p>
                    <p class="gift">
                      {{ detailInfo.scoreGiftConfig.fourTypes.score }}积分（总数{{
                        detailInfo.scoreGiftConfig.fourTypes.num
                      }}份）
                    </p>
                  </div>
                </div>
                <div v-if="detailInfo.scoreGiftConfig.fiveTypes" style="display:inline-block;margin-right:20px;">
                  <div style="margin-bottom:10px;">
                    <img src="../../assets/images/score.jpg" alt="" />
                    <p>
                      购买 5 <em v-if="detailInfo.coupleCategoryNumber == 2">件</em
                      ><em v-if="detailInfo.coupleCategoryNumber == 1">类</em>及以上产品赠送
                    </p>
                    <p class="gift">
                      {{ detailInfo.scoreGiftConfig.fiveTypes.score }}积分（总数{{
                        detailInfo.scoreGiftConfig.fiveTypes.num
                      }}份）
                    </p>
                  </div>
                </div>
              </span>
            </div>
          </div>
        </div>
        <div class="config-item-1-2 report">
          <p class="m-tit">预算审批报告</p>
          <div class="m-bocontent" style="border: none;">
            <a v-for="pic in detailInfo.auditPics" :href="pic" target="_blank">
              <img :src="pic" alt="" />
            </a>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      class="detail-dialog trs-dialog"
      title=""
      :visible.sync="detailChinaDialog"
      :modal-append-to-body="false"
    >
      <div class="config-item">
        <div class="config-item-1-2">
          <p>基础信息</p>
          <div class=" m-border">
            <label for="">
              <span>权益活动名称：</span>
              <p>{{ detailInfo.rightName }}</p>
            </label>
            <label for="">
              <span>活动有效期：</span>
              <p>{{ detailInfo.startTime | dateFilter }} - {{ detailInfo.endTime | dateFilter | endTimeFilter }}</p>
            </label>
            <label for="">
              <span>礼品兑换有效期：</span>
              <p>
                {{ detailInfo.exchangeStartTime | dateFilter }} -
                {{ detailInfo.exchangeEndTime | dateFilter | endTimeFilter }}
              </p>
            </label>
            <label for="">
              <span>礼品类型：</span>
              <p>{{ detailInfo.giftType | giftNameByType }}</p>
            </label>
            <label for="">
              <span>投入预算：</span>
              <p>
                <span class="color-red" style="width:auto">{{ detailInfo.budgetAmount }}</span> 元
              </p>
            </label>
            <label for="">
              <span>成本合计：</span>
              <p>
                <span class="color-red" style="width:auto">{{ detailInfo.costAmount }}</span> 元
              </p>
            </label>
            <label for="">
              <span>预算明细：</span>
              <el-button @click="detail(detailInfo.id)" style="padding: 5px 6px;">查看详情</el-button>
            </label>
            <label for="">
              <span>是否认筹：</span>
              <p>{{ detailInfo.recognitionFlag == 1 ? '是' : '否' }}</p>
            </label>
            <!-- <label for=""><span>产出销售额：</span><p>{{detailInfo.salesAmount}} 元</p></label> -->
          </div>
        </div>
        <div class="config-item-1-2">
          <p>活动范围</p>
          <div class=" m-border" style="height: 295px;">
            <label for="">
              <span>活动品牌：</span>
              <p>{{ detailInfo.brandName }}</p>
            </label>
            <label for="">
              <span>产业类别：</span>
              <el-tooltip
                class="item"
                :disabled="cydisabled"
                effect="light"
                :content="detailInfo.productCategoryName"
                placement="top"
              >
                <p>{{ detailInfo.productCategoryName | nameFilter }}</p>
              </el-tooltip>
            </label>
          </div>
        </div>
      </div>
      <div class="m-border03">
        <p class="m-botitle">约束限制</p>
        <div class="m-bocontent">
          <p style="font-weight: bold" v-if="detailInfo.priceConstraint && detailInfo.modelConstraint">
            <span
              v-if="
                detailInfo.priceConstraint.productList.length == 0 &&
                  detailInfo.modelConstraint[0].productList.length == 0 &&
                  detailInfo.modelConstraint[1].productList.length == 0 &&
                  detailInfo.modelConstraint[2].productList.length == 0 &&
                  !(detailInfo.coupleNumber && detailInfo.coupleCategoryNumber)
              "
            >
              暂无约束条件</span
            >
          </p>
          <p style="font-weight: bold" v-if="!detailInfo.priceConstraint && !detailInfo.modelConstraint">
            <span v-if="!(detailInfo.coupleNumber && detailInfo.coupleCategoryNumber)">暂无约束条件</span>
          </p>
          <p class="ys-xing" v-if="detailInfo.coupleNumber && detailInfo.coupleCategoryNumber">
            购买限制：
          </p>
          <li v-if="detailInfo.coupleNumber && detailInfo.coupleCategoryNumber" style="margin-left: 10px;">
            购买限制 <label>{{ detailInfo.coupleNumber }}</label
            ><label v-if="detailInfo.coupleCategoryNumber == 1">类</label
            ><label v-if="detailInfo.coupleCategoryNumber == 2">件</label> 及以上
          </li>
          <em v-if="detailInfo.modelConstraint">
            <li v-if="detailInfo.modelConstraint[0].productList.length != 0">订单内必须含有</li>
            <p class="ys-ysbox" v-if="detailInfo.modelConstraint">
              <label v-for="product in detailInfo.modelConstraint[0].productList" style="display: block;">
                <label v-for="(item, num) in product">
                  <span :title="item.desc" v-if="item.desc != ''">
                    {{ item.desc }}
                  </span>
                  <span :title="item.brandName + ' | ' + item.productCategoryCode" v-if="item.desc == ''">
                    {{ item.brandName }} | {{ item.productCategoryCode }}
                  </span>
                  <i class="ico-link" v-if="product.length > 1 && num != product.length - 1"></i>
                </label>
              </label>
            </p>
            <li v-if="detailInfo.modelConstraint[1].productList.length != 0">仅参与计算权益</li>
            <p class="ys-ysbox" v-if="detailInfo.modelConstraint">
              <span v-for="item in detailInfo.modelConstraint[1].productList" :title="item.desc">
                {{ item.desc }}
              </span>
            </p>
            <li v-if="detailInfo.modelConstraint[2].productList.length != 0">订单内排除</li>
            <p class="ys-ysbox" v-if="detailInfo.modelConstraint">
              <span v-for="item in detailInfo.modelConstraint[2].productList" :title="item.desc">
                {{ item.desc }}
              </span>
            </p>
          </em>
          <p
            class="ys-xing"
            style="margin-top: 5px"
            v-if="detailInfo.priceConstraint && detailInfo.priceConstraint.productList.length != 0"
          >
            价格约束：
          </p>
          <div v-if="detailInfo.priceConstraint">
            <p class="ys-ysbox" v-if="detailInfo.priceConstraint.productList.length != 0">
              <span
                :title="
                  item.brandName +
                    ' | ' +
                    item.productCategoryCode +
                    ' | 价格区间' +
                    item.minPrice +
                    '至' +
                    item.maxPrice
                "
                v-for="item in detailInfo.priceConstraint.productList"
              >
                {{ item.brandName }} | {{ item.productCategoryCode }} | 价格区间{{ item.minPrice }}至{{ item.maxPrice }}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="m-border02" style="display: flex">
        <div
          class="config-item-1-2 gift m-border-r"
          v-bind:class="{
            giftHeight1: giftLength == 1,
            giftHeight2: giftLength == 2,
            giftHeight3: giftLength == 3,
            giftHeight4: giftLength == 4,
            giftHeight5: giftLength == 5
          }"
        >
          <p class="m-tit">赠送礼品</p>
          <div style="height:100%;">
            <p>
              套购赠
              <span
                style="margin-left:20px;font-weight: normal;font-weight: normal;font-size: 12px;color: #ee5851;"
                v-if="detailInfo.casarteFlag == 1"
                >套餐内全部为卡萨帝产品，赠送{{ detailInfo.casarteDouble }}倍积分</span
              >
            </p>
            <div v-if="detailInfo.scoreGiftConfig">
              <div
                v-for="gift in detailInfo.scoreGiftConfig.rightList"
                v-if="gift.scoreList || gift.productList || gift.giftList"
                style="display: block;"
              >
                <img v-if="gift.giftList && gift.giftList[0]" :src="gift.giftList[0].picUrl" alt="" />
                <img v-if="gift.scoreList && gift.scoreList[0]" src="../../assets/images/score.jpg" alt="" />
                <div v-if="detailInfo.scoreGiftConfig">
                  <p
                    v-show="!buyAm"
                    style="overflow: hidden; text-overflow:ellipsis; white-space: nowrap; width:200px;"
                    :title="gift.buyAmount"
                  >
                    满{{ gift.buyAmount }}-{{ gift.maxBuyAmount }}元赠
                  </p>
                  <!--<p v-show="!buyAm && gift.giftList[0]" style="overflow: hidden; text-overflow:ellipsis; white-space: nowrap; width:200px;"-->
                  <!--:title="gift.buyAmount">满{{gift.buyAmount}}元赠</p>-->
                  <p v-if="gift.scoreList && gift.scoreList.length != 0" class="gift-item">
                    <i></i>{{ gift.scoreList[0].score }}积分（总数{{ gift.scoreList[0].num }}份）
                    <el-button
                      type="text"
                      class="trs-btn"
                      style="width:auto;float: right;margin-top: -7px;"
                      @click="giftDetail(gift.buyAmount, detailInfo.id)"
                      >详情
                    </el-button>
                  </p>
                  <p v-if="gift.giftList && gift.giftList.length != 0" class="gift-item" style="max-width: 275px;">
                    <i></i>{{ gift.giftList[0].productName }}（总数{{ gift.giftList[0].num }}份）<em
                      v-if="gift.giftList[0].type == 1"
                      >（线上物品）</em
                    ><em v-if="gift.giftList[0].type == 2">（线下物品）</em>
                    <el-button
                      type="text"
                      class="trs-btn"
                      style="width:auto;float: right;margin-top: -7px;"
                      @click="giftDetail(gift.buyAmount, detailInfo.id)"
                      >详情
                    </el-button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="config-item-1-2 report">
          <p class="m-tit">预算审批报告</p>
          <div class="m-bocontent" style="border: none;">
            <a v-for="pic in detailInfo.auditPics" :href="pic" target="_blank">
              <img :src="pic" alt="" />
            </a>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      class="similar-rights-dialog trs-dialog"
      title=""
      :visible.sync="detailRights"
      :modal-append-to-body="false"
    >
      <div>
        <el-table :data="budget" max-height="294" class="tx_left">
          <!--:data="msgChinaListData.entities"-->
          <el-table-column prop="xiaoweiName" label="权益小微名称" width="200px"></el-table-column>
          <el-table-column prop="budgetAmount" label="分配金额"></el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="giveUpDetail" style="width:125px;">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      class="similar-rights-dialog trs-dialog"
      title=""
      :visible.sync="detailSubRights"
      :modal-append-to-body="false"
    >
      <div>
        <el-table :data="subBudget" max-height="294" class="tx_left">
          <!--:data="msgChinaListData.entities"-->
          <el-table-column prop="xwName" label="权益小微名称" width="200px"></el-table-column>
          <el-table-column prop="Num" label="分配份额"></el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="giveUpSubDetail" style="width:125px;">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      class="similar-rights-dialog trs-dialog"
      title=""
      :visible.sync="detailXwSubRights"
      :modal-append-to-body="false"
    >
      <div>
        <el-table :data="subXwBudget" max-height="294" class="tx_left">
          <!--:data="msgChinaListData.entities"-->
          <el-table-column prop="channel" label="活动渠道" width="200px"></el-table-column>
          <el-table-column prop="Num" label="分配份额"></el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="giveUpXwSubDetail" style="width:125px;">确定</el-button>
      </div>
    </el-dialog>

    <!-- 权益详情弹层 -->
    <el-dialog
      class="detail-dialog trs-dialog"
      title=""
      :visible.sync="qyDialog"
      :size="'large'"
      :modal-append-to-body="false"
    >
      <div class="config-item">
        <div class="m-border02">
          <div
            class="config-item-1-2 gift"
            v-bind:class="{
              giftHeight1: giftLength == 1,
              giftHeight2: giftLength == 2,
              giftHeight3: giftLength == 3,
              giftHeight4: giftLength == 4,
              giftHeight5: giftLength == 5
            }"
          >
            <!-- <p class="m-tit">赠送礼品</p> -->
            <div style="height:auto;width:780px;padding: 15px 10px;position: relative;" v-show="!errMsg">
              <a
                style="position: absolute;top: -38px;right: 2px;"
                :href="
                  './#/report/sellersorderreport?id=' +
                    orderDetailsId +
                    '&xiaoweiId=' +
                    xiaoweiId +
                    '&rightName=' +
                    rightName
                "
                target="_blank"
              >
                <el-button type="text">订单详情</el-button>
              </a>
              <div v-for="gift in qylist" style="padding:0">
                <img src="../../assets/images/score.jpg" alt="" />
                <div>
                  <p
                    style="overflow: hidden; text-overflow:ellipsis; white-space: nowrap; width:200px;"
                    :title="gift.buyAmount"
                  >
                    满{{ gift.buyAmount }}元赠
                  </p>
                  <p class="gift-item">
                    <i></i><em v-if="gift.score">{{ gift.score }}</em
                    ><em v-if="!gift.score">{{ gift.productName }}</em
                    >（总数{{ gift.num }}份）
                  </p>
                </div>
                <el-table :data="gift.channelList" style="width: 760px;margin-top:5px">
                  <el-table-column prop="channelName" label="活动渠道"> </el-table-column>
                  <el-table-column prop="channelConfigNum" label="权益配置总数"> </el-table-column>
                  <el-table-column prop="userGainNum" label="已发出数量"> </el-table-column>
                  <el-table-column prop="unActivatedNum" label="未激活数量"> </el-table-column>
                  <el-table-column prop="activatedNum" label="激活未领取数量" width="120"> </el-table-column>
                  <el-table-column prop="exchangeNum" label="已领取数量"> </el-table-column>
                  <el-table-column prop="expiredNum" label="失效数量"> </el-table-column>
                </el-table>
              </div>
            </div>
            <div style="width: 780px;text-align: center;line-height:90px">
              {{ errMsg }}
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

    <!--中国区单品权益详情弹层-->
    <el-dialog
      class="detail-dialog trs-dialog china-dialog"
      title=""
      :visible.sync="danpinDialog"
      :size="'large'"
      :modal-append-to-body="false"
    >
      <div v-show="!errMsg" style="position: relative;margin-top: 40px;">
        <a style="position: absolute;top: -45px;right: 80px;" href="javascript:;" @click="dpexcel(1)">
          <el-button type="primary">导出excel</el-button>
        </a>
        <a
          style="position: absolute;top: -45px;right: 2px;"
          :href="
            './#/report/sellersorderreport?id=' + orderDetailsId + '&xiaoweiId=' + xiaoweiId + '&rightName=' + rightName
          "
          target="_blank"
        >
          <el-button type="text">订单详情</el-button>
        </a>
        <el-table :data="danpindata.dataInfo" border>
          <el-table-column prop="xiaoweiName" v-for="(item, index) in arr" label="小微" width="150"> </el-table-column>
          <el-table-column v-for="(item, index) in danpindata.titleInfo" :key="index" :label="item">
            <el-table-column :label="title[index].one" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                {{ scope.row.numList[2 * index] }}
              </template>
            </el-table-column>
            <el-table-column :label="title[index].two" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                {{ scope.row.numList[2 * index + 1] }}
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="errMsg" style="width: 780px;text-align: center;line-height:90px;border: 1px solid #dfe6ec;">
        {{ errMsg }}
      </div>
    </el-dialog>

    <!--中国区独立配置详情弹层-->
    <el-dialog
      class="detail-dialog trs-dialog china-dialog"
      title=""
      :visible.sync="duliDialog"
      :size="'large'"
      :modal-append-to-body="false"
    >
      <div v-show="!errMsg" style="position: relative;margin-top: 40px;">
        <a style="position: absolute;top: -45px;right: 80px;" href="javascript:;" @click="dpexcel(2)">
          <el-button type="primary">导出excel</el-button>
        </a>
        <a
          style="position: absolute;top: -45px;right: 2px;"
          :href="
            './#/report/sellersorderreport?id=' + orderDetailsId + '&xiaoweiId=' + xiaoweiId + '&rightName=' + rightName
          "
          target="_blank"
        >
          <el-button type="text">订单详情</el-button>
        </a>
        <el-table :data="dulidata.dataInfo" border>
          <el-table-column prop="xiaoweiName" v-for="(item, index) in arr" label="小微" width="150"> </el-table-column>
          <el-table-column v-for="(item, index) in dulidata.titleInfo" :key="index" :label="item">
            <el-table-column :label="title[index].one" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                {{ scope.row.numList[2 * index] }}
              </template>
            </el-table-column>
            <el-table-column :label="title[index].two" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                {{ scope.row.numList[2 * index + 1] }}
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="errMsg" style="width: 780px;text-align: center;line-height:90px;border: 1px solid #dfe6ec;">
        {{ errMsg }}
      </div>
    </el-dialog>

    <!--修改有效期弹窗-->
    <el-dialog
      class="detail-dialog trs-dialog china-dialog"
      title="修改活动有效期"
      :visible.sync="uptimeDialog"
      :size="'large'"
      :modal-append-to-body="false"
    >
      <div style="margin-top: 48px;">
        <el-form ref="form" :model="form">
          <el-form-item label="活动有效期" prop="" class="required" style="margin-bottom: 0">
            <el-date-picker
              disabled
              v-model="form.startTime"
              type="date"
              placeholder="选择日期范围"
              :picker-options="pickerOptions"
            ></el-date-picker>
            <!--:disabled="edit"-->
            <span>-</span>
            <el-date-picker
              v-model="form.rightsEndTime"
              :editable="false"
              type="date"
              placeholder="选择日期范围"
              :picker-options="pickerOptions"
            ></el-date-picker>
            <!--<el-checkbox v-model="form.dateSign" :true-label="2" :false-label="1">不限结束时间</el-checkbox>-->
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="">
        <el-button type="primary" @click="adduptime">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import Qs from 'qs';
import { Loading } from 'element-ui';
import gUtils from '../../utils/gUtils.js';

export default {
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    })
  },
  data() {
    return {
      duliDialog: false,
      dulidata: [],
      title: [],
      excelid: '',
      danpindata: [],
      danpintitleinfo: [],
      arr: [],
      danpinDialog: false,
      dataTab: 'first',
      isChian: false,
      type: '',
      detailDialog: false,
      detailChinaDialog: false,
      budget: [], // 小微预算明细
      subBudget: [], // 小微预算明细
      subXwBudget: [], // 小微预算明细
      detailRights: false,
      detailSubRights: false,
      detailXwSubRights: false,
      detailInfo: {},
      whereCondetion: '',
      msgListData: [],
      msgChinaListData: [],
      chinaAreaMsgListData: [],
      pageNo: 1,
      pageNoChina: 1,
      msgListLoading: false,
      pageSize: 10,
      pageSizeChina: 10,
      statusCount: {},
      chinaStatusCount: {},
      xwdisabled: true,
      qddisabled: true,
      mddisabled: true,
      cydisabled: true,
      cpname: true,
      modelNo: '',
      buyAm: true,
      giftLength: 1,
      remainAmountLoading: true,
      remainAmount: [
        {
          remainHaier: ''
        },
        {
          remainCasarte: ''
        }
      ],
      qyDialog: false,
      qylist: [],
      errMsg: '',
      orderDetailsId: '',
      xiaoweiId: '',
      rightName: '',
      uptimeDialog: false,
      form: {
        id: '',
        startTime: '',
        rightsEndTime: '',
        dateSign: 1
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      isLeft: ''
    };
  },
  filters: {
    status(val) {
      let status = '';
      switch (val) {
        case 1:
          status = '存草稿';
          break;
        case 2:
          status = '审核中';
          break;
        case 3:
          status = '审核中';
          break;
        case 4:
          status = '审核中';
          break;
        case 5:
          status = '审核中';
          break;
        case 6:
          status = '已驳回';
          break;
        case 7:
          status = '待执行';
          break;
        case 8:
          status = '进行中';
          break;
        case 9:
          status = '已结束';
          break;
        case 10:
          status = '暂停';
          break;
        default:
          status = '';
      }
      return status;
    },
    dateFilter(val) {
      if (val) {
        val = val.split(' ')[0];
        return val;
      }
    },
    nameFilter(val) {
      if (val) {
        if (val.length > 9) {
          val = `${val.substring(0, 9)}...`;
        }
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
    withdraw(id) {
      const _this = this;
      this.$confirm('撤回后将变为草稿状态，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      })
        .then(() => {
          axios({
            url: `${this.apiUrl}vipcenter/orderRights/cancelOrderRights`,
            method: 'post',
            transformRequest: [
              function (data) {
                return Qs.stringify(data);
              }
            ],
            headers: {
              deviceCode: 'A95ZEF1-47B5-AC90BF3'
            },
            data: {
              id
            }
          })
            .then((response) => {
              if (response.data.isSuccess) {
                _this.$message({
                  type: 'success',
                  message: '撤回成功'
                });
                _this.listSearch();
              } else {
                _this.$message({
                  type: 'error',
                  message: response.data.msg
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(() => {});
    },
    xwwithdraw(id) {
      const _this = this;
      this.$confirm('撤回后将变为草稿状态，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      })
        .then(() => {
          axios({
            url: `${this.apiUrl}vipcenter/ChinaRegionRightsController/cancelOrderRights`,
            method: 'post',
            transformRequest: [
              function (data) {
                return Qs.stringify(data);
              }
            ],
            headers: {
              deviceCode: 'A95ZEF1-47B5-AC90BF3'
            },
            data: {
              id
            }
          })
            .then((response) => {
              if (response.data.isSuccess) {
                _this.$message({
                  type: 'success',
                  message: '撤回成功'
                });
                _this.listChinaSearch();
              } else {
                _this.$message({
                  type: 'error',
                  message: response.data.msg
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(() => {});
    },
    edittoDetail(id, rightSmallType) {
      this.$router.push({
        path: '/rights/rightsbaseinfotwo',
        query: {
          id,
          rightSmallType
        }
      });
    },
    shopsee() {
      window.location.href = this.detailInfo.excelPath;
    },
    adduptime() {
      const _this = this;
      const data = this.form;
      if (data.dateSign == 1 && !data.rightsEndTime) {
        this.$message({
          message: '请选择结束时间',
          type: 'warning'
        });
        return;
      }
      data.rightsEndTime = data.rightsEndTime != '' ? gUtils.dateFormat(Date.parse(data.rightsEndTime), 'yyyy-MM-dd') : '';
      if (this.isLeft == 0) {
        this.requestRights.updateRightEndTime(data).then((data) => {
          if (data.isSuccess) {
            _this.$message({
              message: data.msg,
              type: 'success'
            });
            _this.uptimeDialog = false;
            _this.listSearch();
          }
        });
      }
      if (this.isLeft == 1) {
        this.requestRights.updateRightEndTimeChina(data).then((data) => {
          if (data.isSuccess) {
            _this.$message({
              message: data.msg,
              type: 'success'
            });
            _this.uptimeDialog = false;
            _this.listChinaSearch();
          }
        });
      }
    },
    upTime(e, i) {
      this.isLeft = i;
      this.uptimeDialog = true;
      this.form.id = e.id;
      this.form.startTime = e.startTime;
      this.form.rightsEndTime = e.endTime.substring(0, 10); // 权益结束时间
    },
    filterChange() {
      this.listSearch();
    },
    // 跳转模板详情
    toDetail(id, rightSmallType) {
      this.$router.push({
        path: '/rights/rightsbaseinfo',
        query: {
          id,
          rightSmallType
        }
      });
    },
    toXwDetail(id, rightSmallType) {
      this.$router.push({
        path: '/rights/rightsxwbaseinfo',
        query: {
          id,
          rightSmallType
        }
      });
    },
    // 跳转模板详情-中国大区
    toDetailchina(id, rightSmallType) {
      this.$router.push({
        path: '/rights/rightschinabaseinfo',
        query: {
          id,
          rightSmallType
        }
      });
    },
    // 跳转新建模板
    toNewright() {
      this.$router.push({
        path: '/rights/rightsconfig'
      });
    },
    // 中国区小微权益使用详情
    toUseingDetail(id) {
      this.$router.push({
        path: '/rights/rightsuseingdetail',
        query: {
          id
        }
      });
    },
    // 查看详细信息
    reviewDetail(scope) {
      this.detailDialog = true;
      this.cpname = true;
      this.buyAm = true;
      if (typeof scope.row.auditPics === 'string') {
        scope.row.auditPics = scope.row.auditPics.split('|');
      }
      scope.row.salesAmount = scope.row.salesAmount || 0;

      if (typeof scope.row.scoreGiftConfig === 'string') {
        scope.row.scoreGiftConfig = JSON.parse(scope.row.scoreGiftConfig);
      }

      this.detailInfo = scope.row;
      // this.detailInfo.costAmount =  this.detailInfo.costAmount || 0
      if (this.detailInfo.costAmount) {
        this.detailInfo.costAmount = this.detailInfo.costAmount.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') || 0;
      } else {
        this.detailInfo.costAmount = 0;
      }

      if (this.detailInfo.rightSmallType == 2) {
        if (this.detailInfo.scoreGiftConfig != null && this.detailInfo.scoreGiftConfig.type == 3) {
          this.modelNo = '';
          this.cpname = false;
          for (let c = 0; c < this.detailInfo.scoreGiftConfig.modelNoDetail.length; c++) {
            const mo = [];
            const proList = this.detailInfo.scoreGiftConfig.modelNoDetail[c].productList;
            for (const j in proList) {
              mo.push(`${proList[j].brandName}|${proList[j].productCategoryCode}|${proList[j].modelNo}`);
            }
            this.detailInfo.scoreGiftConfig.modelNoDetail[c].modelNo = mo.join(' , ');
          }
        }
        if (this.detailInfo.scoreGiftConfig != null && this.detailInfo.scoreGiftConfig.type == 2) {
          this.buyAm = false;
        }
      }

      this.detailInfo.startTime = this.detailInfo.startTime.replace(/-/g, '/');
      this.detailInfo.endTime = this.detailInfo.endTime.replace(/-/g, '/');
      this.detailInfo.exchangeStartTime = this.detailInfo.exchangeStartTime.replace(/-/g, '/');
      this.detailInfo.exchangeEndTime = this.detailInfo.exchangeEndTime.replace(/-/g, '/');

      if (this.detailInfo.xiaoweiName != null) {
        this.xwdisabled = false;
      }
      if (this.detailInfo.channelName != null) {
        this.qddisabled = false;
      }
      if (this.detailInfo.shopName != null) {
        this.mddisabled = false;
      }
      if (this.detailInfo.productCategoryName != null) {
        this.cydisabled = false;
      }

      this.giftLength = scope.row.scoreGiftConfig && scope.row.scoreGiftConfig.rightList
        ? scope.row.scoreGiftConfig.rightList.length
        : 1;
    },
    // 查看详细信息--中国大区
    reviewChinaDetail(scope) {
      this.detailChinaDialog = true;
      this.cpname = true;
      this.buyAm = true;
      if (typeof scope.row.auditPics === 'string') {
        scope.row.auditPics = scope.row.auditPics.split('|');
      }
      scope.row.salesAmount = scope.row.salesAmount || 0;

      if (typeof scope.row.scoreGiftConfig === 'string') {
        scope.row.scoreGiftConfig = JSON.parse(scope.row.scoreGiftConfig);
      }

      this.detailInfo = scope.row;
      // this.detailInfo.costAmount =  this.detailInfo.costAmount || 0
      if (this.detailInfo.costAmount) {
        this.detailInfo.costAmount = this.detailInfo.costAmount.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') || 0;
      }
      if (this.detailInfo.rightSmallType == 2) {
        if (this.detailInfo.scoreGiftConfig != null && this.detailInfo.scoreGiftConfig.type == 3) {
          this.modelNo = '';
          this.cpname = false;
          for (let c = 0; c < this.detailInfo.scoreGiftConfig.productList.length; c++) {
            this.modelNo += `${this.detailInfo.scoreGiftConfig.productList[c].modelNo},`;
          }
          this.modelNo = this.modelNo.substring(0, this.modelNo.length - 1);
        }
        if (this.detailInfo.scoreGiftConfig != null && this.detailInfo.scoreGiftConfig.type == 2) {
          //          for( let a=0; a<this.detailInfo.scoreGiftConfig.rightList.length; a++){
          //            if(this.detailInfo.scoreGiftConfig.rightList[a].scoreList == undefined){
          //              console.log(123)
          //              this.detailInfo.scoreGiftConfig.rightList.splice(a,1)
          //              //delete this.detailInfo.scoreGiftConfig.rightList[a];
          //            }
          //          }
          //          console.log(this.detailInfo.scoreGiftConfig.rightList)
          this.buyAm = false;
        }
      }

      this.detailInfo.startTime = this.detailInfo.startTime.replace(/-/g, '/');
      this.detailInfo.endTime = this.detailInfo.endTime.replace(/-/g, '/');
      this.detailInfo.exchangeStartTime = this.detailInfo.exchangeStartTime.replace(/-/g, '/');
      this.detailInfo.exchangeEndTime = this.detailInfo.exchangeEndTime.replace(/-/g, '/');

      if (this.detailInfo.xiaoweiName != null) {
        this.xwdisabled = false;
      }
      if (this.detailInfo.channelName != null) {
        this.qddisabled = false;
      }
      if (this.detailInfo.shopName != null) {
        this.mddisabled = false;
      }
      if (this.detailInfo.productCategoryName != null) {
        this.cydisabled = false;
      }

      this.giftLength = scope.row.scoreGiftConfig && scope.row.scoreGiftConfig.rightList
        ? scope.row.scoreGiftConfig.rightList.length
        : 1;
    },
    // 暂停活动
    pause(id) {
      const self = this;
      const data = {
        id
      };
      this.requestRights.pauseOrderRights(data).then((data) => {
        if (data == 1) {
          self.$message({
            type: 'success',
            message: '活动已暂停!'
          });
        } else {
          self.$message({
            type: 'warning',
            message: '您无权限操作!'
          });
        }
        self.listSearch();
      });
    },
    // 重新开启活动
    start(id) {
      const self = this;
      const data = {
        id
      };
      this.requestRights.startOrderRights(data).then((data) => {
        if (data == 1) {
          self.$message({
            type: 'success',
            message: '活动已开启!'
          });
        } else {
          self.$message({
            type: 'warning',
            message: '您无权限操作!'
          });
        }
        self.listSearch();
      });
    },

    // 模板删除
    deleteTpl(id) {
      const self = this;

      this.$confirm('您确定要删除吗？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const data = {
            id
          };
          this.requestRights.deleteOrderRights(data).then((data) => {
            if (data.isSuccess) {
              self.$message({
                message: data.msg,
                type: 'success'
              });
            }
            self.listSearch();
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },

    // 模板删除--中国大区
    deleteChinaTpl(id) {
      const self = this;

      this.$confirm('您确定要删除吗？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const data = {
            id
          };
          this.requestRights.deleteRightsById(data).then((data) => {
            if (data.isSuccess) {
              self.$message({
                message: data.msg,
                type: 'success'
              });
            }
            self.listChinaSearch();
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },

    searchByStatus(type) {
      this.type = type;
      this.pageNo = 1;
      this.listSearch();
    },
    searchChinaByStatus(type) {
      this.type = type;
      this.pageNoChina = 1;
      this.listChinaSearch();
    },
    handleIconClick() {
      this.pageNo = 1;
      this.listSearch();
    },
    handleIconChinaClick() {
      this.pageNoChina = 1;
      this.listChinaSearch();
    },
    listSearch() {
      const self = this;

      const data = {
        pageNo: self.pageNo,
        pageSize: self.pageSize,
        type: self.type,
        whereCondition: self.whereCondetion
      };

      this.msgListLoading = true;
      this.requestRights.listOrderRights(data).then((data) => {
        if (data) {
          data.entities.forEach((el) => {
            el.modelConstraint = JSON.parse(el.modelConstraint);
            el.priceConstraint = JSON.parse(el.priceConstraint);
            el.budgetAmount = el.budgetAmount.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
            if (el.scoreGiftConfig) {
              el.scoreGiftConfig = JSON.parse(el.scoreGiftConfig);
            }
            el.buyNumProductCode = JSON.parse(el.buyNumProductCode);
          });
        }
        self.msgListData = data;
        self.msgListLoading = false;
      });

      this.getStatusCount();
    },
    // 中国大区
    listChinaSearch() {
      const self = this;
      const data = {
        pageNo: self.pageNoChina,
        pageSize: self.pageSizeChina,
        type: self.type,
        whereCondition: self.whereCondetion
      };

      this.msgListLoading = true;
      this.requestRights.pageListRights(data).then((data) => {
        if (data) {
          data.entities.forEach((el) => {
            el.modelConstraint = JSON.parse(el.modelConstraint);
            el.priceConstraint = JSON.parse(el.priceConstraint);
          });
        }
        self.msgChinaListData = data;
        for (let i = 0; i < data.length; i++) {
          self.msgChinaListData.entities[i].budgetAmount = self.msgChinaListData.entities[i].budgetAmount
            .toString()
            .replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
          if (self.msgChinaListData.entities[i].scoreGiftConfig) {
            self.msgChinaListData.entities[i].scoreGiftConfig = JSON.parse(
              self.msgChinaListData.entities[i].scoreGiftConfig
            );
          }
        }
        self.msgListLoading = false;
      });

      this.getChinaStatusCount();
    },
    getStatusCount() {
      const self = this;
      this.requestRights.getStatusCount().then((data) => {
        if (data) {
          self.statusCount = data;
        }
      });
    },
    // 中国大区getStatusCount
    getChinaStatusCount() {
      const self = this;
      // POST /ChinaRegionRightsController/getCount
      this.requestRights.getCount().then((data) => {
        if (data) {
          self.chinaStatusCount = data;
        }
      });
    },
    typeChange() {
      if (!this.msgListLoading) {
        this.pageNo = 1;
        this.listSearch();
      }
    },
    handleSizeChange(pageSize) {
      if (!this.msgListLoading) {
        this.pageNo = 1;
        this.pageSize = pageSize;
        this.listSearch();
      }
    },
    handleCurrentChange(pageNo) {
      if (!this.msgListLoading) {
        this.pageNo = pageNo;
        this.listSearch();
      }
    },
    handleChinaSizeChange(pageSize) {
      if (!this.msgListLoading) {
        this.pageNoChina = 1;
        this.pageSizeChina = pageSize;
        this.listChinaSearch();
      }
    },
    handleChinaCurrentChange(pageNo) {
      if (!this.msgListLoading) {
        this.pageNoChina = pageNo;
        this.listChinaSearch();
      }
    },
    getRemainAmount() {
      const self = this;
      this.requestRights.getRemainAmount().then((data) => {
        if (data) {
          self.remainAmountLoading = false;
          const keyHaier = '海尔';
          self.remainAmount.remainHaier = data[keyHaier];
          if (self.remainAmount.remainHaier == null) {
            self.remainAmount.remainHaier = '';
          }
          const keyCasarte = '卡萨帝';
          self.remainAmount.remainCasarte = data[keyCasarte];
          if (self.remainAmount.remainCasarte == null) {
            self.remainAmount.remainCasarte = '';
          }
        } else {
          self.remainAmountLoading = false;
        }
      });
    },
    // 中国大区判断
    areaJudge() {
      const self = this;
      const data = '';
      this.requestRights.isChian(data).then((data) => {
        if (data) {
          if (data && data != 'false') {
            self.isChian = true;
          } else {
            self.isChian = false;
          }
          if (self.isChian == true) {
            self.listSearch();
            self.listChinaSearch();
          } else {
            self.listSearch();
          }
        }
      });
    },
    // 中国区查看详情
    detail(id) {
      const _this = this;
      const params = {
        id
      };
      this.requestRights.getChinaDetailById(params).then((data) => {
        if (data.isSuccess) {
          _this.budget = data.data;
        }
      });
      this.detailRights = true;
      this.detailChinaDialog = false;
    },
    giftDetail(ele, id) {
      this.subBudget = [];
      const self = this;
      const params = {
        rightsId: id,
        amountCount: ele
      };
      this.requestRights.getScoreNum(params).then((data) => {
        if (data.isSuccess) {
          self.subBudget = data.data;
        }
      });
      this.detailSubRights = true;
      this.detailChinaDialog = false;
    },
    giveUpDetail() {
      this.detailRights = false;
      this.detailChinaDialog = true;
    },
    giveUpSubDetail() {
      this.detailSubRights = false;
      this.detailChinaDialog = true;
    },
    // 小微详细弹层
    giftXwDetail(ele, id) {
      const self = this;
      const params = {
        rightsId: id,
        amountCount: ele
      };
      this.requestRights.getXwScoreNum(params).then((data) => {
        if (data.isSuccess) {
          self.subXwBudget = data.data;
        }
      });
      this.detailXwSubRights = true;
      this.detailDialog = false;
    },
    giveUpXwSubDetail() {
      this.detailXwSubRights = false;
      this.detailDialog = true;
    },
    qyReviewDetail(scope) {
      const loadingInstance = Loading.service({
        target: '#app-view',
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading'
      });
      const _this = this;
      this.xiaoweiId = scope.row.xiaoweiId;
      if (this.xiaoweiId) {
        if (this.xiaoweiId == 'all') {
          this.xiaoweiId = '';
        }
        if (this.xiaoweiId.indexOf(',') != -1) {
          this.xiaoweiId = '';
        }
      }
      this.rightName = scope.row.rightName;
      this.orderDetailsId = scope.row.id;
      if (scope.row.chinaRegionFlag == 2 && scope.row.rightSmallType == 1) {
        this.excelid = scope.row.id;
        _this.danpindata = [];
        this.arr = [];
        this.errMsg = '';
        const params = {
          id: scope.row.id
        };
        this.requestRights.getStatisticsInfo(params).then((data) => {
          if (data.isSuccess) {
            const title = [];
            for (let i = 0; i < data.data.titleInfo.length; i++) {
              title.push({
                one: '已发放数量',
                two: '已领取数量'
              });
            }
            title[title.length - 1] = {
              one: '已发放费用(元)',
              two: '已领取费用(元)'
            };
            _this.title = title;
            _this.danpindata = data.data;
            _this.arr = [{ id: 1 }];
          } else {
            _this.errMsg = data.msg;
          }
          _this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          _this.danpinDialog = true;
        });
      } else if (scope.row.chinaRegionFlag == 2 && scope.row.rightSmallType == 2) {
        this.excelid = scope.row.id;
        _this.dulidata = [];
        this.arr = [];
        this.errMsg = '';
        const params = {
          id: scope.row.id
        };
        this.requestRights.getStatisticsInfoForCoupleProduct(params).then((data) => {
          if (data.isSuccess) {
            const title = [];
            for (let i = 0; i < data.data.titleInfo.length; i++) {
              title.push({
                one: '已发放数量',
                two: '已领取数量'
              });
            }
            title[title.length - 1] = {
              one: '已发放费用（元）',
              two: '已领取费用（元）'
            };
            _this.title = title;
            _this.dulidata = data.data;
            _this.arr = [{ id: 1 }];
          } else {
            _this.errMsg = data.msg;
          }
          _this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          _this.duliDialog = true;
        });
      } else {
        _this.qylist = [];
        _this.errMsg = '';
        const params = {
          id: scope.row.id
        };
        _this.requestStrategy.getStatisticsInfoByRightId(params).then((data) => {
          if (data.isSuccess) {
            _this.qylist = data.data;
          } else {
            _this.errMsg = data.msg;
          }
          _this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          _this.qyDialog = true;
        });
      }
    },
    dpexcel(e) {
      const _this = this;
      if (e == 1) {
        const params = {
          id: this.excelid
        };
        this.requestRights.exportStatisticsInfo(params).then((data) => {
          if (data.isSuccess) {
            window.location.href = data.data.showPath;
          }
        });
      } else if (e == 2) {
        const params = {
          id: this.excelid
        };
        this.requestRights.exportStatisticsInfoForCoupleProduct(params).then((data) => {
          if (data.isSuccess) {
            window.location.href = data.data.showPath;
          }
        });
      }
    }
  },
  mounted() {
    if (this.$route.query.type) {
      this.type = this.$route.query.type;
    }
    this.areaJudge();

    this.getRemainAmount();
  }
};
</script>
<style scoped>
.m-border03 {
}

.m-botitle {
  font-weight: bold;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  color: #28272b;
}

.m-bocontent {
  border: 1px solid #cccccc;
  padding: 15px 20px;
  min-height: 124px;
}

.m-bocontent img {
  width: 58px;
  height: 58px;
  border: 1px solid #cccccc;
  display: inline-block;
  vertical-align: top;
  margin-right: 10px;
}

.vip-content {
  padding-top: 15px;
}

.vip-head-tool {
  margin: 30px 0 10px;
  text-align: center;
}

.rights-config-header {
  background: initial;
}

.status-filter {
  display: inline-block;
  margin-left: 27px;
  position: relative;
}

.status-filter .m-link {
  display: inline-block;
  width: 94px;
  line-height: 26px;
  background: #e7e7e7;
  text-align: center;
  margin: 0 2px;
}

.status-filter .vip-newright {
  float: right;
  display: inline-block;
  position: absolute;
  right: 0;
  top: -60px;
  line-height: 16px;
  cursor: pointer;
  color: #45a0f8;
}

.status-filter .vip-newright i {
  width: 16px;
  height: 16px;
  display: inline-block;
  float: left;
  margin-right: 8px;
  background: url('../../assets/images/ico-newright.png') no-repeat;
}

.el-table {
  width: 1090px;
  margin: auto;
  text-align: center;
}

.el-pagination {
  text-align: right;
  width: 1090px;
  margin: 15px auto 0;
  padding: 0;
}

.config-item-1-2 {
  display: inline-block;
  margin: 0 2px;
  vertical-align: top;
  position: relative;
}

.config-item-1-2 > p {
  font-size: 16px;
  font-weight: bold;
  color: #28272b;
  text-align: left;
  margin-bottom: 10px;
}

.config-item-1-2 > div {
  width: 389px;
  height: auto;
  min-height: 124px;
  /*border: 1px solid #cccccc;*/
  text-align: left;
  padding-top: 15px;
  margin: 0 -4px;
}

.m-border {
  border: 1px solid #cccccc;
}

.m-border-r {
  border-right: 2px solid #cccccc;
}

.m-border02 {
  border: 1px solid #cccccc;
  margin-top: 40px;
}

.config-item-1-2 .m-tit {
  position: absolute;
  left: 0;
  top: -50px;
}

.config-item-1-2 label {
  display: inline-block;
  line-height: 25px;
}

.config-item-1-2 label p {
  display: inline-block;
}

.config-item-1-2 label span {
  display: inline-block;
  float: left;
  width: 135px;
  text-align: right;
  font-weight: bold;
}

.config-item-1-2 label p {
  float: left;
  width: 240px;
}

.config-item-1-2:last-child label span {
  width: 90px;
}

.config-item-1-2 img {
  width: 58px;
  height: 58px;
  border: 1px solid #cccccc;
  display: inline-block;
  vertical-align: top;
}

.config-item-1-2 div div {
  display: inline-block;
  padding: 2px 0;
}

.config-item-1-2 div div p {
  line-height: 18px;
}

.config-item-1-2.gift p {
  font-weight: bold;
}

.config-item-1-2.gift > div,
.config-item-1-2.report > div {
  padding: 15px 20px;
}

/*.config-item-1-2.giftHeight1>div{height: 124px;}*/

.config-item-1-2.giftHeight2 > div {
  height: 186px;
}

.config-item-1-2.giftHeight3 > div {
  height: 248px;
}

.config-item-1-2.giftHeight4 > div {
  height: 310px;
}

.config-item-1-2.giftHeight5 > div {
  height: 372px;
}

.config-item-1-2.gift > div > p {
  margin-bottom: 10px;
}

.config-item-1-2.gift img {
  margin-right: 12px;
}

.gift-item {
  color: #ee5851;
  font-weight: normal !important;
}

.config-item-1-2.report > div {
  padding: 30px 20px;
}

.config-item-1-2.report img {
  margin: 0 3px;
}

.config-item-1-2.gift > p,
.config-item-1-2.report > p {
  margin-top: 20px;
}

.ico-exam {
  width: 16px;
  height: 16px;
  display: inline-block;
  float: left;
}

.ico-exam img {
  vertical-align: -2px;
}

.schedule-linebox {
  width: 180px;
  height: 3px;
  background: #d0d0d0;
  display: inline-block;
  margin: 21px 90px 53px;
  position: relative;
}

/*.schedule-linebox{ width: 270px; height: 3px; background: #d0d0d0; display: inline-block; margin: 21px 45px 53px; position: relative;}*/

.schedule-linebox.sch01 .ico-line {
  width: 0px;
  display: inline-block;
  height: 3px;
  background: #8cce3d;
  float: left;
}

.schedule-linebox.sch02 .ico-line {
  width: 180px;
  display: inline-block;
  height: 3px;
  background: #8cce3d;
  float: left;
}

/*.schedule-linebox.sch01 .ico-line{ width: 0px; display: inline-block; height: 3px; background: #8cce3d; float: left;}*/

/*.schedule-linebox.sch02 .ico-line{ width: 90px; display: inline-block; height: 3px; background: #8cce3d; float: left;}*/

.schedule-linebox.sch03 .ico-line {
  width: 180px;
  display: inline-block;
  height: 3px;
  background: #8cce3d;
  float: left;
}

.schedule-linebox.sch04 .ico-line {
  width: 270px;
  display: inline-block;
  height: 3px;
  background: #8cce3d;
  float: left;
}

.schedule-linebox .m-ul {
  width: 180px;
  position: absolute;
  z-index: 100;
  left: 0;
  top: 0;
}

.schedule-linebox .m-ul li {
  width: 30px;
  height: 30px;
  display: inline-block;
  float: left;
  margin-top: -13px;
  border: 5px solid transparent;
  background: url('../../assets/images/ico-will.png') no-repeat;
  position: relative;
}

.schedule-linebox .m-ul li .m-txt {
  width: 100px;
  display: inline-block;
  position: absolute;
  top: 30px;
  left: 9px;
  margin-left: -50px;
  font-size: 12px;
  color: #333;
  text-align: center;
}

.schedule-linebox .m-ul li:nth-child(1) {
  margin-left: -15px;
}

.schedule-linebox .m-ul li:nth-child(2) {
  float: right;
  margin-right: -14px;
}

/*.schedule-linebox .m-ul li:nth-child(1){ margin-left: -15px;}*/

/*.schedule-linebox .m-ul li:nth-child(2){ margin-left: 60px;}*/

.schedule-linebox .m-ul li:nth-child(3) {
  margin-left: 60px;
}

.schedule-linebox .m-ul li:nth-child(4) {
  float: right;
  margin-right: -14px;
}

.schedule-linebox.sch01 .m-ul li:nth-child(1) {
  background: url('../../assets/images/ico-new.png') no-repeat;
  border: 5px solid #fff;
}

.schedule-linebox.sch01 .m-ul li:nth-child(1) .m-txt {
  color: #ee5851;
}

.schedule-linebox.sch02 .m-ul li:nth-child(1) {
  background: url('../../assets/images/ico-over.png') no-repeat;
}

.schedule-linebox.sch02 .m-ul li:nth-child(2) {
  background: url('../../assets/images/ico-new.png') no-repeat;
  border: 5px solid #fff;
}

.schedule-linebox.sch02 .m-ul li:nth-child(2) .m-txt {
  color: #ee5851;
}

.schedule-linebox.sch03 .m-ul li:nth-child(1) {
  background: url('../../assets/images/ico-over.png') no-repeat;
}

.schedule-linebox.sch03 .m-ul li:nth-child(2) {
  background: url('../../assets/images/ico-over.png') no-repeat;
}

.schedule-linebox.sch03 .m-ul li:nth-child(3) {
  background: url('../../assets/images/ico-new.png') no-repeat;
  color: #ee5851;
  border: 5px solid #fff;
}

.schedule-linebox.sch03 .m-ul li:nth-child(3) .m-txt {
  color: #ee5851;
}

.schedule-linebox.sch04 .m-ul li:nth-child(1) {
  background: url('../../assets/images/ico-over.png') no-repeat;
}

.schedule-linebox.sch04 .m-ul li:nth-child(2) {
  background: url('../../assets/images/ico-over.png') no-repeat;
}

.schedule-linebox.sch04 .m-ul li:nth-child(3) {
  background: url('../../assets/images/ico-over.png') no-repeat;
}

.schedule-linebox.sch04 .m-ul li:nth-child(4) {
  background: url('../../assets/images/ico-new.png') no-repeat;
  color: #ee5851;
  border: 5px solid #fff;
}

.schedule-linebox.sch04 .m-ul li:nth-child(4) .m-txt {
  color: #ee5851;
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

.bh-color {
  color: #f3918d;
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

.config-item-1-2 label span.color-red {
  color: #ee5851;
  font-weight: normal;
  display: inline;
}

.gift-item i {
  width: 12px;
  height: 14px;
  display: inline-block;
  margin-right: 5px;
  background: url('../../assets/images/ico-gift.png') no-repeat;
}

.m-txtomit {
  width: 240px;
  overflow: hidden;
  height: 24px;
  text-overflow: ellipsis;
  line-height: 24px;
  white-space: nowrap;
}

.el-tabs {
  width: 1090px;
  margin: auto;
  text-align: center;
}

.tx_left {
  text-align: left !important;
}

.config-item-1-2.report > .yueshu {
  padding: 15px 20px;
}

.ys-xing {
  margin-bottom: 5px;
  font-weight: bold;
}

.yueshu li {
  margin-left: 10px;
}

.ys-ysbox {
  margin-left: 20px;
}

.xhc span {
  display: inline-block;
  border: 1px solid #c3e0fd;
  background: #fff;
  width: 232px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 10px;
  margin: 0 4px;
}

.ys-ysbox span {
  display: inline-block;
  border: 1px solid #c3e0fd;
  background: #fff;
  width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 10px;
  margin: 0 2px;
}
</style>
<style>
.rights-act-list .el-table th,
.el-table th div {
  background: #e0f0ff;
  font-weight: normal;
}

.rights-act-list .el-table__body-wrapper tr:nth-child(odd) {
}

.rights-act-list .el-table__body-wrapper tr:nth-child(even) {
  background: #f6f6f6;
}

/* .rights-act-list .el-table .cell{ overflow: auto!important;} */


.el-table_1_column_5 .cell.el-tooltip > div {
  position: initial !important;
}

.el-table_1_column_5 .el-loading-spinner .circular {
  width: 22px;
}

.el-table_1_column_5 .el-loading-mask {
  background: rgba(0, 0, 0, 0);
}

.china-dialog .el-dialog__body .el-table__body-wrapper {
  overflow: auto;
}
</style>

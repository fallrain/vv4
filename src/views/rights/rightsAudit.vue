<template>
  <div class="vip-content">
    <div>
      <div class="rights-config-header">
        <div class="header-title"><span>权益审核</span></div>
      </div>
    </div>
    <div class="vip-head-tool"></div>
    <div v-if="!isChian">
      <el-table :data="msgListData.entities" border v-loading="msgListLoading">
        <el-table-column prop="templateName" label="序号" width="50">
          <template slot-scope="scope">
            {{ (msgListData.pageNo - 1) * msgListData.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="创建者" width="120" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="rightName" label="权益活动名称" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="startTime" label="权益活动有效期" width="190">
          <template slot-scope="scope">
            {{ scope.row.startTime | dateFilter }} - {{ scope.row.endTime | dateFilter | endTimeFilter }}
          </template>
        </el-table-column>
        <el-table-column prop="budgetAmount" label="预算(元)" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="xiaoweiName" label="小微" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="channelName" label="渠道" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="time" label="详情" show-overflow-tooltip>
          <template slot-scope="scope">
            <a href="javascript:;" class="color-link" @click="reviewDetail(scope)">查看详情</a>
          </template>
        </el-table-column>
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
                  <li><div class="m-txt">上级领导</div></li>
                  <li><div class="m-txt">积分商城负责人</div></li>
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
                  <li><div class="m-txt">上级领导</div></li>
                  <li><div class="m-txt">积分中心负责人</div></li>
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
                  ><img src="../../assets/images/ico-sh.png" alt=""
                /></i>
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
                <i class="ico-exam" v-show="scope.row.status == 6"
                  ><img src="../../assets/images/ico-bh.png" alt=""
                /></i>
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a
              v-if="scope.row.editSign == 1 && pass"
              href="javascript:;"
              class="color-link operation-btn"
              @click="passExamine(scope)"
              >通过</a
            >
            <a
              v-if="scope.row.editSign == 1"
              href="javascript:;"
              class="color-link operation-btn"
              @click="reJect(scope.row.id)"
              >驳回</a
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

    <div>
      <el-tabs v-if="isChian" v-model="dataTab" type="card" v-loading="msgListLoading">
        <el-tab-pane label="中国区独立配置" name="first">
          <el-table :data="msgListData.entities" border>
            <el-table-column prop="templateName" label="序号" width="50">
              <template slot-scope="scope">
                {{ (msgListData.pageNo - 1) * msgListData.pageSize + scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="userName" label="创建者" width="120" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="rightName" label="权益活动名称" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="startTime" label="权益活动有效期" width="190">
              <template slot-scope="scope">
                {{ scope.row.startTime | dateFilter }} - {{ scope.row.endTime | dateFilter | endTimeFilter }}
              </template>
            </el-table-column>
            <el-table-column prop="budgetAmount" label="预算(元)" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="xiaoweiName" label="小微" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="channelName" label="渠道" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="time" label="详情" show-overflow-tooltip>
              <template slot-scope="scope">
                <a href="javascript:;" class="color-link" @click="reviewDetail(scope)">查看详情</a>
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
                      <li><div class="m-txt">上级领导</div></li>
                      <li><div class="m-txt">积分商城负责人</div></li>
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
                      <li><div class="m-txt">上级领导</div></li>
                      <li><div class="m-txt">积分中心负责人</div></li>
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
                      ><img src="../../assets/images/ico-sh.png" alt=""
                    /></i>
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
                    <i class="ico-exam" v-show="scope.row.status == 6"
                      ><img src="../../assets/images/ico-bh.png" alt=""
                    /></i>
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
            <el-table-column label="操作">
              <template slot-scope="scope">
                <a
                  v-if="scope.row.editSign == 1 && pass"
                  href="javascript:;"
                  class="color-link operation-btn"
                  @click="passExamine(scope)"
                  >通过</a
                >
                <a
                  v-if="scope.row.editSign == 1"
                  href="javascript:;"
                  class="color-link operation-btn"
                  @click="reJect(scope.row.id)"
                  >驳回</a
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
        </el-tab-pane>

        <el-tab-pane label="中国区小微联合配置" name="second">
          <el-table :data="msgChinaListData.entities" border>
            <el-table-column prop="templateName" label="序号" width="50">
              <template slot-scope="scope">
                {{ (msgChinaListData.pageNo - 1) * msgChinaListData.pageSize + scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="userName" label="创建者" width="120" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="rightName" label="权益活动名称" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="startTime" label="权益活动有效期" width="190">
              <template slot-scope="scope">
                {{ scope.row.startTime | dateFilter }} - {{ scope.row.endTime | dateFilter | endTimeFilter }}
              </template>
            </el-table-column>
            <el-table-column prop="budgetAmount" label="预算(元)" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="xiaoweiName" label="小微" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="channelName" label="渠道" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="time" label="详情" show-overflow-tooltip>
              <template slot-scope="scope">
                <a href="javascript:;" class="color-link" @click="reviewChinaDetail(scope)">查看详情</a>
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
                      <li><div class="m-txt">上级领导</div></li>
                      <li><div class="m-txt">积分商城负责人</div></li>
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
                      <li><div class="m-txt">上级领导</div></li>
                      <li><div class="m-txt">积分中心负责人</div></li>
                      <!--<li><div class="m-txt"> 积分商城负责人</div></li>-->
                      <!--<li><div class="m-txt">积分商城运营</div></li>-->
                      <!--<li><div class="m-txt">积分商城主管</div></li>-->
                    </ul>
                  </div>
                  <div slot="reference" class="name-wrapper">
                    <i class="ico-exam" v-show="scope.row.status == 2"
                      ><img src="../../assets/images/ico-sh.png" alt=""
                    /></i>
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
                    <i class="ico-exam" v-show="scope.row.status == 6"
                      ><img src="../../assets/images/ico-bh.png" alt=""
                    /></i>
                    <div class="bh-color">{{ scope.row.status | status }}</div>
                  </div>
                </el-popover>
                <div v-if="scope.row.status == 10">审核通过</div>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <a
                  v-if="scope.row.status == 1 || scope.row.status == 2"
                  href="javascript:;"
                  class="color-link operation-btn"
                  @click="passChinaExamine(scope)"
                  >通过</a
                >
                <a
                  v-if="scope.row.status == 1 || scope.row.status == 2"
                  href="javascript:;"
                  class="color-link operation-btn"
                  @click="reChinaJect(scope.row.id)"
                  >驳回</a
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
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog class="detail-dialog trs-dialog" title="" :visible.sync="detailDialog" :modal-append-to-body="false">
      <div class="config-item">
        <div class="config-item-1-2">
          <p>基础信息</p>
          <div class="m-border">
            <label for=""
              ><span>权益活动名称：</span>
              <p>{{ detailInfo.rightName }}</p></label
            >
            <label for=""
              ><span>活动有效期：</span>
              <p>
                {{ detailInfo.startTime | dateFilter }} - {{ detailInfo.endTime | dateFilter | endTimeFilter }}
              </p></label
            >
            <label for=""
              ><span>礼品兑换有效期：</span>
              <p>
                {{ detailInfo.exchangeStartTime | dateFilter }} -
                {{ detailInfo.exchangeEndTime | dateFilter | endTimeFilter }}
              </p></label
            >
            <label for=""
              ><span>礼品类型：</span>
              <p>{{ detailInfo.giftType | giftNameByType }}</p></label
            >
            <label for=""
              ><span>投入预算：</span>
              <p>
                <span class="color-red">{{ detailInfo.budgetAmount }}</span> 元
              </p></label
            >
            <label for=""
              ><span>成本合计：</span>
              <p>
                <span class="color-red">{{ detailInfo.costAmount }}</span> 元
              </p></label
            >
            <label for=""
              ><span>是否认筹：</span>
              <p v-if="detailInfo.recognitionFlag == 1">是</p>
              <p v-if="detailInfo.recognitionFlag == 0">否</p></label
            >
            <!-- <label for=""><span>产出销售额：</span><p>{{detailInfo.salesAmount}} 元</p></label> -->
          </div>
        </div>
        <div class="config-item-1-2">
          <p>活动范围</p>
          <div class="m-border">
            <label for=""
              ><span>活动区域：</span>
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
            <label for=""
              ><span>活动渠道：</span>
              <p>{{ detailInfo.channelName | nameFilter }}</p></label
            >
            <label for=""
              ><span>活动门店：</span>
              <el-tooltip
                v-if="detailInfo.shopSign == 2"
                class="item"
                :disabled="mddisabled"
                effect="light"
                :content="detailInfo.shopName"
                placement="top"
              >
                <p>{{ detailInfo.shopName | nameFilter }}</p>
              </el-tooltip>
              <em v-if="detailInfo.shopSign == 1" class="shopsign-box" @click="shopsee">点击下载</em>
            </label>
            <label for=""
              ><span>活动品牌：</span>
              <p>{{ detailInfo.brandName }}</p></label
            >
            <label for=""
              ><span>产业类别：</span>
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
            <label for=""
              ><span></span>
              <p></p
            ></label>
            <label for=""
              ><span></span>
              <p></p
            ></label>
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
          <div
            class="config-item-1-2 gift"
            v-if="detailInfo.scoreGiftConfig"
            v-bind:class="{
              giftHeight1: giftLength == 1,
              giftHeight2: giftLength == 2,
              giftHeight3: giftLength == 3,
              giftHeight4: giftLength == 4,
              giftHeight5: giftLength == 5
            }"
          >
            <p class="m-tit">赠送礼品</p>
            <div class="m-border-r" style="height: 100%">
              <div v-if="detailInfo.scoreGiftConfig">
                <p
                  style="font-weight: normal;font-weight: normal;font-size: 12px;color: #ee5851;"
                  v-if="detailInfo.casarteFlag == 1"
                >
                  套餐内全部为卡萨帝产品，赠送{{ detailInfo.casarteDouble }}倍积分
                </p>
                <div v-for="gift in detailInfo.scoreGiftConfig.rightList">
                  <img v-if="gift.giftList && gift.giftList[0]" :src="gift.giftList[0].picUrl" alt="" />
                  <img v-if="gift.scoreList && gift.scoreList[0]" src="../../assets/images/score.jpg" alt="" />
                  <div v-if="detailInfo.scoreGiftConfig">
                    <p v-show="cpname && buyAm" :title="gift.modelNo">{{ gift.modelNo }}</p>
                    <p v-show="!cpname" :title="modelNo">{{ modelNo }}</p>
                    <p v-show="!buyAm" :title="gift.buyAmount">满{{ gift.buyAmount }}-{{ gift.maxBuyAmount }}元赠</p>
                    <p
                      v-if="
                        gift.scoreList && gift.scoreList[0] && gift.scoreList[0].score && gift.scoreList[0].score != ''
                      "
                      class="gift-item"
                    >
                      <i></i>{{ gift.scoreList[0].score }}积分（总数{{ gift.scoreList[0].num }}份）
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
                    <p v-if="gift.giftList && gift.giftList[0]" class="gift-item">
                      <i></i><span>{{ gift.giftList[0].productName }}</span
                      >（总数{{ gift.giftList[0].num }}份）
                    </p>
                  </div>
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
          <div class="m-border">
            <label for=""
              ><span>权益活动名称：</span>
              <p>{{ detailInfo.rightName }}</p></label
            >
            <label for=""
              ><span>活动有效期：</span>
              <p>
                {{ detailInfo.startTime | dateFilter }} - {{ detailInfo.endTime | dateFilter | endTimeFilter }}
              </p></label
            >
            <label for=""
              ><span>礼品兑换有效期：</span>
              <p>
                {{ detailInfo.exchangeStartTime | dateFilter }} -
                {{ detailInfo.exchangeEndTime | dateFilter | endTimeFilter }}
              </p></label
            >
            <label for=""
              ><span>礼品类型：</span>
              <p>{{ detailInfo.giftType | giftNameByType }}</p></label
            >
            <label for=""
              ><span>投入预算：</span>
              <p>
                <span class="color-red">{{ detailInfo.budgetAmount }}</span> 元
              </p></label
            >
            <label for=""
              ><span>成本合计：</span>
              <p>
                <span class="color-red">{{ detailInfo.costAmount }}</span> 元
              </p></label
            >
            <label for=""
              ><span>预算明细：</span
              ><el-button @click="detail(detailInfo.id)" style="padding: 5px 6px;">查看详情</el-button></label
            >
            <label for=""
              ><span>是否认筹：</span>
              <p v-if="detailInfo.recognitionFlag == 1">是</p>
              <p v-if="detailInfo.recognitionFlag == 0">否</p></label
            >
            <!-- <label for=""><span>产出销售额：</span><p>{{detailInfo.salesAmount}} 元</p></label> -->
          </div>
        </div>
        <div class="config-item-1-2">
          <p>活动范围</p>
          <div class="m-border" style="height: 256px;">
            <!--<label for=""><span>活动区域：</span>-->
            <!--<el-tooltip class="item" :disabled="xwdisabled" effect="light" :content="detailInfo.xiaoweiName" placement="top">-->
            <!--<p>{{detailInfo.xiaoweiName | nameFilter}}</p>-->
            <!--</el-tooltip>-->
            <!--</label>-->
            <label for=""
              ><span>活动品牌：</span>
              <p>{{ detailInfo.brandName }}</p></label
            >
            <label for=""
              ><span>产业类别：</span>
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
        <div class="m-border02" style="display: flex">
          <div
            class="config-item-1-2 gift"
            v-if="detailInfo.scoreGiftConfig"
            v-bind:class="{
              giftHeight1: giftLength == 1,
              giftHeight2: giftLength == 2,
              giftHeight3: giftLength == 3,
              giftHeight4: giftLength == 4,
              giftHeight5: giftLength == 5
            }"
          >
            <p class="m-tit">赠送礼品</p>
            <div class="m-border-r" style="height:100%;">
              <p
                style="font-weight: normal;font-weight: normal;font-size: 12px;color: #ee5851;"
                v-if="detailInfo.casarteFlag == 1"
              >
                套餐内全部为卡萨帝产品，赠送{{ detailInfo.casarteDouble }}倍积分
              </p>
              <div v-if="detailInfo.scoreGiftConfig">
                <div v-for="gift in detailInfo.scoreGiftConfig.rightList">
                  <img v-if="gift.giftList && gift.giftList[0]" :src="gift.giftList[0].picUrl" alt="" />
                  <img v-if="gift.scoreList && gift.scoreList[0]" src="../../assets/images/score.jpg" alt="" />
                  <div v-if="detailInfo.scoreGiftConfig">
                    <p v-show="!buyAm" :title="gift.buyAmount">满{{ gift.buyAmount }}-{{ gift.maxBuyAmount }}元赠</p>
                    <p v-if="gift.scoreList && gift.scoreList[0] && gift.scoreList[0].score != ''" class="gift-item">
                      <i></i>{{ gift.scoreList[0].score }}积分（总数{{ gift.scoreList[0].num }}份）<el-button
                        type="text"
                        class="trs-btn"
                        style="width:auto;float: right;margin-top: -7px;"
                        @click="giftDetail(gift.buyAmount, detailInfo.id)"
                        >详情</el-button
                      >
                    </p>
                    <p v-if="gift.giftList && gift.giftList[0] && gift.giftList[0].score != ''" class="gift-item">
                      <i></i>{{ gift.giftList[0].productName }}（总数{{ gift.giftList[0].num }}份）<el-button
                        type="text"
                        class="trs-btn"
                        style="width:auto;float: right;margin-top: -7px;"
                        @click="giftDetail(gift.buyAmount, detailInfo.id)"
                        >详情</el-button
                      >
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
      </div>
    </el-dialog>

    <el-dialog class="reject-dialog trs-dialog" title="" :visible.sync="rejectDialog" :modal-append-to-body="false">
      <div>
        <el-input
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 10 }"
          :maxlength="20"
          placeholder="请输入驳回原因"
          v-model="textarea"
        >
        </el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="rejectEnter()" class="trs-btn" style="width:125px;">确认驳回</el-button>
      </div>
    </el-dialog>

    <el-dialog
      class="reject-dialog trs-dialog"
      title=""
      :visible.sync="rejectChinaDialog"
      :modal-append-to-body="false"
    >
      <div>
        <el-input
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 10 }"
          :maxlength="20"
          placeholder="请输入驳回原因"
          v-model="textarea"
        >
        </el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="rejectChinaEnter()" class="trs-btn" style="width:125px;">确认驳回</el-button>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import gUtils from '../../utils/gUtils.js';

export default {
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    })
  },
  data() {
    return {
      budget: [], // 小微预算明细
      subBudget: [], // 小微预算明细
      detailRights: false,
      detailSubRights: false,
      type: '',
      isChian: false,
      dataTab: 'first',
      pass: true,
      detailDialog: false,
      detailChinaDialog: false,
      rejectDialog: false,
      rejectChinaDialog: false,
      detailInfo: {},
      textarea: '',
      rejectId: '',
      templateType: '营销类',
      msgListData: [],
      msgChinaListData: [],
      pageNo: 1,
      pageNoChina: 1,
      msgListLoading: false,
      cpname: true,
      modelNo: '',
      buyAm: true,
      pageSize: 10,
      pageSizeChina: 10,
      form: {
        rightsType: 0,
        rankUseIds: 0,
        status: 0
      },
      memberRank: [],
      xwdisabled: true,
      mddisabled: true,
      cydisabled: true,
      giftLength: 1
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
    rightsTypeFilter(val) {
      if (val == 1) {
        return '内部权益';
      }
      return '外部权益';
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
    shopsee() {
      window.location.href = this.detailInfo.excelPath;
    },
    filterChange() {
      this.listSearch();
    },
    // 跳转模板详情
    toDetail(id) {
      this.$router.push({
        path: '/rights/addright',
        query: { id }
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
          this.requestCare
            .update({
              id,
              status: -1
            })
            .then((data) => {
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
    listSearch() {
      const self = this;

      const data = {
        pageNo: self.pageNo,
        pageSize: self.pageSize,
        type: self.type
      };

      this.msgListLoading = true;
      this.requestRights.listCheckedOrderRights(data).then((data) => {
        self.msgListLoading = false;
        if (data) {
          data.entities.forEach((el) => {
            el.modelConstraint = JSON.parse(el.modelConstraint);
            el.priceConstraint = JSON.parse(el.priceConstraint);
            el.buyNumProductCode = JSON.parse(el.buyNumProductCode);
          });
          self.msgListData = data;
          for (let i = 0; i < self.msgListData.entities.length; i++) {
            if (self.msgListData.entities[i].scoreGiftConfig) {
              self.msgListData.entities[i].scoreGiftConfig = JSON.parse(self.msgListData.entities[i].scoreGiftConfig);
            }
          }
        }
      });
    },
    // 中国大区
    listChinaSearch() {
      const self = this;
      const data = {
        pageNo: self.pageNoChina,
        pageSize: self.pageSizeChina,
        type: self.type
      };

      this.msgListLoading = true;
      this.requestRights.pageAuditList(data).then((data) => {
        self.msgListLoading = false;
        if (data) {
          data.entities.forEach((el) => {
            el.modelConstraint = JSON.parse(el.modelConstraint);
            el.priceConstraint = JSON.parse(el.priceConstraint);
          });
          self.msgChinaListData = data;
          for (let i = 0; i < self.msgChinaListData.entities.length; i++) {
            if (self.msgChinaListData.entities[i].scoreGiftConfig) {
              self.msgChinaListData.entities[i].scoreGiftConfig = JSON.parse(
                self.msgChinaListData.entities[i].scoreGiftConfig
              );
            }
          }
        }
      });
    },
    handleSizeChange(pageSize) {
      if (!this.msgListLoading) {
        this.pageNo = 1;
        this.pageSize = pageSize;
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
    handleCurrentChange(pageNo) {
      if (!this.msgListLoading) {
        this.pageNo = pageNo;
        this.listSearch();
      }
    },
    handleChinaCurrentChange(pageNo) {
      if (!this.msgListLoading) {
        this.pageNoChina = pageNo;
        this.listChinaSearch();
      }
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
      if (this.detailInfo.rightSmallType == 2) {
        if (this.detailInfo.scoreGiftConfig != null && this.detailInfo.scoreGiftConfig.type == 3) {
          this.modelNo = '';
          this.cpname = false;
          for (let c = 0; c < this.detailInfo.scoreGiftConfig.modelNoDetail.length; c++) {
            this.detailInfo.scoreGiftConfig.modelNoDetail[c].modelNo = this.detailInfo.scoreGiftConfig.modelNoDetail[
              c
            ].modelNoList.join(',');
          }
        }
        if (this.detailInfo.scoreGiftConfig != null && this.detailInfo.scoreGiftConfig.type == 2) {
          this.buyAm = false;
        }
      }
      if (this.detailInfo.xiaoweiName != null) {
        this.xwdisabled = false;
      }
      if (this.detailInfo.shopName != null) {
        this.mddisabled = false;
      }
      if (this.detailInfo.productCategoryName != null) {
        this.cydisabled = false;
      }
      if (scope.row.scoreGiftConfig.rightList) {
        this.giftLength = scope.row.scoreGiftConfig ? scope.row.scoreGiftConfig.rightList.length : 1;
      }
    },
    // 查看详细信息
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
          this.buyAm = false;
        }
      }
      if (this.detailInfo.xiaoweiName != null) {
        this.xwdisabled = false;
      }
      if (this.detailInfo.shopName != null) {
        this.mddisabled = false;
      }
      if (this.detailInfo.productCategoryName != null) {
        this.cydisabled = false;
      }
      this.giftLength = scope.row.scoreGiftConfig ? scope.row.scoreGiftConfig.rightList.length : 1;
    },
    passExamine(scope) {
      const self = this;
      self.pass = false;

      this.$confirm('请确定审核通过吗？', '审核', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const pm = {
            id: scope.row.id,
            status: 2
          };
          this.requestRights.updateAuditStatus(pm).then((data) => {
            if (data.isSuccess == true) {
              self.$message({
                type: 'success',
                message: '审核通过!'
              });
              self.pass = true;
              self.listSearch();
            } else {
              self.pass = true;
              self.$message({
                type: 'warning',
                message: data.msg
              });
            }
          });
        })
        .catch(() => {
          self.pass = true;
          this.$message({
            type: 'info',
            message: '已取消审核'
          });
        });

      //          let data = {
      //              id:scope.row.id,
      //              status: 2,
      //          };
      //          this.requestRights.updateAuditStatus(data).then(function(data) {
      //              self.$message({
      //                  type: "success",
      //                  message: "审核通过!"
      //              });
      //              self.listSearch();
      //          });
    },
    // 中国大区通过
    passChinaExamine(scope) {
      const self = this;
      self.pass = false;

      this.$confirm('请确定审核通过吗？', '审核', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const pm = {
            id: scope.row.id,
            status: 2
          };
          this.requestRights.updateChinaAuditStatus(pm).then((data) => {
            if (data.isSuccess == true) {
              self.$message({
                type: 'success',
                message: '审核通过!'
              });
              self.pass = true;
              self.listChinaSearch();
            } else {
              self.pass = true;
              self.$message({
                type: 'warning',
                message: data.msg
              });
            }
          });
        })
        .catch(() => {
          self.pass = true;
          this.$message({
            type: 'info',
            message: '已取消审核'
          });
        });

      //          let data = {
      //              id:scope.row.id,
      //              status: 2,
      //          };
      //          this.requestRights.updateAuditStatus(data).then(function(data) {
      //              self.$message({
      //                  type: "success",
      //                  message: "审核通过!"
      //              });
      //              self.listSearch();
      //          });
    },
    reJect(id) {
      this.rejectDialog = true;
      this.rejectId = id;
    },
    // 中国大区驳回
    reChinaJect(id) {
      this.rejectChinaDialog = true;
      this.rejectId = id;
    },

    rejectEnter() {
      const self = this;
      if ($.trim(self.textarea) != '') {
        const data = {
          id: self.rejectId,
          status: 6,
          rejectReason: self.textarea
        };
        this.requestRights.updateAuditStatus(data).then((data) => {
          self.$message({
            type: 'success',
            message: '已驳回!'
          });
          self.listSearch();
        });
        this.rejectDialog = false;
        this.textarea = '';
      } else {
        self.$message({
          type: 'info',
          message: '请填写驳回原因!'
        });
      }
    },
    // 中国大区驳回
    rejectChinaEnter() {
      const self = this;
      if ($.trim(self.textarea) != '') {
        const data = {
          id: self.rejectId,
          status: 6,
          rejectReason: self.textarea
        };
        this.requestRights.updateChinaAuditStatus(data).then((data) => {
          self.$message({
            type: 'success',
            message: '已驳回!'
          });
          self.listChinaSearch();
        });
        this.rejectChinaDialog = false;
        this.textarea = '';
      } else {
        self.$message({
          type: 'info',
          message: '请填写驳回原因!'
        });
      }
    },
    // 中国大区判断
    areaJudge() {
      const self = this;
      const data = '';
      this.requestRights.isChian(data).then((data) => {
        if (data) {
          if (data && data != 'false') {
            data = true;
          } else {
            data = false;
          }
          self.isChian = data;
          if (data) {
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
    }
  },
  mounted() {
    if (this.$route.query.type) {
      this.type = this.$route.query.type;
    }
    this.areaJudge();
  }
};
</script>
<style scoped>
.ys-ysbox label {
  margin: 0;
}
.ico-link {
  width: 20px;
  height: 26px;
  display: inline-block;
  margin-left: -4px;
  margin-top: -2px;
  position: relative;
  z-index: 10;
  vertical-align: top;
  background: url('../../assets/images/ico-prolink02.png') no-repeat;
}
.shopsign-box {
  border: 1px solid #ccc;
  padding: 2px 5px;
  border-radius: 5px;
  cursor: pointer;
}
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
  font-size: 12px;
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
}
.status-filter a {
  display: inline-block;
  width: 94px;
  line-height: 26px;
  background: #e7e7e7;
  text-align: center;
  margin: 0 2px;
}
.el-table {
  width: 928px;
  margin: auto;
  text-align: center;
}
.el-pagination {
  text-align: right;
  width: 928px;
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
  display: block;
  line-height: 25px;
}
.config-item-1-2 label p {
  display: inline-block;
}
.config-item-1-2 label span {
  display: inline-block;
  width: 135px;
  text-align: right;
  font-weight: bold;
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
  max-width: 272px;
}
.config-item-1-2.gift > div,
.config-item-1-2.report > div {
  padding: 15px 20px;
  height: auto;
  min-height: 120px;
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

.reject-dialog .dialog-footer {
  text-align: center;
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
/*.schedule-linebox{ width: 270px; height: 3px; background: #d0d0d0; display: inline-block; margin: 21px 45px 53px; position: relative;}*/
.schedule-linebox {
  width: 180px;
  height: 3px;
  background: #d0d0d0;
  display: inline-block;
  margin: 21px 90px 53px;
  position: relative;
}
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
/*.schedule-linebox .m-ul li:nth-child(2){ margin-left: 60px;}*/
.schedule-linebox .m-ul li:nth-child(3) {
  margin-left: 60px;
}
.schedule-linebox .m-ul li:nth-child(4) {
  float: right;
  margin-right: -14px;
}

.schedule-linebox.sch01 .m-ul li:nth-child(1) {
  margin-left: -15px;
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
  float: right;
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
.el-tabs {
  width: 1090px;
  margin: auto;
  text-align: center;
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
.tx_left {
  text-align: left !important;
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
  font-size: 12px;
}
</style>
<style>

</style>

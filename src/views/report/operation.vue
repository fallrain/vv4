<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand"><i></i>会员等级</p>
      <div class="clear"></div>
    </div>

    <div class="vip_level">
      <div class="vip_level_1-3">
        <div>
          <h6>金卡会员数</h6>
          <p>
            <el-tooltip
              v-if="getUserInfo.brandName == 'haier'"
              class="item"
              effect="dark"
              :content="'金卡 ' + count['104'] + ' 老金卡 ' + oldCount['104']"
              placement="top"
            >
              <em>{{ memberFunnelData['104'] }}</em>
            </el-tooltip>
            <em v-if="getUserInfo.brandName == 'casarte'">{{ memberFunnelData['204'] }}</em>
          </p>
        </div>
      </div>
      <div class="vip_level_1-3">
        <div>
          <h6>银卡会员数</h6>
          <p>
            <el-tooltip
              v-if="getUserInfo.brandName == 'haier'"
              class="item"
              effect="dark"
              :content="'银卡 ' + count['103'] + ' 老银卡 ' + oldCount['103']"
              placement="top"
            >
              <em>{{ memberFunnelData['103'] + 124000 }}</em>
            </el-tooltip>
            <em v-if="getUserInfo.brandName == 'casarte'">{{ memberFunnelData['203'] }}</em>
          </p>
        </div>
      </div>
      <div class="vip_level_1-3">
        <div>
          <h6>普通会员数</h6>
          <p v-if="getUserInfo.brandName == 'haier'">{{ memberFunnelData['102'] + 300000 }}</p>
          <p v-if="getUserInfo.brandName == 'casarte'">{{ memberFunnelData['202'] }}</p>
        </div>
      </div>
    </div>

    <!--会员价值 开始-->
    <div class="vip-head-tool">
      <p class="template-brand"><i></i>扫码注册统计</p>
      <div class="clear"></div>
    </div>
    <div>
      <!--扫码注册统计表格 START-->
      <div>
        <div>
          <div class="block" style="float: left;margin-right: 20px;">
            <el-date-picker
              v-model="statisticsNumDataSeachTime1"
              type="date"
              :editable="false"
              :clearable="false"
              placeholder="选择时间范围"
              align="left"
              :picker-options="pickerBeginDateBefore"
            ></el-date-picker>
            <span style="margin:0 5px;">-</span>
            <el-date-picker
              v-model="statisticsNumDataSeachTime2"
              type="date"
              :editable="false"
              :clearable="false"
              placeholder="选择时间范围"
              align="left"
              :picker-options="pickerBeginDateBefore"
            ></el-date-picker>
          </div>
          <el-button type="primary" class="fl" @click="statisticsNumDataStartDateChange">确定</el-button>
          <div class="clear"></div>
        </div>
        <div style="margin-top:20px;">
          <el-table :data="statisticsNumData.entities" style="width: 100%" height="202">
            <el-table-column prop="statisticsDate" label="日期" min-width="50%">
              <template scope="scope">
                <div>{{ gUtils.dateFormat(scope.row.statisticsDate, 'yyyy-MM-dd') }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="regUserNum" label="注册人数" min-width="50%"> </el-table-column>
            <el-table-column prop="regProductNum" label="绑定产品数" min-width="50%"> </el-table-column>
            <el-table-column prop="regProductUserNum" label="绑定人数" min-width="50%"> </el-table-column>
            <el-table-column prop="customerServiceClickNum" label="在线客服点击数" min-width="50%"> </el-table-column>
            <el-table-column prop="signinNum" label="签到人数" min-width="50%"> </el-table-column>
            <el-table-column prop="seashellsNum" label="签到海贝数" min-width="50%"> </el-table-column>
          </el-table>
          <el-pagination
            @size-change="statisticsNumDataHandleSizeChange"
            @current-change="statisticsNumDataHandleCurrentChange"
            border
            :current-page.sync="statisticsNumDataPageNo"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="statisticsNumDataPageSize"
            layout="sizes, prev, pager, next"
            :total="statisticsNumData.entityCount"
          >
          </el-pagination>
        </div>
      </div>
      <!--扫码注册统计表格 END-->
    </div>
    <!--会员价值 结束-->

    <!--会员价值 开始-->
    <div class="vip-head-tool">
      <p class="template-brand"><i></i>会员价值</p>
      <div class="clear"></div>
    </div>
    <div>
      <el-tabs v-model="vipCostTabs" type="card" @tab-click="vipCostHandleClick">
        <el-tab-pane label="银卡以上会员数" name="1">
          <!--银卡以上会员数折线图 START-->
          <div>
            <div class="block" style="float: left;margin-right: 20px;">
              <el-date-picker
                v-model="vipCostlineSeachTime1"
                type="datetime"
                :editable="false"
                placeholder="选择时间范围"
                @change="vipStarTimeChange(vipCostlineSeachTime1)"
                align="left"
              ></el-date-picker>
              <span style="margin:0 5px;">-</span>
              <el-date-picker
                v-model="vipCostlineSeachTime2"
                type="datetime"
                :editable="false"
                placeholder="选择时间范围"
                @change="vipEndTimeChange(vipCostlineSeachTime2)"
                align="left"
              ></el-date-picker>
            </div>
            <el-button
              type="primary"
              class="fl"
              @click="vipCostLineDateSeach(vipCostlineSeachTime1, vipCostlineSeachTime2)"
              >确定</el-button
            >
            <div class="clear"></div>
          </div>
          <chart-line width="900px" height="300px" :data="dataQueryUrlTimeDistribVipCont" :isArea="false"></chart-line>
          <!--银卡以上会员数折线图 END-->
          <!--银卡以上会员数表格 START-->
          <div style="margin-top:-15px;">
            <div>
              <div class="block" style="float: left;margin-right: 20px;">
                <el-date-picker
                  v-model="vipCostTableSeachTime1"
                  type="datetime"
                  :editable="false"
                  placeholder="选择时间范围"
                  @change="vipTableStarTimeChange01(vipCostTableSeachTime1)"
                  align="left"
                ></el-date-picker>
                <span style="margin:0 5px;">-</span>
                <el-date-picker
                  v-model="vipCostTableSeachTime2"
                  type="datetime"
                  :editable="false"
                  placeholder="选择时间范围"
                  @change="vipTableEndTimeChange01(vipCostTableSeachTime2)"
                  align="left"
                ></el-date-picker>
              </div>
              <el-button
                type="primary"
                class="fl"
                @click="vipCostTableDateSeach01(vipCostTableSeachTime1, vipCostTableSeachTime2)"
                >确定</el-button
              >
              <div class="clear"></div>
            </div>
            <div style="margin-top:20px;">
              <el-table :data="vipCostMsgListData01.entities" style="width: 100%" height="202">
                <el-table-column prop="countDate" label="时间" min-width="50%">
                  <template scope="scope">
                    <div>{{ gUtils.dateFormat(scope.row.countDate, 'yyyy-MM-dd') }}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="totalNum" label="银卡以上会员数" min-width="50%"> </el-table-column>
              </el-table>
              <el-pagination
                @size-change="vipCosthandleSizeChange01"
                @current-change="vipCosthandleCurrentChange01"
                border
                :current-page.sync="vpageNo01"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="vpageSize01"
                layout="sizes, prev, pager, next"
                :total="vipCostMsgListData01.entityCount"
              >
              </el-pagination>
            </div>
          </div>
          <!--银卡以上会员数表格 END-->
        </el-tab-pane>
        <el-tab-pane label="会员数" name="2">
          <!--升级会员数折线图 START-->
          <div>
            <div class="block" style="float: left;margin-right: 20px;">
              <el-date-picker
                v-model="vipCostlineSeachTime1"
                type="datetime"
                :editable="false"
                placeholder="选择时间范围"
                @change="vipStarTimeChange(vipCostlineSeachTime1)"
                align="left"
              ></el-date-picker>
              <span style="margin:0 5px;">-</span>
              <el-date-picker
                v-model="vipCostlineSeachTime2"
                type="datetime"
                :editable="false"
                placeholder="选择时间范围"
                @change="vipEndTimeChange(vipCostlineSeachTime2)"
                align="left"
              ></el-date-picker>
            </div>
            <el-button
              type="primary"
              class="fl"
              @click="vipCostLineDateSeach(vipCostlineSeachTime1, vipCostlineSeachTime2)"
              >确定</el-button
            >
            <div class="clear"></div>
          </div>
          <chart-line width="900px" height="300px" :data="dataQueryUrlTimeDistribVipCont" :type="2"></chart-line>
          <!--升级会员数折线图 END-->
          <!--升级会员数表格 START-->
          <div style="margin-top:-15px;">
            <div>
              <div class="block" style="float: left;margin-right: 20px;">
                <el-date-picker
                  v-model="vipCostTableSeachTime1"
                  type="datetime"
                  :editable="false"
                  placeholder="选择时间范围"
                  @change="vipTableStarTimeChange02(vipCostTableSeachTime1)"
                  align="left"
                ></el-date-picker>
                <span style="margin:0 5px;">-</span>
                <el-date-picker
                  v-model="vipCostTableSeachTime2"
                  type="datetime"
                  :editable="false"
                  placeholder="选择时间范围"
                  @change="vipTableEndTimeChange02(vipCostTableSeachTime2)"
                  align="left"
                ></el-date-picker>
              </div>
              <el-button
                type="primary"
                class="fl"
                @click="vipCostTableDateSeach02(vipCostTableSeachTime1, vipCostTableSeachTime2)"
                >确定</el-button
              >
              <div class="clear"></div>
            </div>
            <div style="margin-top:20px;">
              <el-table :data="vipCostMsgListData02.entities" style="width: 100%" height="202">
                <el-table-column prop="countDate" label="时间" min-width="50%">
                  <template scope="scope">
                    <div>{{ gUtils.dateFormat(scope.row.countDate, 'yyyy-MM-dd') }}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="totalNum" label="升级会员数" min-width="50%"> </el-table-column>
              </el-table>
              <el-pagination
                @size-change="vipCosthandleSizeChange02"
                @current-change="vipCosthandleCurrentChange02"
                border
                :current-page.sync="vpageNo02"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="vpageSize02"
                layout="sizes, prev, pager, next"
                :total="vipCostMsgListData02.entityCount"
              >
              </el-pagination>
            </div>
          </div>
          <!--升级会员数表格 END-->
        </el-tab-pane>
        <el-tab-pane label="升级粉/普/银/金" name="3">
          <!--升级粉/普/银/金折线图 START-->
          <div>
            <div class="block" style="float: left;margin-right: 20px;">
              <el-date-picker
                v-model="vipCostlineSeachTime1"
                type="datetime"
                :editable="false"
                placeholder="选择时间范围"
                @change="vipStarTimeChange(vipCostlineSeachTime1)"
                align="left"
              ></el-date-picker>
              <span style="margin:0 5px;">-</span>
              <el-date-picker
                v-model="vipCostlineSeachTime2"
                type="datetime"
                :editable="false"
                placeholder="选择时间范围"
                @change="vipEndTimeChange(vipCostlineSeachTime2)"
                align="left"
              ></el-date-picker>
            </div>
            <el-button
              type="primary"
              class="fl"
              @click="vipCostLineDateSeach(vipCostlineSeachTime1, vipCostlineSeachTime2)"
              >确定</el-button
            >
            <div class="clear"></div>
          </div>
          <chart-line width="900px" height="300px" :data="dataQueryUrlTimeDistribVipCont" :type="2"></chart-line>
          <!--升级粉/普/银/金折线图 END-->
          <!--升级粉/普/银/金表格 START-->
          <div style="margin-top:-15px;">
            <div>
              <div class="block" style="float: left;margin-right: 20px;">
                <el-date-picker
                  v-model="vipCostTableSeachTime1"
                  type="datetime"
                  :editable="false"
                  placeholder="选择时间范围"
                  @change="vipTableStarTimeChange03(vipCostTableSeachTime1)"
                  align="left"
                ></el-date-picker>
                <span style="margin:0 5px;">-</span>
                <el-date-picker
                  v-model="vipCostTableSeachTime2"
                  type="datetime"
                  :editable="false"
                  placeholder="选择时间范围"
                  @change="vipTableEndTimeChange03(vipCostTableSeachTime2)"
                  align="left"
                ></el-date-picker>
              </div>
              <el-button
                type="primary"
                class="fl"
                @click="vipCostTableDateSeach03(vipCostTableSeachTime1, vipCostTableSeachTime2)"
                >确定</el-button
              >
              <div class="clear"></div>
            </div>
            <div style="margin-top:20px;">
              <el-table :data="vipCostMsgListData03.entities" style="width: 100%" height="202">
                <el-table-column prop="countDate" label="时间" min-width="20%">
                  <template scope="scope">
                    <div>{{ gUtils.dateFormat(scope.row.countDate, 'yyyy-MM-dd') }}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="countNum1" label="升级粉丝数" min-width="20%"></el-table-column>
                <el-table-column prop="countNum2" label="升级普卡数" min-width="20%"> </el-table-column>
                <el-table-column prop="countNum3" label="升级银卡数" min-width="20%"> </el-table-column>
                <el-table-column prop="countNum4" label="升级金卡数" min-width="20%"> </el-table-column>
              </el-table>
              <el-pagination
                @size-change="vipCosthandleSizeChange03"
                @current-change="vipCosthandleCurrentChange03"
                border
                :current-page.sync="vpageNo03"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="vpageSize03"
                layout="sizes, prev, pager, next"
                :total="vipCostMsgListData03.entityCount"
              >
              </el-pagination>
            </div>
          </div>
          <!--升级粉/普/银/金表格 END-->
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--会员价值 结束-->

    <!--准金银卡会员 开始-->
    <div class="vip-head-tool">
      <p class="template-brand"><i></i>准金银卡会员</p>
      <div class="clear"></div>
    </div>

    <div>
      <el-tabs v-model="goldtabs" type="card" @tab-click="ghandleClick">
        <el-tab-pane label="准银卡现状" name="1">
          <!--准银卡现状图表 START-->
          <div>
            <div class="block" style="float: left;margin-right: 20px;">
              <el-date-picker
                v-model="GoldGraphSeachTime1"
                type="datetime"
                :editable="false"
                placeholder="选择时间范围"
                @change="gStarTimeChange(GoldGraphSeachTime1)"
                align="left"
              ></el-date-picker>
              <span style="margin:0 5px;">-</span>
              <el-date-picker
                v-model="GoldGraphSeachTime2"
                type="datetime"
                :editable="false"
                placeholder="选择时间范围"
                @change="gEndTimeChange(GoldGraphSeachTime2)"
                align="left"
              ></el-date-picker>
            </div>
            <el-button type="primary" class="fl" @click="goldGraphDateSeach(GoldGraphSeachTime1, GoldGraphSeachTime2)"
              >确定</el-button
            >
            <div class="clear"></div>
          </div>
          <chart-graph width="900px" height="300px" :data="dataQueryUrlTimeDistribgraph01"></chart-graph>
          <!--准银卡现状图表 END-->
          <!--准银卡现状表格 START-->
          <div style="margin-top:-15px;">
            <div>
              <div class="block" style="float: left;margin-right: 20px;">
                <el-date-picker
                  v-model="GoldTableSeachTime1"
                  type="datetime"
                  :editable="false"
                  placeholder="选择时间范围"
                  @change="gTableStarTimeChange01(GoldTableSeachTime1)"
                  align="left"
                ></el-date-picker>
                <span style="margin:0 5px;">-</span>
                <el-date-picker
                  v-model="GoldTableSeachTime2"
                  type="datetime"
                  :editable="false"
                  placeholder="选择时间范围"
                  @change="gTableEndTimeChange01(GoldTableSeachTime2)"
                  align="left"
                ></el-date-picker>
              </div>
              <el-button
                type="primary"
                class="fl"
                @click="goldTableDateSeach01(GoldTableSeachTime1, GoldTableSeachTime2)"
                >确定</el-button
              >
              <div class="clear"></div>
            </div>
            <div style="margin-top:20px;">
              <el-table :data="gmsgListData01.entities" style="width: 100%" height="202">
                <el-table-column prop="reserver1" label="时间" min-width="15%"> </el-table-column>
                <el-table-column prop="gold_silver_card" label="达到银卡标准用户数" min-width="17%"> </el-table-column>
                <el-table-column prop="transform_silver" label="待升级准银卡数" min-width="17%"> </el-table-column>
                <el-table-column prop="transform_member" label="准银卡未注册的数量" min-width="17%"> </el-table-column>
                <el-table-column prop="member" label="准银卡已注册粉丝数" min-width="17%"> </el-table-column>
                <el-table-column prop="ordinary_card" label="准银卡已成为普卡数" min-width="17%"> </el-table-column>
              </el-table>
              <el-pagination
                @size-change="ghandleSizeChange01"
                @current-change="ghandleCurrentChange01"
                border
                :current-page.sync="gpageNo01"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="gpageSize01"
                layout="sizes, prev, pager, next"
                :total="gmsgListData01.entityCount"
              >
              </el-pagination>
            </div>
          </div>
          <!--准银卡现状表格 END-->
        </el-tab-pane>

        <el-tab-pane label="准金卡现状" name="2">
          <!--准金卡现状图表 START-->
          <div>
            <div class="block" style="float: left;margin-right: 20px;">
              <el-date-picker
                v-model="GoldGraphSeachTime1"
                type="datetime"
                :editable="false"
                placeholder="选择时间范围"
                @change="gStarTimeChange(GoldGraphSeachTime1)"
                align="left"
              ></el-date-picker>
              <span style="margin:0 5px;">-</span>
              <el-date-picker
                v-model="GoldGraphSeachTime2"
                type="datetime"
                :editable="false"
                placeholder="选择时间范围"
                @change="gEndTimeChange(GoldGraphSeachTime2)"
                align="left"
              ></el-date-picker>
            </div>
            <el-button type="primary" class="fl" @click="goldGraphDateSeach(GoldGraphSeachTime1, GoldGraphSeachTime2)"
              >确定</el-button
            >
            <div class="clear"></div>
          </div>
          <chart-graph width="900px" height="300px" :data="dataQueryUrlTimeDistribgraph01"></chart-graph>
          <!--准金卡现状图表 END-->
          <!--准金卡现状表格 START-->
          <div style="margin-top:-15px;">
            <div>
              <div class="block" style="float: left;margin-right: 20px;">
                <el-date-picker
                  v-model="GoldTableSeachTime1"
                  type="datetime"
                  :editable="false"
                  placeholder="选择时间范围"
                  @change="gTableStarTimeChange02(GoldTableSeachTime1)"
                  align="left"
                ></el-date-picker>
                <span style="margin:0 5px;">-</span>
                <el-date-picker
                  v-model="GoldTableSeachTime2"
                  type="datetime"
                  :editable="false"
                  placeholder="选择时间范围"
                  @change="gTableEndTimeChange02(GoldTableSeachTime2)"
                  align="left"
                ></el-date-picker>
              </div>
              <el-button
                type="primary"
                class="fl"
                @click="goldTableDateSeach02(GoldTableSeachTime1, GoldTableSeachTime2)"
                >确定</el-button
              >
              <div class="clear"></div>
            </div>
            <div style="margin-top:20px;">
              <el-table :data="gmsgListData02.entities" style="width: 100%" height="202">
                <el-table-column prop="reserver1" label="时间" min-width="10%"> </el-table-column>
                <el-table-column prop="gold_silver_card" label="达到金卡标准用户数" min-width="16%"> </el-table-column>
                <el-table-column prop="transform_silver" label="待升级准金卡数" min-width="16%"> </el-table-column>
                <el-table-column prop="transform_member" label="准金卡未注册的数量" min-width="16%"> </el-table-column>
                <el-table-column prop="member" label="准金卡已注册粉丝数" min-width="16%"> </el-table-column>
                <el-table-column prop="ordinary_card" label="准金卡已成为普卡／银卡数" min-width="26%">
                </el-table-column>
              </el-table>
              <el-pagination
                @size-change="ghandleSizeChange02"
                @current-change="ghandleCurrentChange02"
                border
                :current-page.sync="gpageNo02"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="gpageSize02"
                layout="sizes, prev, pager, next"
                :total="gmsgListData02.entityCount"
              >
              </el-pagination>
            </div>
          </div>
          <!--准金卡现状表格 END-->
        </el-tab-pane>

        <el-tab-pane label="准银卡升级效果" name="3">
          <!--准银卡升级效果图表 START-->
          <div>
            <div class="block" style="float: left;margin-right: 20px;">
              <el-date-picker
                v-model="GoldGraphSeachTime1"
                type="datetime"
                :editable="false"
                placeholder="选择时间范围"
                @change="gStarTimeChange(GoldGraphSeachTime1)"
                align="left"
              ></el-date-picker>
              <span style="margin:0 5px;">-</span>
              <el-date-picker
                v-model="GoldGraphSeachTime2"
                type="datetime"
                :editable="false"
                placeholder="选择时间范围"
                @change="gEndTimeChange(GoldGraphSeachTime2)"
                align="left"
              ></el-date-picker>
            </div>
            <el-button type="primary" class="fl" @click="goldGraphDateSeach(GoldGraphSeachTime1, GoldGraphSeachTime2)"
              >确定</el-button
            >
            <div class="clear"></div>
          </div>
          <chart-graph width="900px" height="300px" :data="dataQueryUrlTimeDistribgraph01"></chart-graph>
          <!--准银卡升级效果图表 END-->
          <!--准银卡升级效果表格 START-->
          <div style="margin-top:-15px;">
            <div>
              <div class="block" style="float: left;margin-right: 20px;">
                <el-date-picker
                  v-model="GoldTableSeachTime1"
                  type="datetime"
                  :editable="false"
                  placeholder="选择时间范围"
                  @change="gTableStarTimeChange03(GoldTableSeachTime1)"
                  align="left"
                ></el-date-picker>
                <span style="margin:0 5px;">-</span>
                <el-date-picker
                  v-model="GoldTableSeachTime2"
                  type="datetime"
                  :editable="false"
                  placeholder="选择时间范围"
                  @change="gTableEndTimeChange03(GoldTableSeachTime2)"
                  align="left"
                ></el-date-picker>
              </div>
              <el-button
                type="primary"
                class="fl"
                @click="goldTableDateSeach03(GoldTableSeachTime1, GoldTableSeachTime2)"
                >确定</el-button
              >
              <div class="clear"></div>
            </div>
            <div style="margin-top:20px;">
              <el-table :data="gmsgListData03.entities" style="width: 100%" height="202">
                <el-table-column prop="reserver1" label="时间" min-width="25%"> </el-table-column>
                <el-table-column prop="member" label="准银卡新注册为会员的数量" min-width="25%"> </el-table-column>
                <el-table-column prop="ordinary_card" label="准银卡由粉丝升级为普卡的数量" min-width="25%">
                </el-table-column>
                <el-table-column prop="silver_card" label="准银卡升级为银卡的数量" min-width="25%"> </el-table-column>
              </el-table>
              <el-pagination
                @size-change="ghandleSizeChange03"
                @current-change="ghandleCurrentChange03"
                border
                :current-page.sync="gpageNo03"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="gpageSize03"
                layout="sizes, prev, pager, next"
                :total="gmsgListData03.entityCount"
              >
              </el-pagination>
            </div>
          </div>
          <!--准银卡升级效果表格 END-->
        </el-tab-pane>

        <el-tab-pane label="准金卡升级效果" name="4">
          <!--准银卡升级效果图表 START-->
          <div>
            <div class="block" style="float: left;margin-right: 20px;">
              <el-date-picker
                v-model="GoldGraphSeachTime1"
                type="datetime"
                :editable="false"
                placeholder="选择时间范围"
                @change="gStarTimeChange(GoldGraphSeachTime1)"
                align="left"
              ></el-date-picker>
              <span style="margin:0 5px;">-</span>
              <el-date-picker
                v-model="GoldGraphSeachTime2"
                type="datetime"
                :editable="false"
                placeholder="选择时间范围"
                @change="gEndTimeChange(GoldGraphSeachTime2)"
                align="left"
              ></el-date-picker>
            </div>
            <el-button type="primary" class="fl" @click="goldGraphDateSeach(GoldGraphSeachTime1, GoldGraphSeachTime2)"
              >确定</el-button
            >
            <div class="clear"></div>
          </div>
          <chart-graph width="900px" height="300px" :data="dataQueryUrlTimeDistribgraph01"></chart-graph>
          <!--准银卡升级效果图表 END-->
          <!--准银卡升级效果表格 START-->
          <div style="margin-top:-15px;">
            <div>
              <div class="block" style="float: left;margin-right: 20px;">
                <el-date-picker
                  v-model="GoldTableSeachTime1"
                  type="datetime"
                  :editable="false"
                  placeholder="选择时间范围"
                  @change="gTableStarTimeChange04(GoldTableSeachTime1)"
                  align="left"
                ></el-date-picker>
                <span style="margin:0 5px;">-</span>
                <el-date-picker
                  v-model="GoldTableSeachTime2"
                  type="datetime"
                  :editable="false"
                  placeholder="选择时间范围"
                  @change="gTableEndTimeChange04(GoldTableSeachTime2)"
                  align="left"
                ></el-date-picker>
              </div>
              <el-button
                type="primary"
                class="fl"
                @click="goldTableDateSeach04(GoldTableSeachTime1, GoldTableSeachTime2)"
                >确定</el-button
              >
              <div class="clear"></div>
            </div>
            <div style="margin-top:20px;">
              <el-table :data="gmsgListData04.entities" style="width: 100%" height="202">
                <el-table-column prop="reserver1" label="时间" min-width="25%"> </el-table-column>
                <el-table-column prop="member" label="准金卡新注册为会员的数量" min-width="25%"> </el-table-column>
                <el-table-column prop="ordinary_card" label="准金卡由粉丝升级为普卡的数量" min-width="25%">
                </el-table-column>
                <el-table-column prop="silver_card" label="准金卡升级为银卡的数量" min-width="25%"> </el-table-column>
              </el-table>
              <el-pagination
                @size-change="ghandleSizeChange04"
                @current-change="ghandleCurrentChange04"
                border
                :current-page.sync="gpageNo04"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="gpageSize04"
                layout="sizes, prev, pager, next"
                :total="gmsgListData04.entityCount"
              >
              </el-pagination>
            </div>
          </div>
          <!--准银卡升级效果表格 END-->
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--准金银卡会员 结束-->

    <!--将达到准金银卡会员 开始-->
    <div class="vip-head-tool">
      <p class="template-brand"><i></i>将达到准金银卡会员</p>
      <div class="clear"></div>
    </div>

    <div>
      <el-tabs v-model="willbegoldtabs" type="card" @tab-click="handleClick">
        <el-tab-pane label="将达到银卡现状" name="1">
          <!--将达到银卡现状图表 START-->
          <div>
            <div class="block" style="float: left;margin-right: 20px;">
              <el-date-picker
                v-model="willbeGoldGraphSeachTime1"
                type="datetime"
                :editable="false"
                placeholder="选择时间范围"
                @change="wgStarTimeChange(willbeGoldGraphSeachTime1)"
                align="left"
              ></el-date-picker>
              <span style="margin:0 5px;">-</span>
              <el-date-picker
                v-model="willbeGoldGraphSeachTime2"
                type="datetime"
                :editable="false"
                placeholder="选择时间范围"
                @change="wgEndTimeChange(willbeGoldGraphSeachTime2)"
                align="left"
              ></el-date-picker>
            </div>
            <el-button
              type="primary"
              class="fl"
              @click="graphDateSeach(willbeGoldGraphSeachTime1, willbeGoldGraphSeachTime2)"
              >确定</el-button
            >
            <div class="clear"></div>
          </div>
          <chart-graph width="900px" height="300px" :data="dataQueryUrlTimeDistribgraph"></chart-graph>
          <!--将达到银卡现状图表 END-->
          <!--将达到银卡现状表格 START-->
          <div style="margin-top:-15px;">
            <div>
              <div class="block" style="float: left;margin-right: 20px;">
                <el-date-picker
                  v-model="willbeGoldTableSeachTime1"
                  type="datetime"
                  :editable="false"
                  placeholder="选择时间范围"
                  @change="wgTableStarTimeChange01(willbeGoldTableSeachTime1)"
                  align="left"
                ></el-date-picker>
                <span style="margin:0 5px;">-</span>
                <el-date-picker
                  v-model="willbeGoldTableSeachTime2"
                  type="datetime"
                  :editable="false"
                  placeholder="选择时间范围"
                  @change="wgTableEndTimeChange01(willbeGoldTableSeachTime2)"
                  align="left"
                ></el-date-picker>
              </div>
              <el-button
                type="primary"
                class="fl"
                @click="wgtableDateSeach01(willbeGoldTableSeachTime1, willbeGoldTableSeachTime2)"
                >确定</el-button
              >
              <div class="clear"></div>
            </div>
            <div style="margin-top:20px;">
              <el-table :data="wgmsgListData01.entities" style="width: 100%" height="202">
                <el-table-column prop="reserver1" label="时间" min-width="20%"> </el-table-column>
                <el-table-column prop="gold_silver_card" label="将达到银卡标准用户数" min-width="20%">
                </el-table-column>
                <el-table-column prop="transform_member" label="将达到银卡未注册的数量" min-width="20%">
                </el-table-column>
                <el-table-column prop="member" label="将达到银卡已注册粉丝数" min-width="20%"> </el-table-column>
                <el-table-column prop="ordinary_card" label="将达到银卡已成为普卡数" min-width="20%"> </el-table-column>
              </el-table>
              <el-pagination
                @size-change="wghandleSizeChange01"
                @current-change="wghandleCurrentChange01"
                border
                :current-page.sync="wgpageNo01"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="wgpageSize01"
                layout="sizes, prev, pager, next"
                :total="wgmsgListData01.entityCount"
              >
              </el-pagination>
            </div>
          </div>
          <!--将达到银卡现状表格 END-->
        </el-tab-pane>

        <el-tab-pane label="将达到金卡现状" name="2">
          <!--将达到金卡现状图表 START-->
          <div>
            <div class="block" style="float: left;margin-right: 20px;">
              <el-date-picker
                v-model="willbeGoldGraphSeachTime1"
                type="datetime"
                :editable="false"
                placeholder="选择时间范围"
                @change="wgStarTimeChange(willbeGoldGraphSeachTime1)"
                align="left"
              ></el-date-picker>
              <span style="margin:0 5px;">-</span>
              <el-date-picker
                v-model="willbeGoldGraphSeachTime2"
                type="datetime"
                :editable="false"
                placeholder="选择时间范围"
                @change="wgEndTimeChange(willbeGoldGraphSeachTime2)"
                align="left"
              ></el-date-picker>
            </div>
            <el-button
              type="primary"
              class="fl"
              @click="graphDateSeach(willbeGoldGraphSeachTime1, willbeGoldGraphSeachTime2)"
              >确定</el-button
            >
            <div class="clear"></div>
          </div>
          <chart-graph width="900px" height="300px" :data="dataQueryUrlTimeDistribgraph"></chart-graph>
          <!--将达到金卡现状图表 END-->
          <!--将达到金卡现状表格 START-->
          <div style="margin-top:-15px;">
            <div>
              <div class="block" style="float: left;margin-right: 20px;">
                <el-date-picker
                  v-model="willbeGoldTableSeachTime1"
                  type="datetime"
                  :editable="false"
                  placeholder="选择日期范围"
                  @change="wgTableStarTimeChange02(willbeGoldTableSeachTime1)"
                  align="left"
                >
                </el-date-picker>
                <span style="margin:0 5px;">-</span>
                <el-date-picker
                  v-model="willbeGoldTableSeachTime2"
                  type="datetime"
                  :editable="false"
                  placeholder="选择日期范围"
                  @change="wgTableEndTimeChange02(willbeGoldTableSeachTime2)"
                  align="left"
                >
                </el-date-picker>
              </div>
              <el-button
                type="primary"
                class="fl"
                @click="wgtableDateSeach02(willbeGoldTableSeachTime1, willbeGoldTableSeachTime2)"
                >确定</el-button
              >
              <div class="clear"></div>
            </div>
            <div style="margin-top:20px;">
              <el-table :data="wgmsgListData02.entities" style="width: 100%" height="202">
                <el-table-column prop="reserver1" label="时间"> </el-table-column>
                <el-table-column prop="gold_silver_card" label="将达到金卡标准用户数"> </el-table-column>
                <el-table-column prop="transform_member" label="将达到金卡未注册的数量"> </el-table-column>
                <el-table-column prop="member" label="将达到金卡已注册粉丝数"> </el-table-column>
                <el-table-column prop="ordinary_card" label="将达到金卡已成为普卡／银卡数"> </el-table-column>
              </el-table>
              <el-pagination
                @size-change="wghandleSizeChange02"
                @current-change="wghandleCurrentChange02"
                border
                :current-page.sync="wgpageNo02"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="wgpageSize02"
                layout="sizes, prev, pager, next"
                :total="wgmsgListData02.entityCount"
              >
              </el-pagination>
            </div>
          </div>
          <!--将达到金卡现状表格 END-->
        </el-tab-pane>

        <el-tab-pane label="将达到银卡升级效果" name="3">
          <!--将达到银卡升级效果图表 START-->
          <div>
            <div class="block" style="float: left;margin-right: 20px;">
              <el-date-picker
                v-model="willbeGoldGraphSeachTime1"
                type="datetime"
                :editable="false"
                placeholder="选择时间范围"
                @change="wgStarTimeChange(willbeGoldGraphSeachTime1)"
                align="left"
              ></el-date-picker>
              <span style="margin:0 5px;">-</span>
              <el-date-picker
                v-model="willbeGoldGraphSeachTime2"
                type="datetime"
                :editable="false"
                placeholder="选择时间范围"
                @change="wgEndTimeChange(willbeGoldGraphSeachTime2)"
                align="left"
              ></el-date-picker>
            </div>
            <el-button
              type="primary"
              class="fl"
              @click="graphDateSeach(willbeGoldGraphSeachTime1, willbeGoldGraphSeachTime2)"
              >确定</el-button
            >
            <div class="clear"></div>
          </div>
          <chart-graph width="900px" height="300px" :data="dataQueryUrlTimeDistribgraph"></chart-graph>
          <!--将达到银卡升级效果图表 END-->
          <!--将达到银卡升级效果表格 START-->
          <div style="margin-top:-15px;">
            <div>
              <div class="block" style="float: left;margin-right: 20px;">
                <el-date-picker
                  v-model="willbeGoldTableSeachTime1"
                  type="datetime"
                  :editable="false"
                  placeholder="选择日期范围"
                  @change="wgTableStarTimeChange03(willbeGoldTableSeachTime1)"
                  align="left"
                >
                </el-date-picker>
                <span style="margin:0 5px;">-</span>
                <el-date-picker
                  v-model="willbeGoldTableSeachTime2"
                  type="datetime"
                  :editable="false"
                  placeholder="选择日期范围"
                  @change="wgTableEndTimeChange03(willbeGoldTableSeachTime2)"
                  align="left"
                >
                </el-date-picker>
              </div>
              <el-button
                type="primary"
                class="fl"
                @click="wgtableDateSeach03(willbeGoldTableSeachTime1, willbeGoldTableSeachTime2)"
                >确定</el-button
              >
              <div class="clear"></div>
            </div>
            <div style="margin-top:20px;">
              <el-table :data="wgmsgListData03.entities" style="width: 100%" height="202">
                <el-table-column prop="reserver1" label="时间" min-width="25%"> </el-table-column>
                <el-table-column prop="member" label="将达到银卡新注册为会员的数量" min-width="25%"> </el-table-column>
                <el-table-column prop="ordinary_card" label="将达到准银卡由粉丝升级为普卡的数量" min-width="25%">
                </el-table-column>
                <el-table-column prop="silver_card" label="将达到准银卡升级为银卡的数量" min-width="25%">
                </el-table-column>
              </el-table>
              <el-pagination
                @size-change="wghandleSizeChange03"
                @current-change="wghandleCurrentChange03"
                border
                :current-page.sync="wgpageNo03"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="wgpageSize03"
                layout="sizes, prev, pager, next"
                :total="wgmsgListData03.entityCount"
              >
              </el-pagination>
            </div>
          </div>
          <!--将达到银卡升级效果表格 END-->
        </el-tab-pane>

        <el-tab-pane label="将达到金卡升级效果" name="4">
          <!--将达到金卡升级效果图表 START-->
          <div>
            <div class="block" style="float: left;margin-right: 20px;">
              <el-date-picker
                v-model="willbeGoldGraphSeachTime1"
                type="datetime"
                :editable="false"
                placeholder="选择时间范围"
                @change="wgStarTimeChange(willbeGoldGraphSeachTime1)"
                align="left"
              ></el-date-picker>
              <span style="margin:0 5px;">-</span>
              <el-date-picker
                v-model="willbeGoldGraphSeachTime2"
                type="datetime"
                :editable="false"
                placeholder="选择时间范围"
                @change="wgEndTimeChange(willbeGoldGraphSeachTime2)"
                align="left"
              ></el-date-picker>
            </div>
            <el-button
              type="primary"
              class="fl"
              @click="graphDateSeach(willbeGoldGraphSeachTime1, willbeGoldGraphSeachTime2)"
              >确定</el-button
            >
            <div class="clear"></div>
          </div>
          <chart-graph width="900px" height="300px" :data="dataQueryUrlTimeDistribgraph"></chart-graph>
          <!--将达到金卡升级效果图表 END-->
          <!--将达到金卡升级效果表格 START-->
          <div style="margin-top:-15px;">
            <div>
              <div class="block" style="float: left;margin-right: 20px;">
                <el-date-picker
                  v-model="willbeGoldTableSeachTime1"
                  type="datetime"
                  :editable="false"
                  placeholder="选择日期范围"
                  @change="wgTableStarTimeChange04(willbeGoldTableSeachTime1)"
                  align="left"
                >
                </el-date-picker>
                <span style="margin:0 5px;">-</span>
                <el-date-picker
                  v-model="willbeGoldTableSeachTime2"
                  type="datetime"
                  :editable="false"
                  placeholder="选择日期范围"
                  @change="wgTableEndTimeChange04(willbeGoldTableSeachTime2)"
                  align="left"
                >
                </el-date-picker>
              </div>
              <el-button
                type="primary"
                class="fl"
                @click="wgtableDateSeach04(willbeGoldTableSeachTime1, willbeGoldTableSeachTime2)"
                >确定</el-button
              >
              <div class="clear"></div>
            </div>
            <div style="margin-top:20px;">
              <el-table :data="wgmsgListData04.entities" style="width: 100%" height="202">
                <el-table-column prop="reserver1" label="时间" min-width="20%"> </el-table-column>
                <el-table-column prop="member" label="将达到准金卡新注册为会员的数量" min-width="25%">
                </el-table-column>
                <el-table-column prop="ordinary_card" label="将达到准金卡由粉丝升级为普卡的数量" min-width="25%">
                </el-table-column>
                <el-table-column prop="silver_card" label="将达到准金卡升级为银卡的数量" min-width="25%">
                </el-table-column>
              </el-table>
              <el-pagination
                @size-change="wghandleSizeChange04"
                @current-change="wghandleCurrentChange04"
                border
                :current-page.sync="wgpageNo04"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="wgpageSize04"
                layout="sizes, prev, pager, next"
                :total="wgmsgListData04.entityCount"
              >
              </el-pagination>
            </div>
          </div>
          <!--将达到金卡升级效果表格 END-->
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--将达到准金银卡会员 结束-->
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import chartLine from './components/chart.line.vue';
import chartGraph from './components/chart.graph.vue';
import gUtils from '../../utils/gUtils.js';

export default {
  computed: {
    ...mapGetters({
      getUserInfo: 'getUserInfo'
    })
  },
  components: {
    chartLine,
    chartGraph
  },
  data() {
    return {
      vipCostTabs: '1',
      willbegoldtabs: '1',
      goldtabs: '1',

      statisticsNumDataSeachTime1: [],
      statisticsNumDataSeachTime2: [],
      statisticsNumData: [],
      statisticsNumDataPageNo: 1,
      statisticsNumDataPageSize: 10,
      statisticsNumDataLoading: false,

      dataQueryUrlTimeDistrib: [],
      dataQueryUrlTimeDistribVipCont: [],
      dataQueryUrlTimeDistribgraph: [],
      dataQueryUrlTimeDistribgraph01: [],

      vipCostMsgListData01: [],
      vipCostMsgListData02: [],
      vipCostMsgListData03: [],

      wgmsgListData01: [],
      wgmsgListData02: [],
      wgmsgListData03: [],
      wgmsgListData04: [],

      gmsgListData01: [],
      gmsgListData02: [],
      gmsgListData03: [],
      gmsgListData04: [],

      vipCostLineStartTime: [],
      vipCostLineEndTime: [],
      vipCostLineStartTimeChick: [],
      vipCostLineEndTimeChick: [],

      vipCostTableStartTime01: [],
      vipCostTableEndTime01: [],
      vipCostTableStartTime02: [],
      vipCostTableEndTime02: [],
      vipCostTableStartTime03: [],
      vipCostTableEndTime03: [],

      vipContLineTime: [],
      vipContLineSilver: [],
      vipContLineLvlUp: [],
      vipContLinePink: [],
      vipContLineNor: [],
      vipContLineSil: [],
      vipContLineGold: [],
      maxyNum: [],

      graphTime: [],
      graphSj01: [],
      graphSj02: [],
      graphSj03: [],
      graphSj04: [],
      graphSj05: [],
      graphSj06: [],
      graphSj07: [],

      graphStartTime: [],
      graphEndTime: [],
      graphStartTimeChick: [],
      graphEndTimeChick: [],

      graphTime01: [],
      goldgraphSj01: [],
      goldgraphSj02: [],
      goldgraphSj03: [],
      goldgraphSj04: [],
      goldgraphSj05: [],
      goldgraphSj06: [],
      goldgraphSj07: [],
      goldgraphSj08: [],

      goldgraphStartTime: [],
      goldgraphEndTime: [],
      goldgraphStartTimeChick: [],
      goldgraphEndTimeChick: [],

      wgtableStartTime01: [],
      wgtableEndTime01: [],
      wgtableStartTime02: [],
      wgtableEndTime02: [],
      wgtableStartTime03: [],
      wgtableEndTime03: [],
      wgtableStartTime04: [],
      wgtableEndTime04: [],

      gtableStartTime01: [],
      gtableEndTime01: [],
      gtableStartTime02: [],
      gtableEndTime02: [],
      gtableStartTime03: [],
      gtableEndTime03: [],
      gtableStartTime04: [],
      gtableEndTime04: [],

      tabtype: '',
      tabletabId: '',
      startDate: '',
      endDate: '',

      vipCostMsgListLoading01: false,
      vipCostMsgListLoading02: false,
      vipCostMsgListLoading03: false,

      wgmsgListLoading01: false,
      wgmsgListLoading02: false,
      wgmsgListLoading03: false,
      wgmsgListLoading04: false,

      gmsgListLoading01: false,
      gmsgListLoading02: false,
      gmsgListLoading03: false,
      gmsgListLoading04: false,

      pageNo: 1,
      wgpageNo01: 1,
      wgpageNo02: 1,
      wgpageNo03: 1,
      wgpageNo04: 1,

      gpageNo01: 1,
      gpageNo02: 1,
      gpageNo03: 1,
      gpageNo04: 1,

      vpageNo01: 1,
      vpageNo02: 1,
      vpageNo03: 1,

      pageSize: 10,
      wgpageSize01: 10,
      wgpageSize02: 10,
      wgpageSize03: 10,
      wgpageSize04: 10,

      gpageSize01: 10,
      gpageSize02: 10,
      gpageSize03: 10,
      gpageSize04: 10,

      vpageSize01: 10,
      vpageSize02: 10,
      vpageSize03: 10,

      vipCostlineSeachTime1: [], // [new Date(2000, 10, 10), new Date(2000, 10, 11)],
      vipCostlineSeachTime2: [], // [new Date(2000, 10, 10), new Date(2000, 10, 11)],
      vipCostTableSeachTime1: [],
      vipCostTableSeachTime2: [],

      // 准金银卡会员日期搜索
      GoldGraphSeachTime1: [],
      GoldGraphSeachTime2: [],
      GoldTableSeachTime1: [],
      GoldTableSeachTime2: [],

      // 将达到准金银卡会员日期搜索
      willbeGoldGraphSeachTime1: [],
      willbeGoldGraphSeachTime2: [],
      willbeGoldTableSeachTime1: [],
      willbeGoldTableSeachTime2: [],

      starTime: [],
      endTime: [],
      pickerBeginDateBefore: {
        disabledDate: (time) => {
          const beginDateVal = Date.parse(new Date()) - 3600 * 1000 * 24 * 1;
          if (beginDateVal) {
            return time.getTime() > beginDateVal;
          }
        }
      },
      memberFunnelData: {
        104: '— —',
        103: '— —',
        102: '— —',
        204: '— —',
        203: '— —',
        202: '— —'
      },
      count: {
        104: '— —',
        103: '— —',
        102: '— —',
        204: '— —',
        203: '— —',
        202: '— —'
      },
      oldCount: {
        104: '— —',
        103: '— —',
        102: '— —',
        204: '— —',
        203: '— —',
        202: '— —'
      }
    };
  },
  filters: {},

  methods: {
    // 将达到准金银卡会员tab切换方法
    handleClick(tab, event) {
      console.log(tab, event);
      if (this.willbegoldtabs == 1) {
        this.wglistSearch01();
      }
      if (this.willbegoldtabs == 2) {
        this.wglistSearch02();
      }
      if (this.willbegoldtabs == 3) {
        this.wglistSearch03();
      }
      if (this.willbegoldtabs == 4) {
        this.wglistSearch04();
      }
      this.graphData();
    },

    // 准金银卡会员tab切换方法
    ghandleClick(tab, event) {
      console.log(tab, event);
      if (this.goldtabs == 1) {
        this.glistSearch01();
      }
      if (this.goldtabs == 2) {
        this.glistSearch02();
      }
      if (this.goldtabs == 3) {
        this.glistSearch03();
      }
      if (this.goldtabs == 4) {
        this.glistSearch04();
      }
      this.graphData01();
    },
    // 会员价值tab切换方法
    vipCostHandleClick(tab, event) {
      console.log(tab, event);

      if (this.vipCostTabs == 1) {
        this.vipCostListSearch01();
      }
      if (this.vipCostTabs == 2) {
        this.vipCostListSearch02();
      }
      if (this.vipCostTabs == 3) {
        this.vipCostListSearch03();
      }
      this.vipCostLineData();
    },

    vipStarTimeChange(data) {
      this.vipCostLineStartTime = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      if (this.vipCostLineStartTime >= this.vipCostLineEndTime) {
        this.$message({
          type: 'info',
          message: '查询开始日期不能大于或等于结束日期'
        });
        this.vipCostlineSeachTime1 = [new Date(this.starTime)];
      }
    },
    vipEndTimeChange(data) {
      this.vipCostLineEndTime = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      if (this.vipCostLineStartTime >= this.vipCostLineEndTime) {
        this.$message({
          type: 'info',
          message: '查询结束日期不能小于或等于开始日期'
        });
        this.vipCostlineSeachTime2 = [new Date(this.endTime)];
      }
    },

    // 会员价值线图日期查询
    vipCostLineDateSeach(data, data1) {
      this.vipCostLineStartTime = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      this.vipCostLineEndTime = gUtils.dateFormat(Date.parse(data1), 'yyyy-MM-dd');
      this.vipCostLineStartTimeChick = Date.parse(data);
      this.vipCostLineEndTimeChick = Date.parse(data1) - 3600 * 1000 * 24 * 30;
      if (this.vipCostLineStartTimeChick <= this.vipCostLineEndTimeChick) {
        this.$message({
          type: 'info',
          message: '查询区间不能超过30天'
        });
      } else {
        this.vipCostLineData();
      }
    },

    // 会员价值线图数据
    vipCostLineData() {
      const self = this;
      const data = {
        startDate: self.vipCostLineStartTime,
        endDate: self.vipCostLineEndTime,
        tabId: self.vipCostTabs
      };

      if (self.vipCostTabs == 1) {
        this.requestReport.getVipCostlineData(data).then((data) => {
          self.vipContLineTime = [];
          self.vipContLineSilver = [];
          self.vipContLineLvlUp = [];
          self.vipContLinePink = [];
          self.vipContLineNor = [];
          self.vipContLineSil = [];
          self.vipContLineGold = [];
          for (let i = 0; i < data.length; i++) {
            self.vipContLineTime.push(gUtils.dateFormat(data[i].countDate, 'yyyy-MM-dd'));
            self.vipContLineSilver.push(data[i].totalNum);
            //                        self.vipContLineLvlUp.push(data[i].totalNum)
            //                        self.vipContLinePink.push(data[i].countNum1)
            //                        self.vipContLineNor.push(data[i].countNum2)
            //                        self.vipContLineSil.push(data[i].countNum3)
            //                        self.vipContLineGold.push(data[i].countNum4)
          }
          // console.log(self.vipContLineLvlUp)

          setTimeout(function () {
            // 线图数据
            self.dataQueryUrlTimeDistribVipCont = {
              date: self.vipContLineTime, // [1,3,4,6,7,8], // x轴时间
              leg: ['银卡以上会员数'],
              data: [
                // 1,3,4,6,7,8]
                {
                  name: '银卡以上会员数',
                  type: 'line',
                  areaStyle: self.isArea,
                  smooth: true,
                  data: self.vipContLineSilver // [1,3,4,6,7,8]
                },
                {
                  name: '升级会员数',
                  type: 'line',
                  areaStyle: this.isArea,
                  smooth: true,
                  data: [] // self.vipContLineLvlUp
                },
                {
                  name: '升级粉丝数',
                  type: 'line',
                  areaStyle: this.isArea,
                  smooth: true,
                  data: [] // self.vipContLinePink
                },
                {
                  name: '升级普卡数',
                  type: 'line',
                  areaStyle: this.isArea,
                  smooth: true,
                  data: [] // self.vipContLineNor
                },
                {
                  name: '升级银卡数',
                  type: 'line',
                  areaStyle: this.isArea,
                  smooth: true,
                  data: [] // self.vipContLineSil
                },
                {
                  name: '升级金卡数',
                  type: 'line',
                  areaStyle: this.isArea,
                  smooth: true,
                  data: [] // self.vipContLineGold
                }
              ] // 数据
            };
          }, 1000);
        });
      }
      if (self.vipCostTabs == 2) {
        this.requestReport.getVipCostlineData(data).then((data) => {
          self.vipContLineTime = [];
          self.vipContLineSilver = [];
          self.vipContLineLvlUp = [];
          self.vipContLinePink = [];
          self.vipContLineNor = [];
          self.vipContLineSil = [];
          self.vipContLineGold = [];
          for (let i = 0; i < data.length; i++) {
            self.vipContLineTime.push(gUtils.dateFormat(data[i].countDate, 'yyyy-MM-dd'));
            //                        self.vipContLineSilver.push(data[i].totalNum)
            self.vipContLineLvlUp.push(data[i].totalNum);
            //                        self.vipContLinePink.push(data[i].countNum1)
            //                        self.vipContLineNor.push(data[i].countNum2)
            //                        self.vipContLineSil.push(data[i].countNum3)
            //                        self.vipContLineGold.push(data[i].countNum4)
          }
          // console.log(self.vipContLineLvlUp)

          setTimeout(function () {
            // 线图数据
            self.dataQueryUrlTimeDistribVipCont = {
              date: self.vipContLineTime, // [1,3,4,6,7,8], // x轴时间
              leg: ['升级会员数'],
              data: [
                // 1,3,4,6,7,8]
                {
                  name: '银卡以上会员数',
                  type: 'line',
                  areaStyle: self.isArea,
                  smooth: true,
                  data: [] // self.vipContLineSilver
                },
                {
                  name: '升级会员数',
                  type: 'line',
                  areaStyle: this.isArea,
                  smooth: true,
                  data: self.vipContLineLvlUp // [10,30,40,60,70,80]
                },
                {
                  name: '升级粉丝数',
                  type: 'line',
                  areaStyle: this.isArea,
                  smooth: true,
                  data: [] // self.vipContLinePink
                },
                {
                  name: '升级普卡数',
                  type: 'line',
                  areaStyle: this.isArea,
                  smooth: true,
                  data: [] // self.vipContLineNor
                },
                {
                  name: '升级银卡数',
                  type: 'line',
                  areaStyle: this.isArea,
                  smooth: true,
                  data: [] // self.vipContLineSil
                },
                {
                  name: '升级金卡数',
                  type: 'line',
                  areaStyle: this.isArea,
                  smooth: true,
                  data: [] // self.vipContLineGold
                }
              ] // 数据
            };
          }, 1000);
        });
      }
      if (self.vipCostTabs == 3) {
        this.requestReport.getVipCostlineData(data).then((data) => {
          self.vipContLineTime = [];
          self.vipContLineSilver = [];
          self.vipContLineLvlUp = [];
          self.vipContLinePink = [];
          self.vipContLineNor = [];
          self.vipContLineSil = [];
          self.vipContLineGold = [];
          self.maxyNum = [];
          for (let i = 0; i < data.length; i++) {
            self.vipContLineTime.push(gUtils.dateFormat(data[i].countDate, 'yyyy-MM-dd'));
            //                        self.vipContLineSilver.push(data[i].totalNum)
            //                        self.vipContLineLvlUp.push(data[i].totalNum)
            self.vipContLinePink.push(data[i].countNum1);
            self.vipContLineNor.push(data[i].countNum2);
            self.vipContLineSil.push(data[i].countNum3);
            self.vipContLineGold.push(data[i].countNum4);
            // self.newNum = data[i].countNum3
            self.maxyNum = Math.ceil(Math.max.apply(null, self.vipContLineSil) / 10000) * 10000;

            // console.log(self.maxyNum)
          }

          setTimeout(function () {
            // 线图数据
            self.dataQueryUrlTimeDistribVipCont = {
              date: self.vipContLineTime, // [1,3,4,6,7,8], // x轴时间
              leg: ['升级粉丝数', '升级普卡数', '升级银卡数', '升级金卡数'],
              maxY: self.maxyNum, // ['150000'],
              data: [
                // 1,3,4,6,7,8]
                {
                  name: '银卡以上会员数',
                  type: 'line',
                  areaStyle: self.isArea,
                  smooth: true,
                  data: [] // self.vipContLineSilver
                },
                {
                  name: '升级会员数',
                  type: 'line',
                  areaStyle: this.isArea,
                  smooth: true,
                  data: [] // self.vipContLineLvlUp
                },
                {
                  name: '升级粉丝数',
                  type: 'line',
                  areaStyle: this.isArea,
                  smooth: true,
                  data: self.vipContLinePink // [6,10,20,30,40,50]
                },
                {
                  name: '升级普卡数',
                  type: 'line',
                  areaStyle: this.isArea,
                  smooth: true,
                  data: self.vipContLineNor // [20,10,30,50,60,70]
                },
                {
                  name: '升级银卡数',
                  type: 'line',
                  areaStyle: this.isArea,
                  yAxisIndex: 1,
                  smooth: true,
                  data: self.vipContLineSil // [2,1,3,5,6,7]
                },
                {
                  name: '升级金卡数',
                  type: 'line',
                  areaStyle: this.isArea,
                  smooth: true,
                  data: self.vipContLineGold // [10,40,60,20,30,10]
                }
              ] // 数据
            };
          }, 1000);
        });
      }
    },

    gStarTimeChange(data) {
      this.goldgraphStartTime = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      if (this.goldgraphStartTime >= this.goldgraphEndTime) {
        this.$message({
          type: 'info',
          message: '查询开始日期不能大于或等于结束日期'
        });
        this.GoldGraphSeachTime1 = [new Date(this.starTime)];
      }
    },
    gEndTimeChange(data) {
      this.goldgraphEndTime = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      if (this.goldgraphStartTime >= this.goldgraphEndTime) {
        this.$message({
          type: 'info',
          message: '查询结束日期不能小于或等于开始日期'
        });
        this.GoldGraphSeachTime2 = [new Date(this.endTime)];
      }
    },
    // 准银卡现状柱状图日期查询
    goldGraphDateSeach(data, data1) {
      this.goldgraphStartTime = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      this.goldgraphEndTime = gUtils.dateFormat(Date.parse(data1), 'yyyy-MM-dd');
      this.goldgraphStartTimeChick = Date.parse(data);
      this.goldgraphEndTimeChick = Date.parse(data1) - 3600 * 1000 * 24 * 30;
      if (this.goldgraphStartTimeChick <= this.goldgraphEndTimeChick) {
        this.$message({
          type: 'info',
          message: '查询区间不能超过30天'
        });
      } else {
        this.graphData01();
      }
    },

    // 准银卡现状柱状图数据
    graphData01() {
      const self = this;
      const data = {
        startDate: self.goldgraphStartTime,
        endDate: self.goldgraphEndTime,
        type: 1,
        tabId: self.goldtabs
      };
      if (self.goldtabs == 1) {
        this.requestReport.getMapData(data).then((data) => {
          self.graphTime01 = [];
          self.goldgraphSj01 = [];
          self.goldgraphSj02 = [];
          self.goldgraphSj03 = [];
          self.goldgraphSj04 = [];
          self.goldgraphSj05 = [];
          self.goldgraphSj06 = [];
          self.goldgraphSj07 = [];
          self.goldgraphSj08 = [];
          for (let i = 0; i < data.length; i++) {
            self.graphTime01.push(data[i].reserver1);
            self.goldgraphSj01.push(data[i].gold_silver_card);
            self.goldgraphSj02.push(data[i].transform_silver);
            self.goldgraphSj03.push(data[i].transform_member);
            self.goldgraphSj04.push(data[i].member);
            self.goldgraphSj05.push(data[i].ordinary_card);
          }

          setTimeout(() => {
            // 柱状图数据
            self.dataQueryUrlTimeDistribgraph01 = {
              date: self.graphTime01, // x轴时间
              leg: [
                '达到银卡标准用户数',
                '待升级准银卡数',
                '准银卡未注册的数量',
                '准银卡已注册粉丝数',
                '准银卡已成为普卡数'
              ],

              data: [
                {
                  name: '达到银卡标准用户数',
                  type: 'bar',
                  barWidth: 5,
                  stack: '数据',
                  data: self.goldgraphSj01
                },
                {
                  name: '待升级准银卡数',
                  type: 'bar',
                  stack: '数据',
                  data: self.goldgraphSj02
                },
                {
                  name: '准银卡未注册的数量',
                  type: 'bar',
                  stack: '数据',
                  data: self.goldgraphSj03
                },
                {
                  name: '准银卡已注册粉丝数',
                  type: 'bar',
                  stack: '数据',
                  data: self.goldgraphSj04
                },
                {
                  name: '准银卡已成为普卡数',
                  type: 'bar',
                  stack: '数据',
                  data: self.goldgraphSj05
                },
                {
                  name: '准银卡升级为银卡的数量',
                  type: 'bar',
                  stack: '数据',
                  data: []
                },
                {
                  name: '准银卡由粉丝升级为普卡的数量',
                  type: 'bar',
                  stack: '数据',
                  data: []
                },
                {
                  name: '准银卡新注册为会员的数量',
                  type: 'bar',
                  stack: '数据',
                  data: []
                }
              ] // 数据
            };
          }, 1000);
        });
      }
      if (self.goldtabs == 2) {
        this.requestReport.getMapData(data).then((data) => {
          self.graphTime01 = [];
          self.goldgraphSj01 = [];
          self.goldgraphSj02 = [];
          self.goldgraphSj03 = [];
          self.goldgraphSj04 = [];
          self.goldgraphSj05 = [];
          self.goldgraphSj06 = [];
          self.goldgraphSj07 = [];
          self.goldgraphSj08 = [];
          for (let i = 0; i < data.length; i++) {
            self.graphTime01.push(data[i].reserver1);
            self.goldgraphSj01.push(data[i].gold_silver_card);
            self.goldgraphSj02.push(data[i].transform_silver);
            self.goldgraphSj03.push(data[i].transform_member);
            self.goldgraphSj04.push(data[i].member);
            self.goldgraphSj05.push(data[i].ordinary_card);
          }

          setTimeout(() => {
            // 柱状图数据
            self.dataQueryUrlTimeDistribgraph01 = {
              date: self.graphTime01, // x轴时间
              leg: [
                '达到金卡标准用户数',
                '待升级准金卡数',
                '准金卡未注册的数量',
                '准金卡已注册粉丝数',
                '准金卡已成为普卡／银卡数'
              ],

              data: [
                {
                  name: '达到金卡标准用户数',
                  type: 'bar',
                  stack: '数据',
                  data: self.goldgraphSj01
                },
                {
                  name: '待升级准金卡数',
                  type: 'bar',
                  stack: '数据',
                  data: self.goldgraphSj02
                },
                {
                  name: '准金卡未注册的数量',
                  type: 'bar',
                  stack: '数据',
                  data: self.goldgraphSj03
                },
                {
                  name: '准金卡已注册粉丝数',
                  type: 'bar',
                  stack: '数据',
                  data: self.goldgraphSj04
                },
                {
                  name: '准金卡已成为普卡／银卡数',
                  type: 'bar',
                  barWidth: 5,
                  stack: '数据',
                  data: self.goldgraphSj05
                },
                {
                  name: '准金卡升级为银卡的数量',
                  type: 'bar',
                  stack: '数据',
                  data: []
                },
                {
                  name: '准金卡由粉丝升级为普卡的数量',
                  type: 'bar',
                  stack: '数据',
                  data: []
                },
                {
                  name: '准金卡新注册为会员的数量',
                  type: 'bar',
                  stack: '数据',
                  data: []
                }
              ] // 数据
            };
          }, 1000);
        });
      }
      if (self.goldtabs == 3) {
        this.requestReport.getMapData(data).then((data) => {
          self.graphTime01 = [];
          self.goldgraphSj01 = [];
          self.goldgraphSj02 = [];
          self.goldgraphSj03 = [];
          self.goldgraphSj04 = [];
          self.goldgraphSj05 = [];
          self.goldgraphSj06 = [];
          self.goldgraphSj07 = [];
          self.goldgraphSj08 = [];

          for (let i = 0; i < data.length; i++) {
            self.graphTime01.push(data[i].reserver1);
            self.goldgraphSj06.push(data[i].member);
            self.goldgraphSj07.push(data[i].ordinary_card);
            self.goldgraphSj08.push(data[i].silver_card);
          }

          setTimeout(() => {
            // 柱状图数据
            self.dataQueryUrlTimeDistribgraph01 = {
              date: self.graphTime01, // x轴时间
              leg: ['准银卡新注册为会员的数量', '准银卡由粉丝升级为普卡的数量', '准银卡升级为银卡的数量'],

              data: [
                {
                  name: '达到银卡标准用户数',
                  type: 'bar',
                  stack: '数据',
                  data: []
                },
                {
                  name: '待升级准银卡数',
                  type: 'bar',
                  stack: '数据',
                  data: []
                },
                {
                  name: '准银卡未注册的数量',
                  type: 'bar',
                  stack: '数据',
                  data: []
                },
                {
                  name: '准银卡已注册粉丝数',
                  type: 'bar',
                  stack: '数据',
                  data: []
                },
                {
                  name: '准银卡已成为普卡数',
                  type: 'bar',
                  stack: '数据',
                  data: []
                },
                {
                  name: '准银卡升级为银卡的数量',
                  type: 'bar',
                  stack: '数据',
                  barWidth: 5,
                  data: self.goldgraphSj08
                },
                {
                  name: '准银卡由粉丝升级为普卡的数量',
                  type: 'bar',
                  stack: '数据',
                  data: self.goldgraphSj07
                },
                {
                  name: '准银卡新注册为会员的数量',
                  type: 'bar',
                  stack: '数据',
                  data: self.goldgraphSj06
                }
              ] // 数据
            };
          }, 1000);
        });
      }
      if (self.goldtabs == 4) {
        this.requestReport.getMapData(data).then((data) => {
          self.graphTime01 = [];
          self.goldgraphSj01 = [];
          self.goldgraphSj02 = [];
          self.goldgraphSj03 = [];
          self.goldgraphSj04 = [];
          self.goldgraphSj05 = [];
          self.goldgraphSj06 = [];
          self.goldgraphSj07 = [];
          self.goldgraphSj08 = [];

          for (let i = 0; i < data.length; i++) {
            self.graphTime01.push(data[i].reserver1);
            self.goldgraphSj06.push(data[i].member);
            self.goldgraphSj07.push(data[i].ordinary_card);
            self.goldgraphSj08.push(data[i].silver_card);
          }

          setTimeout(() => {
            // 柱状图数据
            self.dataQueryUrlTimeDistribgraph01 = {
              date: self.graphTime01, // x轴时间
              leg: ['准金卡新注册为会员的数量', '准金卡由粉丝升级为普卡的数量', '准金卡升级为银卡的数量'],

              data: [
                {
                  name: '达到金卡标准用户数',
                  type: 'bar',
                  stack: '数据',
                  data: []
                },
                {
                  name: '待升级准金卡数',
                  type: 'bar',
                  stack: '数据',
                  data: []
                },
                {
                  name: '准金卡未注册的数量',
                  type: 'bar',
                  stack: '数据',
                  data: []
                },
                {
                  name: '准金卡已注册粉丝数',
                  type: 'bar',
                  stack: '数据',
                  data: []
                },
                {
                  name: '准金卡已成为普卡／银卡数',
                  type: 'bar',
                  stack: '数据',
                  data: []
                },
                {
                  name: '准金卡升级为银卡的数量',
                  type: 'bar',
                  barWidth: 5,
                  stack: '数据',
                  data: self.goldgraphSj08
                },
                {
                  name: '准金卡由粉丝升级为普卡的数量',
                  type: 'bar',
                  stack: '数据',
                  data: self.goldgraphSj07
                },
                {
                  name: '准金卡新注册为会员的数量',
                  type: 'bar',
                  stack: '数据',
                  data: self.goldgraphSj06
                }
              ] // 数据
            };
          }, 1000);
        });
      }
    },

    wgStarTimeChange(data) {
      this.graphStartTime = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      if (this.graphStartTime >= this.graphEndTime) {
        this.$message({
          type: 'info',
          message: '查询开始日期不能大于或等于结束日期'
        });
        this.willbeGoldGraphSeachTime1 = [new Date(this.starTime)];
      }
    },
    wgEndTimeChange(data) {
      this.graphEndTime = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      if (this.graphStartTime >= this.graphEndTime) {
        this.$message({
          type: 'info',
          message: '查询结束日期不能小于或等于开始日期'
        });
        this.willbeGoldGraphSeachTime2 = [new Date(this.endTime)];
      }
    },
    // 将达到银卡现状柱状图日期查询
    graphDateSeach(data, data1) {
      this.graphStartTime = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      this.graphEndTime = gUtils.dateFormat(Date.parse(data1), 'yyyy-MM-dd');
      this.graphStartTimeChick = Date.parse(data);
      this.graphEndTimeChick = Date.parse(data1) - 3600 * 1000 * 24 * 30;
      if (this.graphStartTimeChick <= this.graphEndTimeChick) {
        this.$message({
          type: 'info',
          message: '查询区间不能超过30天'
        });
      } else {
        this.graphData();
      }
    },

    // 将达到银卡现状柱状图数据
    graphData() {
      const self = this;
      const data = {
        startDate: self.graphStartTime,
        endDate: self.graphEndTime,
        type: 2,
        tabId: self.willbegoldtabs
      };
      if (self.willbegoldtabs == 1) {
        this.requestReport.getMapData(data).then((data) => {
          self.graphTime = [];
          self.graphSj01 = [];
          self.graphSj02 = [];
          self.graphSj03 = [];
          self.graphSj04 = [];
          self.graphSj05 = [];
          self.graphSj06 = [];
          self.graphSj07 = [];
          for (let i = 0; i < data.length; i++) {
            self.graphTime.push(data[i].reserver1);
            self.graphSj01.push(data[i].gold_silver_card);
            self.graphSj02.push(data[i].transform_member);
            self.graphSj03.push(data[i].member);
            self.graphSj04.push(data[i].ordinary_card);
          }

          setTimeout(() => {
            // 柱状图数据
            self.dataQueryUrlTimeDistribgraph = {
              date: self.graphTime, // x轴时间
              leg: [
                '将达到银卡标准用户数',
                '将达到银卡未注册的数量',
                '将达到银卡已注册粉丝数',
                '将达到银卡已成为普卡数'
              ],

              data: [
                {
                  name: '将达到银卡标准用户数',
                  type: 'bar',
                  stack: '数据',
                  data: self.graphSj01
                },
                {
                  name: '将达到银卡未注册的数量',
                  type: 'bar',
                  stack: '数据',
                  data: self.graphSj02
                },
                {
                  name: '将达到银卡已注册粉丝数',
                  type: 'bar',
                  barWidth: 5,
                  stack: '数据',
                  data: self.graphSj03
                },
                {
                  name: '将达到银卡已成为普卡数',
                  type: 'bar',
                  stack: '数据',
                  data: self.graphSj04
                },
                {
                  name: '将达到银卡新注册为会员的数量',
                  type: 'bar',
                  stack: '数据',
                  data: []
                },
                {
                  name: '将达到准银卡由粉丝升级为普卡的数量',
                  type: 'bar',
                  stack: '数据',
                  data: []
                },
                {
                  name: '将达到准银卡升级为银卡的数量',
                  type: 'bar',
                  stack: '数据',
                  data: []
                }
              ] // 数据
            };
          }, 1000);
        });
      }
      if (self.willbegoldtabs == 2) {
        this.requestReport.getMapData(data).then((data) => {
          self.graphTime = [];
          self.graphSj01 = [];
          self.graphSj02 = [];
          self.graphSj03 = [];
          self.graphSj04 = [];
          self.graphSj05 = [];
          self.graphSj06 = [];
          self.graphSj07 = [];
          for (let i = 0; i < data.length; i++) {
            self.graphTime.push(data[i].reserver1);
            self.graphSj01.push(data[i].gold_silver_card);
            self.graphSj02.push(data[i].transform_member);
            self.graphSj03.push(data[i].member);
            self.graphSj04.push(data[i].ordinary_card);
          }

          setTimeout(() => {
            // 柱状图数据
            self.dataQueryUrlTimeDistribgraph = {
              date: self.graphTime, // x轴时间
              leg: [
                '将达到金卡标准用户数',
                '将达到金卡未注册的数量',
                '将达到金卡已注册粉丝数',
                '将达到金卡已成为普卡／银卡数'
              ],

              data: [
                {
                  name: '将达到金卡标准用户数',
                  type: 'bar',
                  stack: '数据',
                  data: self.graphSj01
                },
                {
                  name: '将达到金卡未注册的数量',
                  type: 'bar',
                  stack: '数据',
                  data: self.graphSj02
                },
                {
                  name: '将达到金卡已注册粉丝数',
                  type: 'bar',
                  barWidth: 5,
                  stack: '数据',
                  data: self.graphSj03
                },
                {
                  name: '将达到金卡已成为普卡／银卡数',
                  type: 'bar',
                  stack: '数据',
                  data: self.graphSj04
                },
                {
                  name: '将达到准金卡新注册为会员的数量',
                  type: 'bar',
                  stack: '数据',
                  data: []
                },
                {
                  name: '将达到准金卡由粉丝升级为普卡的数量',
                  type: 'bar',
                  stack: '数据',
                  data: []
                },
                {
                  name: '将达到准金卡升级为银卡的数量',
                  type: 'bar',
                  stack: '数据',
                  data: []
                }
              ] // 数据
            };
          }, 1000);
        });
      }
      if (self.willbegoldtabs == 3) {
        this.requestReport.getMapData(data).then((data) => {
          self.graphTime = [];
          self.graphSj01 = [];
          self.graphSj02 = [];
          self.graphSj03 = [];
          self.graphSj04 = [];
          self.graphSj05 = [];
          self.graphSj06 = [];
          self.graphSj07 = [];
          for (let i = 0; i < data.length; i++) {
            self.graphTime.push(data[i].reserver1);
            self.graphSj05.push(data[i].member);
            self.graphSj06.push(data[i].ordinary_card);
            self.graphSj07.push(data[i].silver_card);
          }

          setTimeout(() => {
            // 柱状图数据
            self.dataQueryUrlTimeDistribgraph = {
              date: self.graphTime, // x轴时间
              leg: [
                '将达到银卡新注册为会员的数量',
                '将达到准银卡由粉丝升级为普卡的数量',
                '将达到准银卡升级为银卡的数量'
              ],

              data: [
                {
                  name: '将达到银卡标准用户数',
                  type: 'bar',
                  stack: '数据',
                  data: []
                },
                {
                  name: '将达到银卡未注册的数量',
                  type: 'bar',
                  stack: '数据',
                  data: []
                },
                {
                  name: '将达到银卡已注册粉丝数',
                  type: 'bar',
                  stack: '数据',
                  data: []
                },
                {
                  name: '将达到银卡已成为普卡数',
                  type: 'bar',
                  stack: '数据',
                  data: []
                },
                {
                  name: '将达到银卡新注册为会员的数量',
                  type: 'bar',
                  stack: '数据',
                  data: self.graphSj05
                },
                {
                  name: '将达到准银卡由粉丝升级为普卡的数量',
                  type: 'bar',
                  stack: '数据',
                  data: self.graphSj06
                },
                {
                  name: '将达到准银卡升级为银卡的数量',
                  type: 'bar',
                  barWidth: 5,
                  stack: '数据',
                  data: self.graphSj07
                }
              ] // 数据
            };
          }, 1000);
        });
      }
      if (self.willbegoldtabs == 4) {
        this.requestReport.getMapData(data).then((data) => {
          self.graphTime = [];
          self.graphSj01 = [];
          self.graphSj02 = [];
          self.graphSj03 = [];
          self.graphSj04 = [];
          self.graphSj05 = [];
          self.graphSj06 = [];
          self.graphSj07 = [];
          for (let i = 0; i < data.length; i++) {
            self.graphTime.push(data[i].reserver1);
            self.graphSj05.push(data[i].member);
            self.graphSj06.push(data[i].ordinary_card);
            self.graphSj07.push(data[i].silver_card);
          }

          setTimeout(() => {
            // 柱状图数据
            self.dataQueryUrlTimeDistribgraph = {
              date: self.graphTime, // x轴时间
              leg: [
                '将达到准金卡新注册为会员的数量',
                '将达到准金卡由粉丝升级为普卡的数量',
                '将达到准金卡升级为银卡的数量'
              ],

              data: [
                {
                  name: '将达到金卡标准用户数',
                  type: 'bar',
                  stack: '数据',
                  data: []
                },
                {
                  name: '将达到金卡未注册的数量',
                  type: 'bar',
                  stack: '数据',
                  data: []
                },
                {
                  name: '将达到金卡已注册粉丝数',
                  type: 'bar',
                  stack: '数据',
                  data: []
                },
                {
                  name: '将达到金卡已成为普卡／银卡数',
                  type: 'bar',
                  stack: '数据',
                  data: []
                },
                {
                  name: '将达到准金卡新注册为会员的数量',
                  type: 'bar',
                  stack: '数据',
                  data: self.graphSj05
                },
                {
                  name: '将达到准金卡由粉丝升级为普卡的数量',
                  type: 'bar',
                  stack: '数据',
                  data: self.graphSj06
                },
                {
                  name: '将达到准金卡升级为银卡的数量',
                  type: 'bar',
                  barWidth: 5,
                  stack: '数据',
                  data: self.graphSj07
                }
              ] // 数据
            };
          }, 1000);
        });
      }
    },

    vipTableStarTimeChange01(data) {
      this.vipCostTableStartTime01 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      if (this.vipCostTableStartTime01 >= this.vipCostTableEndTime01) {
        this.$message({
          type: 'info',
          message: '查询开始日期不能大于或等于结束日期'
        });
        this.vipCostTableSeachTime1 = [new Date(this.starTime)];
      }
    },
    vipTableEndTimeChange01(data) {
      this.vipCostTableEndTime01 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      if (this.vipCostTableStartTime01 >= this.vipCostTableEndTime01) {
        this.$message({
          type: 'info',
          message: '查询结束日期不能小于或等于开始日期'
        });
        this.vipCostTableSeachTime2 = [new Date(this.endTime)];
      }
    },
    // 会员价值表格日期查询01
    vipCostTableDateSeach01(data, data1) {
      this.vipCostTableStartTime01 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      this.vipCostTableEndTime01 = gUtils.dateFormat(Date.parse(data1), 'yyyy-MM-dd');
      this.vipCostListSearch01();
    },

    vipTableStarTimeChange02(data) {
      this.vipCostTableStartTime02 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      if (this.vipCostTableStartTime02 >= this.vipCostTableEndTime02) {
        this.$message({
          type: 'info',
          message: '查询开始日期不能大于或等于结束日期'
        });
        this.vipCostTableSeachTime1 = [new Date(this.starTime)];
      }
    },
    vipTableEndTimeChange02(data) {
      this.vipCostTableEndTime02 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      if (this.vipCostTableStartTime02 >= this.vipCostTableEndTime02) {
        this.$message({
          type: 'info',
          message: '查询结束日期不能小于或等于开始日期'
        });
        this.vipCostTableSeachTime2 = [new Date(this.endTime)];
      }
    },
    // 会员价值表格日期查询02
    vipCostTableDateSeach02(data, data1) {
      this.vipCostTableStartTime02 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      this.vipCostTableEndTime02 = gUtils.dateFormat(Date.parse(data1), 'yyyy-MM-dd');
      this.vipCostListSearch02();
    },

    vipTableStarTimeChange03(data) {
      this.vipCostTableStartTime03 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      if (this.vipCostTableStartTime03 >= this.vipCostTableEndTime03) {
        this.$message({
          type: 'info',
          message: '查询开始日期不能大于或等于结束日期'
        });
        this.vipCostTableSeachTime1 = [new Date(this.starTime)];
      }
    },
    vipTableEndTimeChange03(data) {
      this.vipCostTableEndTime03 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      if (this.vipCostTableStartTime03 >= this.vipCostTableEndTime03) {
        this.$message({
          type: 'info',
          message: '查询结束日期不能小于或等于开始日期'
        });
        this.vipCostTableSeachTime2 = [new Date(this.endTime)];
      }
    },
    // 会员价值表格日期查询03
    vipCostTableDateSeach03(data, data1) {
      this.vipCostTableStartTime03 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      this.vipCostTableEndTime03 = gUtils.dateFormat(Date.parse(data1), 'yyyy-MM-dd');
      this.vipCostListSearch03();
    },

    // 会员价值表格分页01base
    vipCostListSearch01() {
      const self = this;
      const data = {
        pageNo: self.vpageNo01,
        pageSize: self.vpageSize01,
        startDate: self.vipCostTableStartTime01,
        endDate: self.vipCostTableEndTime01,
        tabId: self.vipCostTabs
      };

      this.vipCostMsgListLoading01 = true;
      this.requestReport.getVipCostTableData(data).then((data) => {
        self.vipCostMsgListData01 = data;
        self.vipCostMsgListLoading01 = false;
      });
    },
    vipCosttypeChange01() {
      if (!this.vipCostMsgListLoading01) {
        this.vpageNo01 = 1;
        this.vipCostListSearch01();
      }
    },
    vipCosthandleSizeChange01(pageSize) {
      if (!this.vipCostMsgListLoading01) {
        this.vpageNo01 = 1;
        this.vpageSize01 = pageSize;
        this.vipCostListSearch01();
      }
    },
    vipCosthandleCurrentChange01(pageNo) {
      if (!this.vipCostMsgListLoading01) {
        this.vpageNo01 = pageNo;
        this.vipCostListSearch01();
      }
    },

    // 会员价值表格分页02
    vipCostListSearch02() {
      const self = this;
      const data = {
        pageNo: self.vpageNo02,
        pageSize: self.vpageSize02,
        startDate: self.vipCostTableStartTime02,
        endDate: self.vipCostTableEndTime02,
        tabId: self.vipCostTabs
      };

      this.vipCostMsgListLoading02 = true;
      this.requestReport.getVipCostTableData(data).then((data) => {
        self.vipCostMsgListData02 = data;
        self.vipCostMsgListLoading02 = false;
      });
    },
    vipCosttypeChange02() {
      if (!this.vipCostMsgListLoading02) {
        this.vpageNo02 = 1;
        this.vipCostListSearch02();
      }
    },
    vipCosthandleSizeChange02(pageSize) {
      if (!this.vipCostMsgListLoading02) {
        this.vpageNo02 = 1;
        this.vpageSize02 = pageSize;
        this.vipCostListSearch02();
      }
    },
    vipCosthandleCurrentChange02(pageNo) {
      if (!this.vipCostMsgListLoading02) {
        this.vpageNo02 = pageNo;
        this.vipCostListSearch02();
      }
    },

    // 会员价值表格分页03
    vipCostListSearch03() {
      const self = this;
      const data = {
        pageNo: self.vpageNo03,
        pageSize: self.vpageSize03,
        startDate: self.vipCostTableStartTime03,
        endDate: self.vipCostTableEndTime03,
        tabId: self.vipCostTabs
      };

      this.vipCostMsgListLoading03 = true;
      this.requestReport.getVipCostTableData(data).then((data) => {
        self.vipCostMsgListData03 = data;
        self.vipCostMsgListLoading03 = false;
      });
    },
    vipCosttypeChange03() {
      if (!this.vipCostMsgListLoading03) {
        this.vpageNo03 = 1;
        this.vipCostListSearch03();
      }
    },
    vipCosthandleSizeChange03(pageSize) {
      if (!this.vipCostMsgListLoading03) {
        this.vpageNo03 = 1;
        this.vpageSize03 = pageSize;
        this.vipCostListSearch03();
      }
    },
    vipCosthandleCurrentChange03(pageNo) {
      if (!this.vipCostMsgListLoading03) {
        this.vpageNo03 = pageNo;
        this.vipCostListSearch03();
      }
    },

    gTableStarTimeChange01(data) {
      this.gtableStartTime01 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      if (this.gtableStartTime01 >= this.gtableEndTime01) {
        this.$message({
          type: 'info',
          message: '查询开始日期不能大于或等于结束日期'
        });
        this.GoldTableSeachTime1 = [new Date(this.starTime)];
      }
    },
    gTableEndTimeChange01(data) {
      this.gtableEndTime01 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      if (this.gtableStartTime01 >= this.gtableEndTime01) {
        this.$message({
          type: 'info',
          message: '查询结束日期不能小于或等于开始日期'
        });
        this.GoldTableSeachTime2 = [new Date(this.endTime)];
      }
    },
    // 准银卡现状表格日期查询01
    goldTableDateSeach01(data, data1) {
      this.gtableStartTime01 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      this.gtableEndTime01 = gUtils.dateFormat(Date.parse(data1), 'yyyy-MM-dd');
      this.glistSearch01();
    },

    gTableStarTimeChange02(data) {
      this.gtableStartTime02 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      if (this.gtableStartTime02 >= this.gtableEndTime02) {
        this.$message({
          type: 'info',
          message: '查询开始日期不能大于或等于结束日期'
        });
        this.GoldTableSeachTime1 = [new Date(this.starTime)];
      }
    },
    gTableEndTimeChange02(data) {
      this.gtableEndTime02 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      if (this.gtableStartTime02 >= this.gtableEndTime02) {
        this.$message({
          type: 'info',
          message: '查询结束日期不能小于或等于开始日期'
        });
        this.GoldTableSeachTime2 = [new Date(this.endTime)];
      }
    },
    // 准银卡现状表格日期查询02
    goldTableDateSeach02(data, data1) {
      this.gtableStartTime02 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      this.gtableEndTime02 = gUtils.dateFormat(Date.parse(data1), 'yyyy-MM-dd');
      this.glistSearch02();
    },

    gTableStarTimeChange03(data) {
      this.gtableStartTime03 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      if (this.gtableStartTime03 >= this.gtableEndTime03) {
        this.$message({
          type: 'info',
          message: '查询开始日期不能大于或等于结束日期'
        });
        this.GoldTableSeachTime1 = [new Date(this.starTime)];
      }
    },
    gTableEndTimeChange03(data) {
      this.gtableEndTime03 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      if (this.gtableStartTime03 >= this.gtableEndTime03) {
        this.$message({
          type: 'info',
          message: '查询结束日期不能小于或等于开始日期'
        });
        this.GoldTableSeachTime2 = [new Date(this.endTime)];
      }
    },
    // 准银卡现状表格日期查询03
    goldTableDateSeach03(data, data1) {
      this.gtableStartTime03 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      this.gtableEndTime03 = gUtils.dateFormat(Date.parse(data1), 'yyyy-MM-dd');
      this.glistSearch03();
    },

    gTableStarTimeChange04(data) {
      this.gtableStartTime04 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      if (this.gtableStartTime04 >= this.gtableEndTime04) {
        this.$message({
          type: 'info',
          message: '查询开始日期不能大于或等于结束日期'
        });
        this.GoldTableSeachTime1 = [new Date(this.starTime)];
      }
    },
    gTableEndTimeChange04(data) {
      this.gtableEndTime04 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      if (this.gtableStartTime04 >= this.gtableEndTime04) {
        this.$message({
          type: 'info',
          message: '查询结束日期不能小于或等于开始日期'
        });
        this.GoldTableSeachTime2 = [new Date(this.endTime)];
      }
    },
    // 准银卡现状表格日期查询04
    goldTableDateSeach04(data, data1) {
      this.gtableStartTime04 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      this.gtableEndTime04 = gUtils.dateFormat(Date.parse(data1), 'yyyy-MM-dd');
      this.glistSearch04();
    },

    // 准银卡现状表格分页01
    glistSearch01() {
      const self = this;
      const data = {
        pageNo: self.gpageNo01,
        pageSize: self.gpageSize01,
        startDate: self.gtableStartTime01,
        endDate: self.gtableEndTime01,
        type: 1,
        tabId: self.goldtabs
      };

      this.gmsgListLoading01 = true;
      this.requestReport.getTableData(data).then((data) => {
        self.gmsgListData01 = data;
        self.gmsgListLoading01 = false;
      });
    },
    gtypeChange01() {
      if (!this.gmsgListLoading01) {
        this.gpageNo01 = 1;
        this.glistSearch01();
      }
    },
    ghandleSizeChange01(pageSize) {
      if (!this.gmsgListLoading01) {
        this.gpageNo01 = 1;
        this.gpageSize01 = pageSize;
        this.glistSearch01();
      }
    },
    ghandleCurrentChange01(pageNo) {
      if (!this.gmsgListLoading01) {
        this.gpageNo01 = pageNo;
        this.glistSearch01();
      }
    },

    // 准银卡现状表格分页02
    glistSearch02() {
      const self = this;
      const data = {
        pageNo: self.gpageNo02,
        pageSize: self.gpageSize02,
        startDate: self.gtableStartTime02,
        endDate: self.gtableEndTime02,
        type: 1,
        tabId: self.goldtabs
      };

      this.gmsgListLoading02 = true;
      this.requestReport.getTableData(data).then((data) => {
        self.gmsgListData02 = data;
        self.gmsgListLoading02 = false;
      });
    },
    gtypeChange02() {
      if (!this.gmsgListLoading02) {
        this.gpageNo02 = 1;
        this.glistSearch02();
      }
    },
    ghandleSizeChange02(pageSize) {
      if (!this.gmsgListLoading02) {
        this.gpageNo02 = 1;
        this.gpageSize02 = pageSize;
        this.glistSearch02();
      }
    },
    ghandleCurrentChange02(pageNo) {
      if (!this.gmsgListLoading02) {
        this.gpageNo02 = pageNo;
        this.glistSearch02();
      }
    },

    // 准银卡现状表格分页03
    glistSearch03() {
      const self = this;
      const data = {
        pageNo: self.gpageNo03,
        pageSize: self.gpageSize03,
        startDate: self.gtableStartTime03,
        endDate: self.gtableEndTime03,
        type: 1,
        tabId: self.goldtabs
      };

      this.gmsgListLoading03 = true;
      this.requestReport.getTableData(data).then((data) => {
        self.gmsgListData03 = data;
        self.gmsgListLoading03 = false;
      });
    },
    gtypeChange03() {
      if (!this.gmsgListLoading03) {
        this.gpageNo03 = 1;
        this.glistSearch03();
      }
    },
    ghandleSizeChange03(pageSize) {
      if (!this.gmsgListLoading03) {
        this.gpageNo03 = 1;
        this.gpageSize03 = pageSize;
        this.glistSearch03();
      }
    },
    ghandleCurrentChange03(pageNo) {
      if (!this.gmsgListLoading03) {
        this.gpageNo03 = pageNo;
        this.glistSearch03();
      }
    },

    // 准银卡现状表格分页04
    glistSearch04() {
      const self = this;
      const data = {
        pageNo: self.gpageNo04,
        pageSize: self.gpageSize04,
        startDate: self.gtableStartTime04,
        endDate: self.gtableEndTime04,
        type: 1,
        tabId: self.goldtabs
      };

      this.gmsgListLoading04 = true;
      this.requestReport.getTableData(data).then((data) => {
        self.gmsgListData04 = data;
        self.gmsgListLoading04 = false;
      });
    },
    gtypeChange04() {
      if (!this.gmsgListLoading04) {
        this.gpageNo04 = 1;
        this.glistSearch04();
      }
    },
    ghandleSizeChange04(pageSize) {
      if (!this.gmsgListLoading04) {
        this.gpageNo04 = 1;
        this.gpageSize04 = pageSize;
        this.glistSearch04();
      }
    },
    ghandleCurrentChange04(pageNo) {
      if (!this.gmsgListLoading04) {
        this.gpageNo04 = pageNo;
        this.glistSearch04();
      }
    },

    wgTableStarTimeChange01(data) {
      this.wgtableStartTime01 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      if (this.wgtableStartTime01 >= this.wgtableEndTime01) {
        this.$message({
          type: 'info',
          message: '查询开始日期不能大于或等于结束日期'
        });
        this.willbeGoldTableSeachTime1 = [new Date(this.starTime)];
      }
    },
    wgTableEndTimeChange01(data) {
      this.wgtableEndTime01 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      if (this.wgtableStartTime01 >= this.wgtableEndTime01) {
        this.$message({
          type: 'info',
          message: '查询结束日期不能小于或等于开始日期'
        });
        this.willbeGoldTableSeachTime2 = [new Date(this.endTime)];
      }
    },
    // 将达到银卡现状表格日期查询01
    wgtableDateSeach01(data, data1) {
      this.wgtableStartTime01 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      this.wgtableEndTime01 = gUtils.dateFormat(Date.parse(data1), 'yyyy-MM-dd');
      this.wglistSearch01();
    },

    wgTableStarTimeChange02(data) {
      this.wgtableStartTime02 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      if (this.wgtableStartTime02 >= this.wgtableEndTime02) {
        this.$message({
          type: 'info',
          message: '查询开始日期不能大于或等于结束日期'
        });
        this.willbeGoldTableSeachTime1 = [new Date(this.starTime)];
      }
    },
    wgTableEndTimeChange02(data) {
      this.wgtableEndTime02 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      if (this.wgtableStartTime02 >= this.wgtableEndTime02) {
        this.$message({
          type: 'info',
          message: '查询结束日期不能小于或等于开始日期'
        });
        this.willbeGoldTableSeachTime2 = [new Date(this.endTime)];
      }
    },
    // 将达到银卡现状表格日期查询02
    wgtableDateSeach02(data, data1) {
      this.wgtableStartTime02 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      this.wgtableEndTime02 = gUtils.dateFormat(Date.parse(data1), 'yyyy-MM-dd');
      this.wglistSearch02();
    },

    wgTableStarTimeChange03(data) {
      this.wgtableStartTime03 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      if (this.wgtableStartTime03 >= this.wgtableEndTime03) {
        this.$message({
          type: 'info',
          message: '查询开始日期不能大于或等于结束日期'
        });
        this.willbeGoldTableSeachTime1 = [new Date(this.starTime)];
      }
    },
    wgTableEndTimeChange03(data) {
      this.wgtableEndTime03 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      if (this.wgtableStartTime03 >= this.wgtableEndTime03) {
        this.$message({
          type: 'info',
          message: '查询结束日期不能小于或等于开始日期'
        });
        this.willbeGoldTableSeachTime2 = [new Date(this.endTime)];
      }
    },
    // 将达到银卡现状表格日期查询01
    wgtableDateSeach03(data, data1) {
      this.wgtableStartTime03 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      this.wgtableEndTime03 = gUtils.dateFormat(Date.parse(data1), 'yyyy-MM-dd');
      this.wglistSearch03();
    },

    wgTableStarTimeChange04(data) {
      this.wgtableStartTime04 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      if (this.wgtableStartTime04 >= this.wgtableEndTime04) {
        this.$message({
          type: 'info',
          message: '查询开始日期不能大于或等于结束日期'
        });
        this.willbeGoldTableSeachTime1 = [new Date(this.starTime)];
      }
    },
    wgTableEndTimeChange04(data) {
      this.wgtableEndTime04 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      if (this.wgtableStartTime04 >= this.wgtableEndTime04) {
        this.$message({
          type: 'info',
          message: '查询结束日期不能小于或等于开始日期'
        });
        this.willbeGoldTableSeachTime2 = [new Date(this.endTime)];
      }
    },
    // 将达到银卡现状表格日期查询04
    wgtableDateSeach04(data, data1) {
      this.wgtableStartTime04 = gUtils.dateFormat(Date.parse(data), 'yyyy-MM-dd');
      this.wgtableEndTime04 = gUtils.dateFormat(Date.parse(data1), 'yyyy-MM-dd');
      this.wglistSearch04();
    },

    // 将达到银卡现状表格分页01
    wglistSearch01() {
      const self = this;
      const data = {
        pageNo: self.wgpageNo01,
        pageSize: self.wgpageSize01,
        startDate: self.wgtableStartTime01,
        endDate: self.wgtableEndTime01,
        type: 2,
        tabId: self.willbegoldtabs
      };

      this.wgmsgListLoading01 = true;
      this.requestReport.getTableData(data).then((data) => {
        self.wgmsgListData01 = data;
        self.wgmsgListLoading01 = false;
      });
    },
    wgtypeChange01() {
      if (!this.wgmsgListLoading01) {
        this.wgpageNo01 = 1;
        this.wglistSearch01();
      }
    },
    wghandleSizeChange01(pageSize) {
      if (!this.wgmsgListLoading01) {
        this.wgpageNo01 = 1;
        this.wgpageSize01 = pageSize;
        this.wglistSearch01();
      }
    },
    wghandleCurrentChange01(pageNo) {
      if (!this.wgmsgListLoading01) {
        this.wgpageNo01 = pageNo;
        this.wglistSearch01();
      }
    },

    // 将达到银卡现状表格分页02
    wglistSearch02() {
      const self = this;
      const data = {
        pageNo: self.wgpageNo02,
        pageSize: self.wgpageSize02,
        startDate: self.wgtableStartTime02,
        endDate: self.wgtableEndTime02,
        type: 2,
        tabId: self.willbegoldtabs
      };

      this.wgmsgListLoading02 = true;
      this.requestReport.getTableData(data).then((data) => {
        self.wgmsgListData02 = data;
        self.wgmsgListLoading02 = false;
      });
    },
    wgtypeChange02() {
      if (!this.wgmsgListLoading02) {
        this.wgpageNo02 = 1;
        this.wglistSearch02();
      }
    },
    wghandleSizeChange02(pageSize) {
      if (!this.wgmsgListLoading02) {
        this.wgpageNo02 = 1;
        this.wgpageSize02 = pageSize;
        this.wglistSearch02();
      }
    },
    wghandleCurrentChange02(pageNo) {
      if (!this.wgmsgListLoading02) {
        this.wgpageNo02 = pageNo;
        this.wglistSearch02();
      }
    },

    // 将达到银卡现状表格分页03
    wglistSearch03() {
      const self = this;
      const data = {
        pageNo: self.wgpageNo03,
        pageSize: self.wgpageSize03,
        startDate: self.wgtableStartTime03,
        endDate: self.wgtableEndTime03,
        type: 2,
        tabId: self.willbegoldtabs
      };

      this.wgmsgListLoading03 = true;
      this.requestReport.getTableData(data).then((data) => {
        self.wgmsgListData03 = data;
        self.wgmsgListLoading03 = false;
      });
    },
    wgtypeChange03() {
      if (!this.wgmsgListLoading03) {
        this.wgpageNo03 = 1;
        this.wglistSearch03();
      }
    },
    wghandleSizeChange03(pageSize) {
      if (!this.wgmsgListLoading03) {
        this.wgpageNo03 = 1;
        this.wgpageSize03 = pageSize;
        this.wglistSearch03();
      }
    },
    wghandleCurrentChange03(pageNo) {
      if (!this.wgmsgListLoading03) {
        this.wgpageNo03 = pageNo;
        this.wglistSearch03();
      }
    },

    // 将达到银卡现状表格分页04
    wglistSearch04() {
      const self = this;
      const data = {
        pageNo: self.wgpageNo04,
        pageSize: self.wgpageSize04,
        startDate: self.wgtableStartTime04,
        endDate: self.wgtableEndTime04,
        type: 2,
        tabId: self.willbegoldtabs
      };

      this.wgmsgListLoading04 = true;
      this.requestReport.getTableData(data).then((data) => {
        self.wgmsgListData04 = data;
        self.wgmsgListLoading04 = false;
      });
    },
    wgtypeChange04() {
      if (!this.wgmsgListLoading04) {
        this.wgpageNo04 = 1;
        this.wglistSearch04();
      }
    },
    wghandleSizeChange04(pageSize) {
      if (!this.wgmsgListLoading04) {
        this.wgpageNo04 = 1;
        this.wgpageSize04 = pageSize;
        this.wglistSearch04();
      }
    },
    wghandleCurrentChange04(pageNo) {
      if (!this.wgmsgListLoading04) {
        this.wgpageNo04 = pageNo;
        this.wglistSearch04();
      }
    },
    getStatisticsNumData() {
      const self = this;
      this.statisticsNumDataLoading = true;
      const data = {
        tabId: 1,
        startDate: this.statisticsNumDataSeachTime1,
        endDate: this.statisticsNumDataSeachTime2,
        pageNo: this.statisticsNumDataPageNo,
        pageSize: this.statisticsNumDataPageSize
      };

      this.requestReport.getStatisticsNumData(data).then((data) => {
        self.statisticsNumData = data;
        self.statisticsNumDataLoading = false;
      });
    },
    statisticsNumDataHandleSizeChange(pageSize) {
      if (!this.statisticsNumDataLoading) {
        this.statisticsNumDataPageNo = 1;
        this.wgpageSistatisticsNumDataPageSizeze02 = pageSize;
        this.getStatisticsNumData();
      }
    },
    statisticsNumDataHandleCurrentChange(pageNo) {
      if (!this.statisticsNumDataLoading) {
        this.statisticsNumDataPageNo = pageNo;
        this.getStatisticsNumData();
      }
    },
    statisticsNumDataStartDateChange() {
      if (!this.statisticsNumDataLoading) {
        this.statisticsNumDataSeachTime1 = gUtils.dateFormat(
          Date.parse(this.statisticsNumDataSeachTime1),
          'yyyy-MM-dd'
        );
        this.statisticsNumDataSeachTime2 = gUtils.dateFormat(
          Date.parse(this.statisticsNumDataSeachTime2),
          'yyyy-MM-dd'
        );

        this.statisticsNumDataPageNo = 1;
        this.getStatisticsNumData();
      }
    },
    getMemberFunnelData() {
      const _this = this;
      this.requestReport.getMemberFunnelData().then((data) => {
        if (data) {
          for (let index = 0; index < data.length; index++) {
            _this.memberFunnelData[data[index].rankId] = data[index].totalCountNum;
            _this.count[data[index].rankId] = data[index].count;
            _this.oldCount[data[index].rankId] = data[index].oldCount;
          }
        }
      });
    }
  },
  mounted() {
    const self = this;

    this.statisticsNumDataSeachTime1 = gUtils.dateFormat(Date.parse(new Date()) - 3600 * 1000 * 24 * 7, 'yyyy-MM-dd');
    this.statisticsNumDataSeachTime2 = gUtils.dateFormat(Date.parse(new Date()) - 3600 * 1000 * 24 * 1, 'yyyy-MM-dd');

    this.vipCostLineEndTime = gUtils.dateFormat(Date.parse(new Date()), 'yyyy-MM-dd');
    this.vipCostLineStartTime = gUtils.dateFormat(Date.parse(new Date()) - 3600 * 1000 * 24 * 7, 'yyyy-MM-dd');

    this.vipCostTableEndTime01 = gUtils.dateFormat(Date.parse(new Date()), 'yyyy-MM-dd');
    this.vipCostTableStartTime01 = gUtils.dateFormat(Date.parse(new Date()) - 3600 * 1000 * 24 * 7, 'yyyy-MM-dd');
    this.vipCostTableEndTime02 = gUtils.dateFormat(Date.parse(new Date()), 'yyyy-MM-dd');
    this.vipCostTableStartTime02 = gUtils.dateFormat(Date.parse(new Date()) - 3600 * 1000 * 24 * 7, 'yyyy-MM-dd');
    this.vipCostTableEndTime03 = gUtils.dateFormat(Date.parse(new Date()), 'yyyy-MM-dd');
    this.vipCostTableStartTime03 = gUtils.dateFormat(Date.parse(new Date()) - 3600 * 1000 * 24 * 7, 'yyyy-MM-dd');

    this.graphEndTime = gUtils.dateFormat(Date.parse(new Date()), 'yyyy-MM-dd');
    this.graphStartTime = gUtils.dateFormat(Date.parse(new Date()) - 3600 * 1000 * 24 * 7, 'yyyy-MM-dd');

    this.wgtableEndTime01 = gUtils.dateFormat(Date.parse(new Date()), 'yyyy-MM-dd');
    this.wgtableStartTime01 = gUtils.dateFormat(Date.parse(new Date()) - 3600 * 1000 * 24 * 7, 'yyyy-MM-dd');
    this.wgtableEndTime02 = gUtils.dateFormat(Date.parse(new Date()), 'yyyy-MM-dd');
    this.wgtableStartTime02 = gUtils.dateFormat(Date.parse(new Date()) - 3600 * 1000 * 24 * 7, 'yyyy-MM-dd');
    this.wgtableEndTime03 = gUtils.dateFormat(Date.parse(new Date()), 'yyyy-MM-dd');
    this.wgtableStartTime03 = gUtils.dateFormat(Date.parse(new Date()) - 3600 * 1000 * 24 * 7, 'yyyy-MM-dd');
    this.wgtableEndTime04 = gUtils.dateFormat(Date.parse(new Date()), 'yyyy-MM-dd');
    this.wgtableStartTime04 = gUtils.dateFormat(Date.parse(new Date()) - 3600 * 1000 * 24 * 7, 'yyyy-MM-dd');

    this.goldgraphEndTime = gUtils.dateFormat(Date.parse(new Date()), 'yyyy-MM-dd');
    this.goldgraphStartTime = gUtils.dateFormat(Date.parse(new Date()) - 3600 * 1000 * 24 * 7, 'yyyy-MM-dd');

    this.gtableEndTime01 = gUtils.dateFormat(Date.parse(new Date()), 'yyyy-MM-dd');
    this.gtableStartTime01 = gUtils.dateFormat(Date.parse(new Date()) - 3600 * 1000 * 24 * 7, 'yyyy-MM-dd');
    this.gtableEndTime02 = gUtils.dateFormat(Date.parse(new Date()), 'yyyy-MM-dd');
    this.gtableStartTime02 = gUtils.dateFormat(Date.parse(new Date()) - 3600 * 1000 * 24 * 7, 'yyyy-MM-dd');
    this.gtableEndTime03 = gUtils.dateFormat(Date.parse(new Date()), 'yyyy-MM-dd');
    this.gtableStartTime03 = gUtils.dateFormat(Date.parse(new Date()) - 3600 * 1000 * 24 * 7, 'yyyy-MM-dd');
    this.gtableEndTime04 = gUtils.dateFormat(Date.parse(new Date()), 'yyyy-MM-dd');
    this.gtableStartTime04 = gUtils.dateFormat(Date.parse(new Date()) - 3600 * 1000 * 24 * 7, 'yyyy-MM-dd');

    // console.log(this.vipCostLineEndTime)
    this.starTime = this.vipCostLineStartTime.split('-');
    this.endTime = this.vipCostLineEndTime.split('-');
    // console.log(this.starTime)
    (self.vipCostlineSeachTime1 = [new Date(this.starTime)]),
    (self.vipCostlineSeachTime2 = [new Date(this.endTime)]),
    (self.vipCostTableSeachTime1 = [new Date(this.starTime)]),
    (self.vipCostTableSeachTime2 = [new Date(this.endTime)]),
    // 准金银卡会员日期搜索
    (self.GoldGraphSeachTime1 = [new Date(this.starTime)]),
    (self.GoldGraphSeachTime2 = [new Date(this.endTime)]),
    (self.GoldTableSeachTime1 = [new Date(this.starTime)]),
    (self.GoldTableSeachTime2 = [new Date(this.endTime)]),
    // 将达到准金银卡会员日期搜索
    (self.willbeGoldGraphSeachTime1 = [new Date(this.starTime)]),
    (self.willbeGoldGraphSeachTime2 = [new Date(this.endTime)]),
    (self.willbeGoldTableSeachTime1 = [new Date(this.starTime)]),
    (self.willbeGoldTableSeachTime2 = [new Date(this.endTime)]),
    //        setTimeout(function(){
    //          // 折线图数据
    //          self.dataQueryUrlTimeDistrib = {
    //            date: ['10/01','10/02','10/03','10/04','10/05','10/06','10/07'], // x轴时间
    //            data: [1,3,4,6,7,8] // 数据
    //          }
    //        },1000),
    $('.el-table').each(function () {
      if ($(this).find('.el-table__empty-block')) {
        // console.log(1)
        $(this)
          .siblings('.el-pagination')
          .find('.btn-next')
          .addClass('disabled');
      }
    });

    $('.el-tabs__nav').click(() => {
      setTimeout(() => {
        $('.el-table').each(function () {
          if ($(this).find('.el-table__empty-block')) {
            // console.log(1)
            $(this)
              .siblings('.el-pagination')
              .find('.btn-next')
              .addClass('disabled');
          }
        });
      }, 500);
    });

    this.getMemberFunnelData();
    // 扫码注册统计
    this.getStatisticsNumData();
    // 会员价值初始化
    this.vipCostLineData();
    this.vipCostListSearch01();
    // 准银卡现状初始化
    this.glistSearch01();
    this.graphData01();
    // 将达到银卡初始化
    this.wglistSearch01();
    this.graphData();
  }
};
</script>

<style scoped>
.vip_level {
  font-size: 0;
  margin: 0 -50px 20px;
  text-align: center;
}
.vip_level_1-3 {
  width: 33.33%;
  display: inline-block;
}
.vip_level_1-3 div {
  border: 1px solid #20a0ff;
  border-radius: 5px;
  margin: 0 50px;
}
.vip_level_1-3 h6 {
  font-size: 16px;
  padding: 10px 0;
  background: #20a0ff;
  color: #fff;
}
.vip_level_1-3 p {
  font-size: 14px;
  padding: 10px 0;
}
</style>

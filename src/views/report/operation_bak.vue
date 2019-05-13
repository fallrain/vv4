<template>
  <div class="vip-content">
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
                type="datetimerange"
                placeholder="选择时间范围"
                align="left"
                :editable="false"
              ></el-date-picker>
            </div>
            <el-button type="primary" class="fl" @click="vipCostTableDateSeach(vipCostlineSeachTime1)">确定</el-button>
            <div class="clear"></div>
          </div>
          <chart-line
            width="900px"
            height="300px"
            :data="dataQueryUrlTimeDistribVipCont"
            :isArea="false"
            style="margin-top:20px;"
          ></chart-line>
          <!--银卡以上会员数折线图 END-->
          <!--银卡以上会员数表格 START-->
          <div style="margin-top:20px;">
            <div>
              <div class="block" style="float: left;margin-right: 20px;">
                <el-date-picker
                  v-model="vipCostTableSeachTime1"
                  type="datetimerange"
                  placeholder="选择时间范围"
                  align="left"
                  :editable="false"
                ></el-date-picker>
              </div>
              <el-button type="primary" class="fl" @click="vipCostTableDateSeach(vipCostTableSeachTime1)"
                >确定</el-button
              >
              <div class="clear"></div>
            </div>
            <div style="margin-top:20px;">
              <el-table :data="vipCostMsgListData.entities" style="width: 100%">
                <el-table-column prop="countDate" label="时间" min-width="50%">
                  <template slot-scope="scope">
                    <div>{{ gUtils.dateFormat(scope.row.countDate, 'yyyy-MM-dd') }}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="totalNum" label="银卡以上会员数" min-width="50%"> </el-table-column>
              </el-table>
              <el-pagination
                @size-change="vipCosthandleSizeChange"
                @current-change="vipCosthandleCurrentChange"
                border
                :current-page.sync="pageNo"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="sizes, prev, pager, next"
                :total="vipCostMsgListData.entityCount"
              >
              </el-pagination>
            </div>
          </div>
          <!--银卡以上会员数表格 END-->
        </el-tab-pane>
        <el-tab-pane label="升级会员数" name="2">
          <!--升级会员数折线图 START-->
          <div>
            <div class="block" style="float: left;margin-right: 20px;">
              <el-date-picker
                v-model="vipCostlineSeachTime2"
                type="datetimerange"
                placeholder="选择时间范围"
                align="left"
                :editable="false"
              ></el-date-picker>
            </div>
            <el-button type="primary" class="fl" @click="vipCostTableDateSeach(vipCostlineSeachTime2)">确定</el-button>
            <div class="clear"></div>
          </div>
          <chart-line
            width="900px"
            height="300px"
            :data="dataQueryUrlTimeDistribVipCont"
            :type="2"
            style="margin-top:20px;"
          ></chart-line>
          <!--升级会员数折线图 END-->
          <!--升级会员数表格 START-->
          <div style="margin-top:20px;">
            <div>
              <div class="block" style="float: left;margin-right: 20px;">
                <el-date-picker
                  v-model="vipCostTableSeachTime2"
                  type="datetimerange"
                  placeholder="选择时间范围"
                  align="left"
                  :editable="false"
                ></el-date-picker>
              </div>
              <el-button type="primary" class="fl" @click="vipCostTableDateSeach(vipCostTableSeachTime2)"
                >确定</el-button
              >
              <div class="clear"></div>
            </div>
            <div style="margin-top:20px;">
              <el-table :data="vipCostMsgListData.entities" style="width: 100%">
                <el-table-column prop="countDate" label="时间" min-width="50%">
                  <template slot-scope="scope">
                    <div>{{ gUtils.dateFormat(scope.row.countDate, 'yyyy-MM-dd') }}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="totalNum" label="升级会员数" min-width="50%"> </el-table-column>
              </el-table>
              <el-pagination
                @size-change="vipCosthandleSizeChange"
                @current-change="vipCosthandleCurrentChange"
                border
                :current-page.sync="pageNo"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="sizes, prev, pager, next"
                :total="vipCostMsgListData.entityCount"
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
                v-model="vipCostlineSeachTime3"
                type="datetimerange"
                placeholder="选择时间范围"
                align="left"
                :editable="false"
              ></el-date-picker>
            </div>
            <el-button type="primary" class="fl" @click="vipCostTableDateSeach(vipCostlineSeachTime3)">确定</el-button>
            <div class="clear"></div>
          </div>
          <chart-line
            width="900px"
            height="300px"
            :data="dataQueryUrlTimeDistribVipCont"
            :type="2"
            style="margin-top:20px;"
          ></chart-line>
          <!--升级粉/普/银/金折线图 END-->
          <!--升级粉/普/银/金表格 START-->
          <div style="margin-top:20px;">
            <div>
              <div class="block" style="float: left;margin-right: 20px;">
                <el-date-picker
                  v-model="vipCostTableSeachTime3"
                  type="datetimerange"
                  placeholder="选择时间范围"
                  align="left"
                  :editable="false"
                ></el-date-picker>
              </div>
              <el-button type="primary" class="fl" @click="vipCostTableDateSeach(vipCostTableSeachTime3)"
                >确定</el-button
              >
              <div class="clear"></div>
            </div>
            <div style="margin-top:20px;">
              <el-table :data="vipCostMsgListData.entities" style="width: 100%">
                <el-table-column prop="countDate" label="时间" min-width="20%">
                  <template slot-scope="scope">
                    <div>{{ gUtils.dateFormat(scope.row.countDate, 'yyyy-MM-dd') }}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="countNum1" label="升级粉丝数" min-width="20%"> </el-table-column>
                <el-table-column prop="countNum2" label="升级普卡数" min-width="20%"> </el-table-column>
                <el-table-column prop="countNum3" label="升级银卡数" min-width="20%"> </el-table-column>
                <el-table-column prop="countNum4" label="升级金卡数" min-width="20%"> </el-table-column>
              </el-table>
              <el-pagination
                @size-change="vipCosthandleSizeChange"
                @current-change="vipCosthandleCurrentChange"
                border
                :current-page.sync="pageNo"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="sizes, prev, pager, next"
                :total="vipCostMsgListData.entityCount"
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
      <el-tabs v-model="goldtabs" type="card" @tab-click="handleClick01">
        <el-tab-pane label="准银卡现状" name="1">
          <!--准银卡现状图表 START-->
          <div>
            <div class="block" style="float: left;margin-right: 20px;">
              <el-date-picker
                v-model="GoldGraphSeachTime1"
                type="datetimerange"
                placeholder="选择时间范围"
                align="left"
                :editable="false"
              ></el-date-picker>
            </div>
            <el-button type="primary" class="fl" @click="goldGraphDateSeach(GoldGraphSeachTime1)">确定</el-button>
            <div class="clear"></div>
          </div>
          <chart-graph
            width="900px"
            height="300px"
            :data="dataQueryUrlTimeDistribgraph01"
            style="margin-top:20px;"
          ></chart-graph>
          <!--准银卡现状图表 END-->
          <!--准银卡现状表格 START-->
          <div style="margin-top:20px;">
            <div>
              <div class="block" style="float: left;margin-right: 20px;">
                <el-date-picker
                  v-model="GoldTableSeachTime1"
                  type="datetimerange"
                  placeholder="选择时间范围"
                  align="left"
                  :editable="false"
                ></el-date-picker>
              </div>
              <el-button type="primary" class="fl" @click="goldTableDateSeach(GoldTableSeachTime1)">确定</el-button>
              <div class="clear"></div>
            </div>
            <div style="margin-top:20px;">
              <el-table :data="msgListData01.entities" style="width: 100%">
                <el-table-column prop="reserver1" label="时间" min-width="15%"> </el-table-column>
                <el-table-column prop="transform_silver" label="达到银卡标准用户数" min-width="17%"> </el-table-column>
                <el-table-column prop="transform_member" label="待升级准银卡数" min-width="17%"> </el-table-column>
                <el-table-column prop="silver_card" label="准银卡未注册数" min-width="17%"> </el-table-column>
                <el-table-column prop="ordinary_card" label="准银卡已注册粉丝数" min-width="17%"> </el-table-column>
                <el-table-column prop="ordinary_card" label="准银卡已成为普卡数" min-width="17%"> </el-table-column>
              </el-table>
              <el-pagination
                @size-change="handleSizeChange01"
                @current-change="handleCurrentChange01"
                border
                :current-page.sync="pageNo"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="sizes, prev, pager, next"
                :total="msgListData01.entityCount"
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
                v-model="GoldGraphSeachTime2"
                type="datetimerange"
                placeholder="选择时间范围"
                align="left"
                :editable="false"
              ></el-date-picker>
            </div>
            <el-button type="primary" class="fl" @click="goldGraphDateSeach(GoldGraphSeachTime2)">确定</el-button>
            <div class="clear"></div>
          </div>
          <chart-graph
            width="900px"
            height="300px"
            :data="dataQueryUrlTimeDistribgraph01"
            style="margin-top:20px;"
          ></chart-graph>
          <!--准金卡现状图表 END-->
          <!--准金卡现状表格 START-->
          <div style="margin-top:20px;">
            <div>
              <div class="block" style="float: left;margin-right: 20px;">
                <el-date-picker
                  v-model="GoldTableSeachTime2"
                  type="datetimerange"
                  placeholder="选择时间范围"
                  align="left"
                  :editable="false"
                ></el-date-picker>
              </div>
              <el-button type="primary" class="fl" @click="goldTableDateSeach(GoldTableSeachTime2)">确定</el-button>
              <div class="clear"></div>
            </div>
            <div style="margin-top:20px;">
              <el-table :data="msgListData01.entities" style="width: 100%">
                <el-table-column prop="reserver1" label="时间" min-width="15%"> </el-table-column>
                <el-table-column prop="transform_silver" label="达到银卡标准用户数" min-width="17%"> </el-table-column>
                <el-table-column prop="transform_member" label="待升级准银卡数" min-width="17%"> </el-table-column>
                <el-table-column prop="silver_card" label="准银卡未注册数" min-width="17%"> </el-table-column>
                <el-table-column prop="ordinary_card" label="准银卡已注册粉丝数" min-width="17%"> </el-table-column>
                <el-table-column prop="ordinary_card" label="准银卡已成为普卡数" min-width="17%"> </el-table-column>
              </el-table>
              <el-pagination
                @size-change="handleSizeChange01"
                @current-change="handleCurrentChange01"
                border
                :current-page.sync="pageNo"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="sizes, prev, pager, next"
                :total="msgListData01.entityCount"
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
                v-model="GoldGraphSeachTime3"
                type="datetimerange"
                placeholder="选择时间范围"
                align="left"
                :editable="false"
              ></el-date-picker>
            </div>
            <el-button type="primary" class="fl" @click="goldGraphDateSeach(GoldGraphSeachTime3)">确定</el-button>
            <div class="clear"></div>
          </div>
          <chart-graph
            width="900px"
            height="300px"
            :data="dataQueryUrlTimeDistribgraph01"
            style="margin-top:20px;"
          ></chart-graph>
          <!--准银卡升级效果图表 END-->
          <!--准银卡升级效果表格 START-->
          <div style="margin-top:20px;">
            <div>
              <div class="block" style="float: left;margin-right: 20px;">
                <el-date-picker
                  v-model="GoldTableSeachTime3"
                  type="datetimerange"
                  placeholder="选择时间范围"
                  align="left"
                  :editable="false"
                ></el-date-picker>
              </div>
              <el-button type="primary" class="fl" @click="goldTableDateSeach(GoldTableSeachTime3)">确定</el-button>
              <div class="clear"></div>
            </div>
            <div style="margin-top:20px;">
              <el-table :data="msgListData01.entities" style="width: 100%">
                <el-table-column prop="reserver1" label="时间" min-width="15%"> </el-table-column>
                <el-table-column prop="transform_silver" label="达到银卡标准用户数" min-width="17%"> </el-table-column>
                <el-table-column prop="transform_member" label="待升级准银卡数" min-width="17%"> </el-table-column>
                <el-table-column prop="silver_card" label="准银卡未注册数" min-width="17%"> </el-table-column>
                <el-table-column prop="ordinary_card" label="准银卡已注册粉丝数" min-width="17%"> </el-table-column>
                <el-table-column prop="ordinary_card" label="准银卡已成为普卡数" min-width="17%"> </el-table-column>
              </el-table>
              <el-pagination
                @size-change="handleSizeChange01"
                @current-change="handleCurrentChange01"
                border
                :current-page.sync="pageNo"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="sizes, prev, pager, next"
                :total="msgListData01.entityCount"
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
                v-model="GoldGraphSeachTime4"
                type="datetimerange"
                placeholder="选择时间范围"
                align="left"
                :editable="false"
              ></el-date-picker>
            </div>
            <el-button type="primary" class="fl" @click="goldGraphDateSeach(GoldGraphSeachTime4)">确定</el-button>
            <div class="clear"></div>
          </div>
          <chart-graph
            width="900px"
            height="300px"
            :data="dataQueryUrlTimeDistribgraph01"
            style="margin-top:20px;"
          ></chart-graph>
          <!--准银卡升级效果图表 END-->
          <!--准银卡升级效果表格 START-->
          <div style="margin-top:20px;">
            <div>
              <div class="block" style="float: left;margin-right: 20px;">
                <el-date-picker
                  v-model="GoldTableSeachTime4"
                  type="datetimerange"
                  placeholder="选择时间范围"
                  align="left"
                  :editable="false"
                ></el-date-picker>
              </div>
              <el-button type="primary" class="fl" @click="goldTableDateSeach(GoldTableSeachTime4)">确定</el-button>
              <div class="clear"></div>
            </div>
            <div style="margin-top:20px;">
              <el-table :data="msgListData01.entities" style="width: 100%">
                <el-table-column prop="reserver1" label="时间" min-width="15%"> </el-table-column>
                <el-table-column prop="transform_silver" label="达到银卡标准用户数" min-width="17%"> </el-table-column>
                <el-table-column prop="transform_member" label="待升级准银卡数" min-width="17%"> </el-table-column>
                <el-table-column prop="silver_card" label="准银卡未注册数" min-width="17%"> </el-table-column>
                <el-table-column prop="ordinary_card" label="准银卡已注册粉丝数" min-width="17%"> </el-table-column>
                <el-table-column prop="ordinary_card" label="准银卡已成为普卡数" min-width="17%"> </el-table-column>
              </el-table>
              <el-pagination
                @size-change="handleSizeChange01"
                @current-change="handleCurrentChange01"
                border
                :current-page.sync="pageNo"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="sizes, prev, pager, next"
                :total="msgListData01.entityCount"
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
                type="datetimerange"
                placeholder="选择时间范围"
                align="left"
                :editable="false"
              ></el-date-picker>
            </div>
            <el-button type="primary" class="fl" @click="graphDateSeach(willbeGoldGraphSeachTime1)">确定</el-button>
            <div class="clear"></div>
          </div>
          <chart-graph
            width="900px"
            height="300px"
            :data="dataQueryUrlTimeDistribgraph"
            style="margin-top:20px;"
          ></chart-graph>
          <!--将达到银卡现状图表 END-->
          <!--将达到银卡现状表格 START-->
          <div style="margin-top:20px;">
            <div>
              <div class="block" style="float: left;margin-right: 20px;">
                <el-date-picker
                  v-model="willbeGoldTableSeachTime1"
                  type="datetimerange"
                  placeholder="选择时间范围"
                  align="left"
                  :editable="false"
                ></el-date-picker>
              </div>
              <el-button type="primary" class="fl" @click="tableDateSeach(willbeGoldTableSeachTime1)">确定</el-button>
              <div class="clear"></div>
            </div>
            <div style="margin-top:20px;">
              <el-table :data="msgListData.entities" style="width: 100%">
                <el-table-column prop="reserver1" label="时间" min-width="20%"> </el-table-column>
                <el-table-column prop="transform_silver" label="将达到银卡已成为普卡数" min-width="20%">
                </el-table-column>
                <el-table-column prop="transform_member" label="将达到银卡已注册粉丝数" min-width="20%">
                </el-table-column>
                <el-table-column prop="silver_card" label="将达到银卡未注册数" min-width="20%"> </el-table-column>
                <el-table-column prop="ordinary_card" label="将达到银卡标准用户数" min-width="20%"> </el-table-column>
              </el-table>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                border
                :current-page.sync="pageNo"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="wgpageSize"
                layout="sizes, prev, pager, next"
                :total="msgListData.entityCount"
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
                v-model="willbeGoldGraphSeachTime2"
                type="datetimerange"
                placeholder="选择时间范围"
                align="left"
                :editable="false"
              ></el-date-picker>
            </div>
            <el-button type="primary" class="fl" @click="graphDateSeach(willbeGoldGraphSeachTime2)">确定</el-button>
            <div class="clear"></div>
          </div>
          <chart-graph
            width="900px"
            height="300px"
            :data="dataQueryUrlTimeDistribgraph"
            style="margin-top:20px;"
          ></chart-graph>
          <!--将达到金卡现状图表 END-->
          <!--将达到金卡现状表格 START-->
          <div style="margin-top:20px;">
            <div>
              <div class="block" style="float: left;margin-right: 20px;">
                <el-date-picker
                  v-model="willbeGoldTableSeachTime2"
                  type="daterange"
                  placeholder="选择日期范围"
                  align="left"
                  :editable="false"
                >
                </el-date-picker>
              </div>
              <el-button type="primary" class="fl" @click="tableDateSeach(willbeGoldTableSeachTime2)">确定</el-button>
              <div class="clear"></div>
            </div>
            <div style="margin-top:20px;">
              <el-table :data="msgListData.entities" style="width: 100%">
                <el-table-column prop="reserver1" label="时间" min-width="20%"> </el-table-column>
                <el-table-column prop="transform_silver" label="将达到银卡已成为普卡数" min-width="20%">
                </el-table-column>
                <el-table-column prop="transform_member" label="将达到银卡已注册粉丝数" min-width="20%">
                </el-table-column>
                <el-table-column prop="silver_card" label="将达到银卡未注册数" min-width="20%"> </el-table-column>
                <el-table-column prop="ordinary_card" label="将达到银卡标准用户数" min-width="20%"> </el-table-column>
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
          </div>
          <!--将达到金卡现状表格 END-->
        </el-tab-pane>

        <el-tab-pane label="将达到银卡升级效果" name="3">
          <!--将达到银卡升级效果图表 START-->
          <div>
            <div class="block" style="float: left;margin-right: 20px;">
              <el-date-picker
                v-model="willbeGoldGraphSeachTime3"
                type="datetimerange"
                placeholder="选择时间范围"
                align="left"
                :editable="false"
              ></el-date-picker>
            </div>
            <el-button type="primary" class="fl" @click="graphDateSeach(willbeGoldGraphSeachTime3)">确定</el-button>
            <div class="clear"></div>
          </div>
          <chart-graph
            width="900px"
            height="300px"
            :data="dataQueryUrlTimeDistribgraph"
            style="margin-top:20px;"
          ></chart-graph>
          <!--将达到银卡升级效果图表 END-->
          <!--将达到银卡升级效果表格 START-->
          <div style="margin-top:20px;">
            <div>
              <div class="block" style="float: left;margin-right: 20px;">
                <el-date-picker
                  v-model="willbeGoldTableSeachTime3"
                  type="daterange"
                  placeholder="选择日期范围"
                  align="left"
                  :editable="false"
                >
                </el-date-picker>
              </div>
              <el-button type="primary" class="fl" @click="tableDateSeach(willbeGoldTableSeachTime3)">确定</el-button>
              <div class="clear"></div>
            </div>
            <div style="margin-top:20px;">
              <el-table :data="msgListData.entities" style="width: 100%">
                <el-table-column prop="reserver1" label="时间" min-width="20%"> </el-table-column>
                <el-table-column prop="transform_silver" label="将达到银卡已成为普卡数" min-width="20%">
                </el-table-column>
                <el-table-column prop="transform_member" label="将达到银卡已注册粉丝数" min-width="20%">
                </el-table-column>
                <el-table-column prop="silver_card" label="将达到银卡未注册数" min-width="20%"> </el-table-column>
                <el-table-column prop="ordinary_card" label="将达到银卡标准用户数" min-width="20%"> </el-table-column>
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
          </div>
          <!--将达到银卡升级效果表格 END-->
        </el-tab-pane>

        <el-tab-pane label="将达到金卡升级效果" name="4">
          <!--将达到金卡升级效果图表 START-->
          <div>
            <div class="block" style="float: left;margin-right: 20px;">
              <el-date-picker
                v-model="willbeGoldGraphSeachTime4"
                type="datetimerange"
                placeholder="选择时间范围"
                align="left"
                :editable="false"
              ></el-date-picker>
            </div>
            <el-button type="primary" class="fl" @click="graphDateSeach(willbeGoldGraphSeachTime4)">确定</el-button>
            <div class="clear"></div>
          </div>
          <chart-graph
            width="900px"
            height="300px"
            :data="dataQueryUrlTimeDistribgraph"
            style="margin-top:20px;"
          ></chart-graph>
          <!--将达到金卡升级效果图表 END-->
          <!--将达到金卡升级效果表格 START-->
          <div style="margin-top:20px;">
            <div>
              <div class="block" style="float: left;margin-right: 20px;">
                <el-date-picker
                  v-model="willbeGoldTableSeachTime4"
                  type="daterange"
                  placeholder="选择日期范围"
                  align="left"
                  :editable="false"
                >
                </el-date-picker>
              </div>
              <el-button type="primary" class="fl" @click="tableDateSeach(willbeGoldTableSeachTime4)">确定</el-button>
              <div class="clear"></div>
            </div>
            <div style="margin-top:20px;">
              <el-table :data="msgListData.entities" style="width: 100%">
                <el-table-column prop="reserver1" label="时间" min-width="20%"> </el-table-column>
                <el-table-column prop="transform_silver" label="将达到银卡已成为普卡数" min-width="20%">
                </el-table-column>
                <el-table-column prop="transform_member" label="将达到银卡已注册粉丝数" min-width="20%">
                </el-table-column>
                <el-table-column prop="silver_card" label="将达到银卡未注册数" min-width="20%"> </el-table-column>
                <el-table-column prop="ordinary_card" label="将达到银卡标准用户数" min-width="20%"> </el-table-column>
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
          </div>
          <!--将达到金卡升级效果表格 END-->
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--将达到准金银卡会员 结束-->
  </div>
</template>
<script>
import chartLine from './components/chart.line.vue';
import chartGraph from './components/chart.graph.vue';
import gUtils from '../../utils/gUtils.js';

export default {
  components: {
    chartLine,
    chartGraph
  },

  data() {
    return {
      vipCostTabs: '1',
      willbegoldtabs: '1',
      goldtabs: '1',

      dataQueryUrlTimeDistrib: [],
      dataQueryUrlTimeDistribVipCont: [],
      dataQueryUrlTimeDistribgraph: [],
      dataQueryUrlTimeDistribgraph01: [],

      vipCostMsgListData: [],
      msgListData: [],
      msgListData01: [],

      vipCostLineStartTime: [],
      vipCostLineEndTime: [],
      vipCostLineStartTimeChick: [],
      vipCostLineEndTimeChick: [],
      vipCostTableStartTime: [],
      vipCostTableEndTime: [],

      vipContLineTime: [],
      vipContLineSilver: [],
      vipContLineLvlUp: [],
      vipContLinePink: [],
      vipContLineNor: [],
      vipContLineSil: [],
      vipContLineGold: [],

      graphTime: [],
      graphPk: [],
      graphFans: [],
      graphYh: [],
      graphWei: [],
      graphStartTime: [],
      graphEndTime: [],
      tableStartTime: [],
      tableEndTime: [],
      graphStartTimeChick: [],
      graphEndTimeChick: [],

      graphTime01: [],
      graphPk01: [],
      graphFans01: [],
      graphYh01: [],
      graphWei01: [],
      graphStartTime01: [],
      graphEndTime01: [],
      tableStartTime01: [],
      tableEndTime01: [],

      tabtype: '',
      tabletabId: '',
      startDate: '',
      endDate: '',
      pageNo: 1,
      vipCostMsgListLoading: false,
      msgListLoading: false,
      msgListLoading01: false,
      pageSize: 10,
      wgpageSize: 10,

      vipCostlineSeachTime1: '',
      vipCostlineSeachTime2: '',
      vipCostlineSeachTime3: '',
      vipCostTableSeachTime1: '',
      vipCostTableSeachTime2: '',
      vipCostTableSeachTime3: '',

      // 准金银卡会员日期搜索
      GoldGraphSeachTime1: '',
      GoldTableSeachTime1: '',
      GoldGraphSeachTime2: '',
      GoldTableSeachTime2: '',
      GoldGraphSeachTime3: '',
      GoldTableSeachTime3: '',
      GoldGraphSeachTime4: '',
      GoldTableSeachTime4: '',

      // 将达到准金银卡会员日期搜索
      willbeGoldGraphSeachTime1: '',
      willbeGoldTableSeachTime1: '',
      willbeGoldGraphSeachTime2: '',
      willbeGoldTableSeachTime2: '',
      willbeGoldGraphSeachTime3: '',
      willbeGoldTableSeachTime3: '',
      willbeGoldGraphSeachTime4: '',
      willbeGoldTableSeachTime4: ''
    };
  },
  filters: {},

  methods: {
    // 将达到准金银卡会员tab切换方法
    handleClick(tab, event) {
      console.log(tab, event);
      this.listSearch();
      this.graphData();
    },

    // 准金银卡会员tab切换方法
    handleClick01(tab, event) {
      console.log(tab, event);
      this.listSearch01();
      this.graphData01();
    },
    // 会员价值tab切换方法
    vipCostHandleClick(tab, event) {
      console.log(tab, event);
      this.vipCostListSearch();
      this.vipCostLineData();
    },

    // 会员价值线图日期查询
    vipCostLineDateSeach(data) {
      this.vipCostLineStartTime = gUtils.dateFormat(Date.parse(data[0]), 'yyyy-MM-dd');
      this.vipCostLineEndTime = gUtils.dateFormat(Date.parse(data[1]), 'yyyy-MM-dd');
      this.vipCostLineStartTimeChick = Date.parse(data[0]);
      this.vipCostLineEndTimeChick = Date.parse(data[1]) - 3600 * 1000 * 24 * 30;
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
        console.log(1);
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
              date: [1, 3, 4, 6, 7, 8], // ,self.vipContLineTime // x轴时间
              leg: ['银卡以上会员数'],
              data: [
                // 1,3,4,6,7,8]
                {
                  name: '银卡以上会员数',
                  type: 'line',
                  areaStyle: self.isArea,
                  smooth: true,
                  data: [1, 3, 4, 6, 7, 8] // self.vipContLineSilver
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
        console.log(2);
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
              date: [1, 3, 4, 6, 7, 8], // ,self.vipContLineTime // x轴时间
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
                  data: [10, 30, 40, 60, 70, 80] // self.vipContLineLvlUp
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
        console.log(3);
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
            //                        self.vipContLineLvlUp.push(data[i].totalNum)
            self.vipContLinePink.push(data[i].countNum1);
            self.vipContLineNor.push(data[i].countNum2);
            self.vipContLineSil.push(data[i].countNum3);
            self.vipContLineGold.push(data[i].countNum4);
          }
          // console.log(self.vipContLineLvlUp)

          setTimeout(function () {
            // 线图数据
            self.dataQueryUrlTimeDistribVipCont = {
              date: [1, 3, 4, 6, 7, 8], // self.vipContLineTime, // x轴时间
              leg: ['升级粉丝数', '升级普卡数', '升级银卡数', '升级金卡数'],
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
                  data: [6, 10, 20, 30, 40, 50] // self.vipContLinePink
                },
                {
                  name: '升级普卡数',
                  type: 'line',
                  areaStyle: this.isArea,
                  smooth: true,
                  data: [20, 10, 30, 50, 60, 70] // self.vipContLineNor
                },
                {
                  name: '升级银卡数',
                  type: 'line',
                  areaStyle: this.isArea,
                  smooth: true,
                  data: [2, 1, 3, 5, 6, 7] // self.vipContLineSil
                },
                {
                  name: '升级金卡数',
                  type: 'line',
                  areaStyle: this.isArea,
                  smooth: true,
                  data: [10, 40, 60, 20, 30, 10] // self.vipContLineGold
                }
              ] // 数据
            };
          }, 1000);
        });
      }
    },

    // 准银卡现状柱状图日期查询
    goldGraphDateSeach(data) {
      this.graphStartTime = gUtils.dateFormat(Date.parse(data[0]), 'yyyy-MM-dd');
      this.graphEndTime = gUtils.dateFormat(Date.parse(data[1]), 'yyyy-MM-dd');
      this.graphStartTimeChick = Date.parse(data[0]);
      this.graphEndTimeChick = Date.parse(data[1]) - 3600 * 1000 * 24 * 30;
      if (this.graphStartTimeChick <= this.graphEndTimeChick) {
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
        startDate: self.graphStartTime01,
        endDate: self.graphEndTime01,
        type: 1,
        tabId: self.goldtabs
      };

      this.requestReport.getMapData(data).then((data) => {
        self.graphTime01 = [];
        self.graphPk01 = [];
        self.graphFans01 = [];
        self.graphYh01 = [];
        self.graphWei01 = [];
        for (let i = 0; i < data.length; i++) {
          self.graphTime01.push(data[i].reserver1);
          self.graphPk01.push(data[i].transform_silver);
          self.graphFans01.push(data[i].transform_member);
          self.graphYh01.push(data[i].ordinary_card);
          self.graphWei01.push(data[i].silver_card);
        }
        // console.log(self.graphTime01+"#");
        setTimeout(() => {
          // 柱状图数据
          self.dataQueryUrlTimeDistribgraph01 = {
            date: self.graphTime01, // x轴时间
            leg: ['准银卡现状', '准金卡现状', '准银卡升级效果', '准金卡升级效果'],

            data: [
              {
                name: '准银卡现状',
                type: 'bar',
                stack: '数据',
                data: self.graphPk01
              },
              {
                name: '准金卡现状',
                type: 'bar',
                stack: '数据',
                data: self.graphFans01
              },
              {
                name: '准银卡升级效果',
                type: 'bar',
                barWidth: 25,
                stack: '数据',
                data: self.graphYh01
              },
              {
                name: '准金卡升级效果',
                type: 'bar',
                stack: '数据',
                data: self.graphWei01
              }
            ] // 数据
          };
        }, 1000);
      });
    },

    // 将达到银卡现状柱状图日期查询
    graphDateSeach(data) {
      this.graphStartTime = gUtils.dateFormat(Date.parse(data[0]), 'yyyy-MM-dd');
      this.graphEndTime = gUtils.dateFormat(Date.parse(data[1]), 'yyyy-MM-dd');
      this.graphStartTimeChick = Date.parse(data[0]);
      this.graphEndTimeChick = Date.parse(data[1]) - 3600 * 1000 * 24 * 30;
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

      this.requestReport.getMapData(data).then((data) => {
        self.graphTime = [];
        self.graphPk = [];
        self.graphFans = [];
        self.graphYh = [];
        self.graphWei = [];
        for (let i = 0; i < data.length; i++) {
          self.graphTime.push(data[i].reserver1);
          self.graphPk.push(data[i].transform_silver);
          self.graphFans.push(data[i].transform_member);
          self.graphYh.push(data[i].ordinary_card);
          self.graphWei.push(data[i].silver_card);
        }

        setTimeout(() => {
          // 柱状图数据
          self.dataQueryUrlTimeDistribgraph = {
            date: self.graphTime, // x轴时间
            leg: ['将达到银卡已成为普卡数', '将达到银卡已注册粉丝数', '将达到银卡标准用户数', '将达到银卡未注册数'],

            data: [
              {
                name: '将达到银卡已成为普卡数',
                type: 'bar',
                stack: '数据',
                data: self.graphPk
              },
              {
                name: '将达到银卡已注册粉丝数',
                type: 'bar',
                stack: '数据',
                data: self.graphFans
              },
              {
                name: '将达到银卡标准用户数',
                type: 'bar',
                barWidth: 25,
                stack: '数据',
                data: self.graphYh
              },
              {
                name: '将达到银卡未注册数',
                type: 'bar',
                stack: '数据',
                data: self.graphWei
              }
            ] // 数据
          };
        }, 1000);
      });
    },

    // 会员价值表格日期查询
    vipCostTableDateSeach(data) {
      this.vipCostTableStartTime = gUtils.dateFormat(Date.parse(data[0]), 'yyyy-MM-dd');
      this.vipCostTableEndTime = gUtils.dateFormat(Date.parse(data[1]), 'yyyy-MM-dd');
      this.vipCostListSearch();
    },

    // 会员价值表格分页
    vipCostListSearch() {
      console.log(3);
      const self = this;
      const data = {
        pageNum: self.pageNo,
        pageSize: self.pageSize,
        startDate: self.vipCostTableStartTime,
        endDate: self.vipCostTableEndTime,
        tabId: self.vipCostTabs
      };

      this.vipCostMsgListLoading = true;
      this.requestReport.getVipCostTableData(data).then((data) => {
        self.vipCostMsgListData = data;
        self.vipCostMsgListLoading = false;
      });
    },
    vipCosttypeChange() {
      if (!this.vipCostMsgListLoading) {
        this.pageNo = 1;
        this.vipCostListSearch();
      }
    },
    vipCosthandleSizeChange(pageSize) {
      if (!this.vipCostMsgListLoading) {
        this.pageNo = 1;
        this.pageSize = pageSize;
        this.vipCostListSearch();
      }
    },
    vipCosthandleCurrentChange(pageNo) {
      if (!this.vipCostMsgListLoading) {
        this.pageNo = pageNo;
        this.vipCostListSearch();
      }
    },

    // 准银卡现状表格日期查询
    goldTableDateSeach(data) {
      this.tableStartTime01 = gUtils.dateFormat(Date.parse(data[0]), 'yyyy-MM-dd');
      this.tableEndTime01 = gUtils.dateFormat(Date.parse(data[1]), 'yyyy-MM-dd');
      this.listSearch01();
    },

    // 准银卡现状表格分页
    listSearch01() {
      console.log(2);
      const self = this;
      const data = {
        pageNum: self.pageNo,
        pageSize: self.pageSize,
        startDate: self.tableStartTime01,
        endDate: self.tableEndTime01,
        type: 1,
        tabId: self.goldtabs
      };

      this.msgListLoading01 = true;
      this.requestReport.getTableData(data).then((data) => {
        self.msgListData01 = data;
        self.msgListLoading01 = false;
      });
    },
    typeChange01() {
      if (!this.msgListLoading01) {
        this.pageNo = 1;
        this.listSearch01();
      }
    },
    handleSizeChange01(pageSize) {
      if (!this.msgListLoading01) {
        this.pageNo = 1;
        this.pageSize = pageSize;
        this.listSearch01();
      }
    },
    handleCurrentChange01(pageNo) {
      if (!this.msgListLoading01) {
        this.pageNo = pageNo;
        this.listSearch01();
      }
    },

    // 将达到银卡现状表格日期查询
    tableDateSeach(data) {
      this.tableStartTime = gUtils.dateFormat(Date.parse(data[0]), 'yyyy-MM-dd');
      this.tableEndTime = gUtils.dateFormat(Date.parse(data[1]), 'yyyy-MM-dd');
      this.listSearch();
    },

    // 将达到银卡现状表格分页
    listSearch() {
      console.log(1);
      const self = this;
      const data = {
        pageNum: self.pageNo,
        pageSize: self.wgpageSize,
        startDate: self.tableStartTime,
        endDate: self.tableEndTime,
        type: 2,
        tabId: self.willbegoldtabs
      };

      this.msgListLoading = true;
      this.requestReport.getTableData(data).then((data) => {
        self.msgListData = data;
        self.msgListLoading = false;
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
    }
  },
  mounted() {
    const self = this;

    this.vipCostLineEndTime = gUtils.dateFormat(Date.parse(new Date()), 'yyyy-MM-dd');
    this.vipCostLineStartTime = gUtils.dateFormat(Date.parse(new Date()) - 3600 * 1000 * 24 * 7, 'yyyy-MM-dd');
    this.graphEndTime = gUtils.dateFormat(Date.parse(new Date()), 'yyyy-MM-dd');
    this.graphStartTime = gUtils.dateFormat(Date.parse(new Date()) - 3600 * 1000 * 24 * 7, 'yyyy-MM-dd');
    this.graphEndTime01 = gUtils.dateFormat(Date.parse(new Date()), 'yyyy-MM-dd');
    this.graphStartTime01 = gUtils.dateFormat(Date.parse(new Date()) - 3600 * 1000 * 24 * 7, 'yyyy-MM-dd');

    //        setTimeout(function(){
    //          // 折线图数据
    //          self.dataQueryUrlTimeDistrib = {
    //            date: ['10/01','10/02','10/03','10/04','10/05','10/06','10/07'], // x轴时间
    //            data: [1,3,4,6,7,8] // 数据
    //          }
    //        },1000),

    // 会员价值初始化
    this.vipCostLineData();
    this.vipCostListSearch();
    // 准银卡现状初始化
    this.listSearch01();
    this.graphData01();
    // 将达到银卡初始化
    this.listSearch();
    this.graphData();
  }
};
</script>

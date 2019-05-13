<template>
  <div v-loading="msgListLoading" class="vip-content" id="vip-filter">
    <div class="vip-head-tool">
      <p class="template-brand"><i></i>会员筛选</p>
      <div class="clear"></div>
    </div>
    <!--<div class="vip-filter-search">-->
    <!--<el-input :maxlength="40" placeholder="登录名、手机号、邮箱" icon="search" v-model="matchField" :on-icon-click="handleIconClick" @keyup.enter.native="handleIconClick"-->
    <!--style="width: 300px"> </el-input>-->
    <!--</div>-->
    <div class="vip-filter-advanced-search">
      <!-- <p class="template-brand"><i></i>用户范围</p> -->
      <div class="vip-filter-option">
        <span class="option-label">用户范围选择</span>
        <div>
          <el-radio-group v-model="searchOption.type" @change="typeChange">
            <el-radio label="1">线上用户</el-radio>
            <el-radio label="2">线下用户</el-radio>
          </el-radio-group>
        </div>
      </div>

      <!-- <p class="template-brand"><i></i>标签</p> -->
      <div>
        <div>
          <!-- <span class="label-title" style="margin-top: 8px">基础标签</span> -->
          <div class="tags-box vip-filter-option">
            <span class="option-label">用户标签选择</span>
            <el-select v-model="searchOption.queryParam.tagIdsFlag" style="margin-right:5px">
              <el-option v-for="item in tagIdsFlag" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <!-- <el-checkbox style="margin-right:10px;" v-model="searchOption.queryParam.tagIdsFlag" true-label="or" false-label="and">包含所选标签</el-checkbox> -->
            <!-- <span class="delete-span" v-for="(tag, index) in searchOption.queryParam.tagIdsArr" style="margin-right: 10px;">{{tag | nameFilter}}<a href="javascript:;" @click="removeItem('tagIdsArr',index)"><i class="iconfont icon-guanbi1"></i></a></span> -->
            <el-tag
              v-for="(tag, index) in searchOption.queryParam.tagIdsArr"
              :key="tag.tagName"
              :closable="true"
              type="primary"
              @close="removeItem('tagIdsArr', index)"
            >
              {{ tag.name }}
            </el-tag>
            <el-button type="text" @click="selectBaseTag" style="margin-left:10px;">点击筛选</el-button>
          </div>
        </div>
        <!--         <div>
          <span class="label-title" style="margin-top: 8px">业务标签</span>
          <div class="tags-box">
            <span class="delete-span" v-for="(tag, index) in searchOption.queryParam.businessTagArr" style="margin-right: 10px;">{{tag | nameFilter}}<a href="javascript:;" @click="removeItem('businessTagArr',index)"><i class="iconfont icon-guanbi1"></i></a></span>
          <el-button type="primary" @click="selectBusinessTag">点击筛选</el-button>
          </div>
        </div> -->
      </div>

      <el-tabs v-model="flterTab" type="card">
        <el-tab-pane v-if="searchOption.type != 2" label="会员等级/成长值筛选" name="first">
          <!-- 等级／成长值 -->
          <!-- <p v-if="searchOption.type != 2" class="template-brand"><i></i>等级/成长值</p> -->
          <el-tabs v-if="searchOption.type != 2" v-model="rankTab" type="border-card">
            <el-tab-pane label="海尔" name="haier">
              <div class="vip-filter-label">
                <div v-if="rankList.length > 0">
                  <span class="label-title">会员级别</span>
                  <el-checkbox-group v-model="searchOption.queryParam.hrRankId" style="display: inline-block">
                    <el-checkbox v-if="rank.status == 1" v-for="rank in rankList" :label="rank.id">{{
                      rank.rankName
                    }}</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div>
                  <span class="label-title">会员成长值</span>
                  <span>时间</span>
                  <el-select v-model="searchOption.queryParam.hrGrowupValueMatch" placeholder="请选择">
                    <el-option v-for="item in dataRange" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <span style="margin-left: 34px;">成长值</span>
                  <el-input
                    :maxlength="8"
                    @keyup.native="
                      searchOption.queryParam.hrGrowupValueContentArr[0].value = searchOption.queryParam.hrGrowupValueContentArr[0].value.replace(
                        /[^0-9]+/,
                        ''
                      )
                    "
                    v-model="searchOption.queryParam.hrGrowupValueContentArr[0].value"
                    style="width: 143px;"
                  ></el-input>
                  <span>—</span>
                  <el-input
                    :maxlength="8"
                    @keyup.native="
                      searchOption.queryParam.hrGrowupValueContentArr[1].value = searchOption.queryParam.hrGrowupValueContentArr[1].value.replace(
                        /[^0-9]+/,
                        ''
                      )
                    "
                    v-model="searchOption.queryParam.hrGrowupValueContentArr[1].value"
                    style="width: 143px;"
                  ></el-input>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="卡萨帝" name="casarte">
              <div class="vip-filter-label">
                <div v-if="caRankList.length > 0">
                  <span class="label-title">会员级别</span>
                  <el-checkbox-group v-model="searchOption.queryParam.caRankId" style="display: inline-block">
                    <el-checkbox v-if="rank.status == 1" v-for="rank in caRankList" :label="rank.id">{{
                      rank.rankName
                    }}</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div>
                  <span class="label-title">会员成长值</span>
                  <span>时间</span>
                  <el-select v-model="searchOption.queryParam.caGrowupValueMatch" placeholder="请选择">
                    <el-option v-for="item in dataRange" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <span style="margin-left: 34px;">成长值</span>
                  <el-input
                    :maxlength="8"
                    @keyup.native="
                      searchOption.queryParam.caGrowupValueContentArr[0].value = searchOption.queryParam.caGrowupValueContentArr[0].value.replace(
                        /[^0-9]+/,
                        ''
                      )
                    "
                    v-model="searchOption.queryParam.caGrowupValueContentArr[0].value"
                    style="width: 143px;"
                  ></el-input>
                  <span>—</span>
                  <el-input
                    :maxlength="8"
                    @keyup.native="
                      searchOption.queryParam.caGrowupValueContentArr[1].value = searchOption.queryParam.caGrowupValueContentArr[1].value.replace(
                        /[^0-9]+/,
                        ''
                      )
                    "
                    v-model="searchOption.queryParam.caGrowupValueContentArr[1].value"
                    style="width: 143px;"
                  ></el-input>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane v-if="searchOption.type != 2" label="交互行为筛选" name="second">
          <!-- 交互行为 -->
          <!-- <p v-if="searchOption.type != 2" class="template-brand"><i></i>交互行为</p> -->
          <el-tabs v-if="searchOption.type != 2" v-model="vipTab" type="border-card">
            <el-tab-pane label="海尔" name="haier">
              <div class="vip-filter-label">
                <div>
                  <span class="label-title">积分</span>
                  <span>时间</span>
                  <el-select v-model="searchOption.queryParam.hrIntegrateMatch" placeholder="请选择">
                    <el-option v-for="item in dataRange" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <span style="margin-left: 34px;">积分</span>
                  <el-input
                    :maxlength="8"
                    @keyup.native="
                      searchOption.queryParam.hrIntegrateContentArr[0].value = searchOption.queryParam.hrIntegrateContentArr[0].value.replace(
                        /[^0-9]+/,
                        ''
                      )
                    "
                    v-model="searchOption.queryParam.hrIntegrateContentArr[0].value"
                    style="width: 143px;"
                  ></el-input>
                  <span>—</span>
                  <el-input
                    :maxlength="8"
                    @keyup.native="
                      searchOption.queryParam.hrIntegrateContentArr[1].value = searchOption.queryParam.hrIntegrateContentArr[1].value.replace(
                        /[^0-9]+/,
                        ''
                      )
                    "
                    v-model="searchOption.queryParam.hrIntegrateContentArr[1].value"
                    style="width: 143px;"
                  ></el-input>
                </div>
                <div style="margin-bottom: 0">
                  <span class="label-title">交互行为</span>
                  <span>时间</span>
                  <el-select
                    v-model="searchOption.queryParam.hrActionMatch"
                    placeholder="请选择"
                    style="margin-right: 35px;margin-bottom: 10px;"
                  >
                    <el-option v-for="item in dataRange" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <!-- <span class="delete-span" v-for="(tag, index) in searchOption.queryParam.hrActionContent" style="margin-right: 10px;margin-bottom: 10px;">{{tag | nameFilter}}<a href="javascript:;" @click="removeItem('hrActionContent',index)"><i class="iconfont icon-guanbi1"></i></a></span> -->
                  <el-tag
                    v-for="(tag, index) in searchOption.queryParam.hrActionContent"
                    :key="tag"
                    :closable="true"
                    type="primary"
                    @close="removeItem('hrActionContent', index)"
                  >
                    {{ tag | nameFilter }}
                  </el-tag>
                  <el-button type="text" @click="selectAction">点击选择</el-button>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="卡萨帝" name="casarte">
              <div class="vip-filter-label">
                <div>
                  <span class="label-title">积分</span>
                  <span>时间</span>
                  <el-select v-model="searchOption.queryParam.caIntegrateMatch" placeholder="请选择">
                    <el-option v-for="item in dataRange" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <span style="margin-left: 34px;">积分</span>
                  <el-input
                    :maxlength="8"
                    @keyup.native="
                      searchOption.queryParam.caIntegrateContentArr[0].value = searchOption.queryParam.caIntegrateContentArr[0].value.replace(
                        /[^0-9]+/,
                        ''
                      )
                    "
                    v-model="searchOption.queryParam.caIntegrateContentArr[0].value"
                    style="width: 143px;"
                  ></el-input>
                  <span>—</span>
                  <el-input
                    :maxlength="8"
                    @keyup.native="
                      searchOption.queryParam.caIntegrateContentArr[1].value = searchOption.queryParam.caIntegrateContentArr[1].value.replace(
                        /[^0-9]+/,
                        ''
                      )
                    "
                    v-model="searchOption.queryParam.caIntegrateContentArr[1].value"
                    style="width: 143px;"
                  ></el-input>
                </div>
                <div style="margin-bottom: 0">
                  <span class="label-title">交互行为</span>
                  <span>时间</span>
                  <el-select
                    v-model="searchOption.queryParam.caActionMatch"
                    placeholder="请选择"
                    style="margin-right: 35px;margin-bottom: 10px;"
                  >
                    <el-option v-for="item in dataRange" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <!-- <span class="delete-span" v-for="(tag, index) in searchOption.queryParam.caActionContent" style="margin-right: 10px;margin-bottom: 10px;">{{tag | nameFilter}}<a href="javascript:;" @click="removeItem('caActionContent',index)"><i class="iconfont icon-guanbi1"></i></a></span> -->
                  <el-tag
                    v-for="(tag, index) in searchOption.queryParam.caActionContent"
                    :key="tag"
                    :closable="true"
                    type="primary"
                    @close="removeItem('caActionContent', index)"
                  >
                    {{ tag | nameFilter }}
                  </el-tag>
                  <el-button type="text" @click="selectAction">点击选择</el-button>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="产品购买筛选" name="third">
          <!-- <p class="template-brand"><i></i>产品购买</p> -->
          <el-tabs v-model="goodsTab" type="border-card">
            <el-tab-pane label="海尔" name="haier">
              <div class="vip-filter-label">
                <div>
                  <span class="label-title">准金银卡</span>
                  <el-radio-group v-model="searchOption.queryParam.hrRankTransformType">
                    <el-radio :label="1">准金卡</el-radio>
                    <el-radio :label="2">准银卡</el-radio>
                  </el-radio-group>
                </div>
                <div>
                  <span class="label-title">产品购买时间</span>
                  <span>时间</span>
                  <el-select v-model="searchOption.queryParam.hrBugProductMatch" placeholder="请选择">
                    <el-option v-for="item in dataRange" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <span style="margin-left: 34px;">购买产品类别</span>
                  <el-input
                    :maxlength="8"
                    @keyup.native="
                      searchOption.queryParam.hrBugProductTypeContent = searchOption.queryParam.hrBugProductTypeContent.replace(
                        /[^0-9]+/,
                        ''
                      )
                    "
                    style="width: 60px;"
                    v-model="searchOption.queryParam.hrBugProductTypeContent"
                  ></el-input>
                  <span>类以上</span>
                  <span style="margin-left: 34px;">购买金额</span>
                  <el-input
                    :maxlength="8"
                    @keyup.native="
                      searchOption.queryParam.hrBugProductAmountContentArr[0].value = searchOption.queryParam.hrBugProductAmountContentArr[0].value.replace(
                        /[^0-9]+/,
                        ''
                      )
                    "
                    type="number"
                    v-model="searchOption.queryParam.hrBugProductAmountContentArr[0].value"
                    style="width: 80px;"
                  ></el-input>
                  <span>—</span>
                  <el-input
                    :maxlength="8"
                    @keyup.native="
                      searchOption.queryParam.hrBugProductAmountContentArr[1].value = searchOption.queryParam.hrBugProductAmountContentArr[1].value.replace(
                        /[^0-9]+/,
                        ''
                      )
                    "
                    type="number"
                    v-model="searchOption.queryParam.hrBugProductAmountContentArr[1].value"
                    style="width: 80px;"
                  ></el-input>
                </div>
                <div v-if="searchOption.type != 2">
                  <span class="label-title">产品注册时间</span>
                  <span>时间</span>
                  <el-select v-model="searchOption.queryParam.hrRegProductAmountMatch" placeholder="请选择">
                    <el-option v-for="item in dataRange" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <span style="margin-left: 34px;">注册金额</span>
                  <el-input
                    :maxlength="8"
                    @keyup.native="
                      searchOption.queryParam.hrRegProductAmountContentArr[0].value = searchOption.queryParam.hrRegProductAmountContentArr[0].value.replace(
                        /[^0-9]+/,
                        ''
                      )
                    "
                    v-model="searchOption.queryParam.hrRegProductAmountContentArr[0].value"
                    style="width: 80px;"
                  ></el-input>
                  <span>—</span>
                  <el-input
                    :maxlength="8"
                    @keyup.native="
                      searchOption.queryParam.hrRegProductAmountContentArr[1].value = searchOption.queryParam.hrRegProductAmountContentArr[1].value.replace(
                        /[^0-9]+/,
                        ''
                      )
                    "
                    v-model="searchOption.queryParam.hrRegProductAmountContentArr[1].value"
                    style="width: 80px;"
                  ></el-input>
                </div>
                <div v-if="searchOption.type != 2">
                  <span class="label-title">购买注册情况</span>
                  <el-radio-group v-model="searchOption.queryParam.hrBuyAndRegType">
                    <el-radio :label="1">购买未注册</el-radio>
                    <el-radio :label="2">部分产品注册</el-radio>
                    <el-radio :label="3">全部产品注册</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="卡萨帝" name="casarte">
              <div class="vip-filter-label">
                <div>
                  <span class="label-title">准金银卡</span>
                  <el-radio-group v-model="searchOption.queryParam.caRankTransformType">
                    <el-radio :label="1">准金卡</el-radio>
                    <el-radio :label="2">准银卡</el-radio>
                  </el-radio-group>
                </div>
                <div>
                  <span class="label-title">产品购买时间</span>
                  <span>时间</span>
                  <el-select v-model="searchOption.queryParam.caBugProductMatch" placeholder="请选择">
                    <el-option v-for="item in dataRange" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <span style="margin-left: 34px;">购买产品类别</span>
                  <el-input
                    :maxlength="8"
                    @keyup.native="
                      searchOption.queryParam.caBugProductTypeContent = searchOption.queryParam.caBugProductTypeContent.replace(
                        /[^0-9]+/,
                        ''
                      )
                    "
                    style="width: 60px;"
                    v-model="searchOption.queryParam.caBugProductTypeContent"
                  ></el-input>
                  <span>类以上</span>
                  <span style="margin-left: 34px;">购买金额</span>
                  <el-input
                    :maxlength="8"
                    @keyup.native="
                      searchOption.queryParam.caBugProductAmountContentArr[0].value = searchOption.queryParam.caBugProductAmountContentArr[0].value.replace(
                        /[^0-9]+/,
                        ''
                      )
                    "
                    v-model="searchOption.queryParam.caBugProductAmountContentArr[0].value"
                    style="width: 80px;"
                  ></el-input>
                  <span>—</span>
                  <el-input
                    :maxlength="8"
                    @keyup.native="
                      searchOption.queryParam.caBugProductAmountContentArr[1].value = searchOption.queryParam.caBugProductAmountContentArr[1].value.replace(
                        /[^0-9]+/,
                        ''
                      )
                    "
                    v-model="searchOption.queryParam.caBugProductAmountContentArr[1].value"
                    style="width: 80px;"
                  ></el-input>
                </div>
                <div v-if="searchOption.type != 2">
                  <span class="label-title">产品注册时间</span>
                  <span>时间</span>
                  <el-select v-model="searchOption.queryParam.caRegProductAmountMatch" placeholder="请选择">
                    <el-option v-for="item in dataRange" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <span style="margin-left: 34px;">注册金额</span>
                  <el-input
                    :maxlength="8"
                    @keyup.native="
                      searchOption.queryParam.caRegProductAmountContentArr[0].value = searchOption.queryParam.caRegProductAmountContentArr[0].value.replace(
                        /[^0-9]+/,
                        ''
                      )
                    "
                    v-model="searchOption.queryParam.caRegProductAmountContentArr[0].value"
                    style="width: 80px;"
                  ></el-input>
                  <span>—</span>
                  <el-input
                    :maxlength="8"
                    @keyup.native="
                      searchOption.queryParam.caRegProductAmountContentArr[1].value = searchOption.queryParam.caRegProductAmountContentArr[1].value.replace(
                        /[^0-9]+/,
                        ''
                      )
                    "
                    v-model="searchOption.queryParam.caRegProductAmountContentArr[1].value"
                    style="width: 80px;"
                  ></el-input>
                </div>
                <div v-if="searchOption.type != 2">
                  <span class="label-title">购买注册情况</span>
                  <el-radio-group v-model="searchOption.queryParam.caBuyAndRegType">
                    <el-radio :label="1">购买未注册</el-radio>
                    <el-radio :label="2">部分产品注册</el-radio>
                    <el-radio :label="3">全部产品注册</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="特殊限制" name="fourth">
          <!-- <p class="template-brand"><i></i>特殊限制</p> -->
          <el-tabs v-model="limitTab" type="border-card">
            <el-tab-pane label="海尔" name="haier">
              <div class="vip-filter-label">
                <div>
                  <el-checkbox
                    v-if="searchOption.type != 2"
                    v-model="searchOption.queryParam.blackFlag"
                    :true-label="'0'"
                    :false-label="''"
                    style="margin-right: 34px;"
                    >排除黑名单用户</el-checkbox
                  >
                  <span style="margin-right:5px;">排除分组</span>
                  <!-- <span class="delete-span" v-for="(tag, index) in searchOption.queryParam.groupIdsArr" style="margin: 0 10px 10px 0">{{tag | nameFilter}}<a href="javascript:;" @click="removeItem('groupIdsArr',index)"><i class="iconfont icon-guanbi1"></i></a></span> -->
                  <el-tag
                    v-for="(tag, index) in searchOption.queryParam.groupIdsArr"
                    :key="tag"
                    :closable="true"
                    type="primary"
                    @close="removeItem('groupIdsArr', index)"
                  >
                    {{ tag | nameFilter }}
                  </el-tag>
                  <el-button type="text" @click="selectGroup" style="margin: 0 10px;line-height: 17px;"
                    >点击筛选</el-button
                  >
                </div>
                <div>
                  <span class="label-title">排除</span>
                  <span>时间</span>
                  <el-select v-model="searchOption.queryParam.hrContactMatch" placeholder="请选择">
                    <el-option v-for="item in dataRange" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <span style="margin: 0 10px 0 34px;">通过</span>
                  <el-checkbox v-model="searchOption.queryParam.hrSmsContactContent" :true-label="-1" :false-label="0"
                    >短信</el-checkbox
                  >
                  <el-checkbox
                    v-if="searchOption.type != 2"
                    v-model="searchOption.queryParam.hrWeixinContactContent"
                    :true-label="-1"
                    :false-label="0"
                    >微信</el-checkbox
                  >
                  <el-checkbox
                    v-if="searchOption.type != 2"
                    v-model="searchOption.queryParam.hrSiteMsgContactContent"
                    :true-label="-1"
                    :false-label="0"
                    >站内信</el-checkbox
                  >
                  <span style="margin-left: 10px;">有过交互</span>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="卡萨帝" name="casarte">
              <div class="vip-filter-label">
                <div>
                  <el-checkbox
                    v-if="searchOption.type != 2"
                    v-model="searchOption.queryParam.blackFlag"
                    :true-label="'0'"
                    :false-label="'1'"
                    style="margin-right: 34px;"
                    >排除黑名单用户</el-checkbox
                  >
                  <span style="margin-right:5px;">排除分组</span>
                  <!-- <span class="delete-span" v-for="(tag, index) in searchOption.queryParam.groupIdsArr" style="margin: 0 10px 10px 0">{{tag | nameFilter}}<a href="javascript:;" @click="removeItem('groupIdsArr',index)"><i class="iconfont icon-guanbi1"></i></a></span> -->
                  <el-tag
                    v-for="(tag, index) in searchOption.queryParam.groupIdsArr"
                    :key="tag"
                    :closable="true"
                    type="primary"
                    @close="removeItem('groupIdsArr', index)"
                  >
                    {{ tag | nameFilter }}
                  </el-tag>
                  <el-button type="text" @click="selectGroup" style="margin: 0 10px;line-height: 17px;"
                    >点击筛选</el-button
                  >
                </div>
                <div>
                  <span class="label-title">排除</span>
                  <span>时间</span>
                  <el-select v-model="searchOption.queryParam.caContactMatch" placeholder="请选择">
                    <el-option v-for="item in dataRange" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                  <span style="margin: 0 10px 0 34px;">通过</span>
                  <el-checkbox v-model="searchOption.queryParam.caSmsContactContent" :true-label="-1" :false-label="0"
                    >短信</el-checkbox
                  >
                  <el-checkbox
                    v-if="searchOption.type != 2"
                    v-model="searchOption.queryParam.caWeixinContactContent"
                    :true-label="-1"
                    :false-label="0"
                    >微信</el-checkbox
                  >
                  <el-checkbox
                    v-if="searchOption.type != 2"
                    v-model="searchOption.queryParam.caSiteMsgContactContent"
                    :true-label="-1"
                    :false-label="0"
                    >站内信</el-checkbox
                  >
                  <span style="margin-left: 10px;">有过交互</span>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
    </div>

    <p id="group-filter" style="display:none">{{ searchOption | descFilter(rankList, caRankList) }}</p>
    <div class="group-filter">
      <el-tag v-for="(tag, index) in searchOptionArr" :key="tag" type="primary" close-transition>{{ tag }}</el-tag>
    </div>
    <!-- <el-button type="primary" @click="addGroup">添加用户分组</el-button> -->

    <div style="padding: 20px 0;text-align:center;">
      <el-button type="primary" @click="queryMember(1)">确定</el-button>
      <el-button @click="reset">重置</el-button>
    </div>

    <div v-if="msgListData.entities" name="list">
      <p class="template-brand" style="margin-top: 25px;">
        <i></i>会员数据
        <span v-if="msgListData.entityCount" style="font-size: 14px;"
          >本次筛选共有：{{ msgListData.entityCount }}人</span
        >
      </p>

      <!-- <div v-if="msgListData.entityCount" style="margin-top: -15px; margin-bottom: 15px;">
        <el-button v-if="jurisdiction['member:memberManger:setMemberGroup'] && !isMatch" type="primary" @click="addGroup">添加用户分组</el-button>
        <el-button v-if="jurisdiction['member:memberManger:setMemberTab'] && !isMatch" type="primary" @click="addTags">设置标签</el-button>
        <el-button v-if="jurisdiction['member:memberManger:setRights'] && getUserInfo.brandName == 'haier' && !isMatch" type="primary" @click="addRight">添加权益</el-button>
      </div> -->

      <div>
        <el-table :data="msgListData.entities" style="width: 100%">
          <el-table-column prop="templateName" label="序号" width="50">
            <template slot-scope="scope">
              {{ (msgListData.pageNo - 1) * msgListData.pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column v-if="isOnline" prop="loginAccountName" label="登录名"> </el-table-column>
          <el-table-column v-if="isOnline" prop="rankName" label="会员级别"> </el-table-column>
          <el-table-column prop="mobile" label="手机号"> </el-table-column>
          <el-table-column v-if="isOnline" prop="email" label="邮箱">
            <template slot-scope="scope">
              {{ scope.row.email }}
            </template>
          </el-table-column>
          <el-table-column v-if="isOnline" label="操作">
            <template slot-scope="scope">
              <!-- @click="toDetail(scope.row.userId)" -->
              <a
                v-if="jurisdiction['member:memberManager:query']"
                :href="'./#/vip/userinfo?id=' + scope.row.userId"
                class="operation-btn"
                target="_blank"
              >
                <i class="iconfont icon-xiugai"></i>查看</a
              >
              <!-- <a v-if="jurisdiction['member:memberGroupManger:delete']" href="javascript:;" class="color-link operation-btn" @click="deleteTpl(scope.row.id)"><i class="iconfont icon-shanchu-copy"></i>删除</a> -->
            </template>
          </el-table-column>
        </el-table>
        <!--         <el-pagination v-if="!isMatch" @size-change="handleSizeChange" @current-change="handleCurrentChange" border :current-page.sync="pageNo" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="sizes, prev, pager, next" :total="msgListData.entityCount">
        </el-pagination> -->
      </div>
    </div>

    <select-group
      :dialogChange="groupDialogChange"
      :form="searchOption.type"
      :random="groupDialog.random"
      :dialogDisplay="groupDialog.display"
      :closeDialog="closeGroupDialog"
    ></select-group>

    <select-action
      :dialogChange="actionDialogChange"
      :form="vipTab"
      :random="actionDialog.random"
      :dialogDisplay="actionDialog.display"
      :closeDialog="closeActionDialog"
      :site="vipTab"
    ></select-action>

    <!-- <business-tag :dialogChange="businessTagDialogChange" :form="searchOption.queryParam.businessTagIds" :random="businessTagDialog.random"
      :dialogDisplay="businessTagDialog.display" :closeDialog="closeBusinessTagDialog"></business-tag> -->

    <base-tag
      ref="base-tag-ref"
      :dialogChange="baseTagDialogChange"
      :form="searchOption.type"
      :random="baseTagDialog.random"
      :dialogDisplay="baseTagDialog.display"
      :closeDialog="closeBaseTagDialog"
      :init="searchOption.queryParam.groupIdsArr"
      :thedata="digData"
    ></base-tag>

    <add-group
      :dialogChange="addGroupDialogChange"
      :form="searchOption"
      :random="addGroupDialog.random"
      :dialogDisplay="addGroupDialog.display"
      :closeDialog="closeAddGroupDialog"
      :memberCount="memberCount"
    ></add-group>

    <!-- <add-tags :dialogChange="addTagsDialogChange" :form="searchOption" :random="addTagsDialog.random" :dialogDisplay="addTagsDialog.display"  :closeDialog="closeAddTagsDialog"></add-tags> -->

    <!-- <add-right :dialogChange="addRightDialogChange" :form="searchOption" :random="addRightDialog.random" :dialogDisplay="addRightDialog.display"  :closeDialog="closeAddRightDialog"></add-right> -->

    <a href="javascript:void(0)" target="_blank" id="openWindow"></a>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex';
import selectGroup from './dialog/group.vue';
import selectAction from './dialog/action.vue';
// import businessTag from "./dialog/businessTag.vue";
import baseTag from './dialog/baseTag.vue';
import addGroup from './dialog/addGroup.vue';
// import addTags from './dialog/addTags.vue';
// import addRight from './dialog/addRight.vue';

export default {
  components: {
    selectGroup,
    selectAction,
    // businessTag,
    baseTag,
    addGroup
    // addTags,
    // addRight
  },
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction',
      getUserInfo: 'getUserInfo'
    })
  },
  data() {
    return {
      digData: [],
      searchOptionArr: [],
      isMatch: true,
      flterTab: 'first',
      groupDialog: {
        display: false,
        random: Math.random()
      },
      actionDialog: {
        display: false,
        random: Math.random()
      },
      businessTagDialog: {
        display: false,
        random: Math.random()
      },
      baseTagDialog: {
        display: false,
        random: Math.random()
      },
      addGroupDialog: {
        display: false,
        random: Math.random()
      },
      // addTagsDialog: {
      //   display: false,
      //   random: Math.random()
      // },
      // addRightDialog: {
      //   display: false,
      //   random: Math.random()
      // },
      matchField: '', // 会员检索
      vipTab: 'haier',
      rankTab: 'haier',
      goodsTab: 'haier',
      limitTab: 'haier',
      dataRange: [
        {
          value: 1,
          label: '全部'
        },
        {
          value: 2,
          label: '近一月'
        },
        {
          value: 3,
          label: '近三个月'
        },
        {
          value: 4,
          label: '近半年'
        },
        {
          value: 5,
          label: '近一年'
        }
      ],
      tagIdsFlag: [
        {
          value: 'or',
          label: '包含所选任一标签'
        },
        {
          value: 'and',
          label: '包含所选所有标签'
        }
      ],
      rankList: [], // 会员等级
      caRankList: [], // 会员等级
      hrRankId: [],
      hrGrowupValueContent: [
        {
          value: ''
        },
        {
          value: ''
        }
      ], // 成长值范围
      hrIntegrateContent: [
        {
          value: ''
        },
        {
          value: ''
        }
      ], // 积分范围
      // hrBuyAndRegType: '',
      contactContent: [], // 交互方式
      // type: '1', // 用户范围
      pageNo: 1,
      msgListLoading: false,
      pageSize: 10,
      msgListData: {}, // 会员列表
      memberCount: 0,
      // hrContactMatch: 0, // 特殊限制时间
      // caContactMatch: 0, // 特殊限制时间'
      isOnline: true,
      searchOption: {
        type: '1',
        queryParam: {
          tagIdsFlag: 'and',
          tagIds: '',
          tagIdsArr: '',
          businessTagArr: '',
          businessTagIds: '',
          hrRankId: [],
          caRankId: [],
          hrGrowupValueMatch: 1,
          caGrowupValueMatch: 1,
          hrIntegrateMatch: 1,
          caIntegrateMatch: 1,
          hrBuyAndRegType: '1',
          blackFlag: '',
          groupIds: '',
          groupIdsArr: '',
          hrGrowupValueContentArr: [
            {
              value: ''
            },
            {
              value: ''
            }
          ],
          hrGrowupValueContent: '',
          caGrowupValueContentArr: [
            {
              value: ''
            },
            {
              value: ''
            }
          ],
          caGrowupValueContent: '',
          hrIntegrateContentArr: [
            {
              value: ''
            },
            {
              value: ''
            }
          ],
          hrIntegrateContent: '',
          caIntegrateContentArr: [
            {
              value: ''
            },
            {
              value: ''
            }
          ],
          caIntegrateContent: '',
          hrActionMatch: 1,
          caActionMatch: 1,
          hrActionContent: [],
          caActionContent: [],
          hrBugProductAmountContentArr: [
            {
              value: ''
            },
            {
              value: ''
            }
          ],
          hrBugProductAmountContent: '',
          hrBugProductMatch: 1,
          hrBugProductTypeContent: '',
          caBugProductMatch: 1,
          caBugProductTypeContent: '',
          caBugProductAmountContentArr: [
            {
              value: ''
            },
            {
              value: ''
            }
          ],
          caBugProductAmountContent: '',
          hrBugProductAmountMatch: 1,
          hrRegProductAmountMatch: 1, // 产品注册时间
          hrRegProductAmountContentArr: [
            {
              value: ''
            },
            {
              value: ''
            }
          ], // 产品注册金额
          hrRegProductAmountContent: '', // 产品注册金额
          caRegProductAmountMatch: 1,
          caRegProductAmountContentArr: [
            {
              value: ''
            },
            {
              value: ''
            }
          ],
          caRegProductAmountContent: '',
          hrBuyAndRegType: '', // 购买注册情况：1-购买未注册 2-部分产品注册 3-全部产品注册
          caBuyAndRegType: '',
          hrContactMatch: 1,
          // hrWeixinContactMatch: this.hrContactMatch, //沟通管理，1代表沟通过，-1代表没有沟通过
          hrWeixinContactContent: '',
          // hrEmailContactMatch: this.hrContactMatch,
          hrEmailContactContent: '',
          // hrSmsContactMatch: this.hrContactMatch,
          hrSmsContactContent: '',
          // hrSiteMsgContactMatch: this.hrContactMatch,
          hrSiteMsgContactContent: '',
          // caWeixinContactMatch: this.caContactMatch,
          caContactMatch: 1,
          caWeixinContactContent: '',
          // caEmailContactMatch: this.caContactMatch,
          caEmailContactContent: '',
          // caSmsContactMatch: this.caContactMatch,
          caSmsContactContent: '',
          // caSiteMsgContactMatch: this.caContactMatch,
          caSiteMsgContactContent: '',
          hrRankTransformType: '',
          caRankTransformType: ''
        }
      } // 高级检索参数
    };
  },
  filters: {
    nameFilter(value) {
      if (value.indexOf(':') > 0) {
        value = value.split(':')[1];
      }
      return value;
    },
    phoneFilter(value) {
      return `${value.substr(0, 3)}****${value.substr(7, 10)}`;
    },
    mailFilter(value) {
      if (value) {
        return `***@${value.split('@')[1]}`;
      }
    }
  },
  methods: {
    // 限制长度
    limitlength(e) {
      e = e.slice(0, 3);
    },
    typeChange(type) {
      if (type == 2) {
        this.flterTab = 'third';
      } else {
        this.flterTab = 'first';
      }
    },
    reset() {
      this.searchOption = {
        type: '1',
        queryParam: {
          tagIdsFlag: 'and',
          tagIds: '',
          tagIdsArr: '',
          businessTagArr: '',
          businessTagIds: '',
          hrRankId: [],
          caRankId: [],
          hrGrowupValueMatch: 1,
          caGrowupValueMatch: 1,
          hrIntegrateMatch: 1,
          caIntegrateMatch: 1,
          hrBuyAndRegType: '1',
          blackFlag: '',
          groupIds: '',
          groupIdsArr: '',
          hrGrowupValueContentArr: [
            {
              value: ''
            },
            {
              value: ''
            }
          ],
          hrGrowupValueContent: '',
          caGrowupValueContentArr: [
            {
              value: ''
            },
            {
              value: ''
            }
          ],
          caGrowupValueContent: '',
          hrIntegrateContentArr: [
            {
              value: ''
            },
            {
              value: ''
            }
          ],
          hrIntegrateContent: '',
          caIntegrateContentArr: [
            {
              value: ''
            },
            {
              value: ''
            }
          ],
          caIntegrateContent: '',
          hrActionMatch: 1,
          caActionMatch: 1,
          hrActionContent: [],
          caActionContent: [],
          hrBugProductAmountContentArr: [
            {
              value: ''
            },
            {
              value: ''
            }
          ],
          hrBugProductAmountContent: '',
          hrBugProductMatch: 1,
          hrBugProductTypeContent: '',
          caBugProductMatch: 1,
          caBugProductTypeContent: '',
          caBugProductAmountContentArr: [
            {
              value: ''
            },
            {
              value: ''
            }
          ],
          caBugProductAmountContent: '',
          hrBugProductAmountMatch: 1,
          hrRegProductAmountMatch: 1, // 产品注册时间
          hrRegProductAmountContentArr: [
            {
              value: ''
            },
            {
              value: ''
            }
          ], // 产品注册金额
          hrRegProductAmountContent: '', // 产品注册金额
          caRegProductAmountMatch: 1,
          caRegProductAmountContentArr: [
            {
              value: ''
            },
            {
              value: ''
            }
          ],
          caRegProductAmountContent: '',
          hrBuyAndRegType: '', // 购买注册情况：1-购买未注册 2-部分产品注册 3-全部产品注册
          caBuyAndRegType: '',
          hrContactMatch: 1,
          // hrWeixinContactMatch: this.hrContactMatch, //沟通管理，1代表沟通过，-1代表没有沟通过
          hrWeixinContactContent: '',
          // hrEmailContactMatch: this.hrContactMatch,
          hrEmailContactContent: '',
          // hrSmsContactMatch: this.hrContactMatch,
          hrSmsContactContent: '',
          // hrSiteMsgContactMatch: this.hrContactMatch,
          hrSiteMsgContactContent: '',
          // caWeixinContactMatch: this.caContactMatch,
          caContactMatch: 1,
          caWeixinContactContent: '',
          // caEmailContactMatch: this.caContactMatch,
          caEmailContactContent: '',
          // caSmsContactMatch: this.caContactMatch,
          caSmsContactContent: '',
          // caSiteMsgContactMatch: this.caContactMatch,
          caSiteMsgContactContent: '',
          hrRankTransformType: '',
          caRankTransformType: ''
        }
      }; // 高级检索参数
    },
    removeItem(type, index) {
      this.searchOption.queryParam[type].splice(index, 1);
    },
    // 跳转模板详情
    toDetail(id) {
      this.$router.push({
        path: '/vip/userinfo',
        query: {
          id
        }
      });
    },
    handleIconClick() {
      this.pageNo = 1;
      this.listSearch();
    },
    // 登录名、手机号、邮箱检索
    listSearch() {
      const self = this;
      if (self.matchField) {
        const data = {
          pageNum: self.pageNo,
          pageSize: self.pageSize,
          matchField: self.matchField || ' ',
          type: self.searchOption.type // 精确查找默认查询线上用户
        };

        this.msgListLoading = true;
        this.requestVip.matchMember(data).then((result) => {
          self.msgListData = result;
          self.msgListLoading = false;
          self.isMatch = true;

          if (result.entities && result.entities[0]) {
            window.open(`./#/vip/userinfo?id=${result.entities[0].userId}`);
          }

          if (data.type != 1) {
            self.isOnline = false;
          } else {
            self.isOnline = true;
          }

          $('#app-view').scrollTop(15000);
        });
      }
    },
    handleSizeChange(pageSize) {
      if (!this.msgListLoading) {
        this.pageNo = 1;
        this.pageSize = pageSize;
        this.queryMember();
      }
    },
    handleCurrentChange(pageNo) {
      if (!this.msgListLoading) {
        this.pageNo = pageNo;
        this.queryMember();
      }
    },
    // 获取会员等级
    getRankList() {
      const self = this;
      this.requestVip
        .queryPageByBrandName({
          pageNum: 1,
          pageSize: 100,
          brandName: 'haier'
        })
        .then((data) => {
          if (data.entities) {
            self.rankList = data.entities;
          } else {
            self.rankList = [];
          }
        });

      this.requestVip
        .queryPageByBrandName({
          pageNum: 1,
          pageSize: 100,
          brandName: 'casarte'
        })
        .then((data) => {
          if (data.entities) {
            self.caRankList = data.entities;
          } else {
            self.caRankList = [];
          }
        });
    },
    // 会员筛选
    queryMember(pageNo) {
      const self = this;
      if (this.searchOption.queryParam.hrGrowupValueContentArr[0].value == '') {
        if (this.searchOption.queryParam.hrGrowupValueContentArr[1].value) {
          this.$message({
            type: 'info',
            message: '请填写成长值下限'
          });
          return;
        }
      }
      if (this.searchOption.queryParam.hrGrowupValueContentArr[1].value == '') {
        if (this.searchOption.queryParam.hrGrowupValueContentArr[0].value) {
          this.$message({
            type: 'info',
            message: '请填写成长值上限'
          });
          return;
        }
      }

      if (this.searchOption.queryParam.hrIntegrateContentArr[0].value == '') {
        if (this.searchOption.queryParam.hrIntegrateContentArr[1].value) {
          this.$message({
            type: 'info',
            message: '请填写积分下限'
          });
          return;
        }
      }
      if (this.searchOption.queryParam.hrIntegrateContentArr[1].value == '') {
        if (this.searchOption.queryParam.hrIntegrateContentArr[0].value) {
          this.$message({
            type: 'info',
            message: '请填写积分上限'
          });
          return;
        }
      }

      if (this.searchOption.queryParam.hrBugProductAmountContentArr[0].value == '') {
        if (this.searchOption.queryParam.hrBugProductAmountContentArr[1].value) {
          this.$message({
            type: 'info',
            message: '请填写购买金额下限'
          });
          return;
        }
      }
      if (this.searchOption.queryParam.hrBugProductAmountContentArr[1].value == '') {
        if (this.searchOption.queryParam.hrBugProductAmountContentArr[0].value) {
          this.$message({
            type: 'info',
            message: '请填写购买金额上限'
          });
          return;
        }
      }

      if (this.searchOption.queryParam.hrRegProductAmountContentArr[0].value == '') {
        if (this.searchOption.queryParam.hrRegProductAmountContentArr[1].value) {
          this.$message({
            type: 'info',
            message: '请填写注册金额下限'
          });
          return;
        }
      }
      if (this.searchOption.queryParam.hrRegProductAmountContentArr[1].value == '') {
        if (this.searchOption.queryParam.hrRegProductAmountContentArr[0].value) {
          this.$message({
            type: 'info',
            message: '请填写注册金额上限'
          });
          return;
        }
      }

      // 卡萨帝校验
      if (this.searchOption.queryParam.caGrowupValueContentArr[0].value == '') {
        if (this.searchOption.queryParam.caGrowupValueContentArr[1].value) {
          this.$message({
            type: 'info',
            message: '请填写成长值下限'
          });
          return;
        }
      }
      if (this.searchOption.queryParam.caGrowupValueContentArr[1].value == '') {
        if (this.searchOption.queryParam.caGrowupValueContentArr[0].value) {
          this.$message({
            type: 'info',
            message: '请填写成长值上限'
          });
          return;
        }
      }

      if (this.searchOption.queryParam.caIntegrateContentArr[0].value == '') {
        if (this.searchOption.queryParam.caIntegrateContentArr[1].value) {
          this.$message({
            type: 'info',
            message: '请填写积分下限'
          });
          return;
        }
      }
      if (this.searchOption.queryParam.caIntegrateContentArr[1].value == '') {
        if (this.searchOption.queryParam.caIntegrateContentArr[0].value) {
          this.$message({
            type: 'info',
            message: '请填写积分上限'
          });
          return;
        }
      }

      if (this.searchOption.queryParam.caBugProductAmountContentArr[0].value == '') {
        if (this.searchOption.queryParam.caBugProductAmountContentArr[1].value) {
          this.$message({
            type: 'info',
            message: '请填写购买金额下限'
          });
          return;
        }
      }
      if (this.searchOption.queryParam.caBugProductAmountContentArr[1].value == '') {
        if (this.searchOption.queryParam.caBugProductAmountContentArr[0].value) {
          this.$message({
            type: 'info',
            message: '请填写购买金额上限'
          });
          return;
        }
      }

      if (this.searchOption.queryParam.caRegProductAmountContentArr[0].value == '') {
        if (this.searchOption.queryParam.caRegProductAmountContentArr[1].value) {
          this.$message({
            type: 'info',
            message: '请填写注册金额下限'
          });
          return;
        }
      }
      if (this.searchOption.queryParam.caRegProductAmountContentArr[1].value == '') {
        if (this.searchOption.queryParam.caRegProductAmountContentArr[0].value) {
          this.$message({
            type: 'info',
            message: '请填写注册金额上限'
          });
          return;
        }
      }

      const data = JSON.parse(JSON.stringify(this.searchOption));

      // jQuery.extend({}, this.searchOption)
      this.pageNo = pageNo || this.pageNo;
      data.pageNo = this.pageNo;
      data.pageSize = this.pageSize;

      // 清理基础标签id
      if (data.queryParam.tagIdsArr.length > 0) {
        let tagIdsArr = [];
        for (var i = 0; i < data.queryParam.tagIdsArr.length; i++) {
          for (const j in data.queryParam.tagIdsArr[i].id) {
            tagIdsArr.push(data.queryParam.tagIdsArr[i].id[j].id);
          }
        }
        tagIdsArr = this.removeRepeatArray(tagIdsArr);
        const tagIds = tagIdsArr.join(';');
        data.queryParam.tagIds = tagIds;
      }

      // 清理业务标签
      if (data.queryParam.businessTagArr.length > 0) {
        const businessTagIdsArr = [];
        for (var i = 0; i < data.queryParam.businessTagArr.length; i++) {
          const groupName = data.queryParam.businessTagArr[i].split(':')[0];
          businessTagIdsArr.push(groupName.substr(2, groupName.length));
        }
        const businessTagIds = businessTagIdsArr.join(';');
        data.queryParam.businessTagIds = businessTagIds;
      }

      data.queryParam.hrActionContent = data.queryParam.hrActionContent.join(';');
      data.queryParam.caActionContent = data.queryParam.caActionContent.join(';');

      data.queryParam.hrRankId = data.queryParam.hrRankId.join(';');
      data.queryParam.caRankId = data.queryParam.caRankId.join(';');
      // 清理参数
      data.queryParam.hrGrowupValueContent = data.queryParam.hrGrowupValueContentArr[0].value != ''
        ? `${data.queryParam.hrGrowupValueContentArr[0].value};${data.queryParam.hrGrowupValueContentArr[1].value}`
        : '';
      data.queryParam.caGrowupValueContent = data.queryParam.caGrowupValueContentArr[0].value != ''
        ? `${data.queryParam.caGrowupValueContentArr[0].value};${data.queryParam.caGrowupValueContentArr[1].value}`
        : '';
      data.queryParam.hrIntegrateContent = data.queryParam.hrIntegrateContentArr[0].value != ''
        ? `${data.queryParam.hrIntegrateContentArr[0].value};${data.queryParam.hrIntegrateContentArr[1].value}`
        : '';
      data.queryParam.caIntegrateContent = data.queryParam.caIntegrateContentArr[0].value != ''
        ? `${data.queryParam.caIntegrateContentArr[0].value};${data.queryParam.caIntegrateContentArr[1].value}`
        : '';
      data.queryParam.hrBugProductAmountContent = data.queryParam.hrBugProductAmountContentArr[0].value != ''
        ? `${data.queryParam.hrBugProductAmountContentArr[0].value
        };${
          data.queryParam.hrBugProductAmountContentArr[1].value}`
        : '';
      data.queryParam.caBugProductAmountContent = data.queryParam.caBugProductAmountContentArr[0].value != ''
        ? `${data.queryParam.caBugProductAmountContentArr[0].value};${data.caBugProductAmountContentArr[1].value}`
        : '';
      data.queryParam.hrRegProductAmountContent = data.queryParam.hrRegProductAmountContentArr[0].value != ''
        ? `${data.queryParam.hrRegProductAmountContentArr[0].value
        };${
          data.queryParam.hrRegProductAmountContentArr[1].value}`
        : '';
      data.queryParam.caRegProductAmountContent = data.queryParam.caRegProductAmountContentArr[0].value != ''
        ? `${data.queryParam.caRegProductAmountContentArr[0].value
        };${
          data.queryParam.caRegProductAmountContentArr[1].value}`
        : '';

      delete data.queryParam.hrGrowupValueContentArr;
      delete data.queryParam.caGrowupValueContentArr;
      delete data.queryParam.hrIntegrateContentArr;
      delete data.queryParam.caIntegrateContentArr;
      delete data.queryParam.hrBugProductAmountContentArr;
      delete data.queryParam.caBugProductAmountContentArr;
      delete data.queryParam.hrRegProductAmountContentArr;
      delete data.queryParam.caRegProductAmountContentArr;
      delete data.queryParam.groupIdsArr;
      delete data.queryParam.tagIdsArr;
      delete data.queryParam.businessTagArr;

      for (const item in data.queryParam) {
        if (data.queryParam[item] == '') {
          delete data.queryParam[item];
        }
      }

      const filter = '';

      this.msgListLoading = true;
      this.requestVip.queryMember(data).then((result) => {
        if (result) {
          self.msgListData = [];
          self.memberCount = result.entityCount;
          self.addGroup(); // 检索结果用户添加分组、权益
          self.msgListLoading = false;
          self.isMatch = false;

          if (data.type != 1) {
            self.isOnline = false;
          } else {
            self.isOnline = true;
          }
        } else {
          self.msgListLoading = false;
        }
      });
    },
    // 分组选择
    selectGroup(flowtype) {
      this.groupDialog.display = true;
      this.groupDialog.random = Math.random();
    },
    groupDialogChange(group) {
      this.groupDialog.display = false;
      this.searchOption.queryParam.groupIdsArr = group;

      this.searchOption.queryParam.groupIds = [];
      for (let i = 0; i < group.length; i++) {
        const groupName = group[i].split(':')[0];
        this.searchOption.queryParam.groupIds.push(groupName.substr(2, groupName.length));
      }

      this.searchOption.queryParam.groupIds = this.searchOption.queryParam.groupIds.join(';');
    },
    // 关闭分组选择
    closeGroupDialog() {
      this.groupDialog.display = false;
    },
    // 交互行为选择
    selectAction(flowtype) {
      this.actionDialog.display = true;
      this.actionDialog.random = Math.random();
    },
    actionDialogChange(group) {
      this.actionDialog.display = false;

      if (this.vipTab == 'haier') {
        this.searchOption.queryParam.hrActionContent = group;
      } else {
        this.searchOption.queryParam.caActionContent = group;
      }
    },
    // 关闭交互行为选择
    closeActionDialog() {
      this.actionDialog.display = false;
    },
    // 业务标签选择
    selectBusinessTag(flowtype) {
      this.businessTagDialog.display = true;
      this.businessTagDialog.random = Math.random();
    },
    businessTagDialogChange(group) {
      this.businessTagDialog.display = false;
      this.searchOption.queryParam.businessTagArr = group;
    },
    // 关闭业务标签选择
    closeBusinessTagDialog() {
      this.businessTagDialog.display = false;
    },
    // 基础标签选择
    selectBaseTag(flowtype) {
      this.baseTagDialog.display = true;
      this.baseTagDialog.random = Math.random();

      const _this = this;
      const params = {
        level1TagName: '',
        level2TagName: '',
        level3TagName: '',
        level4TagName: '',
        level5TagName: '',
        level: 1,
        type: 1,
        selectAll: ''
      };
      _this.requestVip.getBasicTagById(params).then((result) => {
        _this.digData = result;
      });
    },
    baseTagDialogChange(group) {
      this.baseTagDialog.display = false;
      // 已选标签去重
      const selectedGroup = [];
      if (this.searchOption.queryParam.tagIdsArr.length > 0) {
        for (let i = 0; i < group.length; i++) {
          let isIn = false;
          for (let j = 0; j < this.searchOption.queryParam.tagIdsArr.length; j++) {
            if (group[i].hasChild) {
              if (group[i].tagName == this.searchOption.queryParam.tagIdsArr[j].tagName) {
                isIn = true;
                break;
              }
            } else if (group[i].nodeId == this.searchOption.queryParam.tagIdsArr[j].nodeId) {
              isIn = true;
              break;
            }
          }
          if (!isIn) {
            selectedGroup.push(group[i]);
          }
        }
        this.searchOption.queryParam.tagIdsArr = this.searchOption.queryParam.tagIdsArr.concat(selectedGroup);
      } else {
        this.searchOption.queryParam.tagIdsArr = group;
      }
    },
    // 关闭基础标签选择
    closeBaseTagDialog() {
      this.$refs['base-tag-ref'].reset();
      this.baseTagDialog.display = false;
    },
    // 添加、设置用户分组
    addGroup(flowtype) {
      this.addGroupDialog.display = true;
      this.addGroupDialog.random = Math.random();
    },
    addGroupDialogChange(group) {
      this.addGroupDialog.display = false;
      // this.searchOption.queryParam.tagIdsArr = group
    },
    // 关闭基础标签选择
    closeAddGroupDialog() {
      this.addGroupDialog.display = false;
    },
    removeRepeatArray(arr) {
      return Array.from(new Set(arr));
    }
    // 添加、设置用户标签
    // addTags: function (flowtype) {
    //   this.addTagsDialog.display = true
    //   this.addTagsDialog.random = Math.random()
    // },
    // addTagsDialogChange: function (group) {
    //   this.addTagsDialog.display = false
    //   // this.searchOption.queryParam.tagIdsArr = group
    // },
    // // 关闭基础标签选择
    // closeAddTagsDialog: function () {
    //   this.addTagsDialog.display = false
    // },
    // // 添加、设置权益
    // addRight: function (flowtype) {
    //   this.addRightDialog.display = true
    //   this.addRightDialog.random = Math.random()
    // },
    // addRightDialogChange: function (group) {
    //   this.addRightDialog.display = false
    //   // this.searchOption.queryParam.tagIdsArr = group
    // },
    // // 关闭基础标签选择
    // closeAddRightDialog: function () {
    //   this.addRightDialog.display = false
    // },
  },
  mounted() {
    this.getRankList();
    // this.listSearch()
  },
  watch: {
    searchOption: {
      handler(curVal, oldVal) {
        const self = this;
        let searchOption = ['线上用户'];

        setTimeout(() => {
          if ($('#group-filter').html()) {
            searchOption = $('#group-filter')
              .html()
              .split(',');
          }
          self.searchOptionArr = searchOption;
        }, 50);
      },
      deep: true,
      immediate: true
    }
  }
};
</script>
<style>
.vip-content .group-filter .el-tag {
  max-width: 500px;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
}
</style>

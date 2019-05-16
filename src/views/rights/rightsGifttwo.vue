<template>
  <div class="vip-content" style="min-width:1230px;">
    <div class="rights-config-header-box">
      <div class="rights-config-header">
        <div class="header-title"><span>{{title}}</span></div>
        <div class="rights-config-step" style="margin-left:35px">
          <div class="step-index"><span>1</span></div>
          <div class="step-title"><span>基础信息配置</span></div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step" style="margin-left:242px">
          <div class="step-index"><span>2</span></div>
          <div class="step-title"><span>活动范围配置</span></div>
          <div class="step-bg"></div>
        </div>
        <div class="rights-config-step setted" style="margin-left:449px">
          <div class="step-index"><span>3</span></div>
          <div class="step-title"><span>赠送礼品配置</span></div>
          <div class="step-bg"></div>
        </div>
      </div>
      <!-- <div class="save-draft">
                <span>有急事？先</span>
                <a href="javascript:;" @click="save('temporary')">存草稿</a>
                <span>回来继续配置</span>
            </div> -->
    </div>
    <div style="width: 898px; margin: auto;">

      <div class="config-form" id="pannel">
        <div class="config-form-header">
          <span>赠送礼品配置</span>
        </div>
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item v-if="form.rightSmallType == 2" label="套购方式组合" prop="">
            <el-radio-group v-model="radio" @change="radioChange" :disabled="true">
              <el-radio :label="1" v-if="form.giftType==1||form.giftType==2">按任意产品</el-radio>
              <el-radio :label="2">按满赠</el-radio>
              <el-radio :label="3">按特定型号组合</el-radio>
            </el-radio-group>
            <div class="gift-list" style="width:700px;">
              <div v-if="radio==1">
                <!-- <div class="gift-item" v-if="productCategoryLength == 2"><p>购买 2 类产品赠送<a href="javascript:;">选择礼品</a></p></div>
                                <div class="gift-item" v-if="productCategoryLength == 3">
                                    <p>购买 3 类产品赠送<a href="javascript:;">修改礼品</a></p>
                                    <p class="gift">单品赠送200积分（总数100）</p>
                                </div> -->
                <p style="margin-bottom: 15px;">购买限制
                  <el-select :disabled="true" v-model="form.coupleCategoryNumber" placeholder="请选择"
                             style="width: 90px;margin-right: 10px;">
                    <el-option v-for="item in coupleOptions" :key="item.id" :label="item.value" :value="item.id">
                    </el-option>
                  </el-select>
                  以上
                </p>
                <div class="gift-item" v-if="productCategoryLength >= 2 && index<3"
                     v-for="(right, index) in type3Config.rightList">
                  <p>购买 {{index + 2}} <em v-if="form.coupleCategoryNumber==2">件</em><em
                    v-if="form.coupleCategoryNumber==1">类</em>及以上产品赠送
                    <a v-if="!right.scoreList" href="javascript:;"
                       @click="configGift(3,index,right)">配置礼品</a>
                    <a v-if="right.scoreList" href="javascript:;"
                       @click="configGift(3,index,right,right.scoreList)">修改礼品</a>
                  </p>
                  <p v-for="score in right.scoreList" class="gift"><i></i>套购赠送{{score.score}}积分（赠送总数量{{score.num}}份）<i
                    class="ico-tcdel" @click="deletesetmail(index)"></i></p>
                </div>
                <!-- <div class="gift-item" v-if="productCategoryLength >= 3" v-for="(right, index) in type3Config.rightList">
                                    <p>购买 3 类产品赠送<a href="javascript:;" @click="configGift(3,1,right)">修改礼品</a></p>
                                    <p v-for="score in right.scoreList" class="gift">单品赠送{{score.score}}积分（总数{{score.num}}）</p>
                                </div>
                                <div class="gift-item" v-if="productCategoryLength >= 4" v-for="(right, index) in type3Config.rightList">
                                    <p>购买 4 类产品赠送<a href="javascript:;" @click="configGift(3,2,right)">修改礼品</a></p>
                                    <p v-for="score in right.scoreList" class="gift">单品赠送{{score.score}}积分（总数{{score.num}}）</p>
                                </div> -->
                <!-- <div class="gift-item" v-if="productCategoryLength == 4">购买 4 类产品赠送<a href="javascript:;">选择礼品</a></div> -->

                <div class="gift-item" v-if="productCategoryLength >= 5 && index>=3"
                     v-for="(right, index) in type3Config.rightList">
                  <p>购买 5 <em v-if="form.coupleCategoryNumber==2">件</em><em v-if="form.coupleCategoryNumber==1">类</em>及以上产品赠送
                    <a v-if="!right.scoreList" href="javascript:;" @click="configGift(3,3,right)">配置礼品</a>
                    <a v-if="right.scoreList" href="javascript:;"
                       @click="configGift(3,3,right,right.scoreList)">修改礼品</a>
                  </p>
                  <p v-for="score in right.scoreList" class="gift"><i></i>套购赠送{{score.score}}积分（赠送总数量{{score.num}}份）<i
                    class="ico-tcdel" @click="deletesetmail(index)"></i></p>
                </div>
              </div>
              <div v-if="radio==2" style="margin-top:18px;">
                <p style="margin-bottom: 15px;">购买限制
                  <el-input :disabled="true" v-if="radio==2" :maxlength="2" v-model="form.coupleNumber"
                            placeholder="请输入" style="width: 80px;" @input.native="couChange"></el-input>
                  <!--<el-select v-if="radio==2" v-model="form.coupleNumber" placeholder="请选择" style="width: 90px;" >-->
                  <!--<el-option v-for="item in numberOptions" :key="item" :label="item" :value="item">-->
                  <!--</el-option>-->
                  <!--</el-select>-->
                  <el-select :disabled="true" v-model="form.coupleCategoryNumber" placeholder="请选择"
                             style="width: 90px;margin-right: 10px;">
                    <el-option v-for="item in coupleOptions" :key="item.id" :label="item.value" :value="item.id">
                    </el-option>
                  </el-select>
                  及以上
                </p>
                <el-tooltip placement="top" popper-class="type4-tooltip">
                  <div slot="content">您活动范围内配置的产品类别是 <span
                    class="color-red">{{productCategoryName}}</span> 单产业内套只能添加单一产业
                  </div>
                  <p>您想配单产业内套？</p>
                </el-tooltip>
                <el-tabs v-model="type4TabShow" type="card" @tab-click="handleClick">
                  <!-- @tab-click="cleardata" 去掉tab切换清楚数据-->
                  <el-tab-pane label="产业内所有产品参加活动" name="1" :disabled="true">
                    <div class="type4-tab-panel">
                      购买 <span class="color-red">{{productCategoryName}}</span>, 满
                      <el-input :disabled="true" style="width: 71px;margin:0 10px;" :maxlength="9"
                                v-model="buyAmount"
                                @change="inputChangeFilter('buyAmount')"></el-input>
                      -
                      <el-input :disabled="true" style="width: 71px;margin:0 10px;" :maxlength="9"
                                v-model="maxBuyAmount"
                                @change="inputChangeFilter('maxBuyAmount')"></el-input>
                      元
                      <el-button :disabled="true" type="primary" class="trs-btn"
                                 style="width:80px;margin-left:10px;" @click="addType3">添加
                      </el-button>
                      <!-- <div class="gift-item"><p>满10,890元<a href="javascript:;">配置礼品</a></p></div>
                                            <div class="gift-item">
                                                <p>满10,890元<a href="javascript:;">修改礼品</a></p>
                                                <p class="gift">赠送 100 积分（固定）<span class="split">|</span> 某某产品1个（5%）</p>
                                            </div> -->
                      <div class="gift-item" v-for="(right, index) in type4Config.rightList">
                        <p>满{{right.buyAmount}}-{{right.maxBuyAmount}}元
                          <a v-if="!right.scoreList  && !right.giftList " href="javascript:;"
                             @click="configGift(4,index,right,right.scoreList,right.giftList)">配置礼品</a>
                          <a v-if="right.scoreList||right.giftList " href="javascript:;"
                             @click="configGift(4,index,right,right.scoreList,right.giftList)">修改礼品</a>
                        </p>

                        <p v-for="score in right.scoreList" class="gift"><i></i>套购赠送
                          {{score.score}} 积分（赠送总数量{{score.num}}份）</p>
                        <p v-for="score in right.giftList" class="gift"><i></i>套购赠送
                          {{score.productName}}（赠送总数量{{score.num}}份）</p>

                        <i class="ico-del" @click="deletescor(index)"></i>
                      </div>

                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="产业特定产品参加活动" name="2" :disabled="true">
                    <div class="type4-tab-panel">
                      <div style="background:#f6f6f6;border:1px solid #cccccc;padding: 8px 12px;margin-bottom:18px;">
                        添加套餐产品
                        <el-autocomplete :disabled="true" style="width: 430px;margin-top:3px;margin-left:15px;"
                                         placeholder="请输入产品型号" v-model="productName"
                                         :fetch-suggestions="listProductInfo"
                                         @select="type4ProductSelect"
                                         value-key="desc"
                        ></el-autocomplete>
                        <div class="product-tap">
                          <div v-for="(product, index) in buyNumProductCode">
                            <span :title="product.brandName+'-'+product.productCategoryCode+'-'+product.modelNo">{{product.brandName}}-{{product.productCategoryCode}}-{{product.modelNo}}</span>
                            <i class="ico-del" @click="deletexh(index)"></i>
                          </div>
                        </div>
                      </div>
                      满
                      <el-input :disabled="true" style="width: 71px;margin:0 10px;" :maxlength="9"
                                v-model="buyAmount"
                                @change="inputChangeFilter('buyAmount')"></el-input>
                      -
                      <el-input :disabled="true" style="width: 71px;margin:0 10px;" :maxlength="9"
                                v-model="maxBuyAmount"
                                @change="inputChangeFilter('maxBuyAmount')"></el-input>
                      元
                      <el-button :disabled="true" type="primary" class="trs-btn"
                                 style="width:80px;margin-left:10px;" @click="addType3">添加
                      </el-button>
                      <div class="gift-item" v-for="(right, index) in type6Config.rightList">
                        <p>满{{right.buyAmount}}-{{right.maxBuyAmount}}元
                          <a v-if="!right.scoreList  && !right.giftList " href="javascript:;"
                             @click="configGift(6,index,right,right.scoreList,right.giftList)">配置礼品</a>
                          <a v-if="right.scoreList||right.giftList " href="javascript:;"
                             @click="configGift(6,index,right,right.scoreList,right.giftList)">修改礼品</a>
                          <!--<a v-if="!right.scoreList" href="javascript:;"-->
                          <!--@click="configGift(6,index,right)">配置礼品</a>-->
                          <!--<a v-if="right.scoreList" href="javascript:;"-->
                          <!--@click="configGift(6,index,right,right.scoreList)">修改礼品</a>-->
                        </p>
                        <p v-for="score in right.scoreList" class="gift"><i></i>套购赠送
                          {{score.score}} 积分（赠送总数量{{score.num}}份）</p>
                        <p v-for="score in right.giftList" class="gift"><i></i>套购赠送
                          {{score.productName}}（赠送总数量{{score.num}}份）</p>
                        <i class="ico-del" @click="deletescor01(index)"></i>
                      </div>
                    </div>
                  </el-tab-pane>
                </el-tabs>
                <!-- <div class="type4-tab">
                                  <a href="javascript:;" v-bind:class="{ active: type4TabShow==1 }" @click="type4TabClick(1)">产业内所有产品参加活动</a>
                                  <a href="javascript:;" v-bind:class="{ active: type4TabShow==2 }" @click="type4TabClick(2)">产业特定产品参加活动</a>
                                </div> -->

              </div>
              <div v-if="radio==3">
                <div class="select-product-list">
                  <div class="select-product" v-for="(product, index) in productList">
                    <!-- <label>品牌</label> -->
                    <!-- <el-select v-model="product.brandName" placeholder="请选择" style="width:111px;">
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label"> </el-option>
                                        </el-select>
                                        <label>产业</label>
                                        <el-select v-model="product.productCategoryCode" placeholder="请选择" style="width:111px;">
                                            <el-option v-for="item in listIndustryArr" :key="item.value" :label="item.label" :value="item.label"> </el-option>
                                        </el-select> -->
                    <label>产品型号</label>
                    <!-- <el-input style="width: 111px;"></el-input> -->
                    <el-autocomplete :disabled="true" style="width: 435px;" placeholder="输入参加活动的产品型号"
                                     v-model="product.desc" :fetch-suggestions="listProductInfo"
                                     @select="type3ProductSelect"
                                     value-key="desc"
                    ></el-autocomplete>
                    <i class="ico-del02" @click="deletepro(index)"></i>
                    <i class="ico-link"></i>
                  </div>
                  <!-- <div class="select-product">
                                        <label>品牌</label>
                                        <el-select v-model="value" placeholder="请选择" style="width:111px;">
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                        </el-select>
                                        <label>产业</label>
                                        <el-select v-model="value" placeholder="请选择" style="width:111px;">
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                                        </el-select>
                                        <label>型号</label>
                                        <el-input style="width: 111px;"></el-input>
                                    </div> -->
                  <el-button :disabled="true" type="primary" class="trs-btn add-product"
                             style="width:80px;margin-left:10px;" @click="addType3Product">添加产品
                  </el-button>
                </div>
                <div v-if="prozh">
                  <el-button :disabled="true" type="primary" class="trs-btn"
                             style="width:161px;margin-left:0px;margin-right:10px;"
                             @click="setType3Product">添加产品组合
                  </el-button>
                  <span>配置完产品组合，可以为组合添加礼品了</span>
                </div>
                <div v-if="!prozh" class="m-prozh">完成产品组合配置</div>
                <div v-for="item,index in listType5Config.modelNoDetail" class="gift-list-combination">
                  <!--v-if="type5Config.productList[0]"-->
                  <div v-for="product in item.productList">
                    <i></i>
                    <img v-if="product.productCategoryCode == '冰箱' || product.productCategoryCode == '冷柜'"
                         src="../../assets/images/gift_pro01.png" alt="">
                    <img
                      v-if="product.productCategoryCode == '厨电'||product.productCategoryCode == '洗碗机'||product.productCategoryCode == '吸油烟机'||product.productCategoryCode == '烤箱'||product.productCategoryCode == '消毒柜'||product.productCategoryCode == '中式洗碗机'||product.productCategoryCode == '燃气灶'"
                      src="../../assets/images/gift_pro02.png" alt="">
                    <img v-if="product.productCategoryCode == '电视'"
                         src="../../assets/images/gift_pro03.png" alt="">
                    <img v-if="product.productCategoryCode == '空调'"
                         src="../../assets/images/gift_pro04.png" alt="">
                    <img v-if="product.productCategoryCode == '热水器'"
                         src="../../assets/images/gift_pro05.png" alt="">
                    <img
                      v-if="product.productCategoryCode == '洗衣机'||product.productCategoryCode == '滚筒洗衣机'||product.productCategoryCode == '波轮洗衣机'"
                      src="../../assets/images/gift_pro06.png" alt="">
                    <p class="type5-product-name" :title="product.modelNo">{{product.modelNo}}</p>
                  </div>
                  <!-- <div>
                                        <img src="" alt="">
                                        <p>AJ8979</p>
                                    </div> -->
                  <div class="option-div"
                       v-if="item.rightList[0].scoreList || item.rightList[0].giftList">
                    <a v-if="item.rightList[0].scoreList.length == 0 && item.rightList[0].giftList.length == 0"
                       href="javascript:;"
                       @click="configGift(5,0,item.productList[0].productCode,0,0,item.productList,index)">配置礼品</a>
                    <a v-if="item.rightList[0].scoreList.length > 0 || item.rightList[0].giftList.length > 0"
                       href="javascript:;"
                       @click="configGift(5,0,item.productList[0].productCode, item.rightList[0].scoreList, item.rightList[0].giftList,item.productList,index)">修改礼品</a>

                    <div class="gift-item" v-for="(right, index) in item.rightList">
                      <p v-for="score in right.scoreList" class="gift"><i></i>套购赠送{{score.score}}积分（赠送总数量{{score.num}}份）
                      </p>
                      <p v-for="gift in right.giftList" class="gift"><i></i>套购赠送{{gift.productName}}（赠送总数量{{gift.num}}份）
                      </p>
                    </div>
                  </div>
                  <i class="ico-tcdel" @click="deletetype5Config(index)"></i>
                </div>
              </div>
            </div>
          </el-form-item>

          <el-form-item v-if="form.rightSmallType == 3" label="关联天数" prop="">
            <el-input style="width: 77px;margin-right:5px;" placeholder="输入天数"></el-input>
            <span>天内购买产品满足下面条件参加活动</span>
          </el-form-item>
          <el-form-item v-if="form.rightSmallType == 3" label="条件方案" prop="">
            <span>满</span>
            <el-input style="width: 110px;margin:0 5px;" placeholder="输入购买金额"></el-input>
            <span>元，赠送</span>
            <el-input style="width: 86px;margin:0 5px;" placeholder="输入积分数"></el-input>
            <span>积分</span>
          </el-form-item>
          <el-form-item v-if="form.rightSmallType == 3" label="礼品总数" prop="">
            <el-input style="width: 103px;margin-right:5px;" placeholder="输入礼品总数"></el-input>
            <span>赠完为止</span>

            <div class="gift-list">
              <el-button type="primary" class="trs-btn"
                         style="width:152px;margin-top:30px;margin-left:0;margin-bottom:5px;">添加台阶积分卡
              </el-button>
              <div class="gift-item">10 天内购买产品满 10,089 元 <span class="gift">赠送 100 积分。（共100份）</span></div>
              <div class="gift-item">10 天内购买产品满 10,089 元 <span class="gift">赠送 100 积分。（共100份）</span></div>
            </div>
          </el-form-item>
          <el-form-item
            v-if="form.giftType===5"
            label="礼品类型"
          >
            <el-radio-group
              v-model="form.productType"
            >
              <el-radio
                class="radio"
                :label="1"
              >尊享卡
              </el-radio>
              <el-radio
                class="radio"
                :label="2"
              >卡券
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <span v-if="form.rightSmallType === 1">
          <el-form-item
            v-if="form.rightSmallType == 1"
            label="活动产品范围 " prop=""
          >
            <el-radio-group
              :disabled="true"
              v-model="type1Config.type"
              @change="type1ConfigTypeChange">
              <el-radio :label="2">单型号</el-radio>
              <el-radio
                v-if="form.giftType === 5"
                :label="3"
              >多型号
              </el-radio>
              <el-radio
                v-if="form.giftType === 1 || form.giftType===2 || form.giftType===5"
                :label="1"
              >全部型号
              </el-radio>
            </el-radio-group>
            </el-form-item>
            <el-form-item
              v-show="type1Config.type === 2 || type1Config.type === 3"
              label="产品型号"
            >
              <div class="gift-list">
              <el-autocomplete
                  style="width: 610px;"
                placeholder="输入参加活动的产品型号"
                v-model="productName" :fetch-suggestions="listProductInfo"
                @select="productSelect"
                  value-key="desc"
              ></el-autocomplete>
                <div
                  :class="[type1Config.type === 3 && 'rightsgift-gift-item-par']"
                >
                  <div
                    v-for="(item,index) in type1Config.rightList"
                    :key="index"
                    class="gift-item"
                  >
                <i class="ico-del" @click="deleteGift(item, index)"></i>
                <p>{{item.brandName}} | {{item.productCategoryCode}} | <b>{{item.modelNo}}</b>
                      <span v-if="form.giftType !== 5">
                        <a
                          v-if="!item.scoreList && !item.giftList"
                          href="javascript:;"
                          @click="configGift(1,index,item.productCode,0,0,item.modelNo)"
                        >配置礼品</a>
                        <a
                          v-else
                          href="javascript:;"
                          @click="configGift(1,index,item.productCode,item.scoreList,item.giftList)"
                        >修改礼品</a>
                      </span>
                      <span
                        v-else
                        v-show="type1Config.type === 2"
                      >
                        <a
                          v-if="!item.virtualGiftList"
                          href="javascript:;"
                          @click="configGift(1,index,item.productCode,0,0,item.modelNo)"
                        >配置礼品</a>
                        <a
                          v-else
                          href="javascript:;"
                          @click="configGift(1,index,item.productCode,0,item.virtualGiftList)"
                        >修改礼品</a>
                      </span>
                </p>
                    <span v-if="form.giftType!==5">
                      <p
                        v-if="gift.score"
                        v-for="(gift,index) in item.scoreList"
                        :key="'a'+index"
                        class="gift"
                      ><i></i>单品赠送{{gift.score}}积分（赠送总数量{{gift.num}}份）
                </p>
                      <p
                        v-if="gift.priceScale"
                        v-for="(gift,index) in item.scoreList"
                        :key="'b'+index"
                        class="gift"
                      ><i></i>单品赠送{{gift.priceScale}}%积分
                </p>
                      <p
                        v-for="(gift,index) in item.giftList"
                        :key="'c'+index"
                        class="gift"
                      ><i></i>单品赠送{{gift.productName}}（赠送总数量{{gift.num}}份）
                </p>
                    </span>
                    <span
                      v-else
                      v-show="type1Config.type===2"
                    >
                      <p
                        v-for="(card,index) in item.virtualGiftList"
                        :key="index"
                        class="gift"
                      ><i></i>赠送{{card.cardName}}
                      </p>
                    </span>
              </div>
            </div>
              </div>
            </el-form-item>
            <el-form-item
              v-if="type1Config.type===1 || (type1Config.type===3 && type1Config.rightList.length)"
              class="rightsGift-configGift-all"
              label="配置礼品"
            >
              <!--积分、礼品 全部类型：统一配置-->
              <div
                class="gift-list"
                v-if="form.giftType!==5"
              >
                <div
                  v-for="(item, index) in type2Config.rightList"
                  :key="index"
                  class="gift-item"
                >
                <p>所有产品
                  <a v-if="!item.scoreList" href="javascript:;" @click="configGift(2,index)">配置礼品</a>
                  <a v-if="item.scoreList" href="javascript:;"
                     @click="configGift(2,index,0,item.scoreList)">修改礼品</a>
                </p>
                  <p
                    v-for="(gift,index) in item.scoreList"
                    :key="'a'+index"
                    v-if="gift.rightType === 1 && gift.score && gift.num"
                    class="gift"
                  ><i></i>单品赠送{{gift.score}}积分（赠送总数量{{gift.num}}）
                </p>
                  <p
                    v-for="(gift,index) in item.scoreList"
                    :key="'b'+index"
                    v-if="gift.rightType === 2 && gift.priceScale"
                   class="gift"><i></i>单品赠送{{gift.priceScale}}%积分</p>
              </div>
            </div>
              <!--虚拟卡 多类型、全类型：统一配置-->
              <div
                v-else
                class="gift-list"
              >
                <p
                  v-if="type1Config.type===1"
                  class="gift"
                >
                  <span
                    v-if="type2Config.rightList[0] && type2Config.rightList[0].virtualGiftList && type2Config.rightList[0].virtualGiftList[0]"
                  >
                    <i
                      class="gift-icon"
                    ></i>赠送{{type2Config.rightList[0].virtualGiftList[0].cardName}}
                    <br>
                  </span>
                  <a
                    v-if="!(type2Config.rightList[0] && type2Config.rightList[0].virtualGiftList)"
                    class="vc-a"
                    href="javascript:;"
                    @click="configGift(1,null,null,0,0)"
                  >配置礼品</a>
                  <a
                    v-else
                    class="vc-a"
                    href="javascript:;"
                    @click="configGift(1,null,null,0,type2Config.rightList[0].virtualGiftList)"
                  >修改礼品</a>
                </p>
                <p
                  v-else
                  class="gift"
                >
                  <span
                    v-if="type1Config.rightList[0] && type1Config.rightList[0].virtualGiftList && type1Config.rightList[0].virtualGiftList[0]"
                  >
                    <i
                      class="gift-icon"
                    ></i>赠送{{type1Config.rightList[0].virtualGiftList[0].cardName}}
                    <br>
                  </span>
                  <a
                    v-if="!(type1Config.rightList[0] && type1Config.rightList[0].virtualGiftList)"
                    class="vc-a"
                    href="javascript:;"
                    @click="configGift(1,null,null,0,0)"
                  >配置礼品</a>
                  <a
                    v-else
                    class="vc-a"
                    href="javascript:;"
                    @click="configGift(1,null,null,0,type1Config.rightList[0].virtualGiftList)"
                  >修改礼品</a>
                </p>
              </div>
          </el-form-item>
          </span>

          <el-form-item v-if="form.rightSmallType === 2" label="特殊约束限制" prop="">
            <div>
              <p class="xianzhi-lei" @click="choicelimit" :class="{col333:newlimit.length>0}">{{lintText}}</p>
            </div>
            <div class="lint-everybox" v-if="newlimit.indexOf(1)!=-1">
              <p style="font-weight: bold;">订单必须包含产品或产品组合</p>
              <div class="lint-product-list">
                <div class="lint-product" v-for="(product, index) in lintList"
                     :class="{'lint-none':lintList.length==1}">
                  <el-select v-model="product.brandName" placeholder="品牌" style="width: 86px">
                    <el-option v-for="item in pinpaioptions" :key="item" :label="item" :value="item">
                    </el-option>
                  </el-select>
                  <el-select v-model="product.productCategoryCode" placeholder="品类" style="width: 110px">
                    <el-option v-for="item in prooptions" :key="item" :label="item" :value="item">
                    </el-option>
                  </el-select>
                  <el-autocomplete style="width: 250px;" v-model="product.desc"
                                   :fetch-suggestions="(queryString, cb)=>{return queryModel(queryString, cb,1,index)}"
                                   placeholder="产品型号可为空，默认所有型号"
                                   @select="(item, e)=>{return modelSelect(item, 1,index)}" :trigger-on-focus="false"
                                   value-key="label"
                  >
                  </el-autocomplete>
                  <i class="ico-del02" @click="deleteLint(index)" v-if="lintList.length>1"></i>
                  <i class="ico-link" v-if="lintList.length>1"></i>
                </div>
                <el-button type="primary" class="trs-btn add-product"
                           style="width:80px;margin-left:10px;" @click="addLint">添加产品
                </el-button>
              </div>
              <el-button type="primary" @click="generateLint" style="padding: 10px 60px;">生成</el-button>

              <div class="lint-xian">
                <p class="lint-zanwu" v-if="modelConstraint[0].productList.length==0">暂无数据</p>
                <div v-for="(item,index) in modelConstraint[0].productList">
                  <div class="lint-product-list" v-if="item.length>1">
                    <div class="lint-product" v-for="product in item" v-if="item.length>1">
                      <span class="shuju-base" v-if="product.desc">{{product.desc}}</span>
                      <span class="shuju-base" v-else>{{product.brandName}} | {{product.productCategoryCode}}</span>
                      <i class="ico-link" style="z-index: 10;"></i>
                    </div>
                    <i v-if="item.length>1" class="ico-delbsw" @click="delOrd(index,1)"></i>
                  </div>
                  <!--一个情况-->
                  <div v-for="product in item" v-if="item.length==1" style="position: relative;">
                    <span class="shuju-base" v-if="product.desc" style="margin-top: 10px;">{{product.desc}}</span>
                    <span class="shuju-base" v-else style="margin-top: 10px;">{{product.brandName}} | {{product.productCategoryCode}}</span>
                    <i class="ico-del-one" @click="delOrd(index,1)"></i>
                  </div>
                </div>
              </div>
              <!--关闭按钮-->
              <p class="lint-close" @click="xClose(1)">X</p>
            </div>

            <div class="lint-everybox" v-if="newlimit.indexOf(2)!=-1">
              <p style="font-weight: bold;">权益计算指定型号<em style="font-weight: lighter;">（仅以下配置型号参与权益计算）</em></p>
              <div>
                <el-select v-model="brandName2" placeholder="品牌" style="width: 86px"
                           @change="productModel2='';typeproductList2=''">
                  <el-option v-for="item in pinpaioptions" :key="item" :label="item" :value="item">
                  </el-option>
                </el-select>
                <el-select v-model="productCategory2" placeholder="品类" style="width: 110px"
                           @change="productModel2='';typeproductList2=''">
                  <el-option v-for="item in prooptions" :key="item" :label="item" :value="item">
                  </el-option>
                </el-select>
                <el-autocomplete style="width: 250px;" v-model="productModel2"
                                 :fetch-suggestions="(queryString, cb)=>{return queryModel(queryString, cb,2)}"
                                 placeholder="产品型号必填"
                                 @select="(item, e)=>{return modelSelect(item, 2)}" :trigger-on-focus="false"
                                 value-key="desc"
                >
                </el-autocomplete>
                <el-button type="primary" @click="addmodelone(2)" class="addmodel-but">添加</el-button>
              </div>
              <div class="lint-xian">
                <p class="lint-zanwu" v-if="modelConstraint[1].productList.length==0">暂无数据</p>
                <div v-for="(item,index) in modelConstraint[1].productList" style="position: relative;">
                  <span class="shuju-base" style="margin-top: 10px;">{{item.desc}}</span>
                  <i class="ico-del-one" @click="delOrd(index,2)"></i>
                </div>
              </div>
              <!--关闭按钮-->
              <p class="lint-close" @click="xClose(2)">X</p>
            </div>

            <div class="lint-everybox" v-if="newlimit.indexOf(3)!=-1">
              <p style="font-weight: bold;">权益计算排除型号<em style="font-weight: lighter;">（以下配置型号不参与权益计算）</em></p>
              <div>
                <el-select v-model="brandName3" placeholder="品牌" style="width: 86px"
                           @change="productModel3='';typeproductList3=''">
                  <el-option v-for="item in pinpaioptions" :key="item" :label="item" :value="item">
                  </el-option>
                </el-select>
                <el-select v-model="productCategory3" placeholder="品类" style="width: 110px"
                           @change="productModel3='';typeproductList3=''">
                  <el-option v-for="item in productCategoryoptions" :key="item" :label="item" :value="item">
                  </el-option>
                </el-select>
                <el-autocomplete style="width: 250px;" v-model="productModel3"
                                 :fetch-suggestions="(queryString, cb)=>{return queryModel(queryString, cb,3)}"
                                 placeholder="产品型号可为空，默认所有型号"
                                 @select="(item, e)=>{return modelSelect(item, 3)}" :trigger-on-focus="false"
                                 value-key="desc"
                >
                </el-autocomplete>
                <el-button type="primary" @click="addmodelone(3)" class="addmodel-but">添加</el-button>
              </div>
              <div class="lint-xian">
                <p class="lint-zanwu" v-if="modelConstraint[2].productList.length==0">暂无数据</p>
                <div v-for="(item,index) in modelConstraint[2].productList" style="position: relative;">
                  <span class="shuju-base" style="margin-top: 10px;" v-if="item.desc==''">{{item.brandName}} | {{item.productCategoryCode}}</span>
                  <span class="shuju-base" style="margin-top: 10px;" v-else>{{item.desc}}</span>
                  <i class="ico-del-one" @click="delOrd(index,3)"></i>
                </div>
              </div>
              <!--关闭按钮-->
              <p class="lint-close" @click="xClose(3)">X</p>
            </div>

            <div class="lint-everybox" v-if="newlimit.indexOf(4)!=-1">
              <p style="font-weight: bold;">品类价格约束<em style="font-weight: lighter;">（品类产品在配置价格范围内才可参与权益计算）</em></p>
              <div>
                <el-select v-model="brandNamePrice" placeholder="品牌" style="width: 86px">
                  <el-option v-for="item in pinpaioptions" :key="item" :label="item" :value="item">
                  </el-option>
                </el-select>
                <el-select v-model="productCategoryPrice" placeholder="品类" style="width: 110px;margin-right: 5px">
                  <el-option v-for="item in prooptions" :key="item" :label="item" :value="item">
                  </el-option>
                </el-select>
                <el-input v-model="minPrice" :maxlength="6" placeholder="最低价" style="width: 65px;margin-left: 5px"
                          @keyup.native="minPrice=(minPrice.replace(/\D/g,'')).slice(0,6);"></el-input>
                -
                <el-input style="width: 65px;margin-left: 5px;" :maxlength="6" v-model="maxPrice" placeholder="最高价"
                          @keyup.native="maxPrice=(maxPrice.replace(/\D/g,'')).slice(0,6);"></el-input>
                （元）

                <el-button type="primary" @click="addprice" class="addmodel-but">添加</el-button>
              </div>
              <div class="lint-xian">
                <p class="lint-zanwu" v-if="priceConstraint.productList.length==0"
                   style="padding-bottom: 10px;text-align: center">暂无数据</p>
                <div v-else v-for="(product, index) in priceConstraint.productList" style="position: relative;">
                  <span class="shuju-base" style="margin-top: 10px;"
                        :title="product.brandName+' | '+product.productCategoryCode+' | 价格区间'+product.minPrice+'元至'+product.maxPrice+'元'">{{product.brandName}} | {{product.productCategoryCode}} | 价格区间{{product.minPrice}}元至{{product.maxPrice}}元</span>
                  <i class="ico-del-one" @click="delpriceex(index)"></i>
                </div>
              </div>
              <!--关闭按钮-->
              <p class="lint-close" @click="xClose(4)">X</p>
            </div>
          </el-form-item>

          <el-form-item>
            <el-button class="trs-btn" style="width:109px;margin-top:14px;" @click="prev">上一步</el-button>
            <el-button type="primary" class="trs-btn" style="width:109px;margin-top:14px;margin-left:11px;"
              :disabled="disableGenerate || honorCardDisabled"
              @click="save"
              :loading="saveLoading"
            >生成方案
            </el-button>
          </el-form-item>
        </el-form>
        <div class="cost-bar">
          权益成本：<b class="color-red">{{costAmount}}</b> &nbsp;&nbsp;|&nbsp;&nbsp; 投入预算：<b class="color-red">{{budgetAmount}}</b>
          &nbsp;&nbsp;|&nbsp;&nbsp; 剩余金额：<b class="color-red" v-if="budgetAmount >= costAmount">{{parseFloat(budgetAmount
          - costAmount).toFixed(2)}}</b><b class="color-red" v-if="budgetAmount < costAmount">0</b> &nbsp;&nbsp;
          <i v-if="budgetAmount >= costAmount"
             style="display:inline-block;height:16px;width:16px;border-radius: 16px;background:#00df60;vertical-align: text-top;margin-right:6px;margin-left:16px;"></i><span
          v-if="budgetAmount >= costAmount">正常</span>
          <i v-if="budgetAmount < costAmount"
             style="display:inline-block;height:16px;width:16px;border-radius: 16px;background:#ee5851;vertical-align: text-top;margin-right:6px;margin-left:16px;"></i><span
          v-if="budgetAmount < costAmount">超预算</span>
        </div>

      </div>

    </div>
    <!--特殊约束限制大类选择-->
    <el-dialog class="score-rights-dialog trs-dialog limitDialog" title="限制大类选择" :visible.sync="limitDialog"
               :before-close="limitClose"
               :modal-append-to-body="false">
      <div>
        <el-checkbox-group v-model="limitList">
          <p style="margin-left: 30px">
            <el-checkbox :label="1">订单必须包含产品</el-checkbox>
          </p>
          <p style="margin-left: 30px" v-if="type4TabShow!=2">
            <el-checkbox :label="2">权益计算指定型号</el-checkbox>
          </p>
          <p style="margin-left: 30px;margin-bottom: 4px;">
            <el-checkbox :label="3">权益计算排除型号</el-checkbox>
          </p>
          <p style="width: 100%;height: 1px;background-color: #333;margin-bottom: 5px;"></p>
          <p style="margin-left: 30px">
            <el-checkbox :label="4">品类价格约束</el-checkbox>
          </p>
        </el-checkbox-group>
      </div>
      <div style="margin-top: 15px">
        <el-button style="width: 100px" @click="cancalLimit">取 消</el-button>
        <el-button style="width: 146px;" type="primary" @click="sureLimit">确 定</el-button>
      </div>
    </el-dialog>

    <!--配置礼品，固定积分-->
    <el-dialog class="score-rights-dialog trs-dialog rg-guding-jifen" title="配置礼品" :visible.sync="scoreRightsDialog"
               :modal-append-to-body="false">
      <div class="score-rights-div" style="width: 100%;">
        <p>您的投入预算为 <span class="color-red">{{budgetAmount}}</span> 元，参考此价格配置礼品</p>
        <el-radio-group v-model="scoreList[0].rightType" style="margin: 15px 0 10px;">
          <el-radio :label="1">固定积分</el-radio>
          <el-radio :label="2" v-if="form.rightSmallType != 2">按产品价格比例</el-radio>
        </el-radio-group>

        <div v-if="scoreList[0].rightType==1" class="score-rights-input">
          <div>
            <label>赠送</label>
            <el-input style="width: 110px;margin:0 5px;" v-model="scoreList[0].score" :maxlength="6"
                      placeholder="输入积分数量" @change="inputChangeFilter('score','scoreList')"></el-input>
            <span>积分</span>
          </div>
          <div>
            <label>礼品总数</label>
            <el-input style="width: 110px;margin:0 5px;" v-model="scoreList[0].num" :maxlength="9"
                      placeholder="输入礼品总数" @change="inputChangeFilter('num','scoreList')"></el-input>
            <span>份，赠完为止</span>
          </div>
        </div>
        <div v-if="scoreList[0].rightType==2" class="score-rights-input by-price">
          <div>
            <label>产出销售额</label>
            <el-input style="width: 124px;margin:0 5px;" v-model="scoreList[0].salesAmount"
                      placeholder="输入产出销售额"
                      @change="inputChangeFilter('salesAmount','scoreList')"></el-input>
            <span>元</span>
          </div>
          <div>
            <label>按产品供价的</label>
            <el-input style="width: 124px;margin:0 5px;" v-model="scoreList[0].priceScale" :maxlength="3"
                      placeholder="输入百分比" @change="inputChangeFilter('priceScale','scoreList')"></el-input>
            <span>% 赠送</span>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveGiftConfig" class="trs-btn" style="width:125px;">配置完成</el-button>
      </div>
    </el-dialog>

    <!--新增，套购配置礼品，按满赠-->
    <el-dialog class="gift-rights-dialog trs-dialog" title="配置礼品" :visible.sync="giftRightsFullDialog"
               :modal-append-to-body="false">
      <p class="gift-budget">
        <span style=" width: auto; display: inline-block;float: left;">您的投入预算为</span>
        <span class="color-red"
              style=" width: auto; max-width: 200px;height: 20px;line-height: 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: inline-block;float: left;"
              :title="budgetAmount">{{budgetAmount}}</span>
        <span style=" width: auto; display: inline-block;float: left;">元，参考此价格配置礼品</span>
      </p>

      <div class="score-rights-div" v-if="form.giftType==1||form.giftType==2" style="width: 100%;">
        <el-radio-group v-model="checked1" @change="inttypeChange">
          <el-radio class="radio" :label="1">您要送积分</el-radio>
        </el-radio-group>

        <el-radio-group v-model="scoreList[0].rightType" @change="jfChange"
                        style="margin: 15px 0 10px;display:block;">
          <el-radio :disabled="intorpro" :label="1">固定积分</el-radio>
          <el-radio :disabled="intorpro" v-if="form.rightSmallType != 2" :label="2">按产品价格比例</el-radio>
        </el-radio-group>
        <div v-if="scoreList[0].rightType==1" class="score-rights-input">
          <div>
            <label>赠送</label>
            <el-input style="width: 104px;margin:0 5px;" :disabled="intorpro" v-model="scoreList[0].score"
                      :maxlength="9" placeholder="输入积分数量"
                      @change="inputChangeFilter('score','scoreList')"></el-input>
            <span>积分</span>
          </div>
          <div>
            <label>礼品总数</label>
            <el-input style="width: 104px;margin:0 5px;" :disabled="intorpro" v-model="scoreList[0].num"
                      :maxlength="9" placeholder="输入礼品总数"
                      @change="inputChangeFilter('num','scoreList')"></el-input>
            <span>份，赠完为止</span>
          </div>
        </div>
        <div v-if="scoreList[0].rightType==2" class="score-rights-input by-price">
          <div>
            <label>产出销售额</label>
            <el-input style="width: 124px;margin:0 5px;" :disabled="intorpro"
                      v-model="scoreList[0].salesAmount" placeholder="输入产出销售额"
                      @change="inputChangeFilter('salesAmount','scoreList')"></el-input>
            <span>元</span>
          </div>
          <div>
            <label>按产品供价的</label>
            <el-input style="width: 124px;margin:0 5px;" :disabled="intorpro" :maxlength="3"
                      v-model="scoreList[0].priceScale" placeholder="输入百分比"
                      @change="inputChangeFilter('priceScale','scoreList')"></el-input>
            <!--:disabled="intorpro"-->
            <span>% 赠送</span>
          </div>
        </div>
      </div>
      <div class="gift-rights-div" v-else>
        <el-radio-group v-model="checked1" @change="inttypeChange">
          <el-radio class="radio" :label="2">您要送礼品</el-radio>
        </el-radio-group>
        <template class="right-xianxia">
          <el-checkbox style="position: absolute;top: 20px;right: 17px;" v-model="giftList[0].type" :true-label="2"
                       :false-label="1">线下赠送
          </el-checkbox>
        </template>

        <div class="score-rights-input">
          <div>
            <label>礼品价格范围</label>
            <el-input style="width: 82px;margin:0 5px;" :disabled="!intorpro"
                      v-model="giftList[0].purchasePriceStart" placeholder="输入价格" :maxlength="6"
                      @change="inputChangeFilter('purchasePriceStart','giftList')"></el-input>
            <span>-</span>
            <el-input style="width: 82px;margin:0 5px;" :disabled="!intorpro"
                      v-model="giftList[0].purchasePriceEnd" placeholder="输入价格" :maxlength="6"
                      @change="inputChangeFilter('purchasePriceEnd','giftList')"
                      @keyup.enter.native="searchGift"></el-input>
            <span>(元)</span>
            <a href="javascript:;" class="color-link" @click="searchGift"
               style="margin-left:10px;vertical-align: middle;">选择礼品</a>

            <div v-if="giftList[0].productName" class="disableGenerate">
              <div>
                <label>您选的礼品</label>
                <div>
                  <img :src="giftList[0].picUrl"></img>
                  <div>
                    <p :title="giftList[0].productName">{{giftList[0].productName |
                      productNameFilter}}</p>
                    <p><span class="color-red">{{giftList[0].needScore}}</span> 海贝</p>
                    <p>历史兑换量(<span class="color-red">{{giftList[0].exchangeNum}}</span>)</p>
                  </div>
                </div>
                <a href="javascript:;" class="color-link" @click="changeGift">修改礼品</a>
              </div>
              <div>
                <label>礼品总数</label>
                <el-input style="width: 104px;margin:0 5px;" v-model="giftList[0].num" :maxlength="9"
                          placeholder="输入数量" @change="inputChangeFilter('num','giftList')"></el-input>
                <span>件，赠完为止</span>
              </div>
            </div>

            <div v-if="!giftProductInit && !giftList[0].productName"
                 style="width:100%;height:289px;background: #e5f2ff;margin-top:22px;">
              <div style="padding-top:104px;text-align:center;">
                <img src="../../assets/images/icon_smail.png" alt="" style="vertical-align: top;">
                <div style="display:inline-block;margin-top:5px;margin-left:15px;">
                  <p style="font-size:16px;color:#859cb4;">输入价格范围后</p>
                  <p style="font-size:16px;color:#859cb4;">将为您推荐礼品</p>
                </div>
              </div>
            </div>

            <div v-if="!giftList[0].productName&&giftProductInit" class="gift-select-list">
              <el-radio-group v-model="giftList[0].giftType" style="width: 100%;">
                <el-radio-button label="1">推荐礼品</el-radio-button>
                <el-radio-button label="2">自定义礼品</el-radio-button>
              </el-radio-group>
              <div v-if="giftList[0].giftType==1" class="gift-select-ul recommended-list">
                <ul>
                  <li v-for="gift in recommendGift">
                    <img :src="gift.photoLink"></img>
                    <div>
                      <p :title="gift.productName">{{gift.productName | productNameFilter}}</p>
                      <p><span class="color-red">{{gift.needScore}}</span> 海贝</p>
                      <p>历史兑换量(<span class="color-red">{{gift.amount}}</span>)</p>
                    </div>
                    <el-button class="trs-btn" style="width:66px;" @click="selectProduct(gift)">
                      送这个
                    </el-button>
                  </li>
                  <li v-if="nopro02">未找到合适礼品，请重新搜索！</li>
                </ul>
              </div>
              <div v-if="giftList[0].giftType==2" class="gift-select-ul">
                <el-input style="width: 98%;margin:5px;" v-model="keyWords" placeholder="请输入礼品名称"
                          @keyup.enter.native="listRecommendGiftByKeyWords"></el-input>
                <ul>
                  <li v-for="gift in recommendGiftByKeyWords.data">
                    <img :src="gift.photoLink"></img>
                    <div>
                      <p :title='gift.productName'>{{gift.productName | productNameFilter}}</p>
                      <p><span class="color-red">{{gift.needScore}}</span> 海贝</p>
                      <p>历史兑换量(<span class="color-red">{{gift.amount}}</span>)</p>
                    </div>
                    <el-button class="trs-btn" style="width:66px;" @click="selectProduct(gift)">
                      送这个
                    </el-button>
                  </li>
                  <li v-if="nopro">未找到合适礼品，请重新搜索！</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveGiftConfig" class="trs-btn" style="width:125px;">配置完成</el-button>
      </div>
    </el-dialog>

    <!--配置礼品，积分和礼物，按特定型号组合-->
    <el-dialog
      class="gift-rights-dialog trs-dialog"
      title="配置礼品"
      :visible.sync="giftRightsDialog"
       :modal-append-to-body="false"
    >
      <p
        class="gift-budget"
        v-if="(form.giftType===5 &&type1Config.type===2) || form.giftType!==5"
      >
        <span style=" width: auto; display: inline-block;float: left;">您配置的产品型号为 </span><span
        class="color-red"
        style=" width: auto; max-width: 120px;height: 20px;line-height: 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: inline-block;float: left;"
        :title="modelNo">{{modelNo}}</span><span
        style=" width: auto; display: inline-block;float: left;"> ,产品总价为 </span><span
        class="color-red"
        style=" width: auto; display: inline-block;float: left;">{{bpp_price_ev | numFilter}}</span><span
        style=" width: auto; display: inline-block;float: left;">,请配置礼品</span>
      </p>
      <!--todo form.giftType===4待删除-->
      <div class="score-rights-div" v-if="form.giftType === 1||form.giftType===2 || form.giftType===2"
           style="width: 100%;">
        <el-radio-group v-model="checked1" @change="inttypeChange">
          <el-radio class="radio" :label="1">您要送积分</el-radio>
        </el-radio-group>

        <el-radio-group v-model="scoreList[0].rightType" @change="jfChange"
                        style="margin: 15px 0 10px;display:block;">
          <el-radio :disabled="intorpro" :label="1">固定积分</el-radio>
          <el-radio :disabled="intorpro" v-if="form.rightSmallType != 2" :label="2">按产品价格比例</el-radio>
        </el-radio-group>
        <div v-if="scoreList[0].rightType==1" class="score-rights-input">
          <div>
            <label>赠送</label>
            <el-input style="width: 104px;margin:0 5px;" :disabled="intorpro" v-model="scoreList[0].score"
                      :maxlength="9" placeholder="输入积分数量"
                      @change="inputChangeFilter('score','scoreList')"></el-input>
            <span>积分</span>
          </div>
          <div>
            <label>礼品总数</label>
            <el-input style="width: 104px;margin:0 5px;" :disabled="intorpro" v-model="scoreList[0].num"
                      :maxlength="9" placeholder="输入礼品总数"
                      @change="inputChangeFilter('num','scoreList')"></el-input>
            <span>份，赠完为止</span>
          </div>
        </div>
        <div v-if="scoreList[0].rightType==2" class="score-rights-input by-price">
          <div>
            <label>产出销售额</label>
            <el-input style="width: 124px;margin:0 5px;" :disabled="intorpro"
                      v-model="scoreList[0].salesAmount" placeholder="输入产出销售额"
                      @change="inputChangeFilter('salesAmount','scoreList')"></el-input>
            <span>元</span>
          </div>
          <div>
            <label>按产品供价的</label>
            <el-input style="width: 124px;margin:0 5px;" :disabled="intorpro" :maxlength="3"
                      v-model="scoreList[0].priceScale" placeholder="输入百分比"
                      @change="inputChangeFilter('priceScale','scoreList')"></el-input>
            <!--:disabled="intorpro"-->
            <span>% 赠送</span>
          </div>
        </div>
      </div>
      <div
        v-else-if="form.giftType===3"
        class="gift-rights-div"
        style="width: 100%;"
      >
        <el-radio-group v-model="checked1" @change="inttypeChange">
          <el-radio class="radio" :label="2">您要送礼品</el-radio>
        </el-radio-group>

        <div class="score-rights-input">
          <div>
            <label>礼品价格范围</label>
            <el-input style="width: 82px;margin:0 5px;" :disabled="!intorpro"
                      v-model="giftList[0].purchasePriceStart" placeholder="输入价格" :maxlength="6"
                      @change="inputChangeFilter('purchasePriceStart','giftList')"></el-input>
            <span>-</span>
            <el-input style="width: 82px;margin:0 5px;" :disabled="!intorpro"
                      v-model="giftList[0].purchasePriceEnd" placeholder="输入价格" :maxlength="6"
                      @change="inputChangeFilter('purchasePriceEnd','giftList')"
                      @keyup.enter.native="searchGift"></el-input>
            <span>(元)</span>
            <a href="javascript:;" class="color-link" @click="searchGift"
               style="margin-left:10px;vertical-align: middle;">选择礼品</a>

            <div v-if="giftList[0].productName" class="disableGenerate">
              <div>
                <label>您选的礼品</label>
                <div>
                  <img :src="giftList[0].picUrl"></img>
                  <div>
                    <p :title="giftList[0].productName">{{giftList[0].productName |
                      productNameFilter}}</p>
                    <p><span class="color-red">{{giftList[0].needScore}}</span> 海贝</p>
                    <p>历史兑换量(<span class="color-red">{{giftList[0].exchangeNum}}</span>)</p>
                  </div>
                </div>
                <a href="javascript:;" class="color-link" @click="changeGift">修改礼品</a>
              </div>
              <div>
                <label>礼品总数</label>
                <el-input style="width: 104px;margin:0 5px;" v-model="giftList[0].num" :maxlength="9"
                          placeholder="输入数量" @change="inputChangeFilter('num','giftList')"></el-input>
                <span>件，赠完为止</span>
              </div>
            </div>

            <div v-if="!giftProductInit && !giftList[0].productName"
                 style="width:100%;height:289px;background: #e5f2ff;margin-top:22px;">
              <div style="padding-top:104px;text-align:center;">
                <img src="../../assets/images/icon_smail.png" alt="" style="vertical-align: top;">
                <div style="display:inline-block;margin-top:5px;margin-left:15px;">
                  <p style="font-size:16px;color:#859cb4;">输入价格范围后</p>
                  <p style="font-size:16px;color:#859cb4;">将为您推荐礼品</p>
                </div>
              </div>
            </div>

            <div v-if="!giftList[0].productName&&giftProductInit" class="gift-select-list">
              <el-radio-group v-model="giftList[0].giftType">
                <el-radio-button label="1">推荐礼品</el-radio-button>
                <el-radio-button label="2">自定义礼品</el-radio-button>
              </el-radio-group>
              <div v-if="giftList[0].giftType==1" class="gift-select-ul recommended-list">
                <ul>
                  <li v-for="gift in recommendGift">
                    <img :src="gift.photoLink"></img>
                    <div>
                      <p :title="gift.productName">{{gift.productName | productNameFilter}}</p>
                      <p><span class="color-red">{{gift.needScore}}</span> 海贝</p>
                      <p>历史兑换量(<span class="color-red">{{gift.amount}}</span>)</p>
                    </div>
                    <el-button class="trs-btn" style="width:66px;" @click="selectProduct(gift)">
                      送这个
                    </el-button>
                  </li>
                  <li v-if="nopro02">未找到合适礼品，请重新搜索！</li>
                </ul>
              </div>
              <div v-if="giftList[0].giftType==2" class="gift-select-ul">
                <el-input style="width: 98%;margin:5px;" v-model="keyWords" placeholder="请输入礼品名称"
                          @keyup.enter.native="listRecommendGiftByKeyWords"></el-input>
                <ul>
                  <li v-for="gift in recommendGiftByKeyWords.data">
                    <img :src="gift.photoLink"></img>
                    <div>
                      <p :title='gift.productName'>{{gift.productName | productNameFilter}}</p>
                      <p><span class="color-red">{{gift.needScore}}</span> 海贝</p>
                      <p>历史兑换量(<span class="color-red">{{gift.amount}}</span>)</p>
                    </div>
                    <el-button class="trs-btn" style="width:66px;" @click="selectProduct(gift)">
                      送这个
                    </el-button>
                  </li>
                  <li v-if="nopro">未找到合适礼品，请重新搜索！</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="gift-rights-div pos-rel"
        style="width: 100%;"
      >
        <el-radio-group v-model="checked1" @change="inttypeChange">
          <el-radio class="radio" :label="2">您要送礼品</el-radio>
        </el-radio-group>
        <div
          class="honorEnjoy-config-dialog"
        >
          <ol v-if="honorEnjoyCardList.length">
            <li
              :class="['honorEnjoy-config-giftItem',card.isActive && 'active']"
              v-for="(card,index) in honorEnjoyCardList"
              :key="index"
            >
              <img
                class="portrait"
                :src="card.picUrl"
              >
              <div class="cnt">
                <p class="mt20">{{card.cardName}}</p>
                <p class="mt20">兑换数量（{{card.num}}）</p>
              </div>
              <div class="btns">
                <el-button
                  @click="giveHonourEnjoyCard(card)"
                >送这个
                </el-button>
              </div>
            </li>
          </ol>
          <div
            v-else
            class="honorEnjoy-config-tips"
          >
            没有相应的尊享卡/卡券
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveGiftConfig" class="trs-btn" style="width:125px;">配置完成</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    }),
    honorCardDisabled() {
      /* 尊享卡配合老版预算下的生成方案禁用方案 */
      // 老版预算为0判断禁用
      let isDisabled = !!(this.costAmount === 0 && !this.type1Config.rightList.length && !this.type4Config.rightList.length && !this.type6Config.rightList.length);
      if (isDisabled && this.form.giftType === 5 && this.type1Config.type === 1 && this.type2Config.rightList[0] && this.type2Config.rightList[0].virtualGiftList && this.type2Config.rightList[0].virtualGiftList[0] && this.type2Config.rightList[0].virtualGiftList[0].cardType) {
        isDisabled = false;
      }
      return isDisabled;
    }
  },
  data() {
    return {
      title: '配置单品权益',
      disableGenerate: true, // 生成方案
      modelConstraintDialog: false,
      priceConstraintDialog: false,
      typeproductList: [],
      typeproductList2: [],
      typeproductList3: [],
      restaurants: [],
      pinleiop: true,
      industryList: [],
      productCategoryoptions: [],
      brandName: '',
      productCategory: '',
      productModel: '',
      brandName2: '',
      productCategory2: '',
      productModel2: '',
      brandName3: '',
      productCategory3: '',
      productModel3: '',
      brandNamePrice: '',
      productCategoryPrice: '',
      minPrice: '',
      maxPrice: '',
      modelConstraint: [
        {
          type: 1,
          productList: []
        },
        {
          type: 2,
          productList: []
        },
        {
          type: 3,
          productList: []
        }
      ],
      priceConstraint: {
        productList: []
      },
      pinpaioptions: [],
      form: {
        step: 3,
        rightBigType: 1,
        rightSmallType: 1,
        coupleNumber: '',
        coupleCategoryNumber: 2,
        productType: 1 // 尊享卡 卡券
      },
      rules: {},
      radio: 1,
      radio2: 1,
      radio3: 1,
      //   radio4: "推荐礼品",
      scoreList: [
        {
          rightType: 1, // 1-固定积分数   2-按产品价格比例
          score: '', // 单台积分数   rightType=1时使用
          num: '', // 覆盖范围台数  rightType=1时使用
          priceScale: '', // 价格比例 20表示按照20%比例  rightType=2时使用
          salesAmount: '' // 产出销售额 rightType=2 时使用
        }
      ],
      giftList: [
        {
          type: 1, // 1-线上  2-线下
          giftType: 1, // 1-推荐   2-自定义
          num: '', // 覆盖范围台数，选择套装的话 2个礼物num一致填写相同数目
          purchasePriceStart: '', // 采购价开始
          purchasePriceEnd: '', // 采购价结束
          giftId: '', // 产品唯一编码
          giftIdUnique: '', // 权益活动产品唯一编码
          picUrl: '', // 图片url
          needScore: '', // 所需积分
          sortId: '', // 排序id
          dataFrom: '', // hbmall/camall
          productUrl: '', // 产品链接
          productName: '', // 产品名称
          exchangeNum: '' // 历史兑换数量
        }
      ],
      options: [
        {
          value: 'haier',
          label: '海尔'
        },
        {
          value: 'casarte',
          label: '卡萨帝'
        },
        {
          value: 'tongshuai',
          label: '统帅'
        }
      ],
      value: '',
      scoreRightsDialog: false,
      giftRightsDialog: false,
      checked1: 1, // 1:积分 2：礼品
      checked2: false,
      intorpro: false,
      prozh: false,
      rightBrandName: '',
      productCategoryCode: '',
      productName: '',
      type1Config: {
        type: 2, // 1-产业下全部产品参加活动   2-单型号产品参加活动
        rightList: []
      },
      type2Config: {
        type: 1, // 1-产业下全部产品参加活动   2-单型号产品参加活动
        rightList: [{}]
      },
      type3Config: {
        type: 1, // 1-产业下全部产品参加活动   2-单型号产品参加活动
        rightList: [{}]
      },
      type4Config: {
        type: 2, // 1-产业下全部产品参加活动   2-单型号产品参加活动
        rightList: []
      },
      type6Config: {
        type: 2, // 1-产业下全部产品参加活动   2-单型号产品参加活动
        rightList: []
      },
      productList: [{ desc: '' }, { desc: '' }],
      lintList: [{
        desc: '', productCategoryCode: '', brandName: '', productCode: '', modelNo: ''
      }],
      listType5Config: {
        type: 3, // 1-产业下全部产品参加活动   2-单型号产品参加活动
        modelNoDetail: []
      },
      type5Config: {
        // type: 3, //1-产业下全部产品参加活动   2-单型号产品参加活动
        productList: [],
        rightList: [
          {
            scoreList: [],
            giftList: []
          }
        ]
      },
      type5List: {
        productList: [],
        rightList: [
          {
            scoreList: [],
            giftList: []
          }
        ]
      },
      // type5Config: {
      //     type: 3, //1-产业下全部产品参加活动   2-单型号产品参加活动
      //     modelNoDetail:[]
      // },
      recommendGift: [],
      recommendGiftByKeyWords: [],
      keyWords: '',
      buyAmount: '',
      productCategoryLength: 5,
      productCategoryName: '',
      listIndustryArr: [],
      budgetAmount: 0,
      startPrice: '',
      endPrice: '',
      giftProductCode: '',
      giftProductInit: false,
      nopro: false,
      nopro02: false,
      bpp_price: [],
      modelNo: '',
      costAmount: 0,
      type4TabShow: '1',
      buyNumProductCode: [],
      giftRightsFullDialog: false,
      limitDialog: false,
      limitList: [],
      oldlimit: [],
      newlimit: [],
      lintText: '选择限制大类',
      numberOptions: [1, 2, 3, 4, 5],
      coupleOptions: [{
        id: 1,
        value: '类'
      }, {
        id: 2,
        value: '件'
      }],
      bpp_price_ev: 0,
      bpp_price_mo: 0,
      maxBuyAmount: '',
      prooptions: [],
      saveLoading: false,
      honorEnjoyCardList: []// 尊享卡列表
    };
  },
  filters: {
    productNameFilter(val) {
      if (val) {
        if (val.length > 9) {
          val = `${val.substring(0, 9)}...`;
        }
      }
      return val;
    },
    numFilter(val) {
      val = parseFloat(val) || 0;
      return val;
    }
  },
  methods: {
    couChange() {
      if (this.form.coupleNumber.length == 1) {
        this.form.coupleNumber = this.form.coupleNumber.replace(/[^1-9]/g, '');
      } else {
        this.form.coupleNumber = this.form.coupleNumber.replace(/\D/g, '');
      }
    },
    handleClick(tab, event) {
      this.type6Config.rightList = [];
      this.type4Config.rightList = [];
      this.buyNumProductCode = [];
      this.costAmount = 0;
      this.maxBuyAmount = '';
      this.buyAmount = '';
      if (this.type4TabShow == 2) {
        if (this.limitList.indexOf(2) != -1) {
          this.limitList.splice(this.limitList.indexOf(2), 1);
          this.sureLimit();
        }
      }
    },
    xClose(e) {
      if (e == 1) {
        this.newlimit.splice(this.limitList.indexOf(1), 1);
        this.sureLimit();
        this.modelConstraint[0].productList = [];
      }
      if (e == 2) {
        this.newlimit.splice(this.limitList.indexOf(2), 1);
        this.sureLimit();
        this.modelConstraint[1].productList = [];
      }
      if (e == 3) {
        this.newlimit.splice(this.limitList.indexOf(3), 1);
        this.sureLimit();
        this.modelConstraint[2].productList = [];
      }
      if (e == 4) {
        this.newlimit.splice(this.limitList.indexOf(4), 1);
        this.sureLimit();
        this.priceConstraint.productList = [];
      }
    },
    cancalLimit() {
      this.limitList = this.oldlimit;
      this.limitDialog = false;
    },
    sureLimit() {
      this.oldlimit = this.limitList;
      this.newlimit = this.limitList;
      let list = JSON.parse(JSON.stringify(this.limitList));
      for (const i in list) {
        if (list[i] == 1) {
          list[i] = '订单必须包含产品';
        }
        if (list[i] == 2) {
          list[i] = '权益计算指定型号';
        }
        if (list[i] == 3) {
          list[i] = '权益计算排除型号';
        }
        if (list[i] == 4) {
          list[i] = '品类价格约束';
        }
      }
      list = list.join('/');
      if (this.limitList.length > 0) {
        this.lintText = list;
      } else {
        this.lintText = '选择限制大类';
      }
      this.limitDialog = false;
    },
    limitClose() {
      this.limitList = this.oldlimit;
      this.limitDialog = false;
    },
    delOrd(index, e) {
      if (e == 1) {
        this.modelConstraint[0].productList.splice(index, 1);
      }
      if (e == 2) {
        this.modelConstraint[1].productList.splice(index, 1);
      }
      if (e == 3) {
        this.modelConstraint[2].productList.splice(index, 1);
      }
    },
    pinpaiChange(e, index) {
      if (e == 1) {
        this.lintList[index].productCategoryCode = '';
        this.lintList[index].productCode = '';
        this.lintList[index].modelNo = '';
        this.lintList[index].desc = '';
      }
    },
    pinleiChange(e, index) {
      if (e == 1) {
        this.lintList[index].productCode = '';
        this.lintList[index].modelNo = '';
        this.lintList[index].desc = '';
      }
    },
    generateLint() {
      // 判断自己数组中不能重复
      for (const i in this.lintList) {
        if (this.lintList[i].brandName == '') {
          this.$message.warning('请选择品牌');
          return;
        }
        if (this.lintList[i].productCategoryCode == '') {
          this.$message.warning('请选择品类');
          return;
        }
        const arr = JSON.parse(JSON.stringify(this.lintList));
        arr.splice(i, 1);
        for (const j in arr) {
          if (this.lintList[i].desc == '') {
            if (this.lintList[i].brandName == arr[j].brandName && this.lintList[i].productCategoryCode == arr[j].productCategoryCode) {
              this.$message.warning('约束限制不能重复！');
              return;
            }
          } else {
            if (this.lintList[i].desc == arr[j].desc) {
              this.$message.warning('约束限制不能重复！');
              return;
            }
            if (arr[j].desc == '' && this.lintList[i].brandName == arr[j].brandName && this.lintList[i].productCategoryCode == arr[j].productCategoryCode) {
              this.$message.warning('约束限制不能重复！');
              return;
            }
          }
        }
      }
      // 判断已有元素和新增元素不能重复
      for (const i in this.modelConstraint[0].productList) {
        for (const j in this.modelConstraint[0].productList[i]) {
          for (const k in this.lintList) {
            if (this.lintList[k].desc == '') {
              if (this.lintList[k].brandName == this.modelConstraint[0].productList[i][j].brandName && this.lintList[k].productCategoryCode == this.modelConstraint[0].productList[i][j].productCategoryCode) {
                this.$message.warning('约束限制不能重复！');
                return;
              }
            }
            if (this.modelConstraint[0].productList[i][j].desc == '') {
              if (this.lintList[k].brandName == this.modelConstraint[0].productList[i][j].brandName && this.lintList[k].productCategoryCode == this.modelConstraint[0].productList[i][j].productCategoryCode) {
                this.$message.warning('约束限制不能重复！');
                return;
              }
            }
          }
        }
      }

      this.modelConstraint[0].productList.push(this.lintList);
      this.lintList = [{
        desc: '', productCategoryCode: '', brandName: '', productCode: '', modelNo: ''
      }];
    },
    choicelimit() {
      this.limitDialog = true;
    },
    inputChangeFilter(value, list) {
      const _this = this;
      setTimeout(() => {
        if (list) {
          _this[list][0][value] = _this[list][0][value].replace(/[^\d]/g, '');
        } else {
          _this[value] = _this[value].replace(/[^\d]/g, '');
          if (_this[value] == 0) {
            _this[value] = '';
          }
        }
      });
    },
    inttypeChange(value) {
      if (value == 1) {
        this.intorpro = false;
      } else {
        this.intorpro = true;
      }
    },
    jfChange(value) {
      if (value == 1) {
        this.scoreList[0].priceScale = '';
        this.scoreList[0].salesAmount = '';
      } else {
        this.scoreList[0].num = '';
        this.scoreList[0].score = '';
      }
    },
    type1ConfigTypeChange(value) {
      // this.type1Config.type = value
      // this.type1Config.rightList = []
      // this.type2Config.rightList = [{}]
      // this.disableGenerate = false
      // this.productName = ''
      // this.costAmount = 0
      // 先为虚拟礼品设置change，上面代码直前人注释掉是不行的
      if (this.form.giftType === 5) {
        // reload确保type重设的时候，再reload的时候不执行
        if (!this.isReload) {
          this.type1Config.rightList = [];
          this.type2Config.rightList = [{}];
        }
        this.isReload = false;
      }
    },
    prev() {
      this.$router.push({
        path: '/rights/rightsRangetwo',
        query: { id: this.$route.query.id }
      });
    },
    radioChange() {

      // for (let i = 0; i < this.productCategoryLength; i++) {
      //   if (i <= 5 && i >= 2) {
      //     this.type3Config.rightList.push({});
      //   }
      // }
    },
    type4TabClick(index) {
      // this.type4TabShow = index;
    },
    save({ temporary, getCostAmount }) {
      /* 暂存/保存方案 */
      this.giftRightsDialog = false;
      this.saveLoading = true;

      if (this.radio !== 2) {
        this.form.coupleNumber = '';
      }
      const data = this.gUtils.simpleDeepCopy(this.form);

      // 特殊约束限制
      data.modelConstraint = this.modelConstraint;
      data.priceConstraint = this.priceConstraint;

      if (this.form.rightSmallType === 1) {
        // type1Config.type 1:全部 2：单型号（多型号每型号一种礼品） 3:多型号（多产品对应1礼品）--需求起名有歧义
        if (this.type1Config.type === 2 || this.type1Config.type === 3) {
          data.scoreGiftConfig = this.type1Config;
        } else {
          data.scoreGiftConfig = this.type2Config;
        }
      } else if (this.form.rightSmallType === 2) {
        if (this.radio === 2) {
          if (this.type4TabShow === 1) {
            data.scoreGiftConfig = this.type4Config;
          } else if (this.type4TabShow === 2) {
            data.scoreGiftConfig = this.type6Config;
          }

          if (this.type4TabShow === 2) {
            if (this.buyNumProductCode.length === 0) {
              this.$message({
                type: 'warning',
                message: '请添加套餐产品！'
              });
              return false;
            }

            data.buyNumProductCode = {
              productList: this.buyNumProductCode
            };
            // data.buyNumProductCode = JSON.stringify(data.buyNumProductCode)
          }
        } else if (this.radio === 1) {
          data.scoreGiftConfig = {
            type: '1'
          };

          for (let i = 0; i < this.type3Config.rightList.length; i++) {
            if (i === 0 && this.type3Config.rightList[i].scoreList) {
              data.scoreGiftConfig.twoTypes = this.type3Config.rightList[i].scoreList[0];
            } else if (i === 1 && this.type3Config.rightList[i].scoreList) {
              data.scoreGiftConfig.threeTypes = this.type3Config.rightList[i].scoreList[0];
            } else if (i === 2 && this.type3Config.rightList[i].scoreList) {
              data.scoreGiftConfig.fourTypes = this.type3Config.rightList[i].scoreList[0];
            } else if (i === 3 && this.type3Config.rightList[i].scoreList) {
              data.scoreGiftConfig.fiveTypes = this.type3Config.rightList[
                i
              ].scoreList[0];
            }
          }
        } else if (this.radio === 3) {
          data.scoreGiftConfig = this.listType5Config;
        }
      }
      const _this = this;
      if (getCostAmount) {
        const params = {
          giftConfig: JSON.stringify(data.scoreGiftConfig),
          id: data.id
        };
        if (!Object.keys(data.scoreGiftConfig).length) {
          return;
        }
        this.requestRights
          .getCostAmountByGiftConfig(params)
          .then((data) => {
            this.disableGenerate = false;
            this.saveLoading = false;

            if (data) {
              this.costAmount = data;
            } else {
              this.costAmount = 0;
            }

            if (this.budgetAmount < this.costAmount) {
              this.disableGenerate = true;
              this.$message({
                type: 'warning',
                message: '预算不足！'
              });
            }
          });
      } else {
        axios.post(`${this.apiUrl}vipcenter/orderRights/modifyOrderRights`,
          {
            channelType: 2,
            coupleCategoryNumber: this.form.coupleCategoryNumber,
            coupleNumber: this.form.coupleNumber,
            giftType: this.form.giftType,
            id: this.form.id,
            modelConstraint: data.modelConstraint,
            priceConstraint: data.priceConstraint,
            rightBigType: this.form.rightBigType,
            rightSmallType: this.form.rightSmallType,
            scoreGiftConfig: data.scoreGiftConfig,
            step: 3
          },)
          .then((response) => {
            console.log(response);
            if (response.data.isSuccess == true) {
              _this.$message({
                message: '生成方案成功!',
                type: 'success'
              });
              _this.$router.push({ path: '/rights/rightsconfirmtwo', query: { id: _this.form.id } });
            } else {
              _this.$message({
                message: response.data.msg,
                type: 'warning'
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
        // if (temporary == "temporary") {
        //     this.requestRights.saveMomentOrderRights(data).then(function (data) {
        //         _this.saveLoading=false
        //         self.saveing = false;
        //         if (data) {
        //             _this.$message({
        //                 type: "success",
        //                 message: "暂存成功"
        //             });
        //         }
        //     });
        // } else {
        //     this.requestRights.saveNextOrderRights(data).then(function (data) {
        //         _this.saveLoading=false
        //         if (data) {
        //             _this.$router.push({
        //                 path: "/rights/rightsconfirm",
        //                 query: {id: data}
        //             });
        //         }
        //     });
        // }
      }
    },
    getOrderRightsById() {
      const _this = this;
      const params = {
        id: this.$route.query.id
      };
      this.requestRights.getOrderRightsById(params).then((data) => {
        if (data) {
          // 特殊约束限制
          if (data.modelConstraint) {
            this.modelConstraint = JSON.parse(data.modelConstraint);
          }
          if (data.priceConstraint) {
            this.priceConstraint = JSON.parse(data.priceConstraint);
          }
          if (this.modelConstraint[0].productList.length > 0) {
            this.limitList.push(1);
          }
          if (this.modelConstraint[1].productList.length > 0) {
            this.limitList.push(2);
          }
          if (this.modelConstraint[2].productList.length > 0) {
            this.limitList.push(3);
          }
          if (this.priceConstraint.productList.length > 0) {
            this.limitList.push(4);
          }
          this.sureLimit();

          const pinpaiarr = data.brandName.split(',');
          pinpaiarr.forEach((el) => {
            this.pinpaioptions.push(el);
          });
          if (data.productCategoryCode !== 'all') {
            this.pinleiop = false;
            this.productCategoryoptions.push('全部');
            data.productCategoryName.split(',').forEach((el) => {
              this.productCategoryoptions.push(el);
              this.prooptions.push(el);
            });
          } else {
            this.requestRights.listIndustry().then((data) => {
              if (data) {
                this.productCategoryoptions.push('全部');
                for (const item in data) {
                  this.productCategoryoptions.push(item);
                  this.prooptions.push(item);
                }
              }
            });
          }
          this.form.id = data.id;
          this.form.channelType = data.channelType || 1;
          this.form.step = 3;
          this.form.rightBigType = data.rightBigType;
          this.form.rightSmallType = data.rightSmallType;
          this.form.giftType = data.giftType;
          this.form.coupleNumber = data.coupleNumber;
          this.form.coupleCategoryNumber = data.coupleCategoryNumber || 1;

          this.rightBrandName = data.rightBrandName;
          this.productCategoryCode = data.productCategoryCode;
          this.productCategoryName = data.productCategoryName;
          // this.productCategoryLength =
          //   data.productCategoryCode == "all" ? 5 : 1;

          if (data.giftType === 1 || data.giftType === 2) {
            this.checked1 = 1;
          } else {
            this.checked1 = 2;
            this.intorpro = true;
          }

          if (data.rightSmallType === 1) {
            this.title = '配置单品权益';
          } else if (data.rightSmallType === 2) {
            this.title = '配置套购权益';
          }

          this.budgetAmount = data.budgetAmount;

          for (let i = 0; i < this.productCategoryLength; i++) {
            if (i <= 5 && i >= 2) {
              this.type3Config.rightList.push({});
            }
          }

          if (data.scoreGiftConfig) {
            this.disableGenerate = false;
          }

          let scoreGiftConfig = data.scoreGiftConfig
            ? JSON.parse(data.scoreGiftConfig)
            : {};
          scoreGiftConfig.type && (scoreGiftConfig.type *= 1);
          if (data.buyNumProductCode) {
            this.buyNumProductCode = JSON.parse(data.buyNumProductCode).productList;
            this.type4TabShow = '2';
          }
          if (data.rightSmallType === 2) {
            // 当第一步选择积分时，scoreGiftConfig置空
            if (data.giftType == 1 || data.giftType == 2) {
              // type == 3json结构修改，特殊判断
              if (scoreGiftConfig.type == 3) {
                if (scoreGiftConfig.modelNoDetail && scoreGiftConfig.modelNoDetail[0].rightList[0].giftList && scoreGiftConfig.modelNoDetail[0].rightList[0].giftList[0]) {
                  scoreGiftConfig = [];
                }
              } else if (scoreGiftConfig.rightList && scoreGiftConfig.rightList[0] && scoreGiftConfig.rightList[0].giftList && scoreGiftConfig.rightList[0].giftList[0]) {
                scoreGiftConfig = [];
              }
              this.radio = parseInt(scoreGiftConfig.type) || 1;
            } else {
              if (scoreGiftConfig.type == 3) {
                if (scoreGiftConfig.modelNoDetail && scoreGiftConfig.modelNoDetail[0].rightList[0].scoreList && scoreGiftConfig.modelNoDetail[0].rightList[0].scoreList[0]) {
                  scoreGiftConfig = [];
                }
              } else if (scoreGiftConfig.rightList && scoreGiftConfig.rightList[0] && scoreGiftConfig.rightList[0].scoreList && scoreGiftConfig.rightList[0].scoreList[0]) {
                scoreGiftConfig = [];
              }
              if (parseInt(scoreGiftConfig.type) === 1) {
                scoreGiftConfig.type = 2;
                scoreGiftConfig = [];
              }
              this.radio = parseInt(scoreGiftConfig.type) || 2;
            }
            if (scoreGiftConfig.type === 1) {
              this.type3Config.rightList = [
                {
                  scoreList: scoreGiftConfig.twoTypes
                    ? [scoreGiftConfig.twoTypes]
                    : []
                },
                {
                  scoreList: scoreGiftConfig.threeTypes
                    ? [scoreGiftConfig.threeTypes]
                    : []
                },
                {
                  scoreList: scoreGiftConfig.fourTypes
                    ? [scoreGiftConfig.fourTypes]
                    : []
                },
                {
                  scoreList: scoreGiftConfig.fiveTypes
                    ? [scoreGiftConfig.fiveTypes]
                    : []
                }
              ];
            } else if (scoreGiftConfig.type == 2) {
              if (this.type4TabShow == 1) {
                this.type4Config = scoreGiftConfig;
              } else if (this.type4TabShow == 2) {
                this.type6Config = scoreGiftConfig;
              }
            } else if (scoreGiftConfig.type == 3) {
              // if(scoreGiftConfig.productList.length!=[]){
              //     this.productList = scoreGiftConfig.productList
              // }
              for (const i in scoreGiftConfig.modelNoDetail) {
                if (!scoreGiftConfig.modelNoDetail[i].rightList[0].scoreList) {
                  scoreGiftConfig.modelNoDetail[i].rightList[0].scoreList = [];
                }
                if (!scoreGiftConfig.modelNoDetail[i].rightList[0].giftList) {
                  scoreGiftConfig.modelNoDetail[i].rightList[0].giftList = [];
                }
              }
              this.listType5Config = scoreGiftConfig;
            }
          } else if (data.rightSmallType === 1) {
            // todo 添加尊享卡list
            if (data.giftType === 1 || data.giftType === 2) {
              if (scoreGiftConfig.rightList && scoreGiftConfig.rightList[0] && scoreGiftConfig.rightList[0].giftList && scoreGiftConfig.rightList[0].giftList[0]) {
                scoreGiftConfig = [];
              }
              if (scoreGiftConfig.type === 2) {
                this.type1Config = scoreGiftConfig;
              } else if (scoreGiftConfig.type === 1) {
                this.type2Config = scoreGiftConfig;
                this.type1Config.type = 1;
              }
            } else if (data.giftType === 5) {
              /* 虚拟卡（尊享卡、卡券） */
              if (scoreGiftConfig.type) {
                let configObjName;
                // 全部放type2Config，其他放type1Config
                if (scoreGiftConfig.type === 1) {
                  configObjName = 'type2Config';
                } else {
                  configObjName = 'type1Config';
                }
                this[configObjName].rightList = scoreGiftConfig.rightList;
                this.type1Config.type = scoreGiftConfig.type;
              }
            } else {
              if (scoreGiftConfig.rightList && scoreGiftConfig.rightList[0] && scoreGiftConfig.rightList[0].scoreList && scoreGiftConfig.rightList[0].scoreList[0]) {
                scoreGiftConfig = [];
              }
              if (scoreGiftConfig.type === 2) {
                this.type1Config = scoreGiftConfig;
              } else if (scoreGiftConfig.type === 1) {
                scoreGiftConfig = [];
                this.type2Config = [];
                this.type1Config.type = 2;
              }
            }

            this.type1Config.type = parseInt(this.type1Config.type);
          }

          if (data.buyNumProductCode) {
            this.buyNumProductCode = JSON.parse(data.buyNumProductCode).productList;
            this.type4TabShow = '2';
          }

          // 计算成本
          const params = {
            giftConfig: JSON.stringify(scoreGiftConfig),
            id: data.id
          };
          if (!Object.keys(scoreGiftConfig).length) {
            return;
          }
          // 存在礼品配置设置个tag，表示第一次加载，为了type1ConfigTypeChange，下面的type1ConfigTypeChange需要干掉
          this.isReload = true;
          this.requestRights
            .getCostAmountByGiftConfig(params)
            .then((data) => {
              if (data) {
                this.costAmount = data;
              } else {
                this.costAmount = 0;
              }

              if (this.budgetAmount < this.costAmount) {
                this.$message({
                  type: 'warning',
                  message: '预算不足！'
                });
              }
            });

          setTimeout(() => {
            this.radioChange = () => {
              this.type3Config = {
                type: 1, // 1-产业下全部产品参加活动   2-单型号产品参加活动
                rightList: [{}]
              };
              this.type4Config = {
                type: 2, // 1-产业下全部产品参加活动   2-单型号产品参加活动
                rightList: []
              };
              this.type6Config = {
                type: 2, // 1-产业下全部产品参加活动   2-单型号产品参加活动
                rightList: []
              };
              this.listType5Config = {
                type: 3, // 1-产业下全部产品参加活动   2-单型号产品参加活动
                modelNoDetail: []
              };

              for (let i = 0; i < this.productCategoryLength; i++) {
                if (i <= 5 && i >= 2) {
                  this.type3Config.rightList.push({});
                }
              }

              this.costAmount = 0;
            };

            this.type1ConfigTypeChange = (value) => {
              this.type1Config.type = value;
              this.type1Config.rightList = [];
              this.type2Config.rightList = [{}];
              this.disableGenerate = false;
              this.productName = '';
              this.costAmount = 0;
            };
          }, 500);
        }
      });
    },
    listProductInfo(queryString, cb) {
      const params = {
        brandName: this.rightBrandName,
        code: this.productCategoryCode,
        productName: queryString
      };

      this.requestRights.listProductInfo(params).then(({ entities }) => {
        if (entities) {
          for (let i = 0; i < entities.length; i++) {
            entities[i].desc = `${entities[i].pro_band
            } | ${
              entities[i].mmt_department
            } | ${
              entities[i].mmt_material_descrition}`;
          }
          cb(entities);
        } else {
          cb([]);
        }
      });
    },
    productSelect(item) {
      const isRepeat = this.type1Config.rightList.find(v => v.productCode === item.mmt_material_code);

      if (!isRepeat) {
        this.disableGenerate = true;
        const product = {
          productCode: item.mmt_material_code, // 9位编码
          modelNo: item.mmt_material_descrition, // 型号
          brandName: item.pro_band, // 品牌
          productCategoryCode: item.mmt_department, // 产业名称
          bpp_pric: item.bpp_price
        };
        const curVirtualGiftList = this.type1Config.rightList.find(v => v.virtualGiftList);
        if (curVirtualGiftList) {
          this.$set(product, 'virtualGiftList', curVirtualGiftList);
          this.disableGenerate = false;
        }

        this.type1Config.rightList.push(product);
      }
      this.bpp_price = this.type1Config.rightList.map(v => v.bpp_price);
      this.productName = '';
    },
    deleteGift(item, index) {
      this.$message({ message: '活动产品范围不能进行修改！' });
      // this.bpp_price.splice(index, 1);
      // this.type1Config.rightList.splice(index, 1);
      // this.save("temporary", true);
      // if (this.type1Config.rightList.length == 0) {
      //     this.bpp_price = 0
      // } else {
      //     this.bpp_price = 0
      //     for (let i = 0; i < this.type1Config.rightList.length; i++) {
      //         this.bpp_price += this.type1Config.rightList[i].bpp_price;
      //     }
      // }
    },
    deleteLint(index) {
      if (this.lintList.length == 1) {
        return;
      }
      this.lintList.splice(index, 1);
      // this.save("temporary", true);

      this.lintnum();
    },
    deletepro(index) {
      this.$message({ message: '套购方式组合不能进行修改' });
      // if (this.productList.length == 2) {
      //     return;
      // } else {
      //     this.productList.splice(index, 1);
      //     this.save("temporary", true);
      // }
      // this.testnum();
    },
    deletescor(index) {
      this.$message({ message: '套购方式组合不能进行修改！' });
      // this.type4Config.rightList.splice(index, 1);
      // this.save("temporary", true);
    },
    deletescor01(index) {
      this.$message({ message: '套购方式组合不能进行修改！' });
      // this.type6Config.rightList.splice(index, 1);
      // this.save("temporary", true);
    },
    deletesetmail(index) {
      this.$message({ message: '套购方式组合不能进行修改！' });
      // delete this.type3Config.rightList[index].scoreList
      // this.$forceUpdate()
    },
    deletetype5Config(index) {
      this.$message({ message: '套购方式组合不能进行修改！' });
      // this.listType5Config.modelNoDetail.splice(index,1)
      // this.bpp_price.splice(index,1)
      // this.save("temporary", true);
    },
    deletexh(index) {
      this.$message({ message: '套购方式组合不能进行修改！' });
      // this.buyNumProductCode.splice(index, 1);
      // this.save("temporary", true);
    },
    type3ProductSelect(item, e) {
      const isRepeat = false;
      const productArr = [];
      for (let i = 0; i < this.productList.length; i++) {
        if (this.productList[i].desc) {
          if ($.inArray(this.productList[i].desc, productArr) < 0) {
            productArr.push(this.productList[i].desc);
          } else {
            this.productList[i].desc = '';
            this.$message({
              type: 'warning',
              message: '产品型号不能重复！'
            });
          }
        }
      }

      this.bpp_price_mo = 0;
      for (let i = 0; i < this.productList.length; i++) {
        if (this.productList[i].desc == item.desc) {
          this.productList[i].modelNo = item.mmt_material_descrition;
          this.productList[i].desc = item.desc;
          this.productList[i].productCode = item.mmt_material_code;
          this.productList[i].brandName = item.pro_band;
          this.productList[i].productCategoryCode = item.mmt_department;
          this.productList[i].bpp_price = item.bpp_price || 0;
        }
        this.productList[i].bpp_price = this.productList[i].bpp_price || 0;
        this.bpp_price_mo += this.productList[i].bpp_price;
      }
      this.testnum();
    },
    type3ProductFocus(item, e) {

    },
    type4ProductSelect(item, e) {
      let isRepeat = false;
      for (let i = 0; i < this.buyNumProductCode.length; i++) {
        if (
          this.buyNumProductCode[i].productCode == item.mmt_material_code
        ) {
          isRepeat = true;
          this.$message({
            message: '无需选择相同型号',
            type: 'warning'
          });
        }
      }
      if (!isRepeat) {
        this.buyNumProductCode.push({
          productCode: item.mmt_material_code, // 9位编码
          modelNo: item.mmt_material_descrition, // 型号
          brandName: item.pro_band, // 品牌
          productCategoryCode: item.mmt_department// 产业名称
        });
      }
      this.productName = '';
    },
    configGift(type, index, productCode, scoreList, giftList, modelNo, num) {
      this.$message({ message: '套购方式组合不能进行修改' });

      // //this.checked1 = "1";
      // if(type==5){
      //     this.bpp_price_ev=this.bpp_price[num]
      // }else{
      //     this.bpp_price_ev=this.bpp_price[index]
      // }

      // if (scoreList && scoreList.length > 0) {
      //     this.scoreList = scoreList;
      // } else {
      //     this.scoreList = [
      //         {
      //             rightType: 1, //1-固定积分数   2-按产品价格比例
      //             score: "", //单台积分数   rightType=1时使用
      //             num: "", //覆盖范围台数  rightType=1时使用
      //             priceScale: "", //价格比例 20表示按照20%比例  rightType=2时使用
      //             salesAmount: "" //产出销售额 rightType=2 时使用
      //         }
      //     ];
      // }

      // if (giftList && giftList.length > 0) {
      //     this.checked1 = "2";
      //     this.giftList = giftList
      //     this.intorpro = true
      // } else {
      //     this.giftList = [
      //         {
      //             type: 1,
      //             giftType: 1, //1-推荐   2-自定义
      //             num: "", //覆盖范围台数，选择套装的话 2个礼物num一致填写相同数目
      //             purchasePriceStart: "", //采购价开始
      //             purchasePriceEnd: "", //采购价结束
      //             giftId: "", //产品唯一编码
      //             giftIdUnique: "", //权益活动产品唯一编码
      //             picUrl: "", //图片url
      //             needScore: "", //所需积分
      //             sortId: "", //排序id
      //             dataFrom: "", //hbmall/camall
      //             productUrl: "", //产品链接
      //             productName: "", //产品名称
      //             exchangeNum: "" //历史兑换数量
      //         }
      //     ];
      // }
      // this.giftProductInit = false;

      // var _this = this;
      // if (type == 1) {
      //     this.giftRightsDialog = true;
      //     // this.listRecommendGift(productCode);
      //     this.giftProductCode = productCode;
      //     if (type == 1) {
      //         this.modelNo = modelNo;
      //     } else if (type == 5) {

      //         var modelNos = ''
      //         for (var a = 0; a < modelNo.length; a++) {
      //             modelNos += modelNo[a].modelNo + ','
      //         }
      //         this.modelNo = modelNos.substring(0, modelNos.length - 1)
      //     }

      //     this.saveGiftConfig = function () {
      //         if (_this.checked1 == 1) {
      //             if (
      //                 (_this.scoreList[0].rightType == 1 &&
      //                     _this.scoreList[0].num != "" &&
      //                     _this.scoreList[0].score != "") ||
      //                 (_this.scoreList[0].rightType == 2 &&
      //                     _this.scoreList[0].priceScale != "" &&
      //                     _this.scoreList[0].salesAmount != "")
      //             ) {
      //                 _this["type" + type + "Config"].rightList[
      //                     index
      //                     ].scoreList = JSON.parse(JSON.stringify(_this.scoreList));
      //                 _this["type" + type + "Config"].rightList[index].giftList = [];
      //             } else {
      //                 _this.$message({
      //                     type: "warning",
      //                     message: "请配置积分！"
      //                 });
      //                 return false;
      //             }
      //         } else if (_this.checked1 == 2) {
      //             if (_this.giftList[0].giftId == "") {
      //                 _this.$message({
      //                     type: "warning",
      //                     message: "请选择礼品！"
      //                 });

      //                 return false;
      //             }

      //             // if (
      //             //     _this.giftList[0].purchasePriceStart == "" ||
      //             //     _this.giftList[0].purchasePriceEnd == ""
      //             // ) {
      //             //     _this.$message({
      //             //         type: "warning",
      //             //         message: "请填写价格范围！"
      //             //     });
      //             //
      //             //     return false;
      //             // }

      //             if (_this.giftList[0].num == "") {
      //                 _this.$message({
      //                     type: "warning",
      //                     message: "请填写礼品总数！"
      //                 });

      //                 return false;
      //             }

      //             _this["type" + type + "Config"].rightList[
      //                 index
      //                 ].giftList = JSON.parse(JSON.stringify(_this.giftList));
      //             _this["type" + type + "Config"].rightList[index].scoreList = [];
      //         }

      //         _this.save("temporary", true);

      //         _this.giftRightsDialog = false;
      //         _this.disableGenerate = false;
      //     };
      // }
      // else if(type == 5){
      //     this.giftRightsDialog = true;
      //     // this.listRecommendGift(productCode);
      //     this.giftProductCode = productCode;
      //     if (type == 1) {
      //         this.modelNo = modelNo;
      //     } else if (type == 5) {

      //         var modelNos = ''
      //         for (var a = 0; a < modelNo.length; a++) {
      //             modelNos += modelNo[a].modelNo + ','
      //         }
      //         this.modelNo = modelNos.substring(0, modelNos.length - 1)
      //     }

      //     this.saveGiftConfig = function () {
      //         if (_this.checked1 == 1) {
      //             if (
      //                 (_this.scoreList[0].rightType == 1 &&
      //                     _this.scoreList[0].num != "" &&
      //                     _this.scoreList[0].score != "") ||
      //                 (_this.scoreList[0].rightType == 2 &&
      //                     _this.scoreList[0].priceScale != "" &&
      //                     _this.scoreList[0].salesAmount != "")
      //             ) {
      //                 _this.listType5Config.modelNoDetail[num].rightList[index].scoreList=JSON.parse(JSON.stringify(_this.scoreList));
      //                 _this.listType5Config.modelNoDetail[num].rightList[index].giftList=[]
      //             } else {
      //                 _this.$message({
      //                     type: "warning",
      //                     message: "请配置积分！"
      //                 });
      //                 return false;
      //             }
      //         } else if (_this.checked1 == 2) {
      //             if (_this.giftList[0].giftId == "") {
      //                 _this.$message({
      //                     type: "warning",
      //                     message: "请选择礼品！"
      //                 });

      //                 return false;
      //             }
      //             if (_this.giftList[0].num == "") {
      //                 _this.$message({
      //                     type: "warning",
      //                     message: "请填写礼品总数！"
      //                 });

      //                 return false;
      //             }
      //             _this.listType5Config.modelNoDetail[num].rightList[index].giftList=JSON.parse(JSON.stringify(_this.giftList));
      //             _this.listType5Config.modelNoDetail[num].rightList[index].scoreList=[]
      //         }

      //         _this.save("temporary", true);

      //         _this.giftRightsDialog = false;
      //         _this.disableGenerate = false;
      //     };
      // }
      // else if (type == 4 || type == 6) {
      //     this.giftRightsFullDialog = true;
      //     this.saveGiftConfig = function () {
      //         if (_this.checked1 == 1) {
      //             if (
      //                 (_this.scoreList[0].rightType == 1 &&
      //                     _this.scoreList[0].num != "" &&
      //                     _this.scoreList[0].score != "") ||
      //                 (_this.scoreList[0].rightType == 2 &&
      //                     _this.scoreList[0].priceScale != "" &&
      //                     _this.scoreList[0].salesAmount != "")
      //             ) {
      //                 if (_this.scoreList[0].rightType == 1) {
      //                     if (parseInt(_this.scoreList[0].num) == 0) {
      //                         _this.$message({
      //                             type: "warning",
      //                             message: "礼品总数不能为0！"
      //                         });
      //                         return false;
      //                     } else if (parseInt(_this.scoreList[0].score) == 0) {
      //                         _this.$message({
      //                             type: "warning",
      //                             message: "赠送积分不能为0！"
      //                         });
      //                         return false;
      //                     } else {
      //                         _this["type" + type + "Config"].rightList[
      //                             index
      //                             ].scoreList = JSON.parse(JSON.stringify(_this.scoreList));
      //                         _this["type" + type + "Config"].rightList[index].giftList = [];
      //                     }
      //                 }
      //                 // else if (_this.scoreList[0].rightType == 2) {
      //                 //     if (parseInt(_this.scoreList[0].priceScale) == 0) {
      //                 //         _this.$message({
      //                 //             type: "warning",
      //                 //             message: "产品价格比例不能为0！"
      //                 //         });
      //                 //         return false;
      //                 //     } else if (parseInt(_this.scoreList[0].salesAmount) == 0) {
      //                 //         _this.$message({
      //                 //             type: "warning",
      //                 //             message: "产出销售额不能为0！"
      //                 //         });
      //                 //         return false;
      //                 //     } else {
      //                 //         _this["type" + type + "Config"].rightList[
      //                 //             index
      //                 //             ].scoreList = JSON.parse(JSON.stringify(_this.scoreList));
      //                 //     }
      //                 // }
      //             } else {
      //                 if (_this.scoreList[0].rightType == 1) {
      //                     if (_this.scoreList[0].num == "") {
      //                         _this.$message({
      //                             type: "warning",
      //                             message: "请填写礼品总数！"
      //                         });
      //                     } else if (_this.scoreList[0].score == "") {
      //                         _this.$message({
      //                             type: "warning",
      //                             message: "请填写赠送积分！"
      //                         });
      //                     }
      //                 } else if (_this.scoreList[0].rightType == 2) {
      //                     if (_this.scoreList[0].priceScale == "") {
      //                         _this.$message({
      //                             type: "warning",
      //                             message: "请填写产品价格比例！"
      //                         });
      //                     } else if (_this.scoreList[0].salesAmount == "") {
      //                         _this.$message({
      //                             type: "warning",
      //                             message: "请填写产出销售额！"
      //                         });
      //                     }
      //                 }
      //                 // _this.$message({
      //                 //   type: "warning",
      //                 //   message: "请配置积分！"
      //                 // });
      //                 return false;
      //             }
      //         }else if(_this.checked1 == 2){
      //             if (_this.giftList[0].giftId == "") {
      //                 _this.$message({
      //                     type: "warning",
      //                     message: "请选择礼品！"
      //                 });
      //                 return false;
      //             }
      //             if(_this.giftList[0].num==""||_this.giftList[0].num==0){
      //                 _this.$message({
      //                     type: "warning",
      //                     message: "请填写正确的礼品数量！"
      //                 });
      //                 return false;
      //             }
      //             _this["type" + type + "Config"].rightList[
      //                 index
      //                 ].giftList = JSON.parse(JSON.stringify(_this.giftList));
      //             _this["type" + type + "Config"].rightList[index].scoreList = [];

      //         }

      //         _this.save("temporary", true);

      //         _this.giftRightsFullDialog = false;
      //         _this.disableGenerate = false;
      //     };
      // }
      // else if(type == 2 || type == 3 ){
      //     this.scoreRightsDialog = true;
      //     this.saveGiftConfig = function () {
      //         if (
      //             (_this.scoreList[0].rightType == 1 &&
      //                 _this.scoreList[0].num != "" &&
      //                 _this.scoreList[0].score != "") ||
      //             (_this.scoreList[0].rightType == 2 &&
      //                 _this.scoreList[0].priceScale != "" &&
      //                 _this.scoreList[0].salesAmount != "")
      //         ) {
      //             if (_this.scoreList[0].rightType == 1) {
      //                 if (parseInt(_this.scoreList[0].num) == 0) {
      //                     _this.$message({
      //                         type: "warning",
      //                         message: "礼品总数不能为0！"
      //                     });
      //                     return false;
      //                 } else if (parseInt(_this.scoreList[0].score) == 0) {
      //                     _this.$message({
      //                         type: "warning",
      //                         message: "赠送积分不能为0！"
      //                     });
      //                     return false;
      //                 } else {
      //                     _this["type" + type + "Config"].rightList[
      //                         index
      //                         ].scoreList = JSON.parse(JSON.stringify(_this.scoreList));
      //                 }
      //             } else if (_this.scoreList[0].rightType == 2) {
      //                 if (parseInt(_this.scoreList[0].priceScale) == 0) {
      //                     _this.$message({
      //                         type: "warning",
      //                         message: "产品价格比例不能为0！"
      //                     });
      //                     return false;
      //                 } else if (parseInt(_this.scoreList[0].salesAmount) == 0) {
      //                     _this.$message({
      //                         type: "warning",
      //                         message: "产出销售额不能为0！"
      //                     });
      //                     return false;
      //                 } else {
      //                     _this["type" + type + "Config"].rightList[
      //                         index
      //                         ].scoreList = JSON.parse(JSON.stringify(_this.scoreList));
      //                 }
      //             }

      //         } else {
      //             if (_this.scoreList[0].rightType == 1) {
      //                 if (_this.scoreList[0].num == "") {
      //                     _this.$message({
      //                         type: "warning",
      //                         message: "请填写礼品总数！"
      //                     });
      //                 } else if (_this.scoreList[0].score == "") {
      //                     _this.$message({
      //                         type: "warning",
      //                         message: "请填写赠送积分！"
      //                     });
      //                 }
      //             } else if (_this.scoreList[0].rightType == 2) {
      //                 if (_this.scoreList[0].priceScale == "") {
      //                     _this.$message({
      //                         type: "warning",
      //                         message: "请填写产品价格比例！"
      //                     });
      //                 } else if (_this.scoreList[0].salesAmount == "") {
      //                     _this.$message({
      //                         type: "warning",
      //                         message: "请填写产出销售额！"
      //                     });
      //                 }
      //             }
      //             // _this.$message({
      //             //   type: "warning",
      //             //   message: "请配置积分！"
      //             // });
      //             return false;
      //         }

      //         _this.save("temporary", true);

      //         _this.scoreRightsDialog = false;
      //         _this.disableGenerate = false;
      //     };
      // }
    },
    listRecommendGift(productCode) {
      if (this.giftList[0].purchasePriceStart == '') {
        this.$message({
          type: 'warning',
          message: '请正确填写最低价'
        });
      } else if (this.giftList[0].purchasePriceEnd == '') {
        this.$message({
          type: 'warning',
          message: '请正确填写最高价'
        });
      } else {
        const params = {
          // productCode: productCode || this.giftProductCode,
          productCategoryCodes: this.productCategoryCode,
          brandNames: this.rightBrandName,
          startPrice: this.giftList[0].purchasePriceStart,
          endPrice: this.giftList[0].purchasePriceEnd,
          isVirtual: this.giftList[0].type
        };
        const _this = this;
        this.requestRights.listRecommendGift(params).then((data) => {
          if (data) {
            if (data == '') {
              _this.giftProductInit = true;
              _this.nopro02 = true;
              _this.recommendGift = [];
            } else {
              _this.nopro02 = false;
              _this.recommendGift = data;
              _this.giftProductInit = true;
            }
          }
        });
      }
    },
    listRecommendGiftByKeyWords(productCode) {
      const params = {
        keyWords: this.keyWords,
        brandNames: this.rightBrandName,
        startPrice: this.giftList[0].purchasePriceStart,
        endPrice: this.giftList[0].purchasePriceEnd,
        isVirtual: this.giftList[0].type,
        pageNo: 1,
        pageSize: 50
      };
      const _this = this;
      this.requestRights
        .listRecommendGiftByKeyWords(params)
        .then((data) => {
          if (data && data.total !== undefined) {
            _this.recommendGiftByKeyWords = data;
            _this.giftProductInit = true;
            _this.nopro = false;
          } else {
            _this.recommendGiftByKeyWords = [];
            _this.giftProductInit = true;
            _this.nopro = true;
          }
        });
    },
    searchGift() {
      if (this.giftList[0].giftType == 1) {
        this.listRecommendGift();
      } else if (this.giftList[0].giftType == 2) {
        this.listRecommendGiftByKeyWords();
      }
    },
    saveGiftConfig() {
    },
    selectProduct(gift) {
      this.giftList[0].giftId = gift.productCode;
      this.giftList[0].picUrl = gift.photoLink;
      this.giftList[0].needScore = gift.needScore;
      this.giftList[0].sortId = gift.sort;
      this.giftList[0].dataFrom = gift.dataSource;
      this.giftList[0].productUrl = gift.productLink;
      this.giftList[0].productName = gift.productName;
      this.giftList[0].exchangeNum = gift.amount;
    },
    changeGift() {
      this.giftList = [
        {
          type: 1,
          giftType: 1, // 1-推荐   2-自定义
          num: '', // 覆盖范围台数，选择套装的话 2个礼物num一致填写相同数目
          purchasePriceStart: '', // 采购价开始
          purchasePriceEnd: '', // 采购价结束
          giftId: '', // 产品唯一编码
          giftIdUnique: '', // 权益活动产品唯一编码
          picUrl: '', // 图片url
          needScore: '', // 所需积分
          sortId: '', // 排序id
          dataFrom: '', // hbmall/camall
          productUrl: '', // 产品链接
          productName: '', // 产品名称
          exchangeNum: '' // 历史兑换数量
        }
      ];
    },
    addType3() {
      this.buyAmount = parseInt(this.buyAmount);
      this.maxBuyAmount = parseInt(this.maxBuyAmount);
      if (this.buyAmount != '' && this.buyAmount > 0 && this.maxBuyAmount != '' && this.maxBuyAmount > 0 && this.maxBuyAmount > this.buyAmount) {
        if (this.type4TabShow == 1) {
          this.type4Config.rightList.push({
            buyAmount: this.buyAmount, // 购买达到金额
            maxBuyAmount: this.maxBuyAmount
          });
          this.buyAmount = '';
          this.maxBuyAmount = '';
        } else if (this.type4TabShow == 2) {
          this.type6Config.rightList.push({
            buyAmount: this.buyAmount, // 购买达到金额
            maxBuyAmount: this.maxBuyAmount
          });
          this.buyAmount = '';
          this.maxBuyAmount = '';
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请正确填写金额！'
        });
      }
    },
    //      cleardata:function(){
    //          this.type4Config.rightList = []
    //      },
    listIndustry() {
      const _this = this;
      this.requestRights.listIndustry().then((data) => {
        if (data) {
          _this.listIndustryArr = [];
          for (const item in data) {
            _this.listIndustryArr.push({
              label: item,
              value: data[item]
            });
          }
        }
      });
    },
    addLint() {
      this.lintList.push({
        desc: '', productCategoryCode: '', brandName: '', productCode: '', modelNo: ''
      });
      this.lintnum();
    },
    lintnum() {
      let test = true;
      for (let c = 0; c < this.lintList.length; c++) {
        if (this.lintList[c].desc == '') {
          test = false;
        }
      }
    },
    addType3Product() {
      this.productList.push({
        desc: ''
      });
      this.testnum();
    },
    testnum() {
      let test = true;
      for (let c = 0; c < this.productList.length; c++) {
        if (this.productList[c].desc == '') {
          test = false;
        }
      }
      if (test) {
        this.prozh = true;
      } else {
        (
          this.prozh = false
        );
      }
    },
    setType3Product() {
      let isSave = true;
      for (let i = 0; i < this.productList.length; i++) {
        if (!this.productList[i].productCategoryCode) {
          isSave = false;
          break;
        }
      }

      if (isSave) {
        this.type5Config.productList = JSON.parse(
          JSON.stringify(this.productList)
        );
      } else {
        this.$message({
          type: 'warning',
          message: '请选择正确的产品型号！'
        });
        return;
      }
      // 判断不能重复
      const newlist = [];
      for (const i in this.productList) {
        newlist.push(this.productList[i].productCode);
      }
      for (const i in this.listType5Config.modelNoDetail) {
        const oldlist = [];
        for (const j in this.listType5Config.modelNoDetail[i].productList) {
          oldlist.push(this.listType5Config.modelNoDetail[i].productList[j].productCode);
        }
        if (newlist.sort().toString() == oldlist.sort().toString()) {
          this.$message({
            type: 'warning',
            message: '配置产品组合重复！'
          });
          return;
        }
      }

      this.bpp_price.push(this.bpp_price_mo);
      this.listType5Config.modelNoDetail.push(JSON.parse(JSON.stringify(this.type5Config)));
      this.productList = [{ desc: '' }, { desc: '' }];
      this.type5Config.productList = [];
      this.prozh = false;
    },
    modelchange() {
      this.modelConstraintDialog = true;
    },
    pricechange() {
      this.priceConstraintDialog = true;
    },
    queryModel(queryString, cb, e, index) {
      const _this = this;
      const { restaurants } = this;
      const results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
      if (e == 1) {
        var params = {
          brandName: this.lintList[index].brandName,
          code: this.lintList[index].productCategoryCode,
          productName: queryString
        };
      } else if (e == 2) {
        var params = {
          brandName: this.brandName2,
          code: this.productCategory2,
          productName: queryString
        };
      } else if (e == 3) {
        var params = {
          brandName: this.brandName3,
          code: this.productCategory3,
          productName: queryString
        };
      }
      this.requestRights.listProductInfoNew(params).then((data) => {
        if (data.entities) {
          for (let i = 0; i < data.entities.length; i++) {
            data.entities[i].desc = `${data.entities[i].pro_band
            } | ${
              data.entities[i].mmt_department
            } | ${
              data.entities[i].mmt_material_descrition}`;
          }
          cb(data.entities);
        } else {
          cb([]);
        }
      });
    },
    createStateFilter(queryString) {
      return state => (state.value.indexOf(queryString.toLowerCase()) === 0);
    },
    modelSelect(item, e, index) {
      const arr = {
        productCode: item.mmt_material_code,
        modelNo: item.mmt_material_descrition,
        brandName: item.pro_band,
        productCategoryCode: item.mmt_department,
        desc: item.desc
      };
      if (e == 1) {
        this.lintList[index].productCode = item.mmt_material_code;
        this.lintList[index].modelNo = item.mmt_material_descrition;
        this.lintList[index].brandName = item.pro_band;
        this.lintList[index].productCategoryCode = item.mmt_department;
        this.lintList[index].desc = item.desc;
      } else if (e == 2) {
        this.typeproductList2 = arr;
      } else if (e == 3) {
        this.typeproductList3 = arr;
      }
    },
    addmodelone(e) {
      // if(e==1){
      //     if (this.brandName == "") {
      //         this.$message({
      //             message: '请选择品牌',
      //             type: 'warning'
      //         });
      //     } else if (this.productCategory == "") {
      //         this.$message({
      //             message: '请选择品类',
      //             type: 'warning'
      //         });
      //     }else {
      //         //判断型号不能重复
      //         //需要注意productCategoryCode和productCategory
      //         for(let i in this.modelConstraint[0].productList){
      //             if(this.productModel==""){
      //                 if(this.modelConstraint[0].productList[i].brandName==this.brandName&&this.modelConstraint[0].productList[i].productCategoryCode==this.productCategory){
      //                     this.$message({
      //                         message: '约束限制不能重复！',
      //                         type: 'warning'
      //                     });
      //                     return;
      //                 }
      //             }else {
      //                 if(this.modelConstraint[0].productList[i].modelNo==''){
      //                     if(this.modelConstraint[0].productList[i].brandName==this.brandName&&this.modelConstraint[0].productList[i].productCategoryCode==this.productCategory){
      //                         this.$message({
      //                             message: '约束限制不能重复！',
      //                             type: 'warning'
      //                         });
      //                         return;
      //                     }
      //                 }else{
      //                     if(this.modelConstraint[0].productList[i].desc==this.productModel){
      //                         this.$message({
      //                             message: '约束限制不能重复！',
      //                             type: 'warning'
      //                         });
      //                         return;
      //                     }
      //                 }
      //             }
      //         }
      //         //end判断
      //         if(this.typeproductList){
      //             this.modelConstraint[0].productList.push(this.typeproductList)
      //         }else{
      //             this.modelConstraint[0].productList.push({
      //                 "productCode": "",
      //                 "modelNo":"",
      //                 "brandName":this.brandName ,
      //                 "productCategoryCode":this.productCategory,
      //                 "desc":this.brandName+" | "+this.productCategory
      //             })
      //         }
      //         this.typeproductList=[]
      //         this.brandName=""
      //         this.productCategory=""
      //         this.productModel=""
      //     }
      // }
      if (e == 2) {
        if (this.brandName2 == '') {
          this.$message({
            message: '请选择品牌',
            type: 'warning'
          });
        } else if (this.productCategory2 == '') {
          this.$message({
            message: '请选择品类',
            type: 'warning'
          });
        } else if (this.typeproductList2 == '') {
          this.$message({
            message: '请选择型号',
            type: 'warning'
          });
        } else {
          // 判断不能重复
          for (const i in this.modelConstraint[1].productList) {
            if (this.modelConstraint[1].productList[i].desc == this.productModel2) {
              this.$message({
                message: '约束限制不能重复！',
                type: 'warning'
              });
              return;
            }
          }
          // end 判断
          // 判断与“订单内排出”的互斥
          for (const i in this.modelConstraint[2].productList) {
            if (this.modelConstraint[2].productList[i].brandName == this.brandName2 && this.modelConstraint[2].productList[i].productCategoryCode == this.productCategory2) {
              this.$message({
                message: '与订单内排除条件约束有冲突',
                type: 'warning'
              });
              this.typeproductList2 = [];
              this.brandName2 = '';
              this.productCategory2 = '';
              this.productModel2 = '';
              return;
            }
          }
          // end 判断
          this.modelConstraint[1].productList.push(this.typeproductList2);
          this.typeproductList2 = [];
          this.brandName2 = '';
          this.productCategory2 = '';
          this.productModel2 = '';
        }
      } else if (e == 3) {
        if (this.brandName3 == '') {
          this.$message({
            message: '请选择品牌',
            type: 'warning'
          });
        } else if (this.productCategory3 == '') {
          this.$message({
            message: '请选择品类',
            type: 'warning'
          });
        } else {
          // 判断型号不能重复-新增判断全部
          // 需要注意productCategoryCode和productCategory
          for (const i in this.modelConstraint[2].productList) {
            // 判断全部
            if (this.productCategory3 == '全部') {
              if (this.brandName3 == this.modelConstraint[2].productList[i].brandName) {
                this.$message({
                  message: '约束限制不能重复！',
                  type: 'warning'
                });
                return;
              }
            }
            if (this.modelConstraint[2].productList[i].productCategoryCode == '全部') {
              if (this.brandName3 == this.modelConstraint[2].productList[i].brandName) {
                this.$message({
                  message: '约束限制不能重复！',
                  type: 'warning'
                });
                return;
              }
            }
            // end 判断全部
            if (this.productModel3 == '') {
              if (this.modelConstraint[2].productList[i].brandName == this.brandName3 && this.modelConstraint[2].productList[i].productCategoryCode == this.productCategory3) {
                this.$message({
                  message: '约束限制不能重复！',
                  type: 'warning'
                });
                return;
              }
            } else if (this.modelConstraint[2].productList[i].modelNo == '') {
              if (this.modelConstraint[2].productList[i].brandName == this.brandName3 && this.modelConstraint[2].productList[i].productCategoryCode == this.productCategory3) {
                this.$message({
                  message: '约束限制不能重复！',
                  type: 'warning'
                });
                return;
              }
            } else if (this.modelConstraint[2].productList[i].desc == this.productModel3) {
              this.$message({
                message: '约束限制不能重复！',
                type: 'warning'
              });
              return;
            }
          }
          // end判断
          // 判断与“仅参加”的互斥
          if (this.productModel3 == '') {
            for (const i in this.modelConstraint[1].productList) {
              if (this.modelConstraint[1].productList[i].brandName == this.brandName3 && this.modelConstraint[1].productList[i].productCategoryCode == this.productCategory3) {
                this.$message({
                  message: '与订单内仅参加条件约束有冲突',
                  type: 'warning'
                });
                this.typeproductList3 = [];
                this.brandName3 = '';
                this.productCategory3 = '';
                this.productModel3 = '';
                return;
              }
            }
          } else {
            for (const i in this.modelConstraint[1].productList) {
              if (this.modelConstraint[1].productList[i].desc == this.productModel3) {
                this.$message({
                  message: '与订单内仅参加条件约束有冲突',
                  type: 'warning'
                });
                this.typeproductList3 = [];
                this.brandName3 = '';
                this.productCategory3 = '';
                this.productModel3 = '';
                return;
              }
            }
          }
          // end 判断

          if (this.typeproductList3) {
            this.modelConstraint[2].productList.push(this.typeproductList3);
          } else {
            this.modelConstraint[2].productList.push({
              productCode: '',
              modelNo: '',
              brandName: this.brandName3,
              productCategoryCode: this.productCategory3,
              desc: `${this.brandName3} | ${this.productCategory3}`
            });
          }
          this.typeproductList3 = [];
          this.brandName3 = '';
          this.productCategory3 = '';
          this.productModel3 = '';
        }
      }
    },
    delmodelex(index, e) {
      this.modelConstraint[e - 1].productList.splice(index, 1);
    },
    delpriceex(index) {
      this.priceConstraint.productList.splice(index, 1);
    },
    addprice() {
      if (this.brandNamePrice == '') {
        this.$message({
          message: '请选择品牌',
          type: 'warning'
        });
      } else if (this.productCategoryPrice == '') {
        this.$message({
          message: '请选择品类',
          type: 'warning'
        });
      } else if (this.minPrice == '') {
        this.$message({
          message: '请输入价格区间',
          type: 'warning'
        });
      } else if (this.maxPrice == '') {
        this.$message({
          message: '请输入价格区间',
          type: 'warning'
        });
      } else if (parseInt(this.maxPrice) <= parseInt(this.minPrice)) {
        this.$message({
          message: '请输入正确的价格区间',
          type: 'warning'
        });
      } else {
        // 判断不能重复
        for (const i in this.priceConstraint.productList) {
          if (this.priceConstraint.productList[i].brandName == this.brandNamePrice && this.priceConstraint.productList[i].productCategoryCode == this.productCategoryPrice) {
            this.$message({
              message: '约束限制不能重复！',
              type: 'warning'
            });
            return;
          }
        }
        // end判断
        this.priceConstraint.productList.push({
          minPrice: this.minPrice,
          maxPrice: this.maxPrice,
          brandName: this.brandNamePrice,
          productCategoryCode: this.productCategoryPrice
        });
        this.minPrice = '';
        this.maxPrice = '';
        this.brandNamePrice = '';
        this.productCategoryPrice = '';
      }
    }
  },
  mounted() {
    this.getOrderRightsById();
    // this.listIndustry();
  }
};
</script>
<style scoped lang="scss">
  .col333 {
    color: #333 !important;
  }

  .ico-del-one {
    width: 16px;
    height: 16px;
    cursor: pointer;
    display: inline-block;
    position: absolute;
    top: 50%;
    right: 130px;
    margin-top: -3px;
    background: url("../../assets/images/ico-del.png") no-repeat;
    background-size: 100% 100%;
  }

  .shuju-base {
    display: inline-block;
    width: 473px;
    background-color: rgba(242, 242, 242, 1);
    padding: 0 10px;
  }

  .lint-product {
    margin: 10px 0;
    position: relative;
  }

  .lint-product label {
    width: 80px;
    height: 32px;
    background: #e0f0ff;
    text-align: center;
    margin-bottom: 0;
    margin-right: 5px;
  }

  .lint-product .el-input {
    margin: 0 5px 0 4px;
  }

  .lint-product:after {
    content: "";
    display: inline-block;
    height: 2px;
    width: 24px;
    background: #95cbff;
    vertical-align: 2px;
    margin-left: 25px;
  }

  .lint-none:after {
    width: 0;
  }

  .lint-product .ico-link {
    width: 20px;
    height: 26px;
    display: inline-block;
    vertical-align: top;
    position: absolute;
    z-index: 10;
    left: 496px;
    top: -18px;
    background: url("../../assets/images/ico-prolink02.png") no-repeat;
  }

  .lint-product:first-child .ico-link {
    display: none;
  }

  .lint-product .ico-del02 {
    width: 16px;
    height: 16px;
    cursor: pointer;
    display: inline-block;
    position: absolute;

    margin-top: 7px;
    background: url("../../assets/images/ico-del.png") no-repeat;
    background-size: 100% 100%;
  }

  .lint-product-list {
    position: relative;
  }

  .lint-product-list:after {
    content: "";
    display: inline-block;
    width: 2px;
    background: #95cbff;
    vertical-align: top;
    position: absolute;
    right: 123px;
    top: 18px;
    bottom: 14px;
  }

  .lint-product-list .add-product {
    position: absolute;
    width: 85px;
    height: 24px;
    line-height: 24px;
    margin-left: 0;
    right: 20px;
    top: 50%;
    margin-top: -12px;
  }

  .ico-delbsw {
    width: 16px;
    height: 16px;
    cursor: pointer;
    display: inline-block;
    position: absolute;
    top: 50%;
    right: 95px;
    margin-top: -7px;
    background: url("../../assets/images/ico-del.png") no-repeat;
    background-size: 100% 100%;
  }

  .lint-xian .ico-link {
    left: 493px;
  }

  .lint-xian .lint-product-list:after {
    right: 126px;
  }

  .lint-xian .lint-product:after {
    margin-left: 3px;
  }

  .lint-zanwu {
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }

  .lint-xian {
    border-top: 1px solid rgb(204, 204, 204);
    min-height: 80px;
    margin: 0 -20px;
    margin-top: 20px;
    padding: 20px 20px;
  }

  .lint-everybox {
    margin-left: 159px;
    border: 1px solid rgb(204, 204, 204);
    padding: 5px 20px 0 20px;
    margin-top: 20px;
    width: 672px;
    position: relative;
  }

  .lint-close {
    position: absolute;
    right: -30px;
    top: -1px;
    width: 30px;
    height: 30px;
    border: 1px solid #ccc;
    border-left: none;
    font-size: 20px;
    text-align: center;
    line-height: 30px;
    font-weight: lighter;
    cursor: pointer;
  }

  .xianzhi-lei {
    border: 1px solid rgb(204, 204, 204);
    color: rgb(204, 204, 204);
    display: inline-block;
    width: 700px;
    padding-left: 15px;
    cursor: pointer;
  }

  .addmodel-but {
    float: right;
    padding: 7px 10px;
    margin-right: 13px;
  }

  .clear:after {
    content: '';
    display: block;
    clear: both;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }

  .clear {
    zoom: 1;
  }

  .config-form {
    /* max-height:525px; */
    position: absolute;
    top: 20px;
    bottom: 20px;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 0;
  }

  /* .config-form{position:relative;} */
  .config-form .trs-btn {
    margin-left: 159px;
  }

  .config-form .img-list {
    margin-left: 159px;
  }

  .gift-list {
    margin-left: 159px;
  }

  .gift-list .gift-item {
    position: relative;
    width: 610px;
    margin-top: 10px;
    margin-right: 20px;
    padding: 10px 16px;
    background: #f5f5f5;
  }

  .rightsGift-configGift-all {
    .gift-list {
      .gift-item {
        margin-top: 0;
      }
    }
  }

  .gift-list .gift-item p {
    line-height: 20px;
  }

  .gift-list .gift-item p i {
    width: 12px;
    height: 14px;
    display: inline-block;
    margin-right: 5px;
    background: url("../../assets/images/ico-gift.png") no-repeat;
  }

  .gift-list .gift-item p a {
    margin-left: 10px;
    color: #45a0f8;
  }

  .gift-list .gift-item .ico-del {
    width: 16px;
    height: 16px;
    cursor: pointer;
    display: inline-block;
    position: absolute;
    right: -5px;
    top: -5px;
    background: url("../../assets/images/ico-del.png") no-repeat;
    background-size: 100% 100%;
  }

  .gift-list .gift {
    color: #f06230;
    word-wrap: break-word;
  }

  .gift-list .gift-item .ico-tcdel {
    width: 16px;
    height: 16px;
    cursor: pointer;
    position: absolute;
    top: -7px;
    right: -11px;
    display: inline-block;
    background: url("../../assets/images/ico-del.png") no-repeat;
    background-size: 100% 100%;
    vertical-align: -3px;
    margin-left: 5px;
  }

  .gift-list .gift .split {
    color: #c8c8c8;
  }

  .select-product {
    margin: 10px 0;
    position: relative;
  }

  .select-product label {
    width: 80px;
    height: 32px;
    background: #e0f0ff;
    text-align: center;
    margin-bottom: 0;
    margin-right: 5px;
  }

  .select-product .el-input {
    margin: 0 5px 0 4px;
  }

  .select-product:after {
    content: "";
    display: inline-block;
    height: 2px;
    width: 24px;
    background: #95cbff;
    vertical-align: 2px;
    margin-left: 25px;
  }

  .select-product .ico-link {
    width: 20px;
    height: 26px;
    display: inline-block;
    vertical-align: top;
    position: absolute;
    z-index: 10;
    left: 566px;
    top: -18px;
    background: url("../../assets/images/ico-prolink02.png") no-repeat;
  }

  .select-product:first-child .ico-link {
    display: none;
  }

  .select-product .ico-del02 {
    width: 16px;
    height: 16px;
    cursor: pointer;
    display: inline-block;
    position: absolute;
    left: 530px;
    margin-top: 7px;
    background: url("../../assets/images/ico-del.png") no-repeat;
    background-size: 100% 100%;
  }

  .select-product-list {
    position: relative;
  }

  .select-product-list:after {
    content: "";
    display: inline-block;
    width: 2px;
    background: #95cbff;
    vertical-align: top;
    position: absolute;
    right: 123px;
    top: 18px;
    bottom: 14px;
  }

  .select-product-list .add-product {
    position: absolute;
    width: 85px;
    height: 24px;
    line-height: 24px;
    margin-left: 0;
    right: 20px;
    top: 50%;
    margin-top: -12px;
  }

  .gift-list-combination {
    padding: 10px;
    background: #f5f5f5;
    width: 612px;
    margin-top: 15px;
    position: relative;
  }

  .gift-list-combination div {
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    margin-right: 2px;
    position: relative;
  }

  .gift-list-combination div i {
    width: 20px;
    height: 20px;
    display: inline-block;
    position: absolute;
    background: url('../../assets/images/ico-prolink.png');
    left: -13px;
    top: 20px;
  }

  .gift-list-combination div:first-child i {
    display: none;
  }

  .gift-list-combination img {
    width: 58px;
    height: 58px;
    background: #fff;
    border: 1px solid #cccccc;
    display: block;
  }

  .gift-list-combination div p {
    line-height: 16px;
    margin-top: 5px;
  }

  .gift-list-combination .option-div {
    vertical-align: top;
    margin-left: 12px;
    text-align: left;
  }

  .gift-list-combination .option-div a {
    vertical-align: top;
    line-height: 20px;
    color: #45a0f8;
  }

  .gift-list-combination .ico-tcdel {
    width: 16px;
    height: 16px;
    cursor: pointer;
    position: absolute;
    top: -6px;
    right: -6px;
    display: inline-block;
    background: url("../../assets/images/ico-del.png") no-repeat;
    background-size: 100% 100%;
    vertical-align: -3px;
    margin-left: 5px;
  }

  .option-div .gift-item {
    width: auto;
    display: block;
    margin: 0;
    padding: 0;
    vertical-align: top;
    margin-top: -15px;
  }

  .option-div .gift-item i {
    position: relative;
    top: 1px;
    left: 0;
  }

  .score-rights-div {
    border: 1px solid #cccccc;
    padding: 20px 13px;
  }

  .score-rights-div .score-rights-input label {
    display: inline-block;
    width: 89px;
    line-height: 32px;
    background: #e0f0ff;
    text-align: center;
    margin-right: 2px;
  }

  .score-rights-div .score-rights-input.by-price label {
    width: 109px;
  }

  .dialog-footer {
    text-align: center;
    margin-top: 0px;
  }

  .gift-rights-dialog > p {
    position: absolute;
    top: 20px;
    right: 25px;
  }

  .gift-rights-dialog .score-rights-div {
    width: 327px;
    display: inline-block;
    /*height: 412px;*/
  }

  .gift-rights-dialog .gift-rights-div {
    /*width: 430px;*/
    width: 100%;
    display: inline-block;
    border: 1px solid #cccccc;
    padding: 20px 17px;
    vertical-align: top;
    margin-left: -4px;
    height: 412px;
    position: relative;
  }

  .gift-budget {
    position: absolute;
    right: 25px;
    top: 20px;
  }

  .gift-select-list {
    margin-top: 22px;
  }

  .gift-select-list .gift-select-ul {
    border: 1px solid #3278bc;
    width: 100%;
    margin: 0 -2px;
  }

  .gift-select-list > div img {
    width: 58px;
    height: 58px;
    border: 1px solid #cccccc;
    vertical-align: top;
  }

  .gift-select-list > div div {
    display: inline-block;
    vertical-align: top;
  }

  .gift-select-list ul {
    height: 212px;
    overflow: auto;
  }

  .gift-select-list .recommended-list ul {
    height: 254px;
  }

  .gift-select-list li {
    padding: 12px 14px;
    position: relative;
    border-bottom: 1px solid #cccccc;
  }

  .gift-select-list li img {
    margin-right: 20px;
  }

  .gift-select-list li button {
    right: 17px;
    text-align: center;
    line-height: 26px;
    padding: 0;
    position: absolute;
    top: 50%;
    margin-top: -13px;
  }

  .color-red {
    color: #ee5851;
  }

  .type4-tab a {
    display: inline-block;
    border: 1px solid #cccccc;
    width: 188px;
    line-height: 38px;
    margin-left: 9px;
    margin-bottom: -1px;
    text-align: center;
    background: #ccc;
    margin-top: 19px;
  }

  .type4-tab a:first-child {
    margin-right: -3px;
  }

  .type4-tab a.active {
    background: #fff;
  }

  .type4-tab-panel {
    width: 700px;
    border: 1px solid #cccccc;
    padding: 17px 25px 23px;
  }

  .gift-list .el-tooltip {
    float: right;
    margin-top: 6px;
    position: relative;
    z-index: 999;
  }

  .model-dian {
    float: left;
    margin-right: 5px;
    width: 5px;
    height: 20px;
    margin-top: 4px;
    background-color: #ffa24f;
  }
</style>
<style>
  .rg-guding-jifen .el-dialog--small {
    width: 560px;
  }

  .limitDialog .el-dialog--small {
    width: 300px;
  }

  .pricedilog .el-dialog--small {
    width: 755px;
  }

  .modeldilog .el-input__inner {
    height: 30px;
  }

  .modeldilog .el-autocomplete {
    width: 232px;
  }

  .gift-rights-dialog .el-dialog {
    width: 560px;
  }

  .select-product .el-select {
    margin: 0 5px 0 4px;
  }

  .gift-rights-div .score-rights-input .el-input,
  .score-rights-div .score-rights-input .el-input {
    vertical-align: top;
  }

  .gift-rights-div .score-rights-input .el-input {
    vertical-align: middle;
  }

  .gift-rights-div .score-rights-input .el-input .el-input__inner,
  .score-rights-div .score-rights-input .el-input .el-input__inner {
    height: 32px;
    vertical-align: top;
    border-radius: 2px;
  }

  .gift-rights-dialog .el-dialog__body {
    padding-top: 10px;
    padding-left: 23px;
  }

  .gift-select-list .el-radio-button {
    width: 50%;
    background: #ecedee;
    /* display:inline-block; */
    /* line-height: 28px; */
    /* border: 1px solid #cccccc; */
    /* text-align: center; */
    /* margin: 0 -2px; */
  }

  .gift-select-list .el-radio-button .el-radio-button__inner {
    background: #ecedee;
  }

  .gift-select-list
  .el-radio-button__orig-radio:checked
  + .el-radio-button__inner {
    background: #20a0ff;
  }

  .gift-select-list .el-radio-button span {
    width: 100%;
  }

  .gift-select-list .el-radio-button .el-radio-button__inner {
    border-radius: 0;
  }

  .gift-select-list .el-radio-group {
    width: 100%;
    margin-left: -2px;
    height: 36px;
  }

  .gift-select-list
  .el-radio-button__orig-radio:checked
  + .el-radio-button__inner {
    border-color: #3278bc;
  }

  .gift-select-list > a.active {
    /* background: #45a0f8; */
    /* color: #fff; */
    /* border-color: #45a0f8; */
  }

  .disableGenerate label {
    display: inline-block;
    width: 103px;
    line-height: 32px;
    background: #e0f0ff;
    text-align: center;
    margin-right: 2px;
  }

  .disableGenerate > div {
    margin: 15px 0;
  }

  .disableGenerate > div a {
    vertical-align: top;
    line-height: 14px;
  }

  .disableGenerate > div > div {
    display: inline-block;
    vertical-align: top;
    width: 225px;
  }

  .disableGenerate > div > div img {
    vertical-align: top;
    margin-right: 10px;
  }

  .disableGenerate > div > div div {
    display: inline-block;
    line-height: 19px;
  }

  .disableGenerate div img {
    width: 58px;
    height: 58px;
    border: 1px solid #aeaeae;
  }

  .type5-product-name {
    width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .gift-item .ico-del {
    width: 16px;
    height: 16px;
    cursor: pointer;
    display: inline-block;
    position: absolute;
    right: -5px;
    top: -5px;
    background: url("../../assets/images/ico-del.png") no-repeat;
    background-size: 100% 100%;
  }

  .cost-bar {
    height: 46px;
    line-height: 46px;
    background: #bde3ff;
    /* position: fixed; */
    bottom: 40px;
    padding: 0 12px;
    left: -1px;
    right: -1px;

    width: 898px;
    margin: auto;
    /* left: 243px; */
  }

  .type4-tooltip {
    max-width: 328px !important;

  }

  .type4-tab-panel .product-tap div {
    width: auto;
    display: inline-block;
    position: relative;
    margin-top: 10px;
    margin-right: 10px;
    width: 174px;
  }

  .type4-tab-panel .product-tap div span {
    display: inline-block;
    line-height: 26px;
    border: 1px solid #c3e0fd;
    background: #fff;
    width: 174px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 10px;

  }

  .type4-tab-panel .product-tap div .ico-del {
    width: 16px;
    height: 16px;
    cursor: pointer;
    display: inline-block;
    position: absolute;
    right: -5px;
    top: -5px;
    background: url("../../assets/images/ico-del.png") no-repeat;
    background-size: 100% 100%;
  }

  .yueshubox .product-tap {
    max-width: 622px;
  }

  .yueshubox .product-tap div {
    width: auto;
    display: inline-block;
    position: relative;
    /*margin-top: 10px;*/
    margin-right: 10px;
    /*width: 174px;*/
  }

  .yueshubox .product-tap div span {
    display: inline-block;
    line-height: 26px;
    border: 1px solid #c3e0fd;
    background: #fff;
    max-width: 174px;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 10px;
  }

  .yueshubox .product-tap div .ico-del {
    width: 16px;
    height: 16px;
    cursor: pointer;
    display: inline-block;
    position: absolute;
    right: -5px;
    top: -5px;
    background: url("../../assets/images/ico-del.png") no-repeat;
    background-size: 100% 100%;
  }

  .m-prozh {
    height: 32px;
    line-height: 32px;
    padding: 0;
    overflow: hidden;
    color: #fff;
    background-color: #a6aaad;
    border-color: #a6aaad;
    border-radius: 3px;;
    width: 161px;
    text-align: center;
  }

  .modelbox {
    padding-top: 10px;
    padding-left: 10px;
    margin: 10px 0;
    background: rgb(246, 246, 246);
    border: 1px solid rgb(204, 204, 204);
  }
</style>

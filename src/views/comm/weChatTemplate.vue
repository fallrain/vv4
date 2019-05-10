<template>
  <div class="vip-content msg-template">
    <p class="template-brand">
      <i></i>当前品牌：{{ getUserInfo.brandName | brandFilter
      }}<a href="javascript:;" class="color-link fr" @click="goback"
        ><i class="iconfont icon-chevron-copy-copy"></i>返回</a
      >
    </p>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="沟通渠道">
        <p>微信</p>
      </el-form-item>
      <el-form-item label="模板分类">
        <el-select
          v-model="form.templateType"
          placeholder="请选择模板分类"
          style="width: 300px;"
          :disabled="isView || $route.query.id != null"
        >
          <el-option label="营销类" value="2"></el-option>
          <el-option label="关怀类" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模板名称" prop="templateName">
        <el-input
          v-model="form.templateName"
          style="width: 300px"
          :disabled="isView || $route.query.id != null"
        ></el-input>
      </el-form-item>
      <p style="background-color: #e5e5e5;height: 1px;margin: 30px 0"></p>
      <el-form-item label="模板ID" prop="templateId">
        <el-input v-model="form.templateId" style="width: 432px" :disabled="isView"></el-input
        ><span style="margin-left: 18px;">微信后台配置的模板ID</span
        ><el-button @click="gopick" style="margin-left: 16px;" type="text">去配置</el-button>
      </el-form-item>
      <!--<el-form-item label="模板内容">-->
      <!--&lt;!&ndash; <el-button type="primary" style="margin-bottom: 15px" @click="addVar">添加变量</el-button> &ndash;&gt;-->
      <!--&lt;!&ndash; <el-input type="textarea" v-model="form.templateContent"></el-input> &ndash;&gt;-->
      <!--<div style="border:1px solid #eee;border-radius: 10px;padding: 10px">-->
      <!--<div v-for="(value, index) in form.valueArr" style="margin: 15px 0;">-->
      <!--<div v-if="value.key == 'first'" style="margin: 15px 0">-->
      <!--<span style="margin-right: 10px">模板变量</span>-->
      <!--<el-input style="width: 100px" v-model="value.label" disabled></el-input>-->
      <!--<span style="margin: 0 10px 0 20px">变量值</span>-->
      <!--<el-input style="width: 260px" v-model="value.value" :maxlength="200" :disabled="isView"></el-input>-->
      <!--</div>-->
      <!--<div v-if="value.key.indexOf('keyword') >= 0">-->
      <!--<span style="margin-right: 10px">固定话术</span>-->
      <!--<el-input style="width: 100px" v-model="value.desc" :maxlength="50" :disabled="isView"></el-input>-->
      <!--<span style="margin: 0 10px 0 20px">模板变量</span>-->
      <!--<el-input style="width: 100px" v-model="value.label" disabled></el-input>-->
      <!--<span style="margin: 0 10px 0 20px" v-model="value.value">变量值</span>-->
      <!--<el-input style="width: 260px" v-model="value.value" :maxlength="200" :disabled="isView"></el-input>-->
      <!--<el-button v-if="!isView" type="primary" style="margin-bottom: 15px" @click="addVarible(index)">添加变量</el-button>-->
      <!--<a v-if="value.key != 'keyword1' && !isView" href="javascript:;" class="color-link" style="margin-left: 20px" @click="removeVar(index)">删除</a>-->
      <!--<a v-if="index == form.valueArr.length-2  && !isView" href="javascript:;" class="color-link" style="margin-left: 10px" @click="addVar(index)">添加</a>-->
      <!--</div>-->
      <!--<div v-if="value.key == 'remark'" style="margin: 15px 0">-->
      <!--<span style="margin-right: 10px">模板变量</span>-->
      <!--<el-input style="width: 100px" v-model="value.label" disabled></el-input>-->
      <!--<span style="margin: 0 10px 0 20px">变量值</span>-->
      <!--<el-input style="width: 260px" v-model="value.value" :maxlength="200" :disabled="isView"></el-input>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</el-form-item>-->
      <el-form-item label="模板内容">
        <div class="moban wechat-temban">
          <div class="content-box">
            <div class="content-title">
              <p class="title-ti clear">
                <span>这里显示微信平台模板消息名称</span>
                <span>···</span>
              </p>
              <p class="title-time">{{ date }}</p>
            </div>
            <div class="content-xia">
              <div v-for="(value, index) in form.valueArr">
                <div v-if="value.key == 'first'">
                  <p class="xia-kaishiyu">{{ value.label }}</p>
                  <div>
                    <div
                      class="edit-div js_starttext"
                      :style="{ color: value.color }"
                      :class="{ disview: isView }"
                      @focus="winFocus(1)"
                      @blur="winBlur(1)"
                      :contenteditable="!isView"
                      @keyup="winKey(1, value, index)"
                      data-placeholder="例：恭喜您成功完成活动"
                    ></div>
                    <span class="pick-reav">
                      <i class="iconfont icon-tiaoseban1 taskcolor-icon" title="调色板"></i>
                      <el-color-picker class="task-picker" title="调色板" v-model="value.color"></el-color-picker>
                    </span>
                  </div>
                  <p><el-button v-if="!isView" type="text" @click="addVarible(index)">+ 添加占位变量</el-button></p>
                  <p class="xian"></p>
                </div>
                <div class="tcbox" v-if="value.key.indexOf('keyword') >= 0">
                  <div class="tc-title" v-if="index < 2">
                    <p>标题</p>
                    <p>内容</p>
                  </div>
                  <div class="ev-content">
                    <div class="con-name">
                      <el-input
                        @focus="winFocus(2)"
                        @blur="winBlur(2)"
                        v-model="value.desc"
                        :maxlength="10"
                        :disabled="isView"
                        placeholder="例：活动名称"
                      ></el-input>
                    </div>
                    <div class="con-you">
                      <div>
                        <div
                          class="edit-div"
                          :style="{ color: value.color }"
                          :class="['js_con' + index, { dvone: index > 1 }, { disview: isView }]"
                          @focus="winFocus(2)"
                          @blur="winBlur(2)"
                          :contenteditable="!isView"
                          @keyup="winKey(2, value, index)"
                          data-placeholder="例：青岛海尔工业园一日游"
                        ></div>
                        <span class="pick-reav">
                          <i class="iconfont icon-tiaoseban1 taskcolor-icon" title="调色板"></i>
                          <el-color-picker class="task-picker" title="调色板" v-model="value.color"></el-color-picker>
                        </span>
                        <i
                          class="el-icon el-icon-circle-cross con-icon"
                          v-if="index > 1 && !isView"
                          @click="removeVar(index)"
                        ></i>
                      </div>
                      <p><el-button type="text" v-if="!isView" @click="addVarible(index)">+ 添加占位变量</el-button></p>
                    </div>
                  </div>
                  <div class="tj-btn">
                    <el-button type="primary" v-if="index == form.valueArr.length - 2 && !isView" @click="addVar(index)"
                      >+ 添加内容</el-button
                    >
                  </div>
                </div>
                <div v-if="value.key == 'remark'">
                  <p class="xian"></p>
                  <p class="jieshuyu">{{ value.label }}</p>
                  <div style="margin-top: 12px;">
                    <!--<el-input style="width: 452px" @focus="winFocus(3)" @blur="winBlur(3)" v-model="value.value" :maxlength="100" :disabled="isView" placeholder="例：评价与投诉，等你来反馈~"></el-input>-->
                    <input
                      :style="{ color: value.color }"
                      class="wechat-jsinput"
                      type="text"
                      style="width: 452px"
                      @focus="winFocus(3)"
                      @blur="winBlur(3)"
                      v-model="value.value"
                      :maxlength="100"
                      :disabled="isView"
                      placeholder="例：评价与投诉，等你来反馈~"
                    />
                    <span class="pick-reav">
                      <i class="iconfont icon-tiaoseban1 taskcolor-icon" title="调色板"></i>
                      <el-color-picker class="task-picker" title="调色板" v-model="value.color"></el-color-picker>
                    </span>
                  </div>
                </div>
              </div>
              <p class="xian"></p>
              <p class="jieshuyu">详情链接</p>
              <div style="margin-top: 12px;">
                <el-input
                  style="width: 457px;"
                  @focus="winFocus(4)"
                  @blur="winBlur(4)"
                  v-model="form.readMoreUrl"
                  :disabled="isView"
                  placeholder="URL/"
                ></el-input
                ><i style="color: #ababab;margin-left: 10px;" class="el-icon el-icon-arrow-right"></i>
              </div>
            </div>
          </div>
          <div class="phone-box">
            <img src="../../assets/images/MobilePhone.png" alt="" />
            <p class="zh-left"></p>
            <p class="zh-right"></p>
            <p
              class="zh_top"
              :class="{
                zh_top_moren: isWin == 0,
                zh_top_one: isWin == 1,
                zh_top_two: isWin == 2,
                zh_top_three: isWin == 3,
                zh_top_four: isWin == 4
              }"
            ></p>
            <p
              class="zh_bottom"
              :class="{
                zh_bottom_moren: isWin == 0,
                zh_bottom_one: isWin == 1,
                zh_bottom_two: isWin == 2,
                zh_bottom_three: isWin == 3,
                zh_bottom_four: isWin == 4
              }"
            ></p>
            <p
              :class="{
                zh_window_moren: isWin == 0,
                zh_window_one: isWin == 1,
                zh_window_two: isWin == 2,
                zh_window_three: isWin == 3,
                zh_window_four: isWin == 4
              }"
            ></p>
          </div>
        </div>
      </el-form-item>
      <!--<el-form-item label="详情链接" prop="readMoreUrl">-->
      <!--<el-input v-model="form.readMoreUrl" style="width: 432px" :disabled="isView"></el-input>-->
      <!--</el-form-item>-->
      <el-form-item
        v-if="
          jurisdiction['marketingOperations:weChatManager:templateSav'] ||
            jurisdiction['marketingOperations:weChatManager:templateEdit']
        "
      >
        <el-button v-if="form.id" type="primary" @click="sendTest">发送预览</el-button>
        <el-button v-if="!isView" type="primary" :loading="saveing" @click="weChatAdd">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction',
      getUserInfo: 'getUserInfo'
    })
  },
  data() {
    const isNotEmpty = (rule, value, callback) => {
      if (!value || $.trim(value) == '') {
        return callback(new Error(''));
      }
      callback();
    };
    return {
      date: '',
      abc: '',
      saveing: false,
      form: {
        brandName: 'haier',
        templateName: '', // 模板名称
        readMoreUrl: '',
        templateType: '1',
        msgType: 1,
        templateId: '', // 标题
        templateContent: '',
        valueArr: [
          {
            key: 'first',
            value: '',
            label: '开始语',
            color: ''
          },
          {
            key: 'keyword1',
            value: '',
            desc: '',
            label: '会员属性1',
            color: ''
          },
          {
            key: 'remark',
            value: '',
            label: '结束语',
            color: ''
          }
        ]
      },
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
          // {
          //   key: '$User.score',
          //   desc: '用户当前积分数'
          // }
        ]
      },
      lastVar: 0,
      rules: {
        templateName: [
          {
            required: true, validator: isNotEmpty, message: '请输入模板名称', trigger: 'blur'
          },
          { max: 30, message: '长度不可超过30个字符', trigger: 'blur' }
        ],
        templateId: [
          {
            required: true, validator: isNotEmpty, message: '请输入模板ID', trigger: 'blur'
          },
          { max: 100, message: '长度不可超过100个字符', trigger: 'blur' }
        ]
      },
      isView: false,
      isWin: 0,
      htmlId: '',
      isColor: false
    };
  },
  methods: {
    keepLastIndex(obj) {
      // 光标移动到最后
      if (window.getSelection) {
        // ie11 10 9 ff safari
        obj.focus(); // 解决ff不获取焦点无法定位问题
        var range = window.getSelection(); // 创建range
        range.selectAllChildren(obj[0]); // range 选择obj下所有子内容
        range.collapseToEnd(); // 光标移至最后
      } else if (document.selection) {
        // ie10 9 8 7 6 5
        var range = document.selection.createRange(); // 创建选择对象
        // var range = document.body.createTextRange();
        range.moveToElementText(obj[0]); // range定位到obj
        range.collapse(false); // 光标移至最后
        range.select();
      }
    },
    winKey(e, value, index) {
      if (e == 1) {
        const html = $('.js_starttext').html();
        if (html.substr(html.length - 1, 1) == '>') {
          $('.js_starttext').html(html.slice(0, html.lastIndexOf('<em')));
          this.keepLastIndex($('.js_starttext'));
        }
        this.form.valueArr[index].value = $('.js_starttext').html();
      }
      if (e == 2) {
        const html = $(`.js_con${index}`).html();
        if (html.substr(html.length - 1, 1) == '>') {
          $(`.js_con${index}`).html(html.slice(0, html.lastIndexOf('<em')));
          this.keepLastIndex($(`.js_con${index}`));
        }
        this.form.valueArr[index].value = $(`.js_con${index}`).html();
      }
    },
    winFocus(e) {
      this.isWin = e;
    },
    winBlur(e) {
      this.isWin = 0;
    },
    gopick() {
      window.open('https://mp.weixin.qq.com/');
    },
    varCopy(key, index, desc) {
      //   console.log(key)
      // console.log(index)
      // console.log(desc)
      this.form.valueArr[index].value
        += `<em style='background-color:#ececec;padding:6px;margin:0 10px;display:inline-block;line-height:1;' contenteditable='false'>${
          desc
        }</em>&nbsp;`;
      if (this.htmlId == 0) {
        $('.js_starttext').html(this.form.valueArr[index].value);
      } else {
        $(`.js_con${index}`).html(this.form.valueArr[index].value);
      }
      this.$message({
        type: 'info',
        message: '添加成功'
      });
    },
    addVarible(index) {
      const self = this;
      this.htmlId = index;
      const h = this.$createElement;

      const baseNode = [h('tr', null, [h('th', { attrs: { colspan: 2 } }, '用户基本属性类')])];
      const extendNode = [h('tr', null, [h('th', { attrs: { colspan: 2 } }, '用户积分/等级/权益/成长值类')])];

      for (let i = 0; i < self.variable.base.length; i++) {
        baseNode.push(
          h('tr', null, [
            h('td', null, [h('span', null, self.variable.base[i].desc)]),
            h('td', null, [
              // h('span', null, self.variable.base[i].key),
              h(
                'el-button',
                {
                  attrs: { type: 'primary' },
                  on: {
                    click() {
                      self.varCopy(self.variable.base[i].key, index, self.variable.base[i].desc);
                    }
                  }
                },
                '添加'
              )
            ])
          ])
        );
      }

      for (let i = 0; i < self.variable.extend.length; i++) {
        extendNode.push(
          h('tr', null, [
            h('td', null, [h('span', null, self.variable.extend[i].desc)]),
            h('td', null, [
              // h('span', null, self.variable.extend[i].key),
              h(
                'el-button',
                {
                  attrs: { type: 'primary' },
                  on: {
                    click() {
                      self.varCopy(self.variable.extend[i].key, index, self.variable.extend[i].desc);
                    }
                  }
                },
                '添加'
              )
            ])
          ])
        );
      }

      this.$msgbox({
        title: '添加变量',
        customClass: 'add-var',
        message: h('div', null, [h('table', null, baseNode), h('table', null, extendNode)]),
        showCancelButton: false,
        showConfirmButton: false
      }).catch(() => {});
      // index = parseInt(index) + 1
      // this.form.valueArr.splice(index, 0, {
      //   key: 'keyword' + index,
      //   value: ''
      // })
    },
    sendTest() {
      const self = this;
      this.$prompt('请输入接收者UserId', '接收者', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator(value) {
          value = value.replace(/\s+/g, '');
          if (!value || value == '' || value == null) {
            return false;
          }
        },
        inputErrorMessage: '请输入接收者UserId'
      })
        .then(({ value }) => {
          const templateData = {};
          for (let i = 0; i < self.form.valueArr.length; i++) {
            self.form.valueArr[i].value = self.form.valueArr[i].value.replace(/\"/g, "'");
            self.form.valueArr[i].value = self.form.valueArr[i].value.replace(/&nbsp;/g, '');
            self.form.valueArr[i].value = self.form.valueArr[i].value.replace(
              / style='background-color:#ececec;padding:6px;margin:0 10px;display:inline-block;line-height:1;' contenteditable='false'/g,
              ''
            );
            self.form.valueArr[i].value = self.form.valueArr[i].value.replace(/<em>用户名<\/em>/g, '$User.userName');
            self.form.valueArr[i].value = self.form.valueArr[i].value.replace(/<em>手机号<\/em>/g, '$User.mobile');
            self.form.valueArr[i].value = self.form.valueArr[i].value.replace(/<em>享受权益<\/em>/g, '$User.rights');
            self.form.valueArr[i].value = self.form.valueArr[i].value.replace(/<em>用户等级<\/em>/g, '$User.level');
            self.form.valueArr[i].value = self.form.valueArr[i].value.replace(/<em>用户成长值<\/em>/g, '$User.growth');
            templateData[self.form.valueArr[i].key] = self.form.valueArr[i];
          }

          const data = {
            templateId: self.form.templateId,
            msgType: 1,
            userIdStr: value,
            templateData,
            readMoreUrl: self.form.readMoreUrl
          };

          self.requestComm.weChatSendTest(data).then((data) => {
            if (data) {
              self.$message({
                type: 'success',
                message: '发送成功'
              });
            }
          });
        })
        .catch(() => {});
    },
    // varCopy: function (key) {
    //   this.form.templateContent += key
    //   this.$message({
    //     type: 'info',
    //     message: '添加成功'
    //   });
    // },
    addVar(index) {
      // let self = this
      // const h = this.$createElement;

      // let baseNode = [h('tr', null, [h('th', {attrs: {colspan: 2}}, '用户基本属性类')])]
      // let extendNode = [h('tr', null, [h('th', {attrs: {colspan: 2}}, '用户积分/等级/权益/成长值类')])]

      // for (let i = 0; i < self.variable.base.length; i++) {
      //   baseNode.push(
      //     h('tr', null, [
      //       h('td', null, [
      //         h('span', null, self.variable.base[i].key),
      //         h('el-button', {
      //           attrs: {type: 'primary'},
      //           on: {
      //             click: function () {
      //               self.varCopy(self.variable.base[i].key)
      //             }
      //           }
      //         }, '复制')
      //       ]),
      //       h('td', null, [
      //         h('span', null, self.variable.base[i].desc),
      //       ])
      //     ])
      //   )
      // }

      // for (let i = 0; i < self.variable.extend.length; i++) {
      //   extendNode.push(
      //     h('tr', null, [
      //       h('td', null, [
      //         h('span', null, self.variable.extend[i].key),
      //         h('el-button', {
      //           attrs: {type: 'primary'},
      //           on: {
      //             click: function () {
      //               self.varCopy(self.variable.extend[i].key)
      //             }
      //           }
      //         }, '复制')
      //       ]),
      //       h('td', null, [
      //         h('span', null, self.variable.extend[i].desc),
      //       ])
      //     ])
      //   )
      // }

      // this.$msgbox({
      //   title: '添加变量',
      //   customClass: 'add-var',
      //   message: h('div', null, [
      //     h('table', null, baseNode),
      //     h('table', null, extendNode)
      //   ]),
      //   showCancelButton: false,
      //   showConfirmButton: false,
      // })
      index = parseInt(index) + 1;
      this.form.valueArr.splice(index, 0, {
        key: `keyword${index}`,
        value: '',
        label: `会员属性${index}`,
        color: ''
      });
    },
    removeVar(index) {
      // let valueArr = this.form.valueArr
      // delete valueArr[key]
      // this.$set(this.form.valueArr, valueArr)
      this.form.valueArr.splice(index, 1);
    },
    goback() {
      history.go(-1);
    },
    weChatAdd() {
      const self = this;
      for (const i in this.form.valueArr) {
        // if (this.form.valueArr[i].value == "" && !this.form.valueArr[i].desc && this.form.valueArr[i].key != "first" && this.form.valueArr[i].key != "remark") {
        //     this.form.valueArr.splice(i,1)
        // }
        this.form.valueArr[i].value = this.form.valueArr[i].value.replace(/\"/g, "'");
        this.form.valueArr[i].value = this.form.valueArr[i].value.replace(/&nbsp;/g, '');
        this.form.valueArr[i].value = this.form.valueArr[i].value.replace(
          / style='background-color:#ececec;padding:6px;margin:0 10px;display:inline-block;line-height:1;' contenteditable='false'/g,
          ''
        );
        this.form.valueArr[i].value = this.form.valueArr[i].value.replace(/<em>用户名<\/em>/g, '$User.userName');
        this.form.valueArr[i].value = this.form.valueArr[i].value.replace(/<em>手机号<\/em>/g, '$User.mobile');
        this.form.valueArr[i].value = this.form.valueArr[i].value.replace(/<em>享受权益<\/em>/g, '$User.rights');
        this.form.valueArr[i].value = this.form.valueArr[i].value.replace(/<em>用户等级<\/em>/g, '$User.level');
        this.form.valueArr[i].value = this.form.valueArr[i].value.replace(/<em>用户成长值<\/em>/g, '$User.growth');
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          self.saveing = true;
          const data = JSON.parse(JSON.stringify(this.form));

          data.templateData = {};

          for (let i = 0; i < this.form.valueArr.length; i++) {
            data.templateData[this.form.valueArr[i].key] = this.form.valueArr[i];
          }

          if (data.id) {
            this.requestComm.weChatUpdate(data).then((data) => {
              self.saveing = false;
              if (data) {
                const h = self.$createElement;
                self.$notify({
                  message: h('p', {}, '保存成功'),
                  duration: 1500
                });
                self.$router.push({
                  path: '/communication/wechatlist'
                });
              }
            });
          } else {
            this.requestComm.weChatAdd(data).then((data) => {
              self.saveing = false;
              if (data) {
                const h = self.$createElement;
                self.$notify({
                  message: h('p', {}, '保存成功'),
                  duration: 1500
                });
                self.$router.push({
                  path: '/communication/wechatlist'
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
        this.requestComm
          .weChatGet({
            id: self.$route.query.id
          })
          .then((data) => {
            const templateData = JSON.parse(data.templateData);
            const arr = [];
            for (const i in templateData) {
              templateData[i].value = templateData[i].value.replace(
                /\$User.userName/g,
                "<em style='background-color:#ececec;padding:6px;margin:0 10px;display:inline-block;line-height:1;' contenteditable='false'>用户名</em>&nbsp;"
              );
              templateData[i].value = templateData[i].value.replace(
                /\$User.mobile/g,
                "<em style='background-color:#ececec;padding:6px;margin:0 10px;display:inline-block;line-height:1;' contenteditable='false'>手机号</em>&nbsp;"
              );
              templateData[i].value = templateData[i].value.replace(
                /\$User.rights/g,
                "<em style='background-color:#ececec;padding:6px;margin:0 10px;display:inline-block;line-height:1;' contenteditable='false'>享受权益</em>&nbsp;"
              );
              templateData[i].value = templateData[i].value.replace(
                /\$User.level/g,
                "<em style='background-color:#ececec;padding:6px;margin:0 10px;display:inline-block;line-height:1;' contenteditable='false'>用户等级</em>&nbsp;"
              );
              templateData[i].value = templateData[i].value.replace(
                /\$User.growth/g,
                "<em style='background-color:#ececec;padding:6px;margin:0 10px;display:inline-block;line-height:1;' contenteditable='false'>用户成长值</em>&nbsp;"
              );
              arr.push({
                name: i,
                value: templateData[i]
              });
            }
            for (const i in arr) {
              if (arr[i].name == 'first' || arr[i].name == 'remark') {
                delete arr[i];
              }
              if (arr[i]) {
                setTimeout(() => {
                  $(`.js_con${arr[i].name.substring(7)}`).html(arr[i].value.value);
                }, 100);
              }
            }
            $('.js_starttext').html(templateData.first.value);
            self.form = {
              id: data.id,
              brandName: data.brandName,
              templateName: data.templateName,
              readMoreUrl: data.readMoreUrl,
              templateType: `${data.templateType}`,
              msgType: data.msgType,
              // templateContent: data.templateContent, // 模板内容
              templateId: data.templateId,
              templateData,
              valueArr: [
                {
                  key: 'first',
                  value: templateData.first.value,
                  label: '开始语',
                  color: templateData.first.color
                }
              ]
            };

            let jslength = 0;
            for (const variable in self.form.templateData) {
              jslength++;
            }
            for (let i = 0; i < jslength - 2; i++) {
              self.form.valueArr.push({
                key: `keyword${i + 1}`,
                value: self.form.templateData[`keyword${i + 1}`].value,
                desc: self.form.templateData[`keyword${i + 1}`].desc,
                label: `会员属性${i + 1}`,
                color: self.form.templateData[`keyword${i + 1}`].color
              });
            }
            // {
            //   "key": "keyword1",
            //   "value": ""
            // },

            self.form.valueArr.push({
              key: 'remark',
              value: self.form.templateData.remark.value,
              label: '结束语',
              color: self.form.templateData.remark.color
            });
          });
      } else {
        this.form = {
          brandName: 'haier',
          templateName: '', // 模板名称
          readMoreUrl: '',
          templateType: '1',
          templateId: '',
          templateContent: '',
          msgType: 1,
          valueArr: [
            {
              key: 'first',
              value: '',
              label: '开始语',
              color: ''
            },
            {
              key: 'keyword1',
              value: '',
              desc: '',
              label: '会员属性1',
              color: ''
            },
            {
              key: 'remark',
              value: '',
              label: '结束语',
              color: ''
            }
          ]
        };
      }

      this.lastVar = 0;
      for (const key in this.form.valueArr) {
        this.lastVar++;
      }
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  },
  mounted() {
    this.weChatGet();
    this.isView = !!this.$route.query.type;
    const date = new Date();
    this.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
};
</script>
<style scoped>
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
.moban {
}
.moban p {
  line-height: 1;
}
.content-box {
  float: left;
  width: 520px;
  border: 2px solid #dddddd;
  border-radius: 15px;
  overflow: hidden;
}
.phone-box {
  float: left;
  margin-left: 30px;
  width: 311px;
  height: 668px;
  position: relative;
}
.zh-left {
  position: absolute;
  top: 98px;
  left: 24px;
  bottom: 94px;
  width: 13px;
  background-color: black;
  opacity: 0.3;
  z-index: 1;
}
.zh-right {
  position: absolute;
  top: 98px;
  right: 19px;
  bottom: 94px;
  width: 13px;
  background-color: black;
  opacity: 0.3;
  z-index: 1;
}
.zh_top {
  position: absolute;
  top: 98px;
  right: 32px;
  left: 37px;
  background-color: black;
  opacity: 0.3;
  z-index: 1;
}
.zh_top_moren {
  height: 159px;
}
.zh_top_one {
  height: 132px;
}
.zh_top_two {
  height: 161px;
}
.zh_top_three {
  height: 252px;
}
.zh_top_four {
  height: 298px;
}
.zh_bottom {
  position: absolute;
  bottom: 94px;
  right: 32px;
  left: 37px;
  background-color: black;
  opacity: 0.3;
  z-index: 1;
}
.zh_bottom_moren {
  height: 317px;
}
.zh_bottom_one {
  height: 317px;
}
.zh_bottom_two {
  height: 226px;
}
.zh_bottom_three {
  height: 184px;
}
.zh_bottom_four {
  height: 150px;
}
.zh_window_moren {
}
.zh_window_one {
  position: absolute;
  top: 230px;
  right: 32px;
  height: 27px;
  left: 37px;
  border: 1px solid #559cfa;
  z-index: 1;
  -moz-box-shadow: 0 0 10px #559cfa;
  -webkit-box-shadow: 0 0 10px #559cfa;
  box-shadow: 0 0 10px #559cfa;
}
.zh_window_two {
  position: absolute;
  top: 259px;
  right: 32px;
  height: 89px;
  left: 37px;
  border: 1px solid #559cfa;
  z-index: 1;
  -moz-box-shadow: 0 0 10px #559cfa;
  -webkit-box-shadow: 0 0 10px #559cfa;
  box-shadow: 0 0 10px #559cfa;
}
.zh_window_three {
  position: absolute;
  top: 350px;
  right: 32px;
  height: 40px;
  left: 37px;
  border: 1px solid #559cfa;
  z-index: 1;
  -moz-box-shadow: 0 0 10px #559cfa;
  -webkit-box-shadow: 0 0 10px #559cfa;
  box-shadow: 0 0 10px #559cfa;
}
.zh_window_four {
  position: absolute;
  top: 395px;
  right: 32px;
  height: 30px;
  left: 37px;
  border: 1px solid #559cfa;
  z-index: 1;
  -moz-box-shadow: 0 0 10px #559cfa;
  -webkit-box-shadow: 0 0 10px #559cfa;
  box-shadow: 0 0 10px #559cfa;
}
.content-title {
  background-color: #e5e5e5;
  padding: 0 17px;
  overflow: hidden;
  border-bottom: 2px solid #dddddd;
}
.title-ti {
  margin-top: 23px;
  font-size: 16px;
  font-weight: bold;
  color: #333333;
}
.title-ti span {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
}
.title-ti span:first-child {
  float: left;
}
.title-ti span:last-child {
  float: right;
  font-size: 20px;
}
.title-time {
  margin-top: 13px;
  margin-bottom: 22px;
  font-size: 14px;
  color: #9f9f9f;
}
.content-xia {
  padding: 0 17px;
  background-color: #f9f8f8;
  overflow: hidden;
  padding-bottom: 50px;
}
.xia-kaishiyu {
  margin: 15px 0 10px 0;
  font-size: 14px;
  color: #333333;
}
.xia-input {
}
.xian {
  height: 1px;
  background-color: #e5e5e5;
  margin-top: 15px;
}
.tcbox {
  margin-top: 15px;
}
.tc-title {
  display: flex;
}
.tc-title p:first-child {
  width: 126px;
}
.tc-title p:last-child {
  margin-left: 10px;
}
.ev-content {
  display: flex;
  margin-top: 10px;
}
.con-name {
  width: 126px;
}
.con-you {
  margin-left: 10px;
  width: 348px;
}
.con-icon {
  color: rgb(214, 33, 25);
  font-size: 17px;
  margin-left: 4px;
  vertical-align: middle;
  cursor: pointer;
}
.tj-btn {
  margin-top: 10px;
}
.tj-btn button {
  border-radius: 0;
}
.jieshuyu {
  margin-top: 13px;
}
.variable {
  background-color: #ececec;
  padding: 2px 4px;
}
.dvone {
  width: 292px !important;
  display: inline-block;
  background-color: white;
}
.edit-div {
  background-color: white;
  width: 452px;
  height: 100%;
  min-height: 36px;
  word-break: break-all;
  outline: none;
  user-select: text;
  text-align: left;
  /*overflow: hidden;*/
  /*white-space: nowrap;*/
  padding: 3px 10px;
  font-size: 12px;
  line-height: 30px;
  border: 1px solid #ccc;
  display: inline-block;
}
.edit-div[contenteditable='true'] {
  user-modify: read-write-plaintext-only;
}
/*.edit-div[contenteditable=true]:empty:before {*/
/*content: attr(placeholder);*/
/*display: block;*/
/*color: #ccc;*/
/*}*/
.edit-div:empty:before {
  content: attr(data-placeholder);
  color: #bbb;
}
.edit-div:focus:before {
  content: none;
}
.disview {
  background-color: #eef1f6;
  border-color: #d1dbe5;
  color: #bbb;
}
.edit-div em {
  background-color: #ececec;
  padding: 6px;
  margin: 0 10px;
  display: inline-block;
  line-height: 1;
}
.taskcolor-icon {
  color: #fa8147;
  font-size: 20px;
  vertical-align: middle;
  cursor: pointer;
}
.js_con1 {
  width: 316px;
}
.pick-reav {
  position: relative;
}
.task-picker {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  cursor: pointer;
}
.wechat-jsinput {
  background-color: white;
  border: 1px solid #ccc;
  padding: 0 10px;
  font-size: 12px;
  outline: none;
}
</style>
<style>
.wechat-temban .el-color-picker {
  width: 20px;
  height: 20px;
}
.wechat-temban .el-color-picker__trigger {
  width: 20px;
  height: 20px;
}
.wechat-temban .el-color-picker__color {
  display: none;
}
.wechat-temban .el-color-picker__icon {
  display: none;
}
</style>

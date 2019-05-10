<template>
  <div class="base-tag-select">
    <el-dialog
      title=""
      ref="userDialog"
      :show-close="false"
      :visible.sync="display"
      custom-class="base-dig vip-mytag"
      :modal-append-to-body="false"
      @close="closeDialog"
    >
      <div class="labbox">
        已选标签
        <!-- <span class="delete-span" v-for="(item,index) in labs" v-show="item.show">{{item.name}}
          <a href="javascript:;" @click="dellabs(index)">
            <i class="iconfont icon-guanbi1"></i>
          </a>
        </span> -->
        <el-tag
          v-for="(item, index) in labs"
          type="primary"
          v-show="item.show"
          :closable="true"
          @close="dellabs(index)"
        >
          {{ item.name }}
        </el-tag>
        <a class="more" v-if="labs.length >= 11 && !tig" @click="morealbs">更多</a>
        <a class="more" v-if="tig" @click="stuff">收起</a>
      </div>
      <div class="searchbox">
        <p style="float:left;display:inline-block">注：单击展开，双击选中</p>
        <el-autocomplete
          placeholder="请输入标签名"
          v-model="BQname"
          @input.native="BQname = BQname.replace(/\s+/g, '')"
          :trigger-on-focus="false"
          icon="search"
          :fetch-suggestions="querySearchAsync"
          @select="handleIconClick"
          style="width: 300px;float:right"
        >
        </el-autocomplete>
      </div>
      <div style="padding:20px;" class="tabmain">
        <el-tabs v-model="basedata" type="card" @tab-click="handleClick">
          <el-tab-pane v-for="(itemlvl1, index) in initData" :label="itemlvl1.tagName" :name="'tab' + (index + 1)">
            <div class="box" v-for="(itemlvl2, index) in itemlvl1.data">
              <!-- 二级节点 -->

              <!-- <el-tooltip class="item" effect="dark" :content="itemlvl2.tagName" placement="top"> -->
              <span class="one-field" @dblclick="checked(3, itemlvl1, itemlvl2)" :class="{ active2: itemlvl2.select }"
                ><i v-if="itemlvl2.select" class="iconfont icon-duihao2" :title="itemlvl2.tagName"></i
                >{{ itemlvl2.tagName }}
                <b v-if="itemlvl2.recordNum != undefined">({{ itemlvl2.recordNum }})</b>
              </span>
              <!-- </el-tooltip> -->
              <!-- 二级节点 -->
              <div class="con">
                <!-- 三级节点 -->
                <div class="two-field">
                  <span
                    v-for="(itemlvl3, index) in itemlvl2.data"
                    @click="open(4, itemlvl1, itemlvl2, itemlvl3)"
                    @dblclick="checked(4, itemlvl1, itemlvl2, itemlvl3)"
                    :class="{ active2: itemlvl3.select }"
                    ><i v-if="itemlvl3.select" class="iconfont icon-duihao2"></i>{{ itemlvl3.tagName }}
                    <b v-if="itemlvl3.recordNum != undefined">({{ itemlvl3.recordNum }})</b>
                    <i
                      :ref="'icon_' + itemlvl1.tagName + '_' + itemlvl2.tagName + '_' + itemlvl3.tagName"
                      class="el-icon-caret-bottom"
                    ></i>
                  </span>
                </div>
                <!-- 三级节点 -->

                <!-- 四级节点 -->
                <div class="three-field">
                  <div
                    :ref="'level4_' + itemlvl1.tagName + '_' + itemlvl2.tagName + '_' + tmpLel3.tagName"
                    v-show="false"
                  >
                    <!-- <i class="el-icon-caret-bottom" v-show="lvl4[0].hasChild==1" style="width: 90%;text-align: center;"></i> -->
                    <span
                      v-for="(itemlv4, index) in lvl4"
                      @click="open(5, itemlvl1, itemlvl2, tmpLel3, itemlv4)"
                      @dblclick="checked(5, itemlvl1, itemlvl2, tmpLel3, itemlv4)"
                      :class="{ active: itemlv4.select }"
                      >{{ itemlv4.tagName }}
                      <b v-if="itemlv4.recordNum != undefined">({{ itemlv4.recordNum }})</b>
                    </span>
                  </div>
                </div>
                <!-- 四级节点 -->

                <!-- 五级节点 -->
                <div class="three-field">
                  <div
                    :ref="
                      'level5_' +
                        itemlvl1.tagName +
                        '_' +
                        itemlvl2.tagName +
                        '_' +
                        tmpLel3.tagName +
                        '_' +
                        tmpLel4.tagName
                    "
                    v-show="false"
                  >
                    <i
                      class="el-icon-caret-bottom"
                      v-show="lvl4[0].hasChild == 1"
                      style="width: 90%;text-align: center;"
                    ></i>
                    <span
                      v-for="(itemlv5, index) in lvl5"
                      @click="open(6, itemlvl1, itemlvl2, tmpLel3, tmpLel4, itemlv5)"
                      @dblclick="checked(6, itemlvl1, itemlvl2, tmpLel3, tmpLel4, itemlv5)"
                      :class="{ active: itemlv5.select }"
                      >{{ itemlv5.tagName }}
                      <b v-if="itemlv5.recordNum != undefined">({{ itemlv5.recordNum }})</b>
                    </span>
                  </div>
                </div>
                <!-- 五级节点 -->

                <!-- 六级节点 -->
                <div class="three-field">
                  <div
                    :ref="
                      'level6_' +
                        itemlvl1.tagName +
                        '_' +
                        itemlvl2.tagName +
                        '_' +
                        tmpLel3.tagName +
                        '_' +
                        tmpLel4.tagName +
                        '_' +
                        tmpLel5.tagName
                    "
                    v-show="false"
                  >
                    <i
                      class="el-icon-caret-bottom"
                      v-show="lvl5[0].hasChild == 1"
                      style="width: 90%;text-align: center;"
                    ></i>
                    <span
                      v-for="(itemlv6, index) in lvl6"
                      @dblclick="checked(itemlv6)"
                      :class="{ active: itemlv6.select }"
                      >{{ itemlv6.tagName }}
                      <b v-if="itemlv6.recordNum != undefined">({{ itemlv6.recordNum }})</b>
                    </span>
                    <!-- <i class="el-icon-caret-bottom" v-show="lvl5[0].hasChild==1" style="width: 100%;text-align: center;"></i> -->
                  </div>
                </div>
                <!-- 六级节点 -->
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  props: ['dialogChange', 'form', 'random', 'dialogDisplay', 'closeDialog', 'site', 'init', 'thedata'],
  data() {
    return {
      BQname: '',
      basedata: 'tab1',
      labs: [],
      templabs: [],
      matchField: '',
      restaurants: [],
      lvl1: [],
      lvl4: [
        {
          hasChild: 0
        }
      ],
      lvl5: [
        {
          hasChild: 0
        }
      ],
      lvl6: [
        {
          hasChild: 0
        }
      ],
      tmpLel3: '',
      tmpLel4: '',
      tmpLel5: '',
      moreshow: false,
      tig: false,
      tempKeywords: '',
      timer: null,
      display: false
    };
  },
  computed: {
    // initlabs: function () {
    //   var _this = this;
    //   var temp = [];
    //   for (var item in _this.init) {
    //     var id = _this.init[item].split(":")[0],
    //       name = _this.init[item].split(":")[1];
    //     _this.temp.push({
    //       "name": name,
    //       "id": id
    //     })
    //   }
    //   return temp
    // }
    initData() {
      return this.thedata;
    }
  },
  mounted() {
    this.display = this.dialogDisplay;
    // this.lvl1 = this.thedata;
    // var _this = this
    // var params = {
    //   level1TagName: '',
    //   level2TagName: '',
    //   level3TagName: '',
    //   level4TagName: '',
    //   level5TagName: '',
    //   level: 1,
    //   type: 1,
    //   selectAll: ''
    // }
    // this.requestVip.getBasicTagById(params).then(function (result) {
    //   _this.lvl1 = result;
    // })

    // console.log("1",this.initlabs);
  },
  methods: {
    querySearchAsync(queryString, cb) {
      if (queryString == ' ') {
        cb([]);
        return;
      }
      const _this = this;
      const data = {
        tagName: queryString || _this.tempKeywords,
        num: 10000
      };
      _this.requestVip.fuzzySearchBasicTag(data).then((result) => {
        _this.restaurants = [];
        for (const i in result) {
          const templabs = [];
          templabs.push({
            name: result[i].tagName,
            id: result[i].node_id
          });
          _this.restaurants.push({
            value: `${result[i].parentTagName} -> ${result[i].tagName}`,
            id: templabs
          });
        }
        if (queryString) {
          _this.tempKeywords = queryString;
        }
        cb(_this.restaurants);
      });
      // var restaurants = _this.restaurants;
      // clearTimeout(_this.timeout);
      // _this.timeout = setTimeout(() => {
      //   cb(_this.restaurants);
      // }, 200 * Math.random());
    },
    handleClick(o) {
      // var _this = this;
      // _this.labs = [];
      // _this.templabs = [];
      // _this.matchField = "";
      // _this.restaurants = [];
      // _this.lvl4 = [{
      //   hasChild: 0
      // }];
      // _this.lvl5 = [{
      //   hasChild: 0
      // }];
      // _this.lvl6 = [{
      //   hasChild: 0
      // }];
      // _this.tmpLel3 = "";
      // _this.tmpLel4 = "";
      // _this.tmpLel5 = "";
      // for (var i in _this.$refs) {
      //   if (_this.$refs[i][0] != undefined) {
      //     _this.$refs[i][0].style.display = 'none'
      //   }
      // }
    },
    handleIconClick(item) {
      const _this = this;
      _this.labs.push({
        name: item.value,
        id: item.id
      });
      _this.labs = _this.removeRepeatArray(_this.labs);
      for (const i in _this.labs) {
        if (i <= 9) {
          _this.labs[i].show = true;
        } else {
          _this.labs[i].show = false;
        }
      }
    },
    open(lvl, l1, l2, l3, l4, l5) {
      const _this = this;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        const data = {
          level1TagName: l1 ? l1.tagName : '',
          level2TagName: l2 ? l2.tagName : '',
          level3TagName: l3 ? l3.tagName : '',
          level4TagName: l4 ? l4.tagName : '',
          level5TagName: l5 ? l5.tagName : '',
          level: lvl,
          type: 1
        };
        _this.requestVip.getBasicTagById(data).then((result) => {
          // 单击展开
          if (result.length > 0) {
            // 有下级节点
            if (lvl == 4) {
              // 四级
              _this.lvl4 = result;
              for (var i in _this.$refs) {
                if (i.indexOf('icon') >= 0) {
                  if (_this.$refs[i][0] != undefined) {
                    _this.$refs[i][0].style.display = 'none';
                  }
                }
              }
              const icon = `icon_${l1.tagName}_${l2.tagName}_${l3.tagName}`;
              _this.$refs[icon][0].style.display = 'block';

              for (var i in _this.$refs) {
                if (i.indexOf('level4') >= 0) {
                  if (_this.$refs[i][0] != undefined) {
                    _this.$refs[i][0].style.display = 'none';
                  }
                }
              }
              _this.tmpLel3 = l3;
              var o = `level4_${l1.tagName}_${l2.tagName}_${_this.tmpLel3.tagName}`;
              setTimeout(() => {
                _this.$refs[o][0].style.display = 'block';
              }, 50);

              // 切换后隔级消失
              for (var i in _this.$refs) {
                if (i.indexOf('level5') >= 0 || i.indexOf('level6') >= 0) {
                  if (_this.$refs[i][0] != undefined) {
                    _this.$refs[i][0].style.display = 'none';
                  }
                }
              }
            } else if (lvl == 5) {
              // 五级
              _this.lvl5 = result;
              for (var i in _this.$refs) {
                if (i.indexOf('level5') >= 0) {
                  if (_this.$refs[i][0] != undefined) {
                    _this.$refs[i][0].style.display = 'none';
                  }
                }
              }
              _this.tmpLel3 = l3;
              _this.tmpLel4 = l4;
              var o = `level5_${l1.tagName}_${l2.tagName}_${_this.tmpLel3.tagName}_${_this.tmpLel4.tagName}`;

              // 切换后隔级消失
              const o6 = `level6_${
                l1.tagName
              }_${
                l2.tagName
              }_${
                l3.tagName
              }_${
                _this.tmpLel4.tagName
              }_${
                _this.tmpLel5.tagName}`;

              setTimeout(() => {
                _this.$refs[o][0].style.display = 'block';
                _this.$refs[o6][0].style.display = 'none';
              }, 50);
            } else if (lvl == 6) {
              // 六级

              _this.lvl6 = result;
              for (var i in _this.$refs) {
                if (i.indexOf('level6') >= 0) {
                  if (_this.$refs[i][0] != undefined) {
                    _this.$refs[i][0].style.display = 'none';
                  }
                }
              }
              _this.tmpLel3 = l3;
              _this.tmpLel4 = l4;
              _this.tmpLel5 = l5;
              var o = `level6_${
                l1.tagName
              }_${
                l2.tagName
              }_${
                _this.tmpLel3.tagName
              }_${
                _this.tmpLel4.tagName
              }_${
                _this.tmpLel5.tagName}`;
              setTimeout(() => {
                _this.$refs[o][0].style.display = 'block';
              }, 50);
            }
          } else {
            // 没有下级节点
            console.log('无下级节点');
          }
        });
      }, 300);
    },
    checked(lvl, l1, l2, l3, l4, l5) {
      clearTimeout(this.timer);

      const _this = this;
      for (var i in _this.$refs) {
        if (i.indexOf('level4') >= 0) {
          if (_this.$refs[i][0] != undefined) {
            _this.$refs[i][0].style.display = 'none';
          }
        }
      }
      $('.el-icon-caret-bottom').hide();

      if (typeof lvl === 'object') {
        const templabs = [];
        templabs.push({
          name: lvl.tagName,
          id: lvl.nodeId
        });

        _this.$set(lvl, 'name', lvl.tagName);
        _this.$set(lvl, 'id', templabs);
        _this.labs.push(lvl);

        lvl.select = true;
        _this.labs = _this.removeRepeatArray(_this.labs);

        for (var i in _this.labs) {
          if (i <= 9) {
            _this.labs[i].show = true;
          } else {
            _this.labs[i].show = false;
          }
        }
        console.log('六级', _this.labs);
      } else {
        const data = {
          level1TagName: l1 ? l1.tagName : '',
          level2TagName: l2 ? l2.tagName : '',
          level3TagName: l3 ? l3.tagName : '',
          level4TagName: l4 ? l4.tagName : '',
          level5TagName: l5 ? l5.tagName : '',
          level: lvl,
          type: 1,
          selectAll: 2
        };
        _this.requestVip.getBasicTagById(data).then((result) => {
          if (lvl == 3) {
            var templabs = [];
            if (result.length > 0) {
              for (var i in result) {
                templabs.push({
                  name: result[i].tagName,
                  id: result[i].node_id
                });
              }
            } else {
              templabs.push({
                name: l2.tagName,
                id: l2.node_id
              });
            }

            _this.$set(l2, 'name', l2.tagName);
            _this.$set(l2, 'id', templabs);
            _this.labs.push(l2);

            l2.select = true;
            _this.labs = _this.removeRepeatArray(_this.labs);

            for (var i in _this.labs) {
              if (i <= 9) {
                _this.labs[i].show = true;
              } else {
                _this.labs[i].show = false;
              }
            }

            console.log('三级', _this.labs);
          } else if (lvl == 4) {
            var templabs = [];
            // debugger
            if (result.length > 0) {
              for (var i in result) {
                templabs.push({
                  name: result[i].tagName,
                  id: result[i].node_id
                });
              }
            } else {
              templabs.push({
                name: l3.tagName,
                id: l3.node_id
              });
            }

            _this.$set(l3, 'name', l3.tagName);
            _this.$set(l3, 'id', templabs);
            _this.labs.push(l3);
            l3.select = true;
            _this.labs = _this.removeRepeatArray(_this.labs);

            for (var i in _this.labs) {
              if (i <= 9) {
                _this.labs[i].show = true;
              } else {
                _this.labs[i].show = false;
              }
            }

            console.log('四级', _this.labs);
          } else if (lvl == 5) {
            var templabs = [];
            if (result.length > 0) {
              for (var i in result) {
                templabs.push({
                  name: result[i].tagName,
                  id: result[i].node_id
                });
              }
            } else {
              templabs.push({
                name: l4.tagName,
                id: l4.node_id
              });
            }

            _this.$set(l4, 'name', l4.tagName);
            _this.$set(l4, 'id', templabs);
            _this.labs.push(l4);
            l4.select = true;
            _this.labs = _this.removeRepeatArray(_this.labs);

            for (var i in _this.labs) {
              if (i <= 9) {
                _this.labs[i].show = true;
              } else {
                _this.labs[i].show = false;
              }
            }
            console.log('五级', _this.labs);
          } else if (lvl == 6) {
            var templabs = [];
            if (result.length > 0) {
              for (var i in result) {
                templabs.push({
                  name: result[i].tagName,
                  id: result[i].node_id
                });
              }
            } else {
              templabs.push({
                name: l5.tagName,
                id: l5.node_id
              });
            }

            _this.$set(l5, 'name', l5.tagName);
            _this.$set(l5, 'id', templabs);
            _this.labs.push(l5);
            l5.select = true;
            _this.labs = _this.removeRepeatArray(_this.labs);

            for (var i in _this.labs) {
              if (i <= 9) {
                _this.labs[i].show = true;
              } else {
                _this.labs[i].show = false;
              }
            }
            console.log('六级', _this.labs);
          }
        });
      }
    },
    // addthree(item, lvl, type) {
    //   var _this = this;
    //   if (!type) {
    //     if (lvl == 'lv2') {
    //       if (item.data.length <= 0) {
    //         _this.labs.push({
    //           "name": item.tagName,
    //           "id": item.nodeId
    //         })
    //         _this.labs = _this.removeRepeatArray(_this.labs);
    //         for (var i in _this.labs) {
    //           if (i <= 9) {
    //             _this.labs[i].show = true
    //           } else {
    //             _this.labs[i].show = false
    //           }
    //         }
    //       }
    //     } else {
    //       _this.labs.push({
    //         "name": item.tagName,
    //         "id": item.nodeId
    //       })
    //       _this.labs = _this.removeRepeatArray(_this.labs);
    //       for (var i in _this.labs) {
    //         if (i <= 9) {
    //           _this.labs[i].show = true
    //         } else {
    //           _this.labs[i].show = false
    //         }
    //       }

    //     }
    //   } else {
    //     //双击
    //   }
    // },
    // getthree(l1, l2, l3, l4, l5, type, lvl) {
    //   var _this = this;
    //   var data = {
    //     level1TagName: l1.tagName,
    //     level2TagName: l2.tagName,
    //     level3TagName: l3.tagName,
    //     level4TagName: l4.tagName,
    //     level5TagName: l5.tagName,
    //     level: lvl,
    //     type: 1
    //   }
    //   _this.requestVip.getBasicTagById(data).then(function (result) {
    //     if (!type) {
    //       if (result.length > 0) {
    //         if (lvl == 4) {
    //           _this.lvl4 = result;
    //           for (var i in _this.$refs) {
    //             if (i.indexOf("icon") >= 0) {
    //               if (_this.$refs[i][0] != undefined) {
    //                 _this.$refs[i][0].style.display = 'none'
    //               }
    //             }
    //           }
    //           var icon = 'icon_' + l1.tagName + '_' + l2.tagName + '_' + l3.tagName;
    //           _this.$refs[icon][0].style.display = "block";

    //           for (var i in _this.$refs) {
    //             if (i.indexOf("level") >= 0) {
    //               if (_this.$refs[i][0] != undefined) {
    //                 _this.$refs[i][0].style.display = 'none'
    //               }
    //             }
    //           }

    //           _this.tmpLel = l3.tagName;
    //           var o = 'level_' + l1.tagName + '_' + l2.tagName + '_' + _this.tmpLel;
    //           setTimeout(function () {
    //             _this.$refs[o][0].style.display = "block";
    //           }, 50)

    //         } else if (lvl == 5) {

    //           _this.lvl5 = result;
    //           for (var i in _this.$refs) {
    //             if (i.indexOf("level5") >= 0) {
    //               if (_this.$refs[i][0] != undefined) {
    //                 _this.$refs[i][0].style.display = 'none'
    //               }
    //             }
    //           }

    //           _this.tmpLel = l3.tagName;
    //           _this.tmpLel2 = l4.tagName;
    //           var o = 'level5_' + l1.tagName + '_' + l2.tagName + '_' + _this.tmpLel + '_' + _this.tmpLel2;
    //           setTimeout(function () {
    //             _this.$refs[o][0].style.display = "block";
    //           }, 50)
    //           // _this.lvl6 = [{
    //           //   hasChild: 0
    //           // }];
    //         } else if (lvl == 6) {
    //           _this.lvl6 = result;
    //           for (var i in _this.$refs) {
    //             if (i.indexOf("level6") >= 0) {
    //               if (_this.$refs[i][0] != undefined) {
    //                 _this.$refs[i][0].style.display = 'none'
    //               }
    //             }
    //           }
    //           _this.tmpLel = l3.tagName;
    //           _this.tmpLel2 = l4.tagName;
    //           _this.tmpLel3 = l5.tagName;
    //           var o = 'level6_' + l1.tagName + '_' + l2.tagName + '_' + _this.tmpLel + '_' + _this.tmpLel2 + '_' +
    //             _this.tmpLel3;
    //           setTimeout(function () {
    //             _this.$refs[o][0].style.display = "block";
    //           }, 50)
    //         }
    //       } else {
    //         if (lvl == 5) {
    //           _this.labs.push({
    //             "name": l4.tagName,
    //             "id": l4.node_id
    //           })
    //         } else if (lvl == 6) {
    //           _this.labs.push({
    //             "name": l5.tagName,
    //             "id": l5.node_id
    //           })
    //         } else if (lvl == 4) {
    //           _this.labs.push({
    //             "name": l3.tagName,
    //             "id": l3.node_id
    //           })
    //         }

    //         _this.labs = _this.removeRepeatArray(_this.labs);
    //         for (var i in _this.labs) {
    //           if (i <= 9) {
    //             _this.labs[i].show = true
    //           } else {
    //             _this.labs[i].show = false
    //           }
    //         }
    //       }
    //     } else {
    //       //双击

    //       for (var i in result) {
    //         if (result[i].hasChild == 1) {
    //           return
    //         }
    //         _this.labs.push({
    //           "name": result[i].tagName,
    //           "id": result[i].nodeId
    //         })
    //       }
    //       _this.labs = _this.removeRepeatArray(_this.labs);
    //       for (var i in _this.labs) {
    //         if (i <= 9) {
    //           _this.labs[i].show = true
    //         } else {
    //           _this.labs[i].show = false
    //         }
    //       }
    //     }

    //   })
    // },
    removeRepeatArray(arr) {
      const hash = {};
      arr = arr.reduce((item, next) => {
        hash[next.name] ? '' : (hash[next.name] = true && item.push(next));
        return item;
      }, []);
      return arr;
    },
    morealbs() {
      const _this = this;
      for (const i in _this.labs) {
        _this.labs[i].show = true;
      }
      _this.tig = true;
      _this.$forceUpdate();

      console.log(_this.labs);
    },
    stuff() {
      const _this = this;
      for (let i = 10; i < _this.labs.length; i++) {
        _this.labs[i].show = false;
      }
      _this.tig = false;
      _this.$forceUpdate();
    },
    dellabs(index) {
      const _this = this;
      console.log(_this.labs[index]);
      _this.labs[index].select = false;
      _this.labs.splice(index, 1);
    },
    save() {
      // let selectedNode = []
      // for (var i in this.labs) {
      //   selectedNode.push(this.labs[i].id + ':' + this.labs[i].name)
      // }
      this.dialogChange(this.labs);
      this.reset();
    },
    reset() {
      // 重置
      const _this = this;
      _this.basedata = 'tab1';
      _this.labs = [];
      _this.templabs = [];
      _this.matchField = '';
      _this.restaurants = [];
      _this.initData = [];
      _this.lvl4 = [
        {
          hasChild: 0
        }
      ];
      _this.lvl5 = [
        {
          hasChild: 0
        }
      ];
      _this.lvl6 = [
        {
          hasChild: 0
        }
      ];
      _this.tmpLel3 = '';
      _this.tmpLel4 = '';
      _this.tmpLel5 = '';
      _this.moreshow = false;
      _this.tig = false;

      for (const i in _this.$refs) {
        if (_this.$refs[i][0] != undefined && _this.$refs[i][0].style != undefined) {
          _this.$refs[i][0].style.display = 'none';
        }
      }
    }
  },
  watch: {
    dialogDisplay(curVal) {
      this.display = this.dialogDisplay;
    }
  }
};
</script>
<style scoped>
.delete-span:first-child {
  margin-left: 10px;
}

.labbox .el-tag {
  /* background: #f7fafd; */
  margin-right: 10px;
  margin-bottom: 10px;
}

.labbox .el-tag:first-child {
  /* background: #f7fafd; */
  margin-left: 10px;
}

.base-tag-select .labbox {
  margin: 0 20px;
  padding: 0 20px 10px;
  border-bottom: 1px solid #d4d4d4;
}

.base-tag-select .labbox a.more {
  color: #00a9f0;
  cursor: pointer;
  margin-left: 10px;
}

.base-tag-select .tabmain .box {
  margin: 10px 0 10px;
  /* min-height: 80px; */
  position: relative;
  border-bottom: 1px solid #e3e3e3;
}

.base-tag-select .tabmain .box:first-child {
  margin-top: 20px;
}

.base-tag-select .tabmain .box .one-field {
  display: inline-block;
  float: left;
  margin-right: 40px;
  margin-left: 10px;
  background: #eef5fc;
  padding: 5px 10px;
  width: 118px;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.base-tag-select .tabmain .box .con {
  display: inline-block;
  /* float: left; */
  margin-top: 5px;
}

.base-tag-select .tabmain .box .two-field {
  color: #009ce4;
  width: 670px;
  min-height: 20px;
  max-height: 70px;
  overflow-y: auto;
}

.base-tag-select .tabmain .box .two-field span {
  margin-right: 50px;
  cursor: pointer;
  position: relative;
  display: inline-block;
  text-align: center;
  margin-bottom: 10px;
  /* float: left; */
}

.base-tag-select .tabmain .box .two-field i {
  display: none;
  width: 100%;
  position: absolute;
  left: 0;
  color: #878787;
}
/*
  .base-tag-select .tabmain .box .two-field span:hover i {
    display: inline-block
  } */

.base-tag-select .tabmain .box .three-field {
  margin: 10px 0 10px;
  width: 650px;
}

.base-tag-select .tabmain .box .three-field span {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 5px;
  background: #9daec6;
  color: #fff;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 5px;
}

.base-tag-select .searchbox {
  padding: 30px 20px 10px;
  height: 60px;
}

.base-tag-select .searchbox p {
  color: #fe0202;
}

.show {
  display: inline-block !important;
}

b {
  font-weight: normal;
  font-size: 12px;
}

.checked {
  background: #009ce4 !important;
}

.active {
  font-weight: bolder;
  background: #009ce4 !important;
}

.active2 {
  /* font-weight: bolder; */
  /* font-style: italic */
}

.base-tag-select .tabmain .box i.icon-duihao2 {
  position: relative;
  color: #0ab202;
  margin-right: 2px;
  display: inline-block;
  width: 16px;
}
</style>

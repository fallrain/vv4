<template>
  <div class="base-tag-select">
    <el-dialog
      title=""
      ref="userDialog"
      :show-close="false"
      :visible.sync="dialogDisplay"
      custom-class="base-dig"
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
          v-show="item.show"
          type="primary"
          :closable="true"
          @close="dellabs(index)"
        >
          {{ item.name }}
        </el-tag>
        <a class="more" v-if="labs.length > 10" @click="morealbs">更多</a>
      </div>
      <div class="searchbox">
        <p style="float:left;display:inline-block">注:双击全选</p>
        <el-autocomplete
          ref="autocomplete"
          placeholder="请输入标签名"
          icon="search"
          :fetch-suggestions="querySearchAsync"
          v-model="matchField"
          @select="handleIconClick"
          style="width: 300px;float:right"
        >
        </el-autocomplete>
      </div>
      <div style="padding:20px;" class="tabmain">
        <el-tabs v-model="basedata" type="card" @tab-click="handleClick">
          <el-tab-pane v-for="(itemlvl1, index) in lvl1" :label="itemlvl1.tagName" :name="'tab' + (index + 1)">
            <div class="box" v-for="(itemlvl2, index) in itemlvl1.data">
              <span
                class="one-field"
                @click="addthree(itemlvl2, 'lv2', false)"
                @dblclick="getthree(itemlvl1, itemlvl2, { tagName: '' }, { tagName: '' }, { tagName: '' }, true, 3)"
                >{{ itemlvl2.tagName }}
                <b v-if="itemlvl2.recordNum != undefined">({{ itemlvl2.recordNum }})</b>
              </span>
              <div class="con">
                <div class="two-field">
                  <span
                    v-for="(itemlvl3, index) in itemlvl2.data"
                    @click="getthree(itemlvl1, itemlvl2, itemlvl3, { tagName: '' }, { tagName: '' }, false, 4)"
                    @dblclick="getthree(itemlvl1, itemlvl2, itemlvl3, { tagName: '' }, { tagName: '' }, true, 4)"
                    >{{ itemlvl3.tagName }}
                    <b v-if="itemlvl3.recordNum != undefined">({{ itemlvl3.recordNum }})</b>
                    <i
                      :ref="'icon_' + itemlvl1.tagName + '_' + itemlvl2.tagName + '_' + itemlvl3.tagName"
                      class="el-icon-caret-bottom"
                    ></i>
                  </span>
                </div>

                <!-- 四级 -->
                <div class="three-field">
                  <div :ref="'level_' + itemlvl1.tagName + '_' + itemlvl2.tagName + '_' + tmpLel" style="display:none">
                    <span
                      v-for="(itemlv4, index) in lvl4"
                      @click="getthree(itemlvl1, itemlvl2, { tagName: tmpLel }, itemlv4, { tagName: '' }, false, 5)"
                      @dblclick="getthree(itemlvl1, itemlvl2, { tagName: tmpLel }, itemlv4, { tagName: '' }, true, 5)"
                      >{{ itemlv4.tagName }}
                      <b v-if="itemlv4.recordNum != undefined">({{ itemlv4.recordNum }})</b>
                    </span>
                    <!-- <i class="el-icon-caret-bottom" v-show="lvl5[0].hasChild==1" style="width: 100%;text-align: center;"></i> -->
                  </div>
                </div>

                <!-- 五级 -->
                <div class="three-field">
                  <div
                    :ref="'level5_' + itemlvl1.tagName + '_' + itemlvl2.tagName + '_' + tmpLel + '_' + tmpLel2"
                    style="display:none"
                  >
                    <i
                      class="el-icon-caret-bottom"
                      v-show="lvl4[0].hasChild == 1"
                      style="width: 100%;text-align: center;"
                    ></i>
                    <span
                      v-for="(itemlv5, index) in lvl5"
                      @click="
                        getthree(itemlvl1, itemlvl2, { tagName: tmpLel }, { tagName: tmpLel2 }, itemlv5, false, 6)
                      "
                      @dblclick="
                        getthree(itemlvl1, itemlvl2, { tagName: tmpLel }, { tagName: tmpLel2 }, itemlv5, true, 6)
                      "
                      >{{ itemlv5.tagName }}
                      <b v-if="itemlv5.recordNum != undefined">({{ itemlv5.recordNum }})</b>
                    </span>
                  </div>
                </div>

                <!-- 六级 -->
                <div class="three-field" :ref="'lvbox6'">
                  <div
                    :ref="
                      'level6_' +
                        itemlvl1.tagName +
                        '_' +
                        itemlvl2.tagName +
                        '_' +
                        tmpLel +
                        '_' +
                        tmpLel2 +
                        '_' +
                        tmpLel3
                    "
                    style="display:none"
                  >
                    <i
                      class="el-icon-caret-bottom"
                      v-show="lvl5[0].hasChild == 1"
                      style="width: 100%;text-align: center;"
                    ></i>
                    <span v-for="(itemlv6, index) in lvl6" @click="addthree(itemlv6, 'lv4')"
                      >{{ itemlv6.tagName }}
                      <b v-if="itemlv6.recordNum != undefined">({{ itemlv6.recordNum }})</b>
                    </span>
                  </div>
                </div>
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
  props: ['dialogChange', 'form', 'random', 'dialogDisplay', 'closeDialog', 'site', 'init'],
  data() {
    return {
      basedata: 'tab1',
      labs: [],
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
      tmpLel: '',
      tmpLel2: '',
      tmpLel3: '',
      moreshow: false
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
  },
  mounted() {
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
    this.requestVip.getBasicTagById(params).then((result) => {
      _this.lvl1 = result;
    });

    // console.log("1",this.initlabs);
  },
  methods: {
    querySearchAsync(queryString, cb) {
      const _this = this;
      const data = {
        tagName: _this.matchField,
        num: 5
      };
      _this.requestVip.fuzzySearchBasicTag(data).then((result) => {
        _this.restaurants = [];
        for (const i in result) {
          _this.restaurants.push({
            value: `${result[i].parentTagName} -> ${result[i].tagName}`,
            id: result[i].node_id
          });
        }
        console.log(_this.restaurants);
      });
      const { restaurants } = _this;
      clearTimeout(_this.timeout);
      _this.timeout = setTimeout(() => {
        cb(_this.restaurants);
      }, 1000 * Math.random());
    },
    handleClick(o) {
      console.log(o.label);
    },
    handleIconClick(item) {
      const _this = this;
      _this.labs.push({
        name: item.value,
        id: item.id
      });
      _this.labs = _this.removeRepeatArray(_this.labs);
      for (const i in _this.labs) {
        if (i <= 10) {
          _this.labs[i].show = true;
        } else {
          _this.labs[i].show = false;
        }
      }
    },
    addthree(item, lvl, type) {
      const _this = this;
      if (!type) {
        if (lvl == 'lv2') {
          if (item.data.length <= 0) {
            _this.labs.push({
              name: item.tagName,
              id: item.nodeId
            });
            _this.labs = _this.removeRepeatArray(_this.labs);
            for (var i in _this.labs) {
              if (i <= 10) {
                _this.labs[i].show = true;
              } else {
                _this.labs[i].show = false;
              }
            }
          }
        } else {
          _this.labs.push({
            name: item.tagName,
            id: item.nodeId
          });
          _this.labs = _this.removeRepeatArray(_this.labs);
          for (var i in _this.labs) {
            if (i <= 10) {
              _this.labs[i].show = true;
            } else {
              _this.labs[i].show = false;
            }
          }
        }
      } else {
        // 双击
      }
    },
    getthree(l1, l2, l3, l4, l5, type, lvl) {
      const _this = this;
      const data = {
        level1TagName: l1.tagName,
        level2TagName: l2.tagName,
        level3TagName: l3.tagName,
        level4TagName: l4.tagName,
        level5TagName: l5.tagName,
        level: lvl,
        type: 1
      };
      _this.requestVip.getBasicTagById(data).then((result) => {
        if (!type) {
          if (result.length > 0) {
            if (lvl == 4) {
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
                if (i.indexOf('level') >= 0) {
                  if (_this.$refs[i][0] != undefined) {
                    _this.$refs[i][0].style.display = 'none';
                  }
                }
              }

              _this.tmpLel = l3.tagName;
              var o = `level_${l1.tagName}_${l2.tagName}_${_this.tmpLel}`;
              setTimeout(() => {
                _this.$refs[o][0].style.display = 'block';
              }, 50);
            } else if (lvl == 5) {
              _this.lvl5 = result;
              for (var i in _this.$refs) {
                if (i.indexOf('level5') >= 0) {
                  if (_this.$refs[i][0] != undefined) {
                    _this.$refs[i][0].style.display = 'none';
                  }
                }
              }

              _this.tmpLel = l3.tagName;
              _this.tmpLel2 = l4.tagName;
              var o = `level5_${l1.tagName}_${l2.tagName}_${_this.tmpLel}_${_this.tmpLel2}`;
              setTimeout(() => {
                _this.$refs[o][0].style.display = 'block';
              }, 50);
              // _this.lvl6 = [{
              //   hasChild: 0
              // }];
            } else if (lvl == 6) {
              _this.lvl6 = result;
              for (var i in _this.$refs) {
                if (i.indexOf('level6') >= 0) {
                  if (_this.$refs[i][0] != undefined) {
                    _this.$refs[i][0].style.display = 'none';
                  }
                }
              }
              _this.tmpLel = l3.tagName;
              _this.tmpLel2 = l4.tagName;
              _this.tmpLel3 = l5.tagName;
              var o = `level6_${
                l1.tagName
              }_${
                l2.tagName
              }_${
                _this.tmpLel
              }_${
                _this.tmpLel2
              }_${
                _this.tmpLel3}`;
              setTimeout(() => {
                _this.$refs[o][0].style.display = 'block';
              }, 50);
            }
          } else {
            if (lvl == 5) {
              _this.labs.push({
                name: l4.tagName,
                id: l4.node_id
              });
            } else if (lvl == 6) {
              _this.labs.push({
                name: l5.tagName,
                id: l5.node_id
              });
            } else if (lvl == 4) {
              _this.labs.push({
                name: l3.tagName,
                id: l3.node_id
              });
            }

            _this.labs = _this.removeRepeatArray(_this.labs);
            for (var i in _this.labs) {
              if (i <= 10) {
                _this.labs[i].show = true;
              } else {
                _this.labs[i].show = false;
              }
            }
          }
        } else {
          // 双击

          for (var i in result) {
            if (result[i].hasChild == 1) {
              return;
            }
            _this.labs.push({
              name: result[i].tagName,
              id: result[i].nodeId
            });
          }
          _this.labs = _this.removeRepeatArray(_this.labs);
          for (var i in _this.labs) {
            if (i <= 10) {
              _this.labs[i].show = true;
            } else {
              _this.labs[i].show = false;
            }
          }
        }
      });
    },
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
      // _this.moreshow = true;
      _this.$forceUpdate();

      console.log(_this.labs);
    },
    dellabs(index) {
      const _this = this;
      _this.labs.splice(index, 1);
    },
    save() {
      const selectedNode = [];
      for (const i in this.labs) {
        selectedNode.push(`${this.labs[i].id}:${this.labs[i].name}`);
      }
      this.dialogChange(selectedNode);
    }
  },
  watch: {}
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
  padding: 0 20px 20px;
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
  margin-right: 55px;
  cursor: pointer;
  position: relative;
  display: inline-block;
  text-align: center;
  margin-bottom: 10px;
  float: left;
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
  background: #8392a7;
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
}

.checked {
  background: #009ce4 !important;
}
</style>

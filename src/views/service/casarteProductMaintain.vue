<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand"><i></i>卡萨帝产品价格维护</p>

      <div class="clear"></div>
    </div>
    <el-row>
      <el-col :span="8">
        <span class="appealtitel">产品编码：</span>
        <el-input
          style="width: 60%"
          placeholder="请输入产品编码"
          v-model="form.sn_code"
          :maxlength="11"
          @input.native="form.sn_code = form.sn_code.replace(/\s+/g, '')"
        ></el-input>
      </el-col>
      <el-col :span="8">
        <span class="appealtitel">产品型号：</span>
        <el-input style="width: 60%" placeholder="请输入产品型号" v-model="form.sn_desc"></el-input>
      </el-col>
      <el-col :span="8">
        <span class="appealtitel">审核状态：</span>
        <el-select placeholder="请选择审核状态" style="width: 60%" v-model="form.mark_flag">
          <el-option v-for="item in examineOptions" :key="item.id" :label="item.value" :value="item.id"> </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px;">
      <el-col :span="8">
        <span class="appealtitel">产品大类：</span>
        <el-select placeholder="请选择产品大类" style="width: 60%" v-model="form.proname" @change="pronameChange">
          <el-option v-for="item in oneOptions" :key="item.proname" :label="item.proname" :value="item.proname">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <span class="appealtitel">二级分类：</span>
        <el-select placeholder="请选择二级分类" style="width: 60%" v-model="form.prolinecodename">
          <el-option v-for="item in twoOptions" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="query">查询</el-button>
        <el-button
          type="primary"
          @click="casarteMain(0)"
          v-if="jurisdiction['servicesOperations:casartePriceManager:save']"
          >新增</el-button
        >
        <!--<el-button type="primary" @click="casarteMain(1)" v-if="jurisdiction['servicesOperations:casartePriceManager:save']">从产品库选择</el-button>-->
      </el-col>
    </el-row>

    <el-table v-loading="loading" border :data="tableData" style="width: 100%;margin-top: 20px;">
      <el-table-column label="序号" width="80" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ (pageNo - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="sn_code" label="产品编码" width="120" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="sn_desc" label="产品型号" width="130" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="proname" label="产品大类" width="100" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="prolinecodename" label="二级分类" width="150" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="text_mark_flag" label="审核状态" width="100" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="price" label="产品供价（元）" width="130" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="createDate" label="创建时间" width="160" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="operateDate" label="更新时间" width="160" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column prop="operateBy" label="更新者" width="110" :show-overflow-tooltip="true"> </el-table-column>
      <el-table-column label="操作" min-width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-button
            type="text"
            v-if="scope.row.mark_flag == 0 && jurisdiction['servicesOperations:casartePriceManager:status']"
            @click="updateStatus(1, scope.row.id)"
            >设为有效</el-button
          >
          <el-button
            type="text"
            v-if="scope.row.mark_flag == 1 && jurisdiction['servicesOperations:casartePriceManager:status']"
            @click="updateStatus(0, scope.row.id)"
            >设为无效</el-button
          >
          <el-button
            type="text"
            @click="casarteMain(2, scope.row)"
            v-if="jurisdiction['servicesOperations:casartePriceManager:edit']"
            >修改</el-button
          >
          <!--<el-button type="text" @click="updateStatus(-1,scope.row.id)" v-if="jurisdiction['servicesOperations:casartePriceManager:del']">删除</el-button>-->
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

    <el-dialog
      class="carspromain"
      title="产品价格维护"
      :visible.sync="dialogVisible"
      size="small"
      :modal-append-to-body="false"
      :before-close="dialogClose"
    >
      <el-form ref="details" :model="details" label-width="100px">
        <el-form-item label="型号快查" class="promain-item xhkc" v-if="isMain == 0">
          <el-autocomplete
            v-model="modelNo"
            :trigger-on-focus="false"
            :fetch-suggestions="listShopInfo"
            placeholder="请输入型号关键字"
            @select="storeSelect"
            :props="{ value: 'mmt_material_descrition', label: 'mmt_material_descrition' }"
          >
          </el-autocomplete>
          （输入型号关键字）
        </el-form-item>
        <el-form-item label="产品编码" class="promain-item required">
          <el-input
            placeholder="请输入产品编码"
            v-model="details.sn_code"
            @blur="brandBlur"
            :disabled="isMain == 1 || isMain == 2"
            :maxlength="11"
            @input.native="details.sn_code = details.sn_code.replace(/\s+/g, '')"
          ></el-input>
        </el-form-item>
        <el-form-item label="产品型号" class="promain-item required">
          <el-input placeholder="根据产品编码自动检索" v-model="details.sn_desc" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="产品大类" class="promain-item required">
          <el-select placeholder="请选择产品大类" v-model="details.proname" @change="detailsPronameChange">
            <el-option
              v-for="item in oneDetailsOptions"
              :key="item.proname"
              :label="item.proname"
              :value="item.proname"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" class="promain-item required">
          <el-select placeholder="请选择二级分类" v-model="details.prolinecodename">
            <el-option v-for="item in twoDetailsOptions" :key="item" :label="item" :value="item"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品供价" class="promain-item required">
          <el-input
            placeholder="请输入产品供价"
            v-model="details.price"
            :maxlength="11"
            @input.native="priceInput"
          ></el-input
          >（元）
        </el-form-item>
      </el-form>
      <p class="parmain-que">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="detailsAdd">确 定</el-button>
      </p>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      jurisdiction: 'jurisdiction'
    })
  },
  name: 'casarteProductMaintain',
  data() {
    return {
      form: {
        sn_code: '',
        sn_desc: '',
        proname: '',
        prolinecodename: '',
        mark_flag: ''
      },
      examineOptions: [
        {
          id: '',
          value: '全部'
        },
        {
          id: 1,
          value: '有效'
        },
        {
          id: 0,
          value: '无效'
        }
      ],
      tableData: [],
      loading: false,
      pageNo: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false,
      oneOptions: [],
      twoOptions: ['全部'],
      isMain: '', // 新增0 ，选择1 ，修改2
      details: {
        sn_code: '',
        sn_desc: '',
        proname: '',
        prolinecodename: '',
        price: ''
      },
      oneDetailsOptions: [],
      twoDetailsOptions: [],
      modelNo: '',
      queryString: '',
      isNum: 0,
      isCx: true
    };
  },
  created(e) {},
  methods: {
    priceInput() {
      this.details.price = this.details.price.replace(/[^\d.]/g, ''); // 清除"数字"和"."以外的字符
      this.details.price = this.details.price.replace(/^\./g, ''); // 验证第一个字符是数字而不是
      this.details.price = this.details.price.replace(/\.{2,}/g, '.'); // 只保留第一个. 清除多余的
      this.details.price = this.details.price
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.');
      this.details.price = this.details.price.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); // 只能输入两个小数
    },
    dialogClose() {
      this.details = {
        sn_code: '',
        sn_desc: '',
        proname: '',
        prolinecodename: '',
        price: ''
      };
      this.dialogVisible = false;
    },
    storeSelect(item) {
      this.details.sn_code = item.mmt_material_code;
      this.details.sn_desc = item.mmt_material_descrition;
    },
    listShopInfo(queryString, cb) {
      const _this = this;
      const params = {
        modelNo: queryString || queryString == '' ? queryString : _this.queryString
      };
      this.requestService.getProductInfoByMdm(params).then((data) => {
        _this.queryString = queryString || queryString == '' ? queryString : _this.queryString;
        if (data.isSuccess) {
          cb(data.data.entities);
        } else {
          cb([]);
        }
      });
    },
    detailsAdd() {
      const _this = this;
      if (this.isMain == 0 || this.isMain == 1) {
        const data = JSON.parse(JSON.stringify(this.details));
        this.requestService.saveVipCasartePrice(data).then((data) => {
          if (data.isSuccess) {
            _this.dialogVisible = false;
            _this.queryMain();
          }
        });
      }
      if (this.isMain == 2) {
        const data = JSON.parse(JSON.stringify(this.details));
        this.requestService.updateVipCasartePrice(data).then((data) => {
          if (data.isSuccess) {
            _this.dialogVisible = false;
            _this.queryMain();
          }
        });
      }
    },
    brandBlur() {
      const _this = this;
      const data = {
        productCode: this.details.sn_code
      };
      this.modelNo = '';
      this.requestService.getProductDescByMdm(data).then((data) => {
        if (data.isSuccess) {
          _this.details.sn_desc = data.data.productDesc;
        }
      });
    },
    detailsPronameChange(e) {
      if (!(this.isMain == 2 && this.isNum == 0)) {
        this.details.prolinecodename = '';
      }
      for (const i in this.oneDetailsOptions) {
        if (e == this.oneDetailsOptions[i].proname) {
          this.twoDetailsOptions = this.oneDetailsOptions[i].prolinecodename;
        }
      }
      this.isNum++;
    },
    casarteMain(e, row) {
      this.isNum = 0;
      this.isMain = e;
      this.dialogVisible = true;
      this.twoDetailsOptions = [];
      this.modelNo = '';
      if (e == 2) {
        this.details = {
          id: row.id,
          sn_code: row.sn_code,
          sn_desc: row.sn_desc,
          proname: row.proname,
          prolinecodename: row.prolinecodename,
          price: row.price
        };
        for (const i in this.oneDetailsOptions) {
          if (this.details.proname == this.oneDetailsOptions[i].proname) {
            this.twoDetailsOptions = this.oneDetailsOptions[i].prolinecodename;
          }
        }
      } else {
        this.details = {
          sn_code: '',
          sn_desc: '',
          proname: '',
          prolinecodename: '',
          price: ''
        };
      }
    },
    updateStatus(e, id) {
      const _this = this;
      let msg = '';
      if (e == 0) {
        msg = '是否设为无效状态？';
      }
      if (e == 1) {
        msg = '是否设为有效状态？';
      }
      if (e == -1) {
        msg = '此操作将删除该数据，是否继续？';
      }
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const data = {
            status: e,
            id
          };
          this.requestService.updateStatus(data).then((data) => {
            if (data.isSuccess) {
              _this.queryMain();
            }
          });
        })
        .catch(() => {});
    },
    pronameChange(e) {
      const _this = this;
      this.twoOptions = [];
      this.form.prolinecodename = '全部';
      this.oneOptions.forEach((el) => {
        if (el.proname == e) {
          _this.twoOptions.push('全部');
          for (const i in el.prolinecodename) {
            _this.twoOptions.push(el.prolinecodename[i]);
          }
        }
      });
    },
    query() {
      this.pageNo = 1;
      this.queryMain();
    },
    firstQuery() {
      const _this = this;
      this.requestService.getDeptInfo().then((data) => {
        if (data.isSuccess) {
          if (!data.data.isIndustry) {
            _this.oneOptions.push({
              proname: '全部'
            });
          }
          data.data.data.forEach((el) => {
            _this.oneOptions.push(el);
          });
          _this.form.proname = _this.oneOptions[0].proname;
          _this.form.prolinecodename = '全部';
          _this.oneDetailsOptions = data.data.data;
          _this.tableData = [];
          const pret = JSON.parse(JSON.stringify(_this.form));
          pret.pageNo = _this.pageNo;
          pret.pageSize = _this.pageSize;
          _this.requestService.getPageVipCasartePrice(pret).then((data) => {
            if (data.isSuccess) {
              for (const i in data.data.entities) {
                if (data.data.entities[i].mark_flag == 1) {
                  data.data.entities[i].text_mark_flag = '有效';
                }
                if (data.data.entities[i].mark_flag == 0) {
                  data.data.entities[i].text_mark_flag = '无效';
                }
              }
              _this.tableData = data.data.entities;
              _this.total = data.data.entityCount;
            } else {
              _this.total = 0;
            }
          });
        }
      });
    },
    queryMain() {
      const _this = this;
      this.tableData = [];
      const data = JSON.parse(JSON.stringify(this.form));
      data.pageNo = this.pageNo;
      data.pageSize = this.pageSize;
      this.requestService.getPageVipCasartePrice(data).then((data) => {
        if (data.isSuccess) {
          for (const i in data.data.entities) {
            if (data.data.entities[i].mark_flag == 1) {
              data.data.entities[i].text_mark_flag = '有效';
            }
            if (data.data.entities[i].mark_flag == 0) {
              data.data.entities[i].text_mark_flag = '无效';
            }
          }
          _this.tableData = data.data.entities;
          _this.total = data.data.entityCount;
        } else {
          _this.total = 0;
        }
      });
    },
    handleSizeChange(pageSize) {
      this.pageNo = 1;
      this.pageSize = pageSize;
      if (this.tableData.length != 0) {
        this.queryMain();
      }
    },
    handleCurrentChange(pageNo) {
      this.pageNo = pageNo;
      if (this.tableData.length != 0) {
        this.queryMain();
      }
    }
  },
  mounted(e) {
    this.firstQuery();
  }
};
</script>

<style scoped>
.appealtitel {
  display: inline-block;
  width: 70px;
}
.promain-item {
  margin-bottom: 10px;
}
.promain-item .el-input,
.promain-item .el-select,
.promain-item .el-autocomplete {
  width: 280px;
}
.parmain-que {
  display: flex;
  justify-content: center;
}
.parmain-que .el-button {
  padding: 10px 30px;
}
.promain-p {
  height: 2px;
  background-color: #ef8416;
  margin-bottom: 15px;
}
.xhkc {
  color: #7070fc;
  font-weight: bold;
}
</style>
<style>
.carspromain .el-dialog--small {
  width: 552px;
}
.xhkc .el-form-item__label {
  color: #7070fc;
  font-weight: bold;
}
.xhkc .el-input__inner {
  border: 1px solid #7070fc;
  font-weight: normal;
}
.xhkc .el-input__inner:hover {
  border: 1px solid #7070fc;
}
</style>

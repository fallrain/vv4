<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand"><i></i>产品查询</p>
      <div class="clear"></div>
    </div>
    <div>
      <span>产品型号：</span>
      <el-input style="width: 300px;" v-model="productModelNo" placeholder="请输入产品型号"></el-input>
      <el-button type="primary" @click="query">搜索</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%;margin-top: 20px;" border>
      <el-table-column prop="pro_band" label="品牌" width="80"> </el-table-column>
      <el-table-column prop="mmt_material_descrition" label="型号" width="180"> </el-table-column>
      <el-table-column prop="mmt_material_code" label="型号编码" width="180"> </el-table-column>
      <el-table-column prop="mmt_department" label="产品大类" width="100"> </el-table-column>
      <el-table-column prop="mmt_row_id" label="产品组" width="180"> </el-table-column>
      <el-table-column prop="mmt_product_line_code" label="产品线编码" width="180"> </el-table-column>
      <el-table-column prop="bccprice" label="价格" width="180"> </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button type="text" @click="revisePrice(scope.row)" v-if="getUserInfo.brandName == 'haier'"
            >修改价格</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pageNo"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="sizes, prev, pager, next"
      :total="total"
    >
    </el-pagination>

    <el-dialog title="修改价格" :visible.sync="dialogVisible" size="tiny" :modal-append-to-body="false">
      <div>
        <span>价格：</span>
        <el-input
          :maxlength="10"
          style="width: 300px;"
          v-model="price"
          placeholder="请输入价格"
          @input.native="clearNoNum(this)"
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
        <el-button type="primary" @click="updateBccPrice">确 定</el-button>
      </span>
    </el-dialog>
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
    return {
      pageNo: 1,
      pageSize: 10,
      total: 0,
      productModelNo: '',
      tableData: [],
      dialogVisible: false,
      details: {},
      price: ''
    };
  },
  methods: {
    clearNoNum(e) {
      this.price = this.price.replace(/[^\d.]/g, ''); // 清除“数字”和“.”以外的字符
      this.price = this.price.replace(/\.{2,}/g, '.'); // 只保留第一个. 清除多余的
      this.price = this.price
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.');
      this.price = this.price.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); // 只能输入两个小数
      if (this.price.indexOf('.') < 0 && this.price != '') {
        // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        this.price = parseFloat(this.price);
      }
      if (this.price == 0) {
        this.price = '';
      }
    },
    handleSizeChange(pageSize) {
      if (this.tableData.length != 0) {
        this.pageNo = 1;
        this.pageSize = pageSize;
        this.query();
      }
    },
    handleCurrentChange(pageNo) {
      if (this.tableData.length != 0) {
        this.pageNo = pageNo;
        this.query();
      }
    },
    query() {
      const _this = this;
      const data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        productModelNo: this.productModelNo
      };
      this.requestReport.queryProduct(data).then((data) => {
        if (data.isSuccess) {
          _this.tableData = data.data.entities;
          _this.total = data.data.entityCount;
        } else {
          _this.tableData = [];
          _this.total = 0;
        }
      });
    },
    revisePrice(e) {
      this.details = e;
      this.price = e.bccprice;
      this.dialogVisible = true;
    },
    updateBccPrice() {
      const _this = this;
      const data = {
        productCode: this.details.mmt_material_code,
        mmt_department: this.details.mmt_department,
        price: this.price
      };
      this.requestReport.updateBccPrice(data).then((data) => {
        _this.query();
        _this.details = {};
        _this.dialogVisible = false;
      });
    }
  },
  mounted() {}
};
</script>

<style scoped></style>

<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand">
        <i></i>筛选
        <el-button type="primary" class="fr" @click="toDetail()">新建</el-button>
      </p>
      <div class="clear"></div>
    </div>
    <div>
      <el-form ref="form">
        <el-form-item>
          <el-select v-model="columnId" style="width: 300px;" @change="columnChange">
            <el-option label="家电优选" value="0"></el-option>
            <el-option label="企业咨询" value="1"></el-option>
            <el-option label="家电课堂" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="columnId == 2">
          <el-radio-group v-model="subColumnId" @change="typeChange">
            <el-radio label="0">常见故障及解决方法</el-radio>
            <el-radio label="1">小贴士</el-radio>
            <el-radio label="2">新技术</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="columnId == 1">
          <el-radio-group v-model="subColumnId" @change="typeChange">
            <el-radio label="3">推荐</el-radio>
            <el-radio label="4">热点</el-radio>
            <el-radio label="5">往期</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <div v-loading="msgListLoading">
      <el-table :data="msgListData.entities" style="width: 100%">
        <el-table-column prop="templateName" label="序号" width="50">
          <template slot-scope="scope">
            {{ (msgListData.pageNo - 1) * msgListData.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="title" label="文章标题" width="180" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="brief" label="简介" width="200" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="author" label="作者" width="150" show-overflow-tooltip> </el-table-column>
        <el-table-column label="PC模式">
          <template slot-scope="scope">
            <a href="javascript:;" class="color-link operation-btn" @click="view(scope.row)">查看</a>
          </template>
        </el-table-column>
        <el-table-column v-if="subColumnId != 1 && subColumnId != 2" label="手机模式">
          <template slot-scope="scope">
            <a href="javascript:;" class="color-link operation-btn" @click="qrcode(scope.row.id)">查看</a>
          </template>
        </el-table-column>
        <el-table-column v-if="columnId == 1" prop="status" label="是否推荐">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.type"
              on-color="#13ce66"
              off-color="#ff4949"
              :active-value="3"
              :inactive-value="6"
              @change="switchChange(scope.row.id, scope.row.type)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <a href="javascript:;" class="color-link operation-btn" @click="toDetail(scope.row.id)"
              ><i class="iconfont icon-xiugai"></i>修改</a
            >
            <a href="javascript:;" class="operation-btn" @click="deleteTpl(scope.row.id)"
              ><i class="iconfont icon-shanchu-copy"></i>删除</a
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

    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      size="large"
      :before-close="handleClose"
      :modal-append-to-body="false"
    >
      <el-form ref="form" label-width="100px">
        <el-form-item v-if="viewData.productCategoryName" label="产品大类">
          <div style="margin-left:20px;">
            {{ viewData.productCategoryName }}
          </div>
        </el-form-item>
        <el-form-item v-if="viewData.imageUrl" label="缩略图">
          <img :src="viewData.imageUrl" style="margin-left:20px;max-width:200px;max-height:200px;" />
        </el-form-item>
        <el-form-item label="文章内容">
          <div v-html="viewData.textContent" class="view-content" style="margin-left:20px;padding-right:30px;"></div>
        </el-form-item>
        <el-form-item v-if="viewData.productUrl" label="产品链接">
          <div style="margin-left:20px;">
            {{ viewData.productUrl }}
          </div>
        </el-form-item>
        <el-form-item v-if="viewData.label && viewData.label.length > 0" label="关联标签">
          <div style="margin-left:20px;">
            <el-tag v-for="tag in viewData.label" type="primary">{{ tag }}</el-tag>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title=""
      :visible.sync="qrcodeDialogVisible"
      size="tiny"
      :before-close="qrcodeHandleClose"
      :modal-append-to-body="false"
    >
      <img :src="qrcodeSrc" alt="" style="width:100%" />
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
      msgListData: [],
      pageNo: 1,
      msgListLoading: false,
      pageSize: 10,
      columnId: '0',
      subColumnId: '',
      dialogVisible: false,
      viewData: {},
      qrcodeDialogVisible: false,
      qrcodeSrc: ''
    };
  },
  methods: {
    // 企业咨询是否推荐
    switchChange(id, status) {
      const self = this;
      this.requestComplaint
        .updateCommend({
          id,
          status
        })
        .then((data) => {
          self.listSearch();
        });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    view(data) {
      this.viewData = JSON.parse(JSON.stringify(data));
      this.viewData.label = !this.viewData.label || this.viewData.label == '' ? [] : this.viewData.label.split(',');
      this.dialogVisible = true;
    },
    columnChange() {
      if (this.columnId == 2) {
        this.subColumnId = '0';
      } else if (this.columnId == 1) {
        this.subColumnId = '3';
      } else {
        this.subColumnId = '';
        this.pageNo = 1;
        this.listSearch();
      }
    },
    typeChange() {
      this.pageNo = 1;
      this.listSearch();
    },
    // 跳转模板详情
    toDetail(id) {
      this.$router.push({
        path: '/contents/addcontent',
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
          this.requestComplaint
            .contentDel({
              id
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
        columnId: self.columnId,
        subColumnId: self.subColumnId
      };

      this.msgListLoading = true;
      this.requestComplaint.listContentByColumnId(data).then((data) => {
        self.msgListData = data;
        self.msgListLoading = false;
      });
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
    },
    qrcode(id) {
      const self = this;
      const data = {
        id
      };

      this.requestComplaint.getQRCodeById(data).then((data) => {
        if (data.qrCode) {
          self.qrcodeSrc = data.qrCode;
          self.qrcodeDialogVisible = true;
        }
      });
    },
    qrcodeHandleClose() {
      this.qrcodeDialogVisible = false;
    }
  },
  mounted() {
    const self = this;
    this.listSearch();
    this.columnId = this.$route.query.column || '0';
    setTimeout(() => {
      self.subColumnId = self.$route.query.type || '';
      if (self.$route.query.column == 1 && self.$route.query.type == 6) {
        self.subColumnId = '4';
      }
    }, 500);
  }
};
</script>

<style scope>
.view-content img {
  max-width: 100%;
}
</style>

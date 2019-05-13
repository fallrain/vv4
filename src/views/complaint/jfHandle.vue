<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand">
        <i></i>套购积分处理
        <el-button type="primary" class="fr" @click="toDetail()">新建记录</el-button>
      </p>
      <div class="clear"></div>
    </div>
    <div v-loading="msgListLoading">
      <el-table :data="msgListData.entities" style="width: 100%" :row-class-name="listRowClass">
        <el-table-column align="center" prop="templateName" label="序号" width="50">
          <template slot-scope="scope">
            {{ (msgListData.pageNo - 1) * msgListData.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="userName" label="用户名"> </el-table-column>
        <el-table-column align="center" prop="mobile" label="手机号"> </el-table-column>
        <el-table-column align="center" prop="point" label="套购积分值"> </el-table-column>
        <el-table-column align="center" prop="crTime" label="处理日期" show-overflow-tooltip> </el-table-column>
        <el-table-column align="center" label="凭证文件下载">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.native="downAddPoint(scope.row.path)">下载</el-button>
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
      :before-close="handleClose"
      :modal-append-to-body="false"
      width="400px"
    >
      <el-form ref="form" :model="rightDetail" label-width="90px">
        <el-form-item label="banner图">
          <div>
            <img :src="rightDetail.imageUrl" alt="" style="max-width:100%" />
          </div>
        </el-form-item>
        <el-form-item label="链接地址">
          <a :href="rightDetail.url" target="_blank" class="color-link">{{ rightDetail.url }}</a>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
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
  data() {
    return {
      msgListData: [],
      pageNo: 1,
      msgListLoading: false,
      pageSize: 10,
      dialogVisible: false,
      rightDetail: '',
      columnId: '0'
    };
  },
  filters: {
    statusFilter(status) {
      switch (status) {
        case -1:
          return '删除';
          break;
        case 1:
          return '上架';
          break;
        case 2:
          return '下架';
          break;
        default:
          return status;
          break;
      }
    }
  },
  methods: {
    downAddPoint(e) {
      window.location.href = e;
    },
    columnChange() {
      this.listSearch();
    },
    switchChange(id, status) {
      const self = this;
      this.requestComplaint
        .updateStatus({
          id,
          status
        })
        .then((data) => {
          self.listSearch();
        });
    },
    listRowClass(row) {
      if (row.configFlag != 1) {
        return 'no-expand';
      }
    },
    // 跳转模板详情
    toDetail(id) {
      this.$router.push({
        path: '/complaint/addjfhandle',
        query: {
          id
        }
      });
    },
    listSearch() {
      const self = this;

      const data = {
        pageNo: self.pageNo,
        pageSize: self.pageSize
      };

      this.msgListLoading = true;
      this.requestComplaint.querytgPoint(data).then((data) => {
        self.msgListData = data;
        self.msgListLoading = false;
      });
    },
    handleIconClick() {
      this.pageNo = 1;
      this.listSearch();
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
    },
    // 弹层关闭
    handleClose() {
      this.dialogVisible = false;
    }
  },
  mounted() {
    this.listSearch();
  }
};
</script>

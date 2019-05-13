<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <el-button type="primary" @click="toDetail()">新建优惠券</el-button>
      <el-input
        placeholder="输入关键词检索"
        icon="search"
        v-model="rightsCardName"
        :on-icon-click="handleIconClick"
        @keyup.enter.native="handleIconClick"
        style="width: 300px"
        class="fr"
      >
      </el-input>
      <div class="clear"></div>
    </div>
    <div v-loading="msgListLoading">
      <el-table :data="msgListData.entities" style="width: 100%" :row-class-name="listRowClass">
        <el-table-column prop="templateName" label="序号" width="50">
          <template slot-scope="scope">
            {{ (msgListData.pageNo - 1) * msgListData.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="cardName" label="优惠券名称"> </el-table-column>
        <el-table-column prop="status" label="是否上架">
          <!-- <template slot-scope="scope">
                    {{scope.row.status | statusFilter}}
                </template> -->
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              on-color="#13ce66"
              off-color="#ff4949"
              :active-value="1"
              :inactive-value="2"
              @change="switchChange(scope.row.id, scope.row.status)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="configFlag" label="详情">
          <template slot-scope="scope">
            <a href="javascript:;" class="color-link" @click="review(scope.row)">查看</a>
          </template>
        </el-table-column>
        <el-table-column label="操作">
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
      size="small"
      :before-close="handleClose"
      :modal-append-to-body="false"
    >
      <el-form ref="form" :model="rightDetail" label-width="120px">
        <el-form-item label="优惠券图片">
          <img :src="rightDetail.imageUrl" alt="" style="max-height:200px" />
        </el-form-item>
        <el-form-item label="点击跳转链接">
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
      rightsCardName: '',
      dialogVisible: false,
      rightDetail: ''
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
    switchChange(id, status) {
      const self = this;
      this.requestComplaint
        .updateRightStatus({
          id,
          status
        })
        .then((data) => {
          self.listSearch();
        });
    },
    // 删除优惠券
    deleteTpl(id) {
      const self = this;
      this.$confirm('您确定要删除吗？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.requestComplaint
            .wechatRightCardDelete({
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
    listRowClass(row) {
      if (row.configFlag != 1) {
        return 'no-expand';
      }
    },
    // 跳转模板详情
    toDetail(id) {
      this.$router.push({
        path: '/rights/addrightscard',
        query: { id }
      });
    },
    listSearch() {
      const self = this;

      const data = {
        pageNo: self.pageNo,
        pageSize: self.pageSize,
        rightsCardName: self.rightsCardName
      };

      this.msgListLoading = true;
      this.requestComplaint.wechatRightsCardList(data).then((data) => {
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
    },
    // 查看活动详情
    review(detail) {
      this.rightDetail = detail;
      this.dialogVisible = true;
    }
  },
  mounted() {
    this.listSearch();
  }
};
</script>

<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <el-button type="primary" @click="toDetail()">新建权益</el-button>
      <el-input
        placeholder="输入关键词检索"
        icon="search"
        v-model="rightsName"
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
        <el-table-column prop="rightsName" label="权益名称"> </el-table-column>
        <el-table-column prop="brandName" label="品牌"> </el-table-column>
        <el-table-column prop="rankNames" label="所属等级" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="configFlag" label="详情">
          <template slot-scope="scope">
            <a href="javascript:;" class="color-link" @click="review(scope.row)">查看</a>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <a
              href="javascript:;"
              class="color-link operation-btn"
              @click="toDetail(scope.row.id)"
              v-if="jurisdiction['rightsOperations:weChatRightsManager:update']"
              ><i class="iconfont icon-xiugai"></i>修改</a
            >
            <a
              href="javascript:;"
              class="operation-btn"
              @click="deleteTpl(scope.row.id)"
              v-if="jurisdiction['rightsOperations:weChatRightsManager:delete']"
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
        <el-form-item label="权益亮图片">
          <img :src="rightDetail.imageUrl" alt="" style="max-height:200px" />
        </el-form-item>
        <el-form-item label="权益暗图片">
          <img :src="rightDetail.darkImageUrl" alt="" style="max-height:200px" />
        </el-form-item>
        <el-form-item label="权益介绍">
          <div class="rights-desc" v-html="rightDetail.rightsDesc"></div>
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
      templateType: '营销类',
      msgListData: [],
      pageNo: 1,
      msgListLoading: false,
      pageSize: 10,
      rightsName: '',
      dialogVisible: false,
      activityId: '',
      rightDetail: '',
      activityDialogVisible: false,
      activityInfo: {}
    };
  },
  filters: {
    fixNumFilter(fixNum) {
      if (fixNum > 0) {
        return '一次执行';
      }
      return '每日执行';
    },
    optionFilter(status) {
      switch (status) {
        case 1:
          return '暂停';
          break;
        case -3:
          return '开始';
          break;
        default:
          return 'status';
          break;
      }
    },
    flowFilter(status) {
      switch (status) {
        case 0:
          return '未配置';
          break;
        case 1:
          return '已配置';
          break;
        default:
          return status;
          break;
      }
    },
    excludeBlackListFilter(status) {
      status = status == 1 ? '是' : '否';
      return status;
    }
  },
  methods: {
    // 删除权益
    deleteTpl(id) {
      const self = this;
      this.$confirm('您确定要删除吗？', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.requestComplaint
            .wechatRightDelete({
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
        path: '/rights/editright',
        query: { id }
      });
    },

    listSearch() {
      const self = this;

      const data = {
        pageNo: self.pageNo,
        pageSize: self.pageSize,
        rightsName: self.rightsName
      };

      this.msgListLoading = true;
      this.requestComplaint.wechatRightsList(data).then((data) => {
        console.log(data);
        self.msgListData = data;
        self.msgListLoading = false;
        // $("#app-view").scrollTop(0);
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
<style>
.rights-desc img {
  max-width: 100%;
}
</style>

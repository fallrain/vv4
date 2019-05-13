<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand">
        筛选
        <el-button
          v-if="jurisdiction['rightsOperations:rightsStrategy:save']"
          type="primary"
          class="fr"
          @click="toDetail()"
          >新建</el-button
        >
      </p>
      <div class="clear"></div>
    </div>
    <div class="rights-filter">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="权益分类">
          <el-radio-group v-model="form.rightsType" @change="filterChange">
            <el-radio :label="0">不限</el-radio>
            <el-radio :label="1">内部权益</el-radio>
            <el-radio :label="2">外部权益</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="适用等级">
          <el-radio-group v-model="form.rankUseIds" @change="filterChange">
            <el-radio :label="0">不限</el-radio>
            <el-radio v-if="rank.rankName != '黑名单'" v-for="rank in memberRank" :label="rank.id">{{
              rank.rankName
            }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="权益状态">
          <el-radio-group v-model="form.status" @change="filterChange">
            <el-radio :label="0">不限</el-radio>
            <el-radio :label="1">使用中</el-radio>
            <el-radio :label="-2">已过期</el-radio>
            <el-radio :label="-3">已禁用</el-radio>
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
        <el-table-column prop="rightsName" label="权益名称" min-width="12%"> </el-table-column>
        <el-table-column prop="rightsType" label="权益分类" min-width="12%">
          <template slot-scope="scope">
            {{ scope.row.rightsType | rightsTypeFilter }}
          </template>
        </el-table-column>
        <el-table-column prop="rankUseIds" label="适用等级" min-width="12%" show-overflow-tooltip> </el-table-column>
        <!-- <el-table-column prop="groupName" label="适用分组" min-width="12%" show-overflow-tooltip> </el-table-column>  -->
        <el-table-column prop="time" label="有效期" min-width="12%" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="status" label="状态" min-width="10%">
          <template slot-scope="scope">
            <div>{{ scope.row.status | status }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="创建人" min-width="12%" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="crTime" label="创建时间" min-width="12%">
          <template slot-scope="scope">
            {{ gUtils.dateFormat(scope.row.crTime, 'yyyy-MM-dd') }}
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="18%">
          <template slot-scope="scope">
            <a
              v-if="jurisdiction['rightsOperations:rightsStrategy:edit']"
              href="javascript:;"
              class="color-link operation-btn"
              @click="toDetail(scope.row.id)"
              ><i class="iconfont icon-xiugai"></i>修改</a
            >
            <a
              v-if="jurisdiction['rightsOperations:rightsStrategy:edit']"
              href="javascript:;"
              class="operation-btn"
              @click="deleteTpl(scope.row.id)"
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
      templateType: '营销类',
      msgListData: [],
      pageNo: 1,
      msgListLoading: false,
      pageSize: 10,
      form: {
        rightsType: 0,
        rankUseIds: 0,
        status: 0
      },
      memberRank: []
    };
  },
  filters: {
    status(val) {
      let status = '';
      switch (val) {
        case 1:
          status = '启用';
          break;
        case 2:
          status = '禁用';
          break;
        case -1:
          status = '已过期';
          break;
        default:
          status = '';
      }
      return status;
    },
    rightsTypeFilter(val) {
      if (val == 1) {
        return '内部权益';
      }
      return '外部权益';
    }
  },
  methods: {
    filterChange() {
      this.listSearch();
    },
    // 跳转模板详情
    toDetail(id) {
      this.$router.push({
        path: '/rights/addright',
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
          this.requestCare
            .update({
              id,
              status: -1
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
        rightsType: self.form.rightsType == 0 ? '' : self.form.rightsType,
        rankUseIds: self.form.rankUseIds == 0 ? '' : self.form.rankUseIds,
        status: self.form.status == 0 ? '' : self.form.status
      };

      this.msgListLoading = true;
      this.requestCare.query(data).then((data) => {
        self.msgListData = data;
        self.msgListLoading = false;
      });
    },
    queryMemberRank() {
      const self = this;
      this.requestCare.queryMemberRank().then((data) => {
        self.memberRank = self.memberRank.concat(data);
      });
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
    }
  },
  mounted() {
    this.listSearch();
    this.queryMemberRank();
  }
};
</script>

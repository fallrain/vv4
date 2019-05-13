<template>
  <div class="vip-content">
    <div class="vip-head-tool">
      <p class="template-brand">
        <i></i>会员级别
        <el-button
          v-if="jurisdiction['strategyOperations:rankStrategy:save']"
          type="primary"
          @click="toDetail()"
          class="fr"
          >新建会员等级策略</el-button
        >
      </p>
      <div class="clear"></div>
    </div>
    <div v-loading="msgListLoading">
      <el-table :data="msgListData.entities" style="width: 100%">
        <el-table-column prop="templateName" label="序号" width="50">
          <template slot-scope="scope">
            {{ (msgListData.pageNo - 1) * msgListData.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="rankName" label="会员等级" min-width="28%"> </el-table-column>
        <el-table-column prop="integrationBrand" label="会员权益" min-width="28%">
          <template slot-scope="scope">
            {{ scope.row.vipRight }}
          </template>
        </el-table-column>
        <el-table-column prop="integrationBrand" labelstrategy="启用" min-width="28%">
          <template slot-scope="scope">
            <el-switch
              v-if="jurisdiction['strategyOperations:rankStrategy:edit']"
              v-model="scope.row.status"
              on-color="#13ce66"
              off-color="#ff4949"
              :active-value="1"
              :inactive-value="-3"
              @change="switchChange(scope.row.id, scope.row.brandName, scope.row.status)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="16%">
          <template slot-scope="scope">
            <a
              v-if="jurisdiction['strategyOperations:rankStrategy:edit']"
              href="javascript:;"
              class="operation-btn color-link"
              @click="toDetail(scope.row.id, scope.row.brandName)"
              ><i class="iconfont icon-xiugai"></i>修改</a
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
      strategyName: '',
      switchValue: '-1'
    };
  },
  filters: {
    propFilter(value, type) {
      value = parseInt(value) - 1;
      switch (type) {
        case 'platform':
          const platformArr = [
            '海贝商城',
            '二维码入口',
            '海尔消费金融',
            '海尔会员俱乐部',
            'SCRM',
            '新海贝商城',
            '创客实验室',
            '海尔优家'
          ];
          value = platformArr[value];
          break;
        case 'integrationBrand':
          const integrationBrandArr = ['海贝积分'];
          value = integrationBrandArr[value];
          break;
        case 'level':
          const levelArr = ['积分卡', '交互积分'];
          value = levelArr[value];
          break;
        case 'rule':
          const ruleArr = ['随机', '固定'];
          value = ruleArr[value];
          break;
      }
      return value;
    }
  },
  methods: {
    switchChange(id, brandName, status) {
      this.requestStrategy
        .rankChangeStatus({
          id,
          status
        })
        .then((data) => {
          // console.log(data)
        });
    },
    handleIconClick() {
      this.pageNo = 1;
      this.listSearch();
    },
    // 跳转模板详情
    toDetail(id, brandName) {
      const path = '/strategy/addrankstrategy';
      this.$router.push({
        path,
        query: { id, brandName }
      });
    },
    listSearch() {
      const self = this;

      const data = {
        pageNum: self.pageNo,
        pageSize: self.pageSize
      };

      this.msgListLoading = true;
      this.requestStrategy.rankQueryPageByBrand(data).then((data) => {
        self.msgListData = data;
        self.msgListLoading = false;
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
  }
};
</script>

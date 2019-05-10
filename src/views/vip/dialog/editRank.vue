<template>
  <div>
    <el-dialog
      title="修改会员等级"
      ref="userDialog"
      :visible.sync="display"
      :modal-append-to-body="false"
      @close="closeDialog"
    >
      <el-form ref="form" :model="rankForm" label-width="80px">
        <el-form-item label="等级">
          <el-select v-model="rankForm.rankId" placeholder="请选择会员等级" style="width: 300px;">
            <el-option v-for="rank in rankList" :label="rank.rankName" :value="rank.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="等级时间">
          <el-date-picker v-model="rankForm.dateRange" type="daterange" placeholder="选择日期范围" :editable="false">
          </el-date-picker>
        </el-form-item> -->
        <el-form-item>
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex';
import gUtils from '../../../utils/gUtils.js';

export default {
  props: ['dialogChange', 'form', 'random', 'dialogDisplay', 'closeDialog'],
  computed: {
    ...mapGetters({
      getUserInfo: 'getUserInfo'
    })
  },
  data() {
    return {
      searchName: '',
      msgListData: [],
      pageNo: 1,
      msgListLoading: false,
      pageSize: 10,
      selectedGroup: [],
      display: false,
      rankForm: {
        dateRange: [],
        rankId: ''
      },
      rankList: []
    };
  },
  mounted() {
    this.selectedGroup = [];
    this.display = this.dialogDisplay;
  },
  methods: {
    getRankList() {
      const self = this;
      this.requestVip
        .queryPageByBrandName({
          pageNum: 1,
          pageSize: 100,
          brandName: self.getUserInfo.brandName
        })
        .then((data) => {
          self.rankList = data.entities;
        });
    },
    save() {
      if (this.rankForm.rankId == '') {
        this.$message({
          message: '请选择会员等级',
          type: 'warning'
        });
        return false;
      }
      const self = this;
      const data = {
        userId: this.form,
        rankId: this.rankForm.rankId
        // startDate: gUtils.dateFormat(Date.parse(self.rankForm.dateRange[0]), 'yyyy-MM-dd'),
        // endDate: gUtils.dateFormat(Date.parse(self.rankForm.dateRange[1]), 'yyyy-MM-dd')
      };

      this.requestVip.setRankOfUser(data).then((data) => {
        if (data) {
          self.$message({
            message: data,
            type: 'success'
          });
          self.closeDialog();
          self.dialogChange();
        }
      });
    }
  },
  watch: {
    random() {
      // 每次打开清楚上次选择项
      this.getRankList();
    },
    dialogDisplay(curVal) {
      this.display = this.dialogDisplay;
    }
  }
};
</script>

<template>
  <div>
    <el-dialog
      title="Q&A问答"
      ref="userDialog"
      :visible.sync="dialogDisplay"
      custom-class="add-faqs"
      :modal-append-to-body="false"
      @close="dialogClose"
    >
      <el-form :model="customer" :rules="rules" ref="newUser" label-width="110px">
        <el-form-item label="分类" prop="category">
          <el-select v-model="customer.categoryId" placeholder="请选择" width="200" :disabled="isView">
            <el-option v-for="item in category" :key="item.id" :label="item.categoryName" :value="item.id"> </el-option>
          </el-select>
          <el-input
            class="input-new-category"
            v-if="inputVisible && !isView"
            v-model="inputValue"
            ref="saveTagInput"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
            style="200px"
          >
          </el-input>
          <el-button
            v-if="!inputVisible && !isView"
            class="button-new-tag"
            type="primary"
            @click="showInput"
            style="margin-left: 10px"
            >添加分类</el-button
          >
          <el-button v-if="inputVisible && !isView" class="button-new-tag" type="primary" @click="handleInputConfirm"
            >确定</el-button
          >
        </el-form-item>
        <el-form-item label="问" prop="question">
          <el-input v-model="customer.question" auto-complete="off" :disabled="isView"></el-input>
        </el-form-item>
        <el-form-item label="答" prop="answer">
          <el-input
            type="textarea"
            :rows="3"
            v-model="customer.answer"
            auto-complete="off"
            :disabled="isView"
          ></el-input>
        </el-form-item>
      </el-form>

      <span v-if="!isView" slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['data', 'random', 'display', 'jurisdiction', 'close', 'isView', 'refresh'],
  data() {
    const isNotEmpty = (rule, value, callback) => {
      if (!value || $.trim(value) == '') {
        return callback(new Error(''));
      }
      callback();
    };
    return {
      inputVisible: false,
      inputValue: '',
      dialogDisplay: false,
      customer: {
        question: '',
        answer: '',
        categoryId: ''
      },
      rules: {
        question: [
          {
            required: true, validator: isNotEmpty, message: '请输入问题', trigger: 'blur'
          },
          { max: 50, message: '长度不可超过50个字', trigger: 'blur' }
        ],
        answer: [
          {
            required: true, validator: isNotEmpty, message: '请输入答案', trigger: 'blur'
          },
          { max: 500, message: '长度不可超过500个字', trigger: 'blur' }
        ]
      },
      category: []
    };
  },
  methods: {
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      const self = this;
      if (this.inputValue != '') {
        const { inputValue } = this;

        // if (inputValue && $.inArray(inputValue, this.groupIdsAndEmails) < 0) {
        //   this.groupIdsAndEmails.push(inputValue)
        //   this.selectedgroupIdsAndEmails.push({
        //     id: inputValue,
        //     groupName: inputValue
        //   });
        //   this.recipient = JSON.parse(JSON.stringify(this.selectedgroupIdsAndEmails))
        // }

        self.requestService
          .addQACategory({
            qaCategoryList: [
              {
                categoryName: inputValue
              }
            ]
          })
          .then((data) => {
            if (data) {
              self.queryQACategory();
            }
          });

        this.inputVisible = false;
        this.inputValue = '';
      }
    },
    dialogClose() {
      this.close();
    },
    queryQACategory() {
      const self = this;
      self.requestService
        .queryQACategory({
          pageNo: 1,
          pageSize: 100
        })
        .then((data) => {
          if (data) {
            self.category = data.entities;
            if (self.customer.categoryId == '') {
              self.customer.categoryId = data.entities[0].id;
            }
          }
        });
    },
    save() {
      const self = this;
      this.$refs.newUser.validate((valid) => {
        if (valid) {
          if (self.customer.id) {
            self.requestService
              .updateQA({
                qaList: [
                  {
                    id: self.customer.id,
                    question: self.customer.question,
                    answer: self.customer.answer,
                    categoryId: self.customer.categoryId
                  }
                ]
              })
              .then((data) => {
                self.$message({
                  type: 'success',
                  message: '添加成功!'
                });
                self.close();
                self.refresh();
              });
          } else {
            self.requestService
              .addQA({
                qaList: [
                  {
                    question: self.customer.question,
                    answer: self.customer.answer,
                    categoryId: self.customer.categoryId
                  }
                ]
              })
              .then((data) => {
                self.$message({
                  type: 'success',
                  message: '添加成功!'
                });
                self.close();
                self.refresh();
              });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  mounted() {
    this.dialogDisplay = this.display;
    this.queryQACategory();
  },
  watch: {
    random(curValue) {
      this.customer = this.data;
      this.queryQACategory();
    },
    display(curValue) {
      this.dialogDisplay = curValue;
    }
  }
};
</script>

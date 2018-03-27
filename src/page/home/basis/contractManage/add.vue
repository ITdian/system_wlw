<template>
  <transition>
    <div v-if="show" class="page-add">
      <el-form :model="form" ref="form" label-width="140px" class="demo-form">
        <div class="tit">基本信息</div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同编号" required>
              <el-input v-model="form.name" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="签约日期" required>
              <el-date-picker
                v-model="time"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="客户名称" required>
          <el-select v-model="form.user" placeholder="请选择活动区域" :disabled="disabled">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-button type="text" v-if="!disabled">添加</el-button>
        </el-form-item>
        <el-form-item label="项目名称" required>
          <el-select v-model="form.user" placeholder="请选择活动区域" :disabled="disabled">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-button type="text" v-if="!disabled">添加</el-button>
        </el-form-item>
        <el-form-item label="合同原件">
          <el-upload
            v-if="!disabled"
            action=""
            :disabled="disabled"
            list-type="picture-card"
            :file-list="form.files"
            :http-request="handleAvatarSuccess"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <div v-else class="imgs">
            <img v-for="item in form.files" :src="item" alt=""/>
          </div>
        </el-form-item>

        <div class="tit">维保信息</div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="服务开始日期" required>
              <el-input v-model="form.name" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="保养类型" required>
              <el-input v-model="form.name" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="服务结束时间" required>
              <el-input v-model="form.name" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="每月保养次数" required>
              <el-input v-model="form.name" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同年限" required>
              <el-input v-model="form.name" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电梯台数" required>
              <el-input v-model="form.name" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="维保负责人" required>
              <el-select v-model="form.user" placeholder="请选择活动区域" :disabled="disabled">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
              <el-button type="text" v-if="type !== 'see'">添加</el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="tit">财务信息</div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同金额（元）" required>
              <el-input v-model="form.name" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="付款形式" required>
              <el-radio-group v-model="form.name" :disabled="disabled">
                <el-radio :label="1">月付</el-radio>
                <el-radio :label="2">季度付</el-radio>
                <el-radio :label="3">半年付</el-radio>
                <el-radio :label="4">年付</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="付款节点" required>
              <el-radio-group v-model="form.name" :disabled="disabled">
                <el-radio :label="1">上付</el-radio>
                <el-radio :label="2">下付</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="月保养金额" required>
              600.00元
            </el-form-item>
          </el-col>
        </el-row>

        <div class="tit">维保信息</div>
        <el-row>
          <el-col :span="12">
            <el-form-item label="备注" required>
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item v-if="!disabled">
          <el-button type="primary" @click="">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </transition>
</template>
<script>
  export default {
    props: {
      show: {
        required: true,
        default: false
      },
      type: {
        type: String,
        default: 'add',//add edit see
      }
    },
    data(){
      return {
        form: {
          name: null,
          user: null,
          files: [{
            name: 'xxx',
            url: 'xxxxxx'
          }],
          startTime: null,
          endTime: null,
        },
        time: null,
      }
    },
    computed:{
      typeText(){
        return this.type === 'add' ? '新增合同' : this.type === 'edit' ? '编辑合同' : '合同详情';
      },
      disabled(){
        return this.type === 'see'
      }
    },
    methods: {
      handleAvatarSuccess(res, file){

      },
      handleRemove(){

      }
    },
    watch:{
      show(newVal){
        if(newVal) {
          this.$store.commit('PUSHDIRECT',this.typeText)
        } else {
          this.$store.commit('POPDIRECT');
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .page-add {
    .tit {
      height: 56px;
      display: flex;
      align-items: center;
    }
    .imgs {
      width: 100%;
      display: flex;
      img {
        width: 148px;
        height: 148px;
        border: 1px solid;
        overflow: hidden;
        background-color: #fff;
        border: 1px solid #c0ccda;
        border-radius: 6px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin: 0 8px 8px 0;
        display: inline-block;
      }
    }
  }
</style>
<style lang="scss">
  .page-add {
    .el-form-item {
      &.flex {
        .el-form-item__content {
          display: flex;
        }
      }
      .el-button--text {
        margin-left: 10px;
      }
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }

</style>

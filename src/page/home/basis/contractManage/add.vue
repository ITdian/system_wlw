<template>
  <transition>
    <div v-if="show" class="page-add">
      <el-form :model="form" ref="form" label-width="120px" class="demo-form">
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同编号" required>
              <el-input v-model="form.name" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同类型" required>
              <el-input v-model="form.name" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="客户名称">
          <el-select v-model="form.user" placeholder="请选择活动区域" :disabled="disabled">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-button type="text" v-if="!disabled">添加</el-button>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="time"
            :disabled="disabled"
            type="daterange"
            range-separator="-"
            start-placeholder="签约日期"
            end-placeholder="结束日期">
          </el-date-picker>
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
        <el-row>
          <el-col :span="8">
            <el-form-item label="维保负责人" required>
              <el-input v-model="form.name" :disabled="disabled"></el-input>
              <el-button type="text" v-if="!disabled">添加</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="首次保养时间" required>
              <el-input v-model="form.name" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="项目名称" required>
              <el-input v-model="form.name" :disabled="disabled"></el-input>
              <el-button type="text" v-if="type !== 'see'">添加</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item v-if="!disabled">
          添加项目
        </el-form-item>
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
    .imgs {
      width: 100%;
      display: flex;
      img {
        width: 148px;
        height: 148px;
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
    .el-form-item__content {
      display: flex;
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

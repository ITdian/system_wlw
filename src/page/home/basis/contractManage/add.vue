<template>
  <transition>
    <div v-if="show" class="page-add">
      <el-form :model="form" ref="form" label-width="120px" class="demo-form">
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同编号" required>
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同类型" required>
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="客户名称">
          <el-select v-model="form.user" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="签约日期" required>
          <el-col :span="6">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.startTime" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.endTime"
                            style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="合同原件">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :http-request="handleAvatarSuccess">
            <img v-if="form.files" :src="files" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="维保负责人" required>
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="首次保养时间" required>
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="项目名称" required>
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          添加项目

        </el-form-item>
        <el-form-item>
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
        default: 'add',//add edit
      }
    },
    data(){
      return {
        form: {
          name:null,
          user:null,
          files:[],
          startTime:null,
          endTime:null,
        }
      }
    },
    methods: {
      handleAvatarSuccess(res, file){
        console.log(res)
        console.log(file)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .page-add {

  }
</style>
<style lang="scss">
  .page-add {
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

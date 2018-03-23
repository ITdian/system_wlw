<template>
  <transition>
    <div v-if="show" class="page-add">
      <el-form :model="form" ref="form" label-width="120px" class="demo-form">
        <el-row>
          <el-col :span="8">
            <el-form-item label="姓名" required>
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="手机号码" required>
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="性别" required>
              <el-radio-group v-model="form.name">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="年龄" required>
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="岗位" required>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in postOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="入行时间">
              <el-date-picker
                v-model="form.time"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="操作证">
              <el-upload
                class="upload-demo"
                drag
                action=""
                :http-request="uploadFile"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="备注">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
          time:null,
          startTime: null,
          endTime: null,
        },
        postOption:[
          {
            value:null,
            label:'维保经理',
          },
          {
            value:null,
            label:'维修工人',
          }
        ],
      }
    },
    computed:{
      typeText(){
        return this.type === 'add' ? '新增' : '';
      },
      disabled(){
        return this.type === 'see'
      }
    },
    methods: {
      handleAvatarSuccess(res, file){

      },
      handleRemove(){

      },
      uploadFile(file){

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

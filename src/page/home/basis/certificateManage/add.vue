<template>
  <transition>
    <div v-if="show" class="page-add">
      <el-form :model="form" ref="form" label-width="120px" class="demo-form">
        <div class="tit">基本参数</div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="电梯编号" required>
              <el-input v-model="form.name" size="medium" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="使用类型" required>
              <el-radio-group v-model="form.name" :disabled="disabled">
                <el-radio :label="1">别墅梯</el-radio>
                <el-radio :label="2">客梯</el-radio>
                <el-radio :label="3">货梯</el-radio>
                <el-radio :label="4">车库梯</el-radio>
                <el-radio :label="5">医用梯</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item class="flex" label="品牌" required>
              <el-input v-model="form.name" size="medium" :disabled="disabled"></el-input>
              <el-button type="text" v-if="!disabled">新增</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电梯类型" required>
              <el-radio-group v-model="form.name" :disabled="disabled">
                <el-radio :label="1">直梯</el-radio>
                <el-radio :label="2">扶梯</el-radio>
                <el-radio :label="3">自动人行道</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item class="flex" label="梯种" required>
              <el-input v-model="form.name" size="medium" :disabled="disabled"></el-input>
              <el-button type="text" v-if="!disabled">新增</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开门方式" required>
              <el-radio-group v-model="form.name" :disabled="disabled">
                <el-radio :label="1">左开</el-radio>
                <el-radio :label="2">中开</el-radio>
                <el-radio :label="3">右开</el-radio>
                <el-radio :label="4">双开</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="额定载量">
              <el-input v-model="form.name" size="medium" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="额定速度">
              <el-input v-model="form.name" size="medium" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="tit">维保信息</div>
        <el-row>
          <el-col :span="8">
            <el-form-item class="flex" label="所属项目" required>
              <el-input v-model="form.name" size="medium" :disabled="disabled"></el-input>
              <el-button type="text" v-if="!disabled">新增</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="首次保养时间" required>
              <el-date-picker
                :disabled="disabled"
                v-model="form.startTime"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="楼号" required>
              <el-input v-model="form.name" size="medium" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="下次年检日期" required>
              <el-date-picker
                :disabled="disabled"
                v-model="form.endTime"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="单元号" required>
              <el-input v-model="form.name" size="medium" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="楼层总数" required>
              <el-input v-model="form.name" size="medium" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="层站总数" required>
              <el-input v-model="form.name" size="medium" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="tit">物联信息</div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="终端编号" required>
              <el-input v-model="form.name" size="medium" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="端口号" required>
              <el-input v-model="form.name" size="medium" :disabled="disabled"></el-input>
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
          elevatorId:null,//电梯编号
          useType:null,//使用类型（1：别墅梯 2：客梯 3：货梯 4：车库梯 5：医用梯 ）
          brandId:null,//品牌
          type:null,//电梯类型（1：直梯 2：扶梯 3：自动人行道）
          elevatorTypeId:null,//梯种
          openType:null,//开门方式（1：左开 2：中开 3：右开 4：双开）
          ratedLoad:null,//额定载量
          ratedSpeed:null,//额定速度
          //所属项目？
          startTime:null,//首次保养时间？
          endTime:null,//下次年检时间？

          elevatorNum:null,//梯号
          //单元号？
          //楼层总数？
          //层站总数？
          deviceNum:null,//终端编号
          devicePort :null,//端口号
        },
        time: null,
      }
    },
    computed:{
      typeText(){
        return this.type === 'add' ? '新增电梯' : '电梯详情';
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

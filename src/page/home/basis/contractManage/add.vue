<template>
  <transition>
    <div v-if="show" class="page-add">
      <el-form :model="form" ref="form" label-width="140px" class="demo-form">
        <div class="tit">基本信息</div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同编号" required>
              <el-input v-model="form.contractNum" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="签约日期" required>
              <el-date-picker
                v-model="form.signDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="客户名称" required>
          <el-select
            v-model="form.propCompanyId"
            filterable
            remote
            reserve-keyword
            placeholder="选择客户"
            :remote-method="userSearchAsync"
            :loading="selectLoading">
            <el-option
              v-for="item in userOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="text" v-if="!disabled">添加</el-button>
        </el-form-item>
        <el-form-item label="项目名称" required>
          <el-select
            v-model="form.projectSet"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请选择项目"
            :remote-method="projectSearchAsync"
            :loading="selectLoading">
            <el-option
              v-for="item in projectOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="text" v-if="!disabled">添加</el-button>
        </el-form-item>
        <el-form-item label="合同原件">
          <el-upload
            v-if="!disabled"
            action=""
            :disabled="disabled"
            list-type="picture-card"
            :file-list="files"
            :http-request="handleAvatarSuccess"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <div v-else class="imgs">
            <img v-for="item in form.contractPath" :src="item" alt=""/>
          </div>
        </el-form-item>

        <div class="tit">维保信息</div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="服务开始日期" required>
              <el-date-picker
                v-model="form.startDate"
                type="date"
                value-format="timestamp"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务结束日期" required>
              <el-date-picker
                v-model="form.endDate"
                type="date"
                value-format="timestamp"
                @change="endTimeChange"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="保养类型" required>
              <el-select v-model="form.maintenanceMode"
                         :disabled="disabled"
                         placeholder="请选择">
                <el-option
                  v-for="item in typeOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="flex" label="保养周期" required>
              <el-input v-model="form.intervalTime" :disabled="disabled">
                <template slot="append">天</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同年限" required>
              <span>{{serviceAllTime}}月</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电梯台数" required>
              <el-input v-model="form.elevatorsNum" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="维保负责人" required>
              <el-select
                v-model="form.mainUserId"
                filterable
                remote
                reserve-keyword
                placeholder="请选择职工"
                :remote-method="employeeSearchAsync"
                :loading="selectLoading">
                <el-option
                  v-for="item in employeeOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-button type="text" v-if="type !== 'see'">添加</el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="tit">财务信息</div>
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同金额（元）">
              <el-input v-model="form.amount" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="付款形式" required>
              <el-radio-group v-model="form.payType" :disabled="disabled">
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
              <el-radio-group v-model="form.paymentNodeType" :disabled="disabled">
                <el-radio :label="0">上付</el-radio>
                <el-radio :label="1">下付</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="月保养金额">
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
  import {contractHttpUrl as httpUrl} from '../httpUrl';
  import {send as upLoad,getUri as downLoad} from '@/utils/oss';
  export default {
    props: {
      show: {
        required: true,
        default: false
      },
      type: {
        type: String,
        default: 'add',//add edit see
      },
      info:{},
      id:[String,Number]
    },
    data(){
      return {
        detail:null,
        selectLoading:false,
        userOption:[],//客户名称 下拉数据
        projectOption:[],//项目名称 下拉数据
        employeeOption:[],//维保人员 下拉数据
        typeOption:[
          {label:'全包',value:2},
          {label:'半包',value:1},
          {label:'清包',value:3},
        ],//保养类型 下拉数据
        serviceTime:null,
        files: [
//          {
//            name: 'xxx',
//            url: 'xxxxxx'
//          }
        ],
        form: {
          contractNum :null,//合同编号
          signDate:null,//签约日期
          projectSet:null,//项目名称
          contractPath:[],//合同文件地址//合同原件

          startDate: new Date().getTime(),//服务开始日期
          endDate: new Date(new Date().getTime() + 31536000000).getTime(),//服务结束时间
          maintenanceMode:null,//保养类型 1：半包 2：全包 3：清包 ,

          intervalTime:null,//保养间隔时间
          elevatorsNum:null,//电梯台数
          //维保负责人
          mainUserId:null,
          mainUserName:null,
          mainUserPhone:null,

          amount:null,//合同金额
          payType:null,//付款形式 1：月付 2：季度付 3：半年付 4：年付
          paymentNodeType:null,//付款节点 0上付 1下付
          perMonthAmount:null,//月保养金额

          remark:null,//备注

        },
        searchTimer: null,
      }
    },
    computed:{
      typeText(){
        return this.type === 'add' ? '新增合同' : this.type === 'edit' ? '编辑合同' : '合同详情';
      },
      disabled(){
        return this.type === 'see'
      },
      serviceAllTime(){
        if (this.form.startDate && this.form.endDate && this.form.endDate > this.form.startDate) {
          let start = new Date(this.form.startDate),end = new Date(this.form.endDate);
          return (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth()
        }
        return 0;
      }

    },
    methods: {
      /**
       * @description 上传合同成功
       * @param file
       */
      handleAvatarSuccess(file){
        let _this = this;
        upLoad(file,key => {
          _this.contractPath.push(key);
        })
      },
      /**
       * @description 删除合同
       */
      handleRemove(){

      },
      /**
       * @description 获取详情数据
       */
      get(){
        this.$xttp.get(`${contractHttpUrl.detail}/${this.info.id}/detail`)
          .then(res => {
            if(!res['errorCode']) {
              this.detail = res['data'];
            }
        });
      },
      /**
       * @description 检索客户
       * @param queryString
       */
      userSearchAsync(queryString){
        clearTimeout(this.searchTimer);
        if (queryString.trim() === '') {
          return false;
        }
        this.selectLoading = true;
        this.searchTimer = setTimeout(() => {
          this.$xttp.post(httpUrl.searchCus,{
            name:queryString,
            page:1,
            size:10,
          }).then(res => {
            if (!res['errorCode']) {
              res['data'].records.forEach(val => {
                this.userOption.push({label:val.name,value:val.id,})
              });
            }
            this.selectLoading = false;
          })
        }, 500);
      },
      /**
       * @description 检索项目名称
       * @param queryString
       */
      projectSearchAsync(queryString){
        clearTimeout(this.searchTimer);
        if (queryString.trim() === '') {
          return false;
        }
        this.selectLoading = true;
        this.searchTimer = setTimeout(() => {
          this.$xttp.post(httpUrl.searchProject,{
            houseName:queryString,
            page:1,
            size:10,
          }).then(res => {
            if (!res['errorCode']) {
              res['data'].records.forEach(val => {
                this.projectOption.push({label:val.houseName,value:val.id,})
              });
            }
            this.selectLoading = false;
          })
          this.selectLoading = false;
        }, 500);
      },
      /**
       * @description 检索 维保人员
       * @param queryString
       */
      employeeSearchAsync(queryString){
        clearTimeout(this.searchTimer);
        if (queryString.trim() === '') {
          return false;
        }
        this.selectLoading = true;
        this.searchTimer = setTimeout(() => {
          this.$xttp.post(httpUrl.searchEmployee,{
            userName:queryString,
            page:1,
            size:10,
          }).then(res => {
            if (!res['errorCode']) {
              res['data'].records.forEach(val => {
                this.employeeOption.push({label:val.userName,value:val.userId,})
              });
            }
            this.selectLoading = false;
          })
          this.selectLoading = false;
        }, 500);
      },
      endTimeChange(val){
        if (val && val < this.form.startDate) {
          this.$message.warning('结束时间必须大于开始时间');
        }
      },
      selectBlur(){
        this.userOption = [];
        this.projectOption = [];
        this.employeeOption = [];
      },
    },
    watch:{
      show(newVal){
        if(newVal) {
          this.$store.commit('PUSHDIRECT',this.typeText);
          if (this.type === 'see' && this.info.id) {
            this.get()
          }
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

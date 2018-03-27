<template>
  <transition>
    <div v-if="show" class="page-add">
      <div class="title_message">基本信息</div>
      <el-form :model="form" ref="form" label-width="120px" class="demo-form" >
        <el-row>
          <el-col :span="8">
            <el-form-item label="合同编号" required :inline="true">
              <el-input v-model="form.name" :disabled="disabled" style="width:90%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :inline="true">
            <el-form-item label="合同类型" required>
             <!--  <el-input v-model="form.name" ></el-input> -->
              <el-select v-model="form.ProjectTypeVaule" placeholder="请选择类型">
                  <el-option
                    v-for="(item,indexs) in projectType" :key='indexs'
                     :label="item.label"
                    :value="item.label">
                  </el-option>
               </el-select>
            </el-form-item>
          </el-col>
        </el-row>
       
	        <el-form-item label="电梯数" >
				 <el-input v-model="form.name"  width="80px" placeholder="请输入电梯数" style="width:24%;"></el-input>  
			 </el-form-item>   
	        
       
        <el-form-item label="项目区域">
           <el-select v-model="form.addressValue" placeholder="请选择省" @change="addressChange()">
                  <el-option
                    v-for="(item,indexs) in addressData" :key='indexs'
                     :label="item.name"
                    :value="item.name">
                  </el-option>
             </el-select>

             <el-select v-model="form.cityValue" placeholder="请选择市" style="margin:0 5px;" @change="cityChange()">
                  <el-option
                    v-for="(item,indexs) in cityList" :key='indexs'
                     :label="item.name"
                    :value="item.name">
                  </el-option>
             </el-select>

             <el-select v-model="form.areaValue" placeholder="请选择区">
                  <el-option
                    v-for="(item,indexs) in areaList" :key='indexs'
                     :label="item"
                    :value="item">
                  </el-option>
             </el-select>
            
        </el-form-item>
        <el-form-item label="详细地址" required :inline="true">
              <el-input v-model="form.name" :disabled="disabled" style="width:90%;"></el-input>
         </el-form-item>
        <!-- <el-form-item label="合同原件">
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
        </el-form-item> -->

        <div class="title_message">维保信息</div>
        <el-row>
        	<el-form-item label="客户名称" required>
	           <el-select v-model="form.areaValue" placeholder="请选择区" requried>
	                  <el-option
	                    v-for="(item,indexs) in areaList" :key='indexs'
	                     :label="item"
	                    :value="item">
	                  </el-option>
	             </el-select>
         	</el-form-item>
        </el-row>
        <el-row>
        	<el-form-item label="客户名称" required>
	           <el-select v-model="form.areaValue" placeholder="请选择区">
	                  <el-option
	                    v-for="(item,indexs) in areaList" :key='indexs'
	                     :label="item"
	                    :value="item">
	                  </el-option>
	             </el-select>
	         </el-form-item>
        </el-row>
        
        <el-form-item v-if="!disabled">
          <el-button type="primary" @click="">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </transition>
</template>
<script>
import addressDatas from  '@/utils/addressData'
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
          ProjectTypeVaule:null,
          user: null,
          addressValue:'',//省
          cityValue:'',//市
          areaValue:'',//区
          files: [{
            name: 'xxx',
            url: 'xxxxxx'
          }],
          startTime: null,
          endTime: null,
        },
        time: null,
        projectType:[{value:'选项1',label:'住宅楼'},{value:'选项2',label:'写字楼'},{value:'选项3',label:'医院'},{value:'选项4',label:'学校'},{value:'选项5',label: '商场'}],

        addressData:addressDatas,//省份
       
   
        cityList:[],
        areaList:[],//区
       
      }
    },
    computed:{
      typeText(){
        return this.type === 'add' ? '新增项目' : this.type === 'edit' ? '编辑项目' : '项目详情';
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
      //选择省份
      addressChange(){
        for(let x = 0 ; x <this.addressData.length;x++){
        	
          if(this.addressData[x].name==this.form.addressValue){
          	console.log(1,this.addressData[x].name,2,this.form.addressValue)
               Object.assign({},this.areaList);
                Object.assign({},this.cityList);
                this.form.cityValue='';
                this.form.areaValue='';
                console.log(this.addressData[x])
              Object.assign(this.cityList,this.addressData[x].city)
             console.log(this.cityList)

          }

        }
      },
      //选择城市
      cityChange(){
          for(let x = 0; x <this.cityList.length;x++){
            console.log(this.cityList[x])
            if(this.cityList[x].name==this.form.cityValue){
              this.areaList=[]
              this.form.areaValue='';
               Object.assign(this.areaList,this.cityList[x].area)
               console.log(this.areaList)
            }
          }
      },
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
.title_message{
	height:30px;
}
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

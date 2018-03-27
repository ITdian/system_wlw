<template>
  <el-main>
    <my-direct @click="handleDirectClick"></my-direct>
    <add :show="tabIndex != 0"></add>
    <div v-show="tabIndex === 0" class="page-list">
      <div class="c-search">
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <!-- 省份 -->
           <el-select v-model="addressValue" placeholder="请选择省份" @change="addressChange()">
            <el-option
              v-for="(item,key) in addressData"
              :key="key"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
          <!-- 城市 -->
           <el-select v-model="cityValue" placeholder="请选择城市" @change="cityChange()">
            <el-option
              v-for="(items,keys) in cityList"
              :key="keys"
              :label="items.name"
              :value="items.name">
            </el-option>
          </el-select>
          <!-- 区 -->
          <el-select v-model="areaValue" placeholder="请选择区域">
            <el-option
              v-for="(itema,keya) in areaList"
              :key="keya"
              :label="itema"
              :value="itema">
            </el-option>
          </el-select>
          <!-- 选择物业 -->
          <el-select v-model="customerValue" placeholder="请选择客户">
            <el-option
              v-for="(itema,keya) in customerList"
              :key="itema"
              :label="itema"
              :value="itema">
            </el-option>
          </el-select>
          <!-- 项目名称 -->
          <el-input v-model="inputProjectName" placeholder="项目名称"></el-input>

          <el-form-item>
            <el-button type="primary" @click="find"><i class="iconfont icon-sousuo">&nbsp;</i>查询</el-button>
          </el-form-item>

        </el-form>
        <el-button type="primary" class="c-outBtn">导出</el-button>
        <el-button type="primary" class="c-addBtn" @click="add">新增</el-button>

      </div>
      <el-table :data="list" style="width: 100%" v-loading="loading" @selection-change="handleSelectionChange" tooltip-effect="dark">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="项目名称" :show-overflow-tooltip="true" width="110" align="center">
          <template slot-scope="scope">{{scope.row.houseName}}</template>
        </el-table-column>
        <el-table-column label="客户名称" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">{{ scope.row.propName }}</template>
        </el-table-column>

        <el-table-column label="关联合同" :show-overflow-tooltip="true" align="center" width="100">
          <template slot-scope="scope" style="color:blue;">{{ scope.row.contractNum }}</template>
        </el-table-column>

        <el-table-column label="项目类型" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">{{ scope.row.typeName }}</template>
        </el-table-column>

        <el-table-column label="项目区域" :show-overflow-tooltip="true" align="center" width="80">
          <template slot-scope="scope">{{ scope.row.area }}</template>
        </el-table-column>

        <el-table-column label="详细地址" :show-overflow-tooltip="true" align="center" width="260">
          <template slot-scope="scope">{{ scope.row.province+scope.row.city+scope.row.area+scope.row.address}}</template>
        </el-table-column>

        <el-table-column label="电梯数" :show-overflow-tooltip="true" align="center" width="80">
          <template slot-scope="scope">{{ scope.row.elevatorNumber }}</template>
        </el-table-column>

        <el-table-column label="在保电梯数" :show-overflow-tooltip="true" align="center" width="100">
          <template slot-scope="scope">{{ scope.row.paulNumber }}</template>
        </el-table-column>

        <el-table-column label="维保负责人" :show-overflow-tooltip="true" align="center" width="100">
          <template slot-scope="scope">{{ scope.row.principal==null?"无":scope.row.principal.name}}</template>
        </el-table-column>

        <el-table-column label="开始时间" :show-overflow-tooltip="true" align="center" width="170">
          <template slot-scope="scope">{{ scope.row.startDate }}</template>
        </el-table-column>

        <el-table-column label="结束时间" :show-overflow-tooltip="true" align="center" width="170">
          <template slot-scope="scope">{{ scope.row.endDate }}</template>
        </el-table-column>

        <el-table-column label="操作" width="270" fixed="right">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="primary" size="small">管理电梯</el-button>
            <el-button @click="edit(scope.row)" type="primary" size="small">管理班组  </el-button>
            <el-button @click="edit(scope.row)" type="primary" size="small">更多</el-button>
          </template>
        </el-table-column>
      </el-table> 
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="size"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    
  </el-main>
</template>
<script>
  import {projectHttpUrl} from '../httpUrl';
  import myDirect from '@/components/direct';
  import addressDatas from  '@/utils/addressData'
  import add from '@/page/home/basis/projectManage/add'
  console.log(add)
  export default {
    name: 'contractManage',
    components: {myDirect,add},
    data(){
      return {
        tab:['','新增合同','编辑合同'],
        tabIndex:0,
        list:[],
        form: {
          name: ''
        },
        currentPage: 1,//当前页码
        total: 1,//总数
        size: 10,//总页数
        loading: false,//列表加载loading
        examineDialog:false,//查看
        addressData:addressDatas,//省份
        addressValue:'',//
        cityValue:'',//城市
        cityList:[],
        areaList:[],//区
        areaValue:'',
        customerList:['全部客户','广州复兴物业'],
        customerValue:'',
        inputProjectName:'',

         multipleSelection: [],
      }
    },
    watch:{
      // tabIndex(newVal){
      //   if (newVal > 0) {
      //     this.$store.commit('PUSHDIRECT',this.tab[this.tabIndex])
      //   } else {
      //     this.$store.commit('POPDIRECT');
      //   }
      // }
    },
    methods: {
      /**
       * @description 新增
       */
      add(){
        this.tabIndex = 1;
      },
      /**
       * @description 查找
       */
      find(){
        let sendDataList={}
        sendDataList={
          area:this.areaValue,
          city:this.cityValue,//城市
          province:this.addressValue,//区域
          propName:this.customerValue,
          houseName:this.inputProjectName//项目名
        }
        this.get(sendDataList)
      },
      /**
       * @description 编辑
       * @param row 行数据
       */
      edit(row){

      },
      //选择条目
       handleSelectionChange(val) {

              // this.multipleSelection = val;
              console.log(val)
      },
      //选择省份
      addressChange(){
        for(let x = 0 ; x <this.addressData.length;x++){
          if(this.addressData[x].name==this.addressValue){
               Object.assign({},this.areaList);
                Object.assign({},this.cityList);
                this.cityValue='';
                this.areaValue='';
              Object.assign(this.cityList,this.addressData[x].city)
             console.log(this.areaList)

          }

        }
      },
      //选择城市
      cityChange(){
          for(let x = 0; x <this.cityList.length;x++){
            console.log(this.cityList[x])
            if(this.cityList[x].name==this.cityValue){
              this.areaList=[]
              this.areaValue='';
               Object.assign(this.areaList,this.cityList[x].area)
               console.log(this.areaList)
            }
          }
      },
      /**
       * @description 换页
       * @param currentPage
       */
      handleCurrentChange(currentPage){
        this.currentPage = currentPage;
        this.get();
      },
      handleClose(){
        this.examineDialog = false;
      },
      handleDirectClick(){
        this.tabIndex = 0;
      },
      async get(op = {}){
        this.$xttp.post(projectHttpUrl.list,Object.assign({
          page:this.currentPage,
          size:this.size,
        },op)).then(res=>{
          console.log(res)    
          if (!res.errorCode) {

            this.list = res['data'].records;
            // Object.assign(this.list,res.data.records)
            console.log(this.list)
            this.total = res['data'].total;
          }
        })
      }
    },
    mounted(){
        this.get({})
    }
  }
</script>
<style lang="scss" scoped>
  .c-search {
    position: relative;
    width: 100%;
    .c-addBtn {
      position: absolute;
      right: 0px;
      top: 0px;
    }
    .c-outBtn{
     margin-bottom:10px;
    }
  }
  .page-list {
    width: 100%;
    height: 100%;
  }
</style>

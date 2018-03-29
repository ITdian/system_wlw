<template>
  <el-main>
    <my-direct @click="handleDirectClick"></my-direct>
    <!-- 添加模块 -->
    <add :show="tabIndex" @accessSave="addHidden()"></add>
    <!-- 详情模块 -->
    <detailMessage :show="tabIndexDetail" :detailId="detailId" :showList="showDetailList" @detailBack="detaiHidden()"></detailMessage>
    <!-- 合同详情 -->
    <div v-if="tabIndex === 0 && tabIndexDetail==0" class="page-list">
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
          <el-autocomplete v-if="false" v-model="inputProjectName" :fetch-suggestions="querySearchAsync"  placeholder="请输入内容" @select="handleSelect"></el-autocomplete

          <el-form-item>
            <el-button type="primary" @click="find"><i class="iconfont icon-sousuo">&nbsp;</i>查询</el-button>
          </el-form-item>

        </el-form>
        <exportExcel  :detailData="detailDatas" :headerTitle="headerTitles" :filterName="filterNames"></exportExcel>
        <!-- <el-button type="primary" class="c-outBtn" @click="exportList">导出</el-button> -->
        <el-button type="primary" class="c-addBtn" @click="add">新增</el-button>

      </div>
      <el-table :data="list" style="width: 100%" v-loading="loading" @selection-change="handleSelectionChange" tooltip-effect="dark" >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="项目名称" :show-overflow-tooltip="true" width="110" align="center">
          <el-button type="text" slot-scope="scope" style="color:black;" @click="detailShow(scope.row)">{{scope.row.houseName}}</el-button>
        </el-table-column>
        <el-table-column label="客户名称" :show-overflow-tooltip="true" align="center" >
          <template slot-scope="scope"  >{{ scope.row.propName }}</template>
        </el-table-column>

        <el-table-column label="关联合同" :show-overflow-tooltip="true" align="center" width="100" >
          <el-button slot-scope="scope" type="text" style="color:blue;" @click="cpmtractLink(scope.row)">{{ scope.row.contractNum }}</el-button>
        </el-table-column>

        <el-table-column label="项目类型" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope" >{{ scope.row.typeName }}</template>
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
            <el-button @click="detailShow(scope.row)" type="primary" size="small">更多</el-button>
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
  import add from '@/page/home/basis/projectManage/add'//添加
  import exportExcel from '@/components/exportExcel'//导出
  import detailMessage from '@/page/home/basis/projectManage/detail'//详情
 
  export default {
    name: 'contractManage',
    components: {myDirect, add, exportExcel, detailMessage},
    data(){
      return {
        //导出插件
        headerTitles:["项目名称","客户名称","关联合同","项目类型","项目区域","详细地址","电梯数","在保电梯数","开始时间","结束时间"],
        detailDatas:[],
        filterNames:["houseName","propName","propId","typeName","province","addressDetail","elevatorNumber","paulNumber","startDate","endDate"],

        tab:['','新增合同','编辑合同'],
        tabIndexDetail:0,
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

         multipleSelection:[],
         //导出信息
         exportMessae:{
            area: "宁远县",
             city: "永州市",
             endTime: 0,
             houseName: "项目名字1",
             page: 1,
             propName: "客户0",
             province: "湖南省",
             size: 10,
             startTime: 0
         },
         restaurants:[],
         timeout:null,
         //显示详情ID
         detailId:'',
         showDetailList:{},
      }
    },
    watch:{
    },
    methods: {
      //隐藏详情
      detaiHidden(){
        this.tabIndexDetail=0;
      },
      //点击查看详情
      detailShow(rowval){
        console.log(rowval)
        
        this.detailId=rowval.id;
        //获取详情后台数据
      
        this.$xttp.get(projectHttpUrl.detail+this.detailId+'/detail').then(res=>{
          if(res.errorCode==0){
            Object.assign(this.showDetailList,res.data)
            if(this.showDetailList.length!=0){
              this.tabIndexDetail=2;
            }
          }
          
        })
      
      
        console.log(this.detailId)
      },
      //关联合同
      cpmtractLink(rowval){
        console.log(rowval)
      },
      //输入筛选
      loadAll() {
        
        // console.log(this.list)
         return this.list
        console.log(this.list)
      },
      querySearchAsync(queryString, cb) {
              var restaurants = this.restaurants;
              var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

              clearTimeout(this.timeout);
              this.timeout = setTimeout(() => {
                cb(results);
              }, 3000 * Math.random());
       },
       createStateFilter(queryString) {
               return (state) => {
                console.log(state)
                 return (state.propName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
               };
             },
       handleSelect(item) {
               console.log(item);
       },
       //导出（不用）
      exportList(){
        //后台接口
        // this.$xttp.post(projectHttpUrl.export,this.exportMessae).then(res=>{
        //   console.log(res)
        // })

      },
      addHidden(val){
        this.tabIndex =0;

      },
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
      //选择条目选择并对数据进行帅选导出
       handleSelectionChange(val) {
               let value=[];
               this.detailDatas=[];
              //遍历数组，添加所需要的字段
              for(let x = 0 ;x <val.length;x++){
                val[x].addressDetail=val[x].province+val[x].city+val[x].city+val[x].area+val[x].address
              }
              Object.assign(this.detailDatas,val)
            
              
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
            

          }

        }
      },
      //选择城市
      cityChange(){
          for(let x = 0; x <this.cityList.length;x++){
           
            if(this.cityList[x].name==this.cityValue){
              this.areaList=[]
              this.areaValue='';
               Object.assign(this.areaList,this.cityList[x].area)
              
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

        this.tabIndexDetail=0;
        if(this.tabIndex==0){
          this.get({})
        }

      },
      //远程获取数据
      async get(op = {}){
        this.$xttp.post(projectHttpUrl.list,Object.assign({
          page:this.currentPage,
          size:this.size,
        },op)).then(res=>{
         
          if (!res.errorCode) {

            this.list = res['data'].records;
            // Object.assign(this.list,res.data.records)
          
            this.total = res['data'].total;
             this.loadAll() 
          }
        })
      }
    },
    mounted(){
        this.get({})
        this.loadAll() ;
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

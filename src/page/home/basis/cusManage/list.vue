<template>
    <el-main>
      <div>
        <my-direct></my-direct>
        <div class="c-search">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="客户名称">
              <el-input v-model="formInline.name" placeholder="关键字搜索"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="find"><i class="iconfont icon-sousuo">&nbsp;</i>查询</el-button>
            </el-form-item>
          </el-form>
          <el-button type="primary" class="c-addBtn" @click="onSubmit">新增</el-button>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column label="序号" width="50" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">{{(currentPage-1) * pageSize + scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column label="客户名称" :show-overflow-tooltip="true" width="130" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>

        <el-table-column label="联系人" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">{{ scope.row.keyType }}</template>
        </el-table-column>

        <el-table-column label="联系方式" :show-overflow-tooltip="true" align="center" width="100">
          <template slot-scope="scope">{{ scope.row.test }}</template>
        </el-table-column>

        <el-table-column label="办公地址" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>

        <el-table-column label="服务项目" :show-overflow-tooltip="true" align="center"  width="200">
          <template slot-scope="scope">{{ scope.row.roomName }}</template>
        </el-table-column>

        <el-table-column label="电梯数" :show-overflow-tooltip="true" align="center"  width="170">
          <template slot-scope="scope">{{ scope.row.number }}</template>
        </el-table-column>

        <el-table-column label="操作" width="80" fixed="right">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="c-block">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <transition name="fade1">
        <AddPage v-if="isShow" :msg="isShow" @upup="change" :add.sync="notice"></AddPage>
      </transition>
      <transition name="fade">
        <SeePage v-if="see" :msg="see" @upsee="seeChange"  :data="seeData"></SeePage>
      </transition>
      <el-dialog title="温馨提示" :visible.sync="visible2">
          <p>请问您是否确定删除这条数据吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
            <el-button type="primary" size="mini" @click="confirmDel">确定</el-button>
          </div>
      </el-dialog>
      <!--<div id="container" style="width:500px; height:300px"></div>-->
    </el-main>
</template>

<script>
import myDirect from '@/components/direct'
import AddPage from "./add";
import SeePage from "./see";
export default {
  name: "cusManage",
  data() {
    return {
      isSou: false,
      tableData: [],
      formInline: {
        name: ""
      },
      currentPage: 1,
      pageSize: 10,
      loading: false,
      isShow: false, //控制添加页面弹出
      total: 0,//列表总数
      notice:null,//编辑传送的值
      see:false,//控制查看组件弹出
      seeData:null,//查看数据
      visible2:false,//控制删除框
      delData:null,
    };
  },
  computed: {
  },
  components: {
    AddPage,
    SeePage,
    myDirect
  },
  methods: {
    onSubmit() {//添加按钮
      this.notice = null;
      this.isShow = !this.isShow;
    },
    handleCurrentChange(val) {
      if(this.currentPage !== val){
        this.sendAjax(val);
      }
    },
    handleClick(row) {
      //查看
      this.see = true;
      this.seeData = row;
    },
    editHandle(row) {
      //编辑
      this.isShow = true;
      this.notice = row;
    },
    change(msg) {//与添加弹窗交互
      if(msg == 1) {
        this.isShow = false;
      }else if(msg == 2 || msg == 3) {
        this.sendAjax();
        this.isShow = false;
      }
    },
    seeChange(msg) {//与查看弹窗交互
      this.see = false;
    },
    find(){
      this.sendAjax(1);
    },
    delHandle(row) {
      this.visible2 = true;
      this.delData = row;
    },
    confirmDel(){
      if(this.delData.id){
        this.$xttp.get(`/community/${this.delData.id}/delete`)
        .then(res=> {
          if(!res.errorCode){
            this.visible2 = false;
            this.delData = null;
            this.$message({message:res.data,type:'success'});
            this.find();
          }
        })
      }
    },
    sendAjax(page) {
      let nPage = page || this.$route.query.page || 1;
      let obj = {page:nPage}
      if(this.formInline.name){
        obj.name = this.formInline.name;
      }else {
        delete obj.name ;
      }
      this.loading = true;
      this.$xttp.get("/community/page",{params:obj})
      .then(res => {
        if (!res.errorCode) {
          this.tableData = res.data.records;
          this.currentPage = res.data.currentPage;
          this.total = res.data.total;
          this.tableData.forEach(item => {
            let isdistrict = item.district || '';
            item.as = item.province + item.city + isdistrict;
            if (item.createAt) {
              item.time1 = new Date(item.createAt)
                .toISOString()
                .split(".")[0]
                .replace("T", " ");
            }
          });
          this.$router.push({path:this.$route.path,query:{page: nPage }})
        }
        this.loading = false;
      }).catch(err => {
        this.loading = false;
      })
    }
  },
  created() {
    this.sendAjax();
  },
  mounted() {
//    let map = new AMap.Map('container',{
//      resizeEnable: true
//    }), geolocation, geocoder, marker = new AMap.Marker({map: map});
//    AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.Geolocation','AMap.Geocoder'],
//      ()=>{
//        map.addControl(new AMap.ToolBar());
//
//        map.addControl(new AMap.Scale());
//
//        geocoder = new AMap.Geocoder();
//
//        geolocation = new AMap.Geolocation({
//          enableHighAccuracy: true,//是否使用高精度定位，默认:true
//          timeout: 10000,          //超过10秒后停止定位，默认：无穷大
//          buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
//          zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
//          buttonPosition:'RB'
//        });
//        map.addControl(geolocation);
//        geolocation.getCurrentPosition();
//      });
//    map.on('click', function(e) {
//      marker.setPosition([e.lnglat.getLng(),e.lnglat.getLat()]);
//      //根据经纬度获得地址
//      geocoder.getAddress([e.lnglat.getLng(),e.lnglat.getLat()], function(status, result) {
//        if (status === 'complete' && result.info === 'OK') {
//          console.log(result.regeocode.formattedAddress);
//          //获得了有效的地址信息:
//          //即，result.regeocode.formattedAddress
//        }else{
//          //获取地址失败
//        }
//      });
//      //根据地址查询经纬度
//      geocoder.getLocation("北京市海淀区苏州街", function(status, result) {
//        if (status === 'complete' && result.info === 'OK') {
//          //TODO:获得了有效经纬度，可以做一些展示工作
//          //比如在获得的经纬度上打上一个Marker
//        }else{
//          //获取经纬度失败
//        }
//      });
//    });
  }
};
</script>

<style scoped lang="scss">
.c-body {
  width: 90%;
  &.c-maxWidth {
    max-width: calc(100vw - 200px);
  }
}
.c-navDetail {
  margin-bottom: 10px;
  li {
    float: left;
    margin-right: 10px;
  }
}
.c-block {
  margin-top: 15px;
}
.c-search {
  position: relative;
  width: 100%;
  .c-addBtn {
    position: absolute;
    right: 0px;
    top: 0px;
  }
}
// 切换动画
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
  transform: rotateY(180deg);
}
.fade1-enter-active, .fade1-leave-active {
  transition: all 0.5s ease;
}

.fade1-enter, .fade1-leave-active {
  opacity: 0;
  transform: translateX(-500px);
}
</style>

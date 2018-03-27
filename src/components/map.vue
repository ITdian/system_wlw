<template>
  <div id="container" style="width:350px; height:350px;border-radius: 8px;"></div>
</template>
<script>
  export default {
    props:{
      disabled:{
        type:Boolean,
        default:true
      },
    },
    data(){
      return {
        initParam:{},
        map: null,//地图实例
        geolocation: null,
        geocoder: null,
        marker: null,
      }
    },
    methods:{
      updateMap(address){
        if(Array.isArray(address)) {
          this.map.setZoomAndCenter(14,address);
          this.marker.setPosition(address);
        } else {
          //地址转换经纬度
          this.getLocation(address).then(data => {
            this.map.setZoomAndCenter(14,data);
            this.marker.setPosition(data);
          })
        }
      },
      handleComplete(data){
        if (!this.disabled || !this.initParam.disabled ) {
          this.$emit('complete',{
            province:data.addressComponent.province,
            city:data.addressComponent.city,
            district:data.addressComponent.district,
            formattedAddress:data.formattedAddress,
          });
        }
      },
      handleClick(e){
        if (!this.disabled || !this.initParam.disabled ) {
          this.map.setZoomAndCenter(14, [e.lnglat.getLng(), e.lnglat.getLat()]);
          this.marker.setPosition([e.lnglat.getLng(), e.lnglat.getLat()]);
          this.getAddress([e.lnglat.getLng(),e.lnglat.getLat()]).then(data => this.$emit('click',data))
        }
      },
      getLocation(address = '广东省广州市荔湾区'){
        if (!this.geocoder) {
          console.warn('please init map geocoder');
          return false;
        }
        return new Promise((resolve,reject) => {
          this.geocoder.getLocation(address, (status, result) => {
            if (status === 'complete' && result.info === 'OK') {
              //TODO:获得了有效经纬度，可以做一些展示工作
             resolve([result.geocodes[0].location.lng,result.geocodes[0].location.lat])
            }else{
              //获取经纬度失败
              console.warn('map.vue -> getLocation -> 获取经纬度失败');
              reject();
            }
          });
        })
      },
      getAddress(lnglatXY){
        if (!this.geocoder) {
          console.warn('please init map geocoder');
          return false;
        }
        return new Promise ((resolve,reject)=>{
          this.geocoder.getAddress(lnglatXY, (status, result) =>{
            if (status === 'complete' && result.info === 'OK') {
              resolve({
                province:result.regeocode.addressComponent.province,
                city:result.regeocode.addressComponent.city,
                district:result.regeocode.addressComponent.district,
                formattedAddress:result.regeocode.formattedAddress,
              })
            }else{
              //获取地址失败
              console.warn('map.vue -> getAddress -> 获取地址失败');
              reject();
            }
          });
        })
      }
    },
    mounted(){
      this.$on('mapInit',
        (op) => {
          let _this = this;
          _this.initParam = Object.assign({initAddress: null, disabled: false,zoom: 6,resizeEnable:true},op);
          _this.map = new AMap.Map('container', {
            zoom: op.zoom,
            resizeEnable: op.resizeEnable
          });
          console.log(op)
          _this.marker = new AMap.Marker({map: _this.map});

          AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.Geolocation'],
            () => {
              _this.map.addControl(new AMap.ToolBar());

              _this.map.addControl(new AMap.Scale());

              _this.geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                buttonPosition: 'RB'
              });

              _this.map.addControl(_this.geolocation);

              if (!op.initAddress) {//没传入初始位置则直接定位当前
                _this.geolocation.getCurrentPosition();
              }

              AMap.event.addListener(_this.geolocation, 'complete', _this.handleComplete);
            });

          AMap.service('AMap.Geocoder',
            () => {//回调函数
              //实例化Geocoder
              _this.geocoder = new AMap.Geocoder();
              //TODO: 使用geocoder 对象完成相关功能
              if (op.initAddress) {//传入初始位置则直接定位
                _this.updateMap(op.initAddress);
              }
            });
          _this.map.on('click',_this.handleClick);
        });
      this.$on('update',this.updateMap);
      this.$on('setDisabled',state => this.disabled = state);
    }
  }
</script>
<style lang="scss" scoped>

</style>

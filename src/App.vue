<template>
  <div id="app">
    <div class="home_container">
      <Header></Header>
      <el-container class="c-container">
        <my-aside></my-aside>
        <router-view/>
      </el-container>
    </div>
  </div>
</template>

<script>
import './utils/filter';
import Header from '@/components/header/Header'
import myAside from '@/components/aside/Aside'

export default {
  name: 'App',
  components:{Header,myAside},
  created() {
    console.log(666)
    //获取菜单权限
//      this.$store.dispatch('updatedAsideData')
//        .then(res => {
//          // console.log(res)
//        }).catch(err => {
//          console.log(err)
//        })
    if (!this.$store.getters.token) {
      this.$router.push('/auth/login');
    }
  }
}
</script>

<style  lang="scss">
@import './style/common.scss';
@import './style/cover-elementui.scss';
@import "./utils/validate/validate_ui.scss";
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width: 1000px;
}
.c-container{
  margin-top: 40px;
}
.fade-enter-active, .fade-enter-active {
  transition: all 2s ease
}
.fade-enter, .fade-leave-active {
  transform:translateX(-100%);
}
.fei-enter-active, .fei-leave-active {
  transition: all 0.5s ease;
}
.fei-enter{
  transform:rotate(-90deg);
}
</style>

<template>
  <div class="home_container">
    <Header></Header>
    <el-container class="c-container">
      <my-aside></my-aside>
      <router-view/>
    </el-container>
  </div>
</template>


<script>
  import Header from '@/components/header/Header'
  import myAside from '@/components/aside/Aside'

  export default {
    name: 'home',
    data() {
      return {
      }
    },
    methods: {
    },
    components: {
      Header,
      myAside
    },
    created() {
      this.$store.dispatch('updatedAsideData')
        .then(res => {
          // console.log(res)
        }).catch(err => {
          console.log(err)
        })
        if (!this.$store.getters.token) {
          this.$router.push('/auth/login');
        }
    }
  }
</script>

<style lang="scss" scoped>
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

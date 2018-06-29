/**
*  @description： 作者端应用组件
*  @author： zhangchenle
*  @data:  2018.6.1
*/
<template>
  <div class="container">
    <Header></Header>
    <div class="main">
      <SideBar></SideBar>
      <Main></Main>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/home/Header.vue'
import SideBar from '@/components/home/SideBar.vue'
import Main from '@/components/home/Main.vue'
import Footer from '@/components/home/Footer.vue'

export default {
  name: 'App',
  components: { Header, SideBar, Main, Footer }
}
</script>

<style lang="less" scoped>
.container {
  padding-top: 72px;
  padding-bottom: 100px;
  position: relative;
  min-height: 100%;
  .main {
    margin: 0 auto;
    padding-left: 194px;
    padding-bottom: 100px;
    position: relative;
    width: 1200px;
    min-height: 100%;
  }
}
</style>

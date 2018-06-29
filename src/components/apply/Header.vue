/**
*  @description： 作者端注册、申请专栏等进入home页之前的Header组件
*  @author： zhangchenle
*  @data:  2018.6.4
*/
<template>
  <div class="header">
    <div class="box">
      <div class="title">
        <img @click="toIndex" src="https://pro-kg-oss.oss-cn-beijing.aliyuncs.com/author/inlet/logo2.png" alt=""  class="logo">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    toIndex () {
      window.location.href = '/'
    }
  }
}
</script>
<style lang="less" scoped>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 1000;
    .box {
      margin: 0 auto;
      width: 1200px;
      height: 72px;
      line-height: 72px;
      box-shadow: 0px 2px 4px rgba(183,182,182,0.1);
      .title {
        margin: 0 auto;
        width: 1200px;
        font-size: 24px;
        font-family: MicrosoftYaHei-Bold;
        color:rgba(0,0,0,1);
        font-weight: bold;
        .logo{
          height: 43px;
          width: 166px;
          margin-left: 20px;
        }
      }
    }
  }
</style>

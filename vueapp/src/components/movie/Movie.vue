<!--界面的总容器-->
<template>
  <div>
    <!--导入的组件名字遇见大写用-分割-->
    <common-header></common-header>
    movie
    <common-footer></common-footer>
  </div>

</template>


<script>

  import CommonHeader from '../common/Header';
  import CommonFooter from '../common/Footer';
  export default {
    name: "movie",
    components: {
      //es6语法：对象简介形式
      CommonHeader,
      CommonFooter
    }
  }
</script>

<style scoped>

</style>

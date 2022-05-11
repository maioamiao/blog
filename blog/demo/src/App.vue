<template>
  <AppNav></AppNav>
  <div id="main">
    <div class="aside">
      <AppAside></AppAside>
    </div>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import AppNav from "@/components/AppNav"
import AppAside from "@/components/AppAside"
import {mapMutations} from "vuex"
export default {
  name: 'App',
  components: {AppNav, AppAside},
  methods:{...mapMutations(["updateUserInfo"])},
  async created(){
    let {data} = await this.$axios({ //验证当前的用户是否登录
      method:"POST",
      url:"/login/isCheck"
    });
    if(data.code) return; //未登录
    //已登录
    this.updateUserInfo(data.data); //将用户数据存入vuex中
  }
}
</script>

<style lang="less">
  @import "assets/css/reset.css";
  @import "assets/css/font.css";
  @import "assets/css/font/iconfont.css";
  body{
    background: 
      url("./assets/images/background/bg-left.png") no-repeat 0 50px fixed,
      url("./assets/images/background/bg-right.png") no-repeat right 50px fixed;
    background-color: #F2F2F2;
  }
  #main{
    display: flex;
    max-width: 1200px;
    margin: 65px auto;
    .aside{
      width: 270px;
      margin-right: 15px;
    }
    .content{
      max-width: 915px;
      min-height: 700px;
      flex: 1;
    }
  }
</style>

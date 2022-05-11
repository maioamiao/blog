<template>
  <Personal></Personal>
  <div :class="{'fixedbox':fixedbox}">
    <HotArticle></HotArticle>
    <Visitor></Visitor>
  </div>
</template>

<script>
import Personal from "@/components/appAside/Personal"
import HotArticle from "@/components/appAside/HotArticle"
import Visitor from "@/components/appAside/Visitor"
export default {
    name:"AppAside",
    data(){
      return{
        fixedbox:false
      }
    },
    components:{Personal, HotArticle, Visitor},
    methods:{
      scroll(){
        //获取页面滚动的top值
        let top = document.documentElement.scrollTop;
        this.fixedbox = (top >= 235);
      }
    },
    mounted(){
      this.scroll(); //组件挂载到dom后调用1次滚动判断的方法
      window.addEventListener("scroll", ()=>{
        this.scroll();
      });
    }
}
</script>

<style lang="less" scoped>
  .fixedbox{
    position: fixed;
    top: 65px;
    width: 270px;
  }
</style>
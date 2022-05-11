<template>
  <div class="hot-article">
      <h4>热门文章</h4>
      <ul>
          <li v-for="(item, index) in hotArticle" :key="item._id">
              <i>{{index+1}}</i>
              <router-link :to="`/article/${item._id}`" target="_blank">{{item.title}}</router-link>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    name:"HotArticle",
    data(){
        return {
            hotArticle:[]
        }
    },
    methods:{
        //请求获取所有的文章数据
        async getArticles(){
            let {data} = await this.$axios({
                method:"GET",
                url:"/getdata/article"
            });
            if(data.code) return ;//没有文章时直接return
            this.hotArticle = data.data.slice(0,3); //0-3下标位置的文章数据
        }
    },
    created(){
        this.getArticles();
    }
}
</script>

<style lang="less" scoped>
.hot-article{
    width: 100%;
    background-color: #fff;
    padding: 20px;
    font-family: "Quicksand";
    box-shadow: 0 0 4px #ddd;
    box-sizing: border-box;
    h4{
        line-height: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e8e9e7;
        color: #383937;
        font-size: 16px;
        font-weight: bold;
    }
    ul{
        margin-top: 15px;
        li{
            overflow: hidden;
            display: flex;
            height: 40px;
            padding: 0 3px;
            line-height: 40px;
            box-sizing: border-box;
            i{
                width: 22px;
                height: 22px;
                margin-top: 9px;
                margin-right: 15px;
                border-radius: 50%;
                line-height: 16px;
                font-size: 16px;
                font-style: normal;
                color: #fff;
                text-align: center;
                font-weight: 100;
                font-family: Pacifico;
            }
            i:nth-child(1){
                background-color: #71a598;
            }
            i:nth-child(2){
                background-color: #6eb3a3;
            }
            i:nth-child(3){
                background-color: #93bbb2;
            }
            a{
                display: block;
                overflow: hidden;
                color: #787977;
                font-size: 14px;
                text-decoration: none;
                white-space: nowrap;
                text-overflow: ellipsis;
                flex: 1;
            }
        }
    }
}
</style>
<template>
    <div>
        <link rel="stylesheet" href="/static/editor.md/css/editormd.css">
        <article>
            <main id="mdHtml"></main>
        </article>
    </div>
</template>

<script>
import marked from 'marked'
export default {
    name:"ArticleDetails",
    async mounted(){
        console.log(this.$route.params.id);
        const id = this.$route.params.id;  //得到动态路由的id值
        let {data} = await this.$axios({
            method:"GET",
            url:"/getdata/articleDetails",
            params:{id}
        });
        if(data.code){
            this.$message.error("你要查阅的文章不存在!");
            //重定向回到文章页面
            this.$router.replace("/article");
        }else{
            //发起请求，通过md文件地址得到文件数据
            let mdData = await this.$axios({
                method:"GET",
                url: data.data.mdUrl,
            });
            editormd.markdownToHTML("mdHtml", {
                markdown: mdData.data //md文件数据
            });
        }
        
    }
}
</script>
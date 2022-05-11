<template>
  <div class="loginuser">
    <el-popover
      placement="bottom-end"
      :width="200"
      trigger="hover"
    >
      <template #reference>
        <img :src="baseURL + userInfo.photo" alt="">
      </template>
      <div>
        <el-button type="primary" size="mini" @click="changeInfo">修改信息</el-button>
        <el-button type="danger" size="mini" @click="loginOut">退出登录</el-button>
      </div>
    </el-popover>
    <!-- {{baseURL}} -->
  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex"
export default {
  name: "LoginUser",
  computed:{...mapState(["userInfo"])},
  methods:{
    ...mapMutations(["clearUserInfo"]),
    changeInfo(){
      //跳转到/updateUser路由下  编程式导航
      this.$router.push("/updateUser");
    },
    async loginOut(){
      let {data} = await this.$axios({
        method:"POST",
        url:"/login/out"
      });
      this.$message.success(data.message); //退出登录后弹框提示
      this.clearUserInfo();//清空vuex里的数据
      //跳转到/路由下  编程式导航
      this.$router.push("/");
    }
  }
};
</script>

<style lang="less" scoped>
.loginuser {
  width: 34px;
  height: 34px;
  margin: 8px 0;
  img {
    width: 34px;
    height: 34px;
    // background: none center center / cover;
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>
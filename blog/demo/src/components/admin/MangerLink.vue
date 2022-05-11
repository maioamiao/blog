<template>
  <div>
    <el-table :data="linkInfo" style="width: 100%">
      <el-table-column label="名称" width="180">
        <template #default="scope">
          <el-input v-model="scope.row.name"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="首页" width="180">
        <template #default="scope">
          <el-input v-model="scope.row.home"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="logo" width="180">
        <template #default="scope">
          <el-input v-model="scope.row.logo"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="描述" width="180">
        <template #default="scope">
          <el-input v-model="scope.row.describe"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">
            修改
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
  name: "MangerLink",
  data() {
    return {
      linkInfo: [],
    };
  },
  computed:{...mapState(["addLink"])},
  watch:{
    //监听vuex中addLink值的变化，当值发生变化时，自动触发该函数
    addLink(){
      this.getLinkData();//重新获取所有友链数据
    }
  },
  methods: {
    async handleEdit(item) {
      //修改友链
      let { data } = await this.$axios({
        method: "POST",
        url: "/administer/link/update",
        data: {
          _id: item._id,
          name: item.name,
          home: item.home,
          logo: item.logo,
          describe: item.describe,
        },
      });
      console.log(data);
    },
    async handleDelete(item) {
      //删除友链
      let { data } = await this.$axios({
        method: "delete",
        url: "/administer/link/delete",
        data: {_id: item._id,},
      });
      if(data.code) return this.$message.error(data.message);
      this.$message.success(data.message);
      this.getLinkData();//重新获取所有友链数据
    },
    async getLinkData() { //获取所有友链数据
      let { data } = await this.$axios({
        method: "GET",
        url: "/getdata/link",
      });
      this.linkInfo = data.data;
    },
  },
  created() {
    console.log(1111);
    this.getLinkData();
  },
};
</script>

<style>
</style>
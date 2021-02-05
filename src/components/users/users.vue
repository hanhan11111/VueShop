<template>
  <div>
    <!-- 导航列表 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 内容 -->
    <el-card class="box-card" :span="8">
      <!-- 搜索 添加 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <!-- clearable="true"是否可清空 -->
          <!-- clearable 清空输入框内容 -->
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="queryInfo.query"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="2">
          <el-button icon="el-icon-search" @click="getUsersList">搜索</el-button>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" round offset="-3">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="usersList" stripe style="width: 100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="changeSwitchType(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="role_name" label="操作"></el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryInfo: {
        //要查询的内容
        query: "",
        //当前页数
        pagenum: 1,
        //每页显示多少数据
        pagesize: 5
      },
      usersList: [],
      total: 0
    }
  },
  created() {
    this.getUsersList()
    this.changeSwitchType()
  },
  methods: {
    async getUsersList() {
      const { data: res } = await this.$http.get("users", {
        params: this.queryInfo
      })
      if (res.meta.status !== 200)
        return this.$message.error("获取用户列表失败")
      console.log(res)
      this.usersList = res.data.users
      this.total = res.data.total
    },
    //分页 获取新的页码和每页显示条数
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUsersList()
    },
    handleCurrentChange(newSize) {
      this.queryInfo.pagenum = newSize
      this.getUsersList()
    },
    async changeSwitchType(switchType) {
      const { data: res } = await this.$http.put(
        `users/${switchType.id}/state/${switchType.mg_state}`
      )
      if (res.meta.status !== 200) return this.$message.error("修改状态失败")
      return this.$message.success("修改状态成功")
      // console.log(res)
    }
  }
}
</script>
<style lang="less" scoped>
.el-breadcrumb {
  font-size: 12px;
}
.el-card {
  margin-top: 10px;
}
</style>

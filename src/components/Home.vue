<template>
  <el-container>
    <el-header>
      <span class="header-span">电子商城项目</span>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside el-aside :width="isCollapse ? '48px' : '200px'">
        <el-menu
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409FFF"
        >
        <!-- :default-active="activePath"跳转页面 
              :collapse-transition="false"关闭自定义动画
          -->
          <!-- 一级菜单 -->
          <div>
            <span class="submenu-close" @click="togleCollapse">|||</span>
          </div>
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i class="el-icon-location iconlo"></i>
              {{ item.authName }}</template
            >
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
            >
              <!-- 导航开启路由模式：
                将index值作为导航路由 -->
              <!-- 二级菜单的模板区域 -->
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      // 默认不折叠
      isCollapse: false,
      activePath: "",
      

    }
  },
  created() {
    this.getMenu()
    this.activePath = window.sessionStorage.getItem("activePath")
  },
  methods: {
    logout() {
      // 清空token
      window.sessionStorage.clear()
      //重定向到登录页
      this.$router.push("/login")
    },
    // 获取请求菜单
    async getMenu() {
      const { data: res } = await this.$http.get("menus")
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      // this.menuList = res.data
      this.menuList = res.data
    },
    // 菜单的折叠与展开
    togleCollapse() {
      this.isCollapse = !this.isCollapse
    },

    //保持激活页面
    saveNavState(activePath) {
      window.sessionStorage.setItem("activePath", activePath)
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-aside {
  background-color: #333744;
  text-align: center;
}
.el-header {
  background-color: #373f41;
}
.submenu-close {
  color: #fff;
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  letter-spacing: 0.2em;
  text-align: center;
  // 鼠标放上去变成小手
  cursor: pointer;
}
.iconlo {
  margin-right: 20px;
}
.el-menu-item {
  background-color: #333742;
}
.el-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-span{
  color: #fff;
  font-size: 20px;

}
</style>

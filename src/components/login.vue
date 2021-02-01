<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登录表单区 -->
      <el-form
        ref="loginFormRef"
        label-width="0px"
        class="login_form"
        :rules="loginFormRules"
        :model="loginForm"
      >
        <!-- 用戶名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <!-- 密碼 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            show-password
            prefix-icon="el-icon-s-goods"
          ></el-input>
        </el-form-item>
        <!-- 按鈕區域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登錄</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456"
      },
      // 表單驗證規則對象
      loginFormRules: {
        username: [
          { required: true, message: "请输入用戶名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10个字符", trigger: "blur" }
        ],
        // 驗證密碼是否合法
        password: [
          { required: true, message: "请输入密碼", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10个字符", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    // 點擊重置按鈕 重置登錄表單
    resetLoginForm() {
      console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    // 表單校验  通過valid為true
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post("login", this.loginForm)
        if (res.meta.status !== 200)
          return this.$message.error("用户名密码错误")
        this.$message.success("登录成功")
        // 1、将登陆成功之后的token 保存到客户端的sessionStorage中
        // 1.1 项目中除了登陆之外的其他API接口 必须在登录之后才能访问
        // 1.2 token只应在当前网站打开期间生效,所以将token保存在sessionStorage中
        window.sessionStorage.setItem("tonken", res.data.token)
        // 2 通过编程式导航跳转后台主页 路由地址是/home
        this.$router.push("/home")
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px; //圆角
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eeeeee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #dddddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>

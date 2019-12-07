<template>
  <div class="loginBox">
    <header class="cl">
      <div class="lt" @click="close">X</div>
      <div class="rt">免密码登录</div>
    </header>
    <h2>密码登录</h2>
    <div class="inpBox">
      <input type="text" placeholder="请输入用户名或手机号" v-model="name" />
      <input type="password" placeholder="请输入密码" v-model="psw" />
    </div>
    <div class="loginBtn" @click="login">登录</div>

    <div class="cl help">
      <div class="lt">海外手机号登录</div>
      <div class="rt">需要帮助</div>
    </div>

    <div class="otherLogin">
      <div>微信</div>
      <div>QQ</div>
      <div>新浪</div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src

import { login } from "@/api/login.js";
export default {
  name: "login",
  data() {
    return {
      name: "",
      psw: ""
    };
  },
  methods: {
    close() {
      //点击关闭按钮  从哪里来 回哪里去
      this.$router.back();
    },
    login() {
      if (!this.name || !this.psw) {
        alert("用户名或密码错误");
        return;
      }
      login({
        name: this.name,
        password: this.psw
      }).then(data => {
          //登录成功之后，我们要把后台给的token，存储到loaclStorage中
          console.log(data);
          localStorage.setItem("token", "成功了  success");
          this.$store.commit("stateChange", { loginState: true });
          this.$router.push("/home");
        }).catch(err => {
          console.log(err);
          localStorage.setItem("token", "失败了   error");
          this.$store.commit("stateChange", { loginState: true });
          this.$router.push("/user");
        });
    }
  },
  components: {}
};
</script>
<style lang="less" scoped>
.loginBox {
  padding: 5vw;
  > header {
    overflow: hidden;
  }
  h2 {
    height: 30vw;
    line-height: 30vw;
  }
  .inpBox {
    input {
      border: none;
      border-bottom: 1px solid #ccc;
      width: 80vw;
      margin: auto;
      height: 15vw;
      font-size: 5vw;
      outline: none;
    }
  }
  .loginBtn {
    width: 80vw;
    height: 15vw;
    line-height: 15vw;
    background: rgb(25, 153, 228);
    color: #fff;
    font-size: 10vw;
    margin: 5vw auto;
  }
  .help {
    width: 80vw;
    margin: 10vw auto;
  }
  .otherLogin {
    width: 80vw;
    display: flex;
    position: fixed;
    bottom: 10vw;
    left: 10vw;
    > div {
      flex: 1;
    }
  }
}
</style>
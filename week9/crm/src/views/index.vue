<template>
  <div>
    <el-container>
      <el-header class=".cl">
        <h2 class="lt">CRM管理系统</h2>
        <div class="topTabBox lt">
          <div class="lt">
            <router-link to="/org" tag="span">组织结构</router-link>
          </div>
          <div class="lt">
            <router-link to="/crm" tag="span">客户管理</router-link>
          </div>
        </div>
        <div class="userNameBox rt">
          <span>你好：珠峰培训</span>
          <span @click="logout">安全退出</span>
        </div>
      </el-header>

      <div class="middle_content_box">
        <router-view></router-view>
      </div>

      <el-footer class="footer-bottom">12343</el-footer>
    </el-container>
  </div>
</template>
<script>
// @ is an alias to /src
//  在该组件验证登录
import {signout,judgeLogin} from '@/api/login.js'
export default {
  name: "index",
  data() {
    return {};
  },
  created(){
    judgeLogin().then(flag=>{
      // 若flag是false  代表登录状态是失败的  直接跳转都登录页面
      if(!flag){
        this.$router.push('/login')
      }
    })
  },
  components: {},
  methods: {
    logout() {
      signout().then(data=>{
        if(data.code == 0){
          this.$router.push('/login')
        }
      })
      
    }
  },
};
</script>
<style lang="less">
.footer-bottom {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
}
.middle_content_box {
  position: absolute;
  top: 60px;
  bottom: 60px;
  width: 100%;
  left: 0;
  right: 0;
  overflow: hidden;
  .el-container {
    height: 100%;
  }
}
.topTabBox {
  padding: 0 80px;
  > div {
    margin: 0 20px;
    cursor: pointer;
    color: rgb(158, 156, 156);
    // box-sizing: border-box;
    &:hover {
      color: #fff;
      &::after {
        content: "";
        display: block;
        width: 100%;
        position: relative;
        border-bottom: 3px solid rgb(69, 178, 241);
        top: -5px;
      }
    }
    > span {
      display: block;
      width: 100%;
      height: 100%;
    }
    > span.router-link-active {
      font-size: 20px;
      font-weight: 700;
      color: #fff;
    }
  }
}
.userNameBox {
  > span:nth-child(2) {
    cursor: pointer;
    padding-left: 20px;
  }
}
.el-header,
.el-footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #333;
  color: #fff;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
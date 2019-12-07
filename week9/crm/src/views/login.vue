<template>
  <div class="loginBox">
    <h2>CRM客户管理系统</h2>
    <h3>为保护企业的数据安全，请妥善保管密码</h3>
    <div>
      <el-input 
      placeholder="请输入内容" 
      prefix-icon="el-icon-user" 
      v-model="name"
      class="inp">

      </el-input>

      <el-input 
      placeholder="请输入密码" 
      prefix-icon="el-icon-lock" 
      show-password
      v-model="psw"
      class="inp">

      </el-input>
      <el-button type="primary" class="btn" @click='login'>登录</el-button>
    </div>
    <p>北京珠峰世纪技术培训有限公司 京ICP备09041920号 京公网安备110108400531号</p>
  </div>
</template>
<script>
// @ is an alias to /src
import {login} from '@/api/login.js'
import MD5 from 'md5'
export default {
  name: "login",
  data() {
    return {
        name:'',
        psw:'',
    };
  },
  components: {},
  methods: {
      login(){
          if(!this.name || !this.psw){
              this.$message.error('用户名或密码不能为空');
              return
          }
          let obj = {
              account:this.name,
              password:MD5(this.psw)
          }
          login(obj).then(data=>{
            if(data.code==0){
              this.$alert('恭喜登录成功','提示',{
                confirmButtonText:'确定',
                callback:action=>{
                  // console.log(action)
                  //告诉我们点击了那个按钮
                  this.$router.push('/')
                }
              })
            }
          })
      },
  },
};
</script>
<style lang="less" scoped>
.loginBox {
  width: 100%;
  height: 100%;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  h2 {
    height: 60px;
    line-height: 60px;
    margin-top: 80px;
  }
  > div {
    width: 400px;
    margin: auto;
    background: #fff;
    box-shadow: 11px 11px 23px 5px #ccc;
    padding-top:20px;
    .inp{
        width: 90%;
        margin:5px auto;

    }
    .btn{
        width: 90%;
        margin:20px auto;
    }
  }
  > p {
    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;
  }
}
</style>
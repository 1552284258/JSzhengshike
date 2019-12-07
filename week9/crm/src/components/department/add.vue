<template>
  <el-form
    class="myForm"
    ref="form"
    :rules="rules"
    :model="form"
    label-width="80px"
  >
    <el-form-item label="部门名称" prop="name">
      <el-input v-model.trim="form.name" style="width:400px"></el-input>
    </el-form-item>

    <el-form-item label="部门描述" prop="desc">
      <el-input
        type="textarea"
        v-model="form.desc"
        style="width:400px"
        rows="8"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="$router.back()">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { addDpList, updateDpList } from "@/api/index.js";
export default {
  data() {
    return {
      form: {
        name: "",
        desc: ""
      },
      rules: {
        name: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
        desc: [{ required: true, message: "请填写部门描述", trigger: "blur" }]
      }
    };
  },
  created() {
    //用Vuex   但有一个小bug，Vuex刷新就没数据了，
    let id = this.$route.query.id;
    let obj = this.$store.state.departmentList.filter(item => item.id == id)[0];
    this.form = obj ? obj : this.form;
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(flag => {
        //flag 是true 代表刚才的验证规则都通过了
        console.log(flag);
        if (flag) {
          let id = this.$route.query.id;
          this.form.departmentId = id; // 添加后赋值  后台要这个参数
          (id ? updateDpList : addDpList)(this.form).then(data => {
            if (data.code == 0) {
              //新增成功
              this.$confirm((id?'更新':'添加')+'成功，是否跳转？', "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "success"
              }).then(() => {
                  this.$router.push("/org/department");
              }).catch(() => {});
            }
          });
        } else {
          this.$message({
            type: "error",
            message: "添加失败!"
          });
        }
      });
    }
  }
};
</script>
<style lang="less">
.myForm {
  text-align: left;
  padding: 20px;
  min-height: 100%;
  box-sizing: border-box;
}
</style>

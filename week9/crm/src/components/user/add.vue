<template>
  <el-form ref="form" :model="form" label-width="80px" class="myForm">
    <el-form-item label="姓名">
      <el-input v-model="form.name" style="width:300px"></el-input>
    </el-form-item>

    <el-form-item label="性别">
      <el-radio-group v-model="form.sex">
        <el-radio label="0">男</el-radio>
        <el-radio label="1">女</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="邮箱">
      <el-input v-model="form.email" style="width:300px"></el-input>
    </el-form-item>

    <el-form-item label="电话">
      <el-input v-model="form.phone" style="width:300px"></el-input>
    </el-form-item>

    <el-form-item label="部门">
      <el-select v-model="form.departmentId" placeholder="请选择部门">
        <el-option
          v-for="dep in departmentList"
          :label="dep.name"
          :value="dep.id"
          :key="dep.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="职务">
      <el-select v-model="form.jobId" placeholder="请选择职务">
        <el-option
          v-for="jb in jobList"
          :label="jb.name"
          :value="jb.id + ''"
          :key="jb.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="自我介绍">
      <el-input
        type="textarea"
        v-model="form.desc"
        rows="6"
        style="width:300px"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="back">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { addUserList, updateUserList } from "@/api/index.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        phone: "",
        departmentId: null,
        department: "",
        jobId: null,
        sex: null,
        desc: "",
        id: ''
      },
      value: ""
    };
  },
  computed: {
    // departments() {
    //   return this.$store.state.departmentList;
    // },

    // jobs() {
    //   return this.$store.state.jobList;
    // }

    ...mapState(['departmentList','jobList','userList'])
  },
  created() {
    // this.$store.dispatch('jobList')
    //在这调用actions中的方法，该方法调用接口获取数据，成功后调用mutations中的方法
    //然后把state中的 数据修改  state中的修改之后，触发当前组件的视图更新

    let id = this.$route.query.id;
    let obj = this.userList.filter(item => item.id == id)[0];
    this.form = obj ? obj : this.form;
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(flag => {
        //flag 是true 代表刚才的验证规则都通过了
        if (flag) {
          let id = this.$route.query.id;
          this.form.id = id ? id : Math.random();
          this.form.userId = this.form.id; // 添加后赋值  后台要这个参数

          (id ? updateUserList : addUserList)(this.form).then(data => {

            if (data.code == 0) {
              //新增成功
              this.$confirm(
                (id ? "更新" : "添加") + "成功，是否跳转？",
                "提示",
                {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "success"
                }
              )
                .then(() => {
                  this.$router.push("/org/user");
                })
                .catch(() => {});
            }
          });
        } else {
          this.$message({
            type: "error",
            message: "添加失败!"
          });
        }
      });
    },
    back() {
      this.$router.push("/org/user");
    }
  }
};
</script>

<style lang="less">
.myForm {
  min-height: 100%;
}
</style>

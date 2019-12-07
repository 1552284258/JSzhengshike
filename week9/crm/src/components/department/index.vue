<template>
  <div style="height:100%">
    <el-table
      :data="tableData"
      style="width: 100%"
      align="center"
      stripe
      border
      height="100%"
    >
      <el-table-column
        label="编号"
        width="100"
        type="index"
        :index="indexMethod"
        align="center"
      >
      </el-table-column>
      <el-table-column label="名称" width="300" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" align="center">
        <template slot-scope="scope">
          {{ scope.row.address }}
          <div slot="reference" class="name-wrapper">
            {{ scope.row.desc }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// @ is an alias to /src
import { delDpList } from "@/api/index.js";
export default {
  name: "XXX",
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("changeDpList");

  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      // this.$router.push('/org/addDepartment')
      this.$router.push({ path: "/org/addDepartment", query: { id: row.id } });
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          //点击了确定按钮
          //调用 api 中的 delDpList方法
          delDpList(row.id).then(data => {
            if (data.code == 0) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              //后台删除
              this.$store.dispatch("changeDpList");

              // 前端删除
              // let newData = this.tableData.filter(item=>{
              //   item.id != row.id
              // })
              // this.$store.commit('changeDpList',{data:newData})
            } else {
              this.$message({
                type: "error",
                message: "删除失败!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    indexMethod(index) {
      return index + 1;
    }
  },
  computed: {
    tableData() {
      console.log(this);
      return this.$store.state.departmentList;
    }
  },
  components: {}
};
</script>
<style lang="less"></style>

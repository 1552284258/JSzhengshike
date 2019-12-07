<template>
  <el-container>
    <my-aside :ary='ary'></my-aside>
    <el-main class="myMain">
      <router-view></router-view>
    </el-main>

  </el-container>
</template>
<script>
import ary from "@/router/org.js";
import nav from '@/components/nav.vue'
// @ is an alias to /src
export default {
  name: "ORG",
  data() {
    return {
     ary:ary
    };
  },
  components: {
    'my-aside':nav
  },
};
</script>
<style lang="less" >
.myMain{
  line-height: normal;
  padding: 0;
}
</style>

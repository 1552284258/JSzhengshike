<template>
  <div>
    <my-header></my-header>
    <van-tabs
      class="top-tap"
      v-model="active"
      swipeable
      animated
      @change="change"
      line-width="10vw"
      line-height="0.5vw"
    >
      <van-tab v-for="(item) in ary" :title="item.til" :key="item.to">
        <router-view></router-view>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
// @ is an alias to /src
import Header from "./header";

export default {
  name: "home",
  data() {
    return {
      //   active: 0,
      ary: [
        {
          til: "关注",
          to: "/home/focus"
        },
        {
          til: "推荐",
          to: "/home/recommend"
        },
        {
          til: "热榜",
          to: "/home/hot"
        }
      ]
    };
  },
  components: {
    "my-header": Header
  },
  methods: {
    change(n) {
      console.log(arguments, this.active);
      this.$router.push(this.ary[n].to);
    }
  },
  /*   watch: {
    $route(to) {
        //侦听路由变化， 第一次监听不到
      console.log(to);
      this.ary.forEach((item, index) => {
        if (item.to == to.path) {
          this.active = index;
        }
      });
    }
  }, */
  computed: {
    active: {
      get() {
        return this.ary.findIndex(item => item.to === this.$route.path);
      },
      set() {}
    }
  }
};
</script>
<style lang="less">
.van-tabs__wrap::after {
  border: none;
}
.top-tap>.van-tabs__wrap {
  box-shadow: 0px 4px 4px 0px #eee;
}
.van-tabs__line {
  background: #333;
}
</style>
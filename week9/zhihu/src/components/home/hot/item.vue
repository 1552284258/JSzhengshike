<template>
  <div class="itemBox">
    <div class="iconBox">
        {{index+1}}
    </div>
    <div class="contentBox">
      <h4>{{data.title}}</h4>
      <p>{{data.author}}</p>
    </div>
    <div class="imgBox">
      <img :src="data.image_field ? data.image_field.url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575117227391&di=8b0fa24406b075aea7023a646971f5a7&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F0b46f21fbe096b63510fff9007338744eaf8acd8.jpg'" alt />
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: "item",
  data() {
    return {};
  },
  components: {},
  props:['data','index'] //data是从父组件拿到的那一条数据
};
</script>
<style lang="less">
.itemBox {
  display: flex;
  border-bottom: 1px solid #eee;
  padding: 2vw 0;
  margin: auto;
  width: 90vw;
  .iconBox {
    width: 8vw;
  }
  .contentBox {
    width: 70vw;
    overflow-wrap: break-word;
  }
  .imgBox {
    width: 22vw;
    height: 18bw;
    border-radius: 10px;
    overflow: hidden;
    img {
      width: 100%;
      height: 10vh;
    }
  }
}
</style>
<template>
  <div class="vue-waterfall222">
    <div v-if="show" class="flex_item">
      <comTemp></comTemp>
    </div>
    <div v-if="show2" class="flex_item2">
      <comTemp2></comTemp2>
    </div>
    <div v-if="show3" class="flex_item3">
      <comTemp3></comTemp3>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
// import comTemp from './comTemp';
// import comTemp2 from './comTemp2';
// import comTemp3 from './comTemp3'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    comTemp3: () => import("./comTemp3"),
    comTemp2: () => import("./comTemp2"),
    comTemp: () => import("./comTemp")
  },
  props: {},
  data() {
    // 这里存放数据
    return {
      show: true,
      show2: true,
      show3: true,
      line: "h",
      items: [
        {
          index: 1,
          style: {
            background: "rgba(125,205,244,.5)"
          },
          width: this.itemWidth("60%"),
          height: 234
        },
        {
          index: 2,
          style: {
            background: "rgba(195,123,177,.5)"
          },
          width: this.itemWidth("20%"),
          height: 50
        },
        {
          index: 3,
          style: {
            background: "rgba(194,217,78,.5)"
          },
          width: this.itemWidth("80%"),
          height: 20
        },
        {
          index: 4,
          style: {
            background: "rgba(255,230,135,.5)"
          },
          width: this.itemWidth("20%"),
          height: 10
        },
        {
          index: 5,
          style: {
            background: "rgba(245,163,59,.5)"
          },
          width: this.itemWidth("30%"),
          height: 20
        },
        {
          index: 6,
          style: {
            background: "rgba(21,174,103,.5)"
          },
          width: this.itemWidth("50%"),
          height: 100
        }
      ],
      isBusy: false
    };
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
  // 方法集合
  methods: {
    reflowed: function() {
      this.isBusy = false;
    },
    itemWidth(val) {
      var str = val.replace("%", "") / 100;
      console.log("val: ", document.documentElement.clientWidth * str);
      return parseInt(document.documentElement.clientWidth * str);
    }
  }
};
</script>

<style lang='scss' type='text/css' scoped>
//@import url(); 引入公共css类
.vue-waterfall222 {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-align-content: flex-start;
  align-content: flex-start;
  .item-waterfall {
    word-wrap: break-word;
  }
}
.flex_item {
  width: 50%;
}
.flex_item2 {
  width: 20%;
}
.flex_item3 {
  width: 30%;
}
</style>

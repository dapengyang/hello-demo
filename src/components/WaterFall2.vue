<template>
  <grid-layout
    :layout="layout"
    :is-draggable="true"
    :is-resizable="false"
    :vertical-compact="true"
    :margin="[10, 10]"
    :use-css-transforms="true"
  >
    <grid-item
      v-for="item in layout"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :key="item.i"
      :minW='item.minW'
      :minH='item.minH'
      :style="item.style"
      @resized="resizedEvent"
      @moved="movedEvent"
    >
      <component :is="item.component"></component>
    </grid-item>
  </grid-layout>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import VueGridLayout from "vue-grid-layout";
// import comTemp2 from "./comTemp2";

// cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    comTemp2: () => import("./comTemp2"),
    comTemp: () => import("./comTemp"),
    comTemp3: () => import("./comTemp3"),
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  data() {
    // 这里存放数据
    return {
      layout: [
        //x:列，y：行，w：宽=n*colWidth， 最大12，h：高=n*rowHeight,默认150，i：id
        {
          x: 0, y: 0,  w: 12, h: 1,  i: "id6",  style: { background: this.colorRandom() },  tips: "精宸智云科技有限公司",  component: "comTemp" 
        },
        {
          x: 0,  y: 1,  w: 12,  h: 1,  i: "visitsNum",  style: { background: this.colorRandom() },  label: "访问数统计",  component: "comTemp2" 
        },
        {
          x: 0,  y: 2,  w: 2,  h: 4,  i: "id7",  style: { background: this.colorRandom() },  tips: "今日访客信息",  component: "comTemp2" 
        },
        {
          x: 2,  y: 2,  w: 10,  h: 1,  i: "id8",  style: { background: this.colorRandom() },  tips: "数量统计",  component: "comTemp3" 
        },
        {
          x: 2,  y: 3,  w: 5,  h: 1.5,  i: "id0",  style: { background: this.colorRandom() },  tips: "今日测温统计",  component: "comTemp" 
        },
        {
          x: 7,  y: 3,  w: 5,  h: 1.5,  i: "id1",  style: { background: this.colorRandom() },  tips: "累计测温",  component: "comTemp2" 
        },
        {
          x: 2.1,  y: 4,  w: 3.2,  h: 1.5,  i: "id2",  style: { background: this.colorRandom() },  tips: "今日测温",  component: "comTemp3" 
        },
        {
          x: 5.4,  y: 4,  w: 3.2,  h: 1.5,  i: "id5",  style: { background: this.colorRandom() },  tips: "累计测温饼图",  component: "comTemp2" 
        },
        {
          x: 8.7,  y: 4,  w: 3.2,  h: 1.5,  i: "id9",  style: { background: this.colorRandom() },  tips: "访问类型",  component: "comTemp2" 
        },
        {
          x: 0,  y: 5,  w: 2,  h: 3,  i: "id10",  style: { background: this.colorRandom() },  tips: "体温异常信息",  component: "comTemp2" 
        },
        {
          x: 2,  y: 5,  w: 10,  h: 1.5,  i: "id11",  style: { background: this.colorRandom() },  tips: "测温统计折线图",  component: "comTemp3" 
        },
        {
          x: 2,  y: 6,  w: 5,  h: 1.5,  i: "id12",  style: { background: this.colorRandom() },  tips: "机器人统计饼图",  component: "comTemp2" 
        },
        {
          x: 7,  y: 6,  w: 5,  h: 1.5,  i: "id13",  style: { background: this.colorRandom() },  tips: "访问人数折线图",  component: "comTemp2" 
        }
      ]
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
  beforeDestroy() {
    //销毁之前修改localstroage
    localStorage.getItem('homepage_layout',this.layout);
  }, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
  render: function(createElement) {
    return createElement();
  },
  // 方法集合
  methods: {
    colorRandom(){
      let r=parseInt(255*Math.random()),
        g=parseInt(255*Math.random()),
        b=parseInt(255*Math.random());
      return 'rgba('+r+','+g+','+b+',.5)';
    },
    movedEvent: function(i, newX, newY){
        console.log("MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
        localStorage.setItem('homepage_layout',JSON.stringify(this.layout));
    },
    resizedEvent: function(i, newH, newW, newHPx, newWPx){
        console.log("RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
    }
  }
};
</script>

<style lang='scss' type='tips/css' scoped>
//@import url(); 引入公共css类

</style>

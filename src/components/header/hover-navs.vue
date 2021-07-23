<template>
  <div>
    <div
      class="navs tac"
      id="hoverNavs"
      :class="{ hover: hover, navIntroduce: navIntroduce }"
      @mouseenter="hover = true"
    >
      <div
        class="nav"
        :class="{ active: item.url == activeNav }"
        v-for="(item,index) in navs"
        :key="item.url"
      >
        <el-image
          style="width: 100%; height: 100%"
          :src="item.background"
        ></el-image>
        <el-link class="nav-link" @click="clickNav(item)">
          <span class="nav-name">{{ index>1?name:item.name }}</span>
        </el-link>
      </div>
      <div class="triangleLeft tac" v-if="navs[0].url == activeNav">
        <el-image src="../../static/images/xinsu/sanjiao.png"></el-image>
      </div>
      <div class="triangleCenter tac" v-if="navs[1].url == activeNav">
        <el-image src="../../static/images/xinsu/sanjiao.png"></el-image>
      </div>
      <div class="triangleRight tac" v-if="navs[2].url == activeNav">
        <el-image src="../../static/images/xinsu/sanjiao.png"></el-image>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import $ from "jquery";
export default {
  data() {
    return {
      navs: [
        {
          name: "新苏集团",
          url: "/xs",
          background: "../../static/images/xinsu/xinsu.png",
        },
        {
          name: "数字工厂",
          url: "/hx",
          background: "../../static/images/xinsu/factory.png",
        },
        {
          name: "车间",
          url: "/productionLine",
          background: "../../static/images/xinsu/jichuangchang.jpg",
        },
      ],
      hover: false,
      navIntroduce: false,
      owner:""
    };
  },
  computed: {
    ...mapGetters(["activeNav"]),
    name(){
      if(this.owner==='huaxing'){
        return '华星车间'
      }else if(this.owner==='wuxijichuang'){
        return '无锡机床车间'
      }else{
        return '车间'
      }
    }
  },

  methods: {
    clickNav(item) {
      setTimeout(() => {
        this.$store
        .dispatch("nav/activeNav", item.url)
        .then(() => {
          this.$router.push({
            path: item.url,
            query:{owner:this.owner}
          });
        })
        .catch(() => {});
      }, 200);
    },
    getCompany(){
      let routePath=this.$route.path
      if(routePath==="/deviceDetails"){
         this.owner="wuxijichuang"
      }else{
        this.owner="huaxing"
      }
    },

    mouseLeave(el) {
      let w = document.body.offsetWidth;
      let h = document.body.offsetHeight;
      var that = this;
      // console.log(this.hover)
      if (this.hover) {
        if (
          el.clientX < w * 0.29 ||
          el.clientX > w * 0.71 ||
          el.clientY > h * 0.1
        ) {
          $("#hoverNavs").slideUp(300, function () {
            that.hover = false;
          });
        } else {
          $("#hoverNavs").slideDown(300);
        }
      } else {
        if (
          el.clientX < w * 0.29 ||
          el.clientX > w * 0.71 ||
          el.clientY > h * 0.02
        ) {
          $("#hoverNavs").slideUp(300, function () {
            that.hover = false;
          });
        } else {
          $("#hoverNavs").slideDown(300);
        }
      }
    },
  },
  created() {
    this.$store.dispatch("nav/activeNav", this.$route.path);
    if (this.$route.path == "/introduce") {
      this.navIntroduce = true;
    }
  },
  mounted() {
    window.addEventListener("mousemove", this.mouseLeave);
    const owner=this.$route.query.owner
    if(owner){
      this.owner=owner
    }else{
      this.getCompany()
    }
  },
  beforeDestroy() {
    window.removeEventListener("mousemove", this.mouseLeave);
  },
  watch: {
    activeNav(value) {
      if (value == "/introduce") {
        this.navIntroduce = true;
      }else{
         this.navIntroduce = false;
      }
    },
    '$route.query.owner'(val){
      if(val){
        this.owner=val
      }else{
        this.getCompany()
      }
    }
  },
};
</script>
<style lang="less" scpoped>
.navs {
  position: absolute;
  width: 3189px;
  height: 309px;
  cursor: pointer;
  margin-left: 2246px;
  z-index: 99999;

  &.hover {
    background-image: url("/static/images/xinsu/topbg.png");
    background-position: center;
    background-size: 100%;
    animation: go 0.3s 0s 1; /*声明动画*/
    /*定义动画*/
    @keyframes go {
      from {
        /*0%*/
        transform: translateY(-100px);
      }
      to {
        /*100%*/
        transform: translateY(0px);
      }
    }
    .nav {
      display: inline-block;
      border: 0px;
    }
    .triangle {
      display: block;
    }
  }
  .triangleLeft {
    position: relative;
    top: -100px;
    display: block;
    left: -15%;
  }
  .triangleCenter {
    position: relative;
    top: -100px;
    // display: none;
    display: block;
  }
  .triangleRight {
    position: relative;
    top: -100px;
    display: block;
    left: 15%;
  }
  .nav {
    width: 419px;
    height: 177px;
    display: inline-block;
    //opacity: 0.6;
    border: 1px solid #ffffff;
    display: none;
    &:not(:nth-of-type(3)) {
      margin-right: 57px;
    }
    &.active {
      width: 478px;
      height: 202px;
      opacity: 1;
      border: 1px solid #00ffff;
      .nav-name {
        /*display: none;*/
      }
      border: 0px;
      margin-top: 20px;
    }
    .nav-link {
      display: inline-block;
      width: 100%;
      height: 100%;
      position: relative;
      top: calc(-50% - 48px);
      z-index: 12;
    }
    .nav-name {
      display: inline-block;
      text-align: center;
      font-size: 48px;
      font-family: PingFang-SC;
      font-weight: 500;
      color: #ffffff;
    }
  }
}

.navIntroduce {
  padding-top: 36px;
}
</style>

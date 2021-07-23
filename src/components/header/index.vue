<template>
  <div class="header">
    <div class="left">
      <div class="logo" v-on:click="backToIntroduce()">
        <img src="../../../static/images/logo.png" />
      </div>
      <div class="left-content">
        <slot name="left" />
      </div>
    </div>
    <div class="center">
      <slot name="center" />
    </div>
    <div class="right">
      <div class="date">
        <p class="time">{{ time }}</p>
        <p class="day">{{ date }}</p>
      </div>
      <div class="weath">
        <com-weather></com-weather>
      </div>
    </div>
  </div>
</template>
<script>
import comWeather from "@/components/weather";
import moment from "moment";

export default {
  name: "common-header",

  components: {
    comWeather,
  },
  data() {
    return {
      time: null,
      date: null,
    };
  },
  mounted() {
    this.time = setInterval(() => {
      const [date, time] = moment().format("YYYY/MM/DD-HH:mm:ss").split("-");
      this.date = date;
      this.time = time;
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.time);
  },
  methods: {
    backToIntroduce() {
      if (this.$route.path != "/introduce") {
        //顶部菜单更新
        setTimeout(() => {
          this.$store
            .dispatch("nav/activeNav", "/introduce")
            .then(() => {
              this.$router.push({
                path: "/introduce",
              });
            })
            .catch(() => {});
        }, 200);
      }
    },
  },
};
</script>

<style lang="less">
.header {
  width: 7680px;
  height: 130px;
  box-sizing: border-box;
  padding: 0 130px 0 122px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;

  .left {
    flex: none;
    &::after{
      content: "";
      display: block;
      height: 0;
      clear:both;
      visibility: hidden;
    }
    .logo {
      width: 729px;
      height: 192px;
      margin: -31px 110px -31px -42px;
      float: left;
      display: inline-block;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .left-content {
      float: left;
    }
  }
  .center {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }
  .right {
    overflow: hidden;
    .date {
      float: left;
      padding-right: 80px;
      text-align: right;
      color: #ffffff;
      font-family: "SourceHanSansCN-Regular";
      font-weight: bold;
      .time {
        font-size: 60px;
        line-height: 45px;
        margin-bottom: 16px;
      }
      .day {
        font-size: 35px;
        line-height: 29px;
      }
    }
    .weath {
      float: right;
      padding-left: 81px;
      border-left: 3px solid #ffffff;
    }
  }
}
</style>


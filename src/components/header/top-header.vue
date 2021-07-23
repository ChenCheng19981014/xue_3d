<template>
  <div class="header-one">
    <div class="header">
      <div class="left">
        <div class="logo">
          <img
            src="../../../static/images/logo.png"
            v-on:click="backToIntroduce()"
          />
        </div>
        <div class="left-content">
          <div class="header-line" v-if="title"></div>
          <div class="header-title">{{ title }}</div>
          <!-- <slot name="center"/> -->
          <!-- <slot name="left" /> -->
        </div>
      </div>
      <div class="center">
        <!-- <slot name="center"/> -->
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
  </div>
</template>

<script>
import FitLayout from "../../components/fit-layout/fit-layout";

import comWeather from "@/components/weather";
import moment from "moment";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "Buildings",
  props: ["title"],
  components: {
    FitLayout,
    comWeather,
  },
  created() {},
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
    },
  },
};
</script>
<style lang="less" scoped>
.fit-box {
  position: relative;
  left: 0;
  top: 0;
}

.more-link {
  font-size: 46px;
  color: #fff;
}
.header {
  width: 7680px;
  height: 130px;
  line-height: 130px;
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
    overflow: hidden;
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
      padding-top: 20px;
      .header-line {
        width: 8px;
        height: 87px;

        border-left: 8px solid #ffffff;
        margin-right: 60px;
        display: inline-block;
      }
      .header-title {
        width: 739px;
        height: 82px;
        font-size: 110px;
        font-family: PangMenZhengDao;
        font-weight: 400;
        color: #fefefe;
        line-height: 90px;
        display: inline-block;
      }
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
      font-family: Orbitron;
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
.header-one {
  padding-bottom: 100px;
  position: absolute;
  left: 0;
  top: 100px;
}
</style>

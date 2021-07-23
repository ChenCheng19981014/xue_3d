<template>
  <div class="weather">
    <img class="img-weather" :src="weatherImg"/>
    <span>
      {{weatherLabel }} / <b>{{ `${temperature}` }}</b>℃
    </span>
  </div>
</template>

<script>
  import {getWeather} from "@/api/api";

  export default {
    name: "home-header",
    data() {
      return {
        weatherImg: require("../../../static/weather/01_0.png"),
        weatherLabel: "多云",
        temperature: 26
      };
    },
    computed: {
      name() {
        return this.$route.name;
      }
    },
    props: {},
    mounted() {
      this.loadWeather();
      this.timer=setInterval(this.loadWeather,1000*60*15)
    },
    beforeDestroy(){
      if(this.timer){
        clearInterval(this.timer);
        this.timer=null
      }
    },
    methods: {
      loadWeather() {
        getWeather({
          city: "CH190201",// 无锡
          key: "0i9lnmrkmq5jkc9o"
        }).then(res => {
          this.weatherImg = require(`../../../static/weather/${res.data.numtq}_0.png`);
          this.temperature = res.data.qw;
          this.weatherLabel = res.data.tq;
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .weather {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    font-family: "SourceHanSansCN-Regular";
    font-weight: 500;
    color: #FFFFFF;
    line-height: 87px;
    .img-weather {
      height: 87px;
    }
    span {
      margin-left: 33px;
      b {
        font-family: Orbitron;
        font-weight: bold;
      }
    }
  }
</style>

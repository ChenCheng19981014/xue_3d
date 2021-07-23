<template>
  <div  class="li-div" :style="{'height':height?`${height}px`:'auto'}">
    <vue-seamless-scroll :data="list" class="seamless-warp" >
      <li class="line-item" v-for="(item,index) in list">
        <span>{{formatIndex(index+1)}}</span>
        <span v-for="column in columns"
              :key="column.key+index"
        >
         {{ item[column.key]==null?  "-": item[column.key]}}
      </span>
      </li>
    </vue-seamless-scroll>
  </div>
</template>

<script>
  export default {
    name: "seamless-scroll-li",
    props: {
      columns: {
        type: Array,
        default() {
          return [];
        },
      },
      height: {
        type: Number,
      },
      list: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    methods: {
      formatIndex(index) {
        if (index === 1) {
          return "1st";
        } else if (index === 2) {
          return "2nd";
        } else if (index === 3) {
          return "3rd";
        } else {
          return index + "th";
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .li-div{
    margin-top: 12px;
    overflow-x: hidden;
    height: 100%;
    .seamless-warp {
      width: 100%;
      height: 100%;

      .line-item {
        width: 100%;
        height: 50px;
        border-radius: 25px 0px 0px 25px;
        padding-left: 48px;
        padding-right: 66px;
        box-sizing: border-box;

        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 52px;

        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        span:last-child{
          width: 33%;
          text-align: left;
        }
      }

      .line-item:first-child {
        border: 1px solid #FF4545;
        background: linear-gradient(90deg, rgba(255, 43, 43, 0.47) 0%, rgba(230, 80, 80, 0.32) 100%);
      }

      .line-item:nth-child(2) {
        border: 1px solid #FFB11B;
        background: linear-gradient(90deg, rgba(255, 123, 43, 0.47) 0%, rgba(230, 123, 80, 0.32) 100%);
      }

      .line-item:nth-child(3) {
        border: 1px solid #FF961B;
        background: linear-gradient(90deg, rgba(255, 176, 73, 0.47) 0%, rgba(180, 125, 40, 0.32) 100%);
      }

      .line-item:nth-child(n+3) {
        background: linear-gradient(-90deg, rgba(188, 205, 210, 0.15) 0%, rgba(187, 204, 209, 0.32) 100%);
      }
    }
  }

</style>

<template>
  <div class="tabs-div">
    <div class="tab-item" v-for="(item,index) in tabs" :key="index"
         :class="{active:selectTab===index+1}" @click="changeTabs(index+1)">
      {{tabs[index]}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "common-tabs1",
    props: {
      currentTab: {
        type: Number,
        default() {
          return 1
        }
      },
      tabs: {
        type: Array,
        default() {
          return []
        }
      },
    },
    data() {
      return {
        selectTab: 1,
      }
    },
    mounted() {
      this.selectTab = this.currentTab
    },
    methods: {
      changeTabs(tab) {
        if (this.selectTab !== tab) {
          this.selectTab = tab;
          this.$emit("changeTabs", tab)
        }
      },
    }
  }
</script>

<style scoped lang="less">
  @import "../../style/varient";

  .tabs-div {
    position: absolute;
    top: 45px;
    right: 62px;
    display: flex;

    .tab-item {
      width: 120px;
      height: 55px;
      background: url("../../../static/images/common/tab@120.png") no-repeat 0 0;
      background-size: 100% 100%;
      margin-right: 10px;

      text-align: center;
      font-size: @font-size-30;
      font-family: @font-family;
      font-weight: @font-weight-medium;
      color: @color-white;
      opacity: 0.6;
      line-height: 55px;
      cursor: pointer;

      &.active {
        width: 120px;
        height: 55px;
        background: url("../../../static/images/common/tab-active@120.png") no-repeat 0 0;
        background-size: 100% 100%;
        opacity: 1;
      }
    }

    .tab-item:last-child {
      margin-right: 0px;
    }
  }
</style>

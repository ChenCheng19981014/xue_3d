<template>
  <div class="common-card-two">
    <gradient-icon class="common-card-two-icon" :icon="icon" :theme="{form:'#D8EEF7',to:'#FFFFFF'}" :size="82"/>
    <div class="common-card-two-label">
      {{label}}
    </div>
    <div class="common-card-two-value" :class="{'value-red':type==='red','value-green':type==='green','value-yellow':type==='yellow'}">
      <span>{{value}}</span>
      <span class="common-card-two-unit">{{unit}}</span>
    </div>
  </div>
</template>

<script>
  import gradientIcon from '@/components/common-gradient/common-gradient-icon';

  export default {
    name: "common-card-two",
    components: {
      gradientIcon
    },
    props: {
      label: {type: [String,Number]},
      value: {type: [String,Number]},
      type: {type: [String,Number]},
      icon: {type: [String,Number]},
      unit: {type: [String,Number]}
    }
  }
</script>

<style lang="less" scoped>
  .common-card-two {
    height: 225px;
    min-width: 789px;
    background: url('../../../static/images/enterprise/zhibioa.png') top left no-repeat;
    background-size: 789px 225px;
    position: relative;
    left: 0;
    top: 0;

    &-icon {
      position: absolute;
      top: 71px;
      left: 71px;
    }

    &-label {
      padding-left: 265px;
      font-size: 60px;
      font-family:
PingFang-SC;
      font-weight: bold;
      color: rgba(255, 255, 255, 0.75);
      line-height: 201px;
      padding-top: 24px;
    }

    &-value {
      position: absolute;
      left: 581px;
      top: 0;
      font-size: 0;
      white-space: nowrap;
      color: #FFFFFF;
      &.value-red {
        color: #FC1A38;
      }

      &.value-green {
        color: #5CFD9D;
      }
      &.value-yellow{
        color: #EEBD64;
      }
      span {
        font-size: 82px;
        font-family: PangMenZhengDao;
        font-weight: 400;
        line-height: 103px;
        vertical-align: text-bottom;
      }

      span.common-card-two-unit {
        font-size: 60px;
      }
    }
  }
</style>

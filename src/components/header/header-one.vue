<template>
    <div class="header-one">
    <common-header>
        <span class="page-name" v-if="pageName" slot="left">{{pageName}}</span>
      <common-navs :active-nav="title" :navs="navs"  @changeTab="changeTab"  slot="left"/>
    </common-header>
  </div>
</template>
<script>
import commonHeader from './index';
import commonNavs from './common-navs';
export default {
  components: {
    commonHeader,
    commonNavs
  },
  props: {
    title: { type: String },
      pageName:{type:String},
    navs: {
      type: Array,
      default: function () {
        return []
      }
    },
  },
  data () {
    return {
    }
  },
  methods: {
    changeTab(nav) {
      this.$emit('changeTab', nav)
    }
  }
}
</script>
<style lang="less" scoped>
  .header-one {
    padding-bottom: 100px;
    position: absolute;
    left: 0;
    top: 100px;
    z-index: 3;
      .page-name{
          font-size: 110px;
          font-family: PangMenZhengDao;
          font-weight: 400;
          color: #FEFEFE;
          line-height: 87px;
          display: inline-block;
          float: left;
          padding: 0 100px 0 60px;
          border-left: 8px solid #ffffff;
          margin-top: 20px;
      }
  }
</style>

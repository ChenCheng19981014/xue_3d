<template>
  <div class="common-navs">
    <card
      class="nav"
      :theme="item.name===activeNav?'#1BA6FF':''"
      :border-style="item.name===activeNav?{background:'linear-gradient(0deg, rgba(61, 203, 255, 0.6) 0%, rgba(48, 204, 255, 0) 100%)',boxShadow:'0px 0px 20px 10px rgba(61, 203, 255, 0.8) inset'}:{}"
      v-for="item in navs"
      :key="item.url"
    >
      <!--      <router-link class="nav-link" :to="item.url" @click.native="flushView">-->
      <div class="nav-name" @click="changeTab(item.name)">{{item.name}}</div>
      <!--      </router-link>-->
      <div class="drop-menu-list-bg"></div>
    </card>
  </div>
</template>
<script>
  import card from '@/components/common-card/common-card-one-hover'

  export default {
    props: {
      navs: {type: Array, default: []},
      activeNav: {type: String}
    },
    components: {
      card
    },
    methods: {
      changeTab(nav) {
        this.$emit('changeTab', nav)
      }
    }
  }
</script>
<style lang="less" scoped>
.drop-menu-list-bg {
    position: absolute;
    width:500px;
    height:100%;
    background: #1b3258;
    z-index: -10;
    top:0px;
    opacity: 0.4;
    -webkit-filter: blur(0px);
  }
  .common-navs {
    font-size: 0;

    .nav {
      margin-right: 121px;
      display: inline-block;

      .nav-link {
        display: inline-block;
      }

      .nav-name {
        display: inline-block;
        width: 500px;
        height: 130px;
        text-align: center;
        font-size: 60px;
        font-family:
PingFang-SC;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 118px;
        cursor: pointer;
        z-index: 11;
      }
    }
  }
</style>

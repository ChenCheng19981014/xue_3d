<template>
  <div class="common-navs">
    <card
      class="nav"
      :theme="item.name===activeNav?'#1BA6FF':'rgba(217, 240, 255, 0.8)'"
      :border-style="item.name===activeNav?{background:'linear-gradient(0deg, rgba(61, 203, 255, 0.6) 0%, rgba(48, 204, 255, 0) 100%)',boxShadow:'0px 0px 20px 10px rgba(61, 203, 255, 0.8) inset'}:{}"
      v-for="item in navs"
      :key="item.url"
    >
      <!--      <router-link class="nav-link" :to="item.url" @click.native="flushView">-->
      <div class="nav-name" @click="changeTab(item.name)">{{item.name}}</div>
      <div class="nav-shadow" v-if="item.name===activeNav"></div>
      <!--      </router-link>-->
    </card>
  </div>
</template>
<script>
  import card from '@/components/common-card/common-card-one'

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

  .common-navs {
    font-size: 0;
    white-space: nowrap;
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
        z-index: 2;
      }
      .nav-shadow{
        box-shadow: 0 0 100px 15px rgba(61, 203, 255, 0.5);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height:100%;
        border-radius: 60px 0 60px 0;
        z-index: 1;
      }
    }
  }
</style>

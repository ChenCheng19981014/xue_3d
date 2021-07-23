<template>
  <div class="com_base">
    <span>{{name}}</span><i :class="color"><u>{{title1}}</u><br>{{title2}}</i>
  </div>
</template>
<script>
  export default {
    props: {
      name: {type: String, default: ''},
      title1: {type: String, default:''},
      title2:{type:String, default:''},
      color:{type:String, default:''},
    }
  }
</script>

<style scoped lang="less">
.com_base{
  span{
    float: left;
    width: 90px;
    margin-left: 15px;
    height: 82px;
    line-height: 82px;
    text-align: center;
    border-right:1px solid #A0A0A0;
  }
  i{
    float: right;
    width: 77px;
    height: 52px;
    text-align: center;
    font-weight: bold;
    font-size: 12px;
    padding-top: 25px;
    margin-right: 40px;
    u{
      font-size: 18px;
      font-family: "ORBITRON-BOLD";
      font-style: normal;
      text-decoration: none;
    }
  }
  i.green{
    background: url(../../../static/images/dep/greenc.png) no-repeat;
    background-size: 100% 100%;
    color: #34FF5A;
  }
  i.red{
    background: url(../../../static/images/dep/redc.png) no-repeat;
    background-size: 100% 100%;
    color: #FF4B4B;
  }
  i.yellow{
    background: url(../../../static/images/dep/yellowc.png) no-repeat;
    background-size: 100% 100%;
    color: #FFD765;
  }
  i.blue{
    background: url(../../../static/images/dep/bluec.png) no-repeat;
    background-size: 100% 100%;
    color: #1AB1FF;
  }
}
</style>


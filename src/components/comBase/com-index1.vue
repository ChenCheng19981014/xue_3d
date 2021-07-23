<template>
  <div class="com_base">
    <span>{{name}}</span>
    <i :class="[color, title2.length === 0 ? 'arrow' : '']">
      <u>{{title1}}</u>
      <br>
      {{title2}}
    </i>
  </div>
</template>
<script>
  export default {
    props: {
      name: {type: String, default: ''},
      title1: {type: [String, Number], default:0},
      title2:{type:String, default:''},
      color:{type:String, default:''},
    }
  }
</script>

<style scoped lang="less">
.com_base{
  span{
    float: left;
    width: 251px;
    height: 24px;
    background: url(../../../static/images/dep/line.png) no-repeat bottom left;
    padding: 10px 0;
    margin-top: 30px;
    padding-left: 22px;
  }
  i{
    float: right;
    width: 114px;
    height: 75px;
    text-align: center;
    font-weight: bold;
    font-size: 12px;
    padding-top: 40px;
    u{
      font-size: 24px;
      font-family: "ORBITRON-BOLD";
      font-style: normal;
      text-decoration: none;
    }
  }
  i.arrow {
    position: relative;
    &::before {
      content: '';
      position: absolute;
      bottom: 36px;
      left: 50%;
      height: 5px;
      width: 5px;
      border-top: 2px solid;
      border-left: 2px solid;
      transform: rotate(45deg);
      transform-origin: left top;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: 30px;
      left: 50%;
      height: 5px;
      width: 5px;
      border-top: 2px solid;
      border-left: 2px solid;
      transform: rotate(45deg);
      transform-origin: left top;
    }
  }
  i.green{
    background: url(../../../static/images/dep/greenc.png) no-repeat;
    color: #34FF5A;
  }
  i.red{
    background: url(../../../static/images/dep/redc.png) no-repeat;
    color: #FF4B4B;
  }
  i.yellow{
    background: url(../../../static/images/dep/yellowc.png) no-repeat;
    color: #FFD765;
  }
  i.blue{
    background: url(../../../static/images/dep/bluec.png) no-repeat;
    color: #25ACFF;
  }
}
</style>


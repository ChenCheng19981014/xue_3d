<template>
    <div class="circle-gauge-one" :class="{'type-white':type==='white','type-blue':type==='blue'}" @dblclick="$emit('dblclick')">
        <div class="circle-gauge-one-bg">
            <div class="circle-gauge-one-content">
                <gradient-text class="circle-gauge-one-value" :content="`${value}`" :theme="theme" :font-size="valueFontSize" :line-height="valueLineHeight"/>
                <br/>
                <gradient-text v-if="unit" class="circle-gauge-one-unit" :content="unit" :theme="theme" :font-size="unitFontSize" :line-height="unitLineHeight"/>
            </div>
        </div>
        <div class="circle-gauge-one-label" v-if="name" :style="nameStyle">{{name}}</div>
    </div>
</template>

<script>
	import gradientText from '@/components/common-gradient/common-gradient-text';
	export default {
		name: "circle-gauge-one",
		components:{
			gradientText,
        },
        props:{
			name:{type:String},
	        nameStyle:{type:Object,default:()=>({})},
            unit:{type:String},
	        unitFontSize:{type:Number,default:48},
	        unitLineHeight:{type:Number,default:84},
            value:{type:[String, Number]},
            valueFontSize:{type:Number,default:72},
            valueLineHeight:{type:Number,default:108},
            type:{type:String,default:'white'},
        },
        computed:{
			theme(){
				return this.type==='blue'?{from:'#25AAFF',to:'#A5E6FF'}:{from:'#A7DAEB',to:'#D8EEF7'}
            }
        }
	}
</script>

<style lang="less" scoped>
    .circle-gauge-one{
        width:440px;
        text-align: center;
        &-bg{
            width:100%;
            padding: 50% 0;
            background: center no-repeat;
            background-size: 100% auto;
            box-sizing: border-box;
            position: relative;
            left: 0;
            top: 0;
            .circle-gauge-one-content{
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                text-align: center;
                .circle-gauge-one-value{
                    font-family: PangMenZhengDao;
                    font-weight: 400;
                }
                .circle-gauge-one-unit{
                    font-family: PingFang-SC;
                    font-weight: 500;
                }
            }
        }
        &.type-white{
            .circle-gauge-one-bg{
                background-image: url('../../../static/images/product/circle-white.png');
            }
        }
        &.type-blue{
            .circle-gauge-one-bg{
                background-image: url('../../../static/images/product/circle-blue.png');
            }
        }
        &-label{
            font-size: 48px;
            font-family: PingFang-SC;
            font-weight: bold;
            color: #FFFFFF;
            line-height: 106px;
        }
    }
</style>

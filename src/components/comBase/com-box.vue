<template>
    <div :class="{'card-two-box':scale&&show}" @dblclick.stop="show=true" @click.stop="show=false" >
        <div class="card-two"
             :style="{
         width:width&&`${width}px`,
         height:height&&`${height}px`,
         left:scale&&show?'50%':(left&&`${left}px`),
         right:scale&&show?undefined:(right&&`${right}px`),
         transform: scale&&show?`translate(-50%,-50%) scale(${scale})`:undefined,
         top:scale&&show?'50%':(top&&`${top}px`),
         bottom:scale&&show?undefined:(bottom&&`${bottom}px`),
         border:border?'1px solid rgba(255,255,255,0.4)':'none',
         background:background?`rgba(0, 0, 0, ${opacity})`:'none',
          boxShadow:scale&&show?'0 0 50px rgb(255, 223, 5, 0.6)':undefined
         }"
             @click.stop="()=>{}"
        >
            <i class="card-two-bg" :style="{width:width&&`${width-2}px`,
         height:height&&`${height-2}px`}"></i>
            <div class="title" v-if="title">
                <div class="title-content">
                    <span>{{title}}</span>
                    <div class="rightText">
                        <slot name="right"></slot>
                    </div>
                </div>
                <div class="line"></div>
            </div>
            <div class="content">
                <slot/>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: "common-card-two",
        props:{
			title:{type:String,default:''},
            top:{type:Number},
            right:{type:Number},
            left:{type:Number},
            bottom:{type:Number},
            width:{type:Number},
            height:{type:Number},
            border:{type:Boolean,default:true},
            background:{type:Boolean,default:true},
            opacity:{type:Number,default:0.7},
            scale:{type:Number,default:0}
        },
        data(){
			return {
				show:false
            }
        }
	}
</script>

<style lang="less" scoped>
    .card-two-box{
        width: 7680px;
        height: 3240px;
        position: absolute;
        z-index: 99999999;
        left: 0;
        right: 0;
    }
    .card-two{
        position: absolute;
        transform-origin: center center;
        transition: all 0.2s ease;

        .card-two-bg{
            display: inline-block;
            position: absolute;
            backdrop-filter: saturate(180%) blur(20px);
            top: 1px;
            left: 1px;
            z-index: -1;
        }
        .title{
            padding: 22px 50px 0 75px;
            height: 129px;
            box-sizing: border-box;
            &-content{
                span{
                    font-size: 58px;
                    font-family:
PingFang-SC;
                    font-weight: 500;
                    color: #FFFFFF;
                    line-height:106px;
                }
                &::before{
                    display: inline-block;
                    content: '';
                    width: 8px;
                    height: 48px;
                    background: rgba(255,255,255,0.5);
                    vertical-align: text-bottom;
                    margin-right: 30px;
                    margin-left: 11px;
                }
            }
            .rightText{
               position: absolute;
               top: 22px;
               right: 13px;
               height: 50px;
            }
            .line{
                height: 1px;
                background-color: #ffffff;
                position: relative;
                top: 0;
                left: 0;
                margin-left: 13px;
                margin-right: 120px;
                &::before{
                    display: inline-block;
                    content: '';
                    width: 11px;
                    height: 11px;
                    border: 1px solid #ffffff;
                    position: absolute;
                    left: -13px;
                    top: -6px;
                }
                &::after{
                    display: inline-block;
                    content: '';
                    width: 120px;
                    height: 3px;
                    background: #FFFFFF;
                    position: absolute;
                    right: -120px;
                    bottom: 0;
                }
            }
        }
    }
</style>

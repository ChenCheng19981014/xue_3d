<template>
    <div :class="{'com_base-box':scale&&show}" @dblclick.stop="show=true" @click.stop="show=false">
        <div class="com_base"
             :style="{
       width:width&&`${width}px`,
         height:height&&`${height}px`,
         left:scale&&show?'50%':(left&&`${left}px`),
         right:scale&&show?undefined:(right&&`${right}px`),
         transform: scale&&show?`translate(-50%,-50%) scale(${scale})`:undefined,
         top:scale&&show?'50%':(top&&`${top}px`),
         boxShadow:scale&&show?'0 0 50px rgb(255, 223, 5, 0.6)':undefined
         }"
             @click.stop="()=>{}"
        >
            <i class="com_base_bg" :style="{background: `rgba(0, 0, 0, ${colorOpacity}`,opacity:opacity}"></i>
            <div class="title-div" v-show="title!==''">
                <div class="vertical-line"></div>
                <div class="title">{{title}}</div>
            </div>
            <div class="split-line"></div>
            <slot></slot>
        </div>
    </div>
</template>
<script>
	export default {
		props: {
			opacity: {type: Number, default: 0.4},
			colorOpacity: {type: Number, default: 0.6},
			width: {type: Number, default: 0},
			height: {type: Number, default: 0},
			left: {type: Number, default: 0},
			top: {type: Number, default: 0},
			title: {type: String, default: ""},
			right: {type: Number, default: 0},
			scale: {type: Number, default: 0}
		},
		data() {
			return {
				show: false
			}
		}
	}
</script>

<style scoped lang="less">
    @import "../../style/varient";

    .com_base-box {
        width: 7680px;
        height: 3240px;
        position: absolute;
        z-index: 99999999;
        left: 0;
        right: 0;
    }

    .com_base {
        position: absolute;
        transform-origin: center center;
        transition: all 0.2s ease;

        .com_base_bg {
            backdrop-filter: saturate(180%) blur(20px);
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            border: 1px solid #ffffff;
        }

        .title-div {
            position: absolute;
            left: 61px;
            top: 40px;
            margin-bottom: 18px;
            display: flex;
            align-items: center;

            .vertical-line {
                width: 8px;
                height: 48px;
                background: rgba(255, 255, 255, 0.5);
                margin-right: 30px;
            }

            .title {
                font-size: @font-size-60;
                font-family: @font-family;
                font-weight: @font-weight-medium;
                color: @color-white;
                line-height: 57px;
            }
        }

        .split-line {
            position: absolute;
            top: 115px;
            left: 50px;
            width: 1271px;
            height: 13px;
            background: url("../../../static/images/common/split-line-@1380.png") no-repeat 0 0;
            background-size: 100% 100%;
        }
    }
</style>


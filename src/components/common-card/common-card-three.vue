<template>
    <div class="card-three-box" @dblclick="$emit('dblclick')">
        <div class="card-three" :style="{backgroundColor: bgColor,borderColor:borderColor}">
            <div class="card-three-header" :class="{'high-light':highLight}">

                <gradient-icon :icon="icon" :theme="theme" :size="86"/>
                <div class="card-data">
                    <gradient-text class="data" :content="value" :theme="theme" :font-size="72" :line-height="72"/>
                    <br v-if="lineBreak"/>
                    <gradient-text :content="unit" :theme="theme" :font-size="40" :line-height="40"/>
                    <gradient-icon class="trend" v-if="!lineBreak&&trend==='up'" icon="icon-shangsheng" :theme="theme"
                                   :size="40"/>
                    <gradient-icon class="trend" v-if="!lineBreak&&trend==='down'" icon="icon-xiajiang" :theme="theme"
                                   :size="40"/>
                </div>
            </div>
            <div class="card-three-footer" :class="{'high-light':highLight}">
                <div class="label">{{label}}</div>
                <gradient-icon class="trend" v-if="lineBreak&&trend==='up'" icon="icon-shangsheng" :theme="theme"
                               :size="40"/>
                <gradient-icon class="trend" v-if="lineBreak&&trend==='down'" icon="icon-xiajiang" :theme="theme"
                               :size="40"/>
            </div>
        </div>
    </div>
</template>

<script>
	import gradientIcon from '@/components/common-gradient/common-gradient-icon';
	import gradientText from '@/components/common-gradient/common-gradient-text';

	export default {
		name: "common-card-three",
		components: {
			gradientIcon,
			gradientText
		},
		props: {
			icon: {type: String, default: ''},
			theme: {type: Object, default: () => ({from: '#A7DAEB', to: '#FFFFFF'})},
			highLight: {type: Boolean, default: true},
			trend: {type: String},
			lineBreak: {type: Boolean, default: true},
			unit: {type: String, default: ''},
			value: {type: String},
			label: {type: String},
			bgColor:{type: String, default: 'rgba(255, 255, 255, 0.2)'},
			borderColor:{type: String, default: 'rgba(255, 255, 255, 0.3)'},
		}
	}
</script>

<style lang="less" scoped>
    .card-three-box{
        background-color: rgba(0,0,0,0.5);
        width: 650px;
        height: 308px;
        backdrop-filter: saturate(180%) blur(20px);
    }
    .card-three {
        width: 100%;
        height: 100%;
        border-left: 10px solid ;
        padding: 53px 55px 40px 45px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;

        .card-three-header {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            opacity: 0.7;

            &.high-light {
                opacity: 1;
            }

            .card-data {
                text-align: right;

                .data {
                    font-family: PangMenZhengDao;
                    font-weight: 400;
                }

                .trend {
                    margin-left: 49px;
                    vertical-align: text-bottom;
                }
            }
        }

        .card-three-footer {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            opacity: 0.7;

            &.high-light {
                opacity: 1;
            }

            .label {
                font-size: 48px;
                line-height: 48px;
                font-family: PingFang-SC;
                font-weight: 500;
                color: rgba(255, 255, 255, 0.7);
            }
        }


    }
</style>

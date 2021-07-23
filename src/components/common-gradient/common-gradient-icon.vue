<template>
    <div class="common-gradient-icon">
        <div
                class="iconfont"
                :class="icon"
                :style="{
                 '--color':theme.to,
                  color:theme.from,
                  fontSize:size+'px',
                  lineHeight:size+'px'
                 }"
        />
    </div>

</template>

<script>
	export default {
		name: "common-gradient-icon",
        props:{
	        theme: { type: Object, default: () => ({ from: '#A7DAEB', to: '#FFFFFF' }) },
            size:{type:Number,default:16},
	        icon: { type: String, default: '' },
        }
	}
</script>

<style lang="less" scoped>

    .common-gradient-icon{
        font-size: 0;
        display: inline-block;
        /deep/ .iconfont {
            position: relative;
            top: 0;
            left: 0;
            z-index: 1;
            &::after {
                font-size: var(font-size);
                line-height: var(line-height);
                display: block;
                content: attr(data-text);
                position: absolute;
                top: 0;
                left: 0;
                z-index: 2;
                color: var(--color);
                mask: linear-gradient(to bottom, var(--color), transparent);
            }
            &.icon-geological-pulldown {
                &::after {
                    content: "\e607";
                }
            }
            &.icon-renshi{
                &::after {
                    content: "\e834";
                }
            }
            &.icon-icon1 {
                &::after {
                    content: "\e605";
                }
            }
            &.icon-caiwu2 {
                &::after {
                    content: "\e600";
                }
            }
            &.icon-shangsheng {
                &::after {
                    content: "\e60d";
                }
            }
            &.icon-xiajiang {
                &::after {
                    content: "\e752";
                }
            }
            &.icon-yueduwanchengshuai {
                &::after {
                    content: "\e718";
                }
            }

            &.icon-gangcaizhonglei {
                &::after {
                    content: "\e601";
                }
            }

            &.icon-gongzhuangguanli {
                &::after {
                    content: "\e60f";
                }
            }

            &.icon-fengxian {
                &::after {
                    content: "\e667";
                }
            }

            &.icon-fahuo {
                &::after {
                    content: "\e606";
                }
            }

            &.icon-huanbi {
                &::after {
                    content: "\e618";
                }
            }

            &.icon-qiye {
                &::after {
                    content: "\e62e";
                }
            }

            &.icon-shidu {
                &::after {
                    content: "\e60c";
                }
            }

            &.icon-zhiliang {
                &::after {
                    content: "\e64f";
                }
            }

            &.icon-gongnengdingyi {
                &::after {
                    content: "\e69d";
                }
            }

            &.icon-tongbi {
                &::after {
                    content: "\e72d";
                }
            }

            &.icon-guizeguifanjilv {
                &::after {
                    content: "\e663";
                }
            }

            &.icon-baojingjingbao-2 {
                &::after {
                    content: "\e61d";
                }
            }

            &.icon-zhizao {
                &::after {
                    content: "\e879";
                }
            }
            &.icon-two-people {
              &::after {
                content: "\e87a";
              }
            }
          &.icon-three-people {
              &::after {
                content: "\e602";
              }
            }
          &.icon-shebei1 {
              &::after {
                content: "\e64b";
              }
            }
          &.icon-nenghao {
              &::after {
                content: "\e7a5";
              }
            }
        }
    }

</style>

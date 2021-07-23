<template>
  <div class="common-tabs-list" :class="{'common-tabs-column':direction==='column','common-tabs-row':direction==='row'}">
        <div
        v-for="(item, index) in listData"
        :key="item.value"
        :data-index="index"
        class="tab-item"
        :class="{active:index === active}"
        @click="onClickTab">
            <div class="tab-item-content" :data-index="index" :style="{fontSize:fontSize+'px',lineHeight:fontSize+'px',[direction==='column'?'width':'height']:fontSize+'px'}">
                {{item.name}}
            </div>
            <i class="tab-item-right-i" :data-index="index"></i>
        </div>
  </div>
</template>

<script>
export default {
    props: {
        listData: {type:Array,default:()=>[]},
	    fontSize:{type:Number,default:30},
	    direction:{type:String,default:'row'},
	    active:{type:Number},
    },
    methods: {
        onClickTab(e) {
        	const {index}=e.target.dataset;
            this.$emit('update:active',parseFloat(index));
            this.$emit('change',parseFloat(index))
        }
    }
}
</script>

<style lang="less" scoped>
    .common-tabs-list {
        display: flex;
        flex-wrap: nowrap;
        justify-content:stretch;
        align-items: stretch;
        .tab-item{
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            top:0;
            left:0;
            @size:17px;
            border: 1px solid rgba(255,255,255,0.6);
            box-sizing: border-box;
            clip-path: polygon(
                    0 0,
                    100% 0,
                    100% calc(100% - @size),
                    calc(100% - @size) 100%,
                    0 100%,
                    0 0
            );
            cursor: pointer;

            &-content{
                color: rgba(255,255,255,0.6);
                font-weight: 500;
                font-family: PingFang-SC;
            }
            &-right-i{
                display: block;
                width: 0;
                height: 0;
                border: @size/2+1 solid;
                border-color: transparent rgba(255,255,255,0.6) rgba(255,255,255,0.6) transparent ;
                position: absolute;
                right: 0;
                bottom: 0;
            }
            &.active{
                border-width: 2px;
                background: linear-gradient(0deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%);
                border-color: #ffffff;
                .tab-item-content{
                    color:#ffffff
                }
                .tab-item-right-i{
                    border-color: transparent #ffffff #ffffff transparent ;
                }
            }

        }

        &.common-tabs-row{
            height: 73px;
            flex-direction: row;
            .tab-item{
                flex-direction: row;
            }
        }
        &.common-tabs-column{
            width: 73px;
            flex-direction: column;
            .tab-item{
                flex-direction: column;
            }
        }
    }
</style>

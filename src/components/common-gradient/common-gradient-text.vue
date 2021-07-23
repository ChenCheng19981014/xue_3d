<template>
    <span
            class="common-gradient-text"
            :data-text="content"
            :style="{
                      '--color':theme.to,
                      color:theme.from,
                      height:lineHeight+'px',
                      '--size':fontSize+'px',
                      '--height':lineHeight+'px',
                 }"
    >
          <span :style="{fontSize:fontSize+'px',
                      lineHeight:lineHeight+'px'}">
             {{content}}
          </span>
        </span>
</template>

<script>
	export default {
		name: "common-gradient-text",
		props: {
			theme: {type: Object, default: () => ({from: '#A7DAEB', to: '#FFFFFF'})},
			fontSize: {type: Number, default: 16},
			lineHeight: {type: Number, default: 20},
			content: {type: String}
		}
	}
</script>

<style lang="less" scoped>
    .common-gradient-text {
        display: inline-block;
        font-size: 0;
        position: relative;
        top: 0;
        left: 0;
        z-index: 1;

        &::after {
            font-size: var(--size);
            line-height: var(--height);
            height: 100%;
            display: block;
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
            color: var(--color);
            mask: linear-gradient(to bottom, var(--color), transparent);
        }

        span {
            font-size: 40px;
            line-height: 40px;
        }
    }
</style>

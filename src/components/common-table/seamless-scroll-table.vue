<template>
  <div class="list-div" :style="{'height':height?`${height}px`:'auto'}">
    <li class="list-header">
      <span
        v-for="column in columns"
        :key="column.key"
        :style="{
          width: column.width,
          flex: column.width == null ? 1 : 'none',
        }"
      >{{ column.title || column.label }}</span
      >
    </li>
    <vue-seamless-scroll :data="list" class="seamless-warp">
      <li v-for="(item,index) in list" @click="onSelectRow(item,index)" :class="{active:selectedIndex===index}">
        <div
          v-for="column in columns"
          class="line-item"
          :style="{
              width: column.width,
              flex: column.width == null ? 1 : 'none',
            }"
          :key="column.key"
        >
          <slot
            :name="`column-${column.key}`"
            :column="column"
            :item="item"
            :index="index"
          >
              <span>
                {{ item[column.key]==null?  "-": item[column.key]}}
              </span>
          </slot>
        </div>
      </li>
    </vue-seamless-scroll>
  </div>
</template>

<script>
  export default {
    name: "seamless-scroll-table",
    props: {
      columns: {
        type: Array,
        default() {
          return [];
        },
      },
      height: {
        type: Number,
      },
      list: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    data() {
      return {
        selectedIndex: -1,
      }
    },
    methods: {
      onSelectRow(item, index) {
        this.selectedIndex = index;
        this.$emit("onSelectRow", {
          item,
          index
        });
      },
    },
  }
</script>

<style scoped lang="less">
  @import "../../style/varient";

  .list-div {
    margin-top: 12px;
    overflow-x: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;

    .list-header {
      font-size: @font-size-30;
      font-family: @font-family;
      font-weight: @font-weight-medium;
      color: @color-white;
      line-height: 70px;
      display: flex;
      flex-direction: row;

      > span {
        flex: 1;
        margin-right: 6px;
        background: rgba(255, 255, 255, 0.2);
        height: 70px;
        padding-left: 19px;
        box-sizing: border-box;
      }

      span:last-child {
        margin-right: 0px;
      }
    }

    .seamless-warp {
      width: 100%;
      overflow-x: hidden;

      li {
        font-size: @font-size-30;
        font-family: @font-family;
        font-weight: @font-weight-medium;
        color: @color-white;
        line-height: 100px;
        border-bottom: 1px solid @color-white;
        display: flex;
        flex-direction: row;
        cursor: pointer;

        &.active {
          background: rgba(27, 166, 255, 0.3);
        }

        .line-item {
          flex: 1;
          display: inline-block;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          margin-right: 6px;
          padding-left: 19px;
          box-sizing: border-box;
        }

        .line-item:last-child {
          margin-right: 0;
        }
      }

    }
  }
</style>

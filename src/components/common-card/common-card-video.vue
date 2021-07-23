<template>
  <el-dialog
    :visible.sync="videoInfo.isShow"
    width="30%"
    :show-close="false"
    :modal="false"
    @closed="handleDialogClosed"
    center
    class="common-card-video-box"
  >
    <div slot="title" class="dialog-banner-title">
      <div class="dialog-banner"></div>
      <div class="dialog-title">{{videoInfo.title}}</div>
      <div class="dialog-cancel" @click="videoInfo.isShow = false">
        <i class="el-icon-close"></i>
      </div>
    </div>

    <div class="dialog-video-body">
      <div class="video-list">
        <div
          v-for="(item, index) in videoLists"
          :key="index"
          :class="['video-line', currentIndex == index ? 'selected' : '']"
          @click="changeBg(index)"
        >
          <div class="video-name">{{ item.comment }}</div>
          <!-- <div class="under-line"></div> -->
        </div>
      </div>
      <div class="video-play">
        <VideoPlay
          :src="videoUrl"
          :poster="poster"
          style="margin-top: 37px"
        ></VideoPlay>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import VideoPlay from "@/components/video-play/video-player1";
import { mapMutations,mapGetters } from "vuex";
export default {
  name: "",
  props: {
    videoInfo: Object,
  },
  components: {
    VideoPlay,
  },
  data() {
    return {
      currentIndex: 0,
      videoUrl: "",
      videoLists: [],
      // ../../../../../static/images/prodMonitor/video-poster.png
      poster: "../../../static/images/prodMonitor/video-poster.png",
    };
  },
  methods: {
    changeBg(index) {
      this.currentIndex = index;
      this.videoUrl = this.videoLists[index].flv;
      if (this.videoInfo.title == "实时监控") {
        this.setVideoIndex(index);
      } else if (this.videoInfo.title == "原料仓库实时监控") {
        this.setRawMaterialIndex(index);
      } else if (this.videoInfo.title == "成品仓库实时监控") {
        this.setProductIndex(index)
      } else if (this.videoInfo.title == "在制品仓库实时监控") {
        this.setProductingIndex(index)
      }
    },
    handleDialogClosed() {
      if (this.videoInfo.title == "实时监控") {
        this.setVideoDialogShow(false);
      } else if (this.videoInfo.title == "原料仓库实时监控") {
        this.setRawMaterialsShow(false);
      } else if (this.videoInfo.title == "成品仓库实时监控") {
        this.setProductShow(false);
      }else if (this.videoInfo.title == "在制品仓库实时监控") {
        this.setProductingShow(false);
      }
    },
    ...mapMutations({
      setVideoDialogShow: "hxFactory/setVideoDialogShow",
      setRawMaterialsShow: "store/setRawMaterialsShow",
      setProductShow: "store/setProductShow",
      setProductingShow: "store/setProductingShow",
      setRawMaterialIndex: "store/setRawMaterialIndex",
      setProductIndex: "store/setProductIndex",
      setProductingIndex: "store/setProductingIndex",
      setVideoIndex: "hxFactory/setVideoIndex",
    }),
  },
  watch: {
    videoInfo(value) {
      console.log(value);
      this.videoLists = value.videoList;
      this.videoUrl = value.videoList[value.index].flv;
    },
  },
};
</script>

<style>
.el-dialog__wrapper {
  height: 3240px;
  z-index: 88888888 !important;
}

#app .common-card-video-box .el-dialog--center {
  margin-top: 647px !important;
  height: 1996px;
  margin-left: 2250px;
  width: 3200px !important;
  background: #000000;
}
.dialog-banner-title {
  display: inline-flex;
  float: left;
  margin-left: 120px;
  margin-top: 50px;
}
.dialog-cancel {
  font-size: 50px;
  color: white;
  margin-left: 1844px;
  cursor: pointer;
}

.video-line {
  height: 122px;
  cursor: pointer;
  border-bottom: 1px solid #ffffff;
}
.video-name {
  font-size: 40px;
  color: #ffffff;
  line-height: 122px;
}

.selected {
  background-color: #00334d;
  color: #ffffff;
}
.dialog-video-body {
  position: relative;
}
.video-list {
  height: 1537px;
  width: 600px;
  position: absolute;
  margin-left: 2510px;
  max-height: 1537px;
  overflow-y: auto;
}

/*滚动条样式*/
.video-list::-webkit-scrollbar {
  width: 5px !important;
}
.video-list::-webkit-scrollbar-thumb {
  border-radius: 50px;
  background: #ffffff;
}
.video-list::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: black;
}
.dialog-banner {
  width: 8px;
  height: 50px;
  background: #ffffff;
  margin-top: 13px;
}
.dialog-title {
  width: 1000px;
  font-size: 60px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #ffffff;
  line-height: 83px;
  margin-left: 25px;
  background: linear-gradient(180deg, #ffffff 0%, #d8eef7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: left;
}

.video-play {
  width: 2240px;
  height: 1680px;
  margin-left: 120px;
  margin-top: 150px;
}
</style>

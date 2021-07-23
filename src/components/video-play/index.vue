<template>
  <div class="hls-video-box">
    <video :poster="poster" muted ref="hls-video" class="hls-video"></video>
  </div>
</template>

<script>
  export default {
    name: "VideoPlay",
    components: {},
    props: {
      src: {
        type: String,
        default() {
          return ""
        }
      },
      poster: {
        type: String,
        default() {
          return ""
        }
      }
    },
    data() {
      return {
        flvPlayer: null,
        cHls: null,
        loadingSettime: null,
      }
    },
    watch: {
      src() {
        if (!this.src) return
        this.init()
      },
    },
    methods: {
      init() {
        let that = this;
        var videoSrc = that.src;
        that.flvPlayer = that.$refs['hls-video'];
        if (that.flvPlayer.canPlayType('application/vnd.apple.mpegurl')) {
          that.flvPlayer.src = videoSrc;
          that.flvPlayer.addEventListener('loadedmetadata', function () {
            that.flvPlayer.play();
          });
        } else if (Hls.isSupported()) {
          that.cHls = new Hls();
          that.cHls.loadSource(videoSrc);
          that.cHls.attachMedia(that.flvPlayer);
          that.cHls.on(Hls.Events.MANIFEST_PARSED, function () {
            that.flvPlayer.play();
            that.loadingSettime = setTimeout(function () {
              that.loading = false
              that.$emit('close')
            }, 1000 * 60 * 5)
          });
        }
      }
    },
    mounted() {
      this.init();
    },
    beforeDestroy() {
      this.cHls.destroy();
      clearTimeout(this.loadingSettime)
    }
  }
</script>

<style lang="" scoped>
  .hls-video-box,
  .hls-video {
    width: 100%;
    height: 100%;
    background-color: #000;
  }
</style>

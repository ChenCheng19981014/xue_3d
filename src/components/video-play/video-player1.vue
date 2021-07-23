<template>
  <div class="video-js-box" @dblclick.stop="$emit('dblclick')">
    <video ref="videoJsPlayer" class="video-player" :poster="poster" controlsList="nodownload" muted autoplay controls></video>
  </div>
</template>

<script>
  import flv from 'flv.js'

  export default {
    name: "video-player1",
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
      }
    },
    watch: {
      src() {
        this.init()
      },
    },
    methods: {
      init() {
        const videoSrc =this.src;
        if(!videoSrc){
          return
        }
        this.destroyVideoPlay()
        if (flv.isSupported()) {
          console.log('loadVideoPlay 正在播放... {%s}', videoSrc)
          this.flvPlayer = flv.createPlayer({
            type: 'flv',
            isLive: true,
            hasAudio: true,
            hasVideo: true,
            url: videoSrc
            // url: 'http://img.ksbbs.com/asset/Mon_1704/15868902d399b87.flv',
            // url: 'https://47.103.54.99/srs/myapp/demo.flv',
          });

          this.flvPlayer.attachMediaElement(this.$refs.videoJsPlayer)
          console.log('this.player.load()')
          this.flvPlayer.load()
          this.flvPlayer.pause()
          console.log('flv.play...')
          this.flvPlayer.play()
          this.flvPlayer.on(flv.Events.MEDIA_INFO, () => {
            console.log('-========================视频播放中 MEDIA_INFO')
            this.loading = false
          })
          /*        this.flvPlayer.on(flv.Events.ERROR, () => {
                    console.log('-========================视频lg播放中 ERROR')
                    // this.loading = false
                    // this.tipShowFlag = true
                    // this.tipLabel = this.tipLables.error
                  })*/
        }

      },
      destroyVideoPlay() {
        if (this.flvPlayer) {
          this.flvPlayer.pause()
          this.flvPlayer.unload()
          this.flvPlayer.detachMediaElement()
          this.flvPlayer.destroy()
          this.flvPlayer = null
        }
      },
    },
    mounted() {
      this.init();
    },
    beforeDestroy() {
      this.destroyVideoPlay()
    }
  }
</script>

<style scoped lang="less">
  .video-js-box{
    width:100%;
    height:100%
  }
  .video-player {
    width: 100%;
    height: 100%;
    background-color: #000;

    video {
      width: 100%;
      height: 100%;
    }
  }
</style>

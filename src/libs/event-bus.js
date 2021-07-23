import Vue from 'vue';

let host = new Vue();

// window.eventBusHost = host;


export default {
  $emit: host.$emit.bind(host),
  $on: function (event, callback) {
    host.$on.bind(host)(event, callback)

    function autoOff() {
      // console.log('auto off event-bus:', event)
      host.$off(event, callback)
    }

    // console.log('auto off？ event-bus?:', event, this.$host)
    if (this.$host && this.$host.$on) {
      this.$host.$on('hook:beforeDestroy', autoOff)
    }

    return autoOff
  },
  $off: host.$off.bind(host),
};

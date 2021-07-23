import Vue from 'vue'
import {getSocketControlTag, getToken} from "./util";
import config from '../config'
import Websocket from 'websocket-heartbeat-js'

let socket;
let eventHost = new Vue();

window.socketEventHost = eventHost;

// const socketUrl = Config .socketUrl;

export const init = (initRole) => {
  let token = getToken();
  // if (!token) return;
  // if (socket && socket.connected && socket._token == token) {
  //   return;
  // }

  if (socket && socket.connected) {
    return;
  }

  if (!socket || (!socket.connected && !socket._connectting)) {
    let socketUrl = `${config.socketUrl}${initRole}`;

    // socket = new WebSocket(socketUrl);
    socket = new Websocket({
      url:socketUrl
    });
    socket._token = token;
    socket._connectting = true;

    socket.onopen = (data) => {
      // console.log('已连接', socket)
      socket._connectting = false;
      console.log('open', data)
    };

    socket.onclose = (data) => {
      // console.log('已连接', socket)
      socket._connectting = false;
      console.log('close', data)
    };

    socket.onerror = (data) => {
      socket._connectting = false;
      console.log('error', data)
    };

    // socket.on('cmd-msg', (data) => {
    //   console.log('收到消息', data);
    //   eventHost.$emit('CmdMsg',data);
    // });
    socket.onmessage = ({data}) => {
      console.log('收到消息', data);
      eventHost.$emit('message', data)
      let info = {};
      try {
        info = JSON.parse(data)
      } catch (e) {
      }

      if (info.type && info.type==="cmd-msg") {
        eventHost.$emit('cmd-msg', info.data)
      }
    };

  }

};

export const destroy = () => {
  socket && socket.close()
};


export const sendCmd = (info) => {
  socket &&socket.send(JSON.stringify({
    type: 'cmd-msg',
    data: info
  }))
};
export const listenCmd = function(callback) {

  let newCallback = (info) => {
    let noControl = !!getSocketControlTag()
    if(noControl){
      return;
    }
    callback && callback(info)
  }
  eventHost.$on('cmd-msg', newCallback)

  function autoOff() {
    // console.log('auto off socket:', 'cmd-msg')
    eventHost.$off('cmd-msg', newCallback)
  }
  // console.log('listen auto off1？ ', this)
  if (this.$host && this.$host.$on) {
    this.$host.$on('hook:beforeDestroy', autoOff)
  }
  return autoOff;

};
export const listenDistCmd = function(cmd, callback) {

  let newCallback = (info) => {
    let noControl = !!getSocketControlTag()
    if(noControl){
      return;
    }
    if(info.cmd ===cmd){
      callback && callback(info)
    }
  }
  eventHost.$on('cmd-msg', newCallback)

  function autoOff() {
    // console.log('auto off socket:', 'cmd-msg', cmd)

    eventHost.$off('cmd-msg', newCallback)
  }

  // console.log('listen auto off？ ', this)
  if (this.$host && this.$host.$on) {
    // console.log('listen auto off socket:', 'cmd-msg', cmd, this.$host)

    this.$host.$on('hook:beforeDestroy', autoOff)
  }
  return autoOff;
};


export default {
  $on: eventHost.$on.bind(eventHost),
  $off: eventHost.$off.bind(eventHost),
  destroy,
  init,
  sendCmd,
  listenCmd,
  listenDistCmd
};

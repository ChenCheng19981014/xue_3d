import axios from 'axios'
import Vue from 'vue'
import router from '@/router'

import {getToken, setToken} from '@/libs/util'

const CancelToken = axios.CancelToken;

// import { Spin } from 'iview'
class HttpRequest extends Vue {
  constructor(baseUrl) {
    super();
    this.baseUrl = baseUrl
    this.queue = {}

  }

  getInsideConfig() {

    const config = {
      baseURL: this.baseUrl,
      headers: {
        token: getToken()
      }
    }
    return config
  }

  distroy(url) {
    delete this.queue[url]

  }

  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {

      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.distroy(url)
      const {config} = res
      let code = res.status;
      let data = res.data
      if (code == 200) {
        if (config.responseType && ["ArrayBuffer", "arraybuffer"].indexOf(config.responseType) !== -1) {
          return res;
        }

        //IE9 无data返回处理
        if (data === undefined) {
          data = JSON.parse(res.request.responseText)
        }

        //session 失效
        if (data.code === -1) {
          setToken('');

          router.replace({
            name: 'login',
            // query: {
            //   from: location.href
            // }
          })

          return
        }
        //正常返回
        if (code === 200) {
          return {
            ...data,
            data: data.data || []
          }
        } else {
          //业务错误
          if (data.code === 1000) {
            return Promise.reject({
              ...res.data,
              serverMessage: res.data.msg
            })
          } else {
            //其他错误
            return Promise.reject(res.data)
          }
        }
      } else {
        return Promise.reject(res)
      }
    }, error => {
      this.distroy(url)
      return Promise.reject(error)
    })
  }

  request(options) {

    if(options.useLatest && this.queue[options.url]){
      return this.queue[options.url]
    }

    const instance = axios.create()
    const source = CancelToken.source();

    options = Object.assign(this.getInsideConfig(), options, {
      _source: source,
      cancelToken: source.token
    });

    this.interceptors(instance, options.url);
    let dtd = Object.assign(instance(options), {
      //取消任务
      doCancel: (msg) => {
        source.cancel(msg)
      }
    });
    this.queue[options.url] = dtd;

    return dtd;
  }
}

import config from '@/config'

const http = new HttpRequest(config.baseUrl)

export default http

import axios from "./axios"

class Http {
  request (url,options={}) {
    return new Promise((resolve, reject)=>{
      axios.request({
        url,
        timeout: 100000,
        ...options
      }).then(re=>{
        if(re && re.code == 0) {
          resolve(re.data)
        } else {
          reject(re)
        }
      })
    })
  }

  get (url, options={}) {

    return this.request(url, {
      method: 'get',
      ...options
    })
  }

  post (url, options={}) {
    return this.request(url, {
      method: 'post',
      ...options
    })
  }
}

const http = new Http

http.install = (Vue) => {
  Vue.prototype.$http = http
}

export default http

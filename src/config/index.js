let config =  {
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * api 的根路径
   */
  baseUrl: 'API',
  socketUrl: 'ws://socket_server_path'

}
switch (process.env.NODE_ENV) {
  case 'development':
    // config.baseUrl = 'http://192.168.0.44:10088/API'
    break;

  case 'production':
    //本地测试
    if(process.env.BUILD_ENV === 'bd'){
      config.baseUrl = 'http://10.88.36.123:10088'
    //xc现场测试
    } else if(process.env.BUILD_ENV === 'xc'){
      // config.baseUrl = 'http://106.14.168.176:17080/API'
    }
    break;

  default:
    break;
}
export default config

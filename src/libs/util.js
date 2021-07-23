import Cookies from 'js-cookie'

import config from '../config'
import Moment from 'moment'

/* ==================================================================== */

export const TOKEN_KEY = 'token'
export const TOKEN_GIS_KEY = 'token_gis'

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, {expires: config.cookieExpires || 1})
}

export const getToken = () => {
  // if(1){
  //   return "2491E09CC45046E2AA0D03785E48D371";
  // }
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token;
  else return '';
}

export const SOCKET_KEY = 'noctl'
export const getSocketControlTag = () => {
  const token = localStorage.getItem(SOCKET_KEY) //Cookies.get(SOCKET_KEY)
  if (token) return token;
  else return '';
}

/* ==================================================================== */

export const hasAccess = (userAccess, needAccess) => {
  for (let i = 0; i < needAccess.length; i++) {
    if (!userAccess.includes(needAccess[i])) {
      return false
    }
  }
  return true
}


/**
 * 权鉴
 * @param {*} toRoute 将要跳转的路由
 * @param {*} modules 用户拥有的权限
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (toRoute, modules) => {
  // return hasAccess(modules, toRoute.meta.auth || [])
  return true
}


/* ==================================================================== */

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

/* ==================================================================== */

/**
 * 根据设计稿像素获取实际页面像素，主要用于iview组件在模板中配置尺寸的时候，使用
 * @param size，设计稿像素值
 * @returns {number}
 */
export const getFlexibleSize = (size) => {
  return size / window.lib.flexible.getCustomRate();
};

export const formatNumber = (num) => (
  num.toString().replace(/\d+/, n => (
    n.replace(/(\d)(?=(\d{3})+$)/g, $1 => $1 + ",")
  )))

/**
 * 获取最近一个月日期
 */
export const getLatestOneMonthDate = () => {
  const year = Moment().year()
  const month = Moment().month()
  const day = Moment().date()
  const today = new Date(year, month, day)
  const todayTimes = today.getTime()
  const date = new Date(year, month - 1, day)
  const result = []
  while (date.getTime() < todayTimes) {
    date.setDate(date.getDate() + 1)
    result.push(Moment(date).format('YYYY-MM-DD HH:mm:ss'))
  }
  return result

  }
export const getLastestDates=(num)=>{
  let result=[]
  for(let i=1;i<num+1;i++){
    const date=Moment().subtract(num-i, 'days').format('YYYY-MM-DD');
    result.push(`${date} 00:00:00`)
  }
  return result
}

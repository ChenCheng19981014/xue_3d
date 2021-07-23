import axios from '@/libs/axios'
import axiosModules from 'axios';
import route from '@/router/index';

export const getWeather = ({city, key}) => {
  return axiosModules({
    method: 'get',
    url: 'https://api.yytianqi.com/observe',
    params: {
      city,
      key
    }
  }).then(res => res.data)
}

const _url = '/item/list';
/*--------------介绍页接口--------------*/
export const getCommonDataList = ({url = _url, groupId, orderId,deviceId,line,owner,workshop}) => {
  const {path,query}=route.currentRoute;
  let ownerName=owner
  if(path==='/hx'){
    ownerName=query.owner||'huaxing'
    if(groupId===1000003||groupId===1000002||groupId===1000001){
      ownerName='xinsu-group'
    }
  }
  return axios.request({
    url: _url,
    params: {
      groupId: groupId,
      orderId: orderId,
      deviceId:deviceId,
      line:line,
      owner:ownerName,
      workshop:workshop
    },
    method: 'get'
  })
}

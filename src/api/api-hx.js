import axios from '@/libs/axios'
import axiosModules from 'axios'

export const createListFetch = ({ api, method }) => {
  return ({ pageNo, pageSize, params = {} }) => {

    return axios.request({
      method,
      url: api,
      params: { pageNo, pageSize, ...params },
    })
  }
}

//销量产量月度统计
export const getSaleNumM = () => {
  return axios.request({
      url: "/test/saleNumM",

      method: "get"
  })
}

//消耗金额对比
export const getConNum = () => {
  return axios.request({
      url: "/test/conNum",

      method: "get"
  })
}

//生产计划
export const getPlanData = () => {
  return axios.request({
      url: "/test/planData",

      method: "get"
  })
}

export const getEnergy = () => {
  return axios.request({
      url: "/test/energy",
      method: "get"
  })
}

export const getProdPlan = () => {
  return axios.request({
      url: "/test/prodPlan",
      method: "get"
  })
}


export const getBuildingChildren = () => {
  return axios.request({
      url: "/test/getBuildingChildren",
      method: "get"
  })
}

/**
 * 销售订单/产品类型
 */
export const getSalesOrderPie = ({type}) => {
  return axios.request({
    url: "/test/getSalesOrderPie",
    method: "get",
    params:{type}
  })
}


/**
 * 产品不良率趋势
 */
export const getProd = () => {
  return axios.request({
    url: "/test/getProd",
    method: "get"
  })
}


//一次交验合格率
export const getOneAcceptance = () => {
  return axios.request({
      url: "/test/getOneAcceptance",

      method: "get"
  })
}
const Mock = require('mockjs')

// 设备报警次数列表
Mock.mock('/test/alarmTimesStatistics', 'get', function (options) {
  return {
    'code': 200,
    'data': {
      'dataY': [
        2,
        6
      ],
      'dataX': [
        '07-22',
        '07-23'
      ]
    },
    'msg': 'success'
  }
})

// 销量产量月度统计
Mock.mock('/test/saleNumM', 'get', function (options) {
  return {
    'code': 200,
    'data': {
      'dataY1': [
        220,
        200,
        290,
        230,
      ],
      'dataY2': [
        180,
        330,
        230,
        180,
      ],
      'dataX': [
        "1月",
        "2月",
        "3月",
        "4月",
      ],
      'legend': [
        "销量", "产量"
      ]
    },
    'msg': 'success'
  }
})


// 消耗金额对比
Mock.mock('/test/conNum', 'get', function (options) {
  return {
    'code': 200,
    'data': {
      'dataY1': [
        220,
        200,
        290,
        230,
      ],
      'dataY2': [
        180,
        330,
        230,
        180,
      ],
      'dataX': [
        "1月",
        "2月",
        "3月",
        "4月",
      ],
      'legend': [
        "2019", "2020"
      ]
    },
    'msg': 'success'
  }
})


// 生产计划
Mock.mock('/test/planData', 'get', function (options) {
  return {
    'code': 200,
    'data': {
      'dataY1': [
        0,
        4,
        2,
        2,
        4,
        0,
        5,
        2,
        2,
        4,
        0,
        4,
        2
      ],
      'dataY2': [
        6, "-", 4, "-", 6, 6, "-", 4, "-", 6, 6,"-",4
      ],
      "dataY3": ["-", 4, "-", "-", "-", "-", 4, "-", 5, "-", "-",4,"-"],
      "dataY4": ["-", "-", "-", 5, "-", "-", "-", "-", "-","-", "-", "-","-"],
      'dataX': [
        "10250XS_0054",
        "10250XS_0054",
        "10250XS_0054",
        "10250XS_0054",
        "10250XS_0054",
        "10250XS_0054",
        "10250XS_0054",
        "10250XS_0054",
        "10250XS_0054",
        "10250XS_0054",
        "10250XS_0054",
        "10250XS_0054",
        "10250XS_0054",
      ],
      'reason': [
        {"desc":"","solve":""},{"desc":"","solve":""},{"desc":"","solve":""},{"desc":"由于xxx原因，生产速度停滞，推迟","solve":"由于xxx原因，生产速度停滞，推迟"},
        {"desc":"","solve":""},{"desc":"","solve":""},{"desc":"","solve":""},{"desc":"","solve":""},
        {"desc":"","solve":""},{"desc":"","solve":""},{"desc":"","solve":""},{"desc":"","solve":""},
        {"desc":"","solve":""}
      ],

    },
    'msg': 'success'
  }
})

//能耗统计
Mock.mock('/test/energy', 'get', function (options) {
  return {
    'code': 200,
    'data': {
      'dataY': [180, 330, 230, 180, 220, 320, 190, 290, 230, 150, 210, 290],
      'dataX': ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      "legend": ["电"]

    },
    'msg': 'success'
  }
})

//生产计划完成率
Mock.mock('/test/prodPlan', 'get', function (options) {
  return {
    'code': 200,
    'data': {
      'dataY1': [50, 60, 50, 40, 60, 50, 60],
      'dataY2': [40, 70, 40, 80, 90, 50, 30],
      'dataY3': [30, 20, 40, 50, 60, 40, 20],
      'dataX': [1, 2, 3, 4, 5, 6, 7],
      "legend": ["工种1", "工种2", "工种3"]

    },
    'msg': 'success'
  }
})

//机床子页面
Mock.mock('/test/getBuildingChildren', 'get', function (options) {
  return {
    'code': 200,
    'data': {
      "dataList": [
        {
          "id": 1,
          "type": "设备内圆磨床",
          "name": "内圆磨床WX",
          "img": "../../../static/images/sale/device.png",
          "list": [
            {
              "id": 11,
              "type":
                "内圆磨床WX-034E",
              "img": "../../../static/images/sale/device.png",
              "completion": 70,
              "detail": [
                {
                  "id": 111,
                  "name": "部件1-034E",
                  "img": "../../../static/images/sale/device.png",
                  "completion": 56,
                  "releaseTime": "2020-08-11",
                  "warehousingTime": "2020-08-11"
                },
                {
                  "id": 111,
                  "name": "部件2-034E",
                  "img": "../../../static/images/sale/device.png",
                  "completion": 57,
                  "releaseTime": "2020-08-11",
                  "warehousingTime": "2020-08-11"
                },
                {
                  "id": 111,
                  "name": "部件3-034E",
                  "img": "../../../static/images/sale/device.png",
                  "completion": 58,
                  "releaseTime": "2020-08-11",
                  "warehousingTime": "2020-08-11"
                },
                {
                  "id": 111,
                  "name": "部件4-034E",
                  "img": "../../../static/images/sale/device.png",
                  "completion": 59,
                  "releaseTime": "2020-08-11",
                  "warehousingTime": "2020-08-11"
                }
              ]
            },
            {
              "id": 12,
              "type": "内圆磨床WX-034E",
              "img": "../../../static/images/sale/device.png",
              "detail": [{
                "id": 121,
                "name": "部件1-031E",
                "completion": 71,
                "img": "../../../static/images/sale/device.png",
                "finished": 56,
                "releaseTime": "2020-08-11",
                "warehousingTime": "2020-08-11"
              }]
            }, {
              "id": 13,
              "type": "内圆磨床WX-034E",
              "img": "",
              "detail": [{
                "id": 131,
                "name": "部件1",
                "img": "",
                "finished": 56,
                "releaseTime": "2020-08-11",
                "warehousingTime": "2020-08-11"
              }, {
                "id": 132,
                "name": "部件2",
                "img": "",
                "finished": 56,
                "releaseTime": "2020-08-11",
                "warehousingTime": "2020-08-11"
              }, {
                "id": 133,
                "name": "部件3",
                "img": "",
                "finished": 56,
                "releaseTime": "2020-08-11",
                "warehousingTime": "2020-08-11"
              }]
            }]
        },
        {
          "id": 2,
          "type": "设备内圆磨床34D",
          "img": "../../../static/images/sale/device.png",
          "list": [{
            "id": 21,
            "type": "内圆磨床WX-034D",
            "completion": 72,
            "img": "../../../static/images/sale/device.png",
            "detail": [{
              "id": 211,
              "name": "内圆磨床WX-034D",
              "img": "",
              "finished": 56,
              "releaseTime": "2020-08-11",
              "warehousingTime": "2020-08-11"
            }, {
              "id": 212,
              "name": "内圆磨床WX-034E",
              "img": "",
              "finished": 56,
              "releaseTime": "2020-08-11",
              "warehousingTime": "2020-08-11"
            }, {
              "id": 213,
              "name": "内圆磨床WX-034E",
              "img": "",
              "finished": 56,
              "releaseTime": "2020-08-11",
              "warehousingTime": "2020-08-11"
            }]
          }]
        },
        {
          "id": 3,
          "type": "设备内圆磨床33D",
          "img": "../../../static/images/sale/device.png",
          "list": [{
            "id": 31,
            "completion": 20,
            "type": "内圆磨床WX-033E",
            "img": "../../../static/images/sale/device.png",
            "detail": [{
              "id": 311,
              "name": "内圆磨床WX-033E",
              "img": "",
              "finished": 56,
              "releaseTime": "2020-08-11",
              "warehousingTime": "2020-08-11"
            }]
          }]
        }]

    },
    'msg': 'success'
  }
})



//产品不良率趋势
Mock.mock('/test/getProd', 'get', function (options) {
  return {
      'code': 200,
      'data': {
        'dataY1': [
          22,
          20,
          29,
          23,
        ],

        'dataX': [
          "1月",
          "2月",
          "3月",
          "4月",
        ],
        'legend': [
          "产品不良率"
        ]
      },
      'msg': 'success'
    }
})



// 一次交验合格率
Mock.mock('/test/getOneAcceptance', 'get', function (options) {
  return {
    'code': 200,
    'data': {
      'dataY1': [
        22,
        20,
        29,
        23,
      ],
      'dataY2': [
        18,
        33,
        23,
        18,
      ],
      'dataX': [
        "1月",
        "2月",
        "3月",
        "4月",
      ],
      'legend': [
        "2019", "2020"
      ]
    },
    'msg': 'success'
  }
})



//华星 生产监控- 销售订单/产品类型
Mock.mock(RegExp('/test/getSalesOrderPie' + ".*"), 'get', function (options) {
  const {url} = options
  //截取参数
  const obj = GetRequestParams(url)
  const data1 = [
    {
      name: "亚洲",
      value: 45,
    },
    {
      name: "欧洲",
      value: 25,
    },
    {
      name: "北美",
      value: 19,
    },
    {
      name: "南美",
      value: 11,
    }
  ]
  const data2 = [
    {
      name: "产品1",
      value: 45,
    },
    {
      name: "产品2",
      value: 25,
    },
    {
      name: "产品3",
      value: 19,
    },
    {
      name: "产品4",
      value: 11,
    }
  ]
  const data = obj.type === '1' ? data1:data2;

  return {
    'code': 200,
    'data': data,
    'msg': 'success'
  }
})

const GetRequestParams = (url) => {
  // 获取url中"?"符后的字串
  const theRequest = {}
  if (url.indexOf('?') !== -1) {
    const str = url.split('?')
    const strs = str[1].split('&')
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1])
    }
  }
  return theRequest
}

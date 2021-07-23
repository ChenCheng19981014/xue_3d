// 创建 观察者类
class Observer {

  constructor() {
    //事件处理函数集合
    this.handles = {}
  }
  //订阅事件
  on(eventType, handle) {
    //判断非继承属性  也就是自身{} 这里面有无这个属性
    if (!this.handles.hasOwnProperty(eventType)) {
      this.handles[eventType] = []
    }
    if (typeof handle == 'function') {
      this.handles[eventType].push(handle)
    } else {
      throw new Error('缺少回调函数')
    }
    return this;                        //返回this 是为了 链式操作
  }
  //发布事件
  emit(eventType, ...args) {
    if (this.handles.hasOwnProperty(eventType)) {
      this.handles[eventType].forEach((item, key, arr) => {
        // 把你传入的参数 传递给handle(回调函数)
        item.apply(null, args)
      });
    } else {
      throw new Error(`${eventType}事件未注册`)
    }
    return this
  }
  //删除事件
  off(eventType, handle) {
    if (!this.handles.hasOwnProperty(eventType)) {
      throw new Error(`${eventType}事件未注册`)
    }
    else if (typeof handle != 'function') {
      throw new Error('缺少回调函数')
    }
    else {
      this.handles[eventType].forEach((item, key,arr) => {
        if (item == handle) {
          arr.splice(key, 1)
        }
      })
    }
    return this
  }

}

// let callFn=function(){
//   console.log('执行了回调函数callFn')
// }
//
export const observer = new Observer()
// //注册监听事件 'event1'
// observer.on('event1', (...args) => {
//   console.log(args)
// }).on('event1', callFn);
//
// //派发事件 'event1'
// observer.emit('event1',1,2,3,4,5)
// // 删除掉 callFn 回调
// observer.off('event1', callFn);
//
// observer.emit('event1', 7);

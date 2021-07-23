class Bus {
  constructor() {
    this.list = {};
  }
  $on(name, fn) {
    this.list[name] = fn;
  }

  $emit() {
    if (this.list[arguments[0]] === undefined) throw Error("请先挂载在使用");
    let dataList = [...arguments].slice(1);
    return this.list[arguments[0]](...dataList);
  }
  $off(name) {
    if (this.list[name]) {
      delete this.list[name];
    }
  }
}
export default Bus;

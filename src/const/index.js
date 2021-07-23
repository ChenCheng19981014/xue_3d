import * as hxFactory from "./hxFactory";
import ForeignSales from "./introduce";
import productionInfo from "./jichuangchang"

export default {
  install(Vue, options) {

    Vue.prototype.global = {
      hxFactory,
      ForeignSales,
      productionInfo
    };

  }

}



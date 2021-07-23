import Pb from "./pb";
import * as THREE from "./three";
function ChangeInterface(assets) {
  console.log(new Date().getTime());
  let { scene, camera, controls, eventBus, renderer, dom } = assets;
  //相机缓动
  controls.enableDamping = true;
  // 场景付给this
  this.assets = assets;
  // 河的模型
  this.water;
  // 公共函数 合并对象
  this.__proto__ = new Pb(Object.assign(assets, { THREE }));
  // 雪浪楼
  this.aboutXuelang = xueLangDunHouse.call(this);
  // 特效
  this.effect = specialEffect.call(this);
  // 雪浪楼层
  this.xuelangfloor = xueLangFloor.call(this);
  // 上升例子
  this.particle = Ascendingparticle.call(this);
  // 摄像机
  this.monitor = aboutMonitor.call(this);
  // 停车场杆子相关
  let stopRod = ParkingStopRod.call(this);
  // 关于雪浪大会
  this.aboutXueLangDaHui = xueLangDaHuiFuntion.call(this);
  // 控制器start事件需要关闭的动画的集合
  this.startCloseMap = {
    // 抬杆动画
    stopRod: "",
    // 环绕动画
    surroundArchitecture: "",
    // 聚焦雪浪动画
    focusXueLangHouseAnima: "",
    // 摄像机动画
    moveTOCameraAnima: "",
    //返回最佳视角动画
    backInitPosition: "",
    // 第一人称环绕动画
    firstPersonSurroundTimer: ""
  };
  // 初始化场景事件
  this.initTheScene = () => {
    // this.createMacroTask(this.addAllRoofSprite);
    // eventBus.$on("changeOneFloorStatus", parking.changeOneFloorStatus);
    // 入场动画
    this.createMacroTask(this.entranceAnimation);
    // 初始化雪浪
    this.createMacroTask(this.aboutXuelang.init);
    // 初始化特效
    this.createMacroTask(this.effect.init);
    // 初始化楼层
    this.createMacroTask(this.xuelangfloor.init);
    // 初始化粒子
    this.createMacroTask(this.particle.init);
    // 初始化摄像机
    this.createMacroTask(this.monitor.init);
    // 初始化混沌
    this.createMacroTask(this.initHunDun);
    // 初始化雪浪看牌
    this.createMacroTask(this.initSprite);
    // 初始化雪浪大会
    this.createMacroTask(this.aboutXueLangDaHui.init);
    // 重置雪浪样式
    // eventBus.$on("resetXuelangStatus", this.aboutXuelang.resetXuelangStatus);
    // 改变其他模型的状态
    eventBus.$on(
      "resetAboutXuelangStatus",
      this.aboutXuelang.resetAboutXuelangStatus
    );
    // 环绕动画
    eventBus.$on("surroundArchitecture", this.surroundArchitecture);
    // 取消环绕动画
    eventBus.$on("stopSurroundArchitecture", this.closeAnimaList);
    // 頁面单击聚焦
    eventBus.$on("fucousXuelang", this.aboutXuelang.click);
    // 双击聚焦
    eventBus.$on("dblClickXuelang", this.aboutXuelang.dblClick);
    // 显示监控
    eventBus.$on("initMonitor", this.monitor.camera);
    //页面btn聚焦相机
    eventBus.$on("webFucousCamera", this.monitor.webFucousCamera);
    // 页面楼层切换
    eventBus.$on("webChangeFloor", this.xuelangfloor.changeFloorWeb);
    // 环绕动画
    eventBus.$on("firstPersonSurround", this.firstPersonSurround);
    // 停止不必要动画
    eventBus.$on("aboutStopRod", () => {
      stopRod.focus();
      stopRod.stopRodAnima(status);
    });
    controls.addEventListener("start", () => {
      this.closeAnimaList();
    });
    // 点击
    dom.addEventListener("click", this.click);
    // 双击
    dom.addEventListener("dblclick", this.dblClick);
    // 键盘R键事件
    dom.addEventListener("keyup", e => {
      if (event.keyCode === 82) {
        this.backInitPosition();
      }
    });
    // 控制器事件
    controls.addEventListener("change", this.controlsChange);
  };
  // 入场动画
  this.entranceAnimation = () => {
    console.log("入场动画！！！");
    let end = this.getCameraAnimaBaseData(
      false,
      5491,
      6194,
      13865,
      1609,
      655,
      2498
    );
    this.cameraAnima(true, end);
  };
  // 关闭需要关闭的动画
  this.closeAnimaList = needKeepAni => {
    // 选择key
    let keyList = Object.keys(this.startCloseMap);
    // 选择值
    Object.values(this.startCloseMap).forEach((item, index) => {
      if (!item || keyList[index] === needKeepAni) return;
      // 暂停动画 并清空内容 item就是那个动画
      item.pause();
      this.startCloseMap[keyList[index]] = null;
    });
  };
  // 添加屋顶看板
  this.addAllRoofSprite = () => {
    let modelName = {
      1: "尚贤谷",
      2: "博世",
      3: "世盈",
      4: "开悟",
      5: "智泰",
      6: "灵锡",
      7: "雪浪云",
      8: "雪浪云",
      9: "中科海拓",
      10: "塬数科技",
      11: "数之联",
      12: "微钉",
      13: "大公坊",
      14: "雪浪云",
      15: "混沌能源",
      16: "海宝",
      17: "雪浪云",
      18: "雪浪云",
      19: "雪浪",
      20: "雪浪",
      21: "制信科技",
      22: "优奇",
      23: "新格尔",
      24: "国电投远景",
      25: "雪浪数制",
      26: "雪浪云",
      27: "新泽",
      28: "雪浪小镇",
      29: "三耳视源",
      30: "博创",
      31: "梦途",
      32: "零拓"
    };
    let mappingNumberToComponyName = {};
    /* 建筑组 */
    const buildingGroup = scene.getObjectByName("BuildingJanmo");
    buildingGroup.children.forEach((i, index) => {
      const modelNumber = i.name.replace(/[^0-9]/gi, "");
      if (!modelNumber) return;
      mappingNumberToComponyName[modelNumber] = modelName[modelNumber];
      let sp = this.getSprite();
      sp.position.y = 15000;
      let canvas = this.getCanvas(
        [modelName[modelNumber], 0, 45, 100],
        [0, 0],
        50,
        "#ff0000"
      );
      console.log(canvas, "canvas");
      this.setTexture(sp, canvas);
      i.add(sp);
      // console.log(mappingNumberToComponyName, "mappingNumberToComponyName");
    });
  };
  // 每秒调用
  this.animate = () => {
    this.particle.update();
    this.particle.ascendingparticleUpdate();
    let Cheliu1 = scene.getObjectByName("Cheliu0.2");
    let Cheliu2 = scene.getObjectByName("Cheliu0.1");
    let River = scene.getObjectByName("River");
    let dixingWater = scene.getObjectByName("dixingWater");
    // 地上的水
    dixingWater.material.map.offset.y -= 0.001;
    // 水的材质
    River.material.map.offset.y -= 0.001;
    // 车流流动
    Cheliu1.material.map.offset.y -= 0.02;
    // 车流流动
    Cheliu2.material.map.offset.y -= 0.01;
  };
  // 建筑漫游
  this.surroundArchitecture = _ => {
    // console.log(camera.position, "当前位置");
    // console.log(controls.target, "当前视角");
    /* 判断是否已经在动画中？ */
    if (
      this.startCloseMap.surroundArchitecture &&
      this.startCloseMap.surroundArchitecture.Cx
    )
      return;
    this.closeAnimaList();
    /* 动画的位置目标 */
    var SceneMoveList = [
      {
        position: [camera.position.x, camera.position.y, camera.position.z],
        target: [controls.target.x, controls.target.y, controls.target.z]
      },
      {
        position: [11483.27552, 5351.445, 11933.176],
        target: [5069.4093, 984.7277, 1220.8828]
      },
      {
        position: [1845.28521, 4433.2696563, 15278.803],
        target: [1258.6135, 73.2536148, 1723.5849]
      },
      {
        position: [-10466, 4704, 17364],
        target: [537, 181, 1243]
      },
      {
        position: [-19939, 4927, 5358],
        target: [50, 1055, -1077]
      },
      {
        position: [-22564, 5904, -5900],
        target: [-1286, -1254, -4795]
      },
      {
        position: [-19830, 4102, -22408],
        target: [-4636, -2855, -2629]
      },
      {
        position: [-5237, 4721, -25456],
        target: [-9553, -248, -2125]
      },
      {
        position: [7491, 7032, -21187],
        target: [-9028, -1229, -3580]
      },
      {
        position: [13056, 7355, -5604],
        target: [-9555, -1379, -5305]
      },
      {
        position: [15143, 7369, 2810],
        target: [-8152, -2956, -5691]
      },
      {
        position: [camera.position.x, camera.position.y, camera.position.z],
        target: [controls.target.x, controls.target.y, controls.target.z]
      }
    ];
    //递归计数
    let count = 0;
    var that = this;
    let travelTo = _ => {
      let testTM = that.anima(
        {
          Cx: SceneMoveList[count].position[0],
          Cy: SceneMoveList[count].position[1],
          Cz: SceneMoveList[count].position[2],
          Tx: SceneMoveList[count].target[0],
          Ty: SceneMoveList[count].target[1],
          Tz: SceneMoveList[count].target[2]
        },
        {
          Cx: SceneMoveList[count + 1].position[0],
          Cy: SceneMoveList[count + 1].position[1],
          Cz: SceneMoveList[count + 1].position[2],
          Tx: SceneMoveList[count + 1].target[0],
          Ty: SceneMoveList[count + 1].target[1],
          Tz: SceneMoveList[count + 1].target[2],
          ease: "none"
        },
        2,
        data => {
          // console.log(test, "test运动检测");
          // if (test != true) return;
          camera.position.x = data.Cx;
          camera.position.y = data.Cy;
          camera.position.z = data.Cz;
          controls.target.x = data.Tx;
          controls.target.y = data.Ty;
          controls.target.z = data.Tz;
          // console.log(data, "data");
        },
        () => {
          if (count + 1 < SceneMoveList.length - 1) {
            count += 1;
            travelTo(SceneMoveList);
          }
        }
      );
      this.startCloseMap.surroundArchitecture = testTM;
    };
    travelTo();
  };
  // 点击事件
  this.click = e => {
    let re = this.getClickEventObj(e, [scene]);
    console.log(re[0].object);
    // return;
    // console.log(camera.position, "camera.position---------------");
    // console.log(controls.target, "controls.target----------------");
    console.log(
      Math.round(camera.position.x) +
        "," +
        Math.round(camera.position.y) +
        "," +
        Math.round(camera.position.z)
    );
    console.log(
      Math.round(controls.target.x) +
        "," +
        Math.round(controls.target.y) +
        "," +
        Math.round(controls.target.z)
    );
    let xueLangDaHui = scene.getObjectByName("雪浪大会");
    let xueLangHouseModel = scene.getObjectByName("10#XLY");
    let FloorXLY = scene.getObjectByName("FloorXLY");
    // 监控的摄像头
    let allCamera = scene.getObjectByName("雪浪监控UI");

    let needCLickList = [
      ...xueLangHouseModel.children.filter(i => i.name !== "Texiao_XLY"),
      ...this.aboutXuelang.needsClickList,
      ...allCamera.children,
      ...xueLangDaHui.children.filter(i => i.name !== "Choosen_Area")
    ];
    let clickList = this.getClickEventObj(e, needCLickList);

    if (!clickList || !clickList.length) return;
    let firstObject = clickList[0].object;
    console.log(firstObject, "firstObject", clickList);

    if (this.deepFindParent(firstObject, xueLangHouseModel.name)) {
      this.aboutXuelang.click(e);
    } else if (this.deepFindParent(firstObject, "FloorXLY")) {
      this.xuelangfloor.triggeTheFloorChange(firstObject);
    } else if (this.deepFindParent(firstObject, "雪浪监控UI")) {
      this.monitor.moveTOCamera(firstObject);
      this.monitor.showCameraContent(firstObject);
    } else if (this.deepFindParent(firstObject, "雪浪大会")) {
      this.aboutXueLangDaHui.click(firstObject);
    }
    return;
  };
  // 双击事件
  this.dblClick = e => {
    // 雪浪楼
    let xueLangHouseModel = scene.getObjectByName("10#XLY");
    let result = this.getClickEventObj(e, [xueLangHouseModel]);
    if (!result || !result.length) return;

    if (this.deepFindParent(result[0].object, "10#XLY")) {
      this.aboutXuelang.dblClick(e);
    }
  };
  // 单击用纯改变透明度
  this.changeAllmodel = status => {
    let fatherModel = scene.getObjectByName("Buildings_Inside");
    // 雪浪楼
    let xueLangHouseModel = scene.getObjectByName("10#XLY");
    // status为true的话透明度为1  否则为 0.2
    const opc = status ? 1 : 0.2;
    fatherModel.children.forEach(item => {
      if (item.name === xueLangHouseModel.name) return;
      // 递归它的 透明度 为1就恢复到初始的透明度
      this.deepChangeModelOpc(item, opc, opc === 1 ? true : false);
    });
  };
  //---------------------------------------------------------------
  // controls change事件的防抖 进行出来 为了让延迟200毫秒进行防抖
  this.controlsChangeDelayRun = true;
  //控制器防抖事件
  this.controlsChange = e => {
    let xueLangHouseModel = scene.getObjectByName("10#XLY");
    if (!this.controlsChangeDelayRun) return;
    this.controlsChangeDelayRun = false;
    // 宏任务
    this.createMacroTask(() => {
      // 200秒恢复
      this.controlsChangeDelayRun = true;
    }, 200);
    // 距离雪浪的距离
    let xlDistance = this.getInstance(camera, xueLangHouseModel.children[0]);
    // 判断聚焦动画是否在进行中 过滤动画
    if (this.aboutXuelang.xuelangFocusIng) return;
    if (xlDistance > 15000) {
      // 大于15000 恢复状态 重置雪浪状态
      this.aboutXuelang.resetXuelangStatus(false);
      this.aboutXuelang.resetAboutXuelangStatus(true);
    } else if (xlDistance > 9000) {
      scene.getObjectByName("企业标签").visible = true;
    } else if (xlDistance < 9000) {
      scene.getObjectByName("企业标签").visible = false;
    }
  };
  //返回初始视角 键盘R键
  this.backInitPosition = () => {
    //清除动画
    this.closeAnimaList();
    this.startCloseMap.backInitPosition = this.anima(
      {
        Cx: camera.position.x,
        Cy: camera.position.y,
        Cz: camera.position.z,
        Tx: controls.target.x,
        Ty: controls.target.y,
        Tz: controls.target.z
      },
      {
        Cx: 5491,
        Cy: 6194,
        Cz: 13865,
        Tx: 1609,
        Ty: 655,
        Tz: 2498
      },
      2,
      data => {
        camera.position.x = data.Cx;
        camera.position.y = data.Cy;
        camera.position.z = data.Cz;
        controls.target.x = data.Tx;
        controls.target.y = data.Ty;
        controls.target.z = data.Tz;
      }
    );
  };
  // 设置环绕动画
  this.firstPersonSurroundTimer = undefined;
  // 填入环绕动画参数
  this.firstPersonSurround = (speed = 0.0005, close = false) => {
    // 清除动画
    this.closeAnimaList();
    // close是用于停止第一人称动画 并且 并且动画已经在执行当中

    if (close && this.firstPersonSurroundTimer) {
      console.log("需要停止动画！");
      // 停止动画
      clearInterval(this.firstPersonSurroundTimer);
      // 返回初始视角
      this.backInitPosition();
      // 清空数
      this.firstPersonSurroundTimer = undefined;
      return;
    } else if (close && this.firstPersonSurroundTimer === undefined) return;
    // 过滤防止重复已经在执行的动画    ---   没有值的时候继续执行
    if (this.firstPersonSurroundTimer !== undefined) return;
    // 运动的点位数组
    let model = this.getModel("firstPerson");
    // 第一个位置
    let { x, y, z } = model.children[0].position;
    // 第二个位置 相当于解构
    let tx = model.children[1].position.x;
    let ty = model.children[1].position.y;
    let tz = model.children[1].position.z;
    // 从当前位置位移到第一个至第二个位置上
    this.cameraAnima(
      this.getCameraAnimaBaseData(true),
      this.getCameraAnimaBaseData(false, x, y, z, tx, ty, tz)
    );
    // 在一秒之前设置为flase不为空
    this.firstPersonSurroundTimer = false;
    // 做动画 放入微任务
    this.createMacroTask(() => {
      this.firstPersonSurroundTimer = this.pathAnima(
        // 位移点位模型
        model,
        // 摄像机位置
        camera,
        //返回位置
        () => {
          this.backInitPosition();
          this.firstPersonSurroundTimer = undefined;
        },
        //是否需要向前
        true,
        // 速度
        0.002
      );
    }, 1000);
  };
  // 针对混沌楼房进行隐藏
  this.initHunDun = () => {
    // 混沌楼层隐藏
    scene.getObjectByName("HDFloor").visible = false;
  };
  // 初始化其他企业看牌
  this.initSprite = () => {
    // scene.getObjectByName("灵锡").scale.set(4500, 4500, 4500);
    scene.getObjectByName("混沌").scale.set(2500, 2500, 2500);
    scene.getObjectByName("博世").scale.set(5000, 5000, 5000);
    scene.getObjectByName("物联网促进中心").scale.set(4500, 4500, 4500);
  };
}
//雪浪楼
function xueLangDunHouse() {
  let { scene, camera, controls } = this.assets;
  let that = {};
  // let xueLangHouseModel = scene.getObjectByName("10#XLY");
  let isDblClick = false;
  // 雪浪的外壳状态的
  that.xlShellStatus = false;
  //正在点击
  that.clicking = false;
  that.needsClickList = [];
  // 雪浪的楼
  let xueLangHouseModel = scene.getObjectByName("10#XLY");
  // 雪浪楼板
  let xuelangBuilding = scene.getObjectByName("FloorXLY");
  // 屋顶
  let XLYWuding = scene.getObjectByName("wuding1");
  //雪浪的楼
  let xuelangBuild = scene.getObjectByName("XLY");
  // 雪浪屋顶的Y轴位置
  let XLYWudingPY = XLYWuding.position.y;
  //雪浪建筑的框
  let XLYBuildkuang = scene.getObjectByName("XLY_jg");
  // 雪浪房子位置
  // 屋顶Y轴位置
  let xuelangBuildPY = scene.getObjectByName("XLY").position.y;
  // 雪浪屋顶的位置
  let wuDingPY = scene.getObjectByName("wuding1").position.y;
  // 特效的雪浪云
  let transModel = this.getModel("Texiao_XLY");
  // 雪浪各个房子部件
  let xueLangParts = [];
  // 雪浪初始化
  that.init = () => {
    let xuelangBuild499 = scene.getObjectByName("polySurface499");
    let xuelangBuild455 = scene.getObjectByName("polySurface455");
    let xuelangBuild457 = scene.getObjectByName("polySurface457");
    let xuelangBuild1427 = scene.getObjectByName("pCube1427");
    let xuelangBuildqiangti = scene.getObjectByName("qiangti");
    xueLangParts.push(xuelangBuild499);
    xueLangParts.push(xuelangBuild455);
    xueLangParts.push(xuelangBuild457);
    xueLangParts.push(xuelangBuild1427);
    xueLangParts.push(xuelangBuildqiangti);
    xuelangBuilding.children.forEach(i => {
      i.children.forEach(item => {
        if (item.type === "Group") return;
        that.needsClickList.push(item);
      });
    });
    that.cloneGlassMaterial();
  };
  // clone雪浪的材质 点击不至于玻璃栏杆被影响
  that.cloneGlassMaterial = () => {
    let model1 = xuelangBuild.getObjectByName("polySurface499");
    let model2 = xuelangBuild.getObjectByName("polySurface457");
    let model3 = xuelangBuild.getObjectByName("pCube1427");
    model1.material = model1.material.clone();
    model2.material = model2.material.clone();
    model3.material = model3.material.clone();
  };
  // 点击 单击 聚焦
  that.click = e => {
    this.createMacroTask(() => {
      if (isDblClick) return;
      this.closeAnimaList();
      // 双击雪浪
      foucsXueLangHouse("click");
      // 双击透明度变化
      this.changeAllmodel(false);
    }, 200);
  };
  // 设置标识是否正在进行聚焦动画
  that.xuelangFocusIng = false;
  // 单双击聚焦动画
  let foucsXueLangHouse = status => {
    that.xuelangFocusIng = true;
    this.startCloseMap.focusXueLangHouseAnima = this.anima(
      {
        cx: camera.position.x,
        cy: camera.position.y,
        cz: camera.position.z,
        tx: controls.target.x,
        ty: controls.target.y,
        tz: controls.target.z
      },
      {
        cx: 781,
        cy: 1988,
        cz: 8289,
        tx: -1702,
        ty: -74,
        tz: 4144
      },
      1,
      data => {
        camera.position.x = data.cx;
        camera.position.y = data.cy;
        camera.position.z = data.cz;
        controls.target.x = data.tx;
        controls.target.y = data.ty;
        controls.target.z = data.tz;
        let xlDistance = this.getInstance(
          camera,
          xueLangHouseModel.children[0]
        );
        if (this.getInstance(camera, xueLangHouseModel.children[0]) < 9000) {
          scene.getObjectByName("企业标签").visible = false;
        }
      }
    );
    // 微任务恢复
    this.createMacroTask(() => {
      that.xuelangFocusIng = false;
    }, 1000);
  };
  //---------------------------------------------------------------
  // 双击 事件
  that.dblClick = e => {
    isDblClick = true;
    if (scene.getObjectByName("XLY").visible == false) {
      // 初始化摄像机
      this.initmonitor();
    }
    // 初始化雪浪楼层
    that.initFloorState();
    // 升雪浪的屋顶
    that.changeXueLangHouseShell(true);
    // 声明点击事件
    that.clicking = true;
    // 调用摄像机功能把摄像机的位置调入下方
    this.monitor.cameraStatus();
    // 聚焦雪浪房子
    foucsXueLangHouse("dblClick");
    // 双击透明度变化
    this.changeAllmodel(false);
    // 宏任务
    this.createMacroTask(() => {
      // 双击的进行中的
      isDblClick = false;
    }, 200);
  };
  // 双击雪浪效果
  that.changeXueLangHouseShell = (status = false) => {
    if (that.xlShellStatus === status || that.clicking) return;
    let xueLangHouse = xueLangHouseModel;
    // 特效
    let texiao = scene.getObjectByName("Texiao_XLY");
    // 特效
    let needTansToTopThenHideShell = texiao;
    // 上升的特效
    let needTransToTopShellList = [
      texiao.getObjectByName("Texiao2_xly"),
      texiao.getObjectByName("XLYTexiao3")
    ];
    // 雪浪云楼
    let xuelangBuild = scene.getObjectByName("XLY");
    // 雪浪云楼房的默认位置
    let xuelangBuildPY = xuelangBuild.position.y;
    (() => {
      // 雪浪材质克隆
      xuelangBuild.children.forEach(i =>
        i.material ? (i.material = i.material.clone()) : null
      );
    })();
    // 屋顶
    let XLYWuding = scene.getObjectByName("wuding1");
    if ((XLYWuding.position.y === 15000 && !status) || !XLYWuding.visible)
      return;
    // 外壳动画 特效
    this.effect.tranShell();
    let begin = {
      opc: 1,
      hideTop: 0,
      transTop: -1800,
      resetHousePosition: 0,
      vis: true
    };
    let end = {
      opc: 0,
      hideTop: 15000,
      transTop: 15000,
      vis: false
    };
    if (!status) {
      needTansToTopThenHideShell.visible = true;
    }
    this.anima(
      status ? begin : end,
      status ? end : begin,
      1,
      data => {
        // 屋顶
        XLYWuding.position.y = data.transTop;
        needTransToTopShellList[0].position.y = data.transTop;
        needTransToTopShellList[1].position.y = data.transTop;
        // 雪浪楼房的
        this.deepChangeModelOpc(xuelangBuild, 0);

        //雪浪楼房的各个mesh
        xueLangParts.forEach((i, index) => {
          this.changeModelOpc(i, data.opc);
        });
        // 雪浪logo变化
        scene.getObjectByName("XLYlogo").children.forEach((i, index) => {
          i.material.transparent = true;
          i.material.opacity = data.opc;
        });
      },
      () => {
        that.clicking = false;
        xuelangBuild.position.y = -15000;
        xuelangBuild.visible = false;
        this.closeAnimaList();
        this.monitor.cameraStatus();
        if (status) {
          xueLangHouse.position.y = -15000;
        }
      }
    );
  };
  // 初始化楼层的状态
  that.initFloorState = () => {
    this.createMacroTask(() => {
      this.deepChangeModelOpc(scene.getObjectByName("Floor1"), 1);
      this.deepChangeModelOpc(scene.getObjectByName("Floor2"), 0.3);
      this.deepChangeModelOpc(scene.getObjectByName("Floor3"), 0.3);
      scene.getObjectByName("标签1F").visible = true;
      scene.getObjectByName("标签2F").visible = false;
      scene.getObjectByName("标签3F").visible = false;
      this.xuelangfloor.changeFloor("f2", true);
      this.xuelangfloor.changeFloor("f3", true);
    }, 1);
  };
  // 重置恢复雪浪楼的状态
  that.resetXuelangStatus = (status = false) => {
    that.xlShellStatus = status;
    if (xuelangBuild.visible) return;
    this.xuelangfloor.changeFloor("f1", false);
    this.xuelangfloor.changeFloor("f2", false);
    this.xuelangfloor.changeFloor("f3", false);
    // 进行雪浪外壳动画
    this.effect.tranShell();
    this.anima(
      {
        XLYBy: 15000,
        opc: 0,
        visible: false,
        XLPY: 0
      },
      {
        XLYBy: wuDingPY,
        opc: 1,
        visible: true,
        XLPY: xuelangBuildPY + 15000
      },
      0.8,
      data => {
        // 特效先显示出来
        transModel.visible = true;
        // 先显示
        scene.getObjectByName("XLY").visible = true;
        scene.getObjectByName("wuding1").visible = true;
        // 屋顶位置
        XLYWuding.position.y = data.XLYBy;
        // 屋顶透明度
        XLYWuding.material.transparent = true;
        // 屋顶透明度
        XLYWuding.material.opacity = data.opc;
        //雪浪楼 位置
        xuelangBuild.position.y = data.XLPY;
        //雪浪楼 显示
        xuelangBuild.visible = true;
        //雪浪楼房的各个mesh
        xueLangParts.forEach((i, index) => {
          this.changeModelOpc(i, data.opc);
        });
        //雪浪的logo
        scene.getObjectByName("XLYlogo").visible = true;
        scene.getObjectByName("XLYlogo").position.y = 15000;
        scene.getObjectByName("XLYlogo").children.forEach((i, index) => {
          //雪浪的logo每一个部件 透明度
          i.material.transparent = true;
          i.material.opacity = data.opc;
          i.position.y = 0;
        });
      },
      () => {
        // 改变雪浪云的楼状态
        this.deepChangeModelOpc(xuelangBuild, 1, true);
        // 雪浪的楼
        xuelangBuild.visible = true;
        // 雪浪白色特效
        transModel.visible = false;
        if (status) {
        }
      }
    );
  };
  //---------------------------------------------------------------

  // 双击用其他建筑透明度降低 并且恢复雪浪状态
  that.resetAboutXuelangStatus = (status = false) => {
    // 调用重置雪浪的状态
    that.resetXuelangStatus();
    // 调用外壳动画
    that.changeXueLangHouseShell(!status);
    // 调用改变周边环境的状态
    this.changeAllmodel(status);
  };
  return that;
}
/* 对于雪浪楼层 */
function xueLangFloor() {
  let { scene } = this.assets;
  let that = {};
  // 雪浪每个楼层
  let floorInitYPosition = {};
  // 雪浪楼板
  let xuelangBuilding = scene.getObjectByName("FloorXLY");
  // 三层楼层
  let floorModel = {
    f1: scene.getObjectByName("Floor1"),
    f2: scene.getObjectByName("Floor2"),
    f3: scene.getObjectByName("Floor3")
  };
  // 初始化楼层 材质等等
  let initFloorOption = () => {
    xuelangBuilding.children.forEach((item, index) => {
      floorInitYPosition[item.name] = item.position.y;
    });
  };
  // 雪浪楼层的初始化
  that.init = () => {
    initFloorOption();
  };
  /* 点击楼层逻辑 */
  that.triggeTheFloorChange = objList => {
    // 穿透模型找到点击的楼层
    // 如果父亲是floor说明找到模型,如果isCLick存在说明上一次循环已经找到了,所以返回
    // console.log(objList, "objList");
    if (!this.deepFindParent(objList, "FloorXLY")) return;
    const nameIndex = objList.name.replace(/[a-zA-Z+]/gi, "") - 1;
    const tagList = [
      scene.getObjectByName("标签1F"),
      scene.getObjectByName("标签2F"),
      scene.getObjectByName("标签3F")
    ];
    console.log(nameIndex, "index");
    Object.values(floorModel).forEach((item, index) => {
      if (nameIndex === index) {
        this.deepChangeModelOpc(item, 1, true);
        tagList[index].visible = true;
      } else {
        this.deepChangeModelOpc(item, 0.3);
        tagList[index].visible = false;
      }
    });
    const result = this.deepFindInfo(objList, "isUp");
    if (nameIndex === 0) {
      that.changeFloor("f2", true);
      that.changeFloor("f3", true);
    } else if (nameIndex === 1) {
      if (result) {
        console.log("第二层下降");
        that.changeFloor("f2", false);
      } else {
        that.changeFloor("f3", true);
      }
    } else if (nameIndex === 2) {
      if (result) {
        console.log("走了吗？111");
        that.changeFloor("f2", false);
        that.changeFloor("f3", false);
      } else {
        that.changeFloor("f3", true);
      }
    }
  };
  /* 针对楼层 以及状态 设定 */
  that.changeFloor = (objName, isUp) => {
    // console.log(objName, "点击的叫什么？");
    let obj = floorModel[objName];
    console.log(obj, "obj");
    if (obj.isUp === isUp) return;
    const f3Offset = 1100;
    const f2Offset = 300;
    obj.isUp = isUp;
    this.anima(
      { y: obj.position.y, opc: 1 },
      isUp
        ? {
            y: obj.position.y + (obj.name == "f2" ? f2Offset : f3Offset),
            opc: 0.3
          }
        : {
            y: floorInitYPosition[obj.name],
            opc: 1
          },
      0.5,
      data => {
        obj.position.y = data.y;
        obj.children.forEach((i, index) => {
          i.transparent = true;
        });
      },
      () => {}
    );
  };
  // 楼板透明度功能
  that.transparencyChanges = (flooropc, flagopc) => {
    if (flagopc == true) {
      this.deepChangeModelOpc(flooropc, 1, true);
    } else {
      this.deepChangeModelOpc(flooropc, 0.3);
    }
  };
  // 页面上的楼层逻辑
  that.changeFloorWeb = floor => {
    if (scene.getObjectByName("XLY").visible) return;
    that.triggeTheFloorChange(floorModel[floor]);
    that.changeFloor(floor);
  };
  return that;
}
/* 雪浪特效 */
function specialEffect() {
  let { scene } = this.assets;
  let that = {};
  let xuelangBuild = scene.getObjectByName("XLY");
  // 初始化
  that.init = () => {
    scene.getObjectByName("land_tihuan").visible = false;
    scene.getObjectByName("混沌看板").visible = false;
  };
  // 外边框移动
  that.tranShell = _ => {
    // if (xuelangBuild.visible === false) return;
    let transModel = this.getModel("Texiao_XLY");
    transModel.visible = true;
    let begin = 0;
    this.anima(
      { y: begin, opc: 1 },
      { y: 15000, opc: 0 },
      1,
      data => {
        transModel.position.y = data.y;
      },
      _ => {
        transModel.position.y = begin;
        transModel.visible = false;
      }
    );
  };
  // 改变飞线的状态
  that.changeFlyLine = status => {
    let flyLine = mainModel.getObjectByName("Dianliu");
    // let blueLight = mainModel.getObjectByName("feixian");
    if (status) {
      flyLine.visible = true;
      // blueLight.visible = true;
    } else {
      flyLine.visible = false;
      // blueLight.visible = false;
    }
  };
  return that;
}
// 监控摄像机控制以及事件
function aboutMonitor() {
  let { scene, camera, controls } = this.assets;
  let that = {};
  // 摄像机的名称 位置 以及target
  let camerList = [
    {
      spriteName: "GroupCQ-102-13",
      position: [1548.08774, 13949.1639636, 17907.446],
      target: [3786.2008, 710.719963, 2276.32356]
    },
    {
      spriteName: "GroupCQ-8-11",
      position: [-9767.39351006, 9941.60592, -314.1718],
      target: [-5819.59601, 3636.452129, 7347.60122]
    },
    {
      spriteName: "GroupCQ-4-13",
      position: [-2646.06099, 7929.61361, -7531.3896],
      target: [-6906.0444, 2850.91151, -12766.636744]
    },
    {
      spriteName: "GroupCQ-5-13",
      position: [-3661.01136, 7483.16127, -24290.96113],
      target: [-10501.42186, 3367.87177, -17818.582]
    },
    {
      spriteName: "GroupCQ-5-11",
      position: [-2258.847571, 10075.37326, -22513.3818],
      target: [-9264.12007, 2361.4997, -13861.427]
    }
  ];
  // 摄像机组的名称 组的名称 摄像机名 以及拓展摄像信息框
  let cameraContentList = [
    {
      GroupName: "GroupCQ-102-13",
      cameraName: "CQ-102-13",
      longCameraName: "CQ-102-13 10-3号楼1楼西球机"
    },
    {
      GroupName: "GroupCQ-8-11",
      cameraName: "CQ-8-11",
      longCameraName: "CQ-8-11 8号楼一楼南球机"
    },
    {
      GroupName: "GroupCQ-4-13",
      cameraName: "CQ-4-13",
      longCameraName: "CQ-4-13 4号楼1楼北球机"
    },
    {
      GroupName: "GroupCQ-5-13",
      cameraName: "CQ-5-13",
      longCameraName: "CQ-5-13 5号楼博世大门球机"
    },
    {
      GroupName: "GroupCQ-5-11",
      cameraName: "CQ-5-11",
      longCameraName: "CQ-5-11 5号楼东球机"
    }
  ];
  let allCamera = scene.getObjectByName("雪浪监控UI");
  // 摄像机的初始化
  that.init = () => {
    let allCamera = scene.getObjectByName("雪浪监控UI");
    allCamera.children.forEach((i, index) => {
      i.visible = false;
      i.position.y = -15000;
      allCamera.position.y = -15000;
      console.log("没有被隐藏！");
    });
    let cameraContentList = [
      {
        GroupName: "CQ-5-13",
        cameraName: "CQ-5-13",
        longCameraName: "CQ-5-13 5号楼博世大门球机"
      },
      {
        GroupName: "CQ-5-11",
        cameraName: "CQ-5-11",
        longCameraName: "CQ-5-11 5号楼东球机"
      },
      {
        GroupName: "CQ-4-13",
        cameraName: "CQ-4-13",
        longCameraName: "CQ-4-13 4号楼1楼北球机"
      },
      {
        GroupName: "CQ-8-11",
        cameraName: "CQ-8-11",
        longCameraName: "CQ-8-11 8号楼一楼南球机"
      },
      {
        GroupName: "CQ-102-13",
        cameraName: "CQ-102-13",
        longCameraName: "CQ-102-13 10-3号楼1楼西球机"
      }
    ];
    cameraContentList.forEach((i, index) => {
      let sp = this.getSprite();
      sp.scale.set(0.45, 0.14);
    });
  };
  // 初始化摄像机 隐藏位置
  that.camera = () => {
    if (scene.getObjectByName("XLY").visible === false) return;
    allCamera.children.forEach((i, index) => {
      i.visible = !i.visible;
      if (i.visible === true) {
        i.position.y = 0;
        allCamera.position.y = 0;
      } else {
        i.position.y = -15000;
        allCamera.position.y = -15000;
      }
    });
  };
  // 页面摄像机聚焦
  that.webFucousCamera = index => {
    console.log(index, "index");
    that.moveTOCamera(camerList[index].spriteName);
    that.showCameraContent(
      scene.getObjectByName(cameraContentList[index].GroupName)
    );
  };
  // 摄像机的状态
  that.cameraStatus = () => {
    allCamera.children.forEach((i, index) => {
      if (scene.getObjectByName("XLY").visible === false) {
        i.visible = false;
        i.position.y = -15000;
        allCamera.position.y = -15000;
      }
    });
  };
  //摄像机动画
  that.moveTOCamera = cameraModel => {
    console.log(
      cameraModel,
      typeof cameraModel,
      "cameraModel移动到摄像机的位置获取到的对象"
    );
    // console.log(
    //   "摄像机被点击调用了吗？------------------------------------------------------------"
    // );
    let CxNowX = camera.position.x;
    let CxNowY = camera.position.y;
    let CxNowZ = camera.position.z;

    let TxNowX = controls.target.x;
    let TxNowY = controls.target.y;
    let TxNowZ = controls.target.z;
    let anima = i => {
      this.startCloseMap.moveTOCameraAnima = this.anima(
        {
          Cx: CxNowX,
          Cy: CxNowY,
          Cz: CxNowZ,
          Tx: TxNowX,
          Ty: TxNowY,
          Tz: TxNowZ
        },
        {
          Cx: i.position[0],
          Cy: i.position[1],
          Cz: i.position[2],
          Tx: i.target[0],
          Ty: i.target[1],
          Tz: i.target[2]
        },
        2,
        data => {
          camera.position.x = data.Cx;
          camera.position.y = data.Cy;
          camera.position.z = data.Cz;
          controls.target.x = data.Tx;
          controls.target.y = data.Ty;
          controls.target.z = data.Tz;
        },
        () => {
          console.log("成功！");
        }
      );
    };

    camerList.forEach((i, index) => {
      if (typeof cameraModel === "string") {
        if (cameraModel === i.spriteName) {
          anima(i);
        }
      } else if (cameraModel.parent.name === i.spriteName) {
        anima(i);
      }
    });
  };
  // 摄像机的内容
  that.showCameraContent = cameraModel => {
    console.log(cameraModel, typeof cameraModel, "cameraModel展示的地方");
    cameraContentList.forEach((i, index) => {
      if (
        cameraModel.name === i.GroupName ||
        cameraModel.parent.name === i.GroupName
      ) {
        console.log(i, "i---------");
        scene.getObjectByName(i.cameraName).visible = !scene.getObjectByName(
          i.cameraName
        ).visible;
        scene.getObjectByName(
          i.longCameraName
        ).visible = !scene.getObjectByName(i.longCameraName).visible;
      } else {
        scene.getObjectByName(i.cameraName).visible = true;
        scene.getObjectByName(i.longCameraName).visible = false;
      }
    });
  };
  return that;
}
/** 上升粒子 特效等*/
function Ascendingparticle() {
  let { scene, camera } = this.assets;
  /*-----------------------粒子----------------------------- */
  // 粒子的数量
  let maxParticleCount = 700;
  // 粒子片段
  let segments = maxParticleCount * maxParticleCount;
  // 粒子的位置
  let particles = new THREE.BufferGeometry();
  let particlePositions = new Float32Array(maxParticleCount * 3);
  let particleCount = 100;
  //粒子的直径范围
  let r = 100000;
  // 半径
  let rHalf = r / 2;
  let particlesData = [];
  let linesMesh;
  let pointCloud;
  let effectController = {
    showDots: true,
    showLines: true,
    minDistance: 0,
    limitConnections: false,
    maxConnections: 10,
    particleCount: 500,
    height: 20
  };
  let group = new THREE.Group();
  let that = {};
  that.init = () => {
    // 添加上升粒子
    that.addAscendingparticle();
    // 添加悬浮粒子
    that.addparticle();
  };
  /* 添加场景空中粒子 */
  that.addparticle = function() {
    // new一个新的组
    group.name = "upLineLittle";
    scene.add(group);
    // 位置和颜色
    let positions = new Float32Array(segments * 3);
    let colors = new Float32Array(segments * 3);
    // 粒子的材料
    let pMaterial = new THREE.PointsMaterial({
      color: 0x9f9f9f,
      size: 2.0,
      blending: THREE.AdditiveBlending,
      transparent: true,
      sizeAttenuation: false
    });
    // 粒子的 x y z 值
    for (var i = 0; i < maxParticleCount; i++) {
      let x = Math.random() * r - r / 2 - 3000.0;
      let y = (Math.random() * r) / effectController.height; /* - r / 2*/
      let z = Math.random() * r - r / 2 - 1000.0;
      particlePositions[i * 3 + 2] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 0] = z;

      // 添加到几何体
      // 零件的粒子数据
      particlesData.push({
        velocity: new THREE.Vector3(
          (-1 + Math.random() * 200) / 10,
          (-1 + Math.random() * 200) / 10,
          (-1 + Math.random() * 200) / 10
        ),
        numConnections: 0
      });
    }
    //粒子的范围
    particles.setDrawRange(0, particleCount);
    // console.log(particles, "particles粒子");
    // 顶点位置
    particles.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3).setUsage(
        THREE.DynamicDrawUsage
      )
    );
    // 创建粒子系统
    pointCloud = new THREE.Points(particles, pMaterial);
    // console.log(pointCloud, "pointCloud粒子");
    //添加进group
    group.add(pointCloud);
    var geometry = new THREE.BufferGeometry();
    //设置位置颜色
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage)
    );
    geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage)
    );
    geometry.computeBoundingSphere();
    geometry.setDrawRange(0, 0);
    //材料
    let material = new THREE.LineBasicMaterial({
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    linesMesh = new THREE.LineSegments(geometry, material);
    group.add(linesMesh);
  };
  // 更新粒子动画
  that.update = function() {
    if (group.children.length != 2) return;

    // 游离粒子更新
    let vertexpos = 0;
    let colorpos = 0;
    let numConnected = 0;

    for (var i = 0; i < particleCount; i++) particlesData[i].numConnections = 0;

    for (var i = 0; i < particleCount; i++) {
      var particleData = particlesData[i];
      particlePositions[i * 3] += particleData.velocity.x;
      particlePositions[i * 3 + 1] += particleData.velocity.y;
      particlePositions[i * 3 + 2] += particleData.velocity.z;

      if (
        particlePositions[i * 3 + 1] < -rHalf ||
        particlePositions[i * 3 + 1] > rHalf
      )
        particleData.velocity.y = -particleData.velocity.y;

      if (particlePositions[i * 3] < -rHalf || particlePositions[i * 3] > rHalf)
        particleData.velocity.x = -particleData.velocity.x;

      if (
        particlePositions[i * 3 + 2] < -rHalf ||
        particlePositions[i * 3 + 2] > rHalf
      )
        particleData.velocity.z = -particleData.velocity.z;

      if (
        effectController.limitConnections &&
        particleData.numConnections >= effectController.maxConnections
      )
        continue;

      // Check collision
      for (var j = i + 1; j < particleCount; j++) {
        let particleDataB = particlesData[j];
        if (
          effectController.limitConnections &&
          particleDataB.numConnections >= effectController.maxConnections
        )
          continue;

        let dx = particlePositions[i * 3] - particlePositions[j * 3];
        let dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
        let dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
        let dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < effectController.minDistance) {
          particleData.numConnections++;
          particleDataB.numConnections++;

          let alpha = 1.0 - dist / effectController.minDistance;

          positions[vertexpos++] = particlePositions[i * 3];
          positions[vertexpos++] = particlePositions[i * 3 + 1];
          positions[vertexpos++] = particlePositions[i * 3 + 2];

          positions[vertexpos++] = particlePositions[j * 3];
          positions[vertexpos++] = particlePositions[j * 3 + 1];
          positions[vertexpos++] = particlePositions[j * 3 + 2];

          colors[colorpos++] = alpha;
          colors[colorpos++] = alpha;
          colors[colorpos++] = alpha;

          colors[colorpos++] = alpha;
          colors[colorpos++] = alpha;
          colors[colorpos++] = alpha;

          numConnected++;
        }
      }
    }

    linesMesh.geometry.setDrawRange(0, numConnected * 2);
    linesMesh.geometry.attributes.position.needsUpdate = true;
    linesMesh.geometry.attributes.color.needsUpdate = true;
    pointCloud.geometry.attributes.position.needsUpdate = true;
  };
  /* 添加上升粒子 */
  that.addAscendingparticle = function() {
    //设置变量 接收生成的线
    that.lines = [];
    let ammountLines = 35;
    let dimension = 5;
    let loadModel = () => {
      return new Promise((resolve, reject) => {
        let loader = new THREE.ObjectLoader();
        loader.load("./static/three3dApp/model1/pian.json", model => {
          resolve(model);
        });
      });
    };
    loadModel().then(model => {
      /* 建了一个组 添加到场景中 循环了20个并每一个都进行克隆 */
      let group = new THREE.Group();
      // 命名
      group.name = "upLine";
      scene.add(group);
      for (var i = 0; i < ammountLines; i++) {
        let line = model.clone();
        group.add(line);
        line.scale.set(20, 30, 30);
        that.lines.push(line);
        line.position.x = -100000.0 * Math.random() + 50000;
        line.position.y = Math.random() * 100 + 5000;
        line.position.z = -100000.0 * Math.random() + 50000;
        line.modifier = Math.random();
      }
    });
  };
  that.ascendingparticleUpdate = () => {
    if (!that.lines || !that.lines.length) return;
    for (var i = that.lines.length - 1; i >= 0; i--) {
      const bodyDirection = camera.getWorldDirection(new THREE.Vector3()); //获得摄像机准心对准的三维向量
      that.lines[i].rotation.y = Math.atan2(-bodyDirection.x, -bodyDirection.z); //通过反正切函数，获得在Y轴旋转的角度。由欧拉角定义可如此设置。
      /* 上升速度 */
      that.lines[i].position.y += 190;
      if (that.lines[i].position.y > Math.random() * 100 + 20000) {
        that.lines[i].position.x = -100000.0 * Math.random() + 50000;
        that.lines[i].position.y = Math.random() * 800;
        that.lines[i].position.z = -100000.0 * Math.random() + 50000;
      }
    }
  };
  return that;
}
// 针对雪浪大会
function xueLangDaHuiFuntion() {
  let { scene } = this.assets;
  let that = {};
  let initGuangXiao = () => {
    // 对应的光效柱名为为 ChooseA、ChooseB、ChooseC
    this.getModel("ChooseA").visible = false;
    this.getModel("ChooseB").visible = false;
    this.getModel("ChooseC").visible = false;
    this.getModel("雪浪云Texiao").visible = false;
    this.getModel("雪浪云Texiao").position.y = -52830.77;
  };
  // 初始化雪浪大会状态
  that.init = () => {
    // 初始化光效
    initGuangXiao();
  };
  // 点击看牌对应的的特效显示隐藏
  that.click = tabModel => {
    //tabMadel为对应的看牌名为 A区、B区、C区
    console.log(tabModel);
    switch (tabModel.name) {
      case "A区":
        this.getModel("ChooseA").visible = !this.getModel("ChooseA").visible;
        break;
      case "B区":
        this.getModel("ChooseB").visible = !this.getModel("ChooseB").visible;
        break;
      case "C区":
        this.getModel("ChooseC").visible = !this.getModel("ChooseC").visible;
        break;
    }
  };
  return that;
}
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------

// 停车场抬杆子
function ParkingStopRod() {
  let { scene, camera, controls } = this.assets;
  /* 抬杆 */
  let stopRodModel = scene.getObjectByName("daozha");
  let focus = () => {
    this.closeAnimaList();
    let anime = this.anima(
      {
        Cx: camera.position.x,
        Cy: camera.position.y,
        Cz: camera.position.z,
        Tx: controls.target.x,
        Ty: controls.target.y,
        Tz: controls.target.z
      },
      {
        Cx: -117.949,
        Cy: 12.285207515958312,
        Cz: 43.54103,
        Tx: -68.862492508709,
        Ty: -51.4294013,
        Tz: -2.2589304
      },
      2,
      data => {
        camera.position.x = data.Cx;
        camera.position.y = data.Cy;
        camera.position.z = data.Cz;
        controls.target.x = data.Tx;
        controls.target.y = data.Ty;
        controls.target.z = data.Tz;
      },
      () => {}
    );
    this.startCloseMap.stopRod = anime;
    console.log(this.startCloseMap);
  };
  let stopRodAnima = status => {
    const upRotatedAngle = 1.4;
    const downRotatedAngle = 0;
    console.log(status, "sss");
    /* 默认角度 */
    let nowRotated = stopRodModel.rotation.z;
    if (
      (nowRotated === upRotatedAngle && status) ||
      (downRotatedAngle === nowRotated && !status)
    )
      return;
    this.anima(
      {
        z: stopRodModel.rotation.z
      },
      {
        z: status ? upRotatedAngle : downRotatedAngle
      },
      1,
      data => {
        stopRodModel.rotation.z = data.z;
      },
      () => {}
    );
  };
  return { focus, stopRodAnima };
}
// 停车场
function parkingFloor() {
  let { scene, camera, controls } = this.assets;
  const b1Floor = scene.getObjectByName("Parking02");
  let that = {};
  // 初始化材质 随机赋值颜色
  let initRandomMaterial = () => {
    b1Floor.children.forEach((item, index) => {
      // 克隆材质
      item.material = item.material.clone();
      item.material.color = new THREE.Color(
        Math.random() > 0.5 ? "#ff0000" : "#00ff00"
      );
    });
  };
  let createLineAndMoveCar = () => {
    let geometry = new THREE.BufferGeometry(); //创建一个缓冲类型几何体
    // 三维样条曲线
    const rodeLine = scene.getObjectByName("parkingRoute");
    rodeLine.children.forEach((i, index) => {
      // i.visible = false;
    });
    console.log(rodeLine.children, "rodeLine.children+++");
    console.log(rodeLine, "rodeLine");
    /* 进行排序 */
    let rodeLineList = rodeLine.children.sort(
      (a, b) =>
        a.name.replace(/[a-zA-z]+/gi, "") - b.name.replace(/[a-zA-z]+/gi, "")
    );
    console.log(rodeLineList, "rodeLineList");
    let curve = new THREE.CatmullRomCurve3(
      rodeLineList.map((i, index) => i.position)
    );

    //曲线上等间距返回多个顶点坐标
    let pointsArr = curve.getSpacedPoints(100); //分段数100，返回101个顶点

    geometry.setFromPoints(pointsArr);
    let material = new THREE.LineBasicMaterial({
      color: 0x006666
    });
    let line = new THREE.Line(geometry, material);
    scene.add(line);
    console.log(line, "line");
    const car = scene.getObjectByName("car");
    let percent = 0.0;
    let timer = setInterval(() => {
      if (percent > 0.99) return;
      let nowLocal = curve.getPointAt(percent); //曲线上一点
      car.lookAt(nowLocal);
      car.position.copy(nowLocal); //更新光点位置
      percent += 0.001;
      // if (percent > 0.99) percent = 0.0;
      if (percent > 0.99) {
        clearInterval(timer);
        carMoveComplete();
        return;
      }
    }, 16.7);
  };
  let carMoveComplete = () => {
    const car = scene.getObjectByName("car");
    var test = scene.getObjectByName("Parking18");
    test.material.color = new THREE.Color("#00ff00");
    console.log("ok");
  };
  // 改变一二层的显示状态
  that.changeOneFloorStatus = status => {
    let model = scene.children.find(i => i.name.length === 0);

    let modelList = [
      scene.getObjectByName("group1"),
      model,
      scene.getObjectByName("BuildingJanmo"),
      scene.getObjectByName("floor")
    ];
    modelList.forEach((item, index) => {
      item.visible = status;
    });
  };
  //点击事件
  that.click = e => {
    console.log(camera.position);
    console.log(controls.target);
    // const floor2 = scene.getObjectByName("Parking02");
    // let result = this.getClickEventObj(e, floor2.children);
    // if (!result || !result[0]) return;
  };
  this.createMacroTask(() => {
    // initRandomMaterial();
    // createLineAndMoveCar();
  });
  return that;
}


export default ChangeInterface;

import * as THREE from "./three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import eventBus from "./eventBus";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import ChangeInterface from "./Change";

/**
 * @{dom} 接收需要渲染入的dom
 */
var APP = {
  Player: function(dom) {
    let renderer2 = new CSS3DRenderer();
    renderer2.setSize(dom.clientWidth, dom.clientHeight);
    renderer2.domElement.style.position = "absolute";
    renderer2.domElement.style.top = 0;
    renderer2.domElement.className = "scene";
    dom.appendChild(renderer2.domElement);
    var renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;

    var loader = new THREE.ObjectLoader();
    var camera, scene, controls;

    var vrButton = VRButton.createButton(renderer);

    var events = {};

    dom.appendChild(renderer.domElement);
    this.dom = dom;

    this.width = 500;
    this.height = 500;

    this.eventBus = new eventBus();

    this.load = function(json) {
      var project = json.project;

      if (project.vr !== undefined) renderer.xr.enabled = project.vr;
      if (project.shadows !== undefined)
        renderer.shadowMap.enabled = project.shadows;
      if (project.shadowType !== undefined)
        renderer.shadowMap.type = project.shadowType;
      if (project.toneMapping !== undefined)
        renderer.toneMapping = project.toneMapping;
      if (project.toneMappingExposure !== undefined)
        renderer.toneMappingExposure = project.toneMappingExposure;
      if (project.physicallyCorrectLights !== undefined)
        renderer.physicallyCorrectLights = project.physicallyCorrectLights;

      this.setScene(loader.parse(json.scene));
      this.setCamera(loader.parse(json.camera));
      controls = new OrbitControls(camera, renderer2.domElement);

      events = {
        init: [],
        start: [],
        stop: [],
        keydown: [],
        keyup: [],
        mousedown: [],
        mouseup: [],
        mousemove: [],
        touchstart: [],
        touchend: [],
        touchmove: [],
        update: []
      };

      var scriptWrapParams = "player,renderer,scene,camera";
      var scriptWrapResultObj = {};

      for (var eventKey in events) {
        scriptWrapParams += "," + eventKey;
        scriptWrapResultObj[eventKey] = eventKey;
      }

      var scriptWrapResult = JSON.stringify(scriptWrapResultObj).replace(
        /\"/g,
        ""
      );

      for (var uuid in json.scripts) {
        var object = scene.getObjectByProperty("uuid", uuid, true);

        if (object === undefined) {
          continue;
        }

        var scripts = json.scripts[uuid];

        for (var i = 0; i < scripts.length; i++) {
          var script = scripts[i];

          var functions = new Function(
            scriptWrapParams,
            script.source + "\nreturn " + scriptWrapResult + ";"
          ).bind(object)(this, renderer, scene, camera);

          for (var name in functions) {
            if (functions[name] === undefined) continue;

            if (events[name] === undefined) {
              continue;
            }

            events[name].push(functions[name].bind(object));
          }
        }
      }

      dispatch(events.init, arguments);
    };

    this.setCamera = function(value) {
      camera = value;
      camera.aspect = this.width / this.height;
      camera.updateProjectionMatrix();
    };

    this.setScene = function(value) {
      scene = value;
    };

    this.setSize = function(width, height) {
      this.width = width;
      this.height = height;

      if (camera) {
        camera.aspect = this.width / this.height;
        camera.updateProjectionMatrix();
      }

      if (renderer) {
        renderer.setSize(width, height);
      }
    };

    function dispatch(array, event) {
      for (var i = 0, l = array.length; i < l; i++) {
        array[i](event);
      }
    }

    var time, prevTime;

    function animate() {
      time = performance.now();
      try {
        dispatch(events.update, { time: time, delta: time - prevTime });
      } catch (e) {}
      if (controls) controls.update();
      this.change.animate && this.change.animate();

      renderer.render(scene, camera);
      renderer2.render(scene, camera);
      prevTime = time;
    }

    this.play = function() {
      if (renderer.xr.enabled) dom.append(vrButton);
      prevTime = performance.now();
      document.addEventListener("keydown", onDocumentKeyDown);
      document.addEventListener("keyup", onDocumentKeyUp);
      document.addEventListener("mousedown", onDocumentMouseDown);
      document.addEventListener("mouseup", onDocumentMouseUp);
      document.addEventListener("mousemove", onDocumentMouseMove);
      document.addEventListener("touchstart", onDocumentTouchStart);
      document.addEventListener("touchend", onDocumentTouchEnd);
      document.addEventListener("touchmove", onDocumentTouchMove);
      dispatch(events.start, arguments);
      renderer.setAnimationLoop(animate.bind(this));
    };
    this.initChange = () => {
      this.change = new ChangeInterface({
        scene: scene,
        camera: camera,
        controls: controls,
        eventBus: this.eventBus,
        renderer: renderer,
        dom: dom
      });
    };
    this.stop = function() {
      if (renderer.xr.enabled) vrButton.remove();
      document.removeEventListener("keydown", onDocumentKeyDown);
      document.removeEventListener("keyup", onDocumentKeyUp);
      document.removeEventListener("mousedown", onDocumentMouseDown);
      document.removeEventListener("mouseup", onDocumentMouseUp);
      document.removeEventListener("mousemove", onDocumentMouseMove);
      document.removeEventListener("touchstart", onDocumentTouchStart);
      document.removeEventListener("touchend", onDocumentTouchEnd);
      document.removeEventListener("touchmove", onDocumentTouchMove);

      dispatch(events.stop, arguments);

      renderer.setAnimationLoop(null);
    };

    this.dispose = function() {
      this.stop();
      renderer.dispose();
      camera = undefined;
      scene = undefined;
      controls = undefined;
    };
    this.getAssets = () => {
      return { scene, camera, controls };
    };

    //

    function onDocumentKeyDown(event) {
      dispatch(events.keydown, event);
    }

    function onDocumentKeyUp(event) {
      dispatch(events.keyup, event);
    }

    function onDocumentMouseDown(event) {
      dispatch(events.mousedown, event);
    }

    function onDocumentMouseUp(event) {
      dispatch(events.mouseup, event);
    }

    function onDocumentMouseMove(event) {
      dispatch(events.mousemove, event);
    }

    function onDocumentTouchStart(event) {
      dispatch(events.touchstart, event);
    }

    function onDocumentTouchEnd(event) {
      dispatch(events.touchend, event);
    }

    function onDocumentTouchMove(event) {
      dispatch(events.touchmove, event);
    }

    /********************************************************************************************** */
    // 传出scene、camera、controls
    this.change = {};
  }
};

function initScene(sceneUrl, dom) {
  let init = new Promise((res, rej) => {
    var loader = new THREE.FileLoader();
    loader.load(
      //url
      sceneUrl,
      text => {
        let player = new APP.Player(dom);
        player.load(JSON.parse(text));
        player.setSize(dom.clientWidth, dom.clientHeight);
        player.play();

        // let worker = new Worker("./threeAssets/load.js");
        // console.log(worker);
        // // worker.postMessage(THREE.ObjectLoader.toString());
        // worker.onmessage = event => {
        splitLoad(player.getAssets()).then(() => {
          res(player);
        });
        // };
        // setTimeout(() => {
        //   splitLoad(player.getAssets()).then(() => {
        //     res(player);
        //     // player.initChange();
        //   });
        // });

        window.addEventListener("resize", function() {
          player.setSize(dom.clientWidth, dom.clientHeight);
        });
      },
      function(xhr) {
        return;
        let className = "load_scene_progress",
          div = document.querySelector("." + className),
          son;
        if (!div) {
          div = document.createElement("div");
          son = div.cloneNode(false);
          div.style = `
            width:30%;
            height:10px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            background-color:#ccc;
            border-radius:5px;
            overflow: hidden;
            `;
          son.style = `
            height:100%;
            background-color:skyblue;
            `;
          div.className = className;
          div.appendChild(son);
          dom.appendChild(div);
        } else {
          son = div.childNodes[0];
        }
        let progress =
          ((xhr.loaded / xhr.total) * 100).toString().substring(0, 4) - 0;
        son.style.width = progress + "%";
        if (progress >= 99) {
          div.remove();
        }
      }
    );
  });
  return init;
}
let splitFileList = [
  "Buildings_Inside.json",
  // "Environment_Inside.json",
  "Environment_Far.json",
  "Floors.json",
  // "Parking_underground.json",
  // "Texiao.json",
  "雪浪云Texiao.json",
  "Environment_Inside.json",
  "Parking_underground.json",
  "雪浪大会.json"
];
// 4000ms
function splitLoad(assets, file) {
  let { scene } = assets;
  return new Promise((s, j) => {
    let worker = new Worker("./static/three3dApp/model1/load.js");
    console.log(new Date().getTime());
    let nowSceneLength = scene.children.length;

    splitFileList.forEach((item, index) => {
      worker.postMessage(item);
      worker.onmessage = event => {
        let model = new THREE.ObjectLoader().parse(event.data);
        scene.add(model);
        /** 9*/
        if (scene.children.length < splitFileList.length + nowSceneLength)
          return;
        console.log(new Date().getTime());
        worker.terminate();
        s();
      };
    });
    console.log("ok");
  });
}

export default initScene;

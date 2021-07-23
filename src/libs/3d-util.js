import * as THREE from 'three'
import { TweenMax } from 'gsap'

export const JsonLoader = (jsonUrl, APP, dom) => {
  let loader = new THREE.FileLoader();
  return new Promise((resolve, reject) => {
    loader.load(jsonUrl, function (text) {
      var player = new APP.Player(dom);
      player.load(JSON.parse(text));
      player.add()
      player.setSize(dom.offsetWidth, dom.offsetHeight);
      player.play();
      dom.append(player.dom);
      resolve(player)
    })
  })
}

export const startAni = (camera, controls, position, target, time = 1) => {
  camera.tweenMax && TweenMax.killTweensOf(camera.tweenMax)
  return new Promise((resolve, reject) => {
    let _syncTweenObj = {
      c_x: camera.position.x,
      c_y: camera.position.y,
      c_z: camera.position.z,
      t_x: controls.target.x,
      t_y: controls.target.y,
      t_z: controls.target.z
    }
    camera.tweenMax = new TweenMax(_syncTweenObj, time, {
      c_x: position[0],
      c_y: position[1],
      c_z: position[2],
      t_x: target[0],
      t_y: target[1],
      t_z: target[2],
    }).eventCallback('onUpdate', () => {
      camera.position.set(_syncTweenObj.c_x, _syncTweenObj.c_y, _syncTweenObj.c_z)
      controls.target.set(_syncTweenObj.t_x, _syncTweenObj.t_y, _syncTweenObj.t_z)
    }).eventCallback('onComplete', () => {
      resolve();
    })
  })

}

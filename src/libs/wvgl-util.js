import * as math from 'mathjs'
import store from '@/store/index'
/**
 * 将dom和模型meshes绑定点击关系，点击时显示，如果将dom的style设置为none，将不会再实时更新dom位置
 * 更新dom数据，callBack中可以更新dom
 * param:Object
 * @param ground
 * @param meshes:多數情況下wvgl文件
 * @param dom:需要被绑定的dom，dom要和canvas同层级
 * @param offsetX,offsetY以左上角为原点
 * @param callBack 回调函数(点击选中的模型meshes和模型三维坐标点)
 * */
export const bindPopWinByMeshes = (param)=>{
  let {ground,meshes,dom,offsetX=0,offsetY=0,callBack} = param
  let scene = ground.getScene();
  meshes && addClick(scene,meshes,function (e) {
    let pickedE = scene.pick(e.pointerX,e.pointerY);
    let pickedPoint = pickedE.pickedPoint;
    dom && displayLayer(ground,dom,pickedPoint,offsetX,offsetY)
    callBack && callBack(dom,pickedE,pickedPoint)
  })
}

/**
 *
 * */
export const addDomByPos = (params)=>{
  let {ground,dom,pos,offsetX,offsetY} = params;
  displayLayer(ground,dom,pos,offsetX,offsetY)
}

export const  addClick = (scene,meshes,call)=>{
  for(let mesh of meshes){
    mesh.actionManager = new WVGL.ActionManager(scene)
    mesh.actionManager.registerAction(
      new WVGL.ExecuteCodeAction(
        {
          trigger: WVGL.ActionManager.OnPickTrigger,
        },
        call
      )
    );
  }
}

function worldToscreen(point,engine,scene,camera){
  return WVGL.Vector3.Project(point,WVGL.Matrix.Identity(),scene.getTransformMatrix(),camera.viewport.toGlobal(engine.getRenderWidth(),engine.getRenderHeight()));
}

function displayLayer(ground,dom,point,offsetX=0,offsetY=0){
  let engine = ground.getEngine(),scene = ground.getScene(),camera = ground.getCamera()
  dom.style.display = "block";
  let divmove = function(){
    if(dom.style.display == "none"){
      scene.unregisterBeforeRender(divmove);
    }
    let pos = worldToscreen(point,engine,scene,camera);
    dom.style.left = math.evaluate(math.evaluate(pos.x + offsetX)/store.state.viewScale.x) + 'px';
    dom.style.top =  math.evaluate(math.evaluate(pos.y + offsetY)/store.state.viewScale.y) + 'px';
  }
  scene.registerBeforeRender(divmove);
}

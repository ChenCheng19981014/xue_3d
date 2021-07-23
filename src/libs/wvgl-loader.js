/**
 * @description
 * @parma
 * @returns
 */
import '../../static/lib/wvgl'

export default function (dom, basePath) {

  let url = basePath + 'scene.json'

  let imagePath = basePath + "img/"

  let modelPath = basePath + "models/"

  let canvas = dom

  let content = {};
  /**
   * scene
   */
  let scene
  content.getScene = () => scene


  /**
   * engine
   */
  let engine
  content.getEngine = () => engine

  /**
   * camera
   */
  let camera
  content.getCamera = () => camera

  /**
   * metadata
   */
  let metadata = {}


  /**
   * script
   */
  let script = {}

  /**
   * 3dgui image
   */
  let image = {
    id: {},
    name: {}
  }

  content.getImageByName = name => image.name[name]
  content.getImageById = id => image.id[id]

  /**
   * model
   */
  let model = {
    id: {},
    name: {}
  }
  content.model = model
  content.getModelByName = name => model.name[name]
  content.getModelById = id => model.id[id]


  /**
   *

   */
  let material = {}
  content.getAllMaterial = () => material;
  content.getMaterialByName = name => material[name]

  /**
   * texture
   */
  let texture = {}
  content.getTextureByName = name => texture[name]


  /**
   * light
   */
  let light = {}
  content.getLightById = id => light[id]

  /**
   * 相机动画
   * destP:目的地相机postion
   * destR：目的地相机roation
   * counts 分割的间隔，间隔越多时间越长 所花时间
   * */
  content.freeCameraMoveAction = (destP, destR, counts)=>{
    return new Promise((resolve, reject) => {
      let limitpositionx = (camera.position.x - destP.x) / counts;
      let limitpositiony = (camera.position.y - destP.y) / counts;
      let limitpositionz = (camera.position.z - destP.z) / counts;
      let limitrotationx = (camera.rotation.x - destR.x) / counts;
      let limitrotationy = (camera.rotation.y - destR.y) / counts;
      let limitrotationz = (camera.rotation.z - destR.z) / counts;
      let index1 = 0;
      let movePos = ()=> {
        if (index1 >= counts) {
          engine.stopRenderLoop(movePos);
          camera.isMoving = false;
          resolve()
        }
        index1 += 1;
        camera.position.x -= limitpositionx;
        camera.position.y -= limitpositiony;
        camera.position.z -= limitpositionz;
        camera.rotation.x -= limitrotationx;
        camera.rotation.y -= limitrotationy;
        camera.rotation.z -= limitrotationz;
      }
      if(camera.isMoving == true) {
        engine.stopRenderLoop(camera.movePos);
      }
      engine.runRenderLoop(movePos);
      camera.movePos = movePos;
      camera.isMoving = true
    }).catch(err=>{
      console.error('err',err)
    })

  }

  let loader = async (sceneData) => {

    let createScene = () => {

      engine = new WVGL.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true})
      scene = new WVGL.Scene(engine)

      engine.runRenderLoop(function () {
        if (scene) {
          scene.render()
        }
      })

      addEventListener("resize", function () {
        engine.resize()
      })

    }

    let loadScene = () => {

        let data = sceneData.scene
        scene.clearColor = new WVGL.Color4(data.clearColor.r, data.clearColor.g, data.clearColor.b, 0)
        scene.ambientColor = new WVGL.Color3(data.ambientColor.r, data.ambientColor.g, data.ambientColor.b)
        scene.fogColor = new WVGL.Color3(data.fogColor.r, data.fogColor.g, data.fogColor.b)

        scene.fogDensity = data.fogDensity
        scene.fogEnabled = data.fogEnabled
        scene.fogStart = data.fogStart
        scene.fogMode = data.fogMode
        scene.fogEnd = data.fogEnd



        let glow = new WVGL.GlowLayer("glow-layer", scene)
        glow.isEnabled = data.glow.isEnabled
        glow.intensity = data.glow.intensity
        glow.blurKernelSize = data.glow.blurKernelSize


      if (data.environmentTexture) {
        scene.environmentTexture = WVGL.CubeTexture.CreateFromPrefilteredData(imagePath + data.environmentTexture, scene)
      }

      if (data.skyBox) {
        scene.createDefaultSkybox(WVGL.CubeTexture.CreateFromPrefilteredData(imagePath + data.skyBox, scene), false, 40000, 1, false)
      }


      let events = {
        scene, engine
      }

      if (data.onload) {
        eval(script[data.onload])
      }

    }

    let createCamera = () => {
      let data = sceneData.camera
      let editorCamera = new WVGL.FreeCamera("camera", new WVGL.Vector3(data.position[0], data.position[1], data.position[2]), scene)
      editorCamera.rotation = new WVGL.Vector3(...data.rotation)
      editorCamera.position = new WVGL.Vector3(...data.position)
      editorCamera.maxZ = data.maxZ
      editorCamera.minZ = data.minZ
      editorCamera.speed = data.speed
      editorCamera.keysUp = [87]
      editorCamera.keysDown = [83]
      editorCamera.keysLeft = [65]
      editorCamera.keysRight = [68]
      editorCamera.angularSensibility = data.angularSensibility
      editorCamera.inertia = data.inertia
      editorCamera.attachControl(canvas)
      camera = editorCamera
    }

    let createScript = () => {
      let data = sceneData.script

      for (let scriptName in data) {
        script[scriptName] = data[scriptName]
      }

    }

    let createMetaData = () => {
      let data = sceneData.metadata

      for (let metadataname in data) {
        metadata[metadataname] = data[metadataname]
      }
    }

    let createImage =  () => {
      let imageData = sceneData.gui.image
      for (let i = 0; i < imageData.length; i++) {
        let data = imageData[i]
        let promise = getImageSize(imagePath + data.fileName).then(imgsize=>{
          let constWidth = 100
          let limit = constWidth / imgsize.width
          imgsize.width = constWidth
          imgsize.height *= limit

          let image1 = WVGL.MeshBuilder.CreatePlane("plane", {width: imgsize.width, height: imgsize.height}, scene);
          image1.position = new WVGL.Vector3(data.position.x, data.position.y, data.position.z)
          image1.rotation = new WVGL.Vector3(data.rotation.x, data.rotation.y, data.rotation.z)
          image1.scaling = new WVGL.Vector3(data.scaling.x, data.scaling.y, data.scaling.z)
          image1.billboardMode = data.billboardMode
          image1.isVisible = data.isVisible
          let imgContainer = WVGL.GUI.AdvancedDynamicTexture.CreateForMesh(image1)
          imgContainer.addControl(new WVGL.GUI.Image("img", imagePath + data.fileName))

          image.id[data.id] = image

          let events = {engine, scene, image: image1}
          if (image[data.name] == null) {
            image.name[data.name] = []
          }

          if (data.onload) {
            eval(script[data.onload])
          }


          if (data.metadata) {
            try {
              image1.metadata = JSON.parse(metadata[data.metadata])
            } catch (e) {
              console.log(e)
            }
          }
          if (data.onclick != undefined) {
            image1.actionManager = new WVGL.ActionManager(scene)
            image1.actionManager.registerAction(new WVGL.ExecuteCodeAction(WVGL.ActionManager.OnPickTrigger, function () {
              eval(script[data.onclick])
            }))
          }
          image.name[data.name].push(image)
        })
        promiseArr.push(promise)
        // let imgsize = await getImageSize(imagePath + data.fileName)
        // let constWidth = 100
        // let limit = constWidth / imgsize.width
        // imgsize.width = constWidth
        // imgsize.height *= limit
        //
        // let image1 = WVGL.MeshBuilder.CreatePlane("plane", {width: imgsize.width, height: imgsize.height}, scene);
        // image1.position = new WVGL.Vector3(data.position.x, data.position.y, data.position.z)
        // image1.rotation = new WVGL.Vector3(data.rotation.x, data.rotation.y, data.rotation.z)
        // image1.scaling = new WVGL.Vector3(data.scaling.x, data.scaling.y, data.scaling.z)
        // image1.billboardMode = data.billboardMode
        // image1.isVisible = data.isVisible
        // let imgContainer = WVGL.GUI.AdvancedDynamicTexture.CreateForMesh(image1)
        // imgContainer.addControl(new WVGL.GUI.Image("img", imagePath + data.fileName))
        //
        // image.id[data.id] = image
        //
        // let events = {engine, scene, image: image1}
        // if (image[data.name] == null) {
        //   image.name[data.name] = []
        // }
        //
        // if (data.onload) {
        //   eval(script[data.onload])
        // }
        //
        //
        // if (data.metadata) {
        //   try {
        //     image1.metadata = JSON.parse(metadata[data.metadata])
        //   } catch (e) {
        //     console.log(e)
        //   }
        // }
        // if (data.onclick != undefined) {
        //   image1.actionManager = new WVGL.ActionManager(scene)
        //   image1.actionManager.registerAction(new WVGL.ExecuteCodeAction(WVGL.ActionManager.OnPickTrigger, function () {
        //     eval(script[data.onclick])
        //   }))
        // }
        // image.name[data.name].push(image)
      }
    }

    let loadTexture = () => {
      let texturedata = sceneData.texture
      for (let name in texturedata) {
        let data = texturedata[name]
        let textures = new WVGL.Texture(imagePath + data.fileName, scene)
        textures.uOffset = data.uOffset
        textures.vOffset = data.vOffset
        textures.vOffset = data.vOffset
        textures.uScale = data.uScale
        textures.vScale = data.vScale
        textures.vAng = data.vAng
        textures.uAng = data.uAng
        textures.wAng = data.wAng
        textures.wrapU = data.wrapU
        textures.wrapR = data.wrapR
        textures.wrapV = data.wrapV
        textures.coordinatesIndex = data.coordinatesIndex
        texture[name] = textures

        let events = {scene, engine, texture: textures}
        if (data.onload) {
          eval(script[data.onload])
        }
      }


    }

    let loadMaterial = () => {

      let createStandartMaterial = (data) => {
        let material = new WVGL.StandardMaterial("", scene)
        material.alpha = data.alpha
        material.alphaMode = data.alphaMode
        material.linkEmissiveWithDiffuse = data.linkEmissiveWithDiffuse
        material.useAlphaFromDiffuseTexture = data.useAlphaFromDiffuseTexture
        material.diffuseTexture = data.diffuseTexture ? texture[data.diffuseTexture] : null
        material.diffuseColor = new WVGL.Color3(data.diffuseColor.r, data.diffuseColor.g, data.diffuseColor.b)
        material.invertNormalMapX = data.invertNormalMapX
        material.invertNormalMapX = data.invertNormalMapX
        material.invertNormalMapY = data.invertNormalMapY
        material.useParallax = data.useParallax
        material.maxSimultaneousLights = 100
        material.invertNormalMapY = data.invertNormalMapY
        material.parallaxScaleBias = data.parallaxScaleBias
        material.bumpTexture = data.bumpTexture ? texture[data.bumpTexture] : null
        material.specularPower = data.specularPower
        material.useGlossinessFromSpecularMapAlpha = data.useGlossinessFromSpecularMapAlpha
        material.useReflectionFresnelFromSpecular = data.useReflectionFresnelFromSpecular
        material.useReflectionFresnelFromSpecular = data.useReflectionFresnelFromSpecular
        material.specularColor = new WVGL.Color3(data.specularColor.r, data.specularColor.g, data.specularColor.b)
        material.specularTexture = data.specularTexture ? texture[data.specularTexture] : null
        material.opacityTexture = data.opacityTexture ? texture[data.opacityTexture] : null
        material.useEmissiveAsIllumination = data.useEmissiveAsIllumination
        material.emissiveColor = new WVGL.Color3(data.emissiveColor.r, data.emissiveColor.g, data.emissiveColor.b)
        material.emissiveTexture = data.emissiveTexture ? texture[data.emissiveTexture] : null
        material.ambientColor = new WVGL.Color3(data.ambientColor.r, data.ambientColor.g, data.ambientColor.b)
        material.ambientTexture = data.ambientTexture ? texture[data.ambientTexture] : null
        material.useLightmapAsShadowmap = data.useLightmapAsShadowmap
        material.lightmapTexture = data.lightmapTexture ? texture[data.lightmapTexture] : null
        material.reflectionTexture = data.reflectionTexture ? texture[data.reflectionTexture] : null
        material.refractionTexture = data.refractionTexture ? texture[data.refractionTexture] : null
        material.invertRefractionY = data.invertRefractionY
        material.indexOfRefraction = data.indexOfRefraction
        material.indexOfRefraction = data.indexOfRefraction
        material.wireframe = data.wireframe
        material.backFaceCulling = data.backFaceCulling
        material.microSurfaceTexture = data.microSurfaceTexture ? texture[data.microSurfaceTexture] : null

        let events = {scene, engine, material}
        if (data.onload) {
          eval(script[data.onload])
        }

        return material

      }
      let createPBRMaterial = (data) => {

        let material = new WVGL.PBRMaterial("", scene)

        //注入元数据
        material.alpha = data.alpha
        material.alphaMode = data.alphaMode
        material.forceIrradianceInFragment = data.forceIrradianceInFragment
        material.forceNormalForward = data.forceNormalForward
        material.enableSpecularAntiAliasing = data.enableSpecularAntiAliasing
        material.usePhysicalLightFalloff = data.usePhysicalLightFalloff
        material.directIntensity = data.directIntensity
        material.directIntensity = data.directIntensity
        material.albedoTexture = data.albedoTexture ? texture[data.albedoTexture] : null
        material.albedoColor = new WVGL.Color3(data.albedoColor.r, data.albedoColor.g, data.albedoColor.b)
        material.invertNormalMapX = data.invertNormalMapX
        material.invertNormalMapY = data.invertNormalMapY
        material.useParallax = data.useParallax
        material.useParallaxOcclusion = data.useParallaxOcclusion
        material.parallaxScaleBias = data.parallaxScaleBias
        material.maxSimultaneousLights = 100
        material.bumpTexture = data.bumpTexture ? texture[data.bumpTexture] : null
        material.reflectivityColor = new WVGL.Color3(data.reflectivityColor.r, data.reflectivityColor.g, data.reflectivityColor.b)
        material.reflectivityTexture = data.reflectivityTexture ? texture[data.reflectivityTexture] : null
        material.reflectionColor = new WVGL.Color3(data.reflectionColor.r, data.reflectionColor.g, data.reflectionColor.b)
        material.useMicroSurfaceFromReflectivityMapAlpha = data.useMicroSurfaceFromReflectivityMapAlpha
        material.useAutoMicroSurfaceFromReflectivityMap = data.useAutoMicroSurfaceFromReflectivityMap
        material.microSurface = data.microSurface
        material.useMetallnessFromMetallicTextureBlue = data.useMetallnessFromMetallicTextureBlue
        material.useRoughnessFromMetallicTextureAlpha = data.useRoughnessFromMetallicTextureAlpha
        material.useRoughnessFromMetallicTextureGreen = data.useRoughnessFromMetallicTextureGreen
        material.metallic = data.metallic
        material.roughness = data.roughness
        material.metallicTexture = data.metallicTexture ? texture[data.metallicTexture] : null
        material.useRadianceOverAlpha = data.useRadianceOverAlpha
        material.useSpecularOverAlpha = data.useSpecularOverAlpha
        material.opacityTexture = data.opacityTexture ? texture[data.opacityTexture] : null
        material.emissiveColor = new WVGL.Color3(data.emissiveColor.r, data.emissiveColor.g, data.emissiveColor.b)
        material.emissiveTexture = data.emissiveTexture ? texture[data.emissiveTexture] : null
        material.emissiveIntensity = data.emissiveIntensity
        material.ambientColor = new WVGL.Color3(data.ambientColor.r, data.ambientColor.g, data.ambientColor.b)
        material.ambientTexture = data.ambientTexture ? texture[data.ambientTexture] : null
        material.ambientTextureStrength = data.ambientTextureStrength
        material.useLightmapAsShadowmap = data.useLightmapAsShadowmap
        material.lightmapTexture = data.lightmapTexture ? texture[data.lightmapTexture] : null
        material.wireframe = data.wireframe
        material.backFaceCulling = data.backFaceCulling

        let events = {scene, engine, material}
        if (data.onload) {
          eval(script[data.onload])
        }
        return material
      }

      let materialData = sceneData.material

      for (let name in materialData) {
        let data = materialData[name]
        let m
        if (data.type == "PBRMaterial") {
          m = createPBRMaterial(data)
        } else {
          m = createStandartMaterial(data)
        }

        material[name] = m
      }

    }
    let promiseArr = [];
    let loaderMesh =  () => {
      let meshesData = sceneData.mesh
      for (let i = 0; i < meshesData.length; i++) {
        let data = meshesData[i]
        let promise = WVGL.SceneLoader.ImportMeshAsync("", modelPath, data.fileName, scene).then(res=>{
          let meshes = res.meshes
          meshes.map((mesh, index) => {
            let nodeData = data.node[index]
            mesh.position = new WVGL.Vector3(nodeData.position.x, nodeData.position.y, nodeData.position.z)
            mesh.scaling = new WVGL.Vector3(nodeData.scaling.x, nodeData.scaling.y, nodeData.scaling.z)
            mesh.rotation = new WVGL.Vector3(nodeData.rotation.x, nodeData.rotation.y, nodeData.rotation.z)
            mesh.applyFog = true
            mesh.isVisible = nodeData.isVisible

            mesh.material = material[nodeData.material]
            model.id[nodeData.id] = mesh
            if (model.name[nodeData.name] == null) {
              model.name[nodeData.name] = []
            }


            if (nodeData.metadata) {

              try {

                mesh.metadata = JSON.parse(metadata[nodeData.metadata])
              } catch (e) {
                console.log(e)
              }
            }

            let events = {
              scene, engine, meshes, mesh
            }
            if (nodeData.onload) {
              eval(script[nodeData.onload])
            }

            if (nodeData.onclick != undefined) {
              mesh.actionManager = new WVGL.ActionManager(scene)
              mesh.actionManager.registerAction(new WVGL.ExecuteCodeAction(WVGL.ActionManager.OnPickTrigger, function () {
                eval(script[nodeData.onclick])
              }))
            }
            model.name[nodeData.name].push(mesh)


          })
        })
        // const {meshes} = await WVGL.SceneLoader.ImportMeshAsync("", modelPath, data.fileName, scene)
        promiseArr.push(promise)

      }


      // return new Promise(reject => reject())
    }

    let loadLight = () => {

      let addPointLight = data => {
        let light = new WVGL[data.type]("", new WVGL.Vector3(0, 0, 0), scene)
        light.range = data.range
        light.radius = data.radius
        light.intensity = data.intensity
        light.position = new WVGL.Vector3(data.position.x, data.position.y, data.position.z)

        light.diffuse = new WVGL.Color3(data.diffuse.r, data.diffuse.g, data.diffuse.b)
        light.specular = new WVGL.Color3(data.specular.r, data.specular.g, data.specular.b)


        let events = {
          scene, engine, light
        }


        if (data.onload) {
          eval(script[data.onload])
        }


        return light
      }

      let addDirectionalLight = data => {
        let light = new WVGL[data.type]("", new WVGL.Vector3(0, 0, 0), scene)
        light.position = new WVGL.Vector3(data.position.x, data.position.y, data.position.z)
        light.direction = new WVGL.Vector3(data.direction.x, data.direction.y, data.direction.z)
        light.diffuse = new WVGL.Color3(data.diffuse.r, data.diffuse.g, data.diffuse.b)
        light.specular = new WVGL.Color3(data.specular.r, data.specular.g, data.specular.b)

        //初始化数据
        light.range = data.range
        light.intensity = data.intensity
        light.radius = data.radius

        let events = {
          scene, engine, light
        }
        if (data.onload) {
          eval(script[data.onload])
        }
        return light
      }

      let addSpotLight = data => {
        let light = new WVGL[data.type]("", new WVGL.Vector3(0, 0, 0), scene)
        light.range = data.range
        light.radius = data.radius
        light.exponent = data.exponent
        light.angle = data.angle
        light.intensity = data.intensity
        light.diffuse = new WVGL.Color3(data.diffuse.r, data.diffuse.g, data.diffuse.b)
        light.specular = new WVGL.Color3(data.specular.r, data.specular.g, data.specular.b)

        let events = {
          scene, engine, light
        }
        if (data.onload) {
          eval(script[data.onload])
        }
        return light
      }

      let lightJson = sceneData.light

      for (let data of lightJson) {

        let lig

        if (data.type == "DirectionalLight") {
          lig = addDirectionalLight(data)
        } else if (data.type == "PointLight") {
          lig = addPointLight(data)
        } else {
          lig = addSpotLight(data)
        }

        light[data.id] = lig
      }


    }

    createScript()
    createMetaData()
    createScene()
    loadScene()
    createCamera()
    loadLight()
    loadTexture()
    loadMaterial()
    createImage()
    loaderMesh()
    return Promise.all(promiseArr)
  }

  function getImageSize(url) {
    return new Promise(_ => {
      let width, height
      var element= new Image();
      element.src = url

      element.onload = () => {
        width = element.naturalWidth
        height = element.naturalHeight
        element.parentNode.removeChild(element)

        _({
          width,
          height
        })
      }

    })

  }


  /**
   * @description
   */
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open("GET", url)
    xhr.send()
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        console.log('JSON.parse(xhr.response)',JSON.parse(xhr.response))
        loader(JSON.parse(xhr.response)).then(() => {
          resolve(content)
        })
      }
    }
  }).catch(err=>{
    console.error('err',err)
  })
}

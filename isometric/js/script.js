import * as THREE from "https://auxdesigner.github.io/isometric/js/three.js";
import { OrbitControls } from "https://auxdesigner.github.io/isometric/js/OrbitControls.js";
import { GLTFLoader } from "https://auxdesigner.github.io/isometric/js/GLTFLoader.js";
import { OutlineEffect } from "https://auxdesigner.github.io/isometric/js/OutlineEffect.js";

// *********************************** Assets ***********************************
// Material
var initMtl = new THREE.MeshPhongMaterial({
  color: 0xf1f1f1,
  shininess: 0,
});

// Models
var model = [
  {
    ID: "room",
    path: "glb/room.glb",
    structure: [
      { childID: "Wall", mtl: initMtl },
      { childID: "WallBottom", mtl: initMtl },
    ],
    palette: [
      "FFF0F0",
      "FFF7F0",
      "FFFFF0",
      "F3FFF0",
      "F0FFF7",
      "F0FFFE",
      "F0F7FF",
      "F0F0FF",
      "FBF0FF",
      "FFF0F6",
    ],
  },
  {
    ID: "mat",
    path: "glb/mat.glb",
    structure: [{ childID: "FloorMat", mtl: initMtl }],
    layout: [
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
      {
        position: [-0.2, 0, 0],
        rotation: [0, 1.55, 0],
      },
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
      {
        position: [-0.2, 0, 0],
        rotation: [0, 1.55, 0],
      },
    ],
    palette: ["F98096", "F1BC40", "19BACA", "8A80F9", "F980F5"],
  },
  {
    ID: "window",
    path: "glb/window.glb",
    structure: [
      { childID: "Window1", mtl: initMtl },
      { childID: "Window2", mtl: initMtl },
      { childID: "Window3", mtl: initMtl },
    ],
    layout: [
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
      {
        position: [0.5, 0, 0],
        rotation: [0, -4.7, 0],
      },
      {
        position: [0.5, 0, 0],
        rotation: [0, -4.7, 0],
      },
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
    ],
    palette: [
      "FDBFBF",
      "FDE8BF",
      "D9FDBF",
      "BFFDE3",
      "BFECFD",
      "C9BFFD",
      "FDBFF6",
    ],
  },
  {
    ID: "shelf",
    path: "glb/shelf.glb",
    structure: [{ childID: "Shelf", mtl: initMtl }],
    layout: [
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
      {
        position: [0.02, 0, -0.2],
        rotation: [0, 4.7, 0],
      },
      {
        position: [0.02, 0, -0.2],
        rotation: [0, 4.7, 0],
      },
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
    ],
    palette: [
      "FDBFBF",
      "FDE8BF",
      "D9FDBF",
      "BFFDE3",
      "BFECFD",
      "C9BFFD",
      "FDBFF6",
    ],
  },
  {
    ID: "pinwheel",
    path: "glb/animated_pinwheel.glb",
    structure: [
      { childID: "Pin", mtl: initMtl },
      { childID: "Blade1", mtl: initMtl },
      { childID: "Blade2", mtl: initMtl },
      { childID: "Blade3", mtl: initMtl },
      { childID: "Blade4", mtl: initMtl },
    ],
    layout: [
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
      {
        position: [0.2, -0.1, -0.3],
        rotation: [0, 4.7, 0],
      },
      {
        position: [-1.2, -0.2, 0],
        rotation: [0, 0, 0],
      },
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
    ],
    palette: ["EEEEEE", "F1BE40", "57A55B", "5281E9", "D74F3E"],
  },
  {
    ID: "book",
    path: "glb/book.glb",
    structure: [
      { childID: "ShelfBook1", mtl: initMtl },
      { childID: "ShelfBook2", mtl: initMtl },
    ],
    layout: [
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
      {
        position: [0.05, 0, -0.2],
        rotation: [0, 4.7, 0],
      },
      {
        position: [0.05, 0, -0.2],
        rotation: [0, 4.7, 0],
      },
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
    ],
    palette: ["F98096", "F1BC40", "19BACA", "8A80F9", "F980F5"],
  },
  {
    ID: "plant",
    path: "glb/plant.glb",
    structure: [{ childID: "ShelfPlant", mtl: initMtl }],
    layout: [
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
      {
        position: [0.05, 0, -0.2],
        rotation: [0, 4.7, 0],
      },
      {
        position: [0.05, 0, -0.2],
        rotation: [0, 4.7, 0],
      },
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
    ],
    palette: ["71BF02", "26BF02", "ADBF02", "02BF56"],
  },
  {
    ID: "pot",
    path: "glb/pot.glb",
    structure: [{ childID: "ShelfPot", mtl: initMtl }],
    layout: [
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
      {
        position: [0.05, 0, -0.2],
        rotation: [0, 4.7, 0],
      },
      {
        position: [0.05, 0, -0.2],
        rotation: [0, 4.7, 0],
      },
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
    ],
    palette: ["720000", "470053", "530019", "505050"],
  },
  {
    ID: "bed",
    path: "glb/bed.glb",
    structure: [{ childID: "Bedframe", mtl: initMtl }],
    layout: [
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
      {
        position: [0, 0, 0.8],
        rotation: [0, -1.6, 0],
      },
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
      {
        position: [0, 0, 0.8],
        rotation: [0, -1.6, 0],
      },
    ],
    palette: ["703800", "53005F", "5F0010", "424242"],
  },
  {
    ID: "bedding",
    path: "glb/bedding.glb",
    structure: [
      { childID: "BedBlanket", mtl: initMtl },
      { childID: "BedMatress", mtl: initMtl },
      { childID: "BedPillow", mtl: initMtl },
    ],
    layout: [
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
      {
        position: [0, 0, 0.8],
        rotation: [0, -1.6, 0],
      },
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
      {
        position: [0, 0, 0.8],
        rotation: [0, -1.6, 0],
      },
    ],
    palette: ["FFC8C5", "FFEDC5", "C5D3FF", "E9C5FF", "FFC5E2"],
  },
  {
    ID: "nightstand",
    path: "glb/nightstand.glb",
    structure: [{ childID: "LampStand", mtl: initMtl }],
    layout: [
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
      {
        position: [0, 0, -0.8],
        rotation: [0, 4.7, 0],
      },
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
      {
        position: [0, 0, -0.8],
        rotation: [0, 4.7, 0],
      },
    ],
    palette: ["703800", "53005F", "5F0010", "424242"],
  },
  {
    ID: "Lamptop",
    path: "glb/lamptop.glb",
    structure: [{ childID: "LampTop", mtl: initMtl }],
    layout: [
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
      {
        position: [0, 0, -0.8],
        rotation: [0, 4.7, 0],
      },
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
      {
        position: [0, 0, -0.8],
        rotation: [0, 4.7, 0],
      },
    ],
    palette: [
      "FDBFBF",
      "FDE8BF",
      "D9FDBF",
      "BFFDE3",
      "BFECFD",
      "C9BFFD",
      "FDBFF6",
    ],
  },
  {
    ID: "Lampbase",
    path: "glb/lampbase.glb",
    structure: [{ childID: "LampBase", mtl: initMtl }],
    layout: [
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
      {
        position: [0, 0, -0.8],
        rotation: [0, 4.7, 0],
      },
      {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
      {
        position: [0, 0, -0.8],
        rotation: [0, 4.7, 0],
      },
    ],
    palette: ["703800", "00565F", "0C005F", "53005F", "5F0010", "424242"],
  },
];

// Lamp color
var lightPalette = ["#ff0000", "#ffffff", "#4285f4", "#39ff33"];

// Lamp
var glowMap = new THREE.TextureLoader().load("glb/glow.png");
var glowMaterial = new THREE.SpriteMaterial({
  map: glowMap,
  blending: THREE.AdditiveBlending,
  transparent: true,
  opacity: 0.5,
});
var glow = new THREE.Sprite(glowMaterial);
glow.position.set(0.427, 0.5, 0.63);
glow.scale.set(0.3, 0.3, 0.3);
glow.material.color.set(randomItem(lightPalette));

// *********************************** Scene ***********************************

// Init scene
var BACKGROUND_COLOR = 0xdff9ff,
  scene = new THREE.Scene(),
  canvas = document.querySelector("#canvas"),
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
scene.background = new THREE.Color(BACKGROUND_COLOR);
scene.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 100);
renderer.shadowMap.enabled = false;
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Add outline
let effect;
effect = new OutlineEffect(renderer, {
  defaultThickness: 0.003,
  defaultColor: [0, 0, 0],
  defaultAlpha: 1,
});

// Add a camerra
// fov, aspect ratio, near, fear
var camera = new THREE.PerspectiveCamera(
  15,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.x = 12.5;
camera.position.y = 12.5;
camera.position.z = -12.5;
camera.zoom = 1;

// Add controls
var controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = false;

// Init GLTF
var mixer,
  clock = new THREE.Clock();

for (let i in model) {
  var loader = new GLTFLoader();
  loader.load(
    model[i].path,
    function (gltf) {
      model[i].ID = gltf.scene;
      model[i].ID.traverse((o) => {
        if (o.isMesh) {
          o.castShadow = false;
          o.receiveShadow = false;
        }
      });

      // Set initial textures
      for (let j in model[i].structure) {
        initTexture(
          model[i].ID,
          model[i].structure[j].childID,
          model[i].structure[j].mtl
        );
      }

      scene.add(model[i].ID);

      // Skip pinwheel
      if (i != 4) {
        colors(model[i]);
      }

      // Animate and fix color of pinwheel
      if (i == 4) {
        mixer = new THREE.AnimationMixer(model[4].ID);
        for (let clip in gltf.animations) {
          mixer.clipAction(gltf.animations[clip]).play();
        }

        var pinWheelColors = model[4].palette;
        for (let c in pinWheelColors) {
          setMaterial(
            model[4].ID,
            model[4].structure[c].childID,
            new THREE.MeshPhongMaterial({
              color: parseInt("0x" + pinWheelColors[c]),
              shininess: 0,
            })
          );
        }
      }

      // Attach Glow to Lamp
      if (model[i].path == "glb/lamptop.glb") {
        model[i].ID.add(glow);
      }
      animate();
    },
    undefined, //xhr
    undefined // error
  );
}

// Assign color
function colors(model) {
  for (let i in model.structure) {
    const randomColor = randomItem(model.palette);
    const new_mtl = new THREE.MeshPhongMaterial({
      color: parseInt("0x" + randomColor),
      shininess: 0,
    });
    setMaterial(model.ID, model.structure[i].childID, new_mtl);
  }
}

// Set material
function setMaterial(parent, type, mtl) {
  parent.traverse((o) => {
    if (o.isMesh && o.nameID != null) {
      if (o.nameID == type) {
        o.material = mtl;
      }
    }
  });
}

// Add default textures to the models
function initTexture(parent, type, mtl) {
  parent.traverse((o) => {
    if (o.isMesh) {
      if (o.name.includes(type)) {
        o.material = mtl;
        o.nameID = type; // Set a new property to identify this object
      }
    }
  });
}

// Env lights
function environment() {
  // Add hemisphere light to scene
  var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  // Add direct light to scene
  var dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
  dirLight.position.set(8, 12, -10);
  dirLight.castShadow = false;
  scene.add(dirLight);

  // Axis
  // const axesHelper = new THREE.AxesHelper(3);
  // scene.add(axesHelper);

  // Floor
  var floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
  var floorMaterial = new THREE.MeshPhongMaterial({
    color: 0xd3f3fb,
    shininess: 0,
  });

  var floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -0.5 * Math.PI;
  floor.receiveShadow = false;
  floor.position.y = -1;
  scene.add(floor);
}
environment();

// Anim func
function animate() {
  controls.update();
  if (mixer) {
    mixer.update(clock.getDelta());
  }
  renderer.render(scene, camera);
  effect.render(scene, camera);
  requestAnimationFrame(animate);

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
}
animate();

// *********************************** Interaction ***********************************

// Button
document.getElementById("button").onclick = function (e) {
  for (let i in model) {
    // select a random color for models and light, skip pinwheel
    if (i != 4) {
      colors(model[i]);
    }
    glow.material.color.set(randomItem(lightPalette));

    // select a random layout index (starting from the model[1], which has layouts)
    // assuming all models have the same number of layouts
    var selectedLayout = model[1].layout.indexOf(randomItem(model[1].layout));
    for (let i = 1; i < model.length; i++) {
      //console.log(model[i].layout[selectedLayout]);
      anime({
        targets: model[i].ID.position,
        x: model[i].layout[selectedLayout].position[0],
        y: model[i].layout[selectedLayout].position[1],
        z: model[i].layout[selectedLayout].position[2],
        easing: "easeOutQuad",
        duration: 700,
        update: function () {},
      });
      anime({
        targets: model[i].ID.rotation,
        x: model[i].layout[selectedLayout].rotation[0],
        y: model[i].layout[selectedLayout].rotation[1],
        z: model[i].layout[selectedLayout].rotation[2],
        easing: "easeOutQuad",
        duration: 700,
        update: function () {},
      });
    }
  }
};

// *********************************** Util ***********************************

// Resize
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  var width = window.innerWidth;
  var height = window.innerHeight;
  var canvasPixelWidth = canvas.width / window.devicePixelRatio;
  var canvasPixelHeight = canvas.height / window.devicePixelRatio;

  const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

// Randomizer
function randomItem(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

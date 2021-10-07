import * as THREE from "https://cdn.skypack.dev/pin/three@v0.133.1-nP52U8LARkTRhxRcba9x/mode=imports,min/optimized/three.js";
import { OrbitControls } from "https://cdn.skypack.dev/pin/three@v0.133.1-nP52U8LARkTRhxRcba9x/mode=imports,min/unoptimized/examples/jsm/controls/OrbitControls.js";
import { TWEEN } from "https://cdn.skypack.dev/pin/three@v0.133.1-nP52U8LARkTRhxRcba9x/mode=imports,min/unoptimized/examples/jsm/libs/tween.module.min.js";
import { InteractionManager } from "./three.interactive.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/pin/three@v0.133.1-nP52U8LARkTRhxRcba9x/mode=imports,min/unoptimized/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "https://cdn.skypack.dev/pin/three@v0.133.1-nP52U8LARkTRhxRcba9x/mode=imports,min/unoptimized/examples/jsm/loaders/DRACOLoader.js";

var Colors = {
  red: 0xf25346,
  white: 0xd8d0d1,
  brown: 0x59332e,
  pink: 0xf5986e,
  brownDark: 0x23190f,
  blue: 0x68c3c0,
};

var scene, camera, renderer, container;

var SCREEN_WIDTH = window.innerWidth,
  SCREEN_HEIGHT = window.innerHeight,
  aspect = SCREEN_WIDTH / SCREEN_HEIGHT,
  frustumSize = 600;

// Camera
camera = camera = new THREE.OrthographicCamera(
  (0.5 * frustumSize * aspect) / -2,
  (0.5 * frustumSize * aspect) / 2,
  frustumSize / 2,
  frustumSize / -2,
  150,
  1000
);

camera.position.set(300, 300, 300);

// Scene
scene = new THREE.Scene();
scene.fog = new THREE.Fog(Colors.white, 100, 950);
renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener("resize", onWindowResize);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Interaction
const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);

// Lights
function createLight() {
  var hemisphereLight, shadowLight;

  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
  shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);

  shadowLight.position.set(150, 350, 350);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;

  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;

  scene.add(hemisphereLight);
  scene.add(shadowLight);
}

// DOM
function createDOM() {
  container = document.getElementById("world");
  container.appendChild(renderer.domElement);
}

// Control
function createControl() {
  const controls = new OrbitControls(camera, renderer.domElement);
  // controls.minDistance = 5;
  // controls.maxDistance = 100;
}

// Model
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath("js/libs/draco/gltf/");

// const loader = new GLTFLoader();
// loader.setDRACOLoader(dracoLoader);
// loader.load(
//   "cube.gltf",
//   function (gltf) {
//     const model = gltf.scene;
//     model.position.set(-80, 30, 50);
//     model.scale.set(0.5, 0.8, 0.05);
//     scene.add(model);
//   },
//   undefined,
//   function (e) {
//     console.error(e);
//   }
// );

// Rounded
const roundedRectShape = new THREE.Shape();

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
  ctx.lineTo(x + width - radius, y + height);
  ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  ctx.lineTo(x + width, y + radius);
  ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
  ctx.lineTo(x + radius, y);
  ctx.quadraticCurveTo(x, y, x, y + radius);
}
roundedRect(roundedRectShape, 0, 0, 100, 200, 16);

const extrudeSettings = {
  depth: 8,
  bevelEnabled: true,
  bevelSegments: 2,
  steps: 2,
  bevelSize: 1,
  bevelThickness: 1,
};

// addShape( shape, color, x, y, z, rx, ry,rz, s );
addShape(
  roundedRectShape,
  extrudeSettings,
  Colors.pink,
  40,
  40,
  100,
  0,
  0,
  0,
  1
);

function addShape(shape, extrudeSettings, color, x, y, z, rx, ry, rz, s) {
  // extruded shape

  var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

  var mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshPhongMaterial({ color: color })
  );
  mesh.position.set(x, y, z - 75);
  mesh.rotation.set(rx, ry, rz);
  mesh.scale.set(s, s, s);
  scene.add(mesh);
}

// Cube
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(300, 400, 10),
  new THREE.MeshPhongMaterial({
    color: Colors.white,
  })
);

//cube.scale.set(0.2, 0.2, 0.2);
cube.position.x = 0;
cube.position.y = 0;
cube.position.z = 0;
scene.add(cube);

cube.addEventListener("click", (event) => {
  console.log("click");
});
interactionManager.add(cube);

var button = document.getElementById("button");
button.addEventListener("mouseup", animateCube);

function animateCube() {
  const animation = {
    x: cube.rotation.x,
    y: cube.rotation.y,
    z: cube.rotation.z,
  };

  const tween = new TWEEN.Tween(animation)
    .to({ x: 1, y: 1 }, 800)
    .onUpdate(() =>
      cube.rotation.set(animation.x, animation.y, cube.rotation.z)
    );

  const tweenBack = new TWEEN.Tween(animation)
    .to({ x: 0, y: 0 }, 800)
    .delay(500)
    .onUpdate(() =>
      cube.rotation.set(animation.x, animation.y, cube.rotation.z)
    );

  tween.chain(tweenBack);

  tween.start();
}

// run
function init() {
  createLight();
  createDOM();
  createControl();
}

function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
  interactionManager.update();
  renderer.render(scene, camera);
}

animate();
init();

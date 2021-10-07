import * as THREE from "https://cdn.skypack.dev/pin/three@v0.133.1-nP52U8LARkTRhxRcba9x/mode=imports,min/optimized/three.js";
import { OrbitControls } from "https://cdn.skypack.dev/pin/three@v0.133.1-nP52U8LARkTRhxRcba9x/mode=imports,min/unoptimized/examples/jsm/controls/OrbitControls.js";
import { TWEEN } from "https://cdn.skypack.dev/pin/three@v0.133.1-nP52U8LARkTRhxRcba9x/mode=imports,min/unoptimized/examples/jsm/libs/tween.module.min.js";

var Colors = {
  red: 0xf25346,
  white: 0xd8d0d1,
  brown: 0x59332e,
  pink: 0xf5986e,
  brownDark: 0x23190f,
  blue: 0x68c3c0,
};

var scene, renderer, container;

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

var width = window.innerWidth,
  height = window.innerHeight,
  aspect = width / height;

//const camera = new THREE.PerspectiveCamera(80, aspect, 0.1, 2000);
const camera = new THREE.OrthographicCamera(
  width / -2,
  width / 2,
  height / 2,
  height / -2,
  1,
  1000
);
scene.add(camera);
camera.position.set(320, 240, 240);

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

// Rounded
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

var extrudeSettings = {
  depth: 4,
  bevelEnabled: true,
  bevelSegments: 2,
  steps: 2,
  bevelSize: 1,
  bevelThickness: 1,
};

// add shape func

function addShape(id, shape, extrudeSettings, color, x, y, z, rx, ry, rz, s) {
  var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  var mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshPhongMaterial({ color: color })
  );
  mesh.position.set(x, y, z - 75);
  mesh.rotation.set(rx, ry, rz);
  mesh.scale.set(s, s, s);
  mesh.name = id;
  scene.add(mesh);
}

// type of shapes
const smallCard = new THREE.Shape();
const baseCard = new THREE.Shape();
roundedRect(smallCard, 0, 0, 100, 100, 16);
roundedRect(baseCard, 0, 0, 300, 300, 16);

// addShape( shape, color, x, y, z, rx, ry,rz, s );
// pink
addShape(
  "smallCard1",
  smallCard,
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

// blue
addShape(
  "smallCard2",
  smallCard,
  extrudeSettings,
  Colors.blue,
  -70,
  70,
  200,
  0,
  0,
  0,
  1
);

// base
addShape(
  "baseCard",
  baseCard,
  extrudeSettings,
  Colors.white,
  0,
  0,
  0,
  0,
  0,
  0,
  1
);

var button = document.getElementById("button");
button.addEventListener("mouseup", animateCube);

function animateCube() {
  var baseCard = scene.getObjectByName("baseCard", true);
  var smallCard1 = scene.getObjectByName("smallCard1", true);
  var smallCard2 = scene.getObjectByName("smallCard2", true);

  const rotation = {
    rx: baseCard.rotation.x,
    ry: baseCard.rotation.y,
    rz: baseCard.rotation.z,
  };

  const position = {
    px: baseCard.position.x,
    py: baseCard.position.y,
    pz: baseCard.position.z,
  };

  const tween = new TWEEN.Tween(position)
    .to({ px: 0.1, py: 0.1, pz: 0.1 }, 300)
    .onUpdate(() =>
      baseCard.position.set(position.px, position.py, position.pz)
    );

  tween.start();
}

// run
function init() {
  createLight();
  createDOM();
  createControl();
  var object = scene.getObjectByName("baseCard", true);
  console.log(object);
}

function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
  //interactionManager.update();
  renderer.render(scene, camera);
}

animate();
init();

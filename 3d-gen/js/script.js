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
  0.1,
  2000
);
scene.add(camera);
camera.position.set(320, 320, 320);
// camera.rotation.set(-0.05, 1, 0);

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

// type of shapes (ctx, x, y, width, height, radius)
const smallCard = new THREE.Shape();
const baseCard = new THREE.Shape();
roundedRect(smallCard, 0, 0, 100, 100, 16);
roundedRect(baseCard, 0, 0, 300, 300, 16);

// addShape( id,shape,extrudeSettings, color, x, y, z, rx, ry,rz, s );
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
  75,
  0,
  0,
  0,
  1
);

var button = document.getElementById("button");
button.addEventListener("mouseup", animation);

function animation() {
  var baseCard = scene.getObjectByName("baseCard", true);
  var smallCard1 = scene.getObjectByName("smallCard1", true);
  var smallCard2 = scene.getObjectByName("smallCard2", true);

  const position = {
    base_x: baseCard.position.x,
    base_y: baseCard.position.y,
    base_z: baseCard.position.z,
    s1_x: smallCard1.position.x,
    s1_y: smallCard1.position.y,
    s1_z: smallCard1.position.z,
    s2_x: smallCard2.position.x,
    s2_y: smallCard2.position.y,
    s2_z: smallCard2.position.z,
  };

  const tweenPosition = new TWEEN.Tween(position)
    .to(
      {
        base_x: randomIntFromInterval(0, 10),
        base_y: randomIntFromInterval(0, 10),
        base_z: 0,
        s1_x: randomIntFromInterval(0, 10),
        s1_y: randomIntFromInterval(0, 10),
        s1_z: randomIntFromInterval(0, 10),
        s2_x: randomIntFromInterval(0, 10),
        s2_y: randomIntFromInterval(0, 10),
        s2_z: randomIntFromInterval(0, 10),
      },
      300
    )
    .onUpdate(function () {
      baseCard.position.set(position.base_x, 0, 0);
      smallCard1.position.set(position.s1_x, position.s1_y, position.s1_z);
      smallCard2.position.set(position.s2_x, position.s2_y, position.s2_z);
    });
  //console.log(position.base_x, position.s1_x, position.s2_x);
  tweenPosition.start();
}

// Util
function randomIntFromInterval(min, max) {
  var result =
    20 * Math.round(Math.floor(Math.random() * (max - min + 1) + min));
  console.log(result);
  return result;
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
  //interactionManager.update();
  renderer.render(scene, camera);
}

var baseCard0 = scene.getObjectByName("baseCard", true);
console.log(baseCard0.position.z);

animate();
init();

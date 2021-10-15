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
  1000
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

// add shape func
function addShape(id, shape, color, z) {
  var x = 0,
    y = 0,
    rx = 0,
    ry = 0,
    rz = 0,
    s = 1;

  var depth = 4,
    bevelEnabled = true,
    bevelSegment = 2,
    steps = 2,
    bevelSize = 1,
    bevelThickness = 1,
    extrudeSettings = {
      depth,
      bevelEnabled,
      bevelSegment,
      steps,
      bevelSize,
      bevelThickness,
    };

  var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

  var mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshPhongMaterial({
      color: color,
      depthWrite: false,
      polygonOffset: true,
    })
  );
  mesh.position.set(x, y, z - 75);
  mesh.rotation.set(rx, ry, rz);
  mesh.scale.set(s, s, s);
  mesh.name = id;
  scene.add(mesh);
}

// type of shapes (ctx, x, y, width, height, radius)
const smallCard = new THREE.Shape();
roundedRect(smallCard, 0, 0, 100, 100, 16);

// addShape(id, shape, extrudeSettings, color, z);
var cards = [
  ["smallCard1", smallCard, Colors.pink, 100],
  ["smallCard2", smallCard, Colors.blue, 120],
  ["smallCard3", smallCard, Colors.white, 140],
];

for (var i = 0; i < cards.length; i++) {
  addShape(...cards[i]);
}

var button = document.getElementById("button");
button.addEventListener("mouseup", animation);

function animation() {
  var variableNamePrefix = "smallCard";
  for (var i = 1; i < cards.length + 1; i++) {
    var objName = variableNamePrefix + i;
    window["smallCard" + i] = scene.getObjectByName(objName);
  }

  const positionX = {
    s1_x: smallCard1.position.x,
    s1_y: smallCard1.position.y,
    s1_z: smallCard1.position.z,
    s2_x: smallCard2.position.x,
    s2_y: smallCard2.position.y,
    s2_z: smallCard2.position.z,
    s3_x: smallCard3.position.x,
    s3_y: smallCard3.position.y,
    s3_z: smallCard3.position.z,
  };

  const tweenPositionX = new TWEEN.Tween(positionX)
    .to(
      {
        s1_x: randomIntFromInterval(-2, 2) * 2,
        s2_x: randomIntFromInterval(-2, 2) * 2,
        s3_x: randomIntFromInterval(-2, 2) * 2,
      },
      300
    )
    .onUpdate(function () {
      smallCard1.position.set(positionX.s1_x, positionX.s1_y, positionX.s1_z);
      smallCard2.position.set(positionX.s2_x, positionX.s2_y, positionX.s2_z);
      smallCard3.position.set(positionX.s3_x, positionX.s3_y, positionX.s3_z);
    });

  //console.log(position.base_x, position.s1_x, position.s2_x);
  tweenPositionX.start();

  setTimeout(() => {
    const positionY = {
      s1_x: smallCard1.position.x,
      s1_y: smallCard1.position.y,
      s1_z: smallCard1.position.z,
      s2_x: smallCard2.position.x,
      s2_y: smallCard2.position.y,
      s2_z: smallCard2.position.z,
      s3_x: smallCard3.position.x,
      s3_y: smallCard3.position.y,
      s3_z: smallCard3.position.z,
    };

    const tweenPositionY = new TWEEN.Tween(positionY)
      .to(
        {
          s1_y: randomIntFromInterval(-2, 2) * 2,
          s2_y: randomIntFromInterval(-2, 2) * 2,
          s3_y: randomIntFromInterval(-2, 2) * 2,
        },
        300
      )
      .onUpdate(function () {
        smallCard1.position.set(positionY.s1_x, positionY.s1_y, positionY.s1_z);
        smallCard2.position.set(positionY.s2_x, positionY.s2_y, positionY.s2_z);
        smallCard3.position.set(positionY.s3_x, positionY.s3_y, positionY.s3_z);
      });
    tweenPositionY.start();
  }, 300);
}

// Util
function randomIntFromInterval(min, max) {
  var result =
    20 * Math.round(Math.floor(Math.random() * (max - min + 1) + min));
  //console.log(result);
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

//var baseCard0 = scene.getObjectByName("baseCard", true);
//console.log(baseCard0.position.z);

animate();
init();

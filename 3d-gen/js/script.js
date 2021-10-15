import * as THREE from "https://cdn.skypack.dev/pin/three@v0.133.1-nP52U8LARkTRhxRcba9x/mode=imports,min/optimized/three.js";
import { OrbitControls } from "https://cdn.skypack.dev/pin/three@v0.133.1-nP52U8LARkTRhxRcba9x/mode=imports,min/unoptimized/examples/jsm/controls/OrbitControls.js";
import { TWEEN } from "https://cdn.skypack.dev/pin/three@v0.133.1-nP52U8LARkTRhxRcba9x/mode=imports,min/unoptimized/examples/jsm/libs/tween.module.min.js";
import anime from "/js/anime.es.js";

var scene, renderer, container;

var Colors = {
  red: 0xfc5c65,
  orange: 0xfd9644,
  yellow: 0xfed330,
  green: 0x26de81,
  blue: 0x45aaf2,
  indigo: 0x4b7bec,
  purple: 0xa55eea,
  white: 0xd1d8e0,
  gray: 0x778ca3,
};

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
  ["smallCard0", smallCard, Colors.red, 0],
  ["smallCard1", smallCard, Colors.orange, 40],
  ["smallCard2", smallCard, Colors.yellow, 80],
  ["smallCard3", smallCard, Colors.green, 120],
  ["smallCard4", smallCard, Colors.blue, 160],
  ["smallCard5", smallCard, Colors.indigo, 200],
  ["smallCard6", smallCard, Colors.purple, 240],
  ["smallCard7", smallCard, Colors.white, 280],
  ["smallCard8", smallCard, Colors.gray, 320],
];

for (var i = 0; i < cards.length; i++) {
  addShape(...cards[i]);
}

var button = document.getElementById("button");
button.addEventListener("mouseup", animation);

function animation() {
  for (var i = 0; i < cards.length; i++) {
    var objName = cards[i][0];
    window[objName] = scene.getObjectByName(objName);
    console.log(window[objName]);
    anime({
      targets: window[objName].position,
      x: randomIntFromInterval(-2, 2) * 3,
      easing: "easeOutExpo",
      duration: 300,
      update: function () {},
    });

    setTimeout(() => {
      for (var i = 0; i < cards.length; i++) {
        var objName = cards[i][0];
        window[objName] = scene.getObjectByName(objName);

        anime({
          targets: window[objName].position,
          y: randomIntFromInterval(-2, 2) * 3,
          easing: "easeOutExpo",
          duration: 300,
          update: function () {},
        });
      }
    }, 300);
  }
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

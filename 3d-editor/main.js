import * as THREE from "three";
import { InteractionManager } from "three.interactive";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TransformControls } from "three/addons/controls/TransformControls.js";

const container = document.createElement("div");
container.setAttribute("id", "container");
document.body.appendChild(container);

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xfefefe);

// camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
camera.position.set(10, 10, 10);

// light
const light = new THREE.DirectionalLight(0xf000ff, 1);
light.position.set(20, 20, 0);
scene.add(light);

// axes
scene.add(new THREE.AxesHelper(10));

// object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0x4285f4,
});
const cube = new THREE.Mesh(geometry, material);

// interaction
const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);
cube.addEventListener("mouseover", (event) => {
  event.target.material.color.set(0xff0000);
  document.body.style.cursor = "pointer";
});
cube.addEventListener("mouseout", (event) => {
  event.target.material.color.set(0x4285f4);
  document.body.style.cursor = "default";
});
cube.addEventListener("mousedown", (event) => {
  event.target.scale.set(1.1, 1.1, 1.1);
});
cube.addEventListener("click", (event) => {
  event.target.scale.set(1.0, 1.0, 1.0);
});

scene.add(cube);
interactionManager.add(cube);

// orbital control
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// transform control
const transformControls = new TransformControls(camera, renderer.domElement);

transformControls.addEventListener("dragging-changed", function (event) {
  controls.enabled = !event.value;
});

scene.add(transformControls);
transformControls.attach(cube);

const animate = (time) => {
  requestAnimationFrame(animate);
  interactionManager.update();
  controls.update();
  renderer.render(scene, camera);
};

animate();

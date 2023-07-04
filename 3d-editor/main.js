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

// grid
const size = 10;
const divisions = 10;
const gridHelper = new THREE.GridHelper(size, divisions);
scene.add(gridHelper);

// object

const newCube = ([x, y, z], color) => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.x = x;
  cube.position.y = y;
  cube.position.z = z;
  return cube;
};

const cube1 = newCube([1, 1, 1], 0xff0000);
const cube2 = newCube([3, 1, 1], 0x00ff00);

scene.add(cube1);
scene.add(cube2);

// interaction
const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);
cube1.addEventListener("mouseover", (event) => {
  document.body.style.cursor = "pointer";
});
cube2.addEventListener("mouseover", (event) => {
  document.body.style.cursor = "pointer";
});
cube1.addEventListener("click", (event) => {
  transformControls.setMode("translate");
  // https://github.com/mrdoob/three.js/blob/master/examples/misc_controls_transform.html
  transformControls.attach(cube1);
});
cube2.addEventListener("click", (event) => {
  transformControls.setMode("rotate");
  transformControls.attach(cube2);
});

interactionManager.add(cube1);
interactionManager.add(cube2);

// orbital control
const orbitalControls = new OrbitControls(camera, renderer.domElement);
orbitalControls.update();

// transform control
const transformControls = new TransformControls(camera, renderer.domElement);

transformControls.addEventListener("dragging-changed", function (event) {
  orbitalControls.enabled = !event.value;
});

scene.add(transformControls);

const animate = (time) => {
  requestAnimationFrame(animate);
  interactionManager.update();
  orbitalControls.update();
  renderer.render(scene, camera);
};

animate();

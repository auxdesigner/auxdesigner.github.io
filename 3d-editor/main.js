import * as THREE from "three";
import { InteractionManager } from "three.interactive";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TransformControls } from "three/addons/controls/TransformControls.js";

// create dom
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

// interaction
const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);

// create environment
function initialize(size) {
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshLambertMaterial({ color: 0xff00ff });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, 0, y);
      scene.add(mesh);
      mesh.addEventListener("mouseover", (event) => {
        mesh.material.emissive.setHex(0x555555);
      });
      mesh.addEventListener("mouseout", (event) => {
        mesh.material.emissive.setHex(0);
      });
      mesh.addEventListener("click", (event) => {
        console.log(event.target.position);
        event.stopPropagation();
      });
      interactionManager.add(mesh);
    }
  }
}
initialize(8);

// orbital control
const orbitalControls = new OrbitControls(camera, renderer.domElement);
orbitalControls.update();

const animate = (time) => {
  requestAnimationFrame(animate);
  interactionManager.update();
  orbitalControls.update();
  renderer.render(scene, camera);
};

animate();

//https://jsfiddle.net/7rdv6ox3/ helper widget

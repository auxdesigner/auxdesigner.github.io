import * as THREE from "three";
import { InteractionManager } from "three.interactive";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// sidebar
const buttons = document.querySelectorAll("#sidebar button");
let selectedTool = "cube";
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => {
      btn.classList.remove("selected");
    });

    button.classList.add("selected");
    selectedTool = button.id;
  });
});

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
        const position = event.target.position;
        event.stopPropagation();

        // if cube is selected in toolbar
        if (selectedTool === "cube") {
          newCube([position.x, position.y, position.z], 0xffff00);
        }

        // if tree is selected in toolbar
        if (selectedTool === "tree") {
          newTree([position.x, position.y, position.z], 0x00ff00);
        }
      });
      interactionManager.add(mesh);
    }
  }
}
initialize(8);

// create cube
function newCube([x, y, z], color) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshLambertMaterial({ color });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = x;
  mesh.position.y = y + 1;
  mesh.position.z = z;
  scene.add(mesh);

  mesh.addEventListener("mouseover", (event) => {
    mesh.material.emissive.setHex(0x555555);
  });
  mesh.addEventListener("mouseout", (event) => {
    mesh.material.emissive.setHex(0);
  });
  mesh.addEventListener("click", (event) => {
    const position = event.target.position;
    event.stopPropagation();

    // if eraser is selected in toolbar
    if (selectedTool === "eraser") {
      scene.remove(mesh);
    }
  });
  interactionManager.add(mesh);
}

// create tree
function newTree([x, y, z], color) {
  const geometry = new THREE.BoxGeometry(1, 2, 1);
  const material = new THREE.MeshLambertMaterial({ color });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = x;
  mesh.position.y = y + 1;
  mesh.position.z = z;
  scene.add(mesh);

  mesh.addEventListener("mouseover", (event) => {
    mesh.material.emissive.setHex(0x555555);
  });
  mesh.addEventListener("mouseout", (event) => {
    mesh.material.emissive.setHex(0);
  });
  interactionManager.add(mesh);
}

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

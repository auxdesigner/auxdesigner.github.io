import * as THREE from "three";
import { InteractionManager } from "three.interactive";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

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
  1000
);
camera.position.set(10, 10, 10);

// light
const sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(20, 20, 20);
sun.castShadow = true;
sun.shadow.camera.left = -10;
sun.shadow.camera.right = 10;
sun.shadow.camera.top = 0;
sun.shadow.camera.bottom = -10;
sun.shadow.mapSize.width = 1024;
sun.shadow.mapSize.height = 1024;
sun.shadow.camera.near = 0.5;
sun.shadow.camera.far = 50;
scene.add(sun);
scene.add(new THREE.AmbientLight(0xffffff, 0.3));

// ground
const cubes = [];
function initialize(size) {
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(x, 0, y);
      scene.add(cube);
      cubes.push(cube);
    }
  }
}
initialize(8);

// items
const items = [];
const loader = new GLTFLoader();
function newTree([x, y, z]) {
  loader.load(
    "model/tree.glb",
    function (glb) {
      glb.scene.position.x = x;
      glb.scene.position.y = y;
      glb.scene.position.z = z;
      scene.add(glb.scene);
      items.push(glb.scene.children[0]);
      console.log(items);
    },
    function (xhr) {
      // console.log(xhr);
    },
    function (error) {
      console.error(error);
    }
  );
}

// handle mouse hover
function onMouseHover(event) {
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0 && cubes.includes(intersects[0].object)) {
    for (var i = 0; i < cubes.length; i++) {
      cubes[i].material.emissive.setHex(0);
    }
    intersects[0].object.material.emissive.setHex(0x555555);
  }
}

// handle mouse click
function onMouseClick(event) {
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  if (selectedTool === "eraser") {
    // tree
    if (intersects.length > 0 && intersects[0].object.parent.name === "Tree") {
      console.log("found tree");
      scene.remove(intersects[0].object.parent.parent);
    }
    // ground
    if (intersects.length > 0 && cubes.includes(intersects[0].object)) {
      console.log("found ground");
    }
  } else if (selectedTool === "tree") {
    if (intersects.length > 0 && cubes.includes(intersects[0].object)) {
      let positionX = intersects[0].object.position.x;
      let positionY = intersects[0].object.position.y;
      let positionZ = intersects[0].object.position.z;
      newTree([positionX, positionY, positionZ]);
    }
  }
}

// event listener for mouse hover
renderer.domElement.addEventListener("mousemove", onMouseHover, false);

// event listener for mouse click
renderer.domElement.addEventListener("click", onMouseClick, false);

// orbital control
const orbitalControls = new OrbitControls(camera, renderer.domElement);
orbitalControls.update();

// render the scene
function animate() {
  orbitalControls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

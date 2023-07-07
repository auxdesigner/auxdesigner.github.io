import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// sidebar
const buttons = document.querySelectorAll("#sidebar button");
let selectedTool = "tree";
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
  0.1,
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
      const material = new THREE.MeshLambertMaterial({ color: 0x40bf15 });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(x, 0, y);
      scene.add(cube);
      cubes.push(cube);
    }
  }
}
initialize(8);

// tree
const trees = [];
const treeLoader = new GLTFLoader();
function newTree([x, y, z]) {
  treeLoader.load(
    "model/tree.glb",
    function (glb) {
      glb.scene.position.x = x;
      glb.scene.position.y = y + 0.5;
      glb.scene.position.z = z;
      scene.add(glb.scene);
      trees.push(glb.scene.children[0]);
    },
    function (xhr) {
      // console.log(xhr);
    },
    function (error) {
      console.error(error);
    }
  );
}

// mushroom
const mushrooms = [];
const mushroomLoader = new GLTFLoader();
function newMushroom([x, y, z]) {
  mushroomLoader.load(
    "model/mushroom.glb",
    function (glb) {
      glb.scene.position.x = x;
      glb.scene.position.y = y + 0.5;
      glb.scene.position.z = z;
      scene.add(glb.scene);
      mushrooms.push(glb.scene.children[0]);
    },
    function (xhr) {
      // console.log(xhr);
    },
    function (error) {
      console.error(error);
    }
  );
}

// rock
const rocks = [];
const rockLoader = new GLTFLoader();
function newRock([x, y, z]) {
  rockLoader.load(
    "model/rock.glb",
    function (glb) {
      glb.scene.position.x = x;
      glb.scene.position.y = y + 0.5;
      glb.scene.position.z = z;
      scene.add(glb.scene);
      rocks.push(glb.scene.children[0]);
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

  // highlight ground
  if (intersects.length > 0 && cubes.includes(intersects[0].object)) {
    for (var i = 0; i < cubes.length; i++) {
      cubes[i].material.emissive.setHex(0);
    }
    intersects[0].object.material.emissive.setHex(0x555555);
  }
  // highlight tree
  else if (
    intersects.length > 0 &&
    intersects[0].object.parent.name === "Tree"
  ) {
    for (var i = 0; i < trees.length; i++) {
      console.log(trees[i].children[1]);
      trees[i].children[1].material.emissive.setHex(0);
    }
    intersects[0].object.parent.children[0].material.emissive.setHex(0x555555);
    intersects[0].object.parent.children[1].material.emissive.setHex(0x555555);
  }
  // reset highlight
  else {
    // reset ground
    for (var i = 0; i < cubes.length; i++) {
      cubes[i].material.emissive.setHex(0);
    }
    // reset tree
    for (var i = 0; i < trees.length; i++) {
      // 2 parts of the model
      trees[i].children[0].material.emissive.setHex(0);
      trees[i].children[1].material.emissive.setHex(0);
    }
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
  // eraser tool
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
  }
  // tree tool
  else if (selectedTool === "tree") {
    if (intersects.length > 0 && cubes.includes(intersects[0].object)) {
      let positionX = intersects[0].object.position.x;
      let positionY = intersects[0].object.position.y;
      let positionZ = intersects[0].object.position.z;
      newTree([positionX, positionY, positionZ]);
    }
  }
  // mushroom tool
  else if (selectedTool === "mushroom") {
    if (intersects.length > 0 && cubes.includes(intersects[0].object)) {
      let positionX = intersects[0].object.position.x;
      let positionY = intersects[0].object.position.y;
      let positionZ = intersects[0].object.position.z;
      newMushroom([positionX, positionY, positionZ]);
    }
  }
  // rock tool
  else if (selectedTool === "rock") {
    if (intersects.length > 0 && cubes.includes(intersects[0].object)) {
      let positionX = intersects[0].object.position.x;
      let positionY = intersects[0].object.position.y;
      let positionZ = intersects[0].object.position.z;
      newRock([positionX, positionY, positionZ]);
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

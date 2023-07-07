import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// sidebar
const buttons = document.querySelectorAll("#sidebar button");
let selectedTool = "tree";
cursor.className = "tree";
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    cursor.className = "";
    cursor.className = button.id;
    buttons.forEach((btn) => {
      btn.classList.remove("selected");
    });

    button.classList.add("selected");
    selectedTool = button.id;
  });
});
const cursorDiv = document.querySelector("#cursor");

// renderer
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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
camera.position.set(20, 20, 20);

// sun
const sun = new THREE.DirectionalLight(0xffffff, 1);
sun.position.set(0, 20, 10);
sun.castShadow = true;
sun.shadow.camera.left = -10;
sun.shadow.camera.right = 10;
sun.shadow.camera.top = 10;
sun.shadow.camera.bottom = -10;
sun.shadow.mapSize.width = 2048;
sun.shadow.mapSize.height = 2048;
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
      cube.receiveShadow = true;
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
      glb.scene.traverse(function (node) {
        if (node.isMesh) {
          node.castShadow = true;
        }
      });
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
      glb.scene.traverse(function (node) {
        if (node.isMesh) {
          node.castShadow = true;
        }
      });
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
      glb.scene.traverse(function (node) {
        if (node.isMesh) {
          node.castShadow = true;
        }
      });
      scene.add(glb.scene);
      rocks.push(glb.scene.children[0]);
      console.log(rocks);
    },
    function (xhr) {
      // console.log(xhr);
    },
    function (error) {
      console.error(error);
    }
  );
}

// hide cursor if hovering on toolbar
sidebar.addEventListener("mouseover", function () {
  cursor.style.display = "none";
});
container.addEventListener("mouseover", function () {
  cursor.style.display = "block";
});

// handle mouse hover
function onMouseHover(event) {
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1.01;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1.04;

  const mouseX = event.clientX;
  const mouseY = event.clientY;
  cursorDiv.style.transform = `translate3d(${mouseX - 8}px, ${
    mouseY - 8
  }px, 0)`;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  // console.log(intersects[0]);
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
      trees[i].children[1].material.emissive.setHex(0);
    }
    intersects[0].object.parent.children[0].material.emissive.setHex(0x555555);
    intersects[0].object.parent.children[1].material.emissive.setHex(0x555555);
  }
  // highlight tree
  else if (
    intersects.length > 0 &&
    intersects[0].object.parent.name === "Mushroom"
  ) {
    for (var i = 0; i < mushrooms.length; i++) {
      mushrooms[i].children[1].material.emissive.setHex(0);
    }
    intersects[0].object.parent.children[0].material.emissive.setHex(0x555555);
    intersects[0].object.parent.children[1].material.emissive.setHex(0x555555);
  }
  // highlight rock
  else if (intersects.length > 0 && intersects[0].object.name === "Stone") {
    for (var i = 0; i < rocks.length; i++) {
      rocks[i].material.emissive.setHex(0);
    }
    intersects[0].object.parent.children[0].material.emissive.setHex(0x555555);
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
    // reset mushroom
    for (var i = 0; i < mushrooms.length; i++) {
      // 2 parts of the model
      mushrooms[i].children[0].material.emissive.setHex(0);
      mushrooms[i].children[1].material.emissive.setHex(0);
    }
    // reset rock
    for (var i = 0; i < rocks.length; i++) {
      rocks[i].material.emissive.setHex(0);
    }
  }
}

// handle mouse click
function onMouseClick(event) {
  const mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1.01;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1.04;

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
    // rock
    if (intersects.length > 0 && intersects[0].object.name === "Stone") {
      console.log("found stone");
      scene.remove(intersects[0].object.parent);
    }
    // mushroom
    if (
      intersects.length > 0 &&
      intersects[0].object.parent.name === "Mushroom"
    ) {
      console.log("found mushroom");
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

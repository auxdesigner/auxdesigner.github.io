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
  10000
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
initialize(2);

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
    event.stopPropagation();
    if (selectedTool === "eraser") {
      scene.remove(mesh);
    }
  });
  interactionManager.add(mesh);
}

// create tree
// glb
const loader = new GLTFLoader();

function newTree([x, y, z], color) {
  loader.load(
    "model/tree.glb",
    function (glb) {
      glb.scene.position.x = x;
      glb.scene.position.y = y;
      glb.scene.position.z = z;
      scene.add(glb.scene);
      glb.scene.addEventListener("mouseover", (event) => {
        // console.log(glb.scene);
      });

      glb.scene.addEventListener("click", (event) => {
        event.stopPropagation();
        if (selectedTool === "eraser") {
          scene.remove(glb.scene);
          scene.children.forEach((child) => console.log(child));
        }
      });
      interactionManager.add(glb.scene);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.error(error);
    }
  );
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

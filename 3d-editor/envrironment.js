import * as THREE from "three";

export const createEnvironment = (scene, interactionManager, size) => {
  const data = [];

  function initialize(size) {
    for (let x = 0; x < size; x++) {
      const column = [];
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
        });
        interactionManager.add(mesh);
        const tile = { x, y };
        column.push(tile);
      }
      data.push(column);
    }
  }

  function createObj(x, y) {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, 1, y);
    scene.add(mesh);
  }

  initialize(size);
};

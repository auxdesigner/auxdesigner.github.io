import * as THREE from "three";

export function createEnv(size) {
  const data = [];

  initialize();

  function initialize() {
    for (let x = 0; x < size; x++) {
      const column = [];
      for (let y = 0; y < size; y++) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, 0, y);
        scene.add(mesh);

        const tile = { x, y };
        column.push(tile);
      }
      data.push(column);
    }
  }
  return {
    size,
    data,
    initialize,
  };
}

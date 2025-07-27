import * as THREE from 'three';
/*
 * Add an interactive point marker to the scene   
 * This function creates a small red sphere at the specified position
 * and adds it to the scene. The marker can be used to represent
 * specific locations or objects in the 3D space, and can be interacted with
 * to display additional information when clicked.        

 * @param name  string - name of the marker
 * @param position THREE.Vector3 - position in 3D space where the marker should be placed
 * @param info  string - additional information associated with the marker
 * @returns THREE.Mesh - the created marker mesh
 */
 
export function addInteractivePoint(
  name: string,
  position: THREE.Vector3,
  info: string
): THREE.Mesh {
  const geometry = new THREE.SphereGeometry(0.05, 16, 16);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const marker = new THREE.Mesh(geometry, material);

  marker.name = name;
  marker.position.copy(position);
  marker.userData = { info };
  return marker;
}
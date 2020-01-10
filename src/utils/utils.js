import {
  Scene,
  PerspectiveCamera,
  Color,
  WebGLRenderer,
  Mesh,
  DirectionalLight,
  BoxGeometry,
  MeshPhongMaterial,
  MeshBasicMaterial,
  DoubleSide,
  ConeGeometry,
  PlaneGeometry,
  SphereGeometry
} from 'three';

const MeshPhong = (obj) => new MeshPhongMaterial(obj);

const createCube = (width, height, depth) => {
  const geometry = new BoxGeometry(width, height, depth);
  const material = MeshPhong({
    color: 0x0f1d89,
    shininess: 100,
    side: DoubleSide
  });
  const cube = new Mesh(geometry, material);
  cube.position.z = -10;
  cube.position.y = -5;
  cube.position.x = -6;
  return cube;
};

const createCone = (
  radius,
  height,
  radialSegments,
  heightSegments,
  openEnded
) => {
  const geometry = new ConeGeometry(
    radius,
    height,
    radialSegments,
    heightSegments,
    openEnded
  );
  const material = MeshPhong({
    color: 0x0f1d89,
    shininess: 100,
    side: DoubleSide
  });
  const cone = new Mesh(geometry, material);
  cone.position.x = 7;
  cone.position.y = -5;
  return cone;
};

const createPlane = (width, height, widthSegments, heightSegments) => {
  const geometry = new PlaneGeometry(
    width,
    height,
    widthSegments,
    heightSegments
  );
  const material = MeshPhong({ color: 0x693421, side: DoubleSide });
  const plane = new Mesh(geometry, material);
  plane.rotation.x = Math.PI / 2;
  plane.position.y = -100;
  return plane;
};

const createSphere = (radius, widthSegments, heightSegments) => {
  const geometry = new SphereGeometry(radius, widthSegments, heightSegments);
  const material = new MeshBasicMaterial({
    color: 0xffd700
  });
  const sphere = new Mesh(geometry, material);
  sphere.position.set(10, 5, 0);
  return sphere;
};

const addToScene = (array, scene) => {
  Object.entries(array).forEach((entry) => {
    const value = entry[1];
    scene.add(value);
  });
};

const init = (objs, position) => {
  const { innerWidth, innerHeight } = window;
  const scene = new Scene();
  scene.background = new Color(0xffffff);
  const camera = new PerspectiveCamera(75, innerWidth / innerHeight, 1, 1000);
  camera.position.z = position.z;

  const light = new DirectionalLight(0xffffff);
  light.position.y = 5;
  light.position.z = 0;
  light.position.x = 10;
  ` `;
  scene.add(light);

  addToScene(objs, scene);

  const renderer = new WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  return { renderer, scene, camera, light };
};

export { init, createCone, createCube, createPlane, createSphere };

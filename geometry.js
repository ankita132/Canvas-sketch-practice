// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");

const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl"
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  });

  renderer.setClearColor("#000", 1);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
  camera.position.set(2, 2, -4);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);
  controls.enableZoom = false;
  // Setup your scene
  const scene = new THREE.Scene();

  // Setup a geometry
  const gridScale = 10;
  scene.add(new THREE.GridHelper(gridScale, 10, "hsl(0, 0%, 50%", "hsl(0, 0%, 70%"))

  const geometry = new THREE.Geometry();

  geometry.vertices = [
    new THREE.Vector3(-0.5, 0.5, 0),
    new THREE.Vector3(0.5, -0.5, 0),
    new THREE.Vector3(-0.5, -0.5, 0),
    new THREE.Vector3(0.5, 0.5, 0)
  ];

  geometry.faces = [
    new THREE.Face3(0, 1, 2),
    new THREE.Face3(3,1,0),

  ];


  geometry.computeVertexNormals();

  const mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({
    color: "red",
    side: THREE.DoubleSide
  }));

  scene.add(mesh);
  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      controls.dispose();
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);

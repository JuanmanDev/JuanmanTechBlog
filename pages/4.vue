<script setup lang="ts">
import { TresCanvas, useTres } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';
import { shallowRef, watch, ref, onMounted } from 'vue';
import { Shape, ExtrudeGeometry, Mesh, MeshStandardMaterial, DoubleSide, PerspectiveCamera } from 'three';
import gsap from 'gsap';

// Refs for the heptagon and canvas
const heptagon = shallowRef<Mesh>();
const canvasRef = ref();

// Create a heptagon shape
const heptagonShape = new Shape();
const sides = 7;
const radius = 1;

// Calculate points for the heptagon
for (let i = 0; i < sides; i++) {
  const theta = (i / sides) * Math.PI * 2;
  const x = radius * Math.cos(theta);
  const y = radius * Math.sin(theta);
  if (i === 0) {
    heptagonShape.moveTo(x, y);
  } else {
    heptagonShape.lineTo(x, y);
  }
}

// Define extrusion settings
const extrudeSettings = {
  depth: 0.02,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.3,
  bevelSegments: 30,
  curveSegments: 10,
};

// Create the heptagon geometry
const heptagonGeometry = new ExtrudeGeometry(heptagonShape, extrudeSettings);

// Create materials for the heptagon
const borderMaterial = new MeshStandardMaterial({
  color: 0xff0000, // Red
  metalness: 0.5,
  roughness: 0.5,
  transparent: true,
  opacity: 0.1,
});

const faceMaterial = new MeshStandardMaterial({
  color: 0xffffff, // White
  transparent: true,
  opacity: 0.7,
  side: DoubleSide,
});

// Create the heptagon mesh
const heptagonMesh = new Mesh(heptagonGeometry, [borderMaterial, faceMaterial]);

// GSAP animation for the heptagon
watch(heptagon, () => {
  if (heptagon.value) {
    gsap.to(heptagon.value.rotation, {
      z: Math.PI,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  }
});

// Add the camera programmatically
onMounted(() => {
  if (canvasRef.value) {
    const { scene, camera } = useTres();

    // Create a perspective camera
    const perspectiveCamera = new PerspectiveCamera(
      45, // FOV
      window.innerWidth / window.innerHeight, // Aspect ratio
      0.1, // Near clipping plane
      1000, // Far clipping plane
    );
    perspectiveCamera.position.set(0, 1.5, 5);
    perspectiveCamera.lookAt(0, 1.5, 0);

    // Add the camera to the scene
    scene.value.add(perspectiveCamera);

    // Set the camera as the active camera
    camera.value = perspectiveCamera;
  }
});
</script>

<template>
  <TresCanvas ref="canvasRef">
    <!-- OrbitControls for camera interaction -->
    <OrbitControls />

    <!-- Heptagon mesh -->
    <TresMesh :object="heptagonMesh" :position="[0, 1.5, 0]" ref="heptagon" />

    <!-- Grid helper -->
    <TresGridHelper :args="[10, 10, 0x444444, 'teal']" />

    <!-- Lighting -->
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :position="[5, 5, 5]" :intensity="2" />
  </TresCanvas>
</template>
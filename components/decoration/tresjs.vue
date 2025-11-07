<script setup lang="ts">
import { TresCanvas, dispose } from '@tresjs/core';
import { 
  Shape, ExtrudeGeometry, Mesh, MeshStandardMaterial, DoubleSide,
 } from 'three';

import { shallowRef, watch, ref } from 'vue';
import { OrbitControls } from '@tresjs/cientos';
import gsap from 'gsap';

// Define props
const props = defineProps<{
  isSpinning?: boolean
}>();

function isWebGLAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext('webgl') || c.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}
const webGL = isWebGLAvailable();

const heptagon = shallowRef();
const isLoading = ref(true);

// Create a heptagon shape
const heptagonShape = new Shape();
const sides = 7;
const radius = 1;

// Calculate points first
const points = [];
for (let i = 0; i < sides; i++) {
  const theta = (i / sides) * Math.PI * 2;
  const x = radius * Math.cos(theta);
  const y = radius * Math.sin(theta);
  points.push({ x, y });
}

// Create rounded corners
for (let i = 0; i < points.length; i++) {
  const current = points[i];
  const next = points[(i + 1) % points.length];
  
  if (i === 0) {
    heptagonShape.moveTo(current.x, current.y);
  }
  
  heptagonShape.lineTo(next.x, next.y);
}

// Define extrusion settings
const extrudeSettings = {
  depth: 0.001,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.3,
  bevelSegments: 3,
  curveSegments: 1,
};

const heptagonGeometry = new ExtrudeGeometry(heptagonShape, extrudeSettings);

// Create two materials: one for the border and one for the faces
const borderMaterial = new MeshStandardMaterial({ 
  color: 0xff0000, // red
  metalness: 0.5,
  roughness: 0.5,
  fog: true,
  transparent: true,  // Enable transparency
  opacity: 0.1        // Set opacity level (0 = fully transparent, 1 = fully opaque)
});

const faceMaterial = new MeshStandardMaterial({ 
  color: 0xffffff,
  transparent: true,
  opacity: 0.7,
  side: DoubleSide
});

// Use an array of materials
const heptagonMesh = new Mesh(heptagonGeometry, [borderMaterial, faceMaterial]);

watch(heptagon, () => {
  gsap.to(heptagonMesh.rotation, {
    z: Math.PI,
    duration: 10,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
  });

  // Fade out loading screen
  gsap.to(isLoading, {
    value: false,
    duration: 1,
    ease: 'power2.inOut'
  });
});

// Watch for spinning prop changes
watch(() => props.isSpinning, (newValue) => {
  if (newValue && heptagonMesh) {
    // Kill any existing animations
    gsap.killTweensOf(heptagonMesh.rotation);
    gsap.killTweensOf(heptagonMesh.scale);
    
    // Fast rotation and scale down animation
    gsap.to(heptagonMesh.rotation, {
      z: heptagonMesh.rotation.z + Math.PI * 4, // 2 full rotations (720 degrees)
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        // Resume normal rotation after the fast spin
        gsap.to(heptagonMesh.rotation, {
          z: Math.PI,
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }
    });
    
    gsap.to(heptagonMesh.scale, {
      x: 0.6,
      y: 0.6,
      z: 0.6,
      duration: 0.75,
      ease: 'power2.in',
      yoyo: true,
      repeat: 1
    });
  }
});

onUnmounted(() => {
  dispose(heptagonMesh)
})
</script>

<template>
  <TresCanvas v-if="webGL" class="opacity-simple-animation" :class="{ 'opacity-simple-animation-100': !isLoading, 'opacity-simple-animation-0': isLoading }" >
    <TresPerspectiveCamera
      ref="cam"
      :position="[0, 0, 3]"
      :fov="45"
      :near="0.1"
      :far="1000"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls />
    <primitive ref="heptagon" :object="heptagonMesh" :position="[0, 0, 0]" />
    <TresGridHelper :args="[30, 30, 0x444444, 'teal']" :position="[0, -2, 0]" />
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :position="[5, 5, 5]" :intensity="2" />
  </TresCanvas>
</template>

<style lang="css">
.opacity-simple-animation,
.opacity-simple-animation-0 {
  opacity: 0;
  transition: opacity 1s ease;
  transform-style: preserve-3d;
}

.opacity-simple-animation-100 {
  opacity: 1;
  transition: opacity 1s ease;
  transform-style: preserve-3d;
}
</style>
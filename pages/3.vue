<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core';
//import { TresAmbientLight, TresDirectionalLight } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, Shape, ExtrudeGeometry, Mesh, MeshStandardMaterial, DoubleSide, Vector3, Quaternion, Vector4, PerspectiveCamera, TorusGeometry,
  
 } from 'three';

import { shallowRef, watch } from 'vue';
import { OrbitControls } from '@tresjs/cientos';
import gsap from 'gsap';


const boxesRef = shallowRef();
const heptagon = shallowRef();
const zs = [];
for (let z = -4.5; z <= 4.5; z++) {
  zs.push(z);
}


// Create a heptagon shape
const heptagonShape = new Shape();
const sides = 7;
const radius = 1;
const cornerRadius = 0.; // This adds soft corners

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
  depth: 0.02,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.3,
  bevelSegments: 30,
  curveSegments: 10,
};

const heptagonGeometry = new ExtrudeGeometry(heptagonShape, extrudeSettings);

// Create two materials: one for the border and one for the faces
const borderMaterial = new MeshStandardMaterial({ 
  color: 0xff0000, // Blue
  metalness: 0.5,
  roughness: 0.5,
  fog: true,
  transparent: true,  // Enable transparency
  opacity: 0.1       // Set opacity level (0 = fully transparent, 1 = fully opaque)
});

const faceMaterial = new MeshStandardMaterial({ 
  color: 0xffffff,
  transparent: true,
  opacity: 0.7,
  side: DoubleSide
});

// Use an array of materials
const heptagonMesh = new Mesh(heptagonGeometry, [borderMaterial, faceMaterial]);


watch(boxesRef, () => {
  // //getting positions for all the boxes
  // const positions = Array.from(boxesRef.value.children).map(
  //   (child) => child.position
  // );
  // //getting rotations for all the boxes
  // const rotations = Array.from(boxesRef.value.children).map(
  //   (child) => child.rotation
  // );

  // const animProperties = {
  //   ease: 'power1.inOut',
  //   duration: 1,
  //   stagger: {
  //     each: 0.25,
  //     repeat: -1,
  //     yoyo: true,
  //   },
  // };
  // // gsap.to(positions, {
  // //   y: 2.5,
  // //   ...animProperties,
  // //   rotation: Math.PI,
  // // });
  // gsap.to(rotations, {
  //   x: 2,
  //   ...animProperties,
  //   rotationY: "1.5rad_ccw"
  // });
  gsap.to(heptagonMesh.rotation, {
    z: Math.PI,
    duration: 10,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
  });
  
  console.log(cam.value);

  console.log("heptagon.position");
  console.log(heptagon.value.position);
  
});

import { ref } from 'vue';
import { createDeflate } from 'zlib';

// Define rotation values in radians
const rotationX = ref(0); // Rotation around X-axis
const rotationY = ref(Math.PI / 2); // Rotation around Y-axis (45 degrees)
const rotationZ = ref(0); // Rotation around Z-axis

const cam = ref(0); // Rotation around Z-axis

const a = new Vector3( 0, 10, 100 );
const refa = ref(a);


let aa = true;

watch(cam, () => {
  console.log("cam.value");
  console.log(cam.value);

  const c: PerspectiveCamera = cam.value as unknown as PerspectiveCamera;

});

</script>

<template>
  <TresCanvas>

    <TresPerspectiveCamera
      ref="cam"
      :position="[0, 0, 3]"
      :fov="45"
      :near="0.1"
      :far="1000"
      :look-at="[0, 0, 0]"
    />
    <!-- <TresPerspectiveCamera :position="[-1, 5, 4]" :rotation="[rotationX, rotationY, rotationZ]"  /> -->
    <!-- <TresPerspectiveCamera ref="cam"  /> -->
    <!-- <TresPerspectiveCamera :args="[45, 1, 0.1, 1000]" :look-at="[0, 1.5, 0]" ref="cam"  /> -->
    <!-- <TresPerspectiveCamera visible :args="[10, 1, 0.1, 1]"  /> -->
    
    <OrbitControls />
    <TresGroup ref="boxesRef">
      <primitive :object="heptagonMesh" :position="[0, 0, 0]" ref="heptagon" />
    </TresGroup>
    <TresGridHelper :args="[30, 30, 0x444444, 'teal']" :position="[0, -2, 0]" />
    <TresAmbientLight :intensity="1" />
    <DirectionalLight :position="[5, 5, 5]" :intensity="2" />
  </TresCanvas>
</template>

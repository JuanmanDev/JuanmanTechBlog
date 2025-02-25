

<script setup lang="ts">
import { TresCanvas, useRenderLoop } from '@tresjs/core';
import { BasicShadowMap, SRGBColorSpace, NoToneMapping, Shape, ShapeGeometry, Mesh, MeshBasicMaterial } from 'three';

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
heptagonShape.closePath();

const heptagonGeometry = new ShapeGeometry(heptagonShape);
const heptagonMaterial = new MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.5, side: 2 });
const heptagonMesh = new Mesh(heptagonGeometry, heptagonMaterial);


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
});
</script>

<template>
  <TresCanvas clear-color="#82DBC5">
    <TresPerspectiveCamera :position="[-15, 10, 15]" />
    <OrbitControls />
    <TresGroup ref="boxesRef">
      <TresMesh>
        <primitive :object="heptagonMesh" :position="[0, 1, 0]" ref="heptagon" />
      </TresMesh>
    </TresGroup>
    <TresGridHelper :args="[10, 10, 0x444444, 'teal']" />
  </TresCanvas>
</template>

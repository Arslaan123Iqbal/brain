"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";
import { data } from "./data.js";
import * as THREE from "three";
import { shaderMaterial, Text } from "@react-three/drei";
import { Tubes } from "./BrainTubes.jsx";
const PATHS = data.economics[0].paths;



const randomRange = (max, min) => Math.random() * (max - min) + min;
let curves = [];
for (let i = 0; i < 100; i++) {
  let points = [];
  let lenght = randomRange(0.1, 1);
  for (let j = 0; j < 100; j++) {
    points.push(
      new THREE.Vector3().setFromSphericalCoords(
        0.1,
        Math.PI - (j / 100) * Math.PI * lenght,
        (i / 100) * Math.PI * 2
      )
    );
  }

  let tempcurve = new THREE.CatmullRomCurve3(points);
  curves.push(tempcurve);
}

let brainCurves = [];

PATHS.forEach((path) => {
  let points = [];
  for (let i = 0; i < path.length; i += 3) {
    points.push(new THREE.Vector3(path[i], path[i + 1], path[i + 2]));
  }
  let tempCurve = new THREE.CatmullRomCurve3(points);

  brainCurves.push(tempCurve);
});

function BrainParticles({ alltheCurves }) {
  let density = 10;
  let numberOfPoints = density * alltheCurves.length;
  const myPoints = useRef([]);
  const brainGeo = useRef();

  let positions = useMemo(() => {
    let positions = [];
    for (let i = 0; i < numberOfPoints; i++) {
      positions.push(
        randomRange(-1, 1),
        randomRange(-1, 1),
        randomRange(-1, 1)
      );
    }
    return new Float32Array(positions);
  }, []);

  let randoms = useMemo(() => {
    let randoms = [];
    for (let i = 0; i < numberOfPoints; i++) {
      randoms.push(randomRange(0.3, 1));
    }
    return new Float32Array(randoms);
  }, []);

  useEffect(() => {
    for (let i = 0; i < alltheCurves.length; i++) {
      for (let j = 0; j < density; j++) {
        myPoints.current.push({
          currentOffset: Math.random(),
          speed: Math.random() * 0.01,
          curve: alltheCurves[i],
          curPosition: Math.random(),
        });
      }
    }
    console.log(
      myPoints.current.map((point) => point.curve),
      "MyPoints"
    );
  }, []);

  useFrame(({ clock }) => {
    let curPositions = brainGeo.current.attributes.position.array;
    for (let i = 0; i < myPoints.current.length; i++) {
      myPoints.current[i].curPosition += myPoints.current[i].speed;
      myPoints.current[i].curPosition = myPoints.current[i].curPosition % 1;

      let curPoint = myPoints.current[i].curve.getPointAt(
        myPoints.current[i].curPosition
      );

      curPositions[i * 3] = curPoint.x;
      curPositions[i * 3 + 1] = curPoint.y;
      curPositions[i * 3 + 2] = curPoint.z;
    }

    brainGeo.current.attributes.position.needsUpdate = true;
  });

  const BrainParticleMaterial = shaderMaterial(
    { time: 0, color: new THREE.Color(0.1, 0.3, 0.6) },
    // vertex shader
    /*glsl*/ `
      varying vec2 vUv;
      varying float vProgress;
      uniform float time;
      attribute float randoms;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = randoms*4. * (1. / -mvPosition.z);
      }
    `,
    // fragment shader
    /*glsl*/ `
      uniform float time;
      void main() {
        float disc = length(gl_PointCoord.xy - vec2(0.5));
        float opacity = 0.3 * smoothstep(0.5, 0.4, disc);
        gl_FragColor = vec4(vec3(opacity), 1.);
      }
    `
  );

  extend({ BrainParticleMaterial });
  return (
    <points>
      <bufferGeometry attach="geometry" ref={brainGeo}>
        <bufferAttribute
          attach={"attributes-position"}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />

        <bufferAttribute
          attach={"attributes-randoms"}
          count={randoms.length}
          array={randoms}
          itemSize={1}
        />
      </bufferGeometry>
      <brainParticleMaterial attach="material" />
    </points>
  );
}

const Brain = ({ curve }) => {
  return (
    <Canvas camera={{ position: [0, 0, 0.3] }}>
      <color attach="background" args={["black"]} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
     {curve == "curve"? <Tubes allthecurves={curves} /> : <Tubes allthecurves={brainCurves} />}
     {
      curve =="curve" ? <BrainParticles alltheCurves={curves} /> : <BrainParticles alltheCurves={brainCurves} />
     }
     {/* <Text 
      fontSize={0.1}
       position={[0, 0, 0]} // Position the text in the center of the scene
       color="white" // The color of the text
     >
       Hello World
     </Text> */}
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default Brain;

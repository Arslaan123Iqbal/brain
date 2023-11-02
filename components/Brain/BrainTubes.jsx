"use client";
import { OrbitControls } from '@react-three/drei';
import { Canvas, extend, useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { data } from './data.js';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei'
const PATHS = data.economics[0].paths;
export function Tube({curve}){
    const BrainMat = useRef()
    useFrame(({clock})=>{
        BrainMat.current.uniforms.time.value = clock.getElapsedTime()
    })

  
    const BrainMaterial = shaderMaterial(
        { time: 0, color: new THREE.Color(0.1, 0.3, 0.6) },
        // vertex shader
        /*glsl*/`
          varying vec2 vUv;
          varying float vProgress;
          uniform float time;
          void main() {
            vUv = uv;
            vProgress =  smoothstep(-1., 1., sin(vUv.x*8. + time * 3.));
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        // fragment shader
        /*glsl*/`
          uniform float time;
          uniform vec3 color;
          varying vec2 vUv;
          varying float vProgress;
          void main() {

            vec3 color1 = vec3(1., 0.,0.);
            vec3 color2 = vec3(1.,1.,0.);
            vec3 finalColor = mix(color, color*0.25,vProgress);
            float hideCorners = smoothstep(1.,0.9,vUv.x);
            float hideCorners1 = smoothstep(0.,0.1,vUv.x);
          //  vec3 finalColor= mix(color1, color2, vProgress);
            gl_FragColor.rgba = vec4(vec3(vProgress),1.);
            gl_FragColor.rgba = vec4(finalColor,hideCorners * hideCorners1);
          }
        `
      )
      

      extend({ BrainMaterial});
        return<>
        <mesh>
            <tubeGeometry  args={[curve, 64,0.001, 3 , false]}/>
            <brainMaterial ref={BrainMat} side={THREE.DoubleSide} transparent={true} depthTest={false} depthWrite={false} blending={THREE.AdditiveBlending}/>
        </mesh>
        </>

}
export function Tubes({allthecurves}){
    return <>
    {
        allthecurves.map((curve, index)=> (
            <Tube curve={curve} key={index}/>
        ))
    }
    </>
}
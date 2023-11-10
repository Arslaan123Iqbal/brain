"use client";
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import NextIcon from '../../public/next.svg'


function Icon(props) {
  const meshRef = useRef()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [rotation, setRotation] = useState('')

  useFrame((state, delta) => {
    meshRef.current.rotation.x += rotation[0] * delta
    meshRef.current.rotation.y += rotation[1] * delta
    meshRef.current.rotation.z += rotation[2] * delta
  })

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function Spiralanimation() {
    return (
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Icon position={[-1.2, 0, 0]} />
        <Icon position={[1.2, 0, 0]} />
      </Canvas>
    )
  }
  
  export default Spiralanimation


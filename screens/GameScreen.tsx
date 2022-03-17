import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber/native'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FONTS } from '../constants'
import * as THREE from 'three'

const scene = new THREE.scene(
  
)

function Box(props : any ) {
  const mesh = useRef(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function GameScreen() {
  const Velocity = useRef({
    x: 0,
    y: 0,
    z: 0
  })

  useFrame(()=>{
    Velocity.current.x += 1
  })

  return (
    <SafeAreaView style={{ flex: 1}}>
      <TouchableOpacity>
        <Text style={{...FONTS.h1}}>BUTTON</Text>
      </TouchableOpacity>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </SafeAreaView>
  )
}
import React, { useState, forwardRef, useRef} from 'react'
import * as THREE from 'three'
import { Canvas} from '@react-three/fiber/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, Pressable} from 'react-native'
import { FONTS } from '../constants'

const LEFT = 'LEFT'
const RIGHT = 'RIGHT'
const FORWARD = 'FORWARD'
const BACKWARD = 'BACKWARD'

const Box = forwardRef((props : any, ref: any) => {

  const [hovered, setHover] = useState(false)

  return (
    <mesh
      {...props}
      ref={ref}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
})

export default function GameScreen() {
  const [direction, setDirection] = useState(LEFT)
  const meshRef = useRef([] as any)

  const handlePress = (props : any) => {
    if (props === LEFT) meshRef.current.position.x = meshRef.current.position.x += 0.5
    if (props === RIGHT) meshRef.current.position.x = meshRef.current.position.x -= 0.5
    if (props === FORWARD) meshRef.current.position.y = meshRef.current.position.y += 0.5
    if (props === BACKWARD) meshRef.current.position.y = meshRef.current.position.y -= 0.5
  }

  return (
    <SafeAreaView style={{ flex: 1}}>
      <Pressable onPress={() => {handlePress(LEFT)}}>
        <Text style={{...FONTS.h1}}>{LEFT}</Text>
      </Pressable>
      <Pressable onPress={() => {handlePress(RIGHT)}}>
        <Text style={{...FONTS.h1}}>{RIGHT}</Text>
      </Pressable>
      <Pressable onPress={() => {handlePress(FORWARD)}}>
        <Text style={{...FONTS.h1}}>{FORWARD}</Text>
      </Pressable>
      <Pressable onPress={() => {handlePress(BACKWARD)}}>
        <Text style={{...FONTS.h1}}>{BACKWARD}</Text>
      </Pressable>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[0, 0, 0]} />
        <Box direction={direction} ref={meshRef}/>
      </Canvas>
    </SafeAreaView>
  )
}
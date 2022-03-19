import React, { useState, forwardRef, useRef} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, Pressable} from 'react-native'
import { FONTS } from '../constants'
import { Asset } from 'expo-asset'
import { GLView } from 'expo-gl'
import ExpoTHREE, { THREE } from 'expo-three'

const gltf = Asset.fromModule(require('../assets/scene.gltf'))

let body = new THREE.Scene()

const onContextCreate = async (gl : any) => {

  const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

  let scene = new THREE.Scene()

  let camera = new THREE.PerspectiveCamera(80, width / height, 0.01, 1000)

  let renderer : any = new ExpoTHREE.Renderer({ gl });
  renderer.setSize(width, height)
  renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  //scene.add(cube);

  const animate = () => {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
    gl.endFrameEXP();
  };
  animate();
}
const LEFT = 'LEFT'
const RIGHT = 'RIGHT'
const FORWARD = 'FORWARD'
const BACKWARD = 'BACKWARD'

export default function GameScreen () {

  const [direction, setDirection] = useState(LEFT)
  const meshRef = useRef([] as any)

  const handlePress = (props : any) => {
    if (props === LEFT) {}
    if (props === RIGHT) {}
    if (props === FORWARD) {} 
    if (props === BACKWARD) {}
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
      <GLView style={{ width: 300, height: 300 }} onContextCreate={onContextCreate} />
    </SafeAreaView>
  )
}
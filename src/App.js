import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics, useCylinder, usePlane } from '@react-three/cannon'
import { OrbitControls, Environment } from '@react-three/drei'
import Vehicle from './components/Vehicle'
import { FontLoader } from 'three'
import Roboto from "./fonts/Roboto_Regular.json"

export default function App() {
  return (
    <>
      <Canvas dpr={[1, 1.5]} shadows camera={{ position: [0, 5, 15], fov: 50 }}>
        <color attach="background" args={['#171720']} />
        <ambientLight intensity={0.4} castShadow/>
        <directionalLight intensity={0.7} castShadow/>
        <Physics broadphase="SAP" contactEquationRelaxation={4} friction={1e-3} allowSleep>
          <Plane rotation={[-Math.PI / 2, 0, 0]} userData={{ id: 'floor' }} />
          <Vehicle position={[0, 2, 0]} rotation={[0, -Math.PI / 4, 0]} angularVelocity={[0, 0.5, 0]} wheelRadius={0.3}/>
        </Physics>
        <Titletext castShadow/>
        <Suspense fallback={null}>
          <Environment preset="night" />
        </Suspense>
        <OrbitControls makeDefault/>
      </Canvas>
      <div style={{ position: 'absolute', top: 30, left: 40 }}>
        <pre>
          Must run fullscreen!
          <br />
          WASD to drive, space to brake
          <br />R to reset
        </pre>
      </div>
    </>
  )
}

function Plane(props) {
  const [ref] = usePlane(() => ({ type: 'Static', material: 'ground', ...props }))
  return (
    <group ref={ref}>
      <mesh receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="#141414" />
      </mesh>
    </group>
  )
}

function Pillar({ args = [0.7, 0.7, 5, 16], ...props }) {
  const [ref] = useCylinder(() => ({ mass: 10, args, ...props }))
  return (
    <mesh ref={ref} castShadow>
      <cylinderGeometry args={args} />
      <meshNormalMaterial />
    </mesh>
  )
}

function Titletext() {
  const loader = new FontLoader().parse(Roboto);
  const textOptions = {
    font: loader,
    size: 3,
    height: 1
  };
  return (
    <mesh position={[-10, 5, -5]} rotation={[0, -0.5, 0]}>
      <textGeometry attach='geometry' args={['My Portfolio', textOptions]} />
      <meshLambertMaterial attach='material' castShadow/>
    </mesh>
  )
}

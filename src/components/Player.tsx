import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  PointerLockControls,
  useKeyboardControls,
  useHelper,
} from '@react-three/drei'
import {
  CapsuleCollider,
  RapierRigidBody,
  RigidBody,
} from '@react-three/rapier'
import { SpotLight, Vector3, SpotLightHelper } from 'three'
import { useCameraShake } from '../hooks/useCameraShake'

const direction = new Vector3()
const frontVector = new Vector3()
const sideVector = new Vector3()

const MAX_VERTICAL_ANGLE = Math.PI / 8

export function Player() {
  const ref = useRef<RapierRigidBody>(null)
  const spotlightRef = useRef<SpotLight>(null)

  const [, get] = useKeyboardControls()
  useCameraShake(0.55, 1.4)

  // Use MutableRefObject<SpotLight> and assert to correct type
  useHelper(
    spotlightRef as React.MutableRefObject<SpotLight>,
    SpotLightHelper,
    'cyan'
  )

  useFrame((state) => {
    const { forward, backward, left, right } = get()
    const velocity = ref.current!.linvel()

    state.camera.rotation.order = 'YXZ'
    const cameraRotation = state.camera.rotation.x
    if (cameraRotation > MAX_VERTICAL_ANGLE) {
      state.camera.rotation.x = MAX_VERTICAL_ANGLE
    } else if (cameraRotation < -MAX_VERTICAL_ANGLE) {
      state.camera.rotation.x = -MAX_VERTICAL_ANGLE
    }

    const { x, y, z } = ref.current!.translation()
    state.camera.position.set(x, y, z)

    frontVector.set(0, 0, +backward - +forward)
    sideVector.set(+left - +right, 0, 0)
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(9)
      .applyQuaternion(state.camera.quaternion)
    ref.current!.setLinvel(
      { x: direction.x, y: velocity.y, z: direction.z },
      true
    )

    if (spotlightRef.current) {
      spotlightRef.current.position.copy(state.camera.position)
      spotlightRef.current.rotation.copy(state.camera.rotation)
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />

      <RigidBody
        ref={ref}
        colliders={false}
        mass={0.5}
        type="dynamic"
        position={[0, 4, 0]}
        enabledRotations={[false, false, false]}
      >
        <spotLight
          ref={spotlightRef}
          intensity={1500}
          distance={100}
          angle={Math.PI / 8}
          penumbra={0.03}
          position={[0, 0, 0]}
          color="yellow"
        />
        <CapsuleCollider args={[0.75, 1]} />
      </RigidBody>
      <PointerLockControls />
    </>
  )
}

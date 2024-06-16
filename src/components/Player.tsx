import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls, SpotLight } from '@react-three/drei'
import {
  CapsuleCollider,
  RapierRigidBody,
  RigidBody,
} from '@react-three/rapier'
import { SpotLight as SpotLightImpl, Vector3, Mesh, Color } from 'three'
import { useCameraShake } from '../hooks/useCameraShake'
import { useControls } from 'leva'

const direction = new Vector3()
const frontVector = new Vector3()
const sideVector = new Vector3()

const MAX_VERTICAL_ANGLE = Math.PI / 7.5
const BASE_SPEED_MULTIPLIER = 12
const DASH_SPEED_MULTIPLIER = 20 * 10

export function Player() {
  const ref = useRef<RapierRigidBody>(null)
  const spotlightRef1 = useRef<SpotLightImpl>(null)
  const spotlightRef2 = useRef<SpotLightImpl>(null)

  const targetRef = useRef<Mesh>(null)
  const [, get] = useKeyboardControls()
  useCameraShake(0.55, 1.4)

  const { spotlight2OffsetX, spotlight2OffsetY, spotlight2OffsetZ } =
    useControls({
      spotlight2OffsetX: { value: 0, min: -150, max: 150, step: 0.1 },
      spotlight2OffsetY: { value: -8, min: -150, max: 150, step: 0.1 },
      spotlight2OffsetZ: { value: 85, min: -150, max: 150, step: 0.1 },
    })

  useFrame((state) => {
    if (ref.current) {
      const { forward, backward, left, right, dash } = get()
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
        .multiplyScalar(dash ? DASH_SPEED_MULTIPLIER : BASE_SPEED_MULTIPLIER)
        .applyQuaternion(state.camera.quaternion)
      ref.current!.setLinvel(
        { x: direction.x, y: velocity.y, z: direction.z },
        true
      )

      if (targetRef.current) {
        const targetOffset = new Vector3(0, 0, -70).applyQuaternion(
          state.camera.quaternion
        )
        targetRef.current.position.copy(state.camera.position).add(targetOffset)
      }

      if (spotlightRef1.current && spotlightRef2.current && targetRef.current) {
        spotlightRef1.current.position.copy(state.camera.position)
        spotlightRef1.current.target = targetRef.current!
        spotlightRef1.current.target.updateMatrixWorld()

        const spotlight2Offset = new Vector3(
          spotlight2OffsetX,
          spotlight2OffsetY,
          spotlight2OffsetZ
        ).applyQuaternion(state.camera.quaternion)

        spotlightRef2.current.position
          .copy(targetRef.current!.position)
          .add(spotlight2Offset)
        spotlightRef2.current.target = targetRef.current!
        spotlightRef2.current.target.updateMatrixWorld()
      }
    }
  })

  return (
    <>
      <SpotLight
        ref={spotlightRef1}
        intensity={2500}
        distance={250}
        angle={Math.PI / 4.1}
        penumbra={0.2}
        color={0xede8ba}
      />
      <SpotLight
        ref={spotlightRef2}
        intensity={150000}
        distance={550}
        angle={Math.PI / 9.5}
        penumbra={0.05}
        color="beige"
      />
      <RigidBody
        ref={ref}
        colliders={false}
        mass={0.5}
        type="dynamic"
        position={[0, 4, 0]}
        enabledRotations={[false, false, false]}
      >
        <CapsuleCollider args={[0.75, 1]} />
      </RigidBody>

      <mesh ref={targetRef} position={[0, 0, -6]} visible={false}>
        <boxGeometry args={[1, 1, 1]} />
      </mesh>
    </>
  )
}

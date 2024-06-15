import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import {
  CapsuleCollider,
  RapierRigidBody,
  RigidBody,
} from '@react-three/rapier'
import { SpotLight, Vector3, Mesh } from 'three'
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
  const spotlightRef1 = useRef<SpotLight>(null)
  const spotlightRef2 = useRef<SpotLight>(null)
  const targetRef = useRef<Mesh>(null)
  const [, get] = useKeyboardControls()
  useCameraShake(0.55, 1.4)

  const { spotlight2OffsetX, spotlight2OffsetY, spotlight2OffsetZ } =
    useControls({
      spotlight2OffsetX: { value: 0, min: -150, max: 150, step: 0.1 },
      spotlight2OffsetY: { value: -12, min: -150, max: 150, step: 0.1 },
      spotlight2OffsetZ: { value: 75, min: -150, max: 150, step: 0.1 },
    })

  useFrame((state) => {
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
      const targetOffset = new Vector3(0, 0, -5).applyQuaternion(
        state.camera.quaternion
      )
      targetRef.current.position.copy(state.camera.position).add(targetOffset)
    }

    if (spotlightRef1.current && spotlightRef2.current) {
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
  })

  return (
    <>
      <ambientLight intensity={0.25} />
      <spotLight
        ref={spotlightRef1}
        intensity={4500}
        distance={2500}
        angle={Math.PI / 7.5}
        penumbra={0.15}
        position={[0, 0, 0]}
        color="white"
      />
      <spotLight
        ref={spotlightRef2}
        intensity={155500}
        distance={4500}
        angle={Math.PI / 13}
        penumbra={0.05}
        position={[0, 2, -4]}
        color="white"
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
        <boxGeometry args={[0.1, 0.1, 0.1]} />
      </mesh>
    </>
  )
}

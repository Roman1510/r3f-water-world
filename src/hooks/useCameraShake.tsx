import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Vector3 } from 'three'

export function useCameraShake(intensity = 0.2, frequency = 2) {
  const shake = useRef(new Vector3())
  const noise = useRef(new Vector3())

  useFrame(({ clock, camera }) => {
    const time = clock.getElapsedTime()

    noise.current.set(
      (Math.random() * 2 - 1) * intensity +
        Math.sin(time * (frequency * 0.8)) * intensity * 0.5,
      (Math.random() * 2 - 1) * intensity +
        Math.cos(time * (frequency * 0.6)) * intensity * 0.5,
      (Math.random() * 2 - 1) * intensity +
        Math.sin(time * (frequency * 1.2)) * intensity * 0.5
    )

    shake.current.lerp(noise.current, 0.2)

    camera.position.add(shake.current)
    camera.rotation.x += Math.sin(time * (frequency * 0.9)) * 0.0008
    camera.rotation.y += Math.cos(time * (frequency * 1.1)) * 0.001
  })

  return shake
}

import { Entity, InputAction, pointerEventsSystem, Transform } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { createBox, setBoxColor } from './primitive'

export interface MemoryHandle {
  id: number
  entity: Entity
  collect(): void
  reset(): void
  isCollected(): boolean
}

export function createMemory(id: number, position: Vector3, onCollect: (id: number) => void): MemoryHandle {
  const entity = createBox({
    position,
    scale: Vector3.create(0.75, 1.4, 0.75),
    color: Color4.create(0.9, 0.2, 1, 1),
    collider: true
  })
  let collected = false
  pointerEventsSystem.onPointerDown(
    { entity, opts: { button: InputAction.IA_POINTER, hoverText: 'Remember' } },
    () => {
      if (collected) return
      collected = true
      Transform.getMutable(entity).scale = Vector3.create(0.1, 0.1, 0.1)
      setBoxColor(entity, Color4.create(0.05, 0.05, 0.05, 1))
      onCollect(id)
    }
  )
  return {
    id,
    entity,
    collect() {
      if (collected) return
      collected = true
      Transform.getMutable(entity).scale = Vector3.create(0.1, 0.1, 0.1)
      setBoxColor(entity, Color4.create(0.05, 0.05, 0.05, 1))
    },
    reset() {
      collected = false
      Transform.getMutable(entity).scale = Vector3.create(0.75, 1.4, 0.75)
      setBoxColor(entity, Color4.create(0.9, 0.2, 1, 1))
    },
    isCollected() {
      return collected
    }
  }
}

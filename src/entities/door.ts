import { Entity, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { createBox } from './primitive'

export interface DoorHandle {
  entity: Entity
  open(): void
  close(): void
  isOpen(): boolean
}

export function createDoor(position: Vector3): DoorHandle {
  const entity = createBox({
    position,
    scale: Vector3.create(1.5, 3.5, 0.4),
    color: { r: 0.08, g: 0.7, b: 0.95, a: 1 },
    collider: true
  })
  const closed = Vector3.create(1.5, 3.5, 0.4)
  let open = false
  return {
    entity,
    open() {
      open = true
      Transform.getMutable(entity).scale = Vector3.create(0.1, 0.1, 0.1)
    },
    close() {
      open = false
      Transform.getMutable(entity).scale = closed
    },
    isOpen() {
      return open
    }
  }
}

import { Entity, Transform } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { createBox } from './primitive'

export function createIntruder(): Entity {
  return createBox({
    position: Vector3.create(14, 1.5, 14),
    scale: Vector3.create(1.2, 3, 1.2),
    color: Color4.create(1, 0.05, 0.15, 1),
    collider: false
  })
}

export function moveIntruder(entity: Entity, target: Vector3): void {
  Transform.getMutable(entity).position = target
}

import { Entity, InputAction, pointerEventsSystem } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { createBox, setBoxColor } from './primitive'
import { SwitchId } from '../game/types'

export interface SwitchHandle {
  id: SwitchId
  entity: Entity
  setActive(active: boolean): void
}

export function createSwitch(id: SwitchId, position: Vector3, onPress: (id: SwitchId) => void): SwitchHandle {
  const entity = createBox({
    position,
    scale: Vector3.create(1.2, 1.1, 1.2),
    color: Color4.create(0.05, 0.25, 0.8, 1),
    collider: true
  })
  pointerEventsSystem.onPointerDown(
    { entity, opts: { button: InputAction.IA_POINTER, hoverText: 'Activate' } },
    () => onPress(id)
  )
  return {
    id,
    entity,
    setActive(active: boolean) {
      setBoxColor(entity, active ? Color4.create(0.1, 1, 0.8, 1) : Color4.create(0.05, 0.25, 0.8, 1))
    }
  }
}

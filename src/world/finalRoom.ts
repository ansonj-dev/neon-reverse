import { engine, InputAction, MeshCollider, MeshRenderer, TextShape, Transform, pointerEventsSystem } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { createBox } from '../entities/primitive'

export function buildFinalRoom(onEscape: () => void): void {
  createBox({ position: Vector3.create(8, 0, 14.6), scale: Vector3.create(15, 0.25, 2.5), color: Color4.create(0.04, 0.015, 0.12, 1), collider: false })
  createBox({ position: Vector3.create(5.5, 0.65, 14.2), scale: Vector3.create(2.4, 0.25, 2.4), color: Color4.create(0.1, 0.9, 0.75, 1), collider: false })
  createBox({ position: Vector3.create(10.5, 0.65, 14.2), scale: Vector3.create(2.4, 0.25, 2.4), color: Color4.create(0.8, 0.2, 1, 1), collider: false })
  createBox({ position: Vector3.create(8, 2.5, 15.2), scale: Vector3.create(5, 4.5, 0.25), color: Color4.create(0.45, 0.05, 0.9, 1), collider: false })

  const exit = engine.addEntity()
  Transform.create(exit, { position: Vector3.create(8, 2.5, 15.0), scale: Vector3.create(2.2, 3.2, 0.3) })
  MeshRenderer.setBox(exit)
  MeshCollider.setBox(exit)
  pointerEventsSystem.onPointerDown(
    { entity: exit, opts: { button: InputAction.IA_POINTER, hoverText: 'Escape' } },
    onEscape
  )

  const label = engine.addEntity()
  Transform.create(label, { position: Vector3.create(5.2, 3.4, 14.5) })
  TextShape.create(label, { text: 'FINAL MEMORY', fontSize: 1.1, textColor: Color4.create(0.8, 1, 1, 1) })
  const sub = engine.addEntity()
  Transform.create(sub, { position: Vector3.create(4.0, 1.7, 14.8) })
  TextShape.create(sub, { text: 'TWO PRESENCES • ONE ESCAPE', fontSize: 0.55, textColor: Color4.create(0.65, 0.8, 1, 1) })
}

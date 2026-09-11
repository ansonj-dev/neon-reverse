import { engine, InputAction, MeshRenderer, TextShape, Transform, pointerEventsSystem, MeshCollider } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { createBox } from '../entities/primitive'

export function buildLobby(onStart: () => void): void {
  createBox({
    position: Vector3.create(8, -0.25, 8),
    scale: Vector3.create(16, 0.5, 16),
    color: Color4.create(0.008, 0.012, 0.04, 1),
    collider: true
  })

  const edge = Color4.create(0.02, 0.45, 0.9, 1)
  createBox({ position: Vector3.create(8, 0.6, 0.3), scale: Vector3.create(15.4, 1.2, 0.6), color: edge, collider: true })
  createBox({ position: Vector3.create(0.3, 0.6, 8), scale: Vector3.create(0.6, 1.2, 15.4), color: edge, collider: true })
  createBox({ position: Vector3.create(15.7, 0.6, 8), scale: Vector3.create(0.6, 1.2, 15.4), color: edge, collider: true })
  createBox({ position: Vector3.create(8, 0.6, 15.7), scale: Vector3.create(15.4, 1.2, 0.6), color: edge, collider: true })

  createText('NEON REVERIE', Vector3.create(2.8, 3.2, 2.5), 3, Color4.create(0.2, 1, 1, 1))
  createText('MEMORY SYSTEM ONLINE', Vector3.create(4.0, 2.25, 3.0), 1.2, Color4.create(0.8, 0.35, 1, 1))
  createText('STAY CLOSE  •  FIND THE FRAGMENTS  •  ESCAPE THE LOOP', Vector3.create(1.8, 1.65, 3.2), 0.7, Color4.create(0.75, 0.85, 1, 1))
  createText('BEST WITH FRIENDS • ECHO MODE AVAILABLE SOLO', Vector3.create(4.0, 1.15, 4.0), 0.48, Color4.create(0.45, 0.7, 1, 1))

  const portal = engine.addEntity()
  Transform.create(portal, { position: Vector3.create(8, 1.4, 5.2), scale: Vector3.create(2.5, 2.8, 0.25) })
  MeshRenderer.setBox(portal)
  MeshCollider.setBox(portal)
  pointerEventsSystem.onPointerDown(
    { entity: portal, opts: { button: InputAction.IA_POINTER, hoverText: 'Enter the maze' } },
    onStart
  )
  createText('ENTER THE MEMORY MAZE', Vector3.create(6.0, 3.2, 5.0), 0.6, Color4.create(0.1, 1, 0.9, 1))
}

function createText(text: string, position: Vector3, fontSize: number, color: Color4): void {
  const entity = engine.addEntity()
  Transform.create(entity, { position })
  TextShape.create(entity, { text, fontSize, textColor: color })
}

import { engine, TextShape, Transform } from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'
import { createBox } from '../entities/primitive'

export function buildLoopTwo(): void {
  const traceColor = Color4.create(0.8, 0.12, 1, 1)
  for (let i = 0; i < 12; i += 1) {
    const angle = (Math.PI * 2 * i) / 12
    createBox({
      position: Vector3.create(8 + Math.cos(angle) * 3.2, 0.25, 12 + Math.sin(angle) * 2.2),
      scale: Vector3.create(0.22, 0.22, 0.22),
      color: traceColor,
      collider: false
    })
  }

  const echo = engine.addEntity()
  Transform.create(echo, { position: Vector3.create(4.0, 2.7, 12.9) })
  TextShape.create(echo, {
    text: 'LOOP 01 ECHO DETECTED',
    fontSize: 0.75,
    textColor: Color4.create(0.9, 0.35, 1, 1)
  })

  const trace = engine.addEntity()
  Transform.create(trace, { position: Vector3.create(4.4, 2.0, 13.2) })
  TextShape.create(trace, {
    text: 'THE PATH REMEMBERS YOU',
    fontSize: 0.42,
    textColor: Color4.create(0.65, 0.8, 1, 1)
  })
}

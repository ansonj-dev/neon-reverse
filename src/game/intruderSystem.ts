import { engine, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { Entity } from '@dcl/sdk/ecs'
import { moveIntruder } from '../entities/intruder'
import { GameSnapshot } from './gameState'
import { distance } from './proximitySystem'

export class IntruderSystem {
  private readonly entity: Entity
  private elapsed = 0
  private active = false

  constructor(entity: Entity) {
    this.entity = entity
  }

  activate(snapshot: GameSnapshot): void {
    this.active = true
    snapshot.intruderActive = true
    this.elapsed = 0
  }

  deactivate(snapshot: GameSnapshot): void {
    this.active = false
    snapshot.intruderActive = false
  }

  update(dt: number, snapshot: GameSnapshot): void {
    if (!this.active || !Transform.has(engine.PlayerEntity)) return
    this.elapsed += dt
    if (this.elapsed < 1) return
    this.elapsed = 0
    const player = Transform.get(engine.PlayerEntity).position
    const current = Transform.get(this.entity).position
    const d = distance(current, player)
    if (d < 3) {
      moveIntruder(this.entity, Vector3.create(15, 1.5, 15))
      return
    }
    const step = Math.min(1.25, d)
    const nx = current.x + ((player.x - current.x) / Math.max(d, 0.001)) * step
    const nz = current.z + ((player.z - current.z) / Math.max(d, 0.001)) * step
    moveIntruder(this.entity, Vector3.create(nx, 1.5, nz))
  }
}

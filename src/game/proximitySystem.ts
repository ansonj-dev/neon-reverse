import { engine, PlayerIdentityData, Transform } from '@dcl/sdk/ecs'
import { Vector3 } from '@dcl/sdk/math'
import { GameSnapshot } from './gameState'

export const PROXIMITY_RADIUS = 5.5

export function distance(a: Vector3, b: Vector3): number {
  const dx = a.x - b.x
  const dy = a.y - b.y
  const dz = a.z - b.z
  return Math.sqrt(dx * dx + dy * dy + dz * dz)
}

export function countNearbyPlayers(): number {
  if (!Transform.has(engine.PlayerEntity)) return 1
  const origin = Transform.get(engine.PlayerEntity).position
  let count = 1
  for (const [entity, _identity, transform] of engine.getEntitiesWith(PlayerIdentityData, Transform)) {
    if (entity === engine.PlayerEntity) continue
    if (distance(origin, transform.position) <= PROXIMITY_RADIUS) count += 1
  }
  return count
}

export function proximitySystem(snapshot: GameSnapshot, onUpdate: (satisfied: boolean) => void): void {
  const nearby = countNearbyPlayers()
  const satisfied = nearby >= 2
  if (snapshot.proximitySatisfied !== satisfied) onUpdate(satisfied)
}

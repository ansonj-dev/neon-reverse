import { Color4, Vector3 } from '@dcl/sdk/math'
import { createBox } from '../entities/primitive'

const wallColor = Color4.create(0.015, 0.12, 0.28, 1)
const neonColor = Color4.create(0.05, 0.55, 0.95, 1)

export function buildMaze(): void {
  // Lobby/maze divider with a central opening.
  createWall(Vector3.create(8, 1.5, 6.1), Vector3.create(16, 3, 0.3))
  createWall(Vector3.create(2.0, 1.5, 7.5), Vector3.create(0.3, 3, 3))
  createWall(Vector3.create(14.0, 1.5, 7.5), Vector3.create(0.3, 3, 3))

  // Compact zig-zag maze.
  createWall(Vector3.create(5.0, 1.5, 8.2), Vector3.create(6.0, 3, 0.3))
  createWall(Vector3.create(11.0, 1.5, 9.5), Vector3.create(6.0, 3, 0.3))
  createWall(Vector3.create(5.0, 1.5, 11.0), Vector3.create(6.0, 3, 0.3))
  createWall(Vector3.create(11.0, 1.5, 12.5), Vector3.create(6.0, 3, 0.3))

  createWall(Vector3.create(3.0, 1.5, 10.0), Vector3.create(0.3, 3, 3.6))
  createWall(Vector3.create(13.0, 1.5, 12.0), Vector3.create(0.3, 3, 3.6))

  // Thin neon rails make the route readable without heavy assets.
  createRail(Vector3.create(8, 0.12, 7.0), Vector3.create(12, 0.08, 0.08))
  createRail(Vector3.create(8, 0.12, 9.0), Vector3.create(12, 0.08, 0.08))
  createRail(Vector3.create(8, 0.12, 11.8), Vector3.create(12, 0.08, 0.08))
  createRail(Vector3.create(8, 0.12, 14.4), Vector3.create(12, 0.08, 0.08))
}

function createWall(position: Vector3, scale: Vector3): void {
  createBox({ position, scale, color: wallColor, collider: true })
}

function createRail(position: Vector3, scale: Vector3): void {
  createBox({ position, scale, color: neonColor, collider: false })
}

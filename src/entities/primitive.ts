import {
  engine,
  Entity,
  Material,
  MeshCollider,
  MeshRenderer,
  Transform
} from '@dcl/sdk/ecs'
import { Color4, Vector3 } from '@dcl/sdk/math'

export interface BoxOptions {
  position: Vector3
  scale: Vector3
  color: Color4
  collider?: boolean
  pointer?: boolean
  hoverText?: string
}

export function createBox(options: BoxOptions): Entity {
  const entity = engine.addEntity()
  Transform.create(entity, { position: options.position, scale: options.scale })
  MeshRenderer.setBox(entity)
  Material.setPbrMaterial(entity, { albedoColor: options.color, metallic: 0.35, roughness: 0.35 })
  if (options.collider) MeshCollider.setBox(entity)
  return entity
}

export function setBoxColor(entity: Entity, color: Color4): void {
  Material.setPbrMaterial(entity, { albedoColor: color, metallic: 0.35, roughness: 0.35 })
}

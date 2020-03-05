export function rotate(
  cx: number,
  cy: number,
  x: number,
  y: number,
  angle: number
) {
  const radians = (Math.PI / 180) * angle
  const cos = Math.cos(radians)
  const sin = Math.sin(radians)
  const nx = cos * (x - cx) + sin * (y - cy) + cx
  const ny = cos * (y - cy) - sin * (x - cx) + cy
  return { x: nx, y: ny }
}

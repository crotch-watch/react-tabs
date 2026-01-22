export const getCartesianDistance = function ({
  x1,
  x2,
  y1,
  y2,
}: {
  x1: number
  x2: number
  y1: number
  y2: number
}) {
  const greaterX = x2 - x1 > 0 ? x2 : x1
  const greaterY = y2 - y1 > 0 ? y2 : y1

  return Math.sqrt(
    Math.pow(greaterX - (greaterX === x2 ? x1 : x2), 2) +
      Math.pow(greaterY - (greaterY === y2 ? y1 : y2), 2),
  )
}

export const getRectCenter = function (rect: DOMRect) {
  return {
    x: rect.width / 2 + rect.left,
    y: rect.height / 2 + rect.top,
  }
}

export const distFromRectCenter = function (
  rect: DOMRect,
  from: { x: number; y: number },
): number {
  const center = getRectCenter(rect)

  const distance = getCartesianDistance({
    x1: center.x,
    x2: from.x,
    y1: center.y,
    y2: from.y,
  })

  return distance
}

export const findMin = <T>(
  items: Iterable<T>,
  callback: (item: T) => number,
): T | null => {
  let min = Infinity
  let closest: T | null = null

  for (const item of items) {
    const value = callback(item)

    if (value > min) continue

    min = value
    closest = item
  }

  return closest
}

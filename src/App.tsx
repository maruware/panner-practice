import React, { useState } from 'react'

interface Point {
  x: number
  y: number
}

interface Status {
  pos: Point
  rotation: number
}

const WIDTH = 500
const HEIGHT = 500

function App() {
  const [me, setMe] = useState<Status>({
    pos: { x: WIDTH / 2, y: HEIGHT / 2 },
    rotation: 0
  })

  const [speaker, setSpeaker] = useState<Point>({ x: WIDTH / 2, y: 0 })
  return (
    <div className="App">
      <svg viewBox={`0, 0, ${WIDTH}, ${HEIGHT}`} style={{ width: 700 }}>
        <rect
          x={0}
          y={0}
          width={WIDTH}
          height={HEIGHT}
          stroke="#555"
          strokeWidth={1}
          fillOpacity={0}
        />
        <g transform={`translate(${me.pos.x}, ${me.pos.y})`}>
          <polygon points="-4,-6 0,-12 4,-6" fill="black" />
          <circle cx={0} cy={0} r={4} fill="black" />
        </g>

        <g transform={`translate(${speaker.x}, ${speaker.y})`}>
          <rect x={-10} y={-5} width={20} height={10} />
        </g>
      </svg>
    </div>
  )
}

export default App

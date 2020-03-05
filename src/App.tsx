import React, { useState, useEffect } from 'react'

import { setupAudio, Audio } from './audio'
import { rotate } from './geometry'

import styled from 'styled-components'

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

const Row = styled.div`
  display: flex;
`

const SvgContainer = styled.div`
  margin-right: 8px;
`

function App() {
  const [me, setMe] = useState<Status>({
    pos: { x: WIDTH / 2, y: HEIGHT / 2 },
    rotation: 0
  })

  const [speaker] = useState<Point>({ x: WIDTH / 2, y: 0 })

  const [audio, setAudio] = useState<Audio>()
  useEffect(() => {
    setupAudio().then(setAudio)
  }, [])
  const handlePlay = () => {
    if (!audio) {
      return
    }
    audio.ctx.resume()
  }
  const handleStop = () => {
    if (!audio) {
      return
    }
    audio.ctx.suspend()
  }

  useEffect(() => {
    if (!audio) {
      return
    }
    const rotatedSpeaker = rotate(
      me.pos.x,
      me.pos.y,
      speaker.x,
      speaker.y,
      me.rotation
    )
    const p = { x: rotatedSpeaker.x - me.pos.x, y: rotatedSpeaker.y - me.pos.y }
    const m = 0.05
    audio.panner.setPosition(p.x * m, -p.y * m, 0)
  }, [audio, me, speaker])

  const handleKeyPressed = (e: React.KeyboardEvent<HTMLElement>) => {
    const d = 2
    console.log('e.key', e.key)
    switch (e.key) {
      case 'ArrowUp':
        me.pos.y -= d
        break
      case 'ArrowDown':
        me.pos.y += d
        break
      case 'ArrowLeft':
        me.pos.x -= d
        break
      case 'ArrowRight':
        me.pos.x += d
        break
      case 'z':
        me.rotation = (me.rotation - 4 + 360) % 360
        break
      case 'x':
        me.rotation = (me.rotation + 4 + 360) % 360
        break
    }

    setMe({ ...me })
  }
  return (
    <div className="App" onKeyDown={handleKeyPressed} tabIndex={0}>
      <div>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handleStop}>Stop</button>
      </div>

      <Row>
        <SvgContainer>
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
            <g
              transform={`translate(${me.pos.x}, ${me.pos.y}) rotate(${me.rotation})`}
            >
              <polygon points="-4,-6 0,-12 4,-6" fill="black" />
              <circle cx={0} cy={0} r={4} fill="black" />
            </g>

            <g transform={`translate(${speaker.x}, ${speaker.y})`}>
              <rect x={-10} y={-5} width={20} height={10} />
            </g>
          </svg>
        </SvgContainer>

        <div>
          <h3>Usage</h3>
          <p>Move: Left, Right, Top, Botton</p>
          <p>Rotate: Z, X</p>
        </div>
      </Row>
    </div>
  )
}

export default App

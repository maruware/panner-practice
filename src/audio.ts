export interface Audio {
  ctx: AudioContext
  source: AudioBufferSourceNode
  panner: PannerNode
}

export async function setupAudio(): Promise<Audio> {
  const ctx = new window.AudioContext()
  const buffer = await loadSample(ctx, 'sample.mp3')
  const source = new window.AudioBufferSourceNode(ctx, {
    buffer: buffer,
    loop: true
  })
  const panner = new window.PannerNode(ctx, { panningModel: 'HRTF' })
  source.connect(panner).connect(ctx.destination)
  ctx.suspend()
  source.start()

  return { ctx, source, panner }
}

async function loadSample(ctx: AudioContext, url: string) {
  const res = await fetch(url)
  const buf = await res.arrayBuffer()
  return ctx.decodeAudioData(buf)
}

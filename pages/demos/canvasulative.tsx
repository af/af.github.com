import React from 'react'
import Layout from '../../components/Layout'
import SiteMeta from '../../components/SiteMeta'

const WIDTH = 450
const HEIGHT = WIDTH

// Silly little canvas game I made a long time ago
const CanvasulativeDemo = () => (
  <Layout>
    <SiteMeta title="Canvasulative" />
    <div className="container gameWrapper">
      <aside>
      <h1>Canvasulative</h1>
      <p>Many years ago, I wrote this simple canvas-based game, a clone of a Flash game that appeared
      occasionally in Reddit's sidebar advertising space. Surprisingly, I still enjoy playing it from
      time to time as a quick little time-waster. Your high score will be tracked in localStorage
      (mine is just shy of 10k).</p>

      <p>The source code is <a href="https://github.com/af/canvasulative">on GitHub</a>, though
      it certainly looks quite dated now!</p>
      </aside>

      <canvas id="game" width={WIDTH} height={HEIGHT}>
        You ain't got canvas.
      </canvas>
    </div>
    <div
      dangerouslySetInnerHTML={{
        __html: `
        <style>
          .gameWrapper { display: flex; gap: 80px; margin-top: 10vh; }
          canvas { display:block; margin:0 auto; background:black; }
        </style>
        <script src="/demos/canvasulative/app.js"></script>
        `,
      }}
    />
  </Layout>
)

export default CanvasulativeDemo

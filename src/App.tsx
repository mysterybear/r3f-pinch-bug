import React, { CSSProperties, useLayoutEffect, useState } from "react"
import { Canvas, useThree, ViewportData } from "react-three-fiber"
import { usePinch } from "react-use-gesture"
import { RectReadOnly } from "react-use-measure"
import "./App.css"

const e = 2

type View = {
  viewport: ViewportData
  size: RectReadOnly
}

const Main = ({ setView }: { setView: (v: View) => void }) => {
  const { viewport, size } = useThree()

  useLayoutEffect(() => {
    setView({ viewport, size })
  }, [viewport, size, setView])

  return (
    <mesh>
      <boxBufferGeometry args={[e, e, e]} />
      <meshBasicMaterial color="tomato" />
    </mesh>
  )
}

const style: CSSProperties = {
  touchAction: "none",
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundColor: "silver",
}

function App() {
  const [view, setView] = useState<View | null>(null)

  const bind = usePinch(
    ({ origin: [x0, y0] }) => {
      if (-e / 2 <= x0 && x0 <= e / 2 && -e / 2 <= y0 && y0 <= e / 2)
        console.log(`working pinch ${x0} ${y0}`)
    },
    {
      transform: ([x, y]) => {
        if (!view) return [x, y]
        const {
          viewport: { factor, width, height },
          size,
        } = view
        const [left, top] = [size.left, size.top].map((v) => v / factor)
        return [
          x / factor - (width / 2 + left),
          -y / factor + (height / 2 + top),
        ]
      },
    }
  )

  return (
    <div style={style} {...bind()}>
      <Canvas>
        <Main setView={setView} />
      </Canvas>
    </div>
  )
}

export default App

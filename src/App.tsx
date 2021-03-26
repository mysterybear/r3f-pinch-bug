import React, { CSSProperties, Fragment } from "react"
import { Canvas } from "react-three-fiber"
import { useDrag, usePinch } from "react-use-gesture"
import "./App.css"

const Main = () => {
  const bind = usePinch(({ movement: [, y] }) => {
    console.log(`not working pinch ${y}`)
  })
  // const bind = useDrag(({ movement: [x, y] }) => {
  //   console.log(`working drag ${x} ${y}`)
  // })
  return (
    <mesh {...bind()}>
      <boxBufferGeometry args={[3, 3, 3]} />
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
  // const bind = usePinch(({ movement: [, y] }) => {
  //   console.log(`working pinch ${y}`)
  // })
  return (
    <Fragment>
      <div style={style}>
        <Canvas>
          <Main />
        </Canvas>
      </div>
      {/* <div
        style={{
          ...style,
          backgroundColor: "yellow",
        }}
        {...bind()}
      /> */}
    </Fragment>
  )
}

export default App

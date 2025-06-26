import Experience from "./Experience.jsx"
import { Canvas } from "@react-three/fiber"
function App() {


  return (
    <>
      <Canvas >
        <ambientLight />
          <Experience />
      </Canvas>
    </>
  )
}

export default App

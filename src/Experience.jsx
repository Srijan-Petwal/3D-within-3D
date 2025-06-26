import {Billboard, useHelper,Text,Html,ContactShadows ,Float,Environment, OrbitControls, PresentationControls,useGLTF, useFBX, useAnimations } from "@react-three/drei"
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import { useState, useEffect, useRef } from "react"
import { useControls } from "leva"
import { useFrame } from "@react-three/fiber"
import * as THREE from 'three'
import { SpotLightHelper } from "three"
export default function Experience(){

    const laptop=useGLTF('/model/Laptop.gltf')
    const book=useGLTF('/model/Book.gltf')
    const spiralCube=useFBX('/model/opera-one-spiral-cubes/source/Spiral-Cubes.fbx')
    const spiralCubeRef=useRef()
    const laptopRef=useRef()
    const screenRef=useRef()
    const [zooming, setZooming] = useState(false)
    const [iframeLoaded, setIframeLoaded] = useState(false)
    const rectLightRef = useRef()
      
    
    
   // useHelper(rectLightRef, SpotLightHelper)


    useEffect(() => {
            book.scene.traverse((child) => {
              if (child.isMesh) {
              child.material.wireframe = true
        // Optional: tweak material for better visibility
             
      }
    })
  }, [book.scene])

console.log(laptopRef)
  const animations=useAnimations(spiralCube.animations,spiralCube)
  useEffect(()=>{
    const action=animations.actions[animations.names[0]]
    
    action.timeScale = 0.4;
    
    action.play()
  },[])




   useFrame((state) => {
    if (zooming && laptopRef.current) {
      const target = laptopRef.current.position.clone().add(new THREE.Vector3(0.6, -0.6, 4.5))
      state.camera.position.lerp(target, 0.01)
      state.camera.lookAt(laptopRef.current.position)
    }
  })


  
  
  const {backgroundColor}=useControls('Background',{
    backgroundColor:{
        label:"bg-color",
        value:"#000472"
    }
  })


  
    return(<>

        <Environment preset="city"/>
        <color attach="background" args={[backgroundColor] } />
       

        <PresentationControls 
        global
        rotation={[0.13,0.1,0]}
        polar={[-0.4,0.2]}
        azimuth={[-0.4,0.8]}
        config={{mass:2,tension:400}}
        snap
        >
        

        <Float rotationIntensity={0.4}>
            <rectAreaLight 
                width={5}
                height={1.65}
                intensity={60}
                color="#9e0819"
                rotation={[0.1,Math.PI,0]}
                position={[0,0.55,-1.5]}
            />

            <spotLight
                ref={spiralCubeRef}
                position={[-25, 5, -7]}
                angle={Math.PI / 6}
                intensity={500}
                castShadow
                color={"#f5772e"}
            />

            <spotLight
                ref={spiralCubeRef}
                position={[-25, -20, -7]}
                angle={Math.PI / 6}
                intensity={2000}
                
                color={"#f79a43"}
                decay={2}
            />

              <spotLight
               
                position={[-25, 10, -20]}
               rotation={[0,Math.PI*0.25,0]}
                intensity={4000}
                angle={0.5}
                
                color={"orangered"}
               
            />
            
            <ambientLight intensity={2} />

             <primitive object={laptop.scene} position-y={-1.2} scale={1.5} rotation-x={0.25} rotation-y={0.11} 
                onClick={(e)=>{
                    e.stopPropagation()
                    setZooming(true)

             }}
             
             >
            <Html transform wrapperClass="visualizer-screen" distanceFactor={1.17}  position={[0,1.56,-1.4]} rotation-x={-0.256}>
                     {!iframeLoaded && (
                         <div className="loader-screen">
                              Loading...
                            </div>
                    )}
                    
                <iframe 
                onLoad={()=>setIframeLoaded(true)}  
                src="https://srijans-snowy-escape.netlify.app/" 
                style={{ display: iframeLoaded ? 'block' : 'none',  }}
                ></iframe>
            </Html>

                <Text 
                font="/fonts/GloriaHallelujah-Regular.ttf" 
                position={[10,-1,-4]} 
                scale={2} 
                children={"Snowy\nEscape"}
                textAlign="center"

                >
                </Text>

                <mesh ref={laptopRef} scale={0.5} position={[-0.2,2,-2.2]}>
                    <sphereGeometry  />
                    <meshBasicMaterial />
                </mesh>

             </primitive>


            <primitive scale={3} rotation-x={Math.PI*(0.4)} position={[10,4,-6]} object={book.scene}/>

        </Float>
       </PresentationControls>
        
        {/* <OrbitControls /> */}
        
       <ContactShadows position={[0,-1.74,0]} opacity={0.4} scale={6} />
       {/* <Billboard
  follow={true}
  lockX={false}
  lockY={false}
  lockZ={false} // Lock the rotation on the z axis (default=false)
> */}
       <primitive 
       ref={spiralCubeRef} 
       object={spiralCube} 
       position={[-11,-9,-5]} 
       scale={0.19}
      
       />
       {/* </Billboard> */}
        </>
    )
}
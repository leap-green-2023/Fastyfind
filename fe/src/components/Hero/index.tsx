import { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Hero() {
  const [scene, setScene] = useState(new THREE.Scene());

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("/building/scene.gltf", (gltf: any) => {
      setScene(gltf?.scene);
    });
  }, []);

  return (
    <>
      <div className="flex">
        <h1 className=" basis-1/2">hello</h1>
        <Canvas style={{ width: "50%", height: "100vh" }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={20} penumbra={1} />
          <pointLight position={[-1, -1, -1]} />
          <OrbitControls enableZoom={false} />
          <primitive object={scene} scale={0.02} zoom={false} />
        </Canvas>
      </div>
    </>
  );
}

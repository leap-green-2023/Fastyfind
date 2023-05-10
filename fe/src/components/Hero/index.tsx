import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function App() {
  const [scene, setScene] = useState(new THREE.Scene());
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("/earth/scene.gltf", (gltf: any) => {
      const animation = gltf.animations[0];
      setScene(gltf?.scene);
    });
  }, []);

  return (
    <Canvas style={{ width: "100%", height: "100vh" }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={20} penumbra={1} />
      <pointLight position={[-1, -1, -1]} />
      <OrbitControls />
      <primitive object={scene} scale={1} />
    </Canvas>
  );
}

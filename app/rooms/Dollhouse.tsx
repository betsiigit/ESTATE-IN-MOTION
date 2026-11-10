
"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

function ApartmentModel() {
  const { scene } = useGLTF("/models/modern-flat-roof-villa.glb");

  const model = useMemo(() => {
    const clonedScene = scene.clone(true);

    clonedScene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });

    return clonedScene;
  }, [scene]);

  const { scale, position, centerY } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    box.getSize(size);
    box.getCenter(center);

    const maxDimension = Math.max(size.x, size.y, size.z);
    const modelScale = maxDimension > 0 ? 12 / maxDimension : 1;

    return {
      scale: modelScale,
      position: [
        -center.x * modelScale,
        -box.min.y * modelScale,
        -center.z * modelScale,
      ] as [number, number, number],
      centerY: (size.y * modelScale) / 2,
    };
  }, [model]);

  return (
    <group position={position}>
      <primitive object={model} scale={scale} />
    </group>
  );
}

export default function Dollhouse({
  activeRoom,
}: {
  activeRoom: string;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "650px",
        background: "#e9e5dc",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 24,
          left: 28,
          zIndex: 2,
          color: "#22251f",
          pointerEvents: "none",
        }}
      >
        <div style={{ fontSize: 10, letterSpacing: 3 }}>
          ESTATE IN MOTION / 3D SHOWROOM
        </div>

        <div
          style={{
            fontSize: 21,
            marginTop: 8,
            fontFamily: "Georgia",
          }}
        >
         {activeRoom}
        </div>
      </div>

      <Canvas
        shadows
        camera={{ position: [12, 9, 12], fov: 38 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#e9e5dc"]} />

        <ambientLight intensity={1.2} />

        <directionalLight
          position={[8, 12, 8]}
          intensity={2}
          castShadow
        />

       <Suspense fallback={null}>
          <ApartmentModel />

          <Environment preset="studio" />

          <ContactShadows
            position={[0, 0.01, 0]}
            opacity={0.35}
            scale={22}
            blur={2.5}
            far={5}
          />
        </Suspense>

        <OrbitControls
          makeDefault
          target={[0, 3, 0]}
          minDistance={3}
          maxDistance={20}
          minPolarAngle={0.25}
          maxPolarAngle={1.5}
          enablePan={false}
          zoomSpeed={0.7}
        />
      </Canvas>

      <div
        style={{
          position: "absolute",
          bottom: 24,
          right: 28,
          fontSize: 10,
          letterSpacing: 1.5,
          color: "#55564f",
          pointerEvents: "none",
        }}
      >
        DRAG TO ROTATE · SCROLL TO ZOOM
      </div>
    </div>
  );
}

useGLTF.preload("/models/modern-flat-roof-villa.glb");


"use client";

import { Suspense, useMemo, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
  useGLTF,
} from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function RoomCamera({ activeRoom }: { activeRoom: string }) {
  const { camera } = useThree();
  const controls = useRef<any>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const destinations: Record<
    string,
    {
      position: [number, number, number];
      target: [number, number, number];
    }
  > = {
    Overview: {
      position: [12, 9, 12],
      target: [0, 3, 0],
    },
    "The Living Room": {
      position: [-3, 3, 5],
      target: [-3, 1.5, 1],
    },
    "The Bedroom": {
      position: [-3, 6.5, 2],
      target: [-3, 2.5, -5],
    },
    "The Kitchen": {
      position: [3, 3, 5],
      target: [3, 1.5, 1],
    },
    "The Bathroom": {
      position: [0, 6.5, 2],
      target: [0, 2.5, -5],
    },
  };

  const destination = destinations[activeRoom];

  useEffect(() => {
    if (!destination) return;

    camera.userData.destinationPosition = new THREE.Vector3(
      ...destination.position
    );

    camera.userData.destinationTarget = new THREE.Vector3(
      ...destination.target
    );

    setIsAnimating(true);
  }, [activeRoom, camera]);

  useFrame(() => {
    if (!isAnimating || !controls.current) return;

    const position = camera.userData.destinationPosition;
    const target = camera.userData.destinationTarget;
    const orbit = controls.current;

    if (!position || !target) return;

    camera.position.lerp(position, 0.035);
    orbit.target.lerp(target, 0.035);
    orbit.update();

    if (
      camera.position.distanceTo(position) < 0.03 &&
      orbit.target.distanceTo(target) < 0.03
    ) {
      camera.position.copy(position);
      orbit.target.copy(target);
      orbit.update();

      setIsAnimating(false);
    }
  });

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enabled={activeRoom === "Overview" && !isAnimating}
      target={[0, 3, 0]}
      minDistance={1}
      maxDistance={20}
      minPolarAngle={0.25}
      maxPolarAngle={1.5}
      enablePan={false}
      zoomSpeed={0.7}
    />
  );
}


function ApartmentModel() {
  const { scene } = useGLTF("/models/house_3d.glb");

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
    const modelScale = maxDimension > 0 ? 9 / maxDimension : 1;

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

  const [cameraRoom, setCameraRoom] = useState("Overview");
const previousRoom = useRef(activeRoom);

useEffect(() => {
  if (previousRoom.current !== activeRoom) {
    setCameraRoom(activeRoom);
    previousRoom.current = activeRoom;
  }
}, [activeRoom]);
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
        <axesHelper args={[6]} />
<gridHelper args={[20, 20]} />

        <ambientLight intensity={1.2} />

        <directionalLight
          position={[8, 12, 8]}
          intensity={2}
          castShadow
        />

       <Suspense fallback={null}>
          <ApartmentModel />

          <ambientLight intensity={0.8} />

<hemisphereLight
  args={["#ffffff", "#b8a995", 1.2]}
/>

<directionalLight
  position={[10, 15, 10]}
  intensity={2}
  castShadow
  shadow-mapSize-width={2048}
  shadow-mapSize-height={2048}
/>

<pointLight
  position={[-8, 5, -8]}
  intensity={0.7}
  color="#fff1dc"
/>

          <ContactShadows
            position={[0, 0.01, 0]}
            opacity={0.35}
            scale={22}
            blur={2.5}
            far={5}
          />
        </Suspense>

     <RoomCamera activeRoom={cameraRoom} />
      </Canvas>

     <div
  style={{
    position: "absolute",
    bottom: 24,
    right: 28,
    display: "flex",
    alignItems: "center",
    gap: 18,
  }}
>
  <span
    style={{
      fontSize: 10,
      letterSpacing: 1.5,
      color: "#55564f",
    }}
  >
    DRAG TO ROTATE · SCROLL TO ZOOM
  </span>

  <button
    onClick={() => setCameraRoom("Overview")}
    style={{
      padding: "12px 20px",
      background: "#22251f",
      color: "#e9e5dc",
      border: "none",
      cursor: "pointer",
      fontSize: 10,
      letterSpacing: 1.5,
    }}
  >
    ↺ OVERVIEW
  </button>
</div>
    </div>
  );
}

useGLTF.preload("/models/house_3d.glb");

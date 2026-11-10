
"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Text,
} from "@react-three/drei";

const roomData = [
  { name: "Living Room", x: -2, z: -1.6, color: "#c8b69a" },
  { name: "Bedroom", x: 2, z: -1.6, color: "#b9a995" },
  { name: "Kitchen", x: -2, z: 1.6, color: "#aaa58f" },
  { name: "Bathroom", x: 2, z: 1.6, color: "#c5c0b5" },
];

function Room({
  name,
  x,
  z,
  color,
  active,
  onSelect,
}: {
  name: string;
  x: number;
  z: number;
  color: string;
  active: boolean;
  onSelect: (name: string) => void;
}) {
  return (
    <group position={[x, 0, z]}>
      {/* Room floor */}
      <mesh
        position={[0, 0.12, 0]}
        receiveShadow
        onClick={(event) => {
          event.stopPropagation();
          onSelect(name);
        }}
      >
        <boxGeometry args={[3.9, 0.22, 3.05]} />
        <meshStandardMaterial
          color={active ? "#b7a17c" : color}
          roughness={0.8}
        />
      </mesh>

      {/* Furniture placeholder */}
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[1.25, 0.35, 0.8]} />
        <meshStandardMaterial color="#766b5b" roughness={0.9} />
      </mesh>

      {/* Room name */}
      <Text
        position={[0, 0.85, 0]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.015}
        outlineColor="#34332e"
      >
        {name.toUpperCase()}
      </Text>
    </group>
  );
}

function House({
  activeRoom,
  onSelect,
}: {
  activeRoom: string;
  onSelect: (name: string) => void;
}) {
  return (
    <group>
      {/* Four rooms */}
      {roomData.map((room) => (
        <Room
          key={room.name}
          {...room}
          active={activeRoom === room.name}
          onSelect={onSelect}
        />
      ))}

      {/* Exterior walls - back */}
      <mesh position={[0, 1.15, -3.25]} castShadow>
        <boxGeometry args={[8.1, 2.1, 0.18]} />
        <meshStandardMaterial color="#e5dfd2" />
      </mesh>

      {/* Exterior walls - left */}
      <mesh position={[-4.05, 1.15, 0]} castShadow>
        <boxGeometry args={[0.18, 2.1, 6.6]} />
        <meshStandardMaterial color="#e5dfd2" />
      </mesh>

      {/* Exterior walls - right */}
      <mesh position={[4.05, 1.15, 0]} castShadow>
        <boxGeometry args={[0.18, 2.1, 6.6]} />
        <meshStandardMaterial color="#e5dfd2" />
      </mesh>

      {/* Front cutaway walls */}
      <mesh position={[-2.05, 0.65, 3.25]} castShadow>
        <boxGeometry args={[4.1, 1.1, 0.18]} />
        <meshStandardMaterial color="#e5dfd2" />
      </mesh>

      <mesh position={[2.05, 0.65, 3.25]} castShadow>
        <boxGeometry args={[4.1, 1.1, 0.18]} />
        <meshStandardMaterial color="#e5dfd2" />
      </mesh>

      {/* Interior dividing walls */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <boxGeometry args={[0.12, 1.4, 6.5]} />
        <meshStandardMaterial color="#d8d0c2" />
      </mesh>

      <mesh position={[0, 0.75, 0]} castShadow>
        <boxGeometry args={[8, 1.4, 0.12]} />
        <meshStandardMaterial color="#d8d0c2" />
      </mesh>
    </group>
  );
}

export default function Dollhouse() {
  const [activeRoom, setActiveRoom] = useState("Living Room");

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
        <div style={{ fontSize: 21, marginTop: 8, fontFamily: "Georgia" }}>
          {activeRoom}
        </div>
      </div>

      <Canvas
        shadows
        camera={{ position: [10, 9, 11], fov: 40 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#e9e5dc"]} />

        <ambientLight intensity={1.1} />
        <directionalLight
          position={[6, 10, 5]}
          intensity={2}
          castShadow
        />

        <House
          activeRoom={activeRoom}
          onSelect={setActiveRoom}
        />

        <ContactShadows
          position={[0, -0.02, 0]}
          opacity={0.35}
          scale={18}
          blur={2.5}
          far={4}
        />

        <Environment preset="studio" />

        <OrbitControls
          makeDefault
          target={[0, 0.5, 0]}
          minDistance={8}
          maxDistance={18}
          minPolarAngle={0.3}
          maxPolarAngle={1.45}
          enablePan={false}
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

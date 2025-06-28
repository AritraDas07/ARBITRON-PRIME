import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text } from '@react-three/drei';
import * as THREE from 'three';

const CyberParticles: React.FC = () => {
  const mesh = useRef<THREE.Points>(null);
  const count = 2000;

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 120;
      
      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.25) {
        color = new THREE.Color('#00FFFF'); // Cyan
      } else if (colorChoice < 0.5) {
        color = new THREE.Color('#FF00FF'); // Magenta
      } else if (colorChoice < 0.75) {
        color = new THREE.Color('#39FF14'); // Neon Green
      } else {
        color = new THREE.Color('#FFD700'); // Gold
      }
      
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      sizes[i] = Math.random() * 6 + 2;
    }
    
    return { positions, colors, sizes };
  }, []);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.02;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.03;
      
      const positions = mesh.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(state.clock.elapsedTime * 3 + i * 0.01) * 0.05;
        positions[i3] += Math.cos(state.clock.elapsedTime * 2 + i * 0.02) * 0.03;
        positions[i3 + 2] += Math.sin(state.clock.elapsedTime * 2.5 + i * 0.015) * 0.02;
      }
      mesh.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const NeonSphere: React.FC<{ position: [number, number, number]; color: string; size: number }> = ({ position, color, size }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.8;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.6;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.4;
      meshRef.current.scale.setScalar(size + Math.sin(state.clock.elapsedTime * 4) * 0.3);
    }
  });

  return (
    <Float speed={6} rotationIntensity={4} floatIntensity={6}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
          wireframe
        />
      </mesh>
    </Float>
  );
};

const CyberTorus: React.FC<{ position: [number, number, number]; color: string }> = ({ position, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.7;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 3;
      meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 2) * 2;
    }
  });

  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={3}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[4, 1.5, 16, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.0}
          transparent
          opacity={0.7}
          wireframe
        />
      </mesh>
    </Float>
  );
};

const DataStreams: React.FC = () => {
  const linesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      linesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.7) * 0.15;
    }
  });

  const lines = useMemo(() => {
    const lineGeometries = [];
    for (let i = 0; i < 40; i++) {
      const points = [];
      for (let j = 0; j < 80; j++) {
        points.push(new THREE.Vector3(
          Math.sin(j * 0.08 + i) * 20,
          j * 0.8 - 25,
          Math.cos(j * 0.08 + i) * 20
        ));
      }
      lineGeometries.push(points);
    }
    return lineGeometries;
  }, []);

  const colors = ['#00FFFF', '#FF00FF', '#39FF14', '#FFD700', '#FF1493'];

  return (
    <group ref={linesRef}>
      {lines.map((points, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={points.length}
              array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial 
            color={colors[i % colors.length]} 
            opacity={0.7} 
            transparent 
          />
        </line>
      ))}
    </group>
  );
};

const CyberGrid: React.FC = () => {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.z = state.clock.elapsedTime * 0.05;
      gridRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 4;
    }
  });

  return (
    <group ref={gridRef} position={[0, -30, 0]}>
      <gridHelper args={[150, 60, "#00FFFF", "#FF00FF"]} />
    </group>
  );
};

const HolographicCube: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.2);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial
          color="#39FF14"
          emissive="#39FF14"
          emissiveIntensity={0.6}
          transparent
          opacity={0.4}
          wireframe
        />
      </mesh>
    </Float>
  );
};

const NeonRings: React.FC = () => {
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      ringsRef.current.rotation.y = state.clock.elapsedTime * 0.4;
      ringsRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={ringsRef} position={[0, 0, -20]}>
      {Array.from({ length: 5 }, (_, i) => (
        <Float key={i} speed={3 + i} rotationIntensity={2} floatIntensity={3}>
          <mesh position={[0, 0, i * 2]}>
            <torusGeometry args={[8 + i * 2, 0.5, 8, 32]} />
            <meshStandardMaterial
              color={['#00FFFF', '#FF00FF', '#39FF14', '#FFD700', '#FF1493'][i]}
              emissive={['#00FFFF', '#FF00FF', '#39FF14', '#FFD700', '#FF1493'][i]}
              emissiveIntensity={0.8}
              transparent
              opacity={0.6}
              wireframe
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

export const ArbitronBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 80 }}
        style={{ 
          background: 'radial-gradient(ellipse at center, #000011 0%, #000000 70%, #000000 100%)' 
        }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[40, 40, 40]} intensity={3} color="#00FFFF" />
        <pointLight position={[-40, -40, -40]} intensity={2.5} color="#FF00FF" />
        <pointLight position={[0, 40, -40]} intensity={2} color="#39FF14" />
        <pointLight position={[40, -40, 0]} intensity={2.2} color="#FFD700" />
        <pointLight position={[-40, 40, 20]} intensity={1.8} color="#FF1493" />
        
        <CyberParticles />
        <DataStreams />
        <CyberGrid />
        <NeonRings />
        
        <NeonSphere position={[-25, 15, -10]} color="#00FFFF" size={2.5} />
        <NeonSphere position={[25, -15, -15]} color="#FF00FF" size={3} />
        <NeonSphere position={[0, 20, -20]} color="#39FF14" size={2} />
        <NeonSphere position={[-20, -10, -8]} color="#FFD700" size={2.8} />
        <NeonSphere position={[15, 10, -12]} color="#FF1493" size={2.2} />
        
        <CyberTorus position={[30, 8, -12]} color="#00FFFF" />
        <CyberTorus position={[-30, -8, -10]} color="#FF00FF" />
        <CyberTorus position={[0, 25, -15]} color="#39FF14" />
        
        <HolographicCube position={[20, -20, -8]} />
        <HolographicCube position={[-15, 15, -12]} />
        <HolographicCube position={[0, -25, -18]} />
        
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.4}
          maxPolarAngle={Math.PI / 1.4}
          minPolarAngle={Math.PI / 3.2}
        />
      </Canvas>
    </div>
  );
};
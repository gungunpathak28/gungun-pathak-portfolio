import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const FloatingParticles = () => {
  const pointsRef = useRef();

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <Stars 
      ref={pointsRef}
      radius={100} 
      depth={50} 
      count={5000} 
      factor={4} 
      saturation={0} 
      fade 
      speed={1} 
    />
  );
};

const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.5} />
        <FloatingParticles />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;

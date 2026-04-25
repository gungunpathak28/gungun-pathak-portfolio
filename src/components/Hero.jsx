import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap'; 
import { ArrowRight } from 'lucide-react';
import profileImg from '../assets/profile.jpeg';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = ({ count, size, color, radius, depth, speed, parallaxFactor }) => {
  const pointsRef = useRef();
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * radius;
      positions[i * 3 + 2] = (Math.random() - 0.5) * depth - (depth / 2); 
    }
    return positions;
  }, [count, radius, depth]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += speed;
      pointsRef.current.rotation.x += speed * 0.5;
      
      pointsRef.current.position.x = state.mouse.x * parallaxFactor;
      pointsRef.current.position.y = state.mouse.y * parallaxFactor;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particlesPosition} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={size} color={color} sizeAttenuation transparent opacity={0.6} blending={THREE.AdditiveBlending} />
    </points>
  );
};

const FloatingSquares = ({ count, colors, radius, parallaxFactor }) => {
  const groupRef = useRef();

  const squares = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      position: [(Math.random() - 0.5) * radius, (Math.random() - 0.5) * radius, (Math.random() - 0.5) * 20 - 5],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: Math.random() * 0.15 + 0.05,
      speed: [Math.random() * 0.01 - 0.005, Math.random() * 0.01 - 0.005, Math.random() * 0.01 - 0.005],
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
  }, [count, radius, colors]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.x = state.mouse.x * parallaxFactor;
      groupRef.current.position.y = state.mouse.y * parallaxFactor;
      
      groupRef.current.children.forEach((child, i) => {
        child.rotation.x += squares[i].speed[0];
        child.rotation.y += squares[i].speed[1];
        child.position.y += squares[i].speed[1] * 2; 
      });
    }
  });

  return (
    <group ref={groupRef}>
      {squares.map((sq, i) => (
        <mesh key={i} position={sq.position} rotation={sq.rotation} scale={sq.scale}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={sq.color} wireframe transparent opacity={0.5} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
};

const WireframeTorus = ({ position, args, speed, color, baseOpacity = 0.3, parallaxFactor }) => {
  const torusRef = useRef();

  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x += speed[0];
      torusRef.current.rotation.y += speed[1];
      torusRef.current.rotation.z += speed[2];
      
      // Floating animation + Parallax
      torusRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5 + (state.mouse.y * parallaxFactor);
      torusRef.current.position.x = position[0] + (state.mouse.x * parallaxFactor);
    }
  });

  return (
    <Torus ref={torusRef} args={args} position={position} rotation={[Math.PI / 3, 0, 0]}>
      <meshStandardMaterial color={color} wireframe transparent opacity={baseOpacity} emissive={color} emissiveIntensity={0.8} blending={THREE.AdditiveBlending} />
    </Torus>
  );
};

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Basic GSAP entrance animation
    const tl = gsap.timeline();
    
    tl.fromTo(textRef.current.children, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
    )
    .fromTo(imageRef.current,
      { scale: 0.8, opacity: 0, rotation: -10 },
      { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" },
      "-=0.5"
    );
  }, []);

  const techStack = ["Python", "React", "Node.js", "Machine Learning", "MongoDB", "AI", "JavaScript"];

  return (
    <section id="hero" className="min-h-screen flex items-center relative z-10 pt-20 pb-16 overflow-hidden" ref={heroRef}>
      
      {/* Absolute Background Canvas for 3D Rings & Galaxy */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
        <Canvas camera={{ position: [0, 0, 15] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#00ff66" intensity={2} />
          
          {/* Depth Layers (Far, Mid, Front) */}
          <ParticleField count={1500} size={0.03} color="#00ffcc" radius={40} depth={30} speed={0.0002} parallaxFactor={-1} />
          <ParticleField count={800} size={0.05} color="#00ff66" radius={30} depth={15} speed={0.0005} parallaxFactor={-2} />
          <ParticleField count={200} size={0.08} color="#ffffff" radius={20} depth={5} speed={0.001} parallaxFactor={-3} />
          
          {/* Floating Neon Squares */}
          <FloatingSquares count={30} colors={['#00ffcc', '#00ff66', '#ffff00']} radius={25} parallaxFactor={-2} />
          
          {/* Left Ring */}
          <WireframeTorus position={[-10, 3, -5]} args={[2.5, 0.5, 16, 60]} speed={[0.002, 0.004, 0.001]} color="#00ffcc" baseOpacity={0.4} parallaxFactor={-1.5} />
          
          {/* Center/Bottom Ring */}
          <WireframeTorus position={[0, -5, -12]} args={[5, 1, 24, 100]} speed={[0.001, 0.002, 0.003]} color="#00ff66" baseOpacity={0.15} parallaxFactor={-0.5} />
          
          {/* Right Ring */}
          <WireframeTorus position={[10, 4, -8]} args={[3, 0.6, 20, 80]} speed={[0.004, 0.003, 0.002]} color="#00ffcc" baseOpacity={0.3} parallaxFactor={-2.5} />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full relative z-10">
        
        {/* Left Content */}
        <div ref={textRef} className="space-y-6">
          <div className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium tracking-wide mb-4">
            Hello, World! 👋
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Gungun Pathak</span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-cursive text-gray-400">
            Building things that matter.
          </h2>
          <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
            A passionate Full-Stack & AI Developer focused on creating intelligent, scalable, and beautifully designed web applications.
          </p>
          
          <div className="pt-4 flex flex-wrap gap-4">
            <a href="#projects" className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-black font-semibold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,204,0.4)]">
              See My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="group inline-flex items-center justify-center px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition-all">
              Contact Me
            </a>
          </div>
        </div>

        {/* Right Content - Profile Image */}
        <div className="flex justify-center md:justify-end relative h-[400px] md:h-[500px] items-center w-full">
          <div className="relative w-64 h-64 md:w-80 md:h-80 z-10" ref={imageRef}>
            {/* Image Container */}
            <div className="absolute inset-0 rounded-full p-2 bg-gradient-to-br from-primary to-secondary shadow-[0_0_40px_rgba(0,255,204,0.2)]">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-background bg-background">
                <img 
                  src={profileImg} 
                  alt="Gungun Pathak" 
                  className="w-full h-full object-cover filter hover:contrast-110 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
        
      </div>

      {/* Infinite Scrolling Ticker */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-black/40 border-t border-b border-primary/20 py-4 backdrop-blur-md z-20">
        <div className="flex w-max animate-scroll">
          {[...Array(2)].map((_, arrayIndex) => (
            <div key={arrayIndex} className="flex items-center whitespace-nowrap">
              {techStack.map((tech, i) => (
                <React.Fragment key={i}>
                  <span className="text-primary font-bold tracking-widest uppercase text-sm px-8">{tech}</span>
                  <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#00ff66]"></span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

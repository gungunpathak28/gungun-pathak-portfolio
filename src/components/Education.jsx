import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Book, Award } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const WireframeTorus = ({ position, args, speed, color, baseOpacity = 0.3, rotation = [0,0,0] }) => {
  const torusRef = useRef();
  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x += speed[0];
      torusRef.current.rotation.y += speed[1];
      torusRef.current.rotation.z += speed[2];
      torusRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.5;
    }
  });
  return (
    <Torus ref={torusRef} args={args} position={position} rotation={rotation}>
      <meshStandardMaterial color={color} wireframe transparent opacity={baseOpacity} emissive={color} emissiveIntensity={0.6} blending={THREE.AdditiveBlending} />
    </Torus>
  );
};

const WireframeSphere = ({ position, args, speed, color }) => {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += speed[0];
      ref.current.rotation.y += speed[1];
    }
  });
  return (
    <Sphere ref={ref} args={args} position={position}>
      <meshStandardMaterial color={color} wireframe transparent opacity={0.15} emissive={color} emissiveIntensity={0.3} blending={THREE.AdditiveBlending} />
    </Sphere>
  );
};

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll('.edu-card');
    
    gsap.fromTo(cards,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  const educationData = [
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'GLA University, Mathura',
      duration: '2024 – 2027',
      score: '7.8 CGPA',
      icon: <GraduationCap className="w-5 h-5 text-primary" />,
      ongoing: true
    },
    {
      degree: 'Intermediate (12th)',
      institution: 'Indian Public School, Vrindavan, Mathura',
      duration: 'May 2024',
      score: '60%',
      icon: <Book className="w-5 h-5 text-secondary" />,
      ongoing: false
    },
    {
      degree: 'High School (10th)',
      institution: 'Kisan Inter College, Sonkh Khera, Mathura',
      duration: 'May 2022',
      score: '75.5%',
      icon: <Award className="w-5 h-5 text-purple-400" />,
      ongoing: false
    }
  ];

  return (
    <section id="education" className="py-24 relative z-10 overflow-hidden" ref={sectionRef}>
      
      {/* Absolute 3D Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-70">
        <Canvas camera={{ position: [0, 0, 15] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#00ff66" intensity={2} />
          
          {/* Far Left Sphere */}
          <WireframeSphere position={[-12, 2, -10]} args={[3, 16, 16]} speed={[0.002, 0.001]} color="#00ffcc" />
          
          {/* Large Center-Left Ring */}
          <WireframeTorus position={[-4, 1, -8]} args={[4.5, 0.8, 16, 80]} speed={[0.001, 0.002, 0.001]} color="#00ff66" baseOpacity={0.2} rotation={[Math.PI / 4, Math.PI / 6, 0]} />
          
          {/* Medium Tilted Gold/Yellow Ring */}
          <WireframeTorus position={[1, -3, -5]} args={[2.5, 0.4, 16, 60]} speed={[0.003, 0.001, 0.002]} color="#ffcc00" baseOpacity={0.3} rotation={[Math.PI / 2.5, -Math.PI / 8, 0]} />
          
          {/* Small Floating Green Ring */}
          <WireframeTorus position={[-1, -4, -2]} args={[1, 0.2, 16, 40]} speed={[0.004, 0.005, 0.001]} color="#00ffcc" baseOpacity={0.4} rotation={[Math.PI / 3, Math.PI / 4, 0]} />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Education Journey</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full glow"></div>
        </div>

        <div className="max-w-4xl mx-auto relative border-l border-white/10 pl-8 ml-4 md:ml-0 md:pl-0 md:border-none space-y-12">
          {/* Timeline central line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"></div>
          
          {educationData.map((edu, index) => (
            <div key={index} className={`edu-card relative flex flex-col md:flex-row items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-8`}>
              
              {/* Timeline dot */}
              <div className="absolute -left-[41px] md:static md:left-auto md:w-16 md:h-16 flex items-center justify-center shrink-0 z-10">
                <div className="w-5 h-5 md:w-full md:h-full rounded-full bg-background border-4 border-primary/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,255,204,0.4)]">
                  <div className="hidden md:block">{edu.icon}</div>
                </div>
              </div>

              {/* Card Content */}
              <div className="glass-card flex-1 w-full relative group hover:shadow-[0_0_25px_rgba(0,255,204,0.15)] transition-all">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors flex flex-wrap items-center gap-3">
                      {edu.degree}
                      {edu.ongoing && (
                        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-secondary/10 text-secondary rounded border border-secondary/20">
                          Ongoing
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-400 font-medium">{edu.institution}</p>
                  </div>
                  <div className="text-sm font-medium text-gray-500 whitespace-nowrap bg-white/5 px-3 py-1 rounded-full w-max h-max">
                    {edu.duration}
                  </div>
                </div>
                
                <div className="mt-4 flex items-center">
                  <span className="text-sm text-gray-400 mr-2">Score:</span>
                  <span className="text-xl font-bold text-primary drop-shadow-[0_0_8px_rgba(0,255,204,0.6)]">
                    {edu.score}
                  </span>
                </div>
              </div>
              
              {/* Desktop Spacer */}
              <div className="hidden md:block flex-1"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;

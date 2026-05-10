import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, FolderGit2 } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Torus } from '@react-three/drei';
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

const GithubIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll('.project-card');
    
    gsap.fromTo(cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
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

  const projects = [
    {
      title: 'Spam Detection Web Application',
      description: 'Real-time Machine Learning web application that instantly classifies messages as Spam or Ham. Demonstrates an end-to-end ML pipeline featuring advanced NLP text preprocessing, vectorization, and model deployment.',
      tech: ['Python', 'Flask', 'Scikit-learn', 'NLP', 'HTML', 'CSS'],
      github: 'https://github.com/gungunpathak28/spam-detection-project',
      live: 'https://spam-detection-project-azure.vercel.app/'
    },
    {
      title: 'Smart Motion Surveillance',
      description: 'A real-time motion detection system with alerts and anomaly detection.',
      tech: ['React', 'WebRTC', 'Express'],
      github: 'https://github.com/gungunpathak28/motion-detection',
      live: 'https://motion-detection-eta.vercel.app/'
    },
    {
      title: 'RentIt Platform',
      description: 'A full-stack rental marketplace with authentication, payments, and tracking.',
      tech: ['MERN Stack', 'Stripe API'],
      github: 'https://github.com/gungunpathak28/Rent-it',
      live: 'https://rent-it-chi.vercel.app/'
    },
    {
      title: 'Smart Voting System',
      description: 'A secure digital voting system with authentication and transparency.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/gungunpathak28/smart-voting-system',
      live: 'https://smart-voting-system-snowy.vercel.app/smart-voting-system/'
    },
    {
      title: 'Smart Food Expiry Tracker',
      badge: 'In Progress',
      description: 'Scan products and get notifications before expiry date. (AI-based project)',
      tech: ['AI/ML', 'Mobile/Full-stack'],
      github: '#',
      live: '#'
    }
  ];

  return (
    <section id="projects" className="py-24 relative z-10 overflow-hidden" ref={sectionRef}>
      
      {/* Absolute 3D Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <Canvas camera={{ position: [0, 0, 15] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#00ff66" intensity={2} />
          
          <WireframeTorus position={[-6, 2, -10]} args={[4, 0.6, 16, 80]} speed={[0.002, 0.001, 0.003]} color="#00ffcc" baseOpacity={0.2} rotation={[Math.PI / 3, Math.PI / 4, 0]} />
          <WireframeTorus position={[6, -4, -8]} args={[3.5, 0.5, 16, 60]} speed={[0.001, 0.003, 0.002]} color="#ffcc00" baseOpacity={0.3} rotation={[-Math.PI / 4, -Math.PI / 6, 0]} />
          <WireframeTorus position={[0, -2, -12]} args={[6, 1, 24, 100]} speed={[0.001, 0.001, 0.001]} color="#00ff66" baseOpacity={0.1} />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Selected Works</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full glow"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="project-card glass-card group relative overflow-hidden flex flex-col hover:border-primary/30 transition-all duration-500">
              {/* Hover gradient background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/5 rounded-xl text-primary group-hover:shadow-[0_0_20px_rgba(0,255,204,0.3)] transition-all">
                    <FolderGit2 className="w-8 h-8" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors flex items-center flex-wrap gap-3">
                  {project.title}
                  {project.badge && (
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-secondary/10 text-secondary rounded border border-secondary/20">
                      {project.badge}
                    </span>
                  )}
                </h3>
                <p className="text-gray-400 mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech, tIndex) => (
                    <span key={tIndex} className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 mt-auto">
                  {project.live !== '#' && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 flex-1 text-sm font-semibold px-4 py-3 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-xl text-primary transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,204,0.3)] hover:-translate-y-1">
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  {project.github !== '#' && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 flex-1 text-sm font-semibold px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:-translate-y-1">
                      <GithubIcon className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Send } from 'lucide-react';
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

const LinkedinIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const elements = sectionRef.current.children;
    
    gsap.fromTo(elements,
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

  const contactLinks = [
    {
      name: 'Email',
      icon: <Mail className="w-8 h-8 group-hover:text-primary transition-colors" />,
      value: 'gungunpathak.2006@gmail.com',
      href: 'mailto:gungunpathak.2006@gmail.com'
    },
    {
      name: 'LinkedIn',
      icon: <LinkedinIcon className="w-8 h-8 group-hover:text-[#0077B5] transition-colors" />,
      value: 'in/gungun-pathak',
      href: 'https://www.linkedin.com/in/gungun-pathak-284b77359/'
    },
    {
      name: 'GitHub',
      icon: <GithubIcon className="w-8 h-8 group-hover:text-white transition-colors" />,
      value: 'github.com/gungunpathak28',
      href: 'https://github.com/gungunpathak28'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const subject = encodeURIComponent('Portfolio Contact');
    const body = encodeURIComponent(`Hello Gungun,\n\nI want to connect.\n\nFrom: ${name} (${email})\n\nMessage:\n${message}`);
    window.location.href = `mailto:gungunpathak.2006@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 relative z-10 overflow-hidden" ref={sectionRef}>
      
      {/* Absolute 3D Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <Canvas camera={{ position: [0, 0, 15] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#00ff66" intensity={2} />
          
          <WireframeTorus position={[-8, 4, -10]} args={[4.5, 0.7, 16, 80]} speed={[0.001, 0.002, 0.001]} color="#00ffcc" baseOpacity={0.2} rotation={[Math.PI / 4, Math.PI / 6, 0]} />
          <WireframeTorus position={[7, -2, -8]} args={[3, 0.4, 16, 60]} speed={[0.003, 0.001, 0.002]} color="#ffcc00" baseOpacity={0.3} rotation={[-Math.PI / 3, -Math.PI / 8, 0]} />
          <WireframeTorus position={[0, -6, -12]} args={[5, 1, 24, 100]} speed={[0.001, 0.001, 0.001]} color="#00ff66" baseOpacity={0.15} />
        </Canvas>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
        
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Let's build something</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full glow mb-8"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            I'm currently available for freelance work, internships, and exciting collaborations. 
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactLinks.map((link, index) => (
            <a 
              key={index}
              href={link.href}
              target={link.name !== 'Email' ? "_blank" : undefined}
              rel={link.name !== 'Email' ? "noopener noreferrer" : undefined}
              className="glass-card group flex flex-col items-center justify-center py-10 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(0,255,204,0.3)] transition-all duration-300"
            >
              <div className="text-gray-400 mb-4">{link.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-1">{link.name}</h3>
              <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors break-all px-2">{link.value}</p>
            </a>
          ))}
        </div>

        <div className="glass-card p-8 md:p-12 relative overflow-hidden">
          {/* Neon background blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
          
          <h3 className="text-2xl font-bold text-white mb-8 relative z-10">Drop a Message</h3>
          
          <form className="relative z-10 space-y-6 text-left" onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Message</label>
              <textarea required rows="4" name="message" value={formData.message} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all" placeholder="Tell me about your project..."></textarea>
            </div>
            <button type="submit" className="w-full group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-black font-bold rounded-xl overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(0,255,204,0.4)]">
              Send Message
              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;

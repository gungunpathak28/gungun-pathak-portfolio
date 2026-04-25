import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, CheckCircle } from 'lucide-react';

// Import images
import cert1 from '../assets/cert-BCA.jpg.jpeg';
import cert2 from '../assets/cert-Fea.jpg.jpeg';
import cert3 from '../assets/cert-internshala.jpg.jpeg';
import cert4 from '../assets/cert-gd.jpg.jpeg';
import cert5 from '../assets/cert-hackathon.jpg.jpeg';
import cert6 from '../assets/cert-parliamen.jpg.jpeg';
import cert7 from '../assets/cert-hack.jpg.jpeg'; // Fallback for the 7th image

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll('.cert-card');
    
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

  const certifications = [
    {
      title: 'Hackvision Hackathon 2024',
      date: 'Nov 2024',
      image: cert1,
      issuer: 'GLA University'
    },
    {
      title: 'FEA Certificate',
      date: '2026',
      image: cert2,
      issuer: 'FEA'
    },
    {
      title: 'English Speaking',
      date: 'Aug 2025',
      image: cert3,
      issuer: 'Internshala'
    },
    {
      title: 'Group Discussion at PARLE',
      date: 'Mar 2026',
      image: cert4,
      issuer: 'GLA University'
    },
    {
      title: 'Hackvision 2k26',
      date: 'Apr 2026',
      image: cert5,
      issuer: 'GLA University'
    },
    {
      title: 'Parliament Workshop',
      date: '2025',
      image: cert6,
      issuer: 'University'
    },
    {
      title: 'SQL (Basic)',
      date: 'Feb 2026',
      image: cert7,
      issuer: 'HackerRank'
    }
  ];

  return (
    <section id="certifications" className="py-24 relative z-10" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Certifications</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full glow"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div key={index} className="cert-card glass-card group overflow-hidden flex flex-col p-0 pb-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,204,0.3)] hover:-translate-y-2 cursor-pointer" onClick={() => window.open(cert.image, '_blank')}>
              <div className="w-full h-48 overflow-hidden rounded-t-2xl relative">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all z-10"></div>
                <img 
                  src={cert.image} 
                  alt={cert.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="px-6 pt-6 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{cert.title}</h3>
                  <Award className="w-6 h-6 text-primary flex-shrink-0 ml-2" />
                </div>
                <p className="text-gray-400 text-sm mb-4">{cert.issuer} &bull; {cert.date}</p>
                
                <div className="mt-auto inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full text-xs font-bold w-max">
                  <CheckCircle className="w-3 h-3" />
                  VERIFIED
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;

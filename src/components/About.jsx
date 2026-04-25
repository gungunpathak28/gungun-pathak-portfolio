import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, BookOpen, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll('.stat-card');
    
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

  const stats = [
    { icon: <Code className="w-8 h-8 text-primary" />, title: 'Active + Completed', value: '4 Projects' },
    { icon: <BookOpen className="w-8 h-8 text-primary" />, title: 'Verified', value: '6 Certifications' },
    { icon: <Briefcase className="w-8 h-8 text-primary" />, title: 'Looking for Internship', value: 'Open to Internship Opportunities', isText: true },
  ];

  return (
    <section id="about" className="py-24 relative z-10" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">About Me</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full glow"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white">Currently Pursuing BCA</h3>
            <p className="text-gray-400 leading-relaxed text-lg">
              I am a dedicated developer currently pursuing my Bachelor of Computer Applications at GLA University. I love exploring the intersection of web development and artificial intelligence to build software that creates real-world impact.
            </p>
            <p className="text-gray-400 leading-relaxed text-lg">
              My core focus is on continuously learning, building hands-on projects, and improving my technical skills. With a strong foundation in modern web frameworks and a growing interest in AI, I am constantly pushing the boundaries of what I can create.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className={`stat-card glass-card flex flex-col items-center justify-center text-center ${index === 2 ? 'sm:col-span-2' : ''}`}>
                <div className="mb-4 p-4 rounded-full bg-white/5 border border-white/10">
                  {stat.icon}
                </div>
                <h4 className={`${stat.isText ? 'text-xl md:text-2xl' : 'text-3xl'} font-bold text-white mb-2`}>{stat.value}</h4>
                <p className="text-gray-400 font-medium">{stat.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll('.skill-card');
    
    gsap.fromTo(cards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  const skillCategories = [
    {
      title: 'Languages',
      skills: ['Python', 'Java', 'JavaScript', 'DSA']
    },
    {
      title: 'Frontend',
      skills: ['React.js', 'HTML5', 'CSS3']
    },
    {
      title: 'Backend',
      skills: ['Node.js', 'Express.js']
    },
    {
      title: 'Database',
      skills: ['MongoDB', 'Oracle SQL']
    },
    {
      title: 'AI / ML',
      skills: ['Machine Learning', 'OpenCV', 'AI Tools Integration']
    },
    {
      title: 'Tools',
      skills: ['Git & GitHub', 'VS Code', 'Eclipse', 'Arduino', 'WordPress', 'Command Line']
    }
  ];

  return (
    <section id="skills" className="py-24 relative z-10" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="mb-16">
          <div className="text-primary text-sm font-bold tracking-widest mb-4 flex items-center gap-2">
            <span className="w-4 h-px bg-primary"></span>
            / 02 - SKILLS
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight uppercase">
            MY TECH
          </h2>
          <h2 className="text-6xl md:text-8xl font-caveat text-white mt-[-10px] opacity-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            Arsenal.
          </h2>
        </div>

        {/* Categories Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-card bg-[#0f0f11] border border-white/5 p-8 rounded-2xl shadow-2xl relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <h3 className="text-gray-400 text-sm font-bold tracking-[0.15em] uppercase mb-6 relative z-10 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary/80 shadow-[0_0_8px_rgba(0,255,204,0.5)]"></span>
                {category.title}
              </h3>
              
              <div className="flex flex-wrap gap-3 relative z-10">
                {category.skills.map((skill, sIndex) => (
                  <span 
                    key={sIndex} 
                    className="px-4 py-2 border border-white/10 text-gray-300 text-sm font-medium rounded-lg hover:border-primary/50 hover:text-white hover:bg-primary/10 transition-all duration-300 cursor-default shadow-sm hover:shadow-[0_0_15px_rgba(0,255,204,0.2)] hover:-translate-y-0.5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

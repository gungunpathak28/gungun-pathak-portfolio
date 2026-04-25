import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const bars = sectionRef.current.querySelectorAll('.skill-bar-fill');
    
    gsap.fromTo(bars,
      { width: 0 },
      {
        width: (i, el) => el.getAttribute('data-width'),
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      }
    );
  }, []);

  const languages = [
    { name: 'HTML5 / CSS3', width: '90%' },
    { name: 'Python', width: '70%' },
    { name: 'Java', width: '70%' },
    { name: 'JavaScript', width: '45%' },
    { name: 'DSA', width: '40%' }
  ];

  const frameworks = ['React.js', 'Node.js', 'Express', 'WordPress'];
  const databases = ['MongoDB', 'Oracle'];
  
  const aiml = ['OpenCV', 'AI Tools Integration', 'Machine Learning'];
  const tools = ['GitHub', 'VS Code', 'Eclipse', 'Arduino', 'Excel', 'Command Line'];

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

        {/* 3 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1: Languages (Bars) */}
          <div className="bg-[#0f0f11] border border-white/5 p-8 rounded-lg shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <h3 className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase mb-8 relative z-10">Languages</h3>
            <div className="space-y-8 relative z-10">
              {languages.map((lang, index) => (
                <div key={index} className="space-y-3">
                  <div className="text-sm font-semibold text-gray-200">{lang.name}</div>
                  <div className="h-[2px] w-full bg-white/10 relative">
                    <div 
                      className="skill-bar-fill absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary shadow-[0_0_10px_rgba(0,255,204,0.5)]"
                      data-width={lang.width}
                      style={{ width: '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Frameworks & Databases */}
          <div className="bg-[#0f0f11] border border-white/5 p-8 rounded-lg shadow-2xl flex flex-col gap-10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="relative z-10">
              <h3 className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase mb-6">Frameworks & Other</h3>
              <div className="flex flex-wrap gap-3">
                {frameworks.map((fw, index) => (
                  <span key={index} className="px-4 py-1.5 border border-white/10 text-gray-400 text-sm hover:border-primary/50 hover:text-white hover:bg-white/5 transition-colors cursor-default rounded-sm">
                    {fw}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase mb-6">Databases</h3>
              <div className="flex flex-wrap gap-3">
                {databases.map((db, index) => (
                  <span key={index} className="px-4 py-1.5 border border-white/10 text-gray-400 text-sm hover:border-primary/50 hover:text-white hover:bg-white/5 transition-colors cursor-default rounded-sm">
                    {db}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: AI/ML & Tools */}
          <div className="bg-[#0f0f11] border border-white/5 p-8 rounded-lg shadow-2xl flex flex-col gap-10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="relative z-10">
              <h3 className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase mb-6">AI / ML</h3>
              <div className="flex flex-wrap gap-3">
                {aiml.map((ai, index) => (
                  <span key={index} className="px-4 py-1.5 border border-primary/30 text-primary text-sm hover:bg-primary/10 transition-colors cursor-default rounded-sm shadow-[0_0_10px_rgba(0,255,204,0.1)]">
                    {ai}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10">
              <h3 className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase mb-6">Tools</h3>
              <div className="flex flex-wrap gap-3">
                {tools.map((tool, index) => (
                  <span key={index} className="px-4 py-1.5 border border-white/10 text-gray-400 text-sm hover:border-primary/50 hover:text-white hover:bg-white/5 transition-colors cursor-default rounded-sm">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;

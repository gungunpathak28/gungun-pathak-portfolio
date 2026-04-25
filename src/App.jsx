import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import ThreeBackground from './components/ThreeBackground';

function App() {
  return (
    <div className="bg-background min-h-screen text-white font-sans selection:bg-primary/30 selection:text-primary overflow-hidden">
      <ThreeBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-white/10 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Gungun Pathak. Built with React & Tailwind.
        </p>
      </footer>
    </div>
  );
}

export default App;

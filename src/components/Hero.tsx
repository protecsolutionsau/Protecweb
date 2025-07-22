import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero = () => {
  const [counters, setCounters] = useState({
    certifications: 0,
    clients: 0,
    experience: 0
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const animateCounter = (key: string, target: number, duration: number = 2000) => {
    let start = 0;
    const increment = target / (duration / 50);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCounters(prev => ({ ...prev, [key]: target }));
        clearInterval(timer);
      } else {
        setCounters(prev => ({ ...prev, [key]: Math.floor(start) }));
      }
    }, 50);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            setTimeout(() => animateCounter('certifications', 50), 300);
            setTimeout(() => animateCounter('clients', 25), 600);
            setTimeout(() => animateCounter('experience', 20), 900);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasAnimated]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWhatWeDo = () => {
    document.getElementById('what-we-do')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-20 md:pt-0 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary-100/20 via-primary-50/10 to-transparent rounded-full filter blur-3xl opacity-60"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center mt-4 md:mt-0">
        <div className="space-y-12">
          
          {/* Main Headline */}
          <div className="space-y-6 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight px-2 md:px-0">
              Smarter Digital Solutions.
              <br />
              <span className="text-primary-500">Built for Impact.</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-500 font-light max-w-2xl mx-auto px-4 md:px-0">
              Experts in strategy, solution design and delivery.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <button
              onClick={scrollToContact}
              className="bg-custom-blue text-white px-7 py-3.5 rounded-lg text-base font-bold hover:bg-custom-blue-hover transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 group flex items-center gap-2"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button
              onClick={scrollToWhatWeDo}
              className="text-slate-600 hover:text-slate-900 transition-colors duration-300 font-medium text-lg group"
            >
              Explore Services
              <span className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 inline-block transition-all duration-300">→</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div ref={statsRef} className="pt-16 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-lg">
                <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                  {counters.certifications}+
                </div>
                <div className="text-slate-600 font-medium">
                  Certifications
                </div>
              </div>
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-lg">
                <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                  {counters.clients}+
                </div>
                <div className="text-slate-600 font-medium">
                  Partners & Clients
                </div>
              </div>
              <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 shadow-lg">
                <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                  {counters.experience}+
                </div>
                <div className="text-slate-600 font-medium">
                  Years of Experience
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
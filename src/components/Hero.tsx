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
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-3 sm:px-4 pt-16 sm:pt-20 md:pt-0 pb-8 md:pb-0 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[200px] sm:h-[300px] md:h-[400px] bg-gradient-to-r from-primary-100/20 via-primary-50/10 to-transparent rounded-full filter blur-3xl opacity-60"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="space-y-6 sm:space-y-8 md:space-y-12">
          
          {/* Main Headline */}
          <div className="space-y-3 sm:space-y-4 md:space-y-6 animate-fade-in-up">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight md:leading-[1.1] tracking-tight">
              Smarter Digital Solutions.
              <br />
              <span className="text-primary-500">Built for Impact.</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-2xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
              Experts in strategy, solution design and delivery.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 animate-fade-in-up px-4" style={{animationDelay: '0.3s'}}>
            <button
              onClick={scrollToContact}
              className="w-full sm:w-auto bg-custom-blue text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg text-sm sm:text-base font-bold hover:bg-custom-blue-hover transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 group flex items-center justify-center gap-2 min-h-[44px]"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            
            <button
              onClick={scrollToWhatWeDo}
              className="w-full sm:w-auto text-slate-600 hover:text-slate-900 transition-colors duration-300 font-medium text-sm sm:text-base md:text-lg group py-2 min-h-[44px] flex items-center justify-center"
            >
              Explore Services
              <span className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 inline-block transition-all duration-300">→</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div ref={statsRef} className="pt-8 sm:pt-12 md:pt-16 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:grid md:grid-cols-3 md:gap-8 max-w-4xl mx-auto">
              <div className="text-center p-3 sm:p-4 md:p-6 bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl border border-slate-200/50 shadow-lg min-w-[90px] sm:min-w-[100px] flex-1 max-w-[110px] sm:max-w-[120px] md:max-w-none">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-slate-900 mb-1 sm:mb-2">
                  {counters.certifications}+
                </div>
                <div className="text-slate-600 font-medium text-xs sm:text-sm md:text-base leading-tight">
                  Solutions
                </div>
              </div>
              <div className="text-center p-3 sm:p-4 md:p-6 bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl border border-slate-200/50 shadow-lg min-w-[90px] sm:min-w-[100px] flex-1 max-w-[110px] sm:max-w-[120px] md:max-w-none">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-slate-900 mb-1 sm:mb-2">
                  {counters.clients}+
                </div>
                <div className="text-slate-600 font-medium text-xs sm:text-sm md:text-base leading-tight">
                  Partners & Clients
                </div>
              </div>
              <div className="text-center p-3 sm:p-4 md:p-6 bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl border border-slate-200/50 shadow-lg min-w-[90px] sm:min-w-[100px] flex-1 max-w-[110px] sm:max-w-[120px] md:max-w-none">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-slate-900 mb-1 sm:mb-2">
                  {counters.experience}+
                </div>
                <div className="text-slate-600 font-medium text-xs sm:text-sm md:text-base leading-tight">
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
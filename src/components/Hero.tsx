import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWhatWeDo = () => {
    document.getElementById('what-we-do')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary-100/20 via-primary-50/10 to-transparent rounded-full filter blur-3xl opacity-60"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="space-y-12">
          
          {/* Main Headline */}
          <div className="space-y-6 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight">
              Smarter Digital Solutions.
              <br />
              <span className="text-primary-500">Built for Impact.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 font-light max-w-2xl mx-auto">
              Experts in strategy, solution design, and delivery.
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
          <div className="pt-16 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-sm font-medium">50+ Projects Delivered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-sm font-medium">6 Industry Certifications</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-sm font-medium">24hr Response Time</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
          <button
            onClick={scrollToWhatWeDo}
            className="group flex flex-col items-center gap-2 text-slate-400 hover:text-slate-600 transition-all duration-300"
          >
            <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
              <div className="w-1 h-3 bg-current rounded-full mt-2 animate-bounce"></div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
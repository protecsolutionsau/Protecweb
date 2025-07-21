import React from 'react';
import { 
  Lightbulb, 
  Code, 
  Settings,
  ArrowRight
} from 'lucide-react';

const ServicesPreview = () => {
  const services = [
    {
      icon: <Lightbulb className="w-10 h-10 text-primary-500" />,
      title: "Strategy & Advisory",
      description: "Digital roadmaps and transformation planning"
    },
    {
      icon: <Code className="w-10 h-10 text-primary-500" />,
      title: "Custom Development",
      description: "Low-code apps and scalable solutions"
    },
    {
      icon: <Settings className="w-10 h-10 text-primary-500" />,
      title: "Managed Services",
      description: "Ongoing platform support and optimization"
    }
  ];

  const scrollToWhatWeDo = () => {
    document.getElementById('what-we-do')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            How We Help
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">
            End-to-end digital solutions tailored to your needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="group text-center p-8 rounded-2xl hover:bg-slate-50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                {service.title}
              </h3>
              
              <p className="text-slate-600 leading-relaxed font-light">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button
            onClick={scrollToWhatWeDo}
            className="inline-flex items-center gap-3 text-primary-500 hover:text-primary-600 transition-colors duration-300 font-semibold text-lg group"
          >
            View All Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
import React from 'react';
import { 
  Cloud, 
  Settings, 
  Award, 
  Shield, 
  Target,
  CheckCircle
} from 'lucide-react';

const Certifications = () => {
  const certifications = [
    {
      name: "AWS",
      icon: <Cloud className="w-8 h-8 text-orange-500" />,
      description: "Amazon Web Services"
    },
    {
      name: "Azure",
      icon: <Cloud className="w-8 h-8 text-blue-500" />,
      description: "Microsoft Azure"
    },
    {
      name: "ServiceNow",
      icon: <Settings className="w-8 h-8 text-green-500" />,
      description: "Platform Expertise"
    },
    {
      name: "PRINCE2",
      icon: <Award className="w-8 h-8 text-purple-500" />,
      description: "Project Management"
    },
    {
      name: "ITIL v4",
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      description: "IT Service Management"
    },
    {
      name: "ISTQB",
      icon: <Target className="w-8 h-8 text-red-500" />,
      description: "Software Testing"
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight animate-fade-in-up">
            Our Certifications
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Backed by industry-recognized certifications and expertise across leading platforms and methodologies.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-primary-200 text-center animate-scale-in"
              style={{animationDelay: `${index * 0.1 + 0.4}s`}}
            >
              <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {cert.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">
                {cert.name}
              </h3>
              <p className="text-sm text-slate-600 font-light">
                {cert.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
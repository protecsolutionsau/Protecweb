import React from 'react';
import { Users, MapPin, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <MapPin className="w-8 h-8 text-primary-500" />,
      title: "Local-First",
      description: "Proudly Perth-based, we understand the local market and business landscape."
    },
    {
      icon: <Heart className="w-8 h-8 text-primary-500" />,
      title: "People-Focused",
      description: "We believe great digital solutions start with understanding people and their needs."
    },
    {
      icon: <Users className="w-8 h-8 text-primary-500" />,
      title: "Collaborative",
      description: "Working closely with our clients as partners, not just service providers."
    }
  ];

  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight animate-fade-in-up">
            Who We Are
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            We're a dedicated team of digital strategists, designers, and developers committed to 
            being your end-to-end partner in digital delivery. Our vision is to create meaningful 
            digital experiences that make a real difference to your business and your customers.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {values.map((value, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 card-hover animate-scale-in group"
              style={{animationDelay: `${index * 0.2 + 0.4}s`}}
            >
              <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
                {value.title}
              </h3>
              <p className="text-slate-600 leading-relaxed font-light">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
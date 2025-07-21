import React from 'react';
import { User, Zap, Users } from 'lucide-react';

const HowWeWork = () => {
  const approaches = [
    {
      icon: <User className="w-12 h-12 text-primary-500" />,
      title: "Human-Centred Design",
      description: "We start with understanding your users' needs, behaviours, and motivations to create solutions that truly resonate.",
      features: ["User research & insights", "Journey mapping", "Accessibility-first approach", "Continuous user feedback"]
    },
    {
      icon: <Zap className="w-12 h-12 text-primary-500" />,
      title: "Agile Delivery",
      description: "Fast, iterative development cycles that allow us to adapt quickly and deliver value early and often.",
      features: ["Sprint-based development", "Regular demonstrations", "Flexible scope management", "Continuous improvement"]
    },
    {
      icon: <Users className="w-12 h-12 text-primary-500" />,
      title: "Collaborative Teams",
      description: "We work as an extension of your team, fostering open communication and shared ownership of outcomes.",
      features: ["Cross-functional teams", "Daily standups", "Transparent communication", "Shared decision making"]
    }
  ];

  return (
    <section id="how-we-work" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            How We Work
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our methodology is built on three core principles that ensure successful outcomes 
            for every project we undertake.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {approaches.map((approach, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm card-hover"
            >
              <div className="mb-6">
                {approach.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {approach.title}
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {approach.description}
              </p>
              <ul className="space-y-2">
                {approach.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-slate-700">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
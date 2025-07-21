import React from 'react';
import { 
  Users,
  Award,
  Clock
} from 'lucide-react';

const TrustIndicators = () => {
  const stats = [
    { icon: <Users className="w-8 h-8" />, number: "50+", label: "Projects Delivered" },
    { icon: <Award className="w-8 h-8" />, number: "6", label: "Industry Certifications" },
    { icon: <Clock className="w-8 h-8" />, number: "24hr", label: "Response Time" }
  ];

  const certifications = [
    "AWS Certified",
    "Microsoft Azure", 
    "ServiceNow",
    "PRINCE2",
    "ITIL v4",
    "ISTQB"
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-center mb-4 text-primary-500">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-slate-900 mb-2">
                {stat.number}
              </div>
              <div className="text-slate-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight">
            Trusted Expertise
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-white border border-slate-200 rounded-full text-slate-700 font-medium text-sm hover:border-primary-300 hover:text-primary-600 transition-all duration-300"
              >
                {cert}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
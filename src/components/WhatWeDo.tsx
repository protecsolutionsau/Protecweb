import React from 'react';
import { 
  Lightbulb, 
  Code, 
  Settings, 
  Users, 
  GraduationCap,
  Server,
  UserCheck,
  Heart,
  Wrench,
  Building2,
  School,
  Banknote,
  Zap,
  Shield,
  ShoppingCart,
  ArrowRight,
} from 'lucide-react';

const WhatWeDo = () => {
  const coreCapabilities = [
    {
      icon: <Lightbulb className="w-8 h-8 text-primary-500" />,
      title: "Advisory & Strategy",
      description: "Roadmaps, platform assessments, and strategic value planning to guide your digital transformation journey."
    },
    {
      icon: <Code className="w-8 h-8 text-primary-500" />,
      title: "Custom App Development",
      description: "Low-code/no-code applications and scalable digital solutions tailored to your business needs."
    },
    {
      icon: <Settings className="w-8 h-8 text-primary-500" />,
      title: "Managed Services",
      description: "Ongoing platform support, enhancement, and monitoring to ensure optimal performance."
    },
    {
      icon: <Users className="w-8 h-8 text-primary-500" />,
      title: "Organisational Change Management",
      description: "Driving adoption and process change to maximise the value of your digital investments."
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-primary-500" />,
      title: "Training & Enablement",
      description: "Upskilling teams to effectively manage and utilise platforms like ServiceNow."
    }
  ];

  const workflowSolutions = [
    {
      icon: <Server className="w-6 h-6 text-primary-500" />,
      title: "IT Workflows",
      description: "Improve service delivery and IT operations"
    },
    {
      icon: <UserCheck className="w-6 h-6 text-primary-500" />,
      title: "Employee Workflows",
      description: "Streamline internal requests and onboarding"
    },
    {
      icon: <Heart className="w-6 h-6 text-primary-500" />,
      title: "Customer Workflows",
      description: "Enhance customer engagement and automation"
    },
    {
      icon: <Wrench className="w-6 h-6 text-primary-500" />,
      title: "Creator Workflows",
      description: "Build internal tools using no-code/low-code"
    }
  ];

  const industries = [
    { 
      name: "Government", 
      icon: <Building2 className="w-8 h-8" />,
      description: "Streamlining public services and improving citizen engagement through digital transformation.",
      solutions: [
        "Digital service delivery platforms",
        "Citizen portal development",
        "Compliance and regulatory workflows",
        "Inter-agency collaboration tools"
      ]
    },
    { 
      name: "Higher Education", 
      icon: <School className="w-8 h-8" />,
      description: "Enhancing student experiences and administrative efficiency with integrated digital solutions.",
      solutions: [
        "Student lifecycle management",
        "Research collaboration platforms",
        "Campus service automation",
        "Alumni engagement systems"
      ]
    },
    { 
      name: "Financial Services", 
      icon: <Banknote className="w-8 h-8" />,
      description: "Securing operations and improving customer experiences while maintaining regulatory compliance.",
      solutions: [
        "Risk management workflows",
        "Customer onboarding automation",
        "Regulatory reporting systems",
        "Digital banking solutions"
      ]
    },
    { 
      name: "Energy", 
      icon: <Zap className="w-8 h-8" />,
      description: "Optimising operations and maintaining safety standards through intelligent automation and monitoring.",
      solutions: [
        "Asset management systems",
        "Safety compliance tracking",
        "Predictive maintenance workflows",
        "Environmental monitoring tools"
      ]
    },
    { 
      name: "Healthcare", 
      icon: <Shield className="w-8 h-8" />,
      description: "Improving patient care and operational efficiency while ensuring data security and compliance.",
      solutions: [
        "Patient management systems",
        "Clinical workflow automation",
        "Medical device integration",
        "Telehealth platforms"
      ]
    },
    { 
      name: "Retail", 
      icon: <ShoppingCart className="w-8 h-8" />,
      description: "Enhancing customer experiences and streamlining operations from supply chain to point of sale.",
      solutions: [
        "Customer experience platforms",
        "Inventory management systems",
        "Supply chain automation",
        "E-commerce integration"
      ]
    }
  ];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="what-we-do" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            What We Do
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            At Protec Solutions, we deliver tailored digital services and workflow solutions 
            to help organisations transform and scale.
          </p>
        </div>
        
        {/* Core Capabilities */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Core Capabilities
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreCapabilities.map((capability, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-slate-50 border border-slate-200 card-hover group"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  {capability.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">
                  {capability.title}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Solutions */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Workflow Solutions
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSolutions.map((workflow, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border-2 border-slate-200 bg-white card-hover group"
              >
                <div className="mb-3 group-hover:scale-110 transition-transform duration-300">
                  {workflow.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">
                  {workflow.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {workflow.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Focus */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12 tracking-tight">
            Industry Focus
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 card-hover group animate-scale-in"
                style={{animationDelay: `${index * 0.1 + 0.6}s`}}
              >
                <div className="flex justify-center mb-4 text-primary-500 group-hover:scale-110 transition-all duration-300">
                  {industry.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4 text-center tracking-tight">
                  {industry.name}
                </h4>
                <p className="text-slate-600 leading-relaxed text-center mb-6 font-light">
                  {industry.description}
                </p>
                <div className="space-y-2">
                  {industry.solutions.map((solution, solutionIndex) => (
                    <div key={solutionIndex} className="flex items-center text-sm text-slate-700 font-light">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 flex-shrink-0"></div>
                      {solution}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhatWeDo;
import React, { useState } from 'react';
import { Send, CheckCircle, User, Mail, Building, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Let Netlify handle the form submission
    const form = e.target as HTMLFormElement;
    
    setIsLoading(true);
    
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form) as any).toString(),
    })
      .then(() => {
        setIsLoading(false);
        setIsSubmitted(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', organisation: '', message: '' });
        }, 3000);
      })
      .catch(() => {
        setIsLoading(false);
        alert('There was an error submitting the form. Please try again.');
      });
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-white p-12 rounded-2xl shadow-xl border border-slate-100 animate-scale-in">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6 animate-bounce" />
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Thank You!</h2>
            <p className="text-xl text-slate-600 font-light">
              We've received your message and will get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight animate-fade-in-up">
            Let's Start a Conversation
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed font-light animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Ready to transform your digital presence? We'd love to hear about your project 
            and explore how we can help you achieve your goals.
          </p>
        </div>
        
        <form 
          name="contact" 
          method="POST" 
          data-netlify="true"
          onSubmit={handleSubmit} 
          className="bg-white p-8 lg:p-10 rounded-2xl shadow-xl border border-slate-100 space-y-8 animate-fade-in-up" 
          style={{animationDelay: '0.4s'}}
        >
          <input type="hidden" name="form-name" value="contact" />
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-primary-500" />
                Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 ${
                    errors.name ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-primary-500'
                  } focus:ring-0 bg-slate-50 focus:bg-white`}
                  placeholder="Your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-500" />
                Email *
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 ${
                    errors.email ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-primary-500'
                  } focus:ring-0 bg-slate-50 focus:bg-white`}
                  placeholder="your.email@company.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="organisation" className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <Building className="w-4 h-4 text-primary-500" />
              Organisation
            </label>
            <input
              type="text"
              id="organisation"
              name="organisation"
              value={formData.organisation}
              onChange={handleChange}
              className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-primary-500 focus:ring-0 bg-slate-50 focus:bg-white transition-all duration-300"
              placeholder="Your company or organisation"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary-500" />
              Message *
            </label>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 resize-none ${
                  errors.message ? 'border-red-300 focus:border-red-500' : 'border-slate-200 focus:border-primary-500'
                } focus:ring-0 bg-slate-50 focus:bg-white`}
                placeholder="Tell us about your project, goals, and how we can help..."
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-500 text-white px-8 py-5 rounded-xl text-lg font-semibold hover:bg-primary-600 transition-all duration-300 hover:transform hover:scale-[1.02] shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
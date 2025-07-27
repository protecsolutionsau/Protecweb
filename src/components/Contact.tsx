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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Get Supabase URL from environment
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Email service is currently unavailable. Please contact us directly at contactus@protecsolutions.com.au or call +61 459 469 120');
      }
      
      const apiUrl = `${supabaseUrl}/functions/v1/send-contact-email`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify(formData),
      });

      // Check if response has content before parsing JSON
      let result;
      const responseText = await response.text();
      
      if (responseText) {
        try {
          result = JSON.parse(responseText);
        } catch (parseError) {
          throw new Error('Server communication error. Please try again or contact us directly.');
        }
      } else {
        throw new Error('No response from server. Please try again or contact us directly.');
      }

      if (!response.ok) {
        throw new Error(result?.error || result?.message || `Server error (${response.status}). Please try again.`);
      }

      setIsLoading(false);
      setIsSubmitted(true);
      
      // Reset form after 4 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', organisation: '', message: '' });
      }, 4000);

    } catch (error) {
      setIsLoading(false);
      
      // More user-friendly error messages
      let errorMessage = 'Unable to send message. Please try again or contact us directly at contactus@protecsolutions.com.au';
      
      if (error.message.includes('fetch')) {
        errorMessage = 'Connection error. Please check your internet and try again.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-white p-12 rounded-2xl shadow-xl border border-slate-100 animate-scale-in">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6 animate-bounce" />
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Message Sent!</h2>
            <p className="text-xl text-slate-600 font-light">
              Thank you for contacting us! We'll respond within 24 hours.
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
          onSubmit={handleSubmit} 
          className="bg-white p-8 lg:p-10 rounded-2xl shadow-xl border border-slate-100 space-y-8 animate-fade-in-up" 
          style={{animationDelay: '0.4s'}}
        >
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
                  className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
                    errors.name ? 'border-red-300 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' : 'border-slate-200 focus:border-custom-blue focus:shadow-[0_0_0_3px_rgba(51,102,255,0.1)]'
                  } bg-slate-50 focus:bg-white`}
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
                  className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none ${
                    errors.email ? 'border-red-300 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' : 'border-slate-200 focus:border-custom-blue focus:shadow-[0_0_0_3px_rgba(51,102,255,0.1)]'
                  } bg-slate-50 focus:bg-white`}
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
              className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 focus:border-custom-blue focus:outline-none focus:shadow-[0_0_0_3px_rgba(51,102,255,0.1)] bg-slate-50 focus:bg-white transition-all duration-300"
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
                className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 resize-none focus:outline-none ${
                  errors.message ? 'border-red-300 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' : 'border-slate-200 focus:border-custom-blue focus:shadow-[0_0_0_3px_rgba(51,102,255,0.1)]'
                } bg-slate-50 focus:bg-white`}
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
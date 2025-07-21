import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <div className="mb-6">
              <span className="text-3xl font-bold">
                Protec <span className="text-primary-400">Solutions</span>
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6">
              Delivering digital solutions that drive impact across Perth and beyond. 
              Your trusted partner in digital transformation.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span className="text-slate-300">support@protecsolutions.com.au</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span className="text-slate-300">+61 420 714 613</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <span className="text-slate-300">Perth, Western Australia</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Business Details</h3>
            <div className="text-slate-300 space-y-2">
              <p>ABN: 54 670 061 168</p>
              <p>ACN: 670 061 168</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="bg-slate-800 rounded-lg p-6 mb-8">
            <h4 className="text-lg font-semibold mb-3 text-primary-400">Acknowledgement of Country</h4>
            <p className="text-slate-300 leading-relaxed">
              We acknowledge the Traditional Owners of the land on which we work, the Whadjuk people 
              of the Noongar nation. We pay our respects to their Elders past, present and emerging, 
              and recognise their continuing connection to Country.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
            <p>&copy; {currentYear} Protec Solutions. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary-400 transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-primary-400 transition-colors duration-200">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
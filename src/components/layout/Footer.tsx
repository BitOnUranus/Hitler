import React from 'react';
import { Link } from 'react-router-dom';
import { CircleDollarSign, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <CircleDollarSign className="h-8 w-8 text-indigo-400" />
              <span className="ml-2 text-xl font-bold">SubsManager</span>
            </div>
            <p className="text-gray-400 text-sm">
              Enterprise-grade subscription management platform for modern businesses.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-3">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Solutions</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/pricing" className="text-gray-400 hover:text-white text-sm">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link to="/features" className="text-gray-400 hover:text-white text-sm">
                      Features
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white text-sm">
                      Enterprise
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white text-sm">
                      API Documentation
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Support</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white text-sm">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white text-sm">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white text-sm">
                      Status Page
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white text-sm">
                      Security
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white text-sm">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white text-sm">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white text-sm">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white text-sm">
                      Partners
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white text-sm">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white text-sm">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white text-sm">
                      Cookie Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white text-sm">
                      GDPR Compliance
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-gray-400 text-sm text-center">
            &copy; {year} SubsManager, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
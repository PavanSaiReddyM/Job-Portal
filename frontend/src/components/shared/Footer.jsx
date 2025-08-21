import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-text-primary">
                Job<span className="text-brand-primary">Portal</span>
              </h2>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              Your gateway to endless career opportunities. Connect with top employers and find your dream job today.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-text-secondary hover:text-brand-primary transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-text-secondary hover:text-brand-primary transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-text-secondary hover:text-brand-primary transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-text-secondary hover:text-brand-primary transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-text-secondary hover:text-brand-primary transition-colors duration-200 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-text-secondary hover:text-brand-primary transition-colors duration-200 text-sm">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-text-secondary hover:text-brand-primary transition-colors duration-200 text-sm">
                  Browse Companies
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-text-secondary hover:text-brand-primary transition-colors duration-200 text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

       

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-primary" />
                <span className="text-sm text-text-secondary">contact@jobportal.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-primary" />
                <span className="text-sm text-text-secondary">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-brand-primary mt-0.5" />
                <span className="text-sm text-text-secondary">
                  123 Business Ave<br />
                  New York, NY 10001
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-surface-subtle">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-text-secondary">
              © 2025 JobPortal. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm text-text-secondary hover:text-brand-primary transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-text-secondary hover:text-brand-primary transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-sm text-text-secondary hover:text-brand-primary transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
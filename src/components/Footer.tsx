import { Separator } from "./ui/separator";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black dark:bg-black bg-white border-t border-slate-300 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl text-slate-900 dark:text-slate-50">Foliomatic AI</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Transform your CV into a stunning portfolio with AI
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="text-slate-900 dark:text-slate-50">Product</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
                  Templates
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-slate-900 dark:text-slate-50">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-slate-900 dark:text-slate-50">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-slate-300 dark:bg-slate-800/50 mb-8" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 dark:text-slate-500">
            © {currentYear} Foliomatic AI. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800/50 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700/50 hover:border-slate-400 dark:hover:border-slate-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800/50 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700/50 hover:border-slate-400 dark:hover:border-slate-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800/50 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700/50 hover:border-slate-400 dark:hover:border-slate-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800/50 hover:bg-slate-300 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700/50 hover:border-slate-400 dark:hover:border-slate-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Email"
            >
              <Mail className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

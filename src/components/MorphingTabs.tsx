import { cn } from "./ui/utils";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

interface MorphingTabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function MorphingTabs({ 
  tabs, 
  activeTab, 
  onTabChange
}: MorphingTabsProps) {
  const [activeSection, setActiveSection] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detect which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute("data-section");
            if (sectionId) {
              setActiveSection(sectionId);
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-100px 0px -100px 0px",
      }
    );

    // Observe all sections
    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleTabClick = (tab: string) => {
    onTabChange(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:block fixed top-6 left-0 right-0 z-50 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="text-white text-xl" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            FoliomaticAI
          </div>

          {/* Tabs with glassmorphism */}
          <div className="relative backdrop-blur-xl bg-white/10 dark:bg-white/5 rounded-full px-4 py-2 border border-white/20 shadow-lg">
            {/* Glassmorphism highlight overlay */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-white/10 to-transparent pointer-events-none" />
            
            <div className="relative flex items-center gap-2">
              {tabs.map((tab) => {
                const isActive = activeSection === tab;
                
                return (
                  <motion.button
                    key={tab}
                    onClick={() => handleTabClick(tab)}
                    className={cn(
                      "relative px-4 py-2 transition-all duration-300 rounded-full",
                      "text-slate-300 hover:text-white"
                    )}
                    animate={{
                      scale: isActive ? 1.1 : 1,
                      y: isActive ? [0, -2, 0] : 0,
                    }}
                    transition={{
                      scale: { duration: 0.3 },
                      y: { 
                        duration: 1.5, 
                        repeat: isActive ? Infinity : 0,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    <span className={cn(
                      "relative z-10 transition-all duration-300",
                      isActive && "text-white"
                    )}>
                      {tab}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Empty div for flexbox balance */}
          <div className="w-32" />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="text-white text-lg" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            FoliomaticAI
          </div>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-white/10"
            >
              <div className="px-6 py-4 space-y-2">
                {tabs.map((tab) => {
                  const isActive = activeSection === tab;
                  
                  return (
                    <button
                      key={tab}
                      onClick={() => handleTabClick(tab)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-lg transition-all duration-300",
                        isActive 
                          ? "bg-white/20 text-white" 
                          : "text-slate-300 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

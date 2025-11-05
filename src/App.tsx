import { useState, useRef } from "react";
import { HeroSection } from "./components/HeroSection";
import { UploadSection } from "./components/UploadSection";
import { PortfolioPreview } from "./components/PortfolioPreview";
import { FeaturesGrid } from "./components/FeaturesGrid";
import { WaitlistSection } from "./components/WaitlistSection";
import { Footer } from "./components/Footer";

import { SleekLineCursor } from "./components/SleekLineCursor";
import { Toaster } from "./components/ui/sonner";
import { MorphingTabs } from "./components/MorphingTabs";
import { TemplateSelector } from "./components/TemplateSelector";
import { InfiniteCarousel } from "./components/InfiniteCarousel";

export default function App() {
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Home");
  
  const heroRef = useRef<HTMLDivElement>(null);
  const uploadRef = useRef<HTMLDivElement>(null);
  const templateRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const waitlistRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    uploadRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleUploadComplete = () => {
    setShowTemplateSelector(true);
    setTimeout(() => {
      templateRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setShowPreview(true);
    setTimeout(() => {
      previewRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    switch(tab) {
      case "Home":
        heroRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "Upload":
        uploadRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "Features":
        featuresRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "Waitlist":
        waitlistRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black dark">
      <MorphingTabs 
        tabs={["Home", "Upload", "Features", "Waitlist"]}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      <SleekLineCursor />
      <Toaster />
      
      <div ref={heroRef} data-section="Home">
        <HeroSection onGetStarted={handleGetStarted} />
      </div>

      <InfiniteCarousel />
      
      <div ref={uploadRef} data-section="Upload">
        <UploadSection onUploadComplete={handleUploadComplete} />
      </div>

      {showTemplateSelector && (
        <div ref={templateRef}>
          <TemplateSelector onSelect={handleTemplateSelect} />
        </div>
      )}

      {showPreview && (
        <div ref={previewRef}>
          <PortfolioPreview />
        </div>
      )}

      <div ref={featuresRef} data-section="Features">
        <FeaturesGrid />
      </div>
      
      <div ref={waitlistRef} data-section="Waitlist">
        <WaitlistSection />
      </div>
      
      <Footer />
    </div>
  );
}

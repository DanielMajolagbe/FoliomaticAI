import { motion } from "motion/react";
import { Check } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import alexTemplate from "figma:asset/528277f2112f9422bb480459f4585ea0230b017b.png";
import jayTemplate from "figma:asset/ad307de0329b2f8088c02e92caacd1167bbcc299.png";
import sarahTemplate from "figma:asset/ff9a9e7e618b0a5de370d7ee167d14083867d1fc.png";

interface Template {
  id: string;
  name: string;
  preview: string;
  description: string;
}

const templates: Template[] = [
  {
    id: "alexander",
    name: "Alexander - UI/UX Designer",
    preview: alexTemplate,
    description: "Bold and modern design perfect for designers and creatives",
  },
  {
    id: "jay",
    name: "Jay Brown - Product Designer",
    preview: jayTemplate,
    description: "Clean and professional layout ideal for job seekers",
  },
  {
    id: "sarah",
    name: "Sarah Mitchell - Creative",
    preview: sarahTemplate,
    description: "Technical and elegant design for developers",
  },
];

interface TemplateSelectorProps {
  onSelect: (templateId: string) => void;
}

export function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      onSelect(selectedTemplate);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-slate-100 dark:from-black dark:to-slate-950 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-slate-50 mb-4 px-4">
            Choose Your Perfect Template
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4">
            Select a professional template that matches your style and personality
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => handleSelectTemplate(template.id)}
              className={`group relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 ${
                selectedTemplate === template.id
                  ? "ring-4 ring-blue-500 shadow-2xl shadow-blue-500/50"
                  : "hover:shadow-xl hover:scale-105"
              }`}
            >
              {/* Template Preview */}
              <div className="relative aspect-[3/4] bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Selected Indicator */}
                {selectedTemplate === template.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Check className="w-6 h-6 text-white" />
                  </motion.div>
                )}
              </div>

              {/* Template Info */}
              <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-xl text-slate-900 dark:text-slate-50 mb-2">
                  {template.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {template.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
        >
          <Button
            onClick={handleContinue}
            disabled={!selectedTemplate}
            size="lg"
            className="px-12 py-6 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-0"
          >
            Continue with Selected Template
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

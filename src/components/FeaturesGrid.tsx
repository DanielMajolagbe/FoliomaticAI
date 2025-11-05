import { Card } from "./ui/card";
import { Sparkles, Zap, Smartphone, Shield } from "lucide-react";
import { motion } from "motion/react";
import { Meteors } from "./Meteors";

export function FeaturesGrid() {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Parsing",
      description: "Advanced AI automatically extracts and organizes all information from your CV with incredible accuracy.",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      icon: Zap,
      title: "Instant Generation",
      description: "Get your professional portfolio in seconds. No manual data entry, no complicated setup required.",
      gradient: "from-purple-500 to-pink-400",
    },
    {
      icon: Smartphone,
      title: "Mobile Responsive",
      description: "Your portfolio looks stunning on all devices. Automatically optimized for desktop, tablet, and mobile.",
      gradient: "from-cyan-400 to-blue-500",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is processed securely and never stored. We respect your privacy and protect your information.",
      gradient: "from-green-400 to-emerald-500",
    },
  ];

  return (
    <section className="min-h-screen px-6 py-20 bg-gradient-to-b from-white via-slate-50 to-white dark:from-black dark:via-slate-950 dark:to-black">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-slate-50 px-4">
            Why Choose Our Platform
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto px-4">
            Everything you need to create a professional portfolio in minutes
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative">
                  {/* Glow effect */}
                  <div className={`absolute inset-0 scale-[0.80] rounded-2xl bg-gradient-to-r ${feature.gradient} blur-3xl opacity-50`} />
                  
                  <Card className="relative group h-full bg-slate-900/90 dark:bg-slate-900/90 backdrop-blur-xl border-slate-800 dark:border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:scale-[1.02] p-8 space-y-4 overflow-hidden">
                    {/* Icon */}
                    <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5 z-10`}>
                      <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                        <Icon className="w-7 h-7 text-slate-50" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2 relative z-10">
                      <h3 className="text-xl text-slate-50 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Hover effect gradient */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${feature.gradient} rounded-lg transition-opacity duration-300 pointer-events-none`} />
                    
                    {/* Meteors */}
                    <Meteors count={15} />
                  </Card>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional features list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8"
        >
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 backdrop-blur-xl border-slate-700/50 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl text-slate-50">
                  Everything You Need
                </h3>
                <div className="space-y-4">
                  {[
                    "Multiple professional templates",
                    "Custom color schemes",
                    "SEO optimized output",
                    "Export to multiple formats",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl text-slate-50">
                  Built for Professionals
                </h3>
                <div className="space-y-4">
                  {[
                    "Real-time preview",
                    "Download source code",
                    "Social media integration",
                    "Analytics ready",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

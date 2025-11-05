import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { NeuralBackground } from "./NeuralBackground";

export function HeroSection({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black dark:bg-black bg-white">
      {/* Neural Background */}
      <NeuralBackground hue={220} saturation={0.8} chroma={0.7} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 dark:bg-slate-800/50 bg-white/50 backdrop-blur-sm border border-slate-300 dark:border-slate-700/50"
          >
            <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <span className="text-slate-700 dark:text-slate-300">No Coding Required - Beautiful Portfolios</span>
          </motion.div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-slate-900 dark:text-slate-50 px-4">
            Transform Your CV Into a{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Stunning Portfolio
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed px-4">
            Upload your resume and watch as AI instantly creates a beautiful, professional portfolio website. No coding required.
          </p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="pt-4"
          >
            <Button
              onClick={onGetStarted}
              size="lg"
              className="relative group px-8 py-6 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 border-0"
            >
              <span className="relative z-10">Get Started - It's Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md" />
            </Button>
          </motion.div>

          {/* Social proof or trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex items-center justify-center gap-4 sm:gap-8 pt-8 text-sm sm:text-base text-slate-600 dark:text-slate-500 flex-wrap px-4"
          >
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Ready in seconds</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Professional templates</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-slate-400 dark:border-slate-700 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-slate-600 dark:bg-slate-500 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

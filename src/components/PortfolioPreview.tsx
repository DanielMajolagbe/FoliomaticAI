import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ExternalLink, Code, Palette } from "lucide-react";
import { motion } from "motion/react";

export function PortfolioPreview() {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  return (
    <section className="min-h-screen px-6 py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-black">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30 text-blue-300">
            Portfolio Ready
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-slate-50 px-4">
            Your New Portfolio
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto px-4">
            Compare your original CV with the generated portfolio
          </p>
        </motion.div>

        {/* Split screen preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Original CV */}
          <Card className="group overflow-hidden bg-slate-800/30 backdrop-blur-xl border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl text-slate-50">Original CV</h3>
                <Badge variant="outline" className="bg-slate-800/50 border-slate-700/50 text-slate-400">
                  PDF
                </Badge>
              </div>

              {/* Mock CV preview */}
              <div className="aspect-[8.5/11] bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-slate-700/50 p-8 space-y-4 overflow-hidden">
                <div className="space-y-2">
                  <div className="h-6 bg-slate-700/50 rounded w-2/3" />
                  <div className="h-4 bg-slate-700/30 rounded w-1/2" />
                </div>

                <div className="space-y-2 pt-4">
                  <div className="h-3 bg-slate-700/30 rounded w-full" />
                  <div className="h-3 bg-slate-700/30 rounded w-full" />
                  <div className="h-3 bg-slate-700/30 rounded w-4/5" />
                </div>

                <div className="space-y-2 pt-4">
                  <div className="h-4 bg-slate-700/50 rounded w-1/3" />
                  <div className="h-3 bg-slate-700/30 rounded w-full" />
                  <div className="h-3 bg-slate-700/30 rounded w-full" />
                </div>

                <div className="space-y-2 pt-4">
                  <div className="h-4 bg-slate-700/50 rounded w-1/3" />
                  <div className="h-3 bg-slate-700/30 rounded w-5/6" />
                  <div className="h-3 bg-slate-700/30 rounded w-4/5" />
                </div>
              </div>
            </div>
          </Card>

          {/* Generated Portfolio */}
          <Card className="group overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-800/30 backdrop-blur-xl border-2 border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl text-slate-50 flex items-center gap-2">
                  Generated Portfolio
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-500">
                    New
                  </Badge>
                </h3>
                <Badge variant="outline" className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-purple-500/30 text-purple-300">
                  Live
                </Badge>
              </div>

              {/* Mock Portfolio preview */}
              <div className="aspect-[8.5/11] bg-gradient-to-br from-slate-950 via-blue-950/20 to-purple-950/20 rounded-lg border border-purple-500/30 p-8 space-y-4 overflow-hidden relative">
                {/* Hero section mock */}
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto" />
                  <div className="h-5 bg-gradient-to-r from-blue-500/50 to-purple-500/50 rounded w-1/2 mx-auto" />
                  <div className="h-3 bg-slate-700/30 rounded w-2/3 mx-auto" />
                </div>

                {/* Content sections mock */}
                <div className="space-y-3 pt-4">
                  <div className="flex gap-2">
                    <div className="h-8 w-8 bg-blue-500/30 rounded" />
                    <div className="flex-1 space-y-1">
                      <div className="h-3 bg-slate-700/40 rounded w-1/3" />
                      <div className="h-2 bg-slate-700/30 rounded w-full" />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="h-8 w-8 bg-purple-500/30 rounded" />
                    <div className="flex-1 space-y-1">
                      <div className="h-3 bg-slate-700/40 rounded w-1/3" />
                      <div className="h-2 bg-slate-700/30 rounded w-full" />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <div className="h-8 w-8 bg-cyan-400/30 rounded" />
                    <div className="flex-1 space-y-1">
                      <div className="h-3 bg-slate-700/40 rounded w-1/3" />
                      <div className="h-2 bg-slate-700/30 rounded w-full" />
                    </div>
                  </div>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent pointer-events-none" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <Button
            size="lg"
            variant="outline"
            className="bg-slate-800/50 border-slate-700 hover:bg-slate-700 hover:border-slate-600"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View Live Preview
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="bg-slate-800/50 border-slate-700 hover:bg-slate-700 hover:border-slate-600"
          >
            <Palette className="w-4 h-4 mr-2" />
            Customize Design
          </Button>
        </motion.div>

        {/* Additional features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 pt-8"
        >
          <Card className="bg-slate-800/30 backdrop-blur-xl border-slate-700/50 p-6 space-y-3">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Code className="w-6 h-6 text-blue-400" />
            </div>
            <h4 className="text-slate-50">Clean Code</h4>
            <p className="text-slate-400">Export production-ready HTML, CSS, and JavaScript</p>
          </Card>

          <Card className="bg-slate-800/30 backdrop-blur-xl border-slate-700/50 p-6 space-y-3">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Palette className="w-6 h-6 text-purple-400" />
            </div>
            <h4 className="text-slate-50">Customizable</h4>
            <p className="text-slate-400">Choose from multiple themes and color schemes</p>
          </Card>

          <Card className="bg-slate-800/30 backdrop-blur-xl border-slate-700/50 p-6 space-y-3">
            <div className="w-12 h-12 bg-cyan-400/20 rounded-lg flex items-center justify-center">
              <ExternalLink className="w-6 h-6 text-cyan-400" />
            </div>
            <h4 className="text-slate-50">One-Click Deploy</h4>
            <p className="text-slate-400">Deploy instantly to popular hosting platforms</p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

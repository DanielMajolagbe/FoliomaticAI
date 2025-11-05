import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Alert } from "./ui/alert";
import { Badge } from "./ui/badge";
import { Upload, FileText, Check } from "lucide-react";
import { motion } from "motion/react";

interface UploadSectionProps {
  onUploadComplete: () => void;
}

export function UploadSection({ onUploadComplete }: UploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const processFile = (file: File) => {
    setFileName(file.name);
    setIsProcessing(true);
    setProgress(0);

    // Simulate file processing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setIsSuccess(true);
          setTimeout(() => {
            onUploadComplete();
          }, 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <section id="upload" className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-b from-white to-slate-50 dark:from-black dark:to-slate-950">
      <div className="max-w-4xl w-full space-y-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-slate-50 px-4">
            Upload Your CV
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Drag and drop your resume or click to browse
          </p>
        </motion.div>

        {/* Upload card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card
            className={`relative overflow-hidden bg-white/80 dark:bg-slate-800/30 backdrop-blur-xl border-2 transition-all duration-300 ${
              isDragging
                ? "border-blue-500 shadow-lg shadow-blue-500/20 scale-[1.02]"
                : "border-slate-300 dark:border-slate-700/50 hover:border-slate-400 dark:hover:border-slate-600"
            }`}
          >
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleClick}
              className="p-12 md:p-20 text-center cursor-pointer"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileSelect}
                className="hidden"
              />

              {!isProcessing && !isSuccess && (
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <div className="p-6 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700/50">
                      <Upload className="w-12 h-12 text-blue-500 dark:text-blue-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl text-slate-900 dark:text-slate-50">
                      Drop your CV here
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">or click to browse files</p>
                  </div>

                  <div className="flex items-center justify-center gap-4">
                    <Badge variant="outline" className="bg-slate-100 dark:bg-slate-800/50 border-slate-300 dark:border-slate-700/50 text-slate-700 dark:text-slate-300">
                      <FileText className="w-3 h-3 mr-1" />
                      PDF
                    </Badge>
                    <Badge variant="outline" className="bg-slate-100 dark:bg-slate-800/50 border-slate-300 dark:border-slate-700/50 text-slate-700 dark:text-slate-300">
                      <FileText className="w-3 h-3 mr-1" />
                      DOCX
                    </Badge>
                  </div>

                  <Button
                    size="lg"
                    className="mt-4 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-slate-50"
                  >
                    Browse Files
                  </Button>
                </div>
              )}

              {isProcessing && (
                <div className="space-y-6">
                  <div className="flex justify-center">
                    <div className="p-6 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700/50 animate-pulse">
                      <FileText className="w-12 h-12 text-purple-500 dark:text-purple-400" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl text-slate-900 dark:text-slate-50">
                      Processing {fileName}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">Analyzing your CV and generating portfolio...</p>
                    <div className="max-w-md mx-auto">
                      <Progress value={progress} className="h-2" />
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-500">{progress}%</p>
                  </div>
                </div>
              )}

              {isSuccess && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div className="flex justify-center">
                    <div className="p-6 rounded-full bg-green-500/20 border border-green-500/50">
                      <Check className="w-12 h-12 text-green-500 dark:text-green-400" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl text-slate-900 dark:text-slate-50">
                      Success!
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">Your portfolio is ready</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Animated border gradient */}
            {isDragging && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 opacity-20 animate-pulse" />
              </div>
            )}
          </Card>
        </motion.div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Alert className="bg-white/80 dark:bg-slate-800/30 backdrop-blur-xl border-slate-300 dark:border-slate-700/50">
            <Sparkles className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
            <div className="ml-2 text-slate-700 dark:text-slate-300">
              <span>Your data is secure. We process your CV locally and never store personal information.</span>
            </div>
          </Alert>
        </motion.div>
      </div>
    </section>
  );
}

function Sparkles(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}

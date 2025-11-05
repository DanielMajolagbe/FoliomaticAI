import { HaloSearch } from "./HaloSearch";
import { toast } from "sonner@2.0.3";
import { motion } from "motion/react";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { useState } from "react";

export function WaitlistSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWaitlistSubmit = async (email: string) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-11b0a9ff/waitlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error("Oops!", {
          description: data.error || "Failed to join waitlist. Please try again.",
        });
        return;
      }

      toast.success("You're on the list! 🎉", {
        description: "Check your email for confirmation. We'll notify you when our beta is ready!",
      });
    } catch (error) {
      console.error("Waitlist submission error:", error);
      toast.error("Connection error", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-[500px] flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-b from-slate-100 to-white dark:from-black dark:to-slate-950 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl animate-float" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-slate-900 dark:text-slate-50 mb-4 px-4">
            Join the Waitlist
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-8 px-4">
            Be the first to know when we launch new features and templates
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <HaloSearch
            placeholder="Enter your email..."
            onSubmit={handleWaitlistSubmit}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm text-slate-500 dark:text-slate-500"
        >
          Join 1,000+ professionals already on the waitlist
        </motion.p>
      </div>
    </section>
  );
}

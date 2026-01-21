import React from 'react';
import { motion } from 'framer-motion';
import { Search, Users, TrendingDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorksSection = () => {
  const { t } = useLanguage();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  return (
    <section id="how-it-works" className="section-full snap-section relative flex flex-col min-h-screen bg-gradient-to-br from-background to-slate-50 dark:from-background dark:to-slate-900">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-36 h-36 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-44 h-44 bg-secondary/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col justify-center section-padding">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12 lg:mb-20">
            <motion.h2 
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-primary"
            >
              {t('index.howItWorksTitle')}
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto"
            >
              {t('index.howItWorksSubtitle')}
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1 */}
            <motion.div variants={itemVariants} className="text-center group">
              <div className="relative mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-200 group-hover:scale-105 transition-all duration-300 border border-blue-200/50 shadow-lg">
                  <Search className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-600" aria-label="Søkeikon for steg 1" />
                </div>
                {/* Connection line */}
                <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent transform -translate-y-1/2"></div>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-foreground">
                {t('index.howItWorks.step1.title')}
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t('index.howItWorks.step1.desc')}
              </p>
            </motion.div>
            
            {/* Step 2 */}
            <motion.div variants={itemVariants} className="text-center group">
              <div className="relative mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-200 group-hover:scale-105 transition-all duration-300 border border-blue-200/50 shadow-lg">
                  <Users className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-600" aria-label="Brukerikon for steg 2" />
                </div>
                {/* Connection line */}
                <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-secondary/30 to-transparent transform -translate-y-1/2"></div>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-foreground">
                {t('index.howItWorks.step2.title')}
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t('index.howItWorks.step2.desc')}
              </p>
            </motion.div>
            
            {/* Step 3 */}
            <motion.div variants={itemVariants} className="text-center group">
              <div className="relative mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-200 group-hover:scale-105 transition-all duration-300 border border-blue-200/50 shadow-lg">
                  <TrendingDown className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-600" aria-label="Besparingsikon for steg 3" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-foreground">
                {t('index.howItWorks.step3.title')}
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t('index.howItWorks.step3.desc')}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
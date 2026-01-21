import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search, Users, TrendingDown } from "lucide-react";
import Header from "@/components/Header";
import QuoteForm from "@/components/QuoteForm";
import HeroSection from "@/components/HeroSection";
import CategoryCard from "@/components/CategoryCard";
import ProviderCarousel from "@/components/ProviderCarousel";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import StickyCallToAction from "@/components/StickyCallToAction";
import HeroFlagAnimation from "@/components/HeroFlagAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

// Category icons
import { Zap, Smartphone, Shield, Wifi, CreditCard, Home, Tv, Wrench, Sparkles, Thermometer } from "lucide-react";

const Index = () => {
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Simple CSS scroll-snap implementation - no complex JS needed


  const handleCategoryClick = (categorySlug: string) => {
    if (categorySlug === 'quote') {
      setShowQuoteForm(true);
    } else {
      navigate(`/${categorySlug}`);
    }
  };

  const handleProviderClick = (provider: any) => {
    navigate(`/category/${provider.kategori}`);
  };

  const handleMeldPaClick = () => {
    setShowQuoteForm(true);
  };

  const handleGetStarted = () => {
    console.log('handleGetStarted called - opening quote form');
    setShowQuoteForm(true);
  };

  const handleLoginClick = () => {
    // Add login functionality here
    console.log('Login clicked');
  };

  const handleMobileMenuToggle = (isOpen: boolean) => {
    setIsMobileMenuOpen(isOpen);
  };

  // Categories data
  const categories = [
    {
      title: "index.categories.electricity",
      slug: "strom",
      description: "categories.strom.description",
      icon: Zap,
      color: "category-yellow"
    },
    {
      title: "index.categories.mobile",
      slug: "mobil",
      description: "categories.mobil.description",
      icon: Smartphone,
      color: "category-blue"
    },
    {
      title: "index.categories.insurance",
      slug: "forsikring",
      description: "categories.forsikring.description",
      icon: Shield,
      color: "category-green"
    },
    {
      title: "index.categories.internet",
      slug: "internett",
      description: "categories.internett.description",
      icon: Wifi,
      color: "category-purple"
    },
    {
      title: "index.categories.loan",
      slug: "lan",
      description: "categories.lan.description",
      icon: CreditCard,
      color: "category-indigo"
    },
    {
      title: "index.categories.homeAlarm",
      slug: "boligalarm",
      description: "categories.boligalarm.description",
      icon: Home,
      color: "category-red"
    },
    {
      title: "index.categories.tvPackages",
      slug: "tv-pakker",
      description: "categories.tvPakker.description",
      icon: Tv,
      color: "category-orange"
    },
    {
      title: "index.categories.handymen",
      slug: "handverkere",
      description: "categories.handverkere.description",
      icon: Wrench,
      color: "category-amber"
    },
    {
      title: "index.categories.cleaning",
      slug: "renhold",
      description: "categories.renhold.description",
      icon: Sparkles,
      color: "category-cyan"
    },
    {
      title: "index.categories.heatPump",
      slug: "varmepumpe",
      description: "categories.varmepumpe.description",
      icon: Thermometer,
      color: "category-orange"
    }
  ];

  return (
    <div className="scroll-snap-container">
      <Header
        onMeldPaClick={handleMeldPaClick}
        onMobileMenuToggle={handleMobileMenuToggle}
        isMobileMenuOpen={isMobileMenuOpen}
        onLoginClick={handleLoginClick}
      />
      
      {/* Section 1: Hero with Categories */}
      <section id="hero" className="section-full snap-section relative flex flex-col min-h-screen">
        {/* Background with animated orbs */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-secondary/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        {/* Hero Flag Animation - anchored to bottom of this section */}
        <HeroFlagAnimation />
        
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center section-padding pt-24">
          {/* Main heading - Mobile-first responsive with animation */}
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 text-balance leading-tight text-primary"
          >
            {t('index.title')}
          </motion.h1>
          
          {/* Subtitle - Mobile-first responsive with animation */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-6 sm:mb-8 md:mb-12 lg:mb-16 max-w-4xl text-balance px-2"
          >
            {t('index.subtitle')}
          </motion.p>
          
          {/* Categories Grid - Improved mobile scaling with staggered animation */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4 md:gap-6 w-full max-w-6xl mb-6 sm:mb-8 md:mb-12 lg:mb-16"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.6 + (index * 0.1),
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <CategoryCard
                  title={category.title}
                  description={category.description}
                  icon={<category.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />}
                  color={category.color}
                  onClick={() => handleCategoryClick(category.slug)}
                  className="h-20 xs:h-22 sm:h-24 md:h-28 lg:h-32 xl:h-36"
                />
              </motion.div>
            ))}
          </motion.div>
          
          
          {/* Scroll indicator - Responsive with animation */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="animate-bounce"
          >
            <ChevronDown className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-muted-foreground" />
          </motion.div>
        </div>
      </section>

      {/* Section 2: Hero Content and Provider Carousel */}
      <section id="providers" className="section-full snap-section relative flex flex-col min-h-screen">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-background to-primary/5 overflow-hidden">
          <div className="absolute top-10 right-20 w-40 h-40 bg-secondary/10 rounded-full blur-xl animate-pulse delay-700"></div>
          <div className="absolute bottom-10 left-20 w-56 h-56 bg-primary/10 rounded-full blur-xl animate-pulse delay-300"></div>
        </div>
        
        <div className="relative z-10 flex-1 flex flex-col justify-center section-padding">
          <HeroSection 
            onGetStarted={handleGetStarted}
            isMobileMenuOpen={isMobileMenuOpen}
          />
          <div className="mt-6 sm:mt-8 md:mt-12 lg:mt-16">
            <ProviderCarousel onProviderClick={handleProviderClick} />
          </div>
        </div>
      </section>

      {/* Section 3: How it works */}
      <HowItWorksSection />

      {/* Section 4: Testimonials (Last snap section before natural footer scrolling) */}
      <div className="testimonials-section">
        <TestimonialsSection />
      </div>

      {/* Footer section - No scroll-snap, natural scrolling */}
      <Footer />
    
      {/* Sticky CTA for mobile */}
      <StickyCallToAction onGetStarted={handleGetStarted} />

      {showQuoteForm && (
        <QuoteForm isOpen={showQuoteForm} onClose={() => setShowQuoteForm(false)} />
      )}
    </div>
  );
};

export default Index;
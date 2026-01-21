import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Shield, Clock, Check, Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const TestimonialsSection = () => {
  const { t } = useLanguage();
  
  const testimonials = [
    {
      name: t('index.testimonials.customer1.name'),
      location: t('index.testimonials.customer1.location'),
      savings: "4,200",
      service: t('index.testimonials.customer1.service'),
      quote: t('index.testimonials.customer1.quote'),
      rating: 5
    },
    {
      name: t('index.testimonials.customer2.name'),
      location: t('index.testimonials.customer2.location'),
      savings: "2,800",
      service: t('index.testimonials.customer2.service'),
      quote: t('index.testimonials.customer2.quote'),
      rating: 5
    },
    {
      name: t('index.testimonials.customer3.name'),
      location: t('index.testimonials.customer3.location'),
      savings: "3,500",
      service: t('index.testimonials.customer3.service'),
      quote: t('index.testimonials.customer3.quote'),
      rating: 5
    }
  ];

  const trustFeatures = [
    {
      icon: Shield,
      title: t('index.trust.gdpr.title'),
      description: t('index.trust.gdpr.description')
    },
    {
      icon: Clock,
      title: t('index.trust.nobinding.title'),
      description: t('index.trust.nobinding.description')
    },
    {
      icon: Check,
      title: t('index.trust.free.title'),
      description: t('index.trust.free.description')
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
    <section id="testimonials" className="section-full snap-section relative flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-background dark:from-slate-900 dark:to-background">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-20 w-40 h-40 bg-primary/5 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute bottom-10 left-20 w-56 h-56 bg-secondary/5 rounded-full blur-xl animate-pulse delay-300"></div>
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col justify-center section-padding">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold text-sm mb-6"
            >
              <Star className="w-4 h-4 mr-2" />
              {t('index.testimonials.customerCount')}
            </motion.div>
            
            <motion.h2 
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-primary"
            >
              {t('index.testimonials.title')}
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto"
            >
              {t('index.testimonials.subtitle')}
            </motion.p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full glass-card hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary/20 relative">
                  <CardContent className="p-6">
                    {/* Quote icon in corner */}
                    <Quote className="absolute top-4 right-4 w-6 h-6 text-primary/30" />
                    
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    
                    <blockquote className="text-foreground font-medium mb-6 text-base leading-relaxed relative">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <p className="font-semibold text-foreground">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                        </div>
                        <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                          {testimonial.service}
                        </Badge>
                      </div>
                      
                      <div className="text-center mb-4">
                        <span className="text-emerald-500 font-bold tracking-tight text-xl">
                          {testimonial.savings} kr
                        </span>
                        <p className="text-sm text-muted-foreground">{t('index.testimonials.yearSavings')}</p>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-2 text-xs hover:bg-primary/5"
                      >
                        {t('index.testimonials.shareExperience')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Trust Features */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {trustFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
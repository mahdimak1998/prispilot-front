import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Phone, X } from 'lucide-react';

interface StickyCallToActionProps {
  onGetStarted: () => void;
}

const StickyCallToAction: React.FC<StickyCallToActionProps> = ({ onGetStarted }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA when user scrolls past the hero section (approximately 100vh)
      const scrollPosition = window.scrollY;
      const shouldShow = scrollPosition > window.innerHeight * 0.8;
      
      setIsVisible(shouldShow && !isDismissed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-80"
        >
          <div className="bg-primary text-white rounded-xl p-4 shadow-2xl border border-primary-dark">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <span className="font-semibold text-sm">Få gratis pristilbud</span>
              </div>
              <button
                onClick={handleDismiss}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Lukk"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-sm text-white/90 mb-3">
              Ring oss nå eller fyll ut skjemaet - helt gratis!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={() => {
                  console.log('Få tilbud nå clicked!');
                  onGetStarted();
                }}
                variant="secondary"
                size="sm"
                className="flex-1 bg-white text-primary hover:bg-white/90 font-semibold"
              >
                Få tilbud nå
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-white text-white hover:bg-white/10 hover:text-white hover:border-white"
                asChild
              >
                <a href="tel:+4712345678">Ring +47 123 456 78</a>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCallToAction;
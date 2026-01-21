
import React from 'react';
import CategoryPageHeader from './CategoryPageHeader';

interface ErrorStateProps {
  categoryName: string;
  error: string;
  onBackClick: () => void;
  onMeldPaClick: () => void;
  onRetry: () => void;
}

const ErrorState = ({ categoryName, error, onBackClick, onMeldPaClick, onRetry }: ErrorStateProps) => {
  return (
    <div className="min-h-screen bg-background">
      <CategoryPageHeader 
        categoryName={categoryName}
        onBackClick={onBackClick}
        onMeldPaClick={onMeldPaClick}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-destructive mb-4">Det oppstod en feil</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <button
            onClick={onRetry}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Prøv på nytt
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;

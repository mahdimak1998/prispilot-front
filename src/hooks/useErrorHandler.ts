import { useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';

export interface ErrorInfo {
  message: string;
  code?: string;
  details?: any;
}

export const useErrorHandler = () => {
  const handleError = useCallback((error: unknown, fallbackMessage: string = 'En uventet feil oppstod') => {
    console.error('Error occurred:', error);
    
    let errorMessage = fallbackMessage;
    let errorCode: string | undefined;
    
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'object' && error !== null) {
      const errorObj = error as any;
      if (errorObj.message) {
        errorMessage = errorObj.message;
      }
      if (errorObj.code) {
        errorCode = errorObj.code;
      }
    }
    
    // Sanitize error message for display
    const sanitizedMessage = typeof errorMessage === 'string' 
      ? errorMessage.slice(0, 200) 
      : fallbackMessage;
    
    toast({
      title: "Feil",
      description: sanitizedMessage,
      variant: "destructive"
    });
    
    return {
      message: sanitizedMessage,
      code: errorCode,
      originalError: error
    };
  }, []);

  const handleAsyncError = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    fallbackMessage: string = 'En uventet feil oppstod'
  ): Promise<T | null> => {
    try {
      return await asyncFn();
    } catch (error) {
      handleError(error, fallbackMessage);
      return null;
    }
  }, [handleError]);

  return {
    handleError,
    handleAsyncError
  };
};
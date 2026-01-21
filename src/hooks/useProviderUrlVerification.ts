import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useProviderUrlVerification = () => {
  const verifyAndUpdateUrl = useCallback(async (
    providerName: string, 
    tableName: string, 
    recordId: string | number
  ): Promise<string | null> => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-provider-urls', {
        body: {
          providerName,
          tableName,
          recordId
        }
      });

      if (error) {
        console.error('Error verifying provider URL:', error);
        return null;
      }

      return data?.url || null;
    } catch (error) {
      console.error('Failed to verify provider URL:', error);
      return null;
    }
  }, []);

  return { verifyAndUpdateUrl };
};
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Provider URL mappings
const PROVIDER_URLS: Record<string, string> = {
  'telia': 'https://www.telia.no',
  'telenor': 'https://www.telenor.no',
  'ice': 'https://www.ice.no',
  'one call': 'https://www.onecall.no',
  'phonero': 'https://www.phonero.no',
  'lyca mobile': 'https://www.lycamobile.no',
  'chilimobil': 'https://www.chilimobil.no',
  'fjord mobil': 'https://www.fjordmobil.no',
  'altibox': 'https://www.altibox.no',
  'get': 'https://www.get.no',
  'nextgentel': 'https://www.nextgentel.no',
  'lyse': 'https://www.lyse.no',
  'hafslund': 'https://www.hafslund.no',
  'fjordkraft': 'https://www.fjordkraft.no',
  'tibber': 'https://www.tibber.com/no',
  'gudbrandsdal energi': 'https://www.ge.no',
  'sparebank 1': 'https://www.sparebank1.no',
  'dnb': 'https://www.dnb.no',
  'nordea': 'https://www.nordea.no',
  'handelsbanken': 'https://www.handelsbanken.no',
  'tryg': 'https://www.tryg.no',
  'if': 'https://www.if.no',
  'fremtind': 'https://www.fremtind.no',
  'gjensidige': 'https://www.gjensidige.no',
  'verisure': 'https://www.verisure.no',
  'sector alarm': 'https://www.sectoralarm.no',
  'g4s': 'https://www.g4s.no',
  'nuki': 'https://nuki.io/no',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { providerName, tableName, recordId } = await req.json();

    // Normalize provider name for lookup
    const normalizedProvider = providerName.toLowerCase().trim();
    let verifiedUrl = PROVIDER_URLS[normalizedProvider];

    // If not found in mapping, try to construct URL
    if (!verifiedUrl) {
      const cleanName = normalizedProvider
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '')
        .replace(/mobil|mobile/g, '')
        .replace(/energi|kraft/g, '');
      
      verifiedUrl = `https://www.${cleanName}.no`;
    }

    // Validate URL by checking if it exists
    let isValid = false;
    try {
      const response = await fetch(verifiedUrl, { 
        method: 'HEAD',
        signal: AbortSignal.timeout(5000)
      });
      isValid = response.ok;
    } catch (error) {
      console.log(`URL validation failed for ${verifiedUrl}:`, error.message);
      isValid = false;
    }

    // If validation fails, use fallback
    if (!isValid) {
      verifiedUrl = `https://www.google.com/search?q=${encodeURIComponent(providerName + ' Norge')}`;
    }

    // Update database with verified URL
    if (tableName && recordId) {
      const { error: updateError } = await supabaseClient
        .from(tableName)
        .update({ 
          url: verifiedUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', recordId);

      if (updateError) {
        console.error('Database update error:', updateError);
      }
    }

    console.log(`Verified URL for ${providerName}: ${verifiedUrl} (valid: ${isValid})`);

    return new Response(
      JSON.stringify({ 
        url: verifiedUrl, 
        isValid,
        provider: providerName
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in verify-provider-urls function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
-- Create customer review system for offers
CREATE TABLE public.offer_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  supplier_name text NOT NULL,
  offer_hash text NOT NULL,
  review_text text,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at timestamp with time zone DEFAULT now(),
  is_offer_active boolean DEFAULT true,
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.offer_reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for offer reviews
CREATE POLICY "Users can view all reviews" 
ON public.offer_reviews 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create their own reviews" 
ON public.offer_reviews 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews" 
ON public.offer_reviews 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews" 
ON public.offer_reviews 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_offer_reviews_updated_at
BEFORE UPDATE ON public.offer_reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_offer_reviews_supplier ON public.offer_reviews(supplier_name);
CREATE INDEX idx_offer_reviews_user ON public.offer_reviews(user_id);
CREATE INDEX idx_offer_reviews_hash ON public.offer_reviews(offer_hash);
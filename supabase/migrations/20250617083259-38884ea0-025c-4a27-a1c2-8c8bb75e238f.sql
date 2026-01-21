
-- Fix critical security issues by enabling RLS on public tables
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;

-- Fix the function security issue by setting search_path
CREATE OR REPLACE FUNCTION public.verify_admin_login(login_email text, login_password text)
RETURNS TABLE(id uuid, email text, name text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    admin_users.id,
    admin_users.email,
    admin_users.name
  FROM public.admin_users
  WHERE admin_users.email = login_email
    AND admin_users.password_hash = crypt(login_password, admin_users.password_hash);
END;
$$;

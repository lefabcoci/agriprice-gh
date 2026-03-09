
-- Drop restrictive SELECT policies and recreate as permissive
DROP POLICY IF EXISTS "Anyone can view crops" ON public.crops;
CREATE POLICY "Anyone can view crops" ON public.crops FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can view markets" ON public.markets;
CREATE POLICY "Anyone can view markets" ON public.markets FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can view prices" ON public.prices;
CREATE POLICY "Anyone can view prices" ON public.prices FOR SELECT USING (true);

-- Fix admin policies to be permissive too
DROP POLICY IF EXISTS "Admins can insert crops" ON public.crops;
CREATE POLICY "Admins can insert crops" ON public.crops FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update crops" ON public.crops;
CREATE POLICY "Admins can update crops" ON public.crops FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete crops" ON public.crops;
CREATE POLICY "Admins can delete crops" ON public.crops FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can insert markets" ON public.markets;
CREATE POLICY "Admins can insert markets" ON public.markets FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update markets" ON public.markets;
CREATE POLICY "Admins can update markets" ON public.markets FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete markets" ON public.markets;
CREATE POLICY "Admins can delete markets" ON public.markets FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can insert prices" ON public.prices;
CREATE POLICY "Admins can insert prices" ON public.prices FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update prices" ON public.prices;
CREATE POLICY "Admins can update prices" ON public.prices FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete prices" ON public.prices;
CREATE POLICY "Admins can delete prices" ON public.prices FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can insert roles" ON public.user_roles;
CREATE POLICY "Admins can insert roles" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update roles" ON public.user_roles;
CREATE POLICY "Admins can update roles" ON public.user_roles FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;
CREATE POLICY "Admins can delete roles" ON public.user_roles FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

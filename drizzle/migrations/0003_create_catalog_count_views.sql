CREATE OR REPLACE VIEW public.category_counts AS
  SELECT category, count(*)::int AS count FROM public.products WHERE is_active GROUP BY category;

CREATE OR REPLACE VIEW public.brand_counts AS
  SELECT brand, count(*)::int AS count FROM public.products WHERE is_active GROUP BY brand;

GRANT SELECT ON public.category_counts TO anon;
GRANT SELECT ON public.category_counts TO authenticated;
GRANT SELECT ON public.brand_counts TO anon;
GRANT SELECT ON public.brand_counts TO authenticated;
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_sheet text NOT NULL,
  source_row integer NOT NULL DEFAULT 1,
  section text NOT NULL,
  category text NOT NULL,
  subcategory text,
  brand text NOT NULL,
  model text,
  name text NOT NULL,
  description text,
  price numeric(12,2) NOT NULL DEFAULT 0,
  old_price numeric(12,2),
  image_url text,
  images jsonb NOT NULL DEFAULT '[]'::jsonb,
  sku text,
  is_active boolean NOT NULL DEFAULT true,
  available boolean NOT NULL DEFAULT true,
  tags text,
  source_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (source_sheet, source_row)
);

CREATE INDEX products_category_idx ON public.products (category);
CREATE INDEX products_brand_idx ON public.products (brand);
CREATE INDEX products_section_idx ON public.products (section);
CREATE INDEX products_price_idx ON public.products (price);

GRANT SELECT ON public.products TO anon;
GRANT SELECT ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read products" ON public.products
  FOR SELECT TO anon, authenticated
  USING (true);
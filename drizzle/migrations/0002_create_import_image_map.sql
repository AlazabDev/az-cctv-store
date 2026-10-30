CREATE TABLE public.import_image_map (source_sheet text PRIMARY KEY, new_images jsonb NOT NULL);
GRANT ALL ON public.import_image_map TO service_role;
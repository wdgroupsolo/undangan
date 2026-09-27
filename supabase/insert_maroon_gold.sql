-- Tambah Tema Maroon Gold ke Database Supabase
-- Buka Supabase Dashboard -> SQL Editor -> Tempel & Klik 'RUN'

INSERT INTO themes (
  id,
  name,
  slug,
  description,
  category,
  preview_image,
  thumbnail,
  status,
  features,
  theme_config
) VALUES (
  'd2e3f4a5-6789-4123-8567-89abcdef0123',
  'Maroon Gold',
  'maroon-gold',
  'Tema klasik mewah bernuansa merah marun & emas kerajaan, bingkai oval vintage, video entrance gerbang istana, dan pemandangan alam romantis.',
  'Royal & Classic',
  '/themes/maroon-gold-theme-preview.png',
  '/themes/maroon-gold-theme-preview.png',
  'active',
  '["cover", "couple", "countdown", "events", "gallery", "story", "rsvp", "guestbook", "gift", "music"]'::jsonb,
  '{"primaryColor": "#8a333c", "secondaryColor": "#c4a46a", "style": "royal-classic", "entranceVideo": "/maroon-gate-entrance.mp4", "backgroundEnd": "/maroon-gate-end.jpg"}'::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  preview_image = EXCLUDED.preview_image,
  thumbnail = EXCLUDED.thumbnail,
  status = EXCLUDED.status,
  features = EXCLUDED.features,
  theme_config = EXCLUDED.theme_config;

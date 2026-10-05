-- Tambah Tema Royal Wayang Gold ke Database Supabase
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
  'f4a5b6c7-8901-4345-a789-0bcdef012345',
  'Royal Wayang Gold',
  'royal-wayang-gold',
  'Tema pernikahan agung bernuansa Keraton Jawa & Pendopo Joglo malam hari, diperkaya siluet wayang Kamajaya & Kamaratih berlapis emas, ornamen floral klasik, serta alunan sakral khas Nusantara.',
  'Traditional & Heritage',
  '/themes/royal-wayang-theme-preview.png',
  '/themes/royal-wayang-theme-preview.png',
  'active',
  '["cover", "couple", "countdown", "events", "gallery", "story", "rsvp", "guestbook", "gift", "music"]'::jsonb,
  '{"primaryColor": "#d4af37", "secondaryColor": "#1c150c", "style": "royal-wayang", "backgroundImage": "/themes/royal-wayang-bg.jpg", "desktopBackground": "/themes/royal-wayang-bg.jpg"}'::jsonb
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

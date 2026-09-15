-- 10 Tema Undangan Pernikahan WD Group
-- Jalankan di Supabase SQL Editor

INSERT INTO themes (name, slug, description, category, status, features, theme_config) VALUES

-- 1. Elegant Gold
('Elegant Gold', 'elegant-gold', 
 'Tema mewah dengan sentuhan warna emas dan ornamen klasik. Cocok untuk pernikahan formal dan elegan.',
 'Elegant', 'active',
 '["cover", "couple", "countdown", "events", "gallery", "story", "rsvp", "guestbook", "gift", "music"]',
 '{"primaryColor": "#B8860B", "secondaryColor": "#1a1a2e", "fontFamily": "Playfair Display", "accentColor": "#D4AF37", "backgroundType": "gradient", "style": "classic"}'
),

-- 2. Rustic Garden
('Rustic Garden', 'rustic-garden',
 'Tema bernuansa alam dengan elemen kayu, bunga wildflower, dan warna earth-tone yang hangat.',
 'Rustic', 'active',
 '["cover", "couple", "countdown", "events", "gallery", "story", "rsvp", "guestbook", "gift", "music"]',
 '{"primaryColor": "#8B4513", "secondaryColor": "#2d5016", "fontFamily": "Lora", "accentColor": "#D2B48C", "backgroundType": "texture", "style": "rustic"}'
),

-- 3. Minimalist White
('Minimalist White', 'minimalist-white',
 'Desain bersih dan modern dengan dominasi warna putih, tipografi sans-serif, dan layout yang simpel.',
 'Minimalist', 'active',
 '["cover", "couple", "countdown", "events", "gallery", "rsvp", "guestbook", "gift", "music"]',
 '{"primaryColor": "#333333", "secondaryColor": "#f5f5f5", "fontFamily": "Inter", "accentColor": "#999999", "backgroundType": "solid", "style": "modern"}'
),

-- 4. Floral Romance
('Floral Romance', 'floral-romance',
 'Tema romantis dengan ilustrasi bunga watercolor pink dan peach. Sempurna untuk nuansa feminin dan lembut.',
 'Floral', 'active',
 '["cover", "couple", "countdown", "events", "gallery", "story", "rsvp", "guestbook", "gift", "music"]',
 '{"primaryColor": "#DB7093", "secondaryColor": "#FFF0F5", "fontFamily": "Great Vibes", "accentColor": "#FFB6C1", "backgroundType": "pattern", "style": "romantic"}'
),

-- 5. Islamic Green
('Islamic Green', 'islamic-green',
 'Tema Islami elegan dengan ornamen geometris khas Arab, kaligrafi, dan nuansa hijau zamrud yang khidmat.',
 'Islamic', 'active',
 '["cover", "couple", "countdown", "events", "gallery", "story", "rsvp", "guestbook", "gift", "music", "quran_verse"]',
 '{"primaryColor": "#006400", "secondaryColor": "#F5F5DC", "fontFamily": "Amiri", "accentColor": "#DAA520", "backgroundType": "pattern", "style": "islamic"}'
),

-- 6. Navy Luxury
('Navy Luxury', 'navy-luxury',
 'Tema premium dengan warna navy blue yang tegas dikombinasikan aksen emas. Kesan mewah dan profesional.',
 'Luxury', 'active',
 '["cover", "couple", "countdown", "events", "gallery", "story", "rsvp", "guestbook", "gift", "music"]',
 '{"primaryColor": "#000080", "secondaryColor": "#0a0a2a", "fontFamily": "Cormorant Garamond", "accentColor": "#FFD700", "backgroundType": "gradient", "style": "luxury"}'
),

-- 7. Javanese Traditional
('Javanese Traditional', 'javanese-traditional',
 'Tema adat Jawa dengan motif batik, ornamen wayang, dan warna cokelat keemasan yang khas budaya nusantara.',
 'Traditional', 'active',
 '["cover", "couple", "countdown", "events", "gallery", "story", "rsvp", "guestbook", "gift", "music"]',
 '{"primaryColor": "#8B6914", "secondaryColor": "#3E2723", "fontFamily": "Cinzel", "accentColor": "#CD853F", "backgroundType": "texture", "style": "traditional"}'
),

-- 8. Sakura Blossom
('Sakura Blossom', 'sakura-blossom',
 'Tema bernuansa Jepang dengan ilustrasi bunga sakura, warna pastel pink lembut, dan estetika yang menenangkan.',
 'Floral', 'active',
 '["cover", "couple", "countdown", "events", "gallery", "story", "rsvp", "guestbook", "gift", "music"]',
 '{"primaryColor": "#C71585", "secondaryColor": "#FFF5EE", "fontFamily": "Noto Serif", "accentColor": "#FFB7C5", "backgroundType": "illustration", "style": "japanese"}'
),

-- 9. Modern Dark
('Modern Dark', 'modern-dark',
 'Tema dark mode yang bold dan kontemporer. Tipografi besar, animasi halus, dan kesan yang sangat modern.',
 'Modern', 'active',
 '["cover", "couple", "countdown", "events", "gallery", "story", "rsvp", "guestbook", "gift", "music"]',
 '{"primaryColor": "#E0E0E0", "secondaryColor": "#121212", "fontFamily": "Montserrat", "accentColor": "#BB86FC", "backgroundType": "solid", "style": "dark"}'
),

-- 10. Tropical Paradise
('Tropical Paradise', 'tropical-paradise',
 'Tema ceria dengan ilustrasi daun tropis, bunga plumeria, dan warna hijau segar. Cocok untuk outdoor wedding.',
 'Nature', 'active',
 '["cover", "couple", "countdown", "events", "gallery", "story", "rsvp", "guestbook", "gift", "music"]',
 '{"primaryColor": "#228B22", "secondaryColor": "#FFFDE7", "fontFamily": "Josefin Sans", "accentColor": "#FF6347", "backgroundType": "illustration", "style": "tropical"}'
);

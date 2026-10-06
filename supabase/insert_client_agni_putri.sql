-- =========================================================================
-- Tambah Klien & Undangan Digital: AGNI & PUTRI
-- Tema: Royal Wayang Gold (Hitam & Emas)
-- Tanggal: 25 Oktober 2026
-- Buka Supabase Dashboard -> SQL Editor -> Tempel Script ini & Klik 'RUN'
-- =========================================================================

DO $$
DECLARE
  v_client_id UUID := 'c1000000-0000-0000-0000-000000000001';
  v_theme_id UUID := 'f4a5b6c7-8901-4345-a789-0bcdef012345';
  v_invitation_id UUID := 'e2000000-0000-0000-0000-000000000002';
BEGIN
  -- 1. Insert or Update Client
  INSERT INTO clients (
    id,
    name,
    phone,
    email,
    address,
    notes,
    status
  ) VALUES (
    v_client_id,
    'AGNI KAHURIPAN',
    '0895 3401 92500',
    'agnikahuripan@gmail.com',
    'Dk. Talang, Lemah Putih, RT 05, RW 01, Selotinatah, Ngariboyo, Magetan, Jawa Timur',
    'Konsep Hitam & Emas (Royal Wayang Gold). Akad & Resepsi: Minggu, 25 Oktober 2026. Hiburan: Siang Campursari & Malam Wayang Kulit. Rek BRI 6361 0100 2988 509 a.n. AGNI KAHURIPAN',
    'active'
  )
  ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    phone = EXCLUDED.phone,
    email = EXCLUDED.email,
    address = EXCLUDED.address,
    notes = EXCLUDED.notes,
    status = EXCLUDED.status;

  -- 2. Insert or Update Invitation
  INSERT INTO invitations (
    id,
    client_id,
    theme_id,
    title,
    slug,
    status,
    wedding_date,
    settings
  ) VALUES (
    v_invitation_id,
    v_client_id,
    v_theme_id,
    'The Wedding of Agni & Putri',
    'agni-putri',
    'published',
    '2026-10-25T09:00:00+07:00'::timestamptz,
    jsonb_build_object(
      'theme_slug', 'royal-wayang-gold',
      'default_guest_name', 'Tamu Undangan',
      'cover_title', 'AGNI & PUTRI',
      'cover_photo', '/themes/royal-couple-showcase.jpg',
      'groom_instagram', '@agnikahuripan',
      'bride_instagram', '@_putrikahuripan',
      'gift_recipient', 'AGNI KAHURIPAN',
      'gift_address', 'Dk. Talang, Lemah Putih, RT 05, RW 01, Selotinatah, Ngariboyo, Magetan, Jawa Timur (No. HP: 0895 3401 92500)',
      'entertainment_day', 'Campursari',
      'entertainment_night', 'Wayang Kulit',
      'color_concept', 'Hitam & Emas (Black & Gold)',
      'music_title', 'Landon Pigg - Falling In Love At A Coffee Shop'
    )
  )
  ON CONFLICT (id) DO UPDATE SET
    client_id = EXCLUDED.client_id,
    theme_id = EXCLUDED.theme_id,
    title = EXCLUDED.title,
    slug = EXCLUDED.slug,
    status = EXCLUDED.status,
    wedding_date = EXCLUDED.wedding_date,
    settings = EXCLUDED.settings;

  -- 3. Insert or Update Couple Info
  INSERT INTO couples (
    id,
    invitation_id,
    groom_full_name,
    groom_nickname,
    groom_father_name,
    groom_mother_name,
    groom_photo,
    bride_full_name,
    bride_nickname,
    bride_father_name,
    bride_mother_name,
    bride_photo
  ) VALUES (
    '33000000-0000-0000-0000-000000000003',
    v_invitation_id,
    'AGNI KAHURIPAN (KRIBO)',
    'Agni',
    'SOFYAN',
    'WARSILAH',
    '/themes/benny-groom.jpg',
    'PUTRI ANNISA',
    'Putri',
    'SYAHRUDIN',
    'ELIYANA',
    '/themes/indah-bride.jpg'
  )
  ON CONFLICT (invitation_id) DO UPDATE SET
    groom_full_name = EXCLUDED.groom_full_name,
    groom_nickname = EXCLUDED.groom_nickname,
    groom_father_name = EXCLUDED.groom_father_name,
    groom_mother_name = EXCLUDED.groom_mother_name,
    groom_photo = EXCLUDED.groom_photo,
    bride_full_name = EXCLUDED.bride_full_name,
    bride_nickname = EXCLUDED.bride_nickname,
    bride_father_name = EXCLUDED.bride_father_name,
    bride_mother_name = EXCLUDED.bride_mother_name,
    bride_photo = EXCLUDED.bride_photo;

  -- 4. Insert or Update Events (Akad & Resepsi)
  DELETE FROM events WHERE invitation_id = v_invitation_id;

  INSERT INTO events (
    id,
    invitation_id,
    name,
    event_date,
    start_time,
    end_time,
    location,
    address,
    maps_url,
    description,
    sort_order
  ) VALUES 
  (
    '44000000-0000-0000-0000-000000000004',
    v_invitation_id,
    'AKAD NIKAH',
    '2026-10-25'::date,
    '09:00:00'::time,
    '10:00:00'::time,
    'RUMAH MEMPELAI LAKI-LAKI',
    'Dk. Talang, RT 03, RW 01, Selotinatah, Ngariboyo, Magetan, Jawa Timur',
    'https://maps.app.goo.gl/mdB1sVeHfiu5QYXx6?g_st=ic',
    'Akad Nikah Khidmat & Doa Restu',
    1
  ),
  (
    '55000000-0000-0000-0000-000000000005',
    v_invitation_id,
    'RESEPSI PERNIKAHAN',
    '2026-10-25'::date,
    '10:00:00'::time,
    '20:00:00'::time,
    'RUMAH MEMPELAI LAKI-LAKI',
    'Dk. Talang, RT 03, RW 01, Selotinatah, Ngariboyo, Magetan, Jawa Timur',
    'https://maps.app.goo.gl/mdB1sVeHfiu5QYXx6?g_st=ic',
    'Hiburan Siang: Campursari | Hiburan Malam: Wayang Kulit',
    2
  );

  -- 5. Insert or Update Gift Account (BRI)
  DELETE FROM gift_accounts WHERE invitation_id = v_invitation_id;

  INSERT INTO gift_accounts (
    id,
    invitation_id,
    type,
    provider,
    account_name,
    account_number,
    is_active
  ) VALUES (
    '66000000-0000-0000-0000-000000000006',
    v_invitation_id,
    'bank',
    'BRI',
    'AGNI KAHURIPAN',
    '6361 0100 2988 509',
    true
  );

  -- 6. Insert or Update Music
  INSERT INTO music (
    id,
    invitation_id,
    music_name,
    music_url,
    autoplay,
    loop
  ) VALUES (
    '77000000-0000-0000-0000-000000000007',
    v_invitation_id,
    'Landon Pigg - Falling In Love At A Coffee Shop',
    '/music/bergema-sampai-selamanya.mp3',
    true,
    true
  )
  ON CONFLICT (invitation_id) DO UPDATE SET
    music_name = EXCLUDED.music_name,
    music_url = EXCLUDED.music_url,
    autoplay = EXCLUDED.autoplay,
    loop = EXCLUDED.loop;

END $$;

-- =========================================================================
-- Script Pembaruan Kebijakan RLS RSVP
-- Buka Supabase Dashboard -> SQL Editor -> Tempel Script ini & Klik 'RUN'
-- =========================================================================

-- 1. Berikan hak akses baca (SELECT) pada tabel rsvps untuk publik pada undangan yang sudah dipublikasikan
DROP POLICY IF EXISTS "Public can read rsvps of published invitations" ON rsvps;

CREATE POLICY "Public can read rsvps of published invitations" ON rsvps FOR SELECT USING (
  EXISTS (SELECT 1 FROM invitations WHERE id = rsvps.invitation_id AND status = 'published')
);

-- 2. Pastikan publik dapat mengirim (INSERT) RSVP
DROP POLICY IF EXISTS "Public can insert rsvps" ON rsvps;

CREATE POLICY "Public can insert rsvps" ON rsvps FOR INSERT WITH CHECK (true);

-- 3. Pastikan admin memiliki akses penuh untuk membaca, mengubah, dan menghapus
DROP POLICY IF EXISTS "Admins can do everything on rsvps" ON rsvps;

CREATE POLICY "Admins can do everything on rsvps" ON rsvps FOR ALL USING (is_admin());

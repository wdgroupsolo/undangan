-- WD Group Wedding Invitation Management Schema

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. HELPER FUNCTIONS
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Check if current user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. TABLES

-- Profiles (Linked to auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Clients
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  address TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Themes
CREATE TABLE themes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT,
  preview_image TEXT,
  thumbnail TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  features JSONB DEFAULT '[]',
  theme_config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Invitations
CREATE TABLE invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  theme_id UUID REFERENCES themes(id),
  title TEXT,
  slug TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  wedding_date TIMESTAMPTZ,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Couples
CREATE TABLE couples (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID UNIQUE REFERENCES invitations(id) ON DELETE CASCADE,
  groom_full_name TEXT,
  groom_nickname TEXT,
  groom_father_name TEXT,
  groom_mother_name TEXT,
  groom_photo TEXT,
  bride_full_name TEXT,
  bride_nickname TEXT,
  bride_father_name TEXT,
  bride_mother_name TEXT,
  bride_photo TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  event_date DATE,
  start_time TIME,
  end_time TIME,
  location TEXT,
  address TEXT,
  maps_url TEXT,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stories
CREATE TABLE stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE,
  title TEXT,
  date DATE,
  description TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  sort_order INTEGER DEFAULT 0,
  is_cover BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Music
CREATE TABLE music (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID UNIQUE REFERENCES invitations(id) ON DELETE CASCADE,
  music_name TEXT,
  music_url TEXT,
  music_file TEXT,
  autoplay BOOLEAN DEFAULT false,
  loop BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gift Accounts
CREATE TABLE gift_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE,
  type TEXT,
  provider TEXT,
  account_name TEXT,
  account_number TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Guests
CREATE TABLE guests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  guest_code TEXT UNIQUE,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RSVPs
CREATE TABLE rsvps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE,
  guest_id UUID REFERENCES guests(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  attendance TEXT CHECK (attendance IN ('attending', 'not_attending', 'maybe')),
  number_of_guests INTEGER DEFAULT 1,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Comments / Guest Book
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Settings
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Invitation Views
CREATE TABLE invitation_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE,
  device TEXT,
  browser TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TRIGGERS

CREATE TRIGGER set_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_themes_updated_at BEFORE UPDATE ON themes FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_invitations_updated_at BEFORE UPDATE ON invitations FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_couples_updated_at BEFORE UPDATE ON couples FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_stories_updated_at BEFORE UPDATE ON stories FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_music_updated_at BEFORE UPDATE ON music FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_guests_updated_at BEFORE UPDATE ON guests FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_settings_updated_at BEFORE UPDATE ON settings FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 5. INDEXES

CREATE INDEX idx_themes_slug ON themes(slug);
CREATE INDEX idx_themes_status ON themes(status);
CREATE INDEX idx_invitations_slug ON invitations(slug);
CREATE INDEX idx_invitations_status ON invitations(status);
CREATE INDEX idx_invitations_client_id ON invitations(client_id);
CREATE INDEX idx_invitations_theme_id ON invitations(theme_id);
CREATE INDEX idx_events_invitation_id ON events(invitation_id);
CREATE INDEX idx_stories_invitation_id ON stories(invitation_id);
CREATE INDEX idx_gallery_invitation_id ON gallery(invitation_id);
CREATE INDEX idx_guests_invitation_id ON guests(invitation_id);
CREATE INDEX idx_rsvps_invitation_id ON rsvps(invitation_id);
CREATE INDEX idx_comments_invitation_id ON comments(invitation_id);
CREATE INDEX idx_invitation_views_invitation_id ON invitation_views(invitation_id);

-- 6. RLS POLICIES

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE couples ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE music ENABLE ROW LEVEL SECURITY;
ALTER TABLE gift_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitation_views ENABLE ROW LEVEL SECURITY;

-- Admin Policies (Full Access for Admins on all tables)
CREATE POLICY "Admins can do everything on profiles" ON profiles FOR ALL USING (is_admin());
CREATE POLICY "Admins can do everything on clients" ON clients FOR ALL USING (is_admin());
CREATE POLICY "Admins can do everything on themes" ON themes FOR ALL USING (is_admin());
CREATE POLICY "Admins can do everything on invitations" ON invitations FOR ALL USING (is_admin());
CREATE POLICY "Admins can do everything on couples" ON couples FOR ALL USING (is_admin());
CREATE POLICY "Admins can do everything on events" ON events FOR ALL USING (is_admin());
CREATE POLICY "Admins can do everything on stories" ON stories FOR ALL USING (is_admin());
CREATE POLICY "Admins can do everything on gallery" ON gallery FOR ALL USING (is_admin());
CREATE POLICY "Admins can do everything on music" ON music FOR ALL USING (is_admin());
CREATE POLICY "Admins can do everything on gift_accounts" ON gift_accounts FOR ALL USING (is_admin());
CREATE POLICY "Admins can do everything on guests" ON guests FOR ALL USING (is_admin());
CREATE POLICY "Admins can do everything on rsvps" ON rsvps FOR ALL USING (is_admin());
CREATE POLICY "Admins can do everything on comments" ON comments FOR ALL USING (is_admin());
CREATE POLICY "Admins can do everything on settings" ON settings FOR ALL USING (is_admin());
CREATE POLICY "Admins can do everything on invitation_views" ON invitation_views FOR ALL USING (is_admin());

-- Public Policies

-- Themes: Public can read active themes
CREATE POLICY "Public can read active themes" ON themes FOR SELECT USING (status = 'active');

-- Invitations: Public can read published invitations
CREATE POLICY "Public can read published invitations" ON invitations FOR SELECT USING (status = 'published');

-- Couples, Events, Stories, Gallery, Music: Public can read if invitation is published
CREATE POLICY "Public can read couples of published invitations" ON couples FOR SELECT USING (
  EXISTS (SELECT 1 FROM invitations WHERE id = couples.invitation_id AND status = 'published')
);
CREATE POLICY "Public can read events of published invitations" ON events FOR SELECT USING (
  EXISTS (SELECT 1 FROM invitations WHERE id = events.invitation_id AND status = 'published')
);
CREATE POLICY "Public can read stories of published invitations" ON stories FOR SELECT USING (
  EXISTS (SELECT 1 FROM invitations WHERE id = stories.invitation_id AND status = 'published')
);
CREATE POLICY "Public can read gallery of published invitations" ON gallery FOR SELECT USING (
  EXISTS (SELECT 1 FROM invitations WHERE id = gallery.invitation_id AND status = 'published')
);
CREATE POLICY "Public can read music of published invitations" ON music FOR SELECT USING (
  EXISTS (SELECT 1 FROM invitations WHERE id = music.invitation_id AND status = 'published')
);

-- Gift Accounts: Public can read active gift accounts of published invitations
CREATE POLICY "Public can read active gift accounts of published invitations" ON gift_accounts FOR SELECT USING (
  is_active = true AND EXISTS (SELECT 1 FROM invitations WHERE id = gift_accounts.invitation_id AND status = 'published')
);

-- RSVPs: Public can insert
CREATE POLICY "Public can insert rsvps" ON rsvps FOR INSERT WITH CHECK (true);

-- Comments: Public can insert, and read approved comments
CREATE POLICY "Public can insert comments" ON comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can read approved comments" ON comments FOR SELECT USING (status = 'approved');

-- Invitation Views: Public can insert
CREATE POLICY "Public can insert invitation views" ON invitation_views FOR INSERT WITH CHECK (true);

-- Settings: Public can read settings
CREATE POLICY "Public can read settings" ON settings FOR SELECT USING (true);

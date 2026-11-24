import os
import base64
import subprocess

BASE_DIR = '/home/idkxz/Documents/Project WD/undangan pernikahan'

def get_base64_image(rel_path):
    full_path = os.path.join(BASE_DIR, rel_path)
    if not os.path.exists(full_path):
        print(f"Warning: {full_path} not found")
        return ""
    with open(full_path, 'rb') as f:
        data = base64.b64encode(f.read()).decode('utf-8')
        return f"data:image/jpeg;base64,{data}"

print("Encoding images...")
imgs = {
    'ivory': get_base64_image('public/themes/ivory-pearl/theme-preview.jpg'),
    'noir': get_base64_image('public/themes/noir-gold/theme-preview.jpg'),
    'rose': get_base64_image('public/themes/rose-gold/theme-preview.jpg'),
    'terracotta': get_base64_image('public/themes/terracotta-boho/theme-preview.jpg'),
    'sunda': get_base64_image('public/themes/sunda-siger/theme-preview.jpg'),
    'minang': get_base64_image('public/themes/minang-gadang/theme-preview.jpg'),
    'bali': get_base64_image('public/themes/bali-kamasan/theme-preview.jpg'),
    'kl': get_base64_image('public/themes/kuala-lumpur-heritage/theme-preview.jpg'),
    'morocco': get_base64_image('public/themes/moroccan-nights/theme-preview.jpg'),
}

html_content = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Katalog Tema Undangan Digital 50k & 70k - WD Group</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&display=swap');

    @page {{
      size: A4 portrait;
      margin: 8mm 10mm;
    }}

    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}

    body {{
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #0f172a;
      background: #ffffff;
      font-size: 8.5pt;
      line-height: 1.4;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }}

    .page {{
      page-break-after: always;
      position: relative;
      height: 278mm;
      max-height: 278mm;
      display: flex;
      flex-col;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      padding-bottom: 2mm;
    }}

    .page:last-child {{
      page-break-after: auto;
    }}

    /* HEADER */
    .header {{
      border-bottom: 2px solid #0f172a;
      padding-bottom: 8px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }}

    .brand-title {{
      font-family: 'Playfair Display', serif;
      font-size: 17pt;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.5px;
      line-height: 1.1;
    }}

    .brand-subtitle {{
      font-size: 8pt;
      color: #64748b;
      margin-top: 3px;
      font-weight: 500;
      letter-spacing: 0.5px;
    }}

    .brand-badge {{
      background: #0f172a;
      color: #ffffff;
      font-size: 7pt;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }}

    /* FOOTER */
    .footer {{
      border-top: 1px solid #e2e8f0;
      padding-top: 6px;
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 7pt;
      color: #64748b;
    }}

    /* COVERS / HERO */
    .hero-banner {{
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: white;
      border-radius: 12px;
      padding: 18px 20px;
      margin-bottom: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
    }}

    .hero-title {{
      font-family: 'Playfair Display', serif;
      font-size: 16pt;
      font-weight: 700;
      line-height: 1.2;
      color: #f8fafc;
    }}

    .hero-tagline {{
      font-size: 8.5pt;
      color: #94a3b8;
      margin-top: 4px;
    }}

    .hero-pill {{
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 6px 14px;
      border-radius: 9999px;
      font-weight: 700;
      font-size: 8pt;
      color: #38bdf8;
      letter-spacing: 0.5px;
      text-align: right;
    }}

    /* GRID CARDS 2x2 */
    .grid-2x2 {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      flex: 1;
    }}

    .theme-card {{
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      background: #ffffff;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
    }}

    .theme-card-img {{
      width: 100%;
      height: 145mm;
      max-height: 145mm;
      object-fit: cover;
      object-position: top center;
      border-bottom: 1px solid #e2e8f0;
      background: #f1f5f9;
    }}

    .theme-card-img-3col {{
      width: 100%;
      height: 130mm;
      max-height: 130mm;
      object-fit: cover;
      object-position: top center;
      border-bottom: 1px solid #e2e8f0;
      background: #f1f5f9;
    }}

    .theme-card-body {{
      padding: 8px 10px;
      display: flex;
      flex-direction: column;
      flex: 1;
      justify-content: space-between;
    }}

    .theme-card-title {{
      font-family: 'Playfair Display', serif;
      font-size: 11pt;
      font-weight: 700;
      color: #0f172a;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }}

    .price-tag {{
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 8.5pt;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 6px;
    }}

    .price-tag-50 {{
      background: #f0fdf4;
      color: #166534;
      border: 1px solid #bbf7d0;
    }}

    .price-tag-70 {{
      background: #fefce8;
      color: #854d0e;
      border: 1px solid #fef08a;
    }}

    .theme-desc {{
      font-size: 7.5pt;
      color: #475569;
      margin: 4px 0;
      line-height: 1.35;
    }}

    .feature-chips {{
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: 3px;
    }}

    .chip {{
      font-size: 6.5pt;
      font-weight: 600;
      background: #f1f5f9;
      color: #334155;
      padding: 2px 6px;
      border-radius: 4px;
    }}

    /* GRID 3 COLUMNS */
    .grid-3col {{
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 10px;
      flex: 1;
    }}

    /* SECTION HEADER BAR */
    .section-bar {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 12px;
      border-radius: 8px;
      margin-bottom: 10px;
    }}

    .bar-50 {{
      background: #f0fdf4;
      border-left: 4px solid #16a34a;
    }}

    .bar-70 {{
      background: #fefce8;
      border-left: 4px solid #ca8a04;
    }}

    .section-bar-title {{
      font-family: 'Playfair Display', serif;
      font-size: 11pt;
      font-weight: 700;
      color: #0f172a;
    }}

    .section-bar-desc {{
      font-size: 7.5pt;
      color: #64748b;
    }}

    /* FEATURE HIGHLIGHT BOX */
    .highlight-box {{
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 14px;
      margin-top: 10px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      text-align: center;
    }}

    .highlight-item h4 {{
      font-size: 8pt;
      font-weight: 700;
      color: #0f172a;
    }}

    .highlight-item p {{
      font-size: 6.5pt;
      color: #64748b;
      margin-top: 1px;
    }}

    /* COMPARISON TABLE */
    .table-box {{
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      overflow: hidden;
      margin-top: 8px;
      font-size: 7.5pt;
    }}

    table {{
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }}

    th {{
      background: #0f172a;
      color: white;
      padding: 6px 10px;
      font-weight: 600;
      font-size: 7.5pt;
    }}

    td {{
      padding: 5px 10px;
      border-bottom: 1px solid #f1f5f9;
    }}

    tr:nth-child(even) {{
      background: #f8fafc;
    }}
  </style>
</head>
<body>

  <!-- ================= PAGE 1: COVER & TIER 50K ================= -->
  <div class="page">
    <div>
      <div class="header">
        <div>
          <div class="brand-title">WD Digital Invitation</div>
          <div class="brand-subtitle">Katalog Eksklusif Tema Undangan Digital • Solo & Seluruh Indonesia</div>
        </div>
        <div class="brand-badge">Edisi 2026 / 2027</div>
      </div>

      <div class="hero-banner">
        <div>
          <div class="hero-title">Koleksi Tema Undangan 50K & 70K</div>
          <div class="hero-tagline">Tampilan Mewah, Desain Elegan, Responsif HP & Siap Kirim ke WhatsApp Tamu</div>
        </div>
        <div class="hero-pill">
          ✓ Unlimited Tamu<br>
          ✓ Aktif Selamanya
        </div>
      </div>

      <div class="section-bar bar-50">
        <div>
          <span class="section-bar-title">Paket Starter • Rp 50.000</span>
          <span class="section-bar-desc"> — Desain Modern Minimalis, Bersih, Anggun, & Sangat Terjangkau</span>
        </div>
        <span class="price-tag price-tag-50">4 Pilihan Tema</span>
      </div>
    </div>

    <!-- 4 TEMA 50K (2x2 GRID) -->
    <div class="grid-2x2">
      <!-- 1. Ivory Pearl -->
      <div class="theme-card">
        <img src="{imgs['ivory']}" alt="Ivory Pearl Minimalist" class="theme-card-img" />
        <div class="theme-card-body">
          <div class="theme-card-title">
            <span>Ivory Pearl Minimalist</span>
            <span class="price-tag price-tag-50">Rp 50k</span>
          </div>
          <p class="theme-desc">Nuansa ivory pearl & champagne silk berkelas, tipografi editorial elegan, double hairline border, amplop buka otomatis, dan RSVP digital.</p>
          <div class="feature-chips">
            <span class="chip">Champagne Silk</span>
            <span class="chip">Editorial Typography</span>
            <span class="chip">Amplop Otomatis</span>
            <span class="chip">Google Maps</span>
          </div>
        </div>
      </div>

      <!-- 2. Noir Gold -->
      <div class="theme-card">
        <img src="{imgs['noir']}" alt="Noir Gold Elegance" class="theme-card-img" />
        <div class="theme-card-body">
          <div class="theme-card-title">
            <span>Noir Gold Elegance</span>
            <span class="price-tag price-tag-50">Rp 50k</span>
          </div>
          <p class="theme-desc">Nuansa hitam obsidian & emas champagne mewah, segel lilin monogram royal, kartu amplop digital VIP, sangat memukau untuk pesta malam hari.</p>
          <div class="feature-chips">
            <span class="chip">Obsidian & Gold</span>
            <span class="chip">Royal Wax Seal</span>
            <span class="chip">VIP Envelope</span>
            <span class="chip">Night Glamour</span>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <span>WD Digital Invitation • Solo & Surakarta</span>
      <span>Halaman 1 dari 4 • Koleksi Tema Paket Starter 50K</span>
      <span>WhatsApp CS: 0812-3456-7890</span>
    </div>
  </div>

  <!-- ================= PAGE 2: TIER 50K CONTINUED (ROSE GOLD & TERRACOTTA) ================= -->
  <div class="page">
    <div>
      <div class="header">
        <div>
          <div class="brand-title">WD Digital Invitation</div>
          <div class="brand-subtitle">Koleksi Paket Starter Rp 50.000 (Lanjutan)</div>
        </div>
        <div class="brand-badge">Paket Starter 50k</div>
      </div>

      <div class="section-bar bar-50">
        <div>
          <span class="section-bar-title">Pilihan Tema Romantis & Bohemian • Rp 50.000</span>
          <span class="section-bar-desc"> — Keanggunan Bunga Peony & Kehangatan Nuansa Rustic</span>
        </div>
        <span class="price-tag price-tag-50">Hemat & Berkelas</span>
      </div>
    </div>

    <!-- 2 TEMA 50K (2x2 GRID) -->
    <div class="grid-2x2">
      <!-- 3. Rose Gold -->
      <div class="theme-card">
        <img src="{imgs['rose']}" alt="Rose Gold Romance" class="theme-card-img" />
        <div class="theme-card-body">
          <div class="theme-card-title">
            <span>Rose Gold Romance</span>
            <span class="price-tag price-tag-50">Rp 50k</span>
          </div>
          <p class="theme-desc">Nuansa dusty rose pastel berpadu aksen foil rose gold berkilau, rangkaian bunga peony mekar romantis, dan estetika feminin yang manis.</p>
          <div class="feature-chips">
            <span class="chip">Dusty Rose Foil</span>
            <span class="chip">Peony Blossoms</span>
            <span class="chip">Romantic Pastel</span>
            <span class="chip">RSVP & Countdown</span>
          </div>
        </div>
      </div>

      <!-- 4. Terracotta Boho -->
      <div class="theme-card">
        <img src="{imgs['terracotta']}" alt="Terracotta Boho Rustic" class="theme-card-img" />
        <div class="theme-card-body">
          <div class="theme-card-title">
            <span>Terracotta Boho Rustic</span>
            <span class="price-tag price-tag-50">Rp 50k</span>
          </div>
          <p class="theme-desc">Kehangatan tanah liat terracotta, rumput pampas kering lembut, lengkung gerbang senja, dan gaya bohemian estetik yang sangat kekinian.</p>
          <div class="feature-chips">
            <span class="chip">Warm Terracotta</span>
            <span class="chip">Dried Pampas Grass</span>
            <span class="chip">Boho Arch</span>
            <span class="chip">Outdoor & Garden</span>
          </div>
        </div>
      </div>
    </div>

    <!-- FITUR LENGKAP PAKET 50K -->
    <div class="highlight-box">
      <div class="highlight-item">
        <h4>Amplop & QRIS</h4>
        <p>Tersedia nomor rekening & kirim kado</p>
      </div>
      <div class="highlight-item">
        <h4>Navigasi Google Maps</h4>
        <p>Petunjuk arah presisi sekali klik</p>
      </div>
      <div class="highlight-item">
        <h4>RSVP & Buku Tamu</h4>
        <p>Konfirmasi kehadiran & ucapan doa</p>
      </div>
      <div class="highlight-item">
        <h4>Musik Romantis</h4>
        <p>Bebas pilih lagu latar favorit</p>
      </div>
    </div>

    <div class="footer">
      <span>WD Digital Invitation • Solo & Surakarta</span>
      <span>Halaman 2 dari 4 • Koleksi Tema Paket Starter 50K</span>
      <span>WhatsApp CS: 0812-3456-7890</span>
    </div>
  </div>

  <!-- ================= PAGE 3: TIER 70K (SUNDA, MINANG, BALI) ================= -->
  <div class="page">
    <div>
      <div class="header">
        <div>
          <div class="brand-title">WD Digital Invitation</div>
          <div class="brand-subtitle">Koleksi Paket Signature Adat & Tradisi Nusantara • Rp 70.000</div>
        </div>
        <div class="brand-badge">Paket Signature 70k</div>
      </div>

      <div class="section-bar bar-70">
        <div>
          <span class="section-bar-title">Kemegahan Adat Budaya Nusantara • Rp 70.000</span>
          <span class="section-bar-desc"> — Ornamen Sakral, Ilustrasi Gerbang Adat Otentik, & Sentuhan Emas Filosofis</span>
        </div>
        <span class="price-tag price-tag-70">3 Tema Adat</span>
      </div>
    </div>

    <!-- 3 TEMA 70K (3 COLUMNS) -->
    <div class="grid-3col">
      <!-- 1. Sunda Siger -->
      <div class="theme-card">
        <img src="{imgs['sunda']}" alt="Sunda Siger Mahkota" class="theme-card-img-3col" />
        <div class="theme-card-body">
          <div class="theme-card-title">
            <span>Sunda Siger</span>
            <span class="price-tag price-tag-70">Rp 70k</span>
          </div>
          <p class="theme-desc">Adat Sunda Priangan luhur bernuansa mahkota Siger kencana, untaian melati harum, merak ngibing, dan pilar keraton kasepuhan.</p>
          <div class="feature-chips">
            <span class="chip">Siger Emas</span>
            <span class="chip">Ronce Melati</span>
            <span class="chip">Parahyangan</span>
          </div>
        </div>
      </div>

      <!-- 2. Minang Rumah Gadang -->
      <div class="theme-card">
        <img src="{imgs['minang']}" alt="Minang Rumah Gadang" class="theme-card-img-3col" />
        <div class="theme-card-body">
          <div class="theme-card-title">
            <span>Minang Gadang</span>
            <span class="price-tag price-tag-70">Rp 70k</span>
          </div>
          <p class="theme-desc">Adat Minangkabau sakral bernuansa atap gonjong Rumah Gadang, ukiran rangkiang emas, Suntiang bertingkat, dan songket marun Pandai Sikek.</p>
          <div class="feature-chips">
            <span class="chip">Gonjong Gadang</span>
            <span class="chip">Suntiang Emas</span>
            <span class="chip">Songket Marun</span>
          </div>
        </div>
      </div>

      <!-- 3. Bali Royal Kamasan -->
      <div class="theme-card">
        <img src="{imgs['bali']}" alt="Bali Royal Kamasan" class="theme-card-img-3col" />
        <div class="theme-card-body">
          <div class="theme-card-title">
            <span>Bali Kamasan</span>
            <span class="price-tag price-tag-70">Rp 70k</span>
          </div>
          <p class="theme-desc">Adat Bali eksotis bernuansa gerbang Candi Bentar pura agung, ukiran emas prada Kamasan, kamboja kuning, dan kain poleng sakral.</p>
          <div class="feature-chips">
            <span class="chip">Candi Bentar</span>
            <span class="chip">Prada Kamasan</span>
            <span class="chip">Bunga Kamboja</span>
          </div>
        </div>
      </div>
    </div>

    <!-- FOOTER ADAT -->
    <div class="highlight-box" style="margin-top: 8px;">
      <div class="highlight-item">
        <h4>Filosofi Budaya Luhur</h4>
        <p>Setiap ornamen merepresentasikan adat asli</p>
      </div>
      <div class="highlight-item">
        <h4>Tata Busana & Adat</h4>
        <p>Panduan dresscode busana adat tamu</p>
      </div>
      <div class="highlight-item">
        <h4>Efek Animasi Khas</h4>
        <p>Kelopak melati & taburan bunga interaktif</p>
      </div>
      <div class="highlight-item">
        <h4>Full Custom Teks Doa</h4>
        <p>Doa sakral sesuai tradisi & agama</p>
      </div>
    </div>

    <div class="footer">
      <span>WD Digital Invitation • Solo & Surakarta</span>
      <span>Halaman 3 dari 4 • Koleksi Tema Paket Signature Adat 70K</span>
      <span>WhatsApp CS: 0812-3456-7890</span>
    </div>
  </div>

  <!-- ================= PAGE 4: TIER 70K (KUALA LUMPUR & MOROCCAN) + ORDER GUIDE ================= -->
  <div class="page">
    <div>
      <div class="header">
        <div>
          <div class="brand-title">WD Digital Invitation</div>
          <div class="brand-subtitle">Koleksi Paket Signature Heritage (Melayu & Oriental) • Rp 70.000</div>
        </div>
        <div class="brand-badge">Paket Signature 70k</div>
      </div>

      <div class="section-bar bar-70">
        <div>
          <span class="section-bar-title">Heritage Melayu & Kemewahan Timur Tengah • Rp 70.000</span>
          <span class="section-bar-desc"> — Kemegahan Arsitektur Landmark & Kehangatan Arabian Nights</span>
        </div>
        <span class="price-tag price-tag-70">2 Tema Ikonik</span>
      </div>
    </div>

    <!-- 2 TEMA 70K (2x2 GRID) -->
    <div class="grid-2x2" style="max-height: 175mm;">
      <!-- 4. Kuala Lumpur -->
      <div class="theme-card">
        <img src="{imgs['kl']}" alt="Kuala Lumpur Heritage" class="theme-card-img" style="height: 130mm; max-height: 130mm;" />
        <div class="theme-card-body">
          <div class="theme-card-title">
            <span>Kuala Lumpur Heritage</span>
            <span class="price-tag price-tag-70">Rp 70k</span>
          </div>
          <p class="theme-desc">Modern Malay Heritage & Walimatulurus berlatar Menara Kembar Petronas, Bangunan Sultan Abdul Samad, gerbang Songket emas, dan Bunga Raya.</p>
          <div class="feature-chips">
            <span class="chip">Twin Tower Petronas</span>
            <span class="chip">Songket Diraja</span>
            <span class="chip">Walimatulurus</span>
          </div>
        </div>
      </div>

      <!-- 5. Moroccan Nights -->
      <div class="theme-card">
        <img src="{imgs['morocco']}" alt="Moroccan Arabian Nights" class="theme-card-img" style="height: 130mm; max-height: 130mm;" />
        <div class="theme-card-body">
          <div class="theme-card-title">
            <span>Moroccan Arabian Nights</span>
            <span class="price-tag price-tag-70">Rp 70k</span>
          </div>
          <p class="theme-desc">Kubah moriska istana Alhambra, lampion tembaga bercahaya hangat, motif bintang zellij, dan perpaduan warna biru lapis lazuli amber eksotis.</p>
          <div class="feature-chips">
            <span class="chip">Alhambra Dome</span>
            <span class="chip">Lampion Tembaga</span>
            <span class="chip">Zellij Mozaik</span>
          </div>
        </div>
      </div>
    </div>

    <!-- TABEL KOMPARASI & CARA ORDER -->
    <div class="table-box">
      <table>
        <thead>
          <tr>
            <th>Fitur Undangan Digital</th>
            <th style="text-align: center;">Paket Starter (Rp 50k)</th>
            <th style="text-align: center;">Paket Signature Adat (Rp 70k)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Masa Aktif Undangan</strong></td>
            <td style="text-align: center; color: #16a34a; font-weight: 700;">✓ Selamanya (Tanpa Batas)</td>
            <td style="text-align: center; color: #16a34a; font-weight: 700;">✓ Selamanya (Tanpa Batas)</td>
          </tr>
          <tr>
            <td><strong>Kirim Nama Tamu WhatsApp</strong></td>
            <td style="text-align: center; color: #16a34a;">✓ Unlimited Tamu</td>
            <td style="text-align: center; color: #16a34a;">✓ Unlimited Tamu</td>
          </tr>
          <tr>
            <td><strong>Pilihan Desain Tema</strong></td>
            <td style="text-align: center;">4 Tema Modern Minimalis</td>
            <td style="text-align: center; font-weight: 700; color: #854d0e;">5 Tema Adat & Heritage</td>
          </tr>
          <tr>
            <td><strong>Ornamen & Ilustrasi Khas</strong></td>
            <td style="text-align: center;">Standard Hairline & Floral</td>
            <td style="text-align: center; font-weight: 700; color: #854d0e;">Otentik Budaya (Siger, Gadang, Bali, dll)</td>
          </tr>
          <tr>
            <td><strong>Waktu Pengerjaan</strong></td>
            <td style="text-align: center; font-weight: 700;">Kilat 1 - 2 Jam Jadi</td>
            <td style="text-align: center; font-weight: 700;">Kilat 1 - 2 Jam Jadi</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="background: #0f172a; color: white; border-radius: 8px; padding: 10px 14px; margin-top: 8px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div style="font-size: 8.5pt; font-weight: 700; color: #f8fafc;">Cara Pemesanan Undangan Digital:</div>
        <div style="font-size: 7.5pt; color: #94a3b8; margin-top: 2px;">Hubungi WhatsApp kami, kirim data mempelai & acara, undangan langsung diproses!</div>
      </div>
      <div style="background: #22c55e; color: white; font-weight: 800; font-size: 8pt; padding: 6px 14px; border-radius: 6px;">
        Chat WhatsApp: 0812-3456-7890
      </div>
    </div>

    <div class="footer">
      <span>WD Digital Invitation • Solo & Surakarta</span>
      <span>Halaman 4 dari 4 • Koleksi Tema Paket Signature Heritage 70K</span>
      <span>WhatsApp CS: 0812-3456-7890</span>
    </div>
  </div>

</body>
</html>
"""

html_path = os.path.join(BASE_DIR, 'katalog-tema-50k-70k.html')
pdf_path = os.path.join(BASE_DIR, 'Katalog_Tema_50k_70k_WD_Digital_Invitation.pdf')

print(f"Writing {html_path}...")
with open(html_path, 'w', encoding='utf-8') as f:
    f.write(html_content)

print(f"Generating PDF with headless Chrome...")
chrome_cmd = [
    'google-chrome',
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    f'--print-to-pdf={pdf_path}',
    '--print-to-pdf-no-header',
    '--run-all-compositor-stages-before-draw',
    html_path
]

res = subprocess.run(chrome_cmd, capture_output=True, text=True)
if res.returncode == 0 and os.path.exists(pdf_path):
    size_mb = os.path.getsize(pdf_path) / (1024 * 1024)
    print(f"SUCCESS! PDF created at: {pdf_path} ({size_mb:.2f} MB)")
else:
    print(f"Error generating PDF: {res.stderr}")


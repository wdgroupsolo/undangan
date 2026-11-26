#!/usr/bin/env python3
"""Generate the official 8-page WD Digital Invitation catalog (50K, 70K & 150K)."""

import base64
import html
import os
import subprocess
from dataclasses import dataclass
from typing import Sequence

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HTML_OUTPUT_PATH = os.path.join(BASE_DIR, "katalog-tema-50k-70k-150k.html")
PDF_OUTPUT_PATH = os.path.join(
    BASE_DIR, "Katalog_Tema_50k_70k_150k_WD_Digital_Invitation.pdf"
)


@dataclass(frozen=True)
class ThemeCard:
    slug: str
    title: str
    price_label: str
    category: str
    description: str
    image_path: str
    features: tuple[str, ...]
    promo_note: str = ""


def load_image_data_uri(rel_path: str) -> str:
    """Load an image as a base64 data URI, sniffing MIME type from magic bytes."""
    full_path = os.path.join(BASE_DIR, rel_path)
    if not os.path.isfile(full_path):
        raise FileNotFoundError(f"Theme preview not found: {full_path}")

    with open(full_path, "rb") as file_handle:
        raw_bytes = file_handle.read()

    if raw_bytes.startswith(b"\x89PNG\r\n\x1a\n"):
        mime = "image/png"
    elif raw_bytes[:4] == b"RIFF" and raw_bytes[8:12] == b"WEBP":
        mime = "image/webp"
    else:
        # Preview files with .png extensions in public/themes are often JPEGs.
        mime = "image/jpeg"

    encoded = base64.b64encode(raw_bytes).decode("ascii")
    return f"data:{mime};base64,{encoded}"


STARTER_THEMES: tuple[ThemeCard, ...] = (
    ThemeCard(
        slug="ivory-pearl",
        title="Ivory Pearl Minimalist",
        price_label="Rp 50.000",
        category="Starter • Clean Editorial",
        description=(
            "Estetika putih mutiara dan krem hangat dengan tipografi editorial berserif yang bersih. "
            "Ideal untuk resepsi minimalis, pemberkatan intim, dan akad modern yang tenang."
        ),
        image_path="public/themes/ivory-pearl/theme-preview.jpg",
        features=("White Editorial", "Galeri 5 Foto", "Google Maps", "QRIS & Amplop"),
    ),
    ThemeCard(
        slug="noir-gold",
        title="Noir Gold Elegance",
        price_label="Rp 50.000",
        category="Starter • Monochrome Gold",
        description=(
            "Nuansa hitam pekat berlapis garis emas sampanye untuk kesan formal malam hari yang tegas. "
            "Hadir dengan navigasi ringkas, hitung mundur acara, dan konfirmasi kehadiran tamu."
        ),
        image_path="public/themes/noir-gold/theme-preview.jpg",
        features=("Black & Gold", "Hitung Mundur", "Unlimited Tamu", "Buku Tamu"),
    ),
    ThemeCard(
        slug="rose-gold",
        title="Rose Gold Romance",
        price_label="Rp 50.000",
        category="Starter • Pastel Blush",
        description=(
            "Perpaduan merah muda dusty rose lembut dan bingkai metalik rose gold yang romantis. "
            "Pilihan favorit untuk konsep taman siang, lamaran resmi, hingga resepsi keluarga."
        ),
        image_path="public/themes/rose-gold/theme-preview.jpg",
        features=("Blush Foil", "Galeri 5 Foto", "RSVP & Ucapan", "Rekening Digital"),
    ),
    ThemeCard(
        slug="terracotta-boho",
        title="Terracotta Boho Rustic",
        price_label="Rp 50.000",
        category="Starter • Warm Earth",
        description=(
            "Palet terakota, cokelat pasir, dan siluet bunga pampas rustic bernuansa hangat alami. "
            "Cocok untuk pesta kebun senja, konsep bohemian santai, dan perayaan outdoor."
        ),
        image_path="public/themes/terracotta-boho/theme-preview.jpg",
        features=("Boho Pampas", "Earth Palette", "Musik Latar", "Google Maps"),
    ),
)

SIGNATURE_THEMES: tuple[ThemeCard, ...] = (
    ThemeCard(
        slug="sunda-siger",
        title="Sunda Siger Parahyangan",
        price_label="Rp 70.000",
        category="Signature • Adat Sunda",
        description=(
            "Keanggunan siger sunda emas, ronce melati putih, dan motif mega mendung Parahyangan. "
            "Lengkap dengan galeri lightbox, kisah cinta, serta panduan busana tamu."
        ),
        image_path="public/themes/sunda-siger/theme-preview.jpg",
        features=("Ornamen Siger", "Galeri 8 Foto", "Dresscode Guide"),
    ),
    ThemeCard(
        slug="minang-gadang",
        title="Minang Rumah Gadang",
        price_label="Rp 70.000",
        category="Signature • Adat Minangkabau",
        description=(
            "Siluet atap gonjong Rumah Gadang berbalut marun songket Pandai Sikek dan suntiang emas. "
            "Dirancang khidmat untuk prosesi baralek gadang dan perayaan adat Minangkabau."
        ),
        image_path="public/themes/minang-gadang/theme-preview.jpg",
        features=("Songket Emas", "Kisah Cinta", "Live Wishes"),
    ),
    ThemeCard(
        slug="bali-kamasan",
        title="Bali Royal Kamasan",
        price_label="Rp 70.000",
        category="Signature • Adat Bali",
        description=(
            "Terinspirasi ukiran pura klasik Bali, bunga kamboja putih, dan nuansa prada keemasan. "
            "Menghadirkan suasana sakral pawiwahan Bali dalam tampilan modern responsif."
        ),
        image_path="public/themes/bali-kamasan/theme-preview.jpg",
        features=("Ukiran Prada", "Google Calendar", "Galeri 8 Foto"),
    ),
    ThemeCard(
        slug="kuala-lumpur-heritage",
        title="Kuala Lumpur Heritage",
        price_label="Rp 70.000",
        category="Signature • Melayu Serumpun",
        description=(
            "Perpaduan mewah royal emerald, teal songket Diraja Melayu, dan motif bunga raya emas. "
            "Cocok untuk resepsi adat Melayu serumpun serta majlis perkahwinan bergaya bangsawan."
        ),
        image_path="public/themes/kuala-lumpur-heritage/theme-preview.jpg",
        features=("Songket Diraja", "8 Foto Lightbox", "Kisah Cinta", "Google Calendar"),
    ),
    ThemeCard(
        slug="moroccan-nights",
        title="Moroccan Arabian Nights",
        price_label="Rp 70.000",
        category="Signature • Islami Timteng",
        description=(
            "Gerbang lengkung mozaik Zellij maroko dan lentera emas di atas latar biru malam yang hangat. "
            "Ideal untuk walimatul ursy bernuansa Islami elegan dengan ucapan live interaktif."
        ),
        image_path="public/themes/moroccan-nights/theme-preview.jpg",
        features=("Lentera Zellij", "Panduan Busana", "RSVP & Doa", "Galeri 8 Foto"),
    ),
)

MASTERPIECE_PART1_THEMES: tuple[ThemeCard, ...] = (
    ThemeCard(
        slug="emerald-velvet",
        title="Emerald Velvet Royal",
        price_label="Rp 150.000",
        category="Masterpiece • Modern Royal",
        description=(
            "Beludru hijau zamrud berpadu bingkai foil emas mewah dan lencana monogram VVIP. "
            "Dilengkapi AR Photobooth, Tiket Barcode VIP, serta pemutar vinyl beranimasi."
        ),
        image_path="public/themes/emerald-velvet/theme-preview.jpg",
        features=("AR Photobooth", "VIP Barcode", "Split 50/50"),
    ),
    ThemeCard(
        slug="navy-silver",
        title="Midnight Celestial Star",
        price_label="Promo Rp 150.000",
        promo_note="Normal 250K",
        category="Masterpiece • Celestial",
        description=(
            "Tema langit malam rasi bintang dengan kilau perak bercahaya dan latar konstelasi bergerak. "
            "Membawa seluruh fitur VVIP termasuk Soundwave Vinyl, AR Filter, dan E-Ticket QR."
        ),
        image_path="public/themes/navy-silver/theme-preview.jpg",
        features=("Normal 250K", "Vinyl Equalizer", "AR Kamera"),
    ),
    ThemeCard(
        slug="sakura-hanami",
        title="Sakura Kyoto Blossom",
        price_label="Rp 150.000",
        category="Masterpiece • Japanese Luxury",
        description=(
            "Kelembutan kelopak sakura Kyoto bermekaran dengan partikel kelopak gugur interaktif. "
            "Tersedia galeri editorial 4-tab, kamera AR Photobooth, dan kartu akses VIP eksklusif."
        ),
        image_path="public/themes/sakura-hanami/theme-preview.jpg",
        features=("Partikel Sakura", "4-Tab Gallery", "AR Photobooth"),
    ),
)

MASTERPIECE_PART2_THEMES: tuple[ThemeCard, ...] = (
    ThemeCard(
        slug="nirwana-sarangan",
        title="Nirwana Sarangan Resort",
        price_label="Rp 150.000",
        category="Masterpiece • Resort & Lakeview",
        description=(
            "Konsep gerbang pembuka hotel mewah dan panorama danau dengan tampilan desktop 50/50. "
            "Menghadirkan animasi pintu resort terbuka, tiket barcode tamu, dan galeri editorial."
        ),
        image_path="public/themes/nirwana-sarangan/nirwana-theme-preview.png",
        features=("Gerbang Resort", "Ticket Barcode", "Split Desktop"),
    ),
    ThemeCard(
        slug="royal-wayang-gold",
        title="Royal Wayang Gold",
        price_label="Rp 150.000",
        category="Masterpiece • Keraton Agung",
        description=(
            "Gunungan wayang emas klasik dengan ornamen Kamajaya dan Kamaratih yang megah. "
            "Dibekali pembuka gerbang interaktif, filter AR tematik, dan layanan concierge VVIP."
        ),
        image_path="public/themes/royal-wayang-theme-preview.png",
        features=("Gunungan Wayang", "Gerbang Keraton", "AR Photobooth"),
    ),
    ThemeCard(
        slug="joglo-maroon-heritage",
        title="Batak Maroon Heritage",
        price_label="Rp 150.000",
        category="Masterpiece • Adat Batak",
        description=(
            "Gerbang ukiran Gorga merah marun dan motif kain ulos emas berwibawa tinggi. "
            "Lengkap dengan animasi pintu terbuka, tiket QR tamu VVIP, dan galeri editorial."
        ),
        image_path="public/themes/joglo-maroon-theme-preview.png",
        features=("Gerbang Ulos", "VIP QR & Code-128", "Soundwave"),
    ),
)

MASTERPIECE_PART3_THEMES: tuple[ThemeCard, ...] = (
    ThemeCard(
        slug="javanese-heritage",
        title="Javanese Heritage",
        price_label="Rp 150.000",
        category="Masterpiece • Keraton Klasik",
        description=(
            "Pendopo batik parang kencana dan gebyok Jawa klasik dengan transisi tata letak 50/50 desktop."
        ),
        image_path="public/themes/javanese-heritage-theme-preview.png",
        features=("Batik Parang", "Desktop 50/50", "AR & Barcode VIP"),
    ),
    ThemeCard(
        slug="maroon-gold",
        title="Maroon Gold Royal",
        price_label="Rp 150.000",
        category="Masterpiece • Imperial Ballroom",
        description=(
            "Merah marun kerajaan dan aksen filigri emas dengan galeri editorial dan pemutar vinyl aktif."
        ),
        image_path="public/themes/maroon-gold-theme-preview.png",
        features=("Imperial Foil", "4-Tab Gallery", "Vinyl Player"),
    ),
    ThemeCard(
        slug="secret-garden",
        title="Secret Garden",
        price_label="Rp 150.000",
        category="Masterpiece • Botanical Fairytale",
        description=(
            "Gerbang botanikal dedaunan zamrud, bunga putih, dan partikel kunang-kunang senja romantis."
        ),
        image_path="public/themes/secret-garden-theme-preview.png",
        features=("Firefly Particles", "Botanical Gate", "AR Photobooth"),
    ),
    ThemeCard(
        slug="split-floral",
        title="Split Floral Luxury",
        price_label="Rp 150.000",
        category="Masterpiece • Couture Floral",
        description=(
            "Tampilan editorial bunga couture berbalut desktop split-screen dan efek partikel bercahaya."
        ),
        image_path="public/themes/split-floral-theme-preview.png",
        features=("Couture Floral", "Split-Screen", "VVIP Barcode"),
    ),
)


def render_running_header(section_label: str) -> str:
    return (
        '<div class="running-header">'
        '<div class="brand-lockup">'
        '<span class="brand-name">WD DIGITAL INVITATION</span>'
        '<span class="brand-sub">KATALOG RESMI 2026</span>'
        "</div>"
        f'<div class="running-section">{html.escape(section_label)}</div>'
        "</div>"
    )


def render_page_footer(left_label: str, page_num: int, total_pages: int = 8) -> str:
    return (
        '<div class="page-footer">'
        f"<span>{html.escape(left_label)}</span>"
        "<span>WhatsApp CS: 0857-0790-9415 &bull; Instagram: @wdgroupcompany</span>"
        f"<span>Halaman {page_num} dari {total_pages}</span>"
        "</div>"
    )


def render_theme_card(
    theme: ThemeCard,
    image_data_uris: dict[str, str],
    layout: str,
) -> str:
    """Render a theme showcase card tailored for 2col, 3col, or 2x2 grids."""
    img_class = {
        "2col": "theme-img-2col",
        "3col": "theme-img-3col",
        "2x2": "theme-img-2x2",
    }[layout]
    card_class = {
        "2col": "theme-card theme-card-2col",
        "3col": "theme-card theme-card-3col",
        "2x2": "theme-card theme-card-2x2",
    }[layout]

    promo_html = (
        f'<span class="promo-strike">{html.escape(theme.promo_note)}</span>'
        if theme.promo_note
        else ""
    )
    badge_class = "badge-promo" if theme.promo_note else "badge-price"
    features_html = "".join(
        f'<span class="feat-chip">{html.escape(feat)}</span>'
        for feat in theme.features
    )

    return f"""
    <article class="{card_class}">
      <div class="theme-media-wrap">
        <img src="{image_data_uris[theme.slug]}" alt="{html.escape(theme.title)}" class="{img_class}" />
        <span class="badge-tier {badge_class}">{html.escape(theme.price_label)}</span>
      </div>
      <div class="theme-body">
        <div class="theme-meta-row">
          <span class="theme-category">{html.escape(theme.category)}</span>
          {promo_html}
        </div>
        <h3 class="theme-title">{html.escape(theme.title)}</h3>
        <p class="theme-desc">{html.escape(theme.description)}</p>
        <div class="feat-row">{features_html}</div>
      </div>
    </article>
    """


def build_catalog_html(image_data_uris: dict[str, str]) -> str:
    p1_cards = "".join(
        render_theme_card(t, image_data_uris, "2col") for t in STARTER_THEMES[:2]
    )
    p2_cards = "".join(
        render_theme_card(t, image_data_uris, "2col") for t in STARTER_THEMES[2:]
    )
    p3_cards = "".join(
        render_theme_card(t, image_data_uris, "3col") for t in SIGNATURE_THEMES[:3]
    )
    p4_cards = "".join(
        render_theme_card(t, image_data_uris, "2col") for t in SIGNATURE_THEMES[3:]
    )
    p5_cards = "".join(
        render_theme_card(t, image_data_uris, "3col") for t in MASTERPIECE_PART1_THEMES
    )
    p6_cards = "".join(
        render_theme_card(t, image_data_uris, "3col") for t in MASTERPIECE_PART2_THEMES
    )
    p7_cards = "".join(
        render_theme_card(t, image_data_uris, "2x2") for t in MASTERPIECE_PART3_THEMES
    )

    starter_names = "".join(
        f"<li><strong>{html.escape(t.title)}</strong> <span>Rp 50K</span></li>"
        for t in STARTER_THEMES
    )
    signature_names = "".join(
        f"<li><strong>{html.escape(t.title)}</strong> <span>Rp 70K</span></li>"
        for t in SIGNATURE_THEMES
    )
    masterpiece_names = "".join(
        f"<li><strong>{html.escape(t.title)}</strong> "
        f"<span>{'Promo 150K' if t.promo_note else 'Rp 150K'}</span></li>"
        for t in (
            MASTERPIECE_PART1_THEMES
            + MASTERPIECE_PART2_THEMES
            + MASTERPIECE_PART3_THEMES
        )
    )

    return f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>Katalog Resmi Tema 50K, 70K &amp; 150K - WD Digital Invitation</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

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
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: #FFFFFF;
      color: #1A1614;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }}

    .page {{
      width: 100%;
      height: 277mm;
      max-height: 277mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      page-break-after: always;
    }}

    .page:last-child {{
      page-break-after: auto;
    }}

    /* Running Header & Footer */
    .running-header {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 2.5mm;
      border-bottom: 1.5px solid #D4AF37;
      flex-shrink: 0;
    }}

    .brand-lockup {{
      display: flex;
      align-items: baseline;
      gap: 3mm;
    }}

    .brand-name {{
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 13pt;
      font-weight: 700;
      letter-spacing: 0.1em;
      color: #141210;
    }}

    .brand-sub {{
      font-size: 7.5pt;
      font-weight: 700;
      letter-spacing: 0.14em;
      color: #8B6914;
    }}

    .running-section {{
      font-size: 8pt;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: #4A3D2F;
      background: #FAF6EE;
      border: 1px solid #E2D5B8;
      padding: 1.2mm 3.5mm;
      border-radius: 99px;
    }}

    .page-footer {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 2.2mm;
      border-top: 1px solid #E5DEC9;
      font-size: 7.5pt;
      font-weight: 600;
      color: #5C5044;
      flex-shrink: 0;
    }}

    /* Cover Hero */
    .cover-hero {{
      background: linear-gradient(135deg, #141210 0%, #241E18 55%, #171412 100%);
      border: 1.5px solid #D4AF37;
      border-radius: 5mm;
      padding: 6mm 7mm;
      color: #FFFDF9;
      position: relative;
      overflow: hidden;
      flex-shrink: 0;
    }}

    .cover-kicker {{
      display: inline-block;
      font-size: 7.5pt;
      font-weight: 700;
      letter-spacing: 0.18em;
      color: #F3D88B;
      text-transform: uppercase;
      margin-bottom: 2mm;
    }}

    .cover-title {{
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 24pt;
      line-height: 1.08;
      font-weight: 700;
      color: #FFFDF9;
      margin-bottom: 2mm;
    }}

    .cover-title span {{
      color: #F3D88B;
    }}

    .cover-sub {{
      font-size: 9pt;
      line-height: 1.45;
      color: #E7DEC8;
      max-width: 145mm;
      margin-bottom: 4mm;
    }}

    .cover-bottom-bar {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 4mm;
      padding-top: 3.5mm;
      border-top: 1px solid rgba(212, 175, 55, 0.35);
    }}

    .tier-pills {{
      display: flex;
      gap: 2.5mm;
    }}

    .tier-pill {{
      background: rgba(255, 253, 249, 0.08);
      border: 1px solid rgba(243, 216, 139, 0.45);
      color: #FFFDF9;
      font-size: 7.8pt;
      font-weight: 700;
      padding: 1.4mm 3.2mm;
      border-radius: 99px;
    }}

    .tier-pill strong {{
      color: #F3D88B;
    }}

    .cover-contact {{
      font-size: 8pt;
      font-weight: 600;
      color: #F3D88B;
      text-align: right;
    }}

    /* Section Bars */
    .section-bar {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #FAF6EE;
      border-left: 4px solid #C59B27;
      border-top: 1px solid #EAE0C8;
      border-right: 1px solid #EAE0C8;
      border-bottom: 1px solid #EAE0C8;
      padding: 2.5mm 4mm;
      border-radius: 2.5mm;
      flex-shrink: 0;
    }}

    .section-bar-dark {{
      background: #1B1815;
      border-left: 4px solid #D4AF37;
      border-color: #3E3326;
      color: #FFFDF9;
    }}

    .section-bar-title {{
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 14pt;
      font-weight: 700;
      color: #1A1614;
      line-height: 1.15;
    }}

    .section-bar-dark .section-bar-title {{
      color: #F3D88B;
    }}

    .section-bar-sub {{
      font-size: 8pt;
      font-weight: 500;
      color: #5C5044;
      margin-top: 0.4mm;
    }}

    .section-bar-dark .section-bar-sub {{
      color: #DDD2BC;
    }}

    .section-badge {{
      font-size: 7.5pt;
      font-weight: 700;
      letter-spacing: 0.06em;
      padding: 1.2mm 3mm;
      border-radius: 99px;
      background: #141210;
      color: #F3D88B;
      white-space: nowrap;
    }}

    .section-bar-dark .section-badge {{
      background: #D4AF37;
      color: #141210;
    }}

    /* Grids */
    .grid-2col {{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 6mm;
      width: 100%;
    }}

    .grid-3col {{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4.5mm;
      width: 100%;
    }}

    .grid-2x2 {{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 5mm;
      width: 100%;
    }}

    /* Theme Cards */
    .theme-card {{
      background: #FFFDF9;
      border: 1px solid #E2D5B8;
      border-radius: 4mm;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }}

    .theme-media-wrap {{
      position: relative;
      width: 100%;
      background: #141210;
      overflow: hidden;
    }}

    .theme-img-2col {{
      display: block;
      width: 100%;
      height: 118mm;
      object-fit: cover;
      object-position: center;
    }}

    .theme-img-3col {{
      display: block;
      width: 100%;
      height: 81mm;
      object-fit: cover;
      object-position: center;
    }}

    .theme-img-2x2 {{
      display: block;
      width: 100%;
      height: 79mm;
      padding: 1.5mm 0;
      object-fit: contain;
      object-position: center;
      background: radial-gradient(circle at center, #26201A 0%, #141210 100%);
    }}

    .badge-tier {{
      position: absolute;
      top: 2.5mm;
      right: 2.5mm;
      padding: 1.1mm 2.8mm;
      border-radius: 99px;
      font-size: 7.2pt;
      font-weight: 800;
      letter-spacing: 0.04em;
    }}

    .badge-price {{
      background: #141210;
      color: #F3D88B;
      border: 1px solid #D4AF37;
    }}

    .badge-promo {{
      background: #9E2A2B;
      color: #FFFDF9;
      border: 1px solid #F3D88B;
    }}

    .theme-body {{
      padding: 3.2mm 3.8mm;
      display: flex;
      flex-direction: column;
      flex: 1;
    }}

    .theme-card-2x2 .theme-body {{
      padding: 2.6mm 3.5mm;
    }}

    .theme-meta-row {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2mm;
      margin-bottom: 1mm;
    }}

    .theme-category {{
      font-size: 7pt;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #8B6914;
      white-space: nowrap;
    }}

    .promo-strike {{
      font-size: 6.8pt;
      font-weight: 700;
      color: #9E2A2B;
      text-decoration: line-through;
      white-space: nowrap;
    }}

    .theme-title {{
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 13.5pt;
      font-weight: 700;
      color: #141210;
      line-height: 1.12;
      margin-bottom: 1.4mm;
    }}

    .theme-card-3col .theme-title {{
      font-size: 12.2pt;
    }}

    .theme-card-2x2 .theme-title {{
      font-size: 12.6pt;
      margin-bottom: 1mm;
    }}

    .theme-desc {{
      font-size: 7.9pt;
      line-height: 1.4;
      color: #42382E;
      margin-bottom: 2.5mm;
      flex: 1;
    }}

    .theme-card-3col .theme-desc {{
      font-size: 7.4pt;
      line-height: 1.36;
    }}

    .theme-card-2x2 .theme-desc {{
      font-size: 7.5pt;
      line-height: 1.32;
      margin-bottom: 1.8mm;
    }}

    .feat-row {{
      display: flex;
      flex-wrap: wrap;
      gap: 1.4mm;
    }}

    .feat-chip {{
      font-size: 6.8pt;
      font-weight: 600;
      color: #3D3328;
      background: #F4EFE4;
      border: 1px solid #E2D5B8;
      padding: 0.9mm 2.2mm;
      border-radius: 99px;
    }}

    /* Highlight Panels (Filling lower half cleanly on P2-P6) */
    .panel-box {{
      background: #FAF6EE;
      border: 1px solid #DFD1B2;
      border-radius: 4mm;
      padding: 4.5mm 5.5mm;
      flex-shrink: 0;
    }}

    .panel-dark {{
      background: linear-gradient(135deg, #161311 0%, #241D17 100%);
      border: 1.2px solid #D4AF37;
      color: #FFFDF9;
    }}

    .panel-head {{
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 3mm;
      padding-bottom: 2mm;
      border-bottom: 1px solid #E2D5B8;
    }}

    .panel-dark .panel-head {{
      border-bottom-color: rgba(212, 175, 55, 0.35);
    }}

    .panel-title {{
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 13.5pt;
      font-weight: 700;
      color: #1A1614;
    }}

    .panel-dark .panel-title {{
      color: #F3D88B;
    }}

    .panel-kicker {{
      font-size: 7.5pt;
      font-weight: 700;
      color: #8B6914;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }}

    .panel-dark .panel-kicker {{
      color: #E2D5B8;
    }}

    .spec-4grid {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 3.2mm;
      margin-bottom: 3mm;
    }}

    .spec-card {{
      background: #FFFFFF;
      border: 1px solid #E2D5B8;
      border-radius: 2.8mm;
      padding: 2.6mm 3mm;
    }}

    .panel-dark .spec-card {{
      background: rgba(255, 253, 249, 0.06);
      border-color: rgba(212, 175, 55, 0.35);
    }}

    .spec-label {{
      font-size: 6.9pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #8B6914;
      margin-bottom: 0.8mm;
    }}

    .panel-dark .spec-label {{
      color: #F3D88B;
    }}

    .spec-val {{
      font-size: 9pt;
      font-weight: 800;
      color: #141210;
      margin-bottom: 0.8mm;
    }}

    .panel-dark .spec-val {{
      color: #FFFDF9;
    }}

    .spec-note {{
      font-size: 7.2pt;
      line-height: 1.35;
      color: #4A3F35;
    }}

    .panel-dark .spec-note {{
      color: #DDD2BC;
    }}

    .panel-2grid {{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 4mm;
    }}

    .checklist {{
      list-style: none;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.8mm 4mm;
    }}

    .checklist li {{
      font-size: 7.8pt;
      color: #2B231C;
      font-weight: 600;
    }}

    .panel-dark .checklist li {{
      color: #F4EDE0;
    }}

    .checklist li::before {{
      content: "✓ ";
      color: #A67C00;
      font-weight: 800;
    }}

    .panel-dark .checklist li::before {{
      color: #F3D88B;
    }}

    .check-pill-row {{
      display: flex;
      flex-wrap: wrap;
      gap: 2mm;
    }}

    .check-pill {{
      font-size: 7.5pt;
      font-weight: 600;
      color: #2D241C;
      background: #FFFFFF;
      border: 1px solid #DFD1B2;
      padding: 1.2mm 3mm;
      border-radius: 99px;
    }}

    /* Page 8 Comparison Matrix & Directory */
    .matrix-table {{
      width: 100%;
      border-collapse: collapse;
      font-size: 7.7pt;
      border: 1px solid #DFD1B2;
      border-radius: 3mm;
      overflow: hidden;
    }}

    .matrix-table th {{
      background: #141210;
      color: #F3D88B;
      font-weight: 700;
      text-align: left;
      padding: 2.3mm 3mm;
      border-bottom: 1.5px solid #D4AF37;
    }}

    .matrix-table td {{
      padding: 1.9mm 3mm;
      border-bottom: 1px solid #EAE0C8;
      color: #2B231C;
      vertical-align: middle;
    }}

    .matrix-table tr:nth-child(even) td {{
      background: #FAF6EE;
    }}

    .matrix-table td.col-feature {{
      font-weight: 700;
      color: #141210;
    }}

    .matrix-table td.col-vvip {{
      font-weight: 700;
      color: #6B4D00;
    }}

    .directory-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr 1.35fr;
      gap: 3.5mm;
    }}

    .dir-card {{
      background: #FAF6EE;
      border: 1px solid #DFD1B2;
      border-radius: 3mm;
      padding: 2.8mm 3.3mm;
      display: flex;
      flex-direction: column;
    }}

    .dir-title {{
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 11.2pt;
      font-weight: 700;
      color: #141210;
      padding-bottom: 1.5mm;
      margin-bottom: 2mm;
      border-bottom: 1px solid #DFD1B2;
    }}

    .dir-list {{
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 1.4mm;
      flex: 1;
      justify-content: center;
    }}

    .dir-list-2col {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.4mm 2.8mm;
      align-content: center;
    }}

    .dir-list li {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 6.7pt;
      line-height: 1.25;
      color: #2B231C;
      gap: 1.2mm;
    }}

    .dir-list li span {{
      font-weight: 700;
      color: #8B6914;
      white-space: nowrap;
    }}

    .footnote-250k {{
      font-size: 7.2pt;
      color: #4A3F35;
      background: #F4EFE4;
      border-left: 3px solid #8B6914;
      padding: 1.8mm 3mm;
      border-radius: 1.5mm;
    }}

    .cta-box {{
      background: linear-gradient(135deg, #141210 0%, #261F18 100%);
      border: 1.5px solid #D4AF37;
      border-radius: 4mm;
      padding: 4.5mm 6mm;
      color: #FFFDF9;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 5mm;
    }}

    .cta-copy h3 {{
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 15pt;
      color: #F3D88B;
      margin-bottom: 1.2mm;
    }}

    .cta-copy p {{
      font-size: 7.9pt;
      line-height: 1.4;
      color: #E7DEC8;
      max-width: 105mm;
    }}

    .cta-contacts {{
      display: flex;
      flex-direction: column;
      gap: 2mm;
      flex-shrink: 0;
    }}

    .cta-pill {{
      background: #D4AF37;
      color: #141210;
      font-size: 8.2pt;
      font-weight: 800;
      padding: 2mm 4mm;
      border-radius: 2.5mm;
      text-align: center;
    }}

    .cta-pill-outline {{
      background: rgba(255, 253, 249, 0.08);
      border: 1px solid #F3D88B;
      color: #FFFDF9;
      font-size: 8pt;
      font-weight: 700;
      padding: 1.8mm 4mm;
      border-radius: 2.5mm;
      text-align: center;
    }}
  </style>
</head>
<body>

  <!-- PAGE 1: Cover Hero + Starter 50K Part 1 -->
  <section class="page">
    {render_running_header("EDISI LENGKAP 50K • 70K • 150K")}

    <div class="cover-hero">
      <span class="cover-kicker">WD Digital Invitation &bull; Kurasi Tema Pernikahan Digital</span>
      <h1 class="cover-title">Katalog Tema Resmi <span>50K, 70K &amp; 150K</span></h1>
      <p class="cover-sub">
        Kumpulan 19 desain undangan pernikahan digital siap pakai dari lini Starter yang ekonomis,
        Signature Adat Nusantara berkarakter budaya, hingga Masterpiece VVIP dengan AR Photobooth,
        Tiket VIP Barcode, dan tampilan Desktop Split-Screen 50/50.
      </p>
      <div class="cover-bottom-bar">
        <div class="tier-pills">
          <div class="tier-pill"><strong>4 Tema</strong> Starter 50K</div>
          <div class="tier-pill"><strong>5 Tema</strong> Signature Adat 70K</div>
          <div class="tier-pill"><strong>10 Tema</strong> Masterpiece 150K</div>
        </div>
        <div class="cover-contact">
          WhatsApp CS: 0857-0790-9415 &bull; IG: @wdgroupcompany
        </div>
      </div>
    </div>

    <div class="section-bar">
      <div>
        <div class="section-bar-title">01 | Paket Starter : Rp 50.000</div>
        <div class="section-bar-sub">Desain bersih modern dan elegan untuk pernikahan minimalis hingga pesta kebun</div>
      </div>
      <span class="section-badge">HALAMAN 1 DARI 2</span>
    </div>

    <div class="grid-2col">
      {p1_cards}
    </div>

    {render_page_footer("Paket Starter 50K (1/2)", 1)}
  </section>

  <!-- PAGE 2: Starter 50K Part 2 + Feature Specs -->
  <section class="page">
    {render_running_header("PAKET STARTER • RP 50.000")}

    <div class="section-bar">
      <div>
        <div class="section-bar-title">01 | Paket Starter : Rp 50.000 (Lanjutan)</div>
        <div class="section-bar-sub">Rose Gold Romance &amp; Terracotta Boho Rustic siap aktif dalam 2-3 hari kerja</div>
      </div>
      <span class="section-badge">HALAMAN 2 DARI 2</span>
    </div>

    <div class="grid-2col">
      {p2_cards}
    </div>

    <div class="panel-box">
      <div class="panel-head">
        <div class="panel-title">Standar Layanan &amp; Fitur Paket Starter 50K</div>
        <div class="panel-kicker">Semua 4 Tema Paket 50K Sudah Termasuk</div>
      </div>
      <div class="spec-4grid">
        <div class="spec-card">
          <div class="spec-label">Masa Aktif</div>
          <div class="spec-val">1 Bulan Penuh</div>
          <div class="spec-note">Tautan aktif untuk sebar undangan hingga hari H acara.</div>
        </div>
        <div class="spec-card">
          <div class="spec-label">Pengerjaan</div>
          <div class="spec-val">2-3 Hari Kerja</div>
          <div class="spec-note">Diproses rapi sesuai urutan materi foto dan data acara.</div>
        </div>
        <div class="spec-card">
          <div class="spec-label">Revisi Desain</div>
          <div class="spec-val">Maks. 2x Revisi</div>
          <div class="spec-note">Koreksi penulisan nama, lokasi, jadwal, dan penyesuaian teks.</div>
        </div>
        <div class="spec-card">
          <div class="spec-label">Galeri &amp; Tamu</div>
          <div class="spec-val">5 Foto &bull; Unlimited</div>
          <div class="spec-note">Kustom link nama tamu tak terbatas beserta amplop QRIS.</div>
        </div>
      </div>
      <div class="check-pill-row">
        <span class="check-pill">&#10003; Amplop Digital &amp; QRIS</span>
        <span class="check-pill">&#10003; Navigasi Google Maps</span>
        <span class="check-pill">&#10003; Hitung Mundur Acara</span>
        <span class="check-pill">&#10003; Buku Tamu Ucapan</span>
        <span class="check-pill">&#10003; Musik Latar Otomatis</span>
      </div>
    </div>

    {render_page_footer("Paket Starter 50K (2/2)", 2)}
  </section>

  <!-- PAGE 3: Signature Adat 70K Part 1 (3 themes) + Cultural Highlights -->
  <section class="page">
    {render_running_header("PAKET SIGNATURE ADAT • RP 70.000")}

    <div class="section-bar">
      <div>
        <div class="section-bar-title">02 | Paket Signature Adat : Rp 70.000</div>
        <div class="section-bar-sub">Koleksi tema budaya Nusantara berkarakter khas daerah dengan galeri lightbox 8 foto</div>
      </div>
      <span class="section-badge">HALAMAN 1 DARI 2</span>
    </div>

    <div class="grid-3col">
      {p3_cards}
    </div>

    <div class="panel-box">
      <div class="panel-head">
        <div class="panel-title">Keunggulan Eksklusif Koleksi Signature Adat (Rp 70.000)</div>
        <div class="panel-kicker">Upgrade Fitur dari Paket Starter</div>
      </div>
      <div class="spec-4grid">
        <div class="spec-card">
          <div class="spec-label">Pengerjaan Cepat</div>
          <div class="spec-val">1-2 Hari Kerja</div>
          <div class="spec-note">Antrean prioritas dengan sentuhan ornamen adat pilihan.</div>
        </div>
        <div class="spec-card">
          <div class="spec-label">Revisi Lebih Leluasa</div>
          <div class="spec-val">Maks. 3x Revisi</div>
          <div class="spec-note">Penyesuaian foto galeri, susunan acara, dan kutipan doa.</div>
        </div>
        <div class="spec-card">
          <div class="spec-label">Galeri Prewedding</div>
          <div class="spec-val">Hingga 8 Foto</div>
          <div class="spec-note">Dilengkapi tampilan lightbox layar penuh yang jernih.</div>
        </div>
        <div class="spec-card">
          <div class="spec-label">Ornamen Adat</div>
          <div class="spec-val">5 Budaya Resmi</div>
          <div class="spec-note">Sunda, Minang, Bali, Melayu KL, hingga Maroko Islami.</div>
        </div>
      </div>
      <ul class="checklist">
        <li>Semua fitur dasar Paket Starter 50K sudah termasuk lengkap</li>
        <li>Linimasa Kisah Cinta (Pertemuan, Lamaran, hingga Akad)</li>
        <li>Panduan Dresscode warna busana untuk tamu undangan</li>
        <li>Buku Tamu Live Wishes &amp; Pengingat Google Calendar</li>
      </ul>
    </div>

    {render_page_footer("Paket Signature Adat 70K (1/2)", 3)}
  </section>

  <!-- PAGE 4: Signature Adat 70K Part 2 (2 themes) + Upgrade Bridge -->
  <section class="page">
    {render_running_header("PAKET SIGNATURE ADAT • RP 70.000")}

    <div class="section-bar">
      <div>
        <div class="section-bar-title">02 | Paket Signature Adat : Rp 70.000 (Lanjutan)</div>
        <div class="section-bar-sub">Kuala Lumpur Heritage (Melayu Diraja) &amp; Moroccan Arabian Nights (Islami Klasik)</div>
      </div>
      <span class="section-badge">HALAMAN 2 DARI 2</span>
    </div>

    <div class="grid-2col">
      {p4_cards}
    </div>

    <div class="panel-box panel-dark">
      <div class="panel-head">
        <div class="panel-title">Ingin Pengalaman VVIP dengan Kamera AR &amp; Tiket Barcode?</div>
        <div class="panel-kicker">Halaman Berikutnya: Koleksi 150K</div>
      </div>
      <div class="panel-2grid">
        <div>
          <div class="spec-note" style="font-size: 8.1pt; line-height: 1.5;">
            Pada lini <strong>Masterpiece VVIP Rp 150.000</strong> (mulai Halaman 5), undangan Anda dilengkapi
            tampilan <strong>Desktop 50/50 Split Screen</strong>, animasi pembuka gerbang keraton atau resort,
            serta <strong>AR Photobooth</strong> langsung dari peramban ponsel tamu tanpa instal aplikasi.
          </div>
        </div>
        <ul class="checklist">
          <li>10 Tema Masterpiece &amp; Keraton Agung</li>
          <li>Tiket VIP Barcode Code-128 &amp; QR Scan</li>
          <li>Floating Vinyl Player &amp; Soundwave</li>
          <li>Revisi bebas s/d hari H &amp; proses 24 Jam</li>
        </ul>
      </div>
    </div>

    {render_page_footer("Paket Signature Adat 70K (2/2)", 4)}
  </section>

  <!-- PAGE 5: Masterpiece 150K Part 1 (Modern Royal, Celestial, Sakura) -->
  <section class="page">
    {render_running_header("PAKET MASTERPIECE VVIP • RP 150.000")}

    <div class="section-bar section-bar-dark">
      <div>
        <div class="section-bar-title">03 | Paket Masterpiece VVIP : Rp 150.000</div>
        <div class="section-bar-sub">Koleksi Modern Royal, Midnight Celestial Star (Promo 150K), dan Sakura Kyoto Blossom</div>
      </div>
      <span class="section-badge">HALAMAN 1 DARI 3</span>
    </div>

    <div class="grid-3col">
      {p5_cards}
    </div>

    <div class="panel-box panel-dark">
      <div class="panel-head">
        <div class="panel-title">Teknologi Interaktif Khusus Paket Masterpiece 150K</div>
        <div class="panel-kicker">4 Pilar Pengalaman Tamu VVIP</div>
      </div>
      <div class="spec-4grid" style="margin-bottom: 0;">
        <div class="spec-card">
          <div class="spec-label">01 Kamera Tamu</div>
          <div class="spec-val">AR Photobooth</div>
          <div class="spec-note">Tamu bisa swafoto memakai bingkai pernikahan resmi langsung di undangan.</div>
        </div>
        <div class="spec-card">
          <div class="spec-label">02 Akses Masuk</div>
          <div class="spec-val">VIP Barcode &amp; QR</div>
          <div class="spec-note">Kartu undangan personal lengkap Barcode Code-128 dan QR check-in resepsi.</div>
        </div>
        <div class="spec-card">
          <div class="spec-label">03 Layar Lebar</div>
          <div class="spec-val">Desktop Split 50/50</div>
          <div class="spec-note">Panel sampul tetap di sisi kiri saat tamu menelusuri isi acara di kanan.</div>
        </div>
        <div class="spec-card">
          <div class="spec-label">04 Audio &amp; Efek</div>
          <div class="spec-val">Vinyl &amp; Particles</div>
          <div class="spec-note">Piringan vinyl berputar dengan soundwave equalizer dan partikel tematik hidup.</div>
        </div>
      </div>
    </div>

    {render_page_footer("Paket Masterpiece 150K (1/3)", 5)}
  </section>

  <!-- PAGE 6: Masterpiece 150K Part 2 (Nirwana Resort, Royal Wayang, Batak Maroon) -->
  <section class="page">
    {render_running_header("PAKET MASTERPIECE VVIP • RP 150.000")}

    <div class="section-bar section-bar-dark">
      <div>
        <div class="section-bar-title">03 | Paket Masterpiece VVIP : Resort &amp; Keraton Agung</div>
        <div class="section-bar-sub">Dilengkapi animasi gerbang terbuka sebelum tamu masuk ke isi utama undangan</div>
      </div>
      <span class="section-badge">HALAMAN 2 DARI 3</span>
    </div>

    <div class="grid-3col">
      {p6_cards}
    </div>

    <div class="panel-box">
      <div class="panel-head">
        <div class="panel-title">Keistimewaan Seri Resort &amp; Adat Keraton 150K</div>
        <div class="panel-kicker">Gerbang Interaktif &bull; Prioritas VVIP</div>
      </div>
      <div class="spec-4grid">
        <div class="spec-card">
          <div class="spec-label">Pembuka Acara</div>
          <div class="spec-val">Gerbang Interaktif</div>
          <div class="spec-note">Animasi pintu resort, gebyok wayang, atau pintu Gorga Batak terbuka halus.</div>
        </div>
        <div class="spec-card">
          <div class="spec-label">Galeri Premium</div>
          <div class="spec-val">Editorial 4-Tab</div>
          <div class="spec-note">Pengelompokan foto terstruktur rapi per sesi momen prewedding Anda.</div>
        </div>
        <div class="spec-card">
          <div class="spec-label">Prioritas Antrean</div>
          <div class="spec-val">24 Jam / Same-Day</div>
          <div class="spec-note">Pengerjaan ekspres prioritas dan pendampingan admin khusus VVIP Concierge.</div>
        </div>
        <div class="spec-card">
          <div class="spec-label">Jaminan Koreksi</div>
          <div class="spec-val">Bebas s/d Hari H</div>
          <div class="spec-note">Fleksibilitas penyesuaian data acara dan daftar tamu sampai hari pernikahan.</div>
        </div>
      </div>
      <ul class="checklist">
        <li>Seluruh fitur Paket 50K dan Signature Adat 70K otomatis aktif</li>
        <li>Dukungan multi-sesi acara (Pengajian, Siraman, Akad, hingga Resepsi)</li>
        <li>Efek partikel emas, kelopak bunga, atau bintang sesuai karakter tema</li>
        <li>Siap tampil optimal di iPhone, Android, Tablet, hingga layar Laptop/Desktop</li>
      </ul>
    </div>

    {render_page_footer("Paket Masterpiece 150K (2/3)", 6)}
  </section>

  <!-- PAGE 7: Masterpiece 150K Part 3 (4 Themes in 2x2 Grid) -->
  <section class="page">
    {render_running_header("PAKET MASTERPIECE VVIP • RP 150.000")}

    <div class="section-bar section-bar-dark">
      <div>
        <div class="section-bar-title">03 | Paket Masterpiece VVIP : Klasik &amp; Floral Luxury</div>
        <div class="section-bar-sub">Empat koleksi penutup lini 150K dengan balutan batik keraton, maroon foil, dan taman bunga</div>
      </div>
      <span class="section-badge">HALAMAN 3 DARI 3</span>
    </div>

    <div class="grid-2x2">
      {p7_cards}
    </div>

    {render_page_footer("Paket Masterpiece 150K (3/3)", 7)}
  </section>

  <!-- PAGE 8: Full Comparison Matrix + 19-Theme Directory + Official Order CTA -->
  <section class="page">
    {render_running_header("PERBANDINGAN PAKET & PEMESANAN")}

    <div class="section-bar">
      <div>
        <div class="section-bar-title">04 | Perbandingan Fitur Resmi &amp; Direktori 19 Tema</div>
        <div class="section-bar-sub">Ringkasan lengkap spesifikasi Starter 50K, Signature Adat 70K, dan Masterpiece VVIP 150K</div>
      </div>
      <span class="section-badge">TOTAL 19 TEMA</span>
    </div>

    <table class="matrix-table">
      <thead>
        <tr>
          <th style="width: 31%;">Fitur &amp; Layanan Utama</th>
          <th style="width: 21%;">Starter (50K)</th>
          <th style="width: 23%;">Signature Adat (70K)</th>
          <th style="width: 25%;">Masterpiece VVIP (150K)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="col-feature">Harga Paket &amp; Jumlah Tema</td>
          <td>Rp 50.000 (4 Tema)</td>
          <td>Rp 70.000 (5 Tema Adat)</td>
          <td class="col-vvip">Rp 150.000 (10 Tema VVIP)</td>
        </tr>
        <tr>
          <td class="col-feature">Estimasi Pengerjaan</td>
          <td>2-3 Hari Kerja</td>
          <td>1-2 Hari Kerja</td>
          <td class="col-vvip">Prioritas 24 Jam / Same-Day</td>
        </tr>
        <tr>
          <td class="col-feature">Kuota Revisi Konten</td>
          <td>Maks. 2x Revisi</td>
          <td>Maks. 3x Revisi</td>
          <td class="col-vvip">Revisi Bebas s/d Hari H</td>
        </tr>
        <tr>
          <td class="col-feature">Galeri Foto Prewedding</td>
          <td>Maks. 5 Foto</td>
          <td>Hingga 8 Foto (Lightbox)</td>
          <td class="col-vvip">Editorial 4-Tab Gallery</td>
        </tr>
        <tr>
          <td class="col-feature">Nama Tamu, Maps, RSVP &amp; QRIS</td>
          <td>&#10003; Termasuk Lengkap</td>
          <td>&#10003; + Live Wishes &amp; Kalender</td>
          <td class="col-vvip">&#10003; + VVIP Concierge</td>
        </tr>
        <tr>
          <td class="col-feature">Kisah Cinta &amp; Panduan Busana</td>
          <td>Standar</td>
          <td>&#10003; Timeline &amp; Dresscode</td>
          <td class="col-vvip">&#10003; Editorial Story &amp; Dresscode</td>
        </tr>
        <tr>
          <td class="col-feature">Desktop 50/50 Split Screen</td>
          <td>Layar Responsif Tunggal</td>
          <td>Layar Responsif Tunggal</td>
          <td class="col-vvip">&#10003; Kiri Tetap, Kanan Aktif</td>
        </tr>
        <tr>
          <td class="col-feature">AR Photobooth Kamera</td>
          <td>Belum Tersedia</td>
          <td>Belum Tersedia</td>
          <td class="col-vvip">&#10003; Frame Kamera Langsung</td>
        </tr>
        <tr>
          <td class="col-feature">E-Ticket VIP Barcode &amp; QR</td>
          <td>Belum Tersedia</td>
          <td>Belum Tersedia</td>
          <td class="col-vvip">&#10003; Barcode Code-128 &amp; QR</td>
        </tr>
        <tr>
          <td class="col-feature">Audio Player &amp; Efek Visual</td>
          <td>Musik Latar Otomatis</td>
          <td>Musik Latar + Ornamen Adat</td>
          <td class="col-vvip">&#10003; Vinyl + Soundwave + Particles</td>
        </tr>
      </tbody>
    </table>

    <div class="directory-grid">
      <div class="dir-card">
        <div class="dir-title">Starter 50K (4 Tema)</div>
        <ul class="dir-list">
          {starter_names}
        </ul>
      </div>
      <div class="dir-card">
        <div class="dir-title">Signature Adat 70K (5 Tema)</div>
        <ul class="dir-list">
          {signature_names}
        </ul>
      </div>
      <div class="dir-card">
        <div class="dir-title">Masterpiece VVIP 150K (10 Tema)</div>
        <ul class="dir-list dir-list-2col">
          {masterpiece_names}
        </ul>
      </div>
    </div>

    <div class="footnote-250k">
      <strong>Catatan Katalog:</strong> Tema <em>Midnight Celestial Star</em> sedang dalam masa promo Rp 150.000
      (dari harga normal Rp 250.000). Untuk kebutuhan kustom penuh atau tema kelas eksklusif <strong>Rp 250.000</strong>
      seperti <em>Burgundy Wine Classic</em>, silakan hubungi admin CS kami.
    </div>

    <div class="cta-box">
      <div class="cta-copy">
        <h3>Pesan Sekarang &amp; Coba Link Demo Interaktif</h3>
        <p>
          Kirimkan nama tema yang Anda minati melalui WhatsApp untuk mendapatkan tautan pratinjau langsung
          di ponsel Anda, sekaligus konsultasi persiapan foto dan data mempelai bersama tim WD Digital Invitation.
        </p>
      </div>
      <div class="cta-contacts">
        <div class="cta-pill">WhatsApp CS: 0857-0790-9415</div>
        <div class="cta-pill-outline">Instagram: @wdgroupcompany</div>
      </div>
    </div>

    {render_page_footer("Perbandingan Paket & Direktori Lengkap", 8)}
  </section>

</body>
</html>
"""


def render_pdf_with_chrome(html_path: str, pdf_path: str) -> None:
    chrome_candidates = ("google-chrome", "chromium", "chromium-browser")
    chrome_bin = None
    for candidate in chrome_candidates:
        if subprocess.run(["which", candidate], capture_output=True).returncode == 0:
            chrome_bin = candidate
            break

    if not chrome_bin:
        raise RuntimeError("No Chromium/Chrome executable found in PATH")

    command = [
        chrome_bin,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--print-to-pdf-no-header",
        f"--print-to-pdf={pdf_path}",
        f"file://{html_path}",
    ]
    subprocess.run(command, check=True)


def main() -> None:
    all_themes: Sequence[ThemeCard] = (
        STARTER_THEMES
        + SIGNATURE_THEMES
        + MASTERPIECE_PART1_THEMES
        + MASTERPIECE_PART2_THEMES
        + MASTERPIECE_PART3_THEMES
    )
    image_data_uris = {
        theme.slug: load_image_data_uri(theme.image_path) for theme in all_themes
    }
    print(f"Loaded {len(image_data_uris)} theme previews cleanly.")

    html_content = build_catalog_html(image_data_uris)
    with open(HTML_OUTPUT_PATH, "w", encoding="utf-8") as html_file:
        html_file.write(html_content)
    print(f"Wrote catalog HTML: {HTML_OUTPUT_PATH}")

    render_pdf_with_chrome(HTML_OUTPUT_PATH, PDF_OUTPUT_PATH)
    size_mb = os.path.getsize(PDF_OUTPUT_PATH) / (1024 * 1024)
    print(f"Generated PDF: {PDF_OUTPUT_PATH} ({size_mb:.2f} MB)")


if __name__ == "__main__":
    main()

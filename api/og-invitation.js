export default function handler(req, res) {
  const { slug = '', to = '' } = req.query || {};
  const rawSlug = String(slug || '').toLowerCase().trim();
  const guestName = String(to || '').trim();

  const domain = 'https://rsvp.wdgroupcompany.biz.id';

  let couple = {
    title: 'The Wedding of Audi & Ovyola',
    groom: 'Audi',
    bride: 'Ovyola',
    date: 'Sabtu, 9 Januari 2027',
    venue: 'Gedung Sus PG Rejosari',
    image: `${domain}/og-audi-ovyola.jpg`,
    path: '/invitation/audi-ovyola',
  };

  if (rawSlug.includes('audi') || rawSlug.includes('ovyola')) {
    couple = {
      title: 'The Wedding of Audi & Ovyola',
      groom: 'Audi',
      bride: 'Ovyola',
      date: 'Sabtu, 9 Januari 2027',
      venue: 'Gedung Sus PG Rejosari',
      image: `${domain}/og-audi-ovyola.jpg`,
      path: '/invitation/audi-ovyola',
    };
  } else if (rawSlug.includes('yoga') || rawSlug.includes('fatma') || rawSlug.includes('nirwana')) {
    couple = {
      title: 'The Wedding of Yoga & Fatma',
      groom: 'Yoga',
      bride: 'Fatma',
      date: "Jum'at, 26 Maret 2027",
      venue: 'Hotel Nirwana Sarangan',
      image: `${domain}/themes/nirwana-sarangan/nirwana-theme-preview.png`,
      path: '/invitation/yoga-fatma',
    };
  } else if (rawSlug.includes('hafiz') || rawSlug.includes('syafika') || rawSlug.includes('kuala-lumpur')) {
    couple = {
      title: 'Walimatulurus Hafiz & Syafika',
      groom: 'Hafiz',
      bride: 'Syafika',
      date: 'Sabtu, 12 Desember 2026',
      venue: 'Kuala Lumpur Heritage',
      image: `${domain}/themes/kuala-lumpur-heritage/cover-skyline.jpg`,
      path: '/invitation/hafiz-syafika',
    };
  } else if (rawSlug.includes('agni') || rawSlug.includes('kribo')) {
    couple = {
      title: 'The Wedding of Agni & Putri',
      groom: 'Agni',
      bride: 'Putri',
      date: 'Jumat, 20 November 2026',
      venue: 'Kahuripan Hall',
      image: `${domain}/og-agni-kahuripan.jpg`,
      path: '/invitation/agni-putri',
    };
  } else if (rawSlug.includes('bima') || rawSlug.includes('ratna')) {
    couple = {
      title: 'The Wedding of Bima & Ratna',
      groom: 'Bima',
      bride: 'Ratna',
      date: 'Minggu, 15 November 2026',
      venue: 'Pendopo Agung',
      image: `${domain}/og-audi-ovyola.jpg`,
      path: '/invitation/bima-ratna',
    };
  } else if (rawSlug.includes('steven') || rawSlug.includes('bunga')) {
    couple = {
      title: 'The Wedding of Steven & Bunga',
      groom: 'Steven',
      bride: 'Bunga',
      date: 'Sabtu, 28 November 2026',
      venue: 'Grand Ballroom',
      image: `${domain}/og-audi-ovyola.jpg`,
      path: '/invitation/steven-bunga',
    };
  }

  const querySuffix = guestName ? `?to=${encodeURIComponent(guestName)}` : '';
  const targetUrl = `${domain}${couple.path}${querySuffix}`;

  const description = guestName
    ? `Kepada Yth. Bapak/Ibu/Saudara/i ${guestName}, kami mengundang Anda untuk menghadiri acara pernikahan ${couple.groom} & ${couple.bride}. ${couple.date} • ${couple.venue}.`
    : `Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan ${couple.groom} & ${couple.bride}. ${couple.date} • ${couple.venue}.`;

  const escapeHtml = (str) =>
    String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  const safeTitle = escapeHtml(couple.title);
  const safeDesc = escapeHtml(description);
  const safeImg = escapeHtml(couple.image);
  const safeUrl = escapeHtml(targetUrl);
  const imgType = safeImg.endsWith('.png') ? 'image/png' : 'image/jpeg';

  const html = `<!doctype html>
<html lang="id" prefix="og: http://ogp.me/ns#">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeTitle}</title>
  <meta name="description" content="${safeDesc}">
  <link rel="canonical" href="${safeUrl}">
  <link rel="image_src" href="${safeImg}">

  <!-- Open Graph / WhatsApp / Facebook Preview -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${safeUrl}">
  <meta property="og:site_name" content="WD Production Undangan Digital">
  <meta property="og:title" content="${safeTitle}">
  <meta property="og:description" content="${safeDesc}">
  <meta property="og:image" content="${safeImg}">
  <meta property="og:image:secure_url" content="${safeImg}">
  <meta property="og:image:type" content="${imgType}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${safeTitle}">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${safeUrl}">
  <meta name="twitter:title" content="${safeTitle}">
  <meta name="twitter:description" content="${safeDesc}">
  <meta name="twitter:image" content="${safeImg}">

  <!-- Schema.org Microdata -->
  <meta itemprop="name" content="${safeTitle}">
  <meta itemprop="description" content="${safeDesc}">
  <meta itemprop="image" content="${safeImg}">

  <meta http-equiv="refresh" content="0;url=${safeUrl}">
</head>
<body style="margin:0;padding:40px;background:#0d0905;color:#e6ca85;font-family:system-ui,-apple-system,sans-serif;text-align:center;">
  <div style="max-width:480px;margin:0 auto;border:1px solid rgba(212,175,55,0.3);border-radius:16px;padding:32px 24px;background:rgba(20,14,8,0.85);backdrop-filter:blur(8px);">
    <h1 style="font-size:22px;margin:0 0 12px;color:#fcd34d;">${safeTitle}</h1>
    <p style="font-size:14px;line-height:1.6;color:#e5e7eb;margin-bottom:24px;">${safeDesc}</p>
    <a href="${safeUrl}" style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#d4af37,#aa7c11);color:#0a0704;font-weight:bold;text-decoration:none;border-radius:9999px;font-size:14px;box-shadow:0 4px 14px rgba(212,175,55,0.4);">Buka Undangan</a>
  </div>
  <script>
    window.location.replace("${safeUrl}");
  </script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400');
  res.status(200).send(html);
}

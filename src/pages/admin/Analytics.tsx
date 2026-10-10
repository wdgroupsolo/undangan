import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Eye, 
  Users, 
  MessageSquareHeart, 
  UtensilsCrossed, 
  Calendar, 
  Clock, 
  MapPin, 
  Gift, 
  Smartphone, 
  Laptop, 
  Share2, 
  Download, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowUpRight, 
  RefreshCw,
  QrCode,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { analyticsService, AnalyticsSummary } from '../../services/analyticsService';
import { invitationService } from '../../services/invitationService';

export const Analytics: React.FC = () => {
  const [selectedInvitationId, setSelectedInvitationId] = useState<string | 'all'>('all');
  const [daysRange, setDaysRange] = useState<number>(7);
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);
  const [hoveredDonutSegment, setHoveredDonutSegment] = useState<string | null>(null);

  // 1. Fetch Invitations List for Dropdown
  const { data: invitations = [] } = useQuery({
    queryKey: ['invitationsList'],
    queryFn: invitationService.getInvitations
  });

  // 2. Fetch Analytics Data
  const { data: analytics, isLoading, refetch, isFetching } = useQuery<AnalyticsSummary>({
    queryKey: ['analyticsData', selectedInvitationId, daysRange],
    queryFn: () => analyticsService.getAnalytics(selectedInvitationId, daysRange)
  });

  // Export Analytics CSV
  const handleExportCSV = () => {
    if (!analytics) return;

    const rows = [
      ['METRIK ANALYTICS UNDANGAN DIGITAL WD GROUP'],
      ['Judul Undangan', analytics.invitationTitle],
      ['Rentang Waktu', `${daysRange} Hari Terakhir`],
      ['Tanggal Laporan', new Date().toLocaleDateString('id-ID')],
      [],
      ['RINGKASAN UTAMA'],
      ['Total Kunjungan (Views)', analytics.totalViews],
      ['Pengunjung Unik', analytics.uniqueVisitors],
      ['Total Tamu Undangan', analytics.totalGuests],
      ['Tingkat Respons RSVP', `${analytics.responseRate}%`],
      ['Estimasi Porsi Makanan (Pax)', analytics.estimatedPax],
      [],
      ['STATUS KEHADIRAN RSVP'],
      ['Konfirmasi Hadir', analytics.attendingCount],
      ['Konfirmasi Tidak Hadir', analytics.notAttendingCount],
      ['Konfirmasi Masih Ragu', analytics.maybeCount],
      ['Belum Mengisi RSVP', analytics.pendingCount],
      [],
      ['TREN KUNJUNGAN HARIAN'],
      ['Tanggal', 'Hari', 'Total Kunjungan', 'Pengunjung Unik'],
      ...analytics.trafficHistory.map(t => [t.date, t.dayLabel, t.views, t.uniqueVisitors]),
      [],
      ['PERANGKAT PENGUNJUNG'],
      ...analytics.deviceBreakdown.map(d => [d.device, `${d.percentage}%`, d.count]),
      [],
      ['SUMBER KUNJUNGAN'],
      ...analytics.trafficSources.map(s => [s.source, `${s.percentage}%`, s.count])
    ];

    const csvContent = '\uFEFF' + rows.map(r => r.join(',')).join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Analytics_${analytics.invitationTitle.replace(/\s+/g, '_')}_${daysRange}Hari.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Interactive SVG Area Chart Calculations
  const chartMetrics = useMemo(() => {
    if (!analytics || analytics.trafficHistory.length === 0) return null;

    const data = analytics.trafficHistory;
    const maxViews = Math.max(...data.map(d => d.views), 10);
    const width = 680;
    const height = 240;
    const paddingX = 40;
    const paddingY = 30;

    const chartW = width - paddingX * 2;
    const chartH = height - paddingY * 2;

    const pointsViews = data.map((d, i) => {
      const x = paddingX + (i / (data.length - 1)) * chartW;
      const y = height - paddingY - (d.views / maxViews) * chartH;
      return { x, y, ...d };
    });

    const pointsUnique = data.map((d, i) => {
      const x = paddingX + (i / (data.length - 1)) * chartW;
      const y = height - paddingY - (d.uniqueVisitors / maxViews) * chartH;
      return { x, y, ...d };
    });

    // Generate smooth bezier path
    const generateSmoothPath = (pts: Array<{ x: number; y: number }>) => {
      if (pts.length === 0) return '';
      return pts.reduce((acc, pt, i, arr) => {
        if (i === 0) return `M ${pt.x} ${pt.y}`;
        const prev = arr[i - 1];
        const cp1x = prev.x + (pt.x - prev.x) / 2;
        const cp1y = prev.y;
        const cp2x = prev.x + (pt.x - prev.x) / 2;
        const cp2y = pt.y;
        return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pt.x} ${pt.y}`;
      }, '');
    };

    const viewsPath = generateSmoothPath(pointsViews);
    const uniquePath = generateSmoothPath(pointsUnique);

    // Closed path for area gradient fill
    const areaViewsPath = `${viewsPath} L ${pointsViews[pointsViews.length - 1].x} ${height - paddingY} L ${pointsViews[0].x} ${height - paddingY} Z`;

    return {
      width,
      height,
      pointsViews,
      pointsUnique,
      viewsPath,
      uniquePath,
      areaViewsPath,
      maxViews,
      paddingY
    };
  }, [analytics]);

  // Donut Chart Segment Calculations
  const donutSegments = useMemo(() => {
    if (!analytics) return [];

    const total = analytics.totalGuests || 1;
    const items = [
      { key: 'attending', label: 'Hadir', count: analytics.attendingCount, color: '#10b981', lightColor: '#d1fae5' },
      { key: 'not_attending', label: 'Tidak Hadir', count: analytics.notAttendingCount, color: '#f43f5e', lightColor: '#ffe4e6' },
      { key: 'maybe', label: 'Masih Ragu', count: analytics.maybeCount, color: '#f59e0b', lightColor: '#fef3c7' },
      { key: 'pending', label: 'Belum Konfirmasi', count: analytics.pendingCount, color: '#a8a29e', lightColor: '#f5f5f4' }
    ];

    const radius = 64;
    const circumference = 2 * Math.PI * radius;
    let accumulatedOffset = 0;

    return items.map(item => {
      const percentage = Math.round((item.count / total) * 100);
      const strokeDasharray = (item.count / total) * circumference;
      const strokeDashoffset = -accumulatedOffset;
      accumulatedOffset += strokeDasharray;

      return {
        ...item,
        percentage,
        strokeDasharray: `${strokeDasharray} ${circumference}`,
        strokeDashoffset,
        circumference,
        radius
      };
    });
  }, [analytics]);

  if (isLoading || !analytics) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[460px] space-y-4">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-800 rounded-full animate-spin" />
        <p className="text-sm font-medium text-stone-500">Menghitung dan memuat data analitik...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16 font-jakarta">
      
      {/* 1. Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-primary-50 text-primary-800 rounded-xl">
              <TrendingUp size={20} />
            </span>
            <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">Analytics &amp; Traffic Insights</h1>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Pantau statistik kunjungan, performa sebar undangan digital, dan konfirmasi kehadiran tamu real-time.
          </p>
        </div>

        {/* Action Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Dropdown Undangan */}
          <div className="relative min-w-[200px]">
            <select
              value={selectedInvitationId}
              onChange={(e) => setSelectedInvitationId(e.target.value)}
              className="w-full bg-stone-50 hover:bg-stone-100 text-stone-800 text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary-600 appearance-none pr-8 cursor-pointer transition-colors"
            >
              <option value="all">Semua Undangan (Global)</option>
              {invitations.map((inv) => (
                <option key={inv.id} value={inv.id}>
                  {inv.title || inv.slug}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-3.5 text-stone-400 pointer-events-none" />
          </div>

          {/* Time Range Selector */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xl text-xs font-semibold text-stone-600">
            {[
              { label: '7 Hari', value: 7 },
              { label: '14 Hari', value: 14 },
              { label: '30 Hari', value: 30 }
            ].map(range => (
              <button
                key={range.value}
                onClick={() => setDaysRange(range.value)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  daysRange === range.value 
                    ? 'bg-white text-stone-900 shadow-xs font-bold' 
                    : 'hover:text-stone-900'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>

          {/* Refresh Button */}
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            title="Muat ulang data"
            className="p-2.5 bg-stone-50 hover:bg-stone-100 text-stone-600 rounded-xl border border-stone-200 transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw size={15} className={isFetching ? 'animate-spin text-primary-700' : ''} />
          </button>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCSV}
            className="flex items-center space-x-1.5 px-3.5 py-2.5 bg-primary-800 hover:bg-primary-900 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Download size={14} />
            <span>Ekspor Laporan</span>
          </button>
        </div>
      </div>

      {/* 2. Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Views */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Total Kunjungan</span>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Eye size={20} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-stone-900">{analytics.totalViews.toLocaleString('id-ID')}</div>
            <div className="flex items-center space-x-1.5 mt-1.5 text-[11px] text-emerald-600 font-semibold">
              <TrendingUp size={13} />
              <span>
                {analytics.totalViews > 0 
                  ? `${analytics.totalViews} kunjungan tercatat real-time` 
                  : 'Pelacakan otomatis aktif'}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Unique Visitors */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Tamu Unik Membuka</span>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users size={20} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-stone-900">{analytics.uniqueVisitors.toLocaleString('id-ID')}</div>
            <div className="flex items-center space-x-1.5 mt-1.5 text-[11px] text-stone-500 font-medium">
              <span>
                {analytics.uniqueVisitors > 0
                  ? `Rasio pembaca ~${Math.round((analytics.uniqueVisitors / analytics.totalGuests) * 100)}% dari daftar tamu`
                  : `Dari total ${analytics.totalGuests} tamu undangan`}
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Response Rate */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Tingkat Respons RSVP</span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-stone-900">{analytics.responseRate}%</div>
            <div className="flex items-center space-x-1.5 mt-1.5 text-[11px] text-emerald-700 font-medium">
              <span>
                {analytics.rsvpResponseCount > 0
                  ? `${analytics.rsvpResponseCount} dari ${analytics.totalGuests} tamu terkonfirmasi`
                  : `0 dari ${analytics.totalGuests} tamu terkonfirmasi`}
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Estimated Catering Pax */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Estimasi Pax Makanan</span>
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <UtensilsCrossed size={20} />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-stone-900">
              {analytics.estimatedPax} <span className="text-sm font-semibold text-stone-500">Porsi</span>
            </div>
            <div className="flex items-center space-x-1.5 mt-1.5 text-[11px] text-stone-500 font-medium">
              <span>
                {analytics.attendingCount > 0
                  ? `Berdasarkan ${analytics.attendingCount} konfirmasi hadir + pendamping`
                  : 'Menunggu konfirmasi kehadiran tamu'}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. Main Visual Charts (2 Columns: Daily Traffic & RSVP Donut) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left (8 Cols): Interactive SVG Traffic Area Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-base font-bold text-stone-900">Tren Kunjungan Undangan Harian</h2>
                <p className="text-xs text-stone-500 mt-0.5">Grafik dinamika penonton ({daysRange} hari terakhir)</p>
              </div>

              {/* Legend */}
              <div className="flex items-center space-x-4 text-xs font-semibold">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-primary-800" />
                  <span className="text-stone-700">Total Kunjungan</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="text-stone-700">Tamu Unik</span>
                </div>
              </div>
            </div>

            {/* SVG Chart Container */}
            {chartMetrics && (
              <div className="mt-6 relative w-full overflow-hidden">
                <svg
                  viewBox={`0 0 ${chartMetrics.width} ${chartMetrics.height}`}
                  className="w-full h-[240px] overflow-visible"
                >
                  <defs>
                    <linearGradient id="viewsAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7c2d12" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#7c2d12" stopOpacity="0.00" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid Lines */}
                  {[0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                    const y = chartMetrics.height - chartMetrics.paddingY - ratio * (chartMetrics.height - chartMetrics.paddingY * 2);
                    return (
                      <g key={idx}>
                        <line
                          x1={40}
                          y1={y}
                          x2={chartMetrics.width - 40}
                          y2={y}
                          stroke="#f5f5f4"
                          strokeWidth="1"
                          strokeDasharray="4 4"
                        />
                        <text
                          x={34}
                          y={y + 3}
                          fontSize="9"
                          fill="#a8a29e"
                          textAnchor="end"
                          fontFamily="sans-serif"
                        >
                          {Math.round(ratio * chartMetrics.maxViews)}
                        </text>
                      </g>
                    );
                  })}

                  {/* Area Fill */}
                  <path d={chartMetrics.areaViewsPath} fill="url(#viewsAreaGradient)" />

                  {/* Main Lines */}
                  <path
                    d={chartMetrics.viewsPath}
                    fill="none"
                    stroke="#7c2d12"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d={chartMetrics.uniquePath}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="none"
                  />

                  {/* Data Point Circles and Hover Hotspots */}
                  {chartMetrics.pointsViews.map((pt, idx) => {
                    const isHovered = hoveredPointIndex === idx;
                    return (
                      <g key={idx} className="cursor-pointer">
                        {/* Hover vertical line */}
                        {isHovered && (
                          <line
                            x1={pt.x}
                            y1={chartMetrics.paddingY}
                            x2={pt.x}
                            y2={chartMetrics.height - chartMetrics.paddingY}
                            stroke="#7c2d12"
                            strokeWidth="1.5"
                            strokeDasharray="3 3"
                            opacity="0.6"
                          />
                        )}

                        {/* Point View */}
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isHovered ? 6 : 4}
                          fill="#7c2d12"
                          stroke="#ffffff"
                          strokeWidth="2"
                          className="transition-all"
                        />

                        {/* Point Unique */}
                        <circle
                          cx={chartMetrics.pointsUnique[idx].x}
                          cy={chartMetrics.pointsUnique[idx].y}
                          r={isHovered ? 5 : 3.5}
                          fill="#f59e0b"
                          stroke="#ffffff"
                          strokeWidth="2"
                          className="transition-all"
                        />

                        {/* Transparent touch/mouse hitbox */}
                        <rect
                          x={pt.x - 20}
                          y={0}
                          width={40}
                          height={chartMetrics.height}
                          fill="transparent"
                          onMouseEnter={() => setHoveredPointIndex(idx)}
                          onMouseLeave={() => setHoveredPointIndex(null)}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Interactive Tooltip Bubble */}
                {hoveredPointIndex !== null && chartMetrics.pointsViews[hoveredPointIndex] && (
                  <div
                    className="absolute top-2 bg-stone-900/95 backdrop-blur-xs text-white text-[11px] p-2.5 rounded-xl shadow-xl pointer-events-none transform -translate-x-1/2 transition-all z-20 border border-stone-700"
                    style={{
                      left: `${(chartMetrics.pointsViews[hoveredPointIndex].x / chartMetrics.width) * 100}%`
                    }}
                  >
                    <div className="font-bold text-amber-300 border-b border-stone-800 pb-1 mb-1">
                      {chartMetrics.pointsViews[hoveredPointIndex].dayLabel}
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-stone-300">Total Kunjungan:</span>
                      <span className="font-bold text-white">{chartMetrics.pointsViews[hoveredPointIndex].views}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-stone-300">Tamu Unik:</span>
                      <span className="font-bold text-amber-400">{chartMetrics.pointsViews[hoveredPointIndex].uniqueVisitors}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Date Axis Labels */}
          <div className="flex justify-between px-6 pt-2 border-t border-stone-100 text-[11px] font-semibold text-stone-500">
            {analytics.trafficHistory.map((t, idx) => (
              <span key={idx} className={idx % 2 === 1 && daysRange > 14 ? 'hidden sm:inline' : ''}>
                {t.dayLabel}
              </span>
            ))}
          </div>
        </div>

        {/* Right (4 Cols): RSVP Donut Chart & Breakdown */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-stone-900">Konfirmasi RSVP</h2>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-md">
                {analytics.responseRate}% Respon
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">Komposisi kehadiran tamu undangan</p>

            {/* Donut SVG */}
            <div className="relative my-6 flex items-center justify-center">
              <svg width="170" height="170" viewBox="0 0 170 170" className="transform -rotate-90">
                {donutSegments.map((segment) => (
                  <circle
                    key={segment.key}
                    cx="85"
                    cy="85"
                    r={segment.radius}
                    fill="transparent"
                    stroke={segment.color}
                    strokeWidth={hoveredDonutSegment === segment.key ? 18 : 14}
                    strokeDasharray={segment.strokeDasharray}
                    strokeDashoffset={segment.strokeDashoffset}
                    className="transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setHoveredDonutSegment(segment.key)}
                    onMouseLeave={() => setHoveredDonutSegment(null)}
                  />
                ))}
              </svg>

              {/* Donut Center Info */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-2xl font-black text-stone-900">{analytics.totalGuests}</span>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Total Tamu</span>
              </div>
            </div>

            {/* Donut Legends List */}
            <div className="space-y-2 pt-1 border-t border-stone-100">
              {donutSegments.map((seg) => (
                <div
                  key={seg.key}
                  onMouseEnter={() => setHoveredDonutSegment(seg.key)}
                  onMouseLeave={() => setHoveredDonutSegment(null)}
                  className={`flex items-center justify-between p-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                    hoveredDonutSegment === seg.key ? 'bg-stone-50 font-bold' : ''
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: seg.color }} />
                    <span className="text-stone-700">{seg.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-stone-900">{seg.count} Tamu</span>
                    <span className="text-[10px] text-stone-400">({seg.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 text-center">
            <span className="text-[11px] text-stone-500 italic">
              Data RSVP diperbarui otomatis setiap tamu mengisi formulir online.
            </span>
          </div>
        </div>

      </div>

      {/* 4. Peak Hours Bar Chart (Hourly Distribution) */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="text-base font-bold text-stone-900">Waktu Kunjungan Tersibuk (Peak Hours)</h2>
            <p className="text-xs text-stone-500 mt-0.5">Kapan tamu paling aktif membuka dan membaca undangan</p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-semibold bg-amber-50 text-amber-800 px-3 py-1.5 rounded-xl w-fit">
            <Clock size={14} className="text-amber-600" />
            <span>Jam Puncak: 19.00 - 21.00 WIB (Malam Hari)</span>
          </div>
        </div>

        {/* Hourly Bars */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 items-end h-36 pt-4">
          {analytics.hourlyDistribution.map((h, i) => {
            const maxHour = Math.max(...analytics.hourlyDistribution.map(x => x.views), 1);
            const heightPercent = Math.round((h.views / maxHour) * 100);
            const isPeak = h.views === maxHour;

            return (
              <div key={i} className="flex flex-col items-center h-full justify-end group cursor-pointer">
                <span className="text-[10px] font-bold text-stone-500 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                  {h.views}
                </span>
                <div
                  className={`w-full rounded-xl transition-all duration-300 ${
                    isPeak 
                      ? 'bg-gradient-to-t from-primary-800 to-amber-500 shadow-xs' 
                      : 'bg-stone-200 group-hover:bg-primary-600'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-[10px] font-semibold text-stone-500 mt-2">{h.hour}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Deep Breakdown Grid (3 Columns: Devices, Traffic Sources, Feature Engagement) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Column 1: Device Breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                <Smartphone size={16} />
              </span>
              <h3 className="font-bold text-stone-900 text-sm">Perangkat Tamu</h3>
            </div>
            <p className="text-xs text-stone-500 mt-1">Platform gawai yang digunakan tamu</p>

            <div className="space-y-4 mt-6">
              {analytics.deviceBreakdown.map((dev, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-stone-700">{dev.device}</span>
                    <span className="text-stone-900 font-bold">{dev.percentage}% ({dev.count})</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${dev.percentage}%`, backgroundColor: dev.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-stone-100 text-[11px] text-stone-500">
            📱 94% tamu mengakses via HP (mayoritas Android &amp; iPhone).
          </div>
        </div>

        {/* Column 2: Traffic Sources */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 bg-blue-50 text-blue-700 rounded-xl">
                <Share2 size={16} />
              </span>
              <h3 className="font-bold text-stone-900 text-sm">Sumber Kunjungan</h3>
            </div>
            <p className="text-xs text-stone-500 mt-1">Kanal penyebaran undangan</p>

            <div className="space-y-4 mt-6">
              {analytics.trafficSources.map((source, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-stone-700">{source.source}</span>
                    <span className="text-stone-900 font-bold">{source.percentage}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${source.percentage}%`, backgroundColor: source.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-stone-100 text-[11px] text-stone-500">
            💬 Broadcast chat personal WhatsApp menjadi sumber klik tertinggi (84%).
          </div>
        </div>

        {/* Column 3: Feature Engagement Highlights */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 bg-amber-50 text-amber-700 rounded-xl">
                <Sparkles size={16} />
              </span>
              <h3 className="font-bold text-stone-900 text-sm">Interaksi Fitur Undangan</h3>
            </div>
            <p className="text-xs text-stone-500 mt-1">Aksi paling banyak dilakukan tamu</p>

            <div className="space-y-3 mt-4">
              {analytics.engagement.map((eng, idx) => (
                <div key={idx} className="p-2.5 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5 pr-2">
                    <div className="w-8 h-8 rounded-xl bg-white text-stone-700 border border-stone-200 flex items-center justify-center shrink-0">
                      {eng.iconName === 'map' && <MapPin size={15} className="text-rose-600" />}
                      {eng.iconName === 'gift' && <Gift size={15} className="text-amber-600" />}
                      {eng.iconName === 'message' && <MessageSquareHeart size={15} className="text-emerald-600" />}
                      {eng.iconName === 'calendar' && <Calendar size={15} className="text-blue-600" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">{eng.label}</h4>
                      <p className="text-[10px] text-stone-500 line-clamp-1">{eng.description}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-stone-900 shrink-0 bg-white px-2 py-1 rounded-lg border border-stone-200">
                    {eng.count}x
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-stone-100 text-[11px] text-stone-500">
            📍 Penunjuk arah Maps &amp; Amplop Digital menjadi fitur paling sering diklik.
          </div>
        </div>

      </div>

      {/* 6. Recent Activity Feed */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-stone-900">Aktivitas Tamu Terkini</h2>
            <p className="text-xs text-stone-500 mt-0.5">Log interaksi langsung tamu undangan saat membuka situs</p>
          </div>
          <span className="text-xs bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-1 rounded-full flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Stream</span>
          </span>
        </div>

        {analytics.recentActivities.length > 0 ? (
          <div className="divide-y divide-stone-100">
            {analytics.recentActivities.map((act) => (
              <div key={act.id} className="py-3 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    act.type === 'rsvp_attending' ? 'bg-emerald-100 text-emerald-800' :
                    act.type === 'rsvp_not_attending' ? 'bg-rose-100 text-rose-800' :
                    act.type === 'rsvp_maybe' ? 'bg-amber-100 text-amber-800' :
                    'bg-stone-100 text-stone-700'
                  }`}>
                    {act.guestName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-stone-900">{act.guestName}</span>
                      <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md">
                        {act.action}
                      </span>
                    </div>
                    <span className="text-[10px] text-stone-400">{analytics.invitationTitle}</span>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-stone-400">{act.time}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-stone-500">
            Belum ada aktivitas baru dari tamu. Riwayat akan muncul otomatis saat tamu membuka link undangan atau mengisi RSVP online.
          </div>
        )}
      </div>

    </div>
  );
};

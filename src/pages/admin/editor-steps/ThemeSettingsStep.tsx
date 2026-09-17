import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invitationService } from '../../../services/invitationService';
import { Plus, Trash2, Video, Palette, Share2, Users, ShieldAlert, QrCode, MessageSquare, Check, Sparkles } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

interface ThemeSettingsStepProps {
  invitationId: string;
}

export const ThemeSettingsStep: React.FC<ThemeSettingsStepProps> = ({ invitationId }) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { data: invitation, isLoading } = useQuery({
    queryKey: ['invitation', invitationId],
    queryFn: () => invitationService.getInvitation(invitationId),
    enabled: !!invitationId,
  });

  const [formData, setFormData] = useState({
    quote: '',
    quote_source: '',
    video_url: '',
    dresscode_note: '',
    dresscode_colors: ['#f3e8d2', '#87695e', '#41362e', '#dca15c'],
    youtube_url: '',
    instagram_live_url: '',
    tiktok_live_url: '',
    zoom_url: '',
    instagram_url: '',
    turut_mengundang: ['Ir. H. Joko Widodo', "Prof. Dr. (H.C.) K. H. Ma'ruf Amin"],
    info_tambahan: 'Tamu yang hadir diharapkan memakai masker dan tidak membawa bayi',
    reservation_qr: '/qr-code.png',
    closing_greeting: "Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i, berkenan hadir dan memberikan do'a restu kepada kedua mempelai.",
    closing_couple_name: '',
    countdown_date: '',
    powered_by: 'WD Group',
    powered_by_url: 'https://instagram.com/wdgroup',
  });

  const [newInviter, setNewInviter] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (invitation?.settings) {
      const s = invitation.settings;
      setFormData(prev => ({
        ...prev,
        quote: s.quote !== undefined ? s.quote : prev.quote,
        quote_source: s.quote_source !== undefined ? s.quote_source : prev.quote_source,
        video_url: s.video_url !== undefined ? s.video_url : prev.video_url,
        dresscode_note: s.dresscode_note !== undefined ? s.dresscode_note : prev.dresscode_note,
        dresscode_colors: s.dresscode_colors?.length ? s.dresscode_colors : prev.dresscode_colors,
        youtube_url: s.youtube_url !== undefined ? s.youtube_url : prev.youtube_url,
        instagram_live_url: s.instagram_live_url !== undefined ? s.instagram_live_url : prev.instagram_live_url,
        tiktok_live_url: s.tiktok_live_url !== undefined ? s.tiktok_live_url : prev.tiktok_live_url,
        zoom_url: s.zoom_url !== undefined ? s.zoom_url : prev.zoom_url,
        instagram_url: s.instagram_url !== undefined ? s.instagram_url : prev.instagram_url,
        turut_mengundang: s.turut_mengundang !== undefined ? s.turut_mengundang : prev.turut_mengundang,
        info_tambahan: s.info_tambahan !== undefined ? s.info_tambahan : prev.info_tambahan,
        reservation_qr: s.reservation_qr !== undefined ? s.reservation_qr : prev.reservation_qr,
        closing_greeting: s.closing_greeting !== undefined ? s.closing_greeting : prev.closing_greeting,
        closing_couple_name: s.closing_couple_name !== undefined ? s.closing_couple_name : prev.closing_couple_name,
        countdown_date: s.countdown_date !== undefined ? s.countdown_date : prev.countdown_date,
        powered_by: s.powered_by !== undefined ? s.powered_by : prev.powered_by,
        powered_by_url: s.powered_by_url !== undefined ? s.powered_by_url : prev.powered_by_url,
      }));
    }
  }, [invitation]);

  const updateMutation = useMutation({
    mutationFn: (updatedSettings: any) =>
      invitationService.updateInvitation(invitationId, {
        settings: {
          ...(invitation?.settings || {}),
          ...updatedSettings,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitation', invitationId] });
      setSaveSuccess(true);
      toast.success('Pengaturan tema berhasil disimpan!');
      setTimeout(() => setSaveSuccess(false), 3000);
    },
    onError: (err) => {
      toast.error('Gagal menyimpan pengaturan tema.');
      console.error(err);
    },
  });

  const handleSave = () => {
    updateMutation.mutate(formData);
  };

  const handleColorChange = (index: number, color: string) => {
    const updated = [...formData.dresscode_colors];
    updated[index] = color;
    setFormData({ ...formData, dresscode_colors: updated });
  };

  const handleAddInviter = () => {
    if (!newInviter.trim()) return;
    setFormData({
      ...formData,
      turut_mengundang: [...formData.turut_mengundang, newInviter.trim()],
    });
    setNewInviter('');
  };

  const handleRemoveInviter = (index: number) => {
    setFormData({
      ...formData,
      turut_mengundang: formData.turut_mengundang.filter((_, i) => i !== index),
    });
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500">Memuat pengaturan tema...</div>;

  return (
    <div className="space-y-8 max-w-3xl pb-8">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-[#625445] to-[#4a3b2f] p-5 rounded-2xl text-white shadow-sm flex items-start gap-4">
        <div className="p-2.5 bg-white/10 rounded-xl">
          <Sparkles className="w-6 h-6 text-[#f4ede2]" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-[#f4ede2]">Pengaturan Konten &amp; Tema (Split Floral)</h3>
          <p className="text-xs text-white/80 mt-1 leading-relaxed">
            Sesuaikan seluruh teks, warna dresscode, video galeri, link siaran langsung, daftar turut mengundang, dan QR reservasi yang tampil di undangan.
          </p>
        </div>
      </div>

      {saveSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl flex items-center gap-2 text-sm animate-in fade-in">
          <Check className="w-5 h-5 text-emerald-600" />
          <span>Pengaturan tema berhasil disimpan! Perubahan langsung tampil di halaman undangan.</span>
        </div>
      )}

      {/* 1. Kutipan / Doa Pembuka */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-gray-900 font-bold text-base border-b pb-3">
          <MessageSquare className="w-5 h-5 text-[#625445]" />
          <h4>Kutipan / Ayat Pernikahan (Quote)</h4>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teks Kutipan / Kata Mutiara</label>
            <textarea
              rows={3}
              value={formData.quote}
              onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
              placeholder="Every love story is beautiful, but ours is the best one. I loved her since the first time I saw her."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#625445]/20 focus:border-[#625445]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sumber Kutipan / Hashtag</label>
            <input
              type="text"
              value={formData.quote_source}
              onChange={(e) => setFormData({ ...formData, quote_source: e.target.value })}
              placeholder="Contoh: QS. Ar-Rum: 21 atau #BagasSiti"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#625445]/20 focus:border-[#625445]"
            />
          </div>
        </div>
      </div>

      {/* 2. Video Galeri (YouTube Embed) */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-gray-900 font-bold text-base border-b pb-3">
          <Video className="w-5 h-5 text-[#625445]" />
          <h4>Video Galeri (YouTube)</h4>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Link Video YouTube</label>
          <input
            type="text"
            value={formData.video_url}
            onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
            placeholder="https://www.youtube.com/watch?v=5qap5aO4i9A atau https://youtu.be/..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#625445]/20 focus:border-[#625445]"
          />
          <p className="text-xs text-gray-500 mt-1.5">
            Mendukung link YouTube biasa, tautan pendek (youtu.be), atau format embed. Video akan otomatis ditampilkan di bagian atas Gallery.
          </p>
        </div>
      </div>

      {/* 3. Dresscode & Warna */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-gray-900 font-bold text-base border-b pb-3">
          <Palette className="w-5 h-5 text-[#625445]" />
          <h4>Dresscode &amp; Palet Warna</h4>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instruksi / Catatan Pakaian</label>
            <input
              type="text"
              value={formData.dresscode_note}
              onChange={(e) => setFormData({ ...formData, dresscode_note: e.target.value })}
              placeholder="Mohon mengenakan pakaian yang senada dengan palet warna kami."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#625445]/20 focus:border-[#625445]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">4 Warna Palet Busana</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {formData.dresscode_colors.map((col, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg bg-gray-50">
                  <input
                    type="color"
                    value={col}
                    onChange={(e) => handleColorChange(idx, e.target.value)}
                    className="w-9 h-9 rounded cursor-pointer border border-gray-300 p-0.5 bg-white"
                  />
                  <input
                    type="text"
                    value={col}
                    onChange={(e) => handleColorChange(idx, e.target.value)}
                    className="w-full text-xs font-mono px-2 py-1 border border-gray-300 rounded bg-white"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Live Streaming & Media Sosial */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-gray-900 font-bold text-base border-b pb-3">
          <Share2 className="w-5 h-5 text-[#625445]" />
          <h4>Live Streaming &amp; Media Sosial</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Live URL</label>
            <input
              type="text"
              value={formData.youtube_url}
              onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
              placeholder="https://youtube.com/live/..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram Live URL</label>
            <input
              type="text"
              value={formData.instagram_live_url}
              onChange={(e) => setFormData({ ...formData, instagram_live_url: e.target.value })}
              placeholder="https://instagram.com/..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">TikTok Live URL</label>
            <input
              type="text"
              value={formData.tiktok_live_url}
              onChange={(e) => setFormData({ ...formData, tiktok_live_url: e.target.value })}
              placeholder="https://tiktok.com/@..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Zoom Meeting URL</label>
            <input
              type="text"
              value={formData.zoom_url}
              onChange={(e) => setFormData({ ...formData, zoom_url: e.target.value })}
              placeholder="https://zoom.us/j/..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Link Akun Instagram Story (Mention)</label>
            <input
              type="text"
              value={formData.instagram_url}
              onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
              placeholder="https://instagram.com/username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        </div>
      </div>

      {/* 5. Turut Mengundang */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-gray-900 font-bold text-base border-b pb-3">
          <Users className="w-5 h-5 text-[#625445]" />
          <h4>Turut Mengundang</h4>
        </div>
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={newInviter}
              onChange={(e) => setNewInviter(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddInviter(); } }}
              placeholder="Ketik nama (contoh: Bpk. H. Ahmad &amp; Keluarga)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <button
              type="button"
              onClick={handleAddInviter}
              className="px-4 py-2 bg-[#625445] text-white rounded-lg text-sm font-medium hover:bg-[#4a3b2f] flex items-center gap-1 cursor-pointer"
            >
              <Plus size={16} /> Tambah
            </button>
          </div>

          <div className="space-y-2 mt-2">
            {formData.turut_mengundang?.map((name, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-[#625445] font-bold">✓</span>
                  <span className="text-sm font-medium text-gray-800">{name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveInviter(idx)}
                  className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {formData.turut_mengundang.length === 0 && (
              <p className="text-xs text-gray-400 italic py-2">Belum ada nama yang ditambahkan.</p>
            )}
          </div>
        </div>
      </div>

      {/* 6. Informasi Tambahan & Reservasi */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-gray-900 font-bold text-base border-b pb-3">
          <ShieldAlert className="w-5 h-5 text-[#625445]" />
          <h4>Informasi Tambahan &amp; Reservasi Tamu</h4>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teks Informasi Tambahan (Protokol/Catatan)</label>
            <textarea
              rows={2}
              value={formData.info_tambahan}
              onChange={(e) => setFormData({ ...formData, info_tambahan: e.target.value })}
              placeholder="Tamu yang hadir diharapkan memakai masker dan tidak membawa bayi"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar QR Code Reservasi</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.reservation_qr}
                onChange={(e) => setFormData({ ...formData, reservation_qr: e.target.value })}
                placeholder="/qr-code.png atau link gambar QR"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Default menggunakan kode QR bawaan: <code>/qr-code.png</code></p>
          </div>
        </div>
      </div>

      {/* 7. Salam Penutup & Pasangan */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-gray-900 font-bold text-base border-b pb-3">
          <QrCode className="w-5 h-5 text-[#625445]" />
          <h4>Salam Penutup</h4>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kalimat Penutup Undangan</label>
            <textarea
              rows={3}
              value={formData.closing_greeting}
              onChange={(e) => setFormData({ ...formData, closing_greeting: e.target.value })}
              placeholder="Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i, berkenan hadir dan memberikan do'a restu kepada kedua mempelai."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Mempelai Penutup (Opsional, default dari data mempelai)</label>
            <input
              type="text"
              value={formData.closing_couple_name}
              onChange={(e) => setFormData({ ...formData, closing_couple_name: e.target.value })}
              placeholder="Contoh: Bagas dan Siti"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Footer Brand / Powered By</label>
              <input
                type="text"
                value={formData.powered_by}
                onChange={(e) => setFormData({ ...formData, powered_by: e.target.value })}
                placeholder="WD Group"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link Instagram Brand</label>
              <input
                type="text"
                value={formData.powered_by_url}
                onChange={(e) => setFormData({ ...formData, powered_by_url: e.target.value })}
                placeholder="https://instagram.com/wdgroup"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Perubahan pada pengaturan ini akan langsung otomatis diterapkan pada tema undangan.
        </p>
        <button
          type="button"
          onClick={handleSave}
          disabled={updateMutation.isPending}
          className="px-6 py-2.5 bg-[#625445] hover:bg-[#4a3b2f] text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {updateMutation.isPending ? 'Menyimpan...' : 'Simpan Pengaturan Tema'}
        </button>
      </div>
    </div>
  );
};

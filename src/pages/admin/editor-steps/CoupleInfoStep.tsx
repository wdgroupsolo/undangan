import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { editorService } from '../../../services/editorService';
import { invitationService } from '../../../services/invitationService';
import { useToast } from '../../../context/ToastContext';
import { Upload, Image as ImageIcon, Heart, Sparkles } from 'lucide-react';

const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

interface CoupleInfoStepProps {
  invitationId: string;
}

export const CoupleInfoStep: React.FC<CoupleInfoStepProps> = ({ invitationId }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const { data: couple, isLoading: isLoadingCouple } = useQuery({
    queryKey: ['couple', invitationId],
    queryFn: () => editorService.getCouple(invitationId),
    enabled: !!invitationId,
  });

  const { data: invitation, isLoading: isLoadingInv } = useQuery({
    queryKey: ['invitation', invitationId],
    queryFn: () => invitationService.getInvitation(invitationId),
    enabled: !!invitationId,
  });

  const [formData, setFormData] = useState({
    groom_full_name: '',
    groom_nickname: '',
    groom_father_name: '',
    groom_mother_name: '',
    groom_photo: '',
    bride_full_name: '',
    bride_nickname: '',
    bride_father_name: '',
    bride_mother_name: '',
    bride_photo: '',
  });

  const [settingsData, setSettingsData] = useState({
    cover_photo: '',
    groom_instagram: '',
    bride_instagram: '',
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (couple) {
      const rawGroomFull = (couple.groom_full_name || '').trim();
      const rawGroomNick = (couple.groom_nickname || '').trim();
      const syncGroomNick = (rawGroomNick && rawGroomNick.toLowerCase() !== 'bagas')
        ? rawGroomNick
        : (rawGroomFull ? rawGroomFull.split(/\s+/)[0] : rawGroomNick);

      const rawBrideFull = (couple.bride_full_name || '').trim();
      const rawBrideNick = (couple.bride_nickname || '').trim();
      const syncBrideNick = (rawBrideNick && rawBrideNick.toLowerCase() !== 'siti')
        ? rawBrideNick
        : (rawBrideFull ? rawBrideFull.split(/\s+/)[0] : rawBrideNick);

      setFormData({
        groom_full_name: rawGroomFull,
        groom_nickname: syncGroomNick,
        groom_father_name: couple.groom_father_name || '',
        groom_mother_name: couple.groom_mother_name || '',
        groom_photo: couple.groom_photo || '',
        bride_full_name: rawBrideFull,
        bride_nickname: syncBrideNick,
        bride_father_name: couple.bride_father_name || '',
        bride_mother_name: couple.bride_mother_name || '',
        bride_photo: couple.bride_photo || '',
      });
    }
  }, [couple]);

  useEffect(() => {
    if (invitation?.settings) {
      setSettingsData({
        cover_photo: invitation.settings.cover_photo || '',
        groom_instagram: invitation.settings.groom_instagram || '',
        bride_instagram: invitation.settings.bride_instagram || '',
      });
    }
  }, [invitation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'groom_full_name') {
        const currentNick = (prev.groom_nickname || '').trim().toLowerCase();
        if (!prev.groom_nickname || currentNick === 'bagas' || prev.groom_nickname === prev.groom_full_name) {
          updated.groom_nickname = value.trim().split(/\s+/)[0] || '';
        }
      }
      if (name === 'bride_full_name') {
        const currentNick = (prev.bride_nickname || '').trim().toLowerCase();
        if (!prev.bride_nickname || currentNick === 'siti' || prev.bride_nickname === prev.bride_full_name) {
          updated.bride_nickname = value.trim().split(/\s+/)[0] || '';
        }
      }
      return updated;
    });
  };

  const handleFileUpload = async (file: File, onSuccess: (url: string) => void) => {
    try {
      const url = await editorService.uploadFile('invitations', 'couples', file);
      onSuccess(url);
      toast.success('Foto berhasil diunggah!');
    } catch (err) {
      console.warn('Storage upload fallback:', err);
      const reader = new FileReader();
      reader.onload = () => {
        onSuccess(reader.result as string);
        toast.success('Foto berhasil dimuat!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await editorService.upsertCouple(invitationId, formData);
      await invitationService.updateInvitation(invitationId, {
        settings: {
          ...(invitation?.settings || {}),
          cover_photo: settingsData.cover_photo,
          groom_instagram: settingsData.groom_instagram,
          bride_instagram: settingsData.bride_instagram,
        }
      });
      queryClient.invalidateQueries({ queryKey: ['couple', invitationId] });
      queryClient.invalidateQueries({ queryKey: ['invitation', invitationId] });
      toast.success('Data mempelai berhasil disimpan!');
    } catch (err: any) {
      toast.error('Gagal menyimpan data: ' + (err?.message || 'Terjadi kesalahan'));
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoadingCouple || isLoadingInv) return <div className="p-8 text-center text-gray-500">Memuat data...</div>;

  return (
    <div className="space-y-8 max-w-4xl pb-10">
      {/* Cover / Together Photo Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b pb-3">
          <Sparkles className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-bold text-gray-900">Foto Bersama / Sampul Depan (Cover Card 9:16)</h3>
        </div>
        <p className="text-xs text-gray-500">
          Foto ini tampil sebagai kartu potret utama (9:16) di sampul depan undangan, di dalam amplop animasi, dan di layar selamat datang.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 items-start">
          <div className="w-32 h-44 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 overflow-hidden flex flex-col items-center justify-center relative shrink-0 shadow-inner group">
            {settingsData.cover_photo ? (
              <img 
                src={settingsData.cover_photo} 
                alt="Foto Sampul" 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="text-center p-2 text-gray-400">
                <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                <span className="text-[10px]">Preview 9:16</span>
              </div>
            )}
          </div>

          <div className="flex-1 space-y-3 w-full">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL Foto Sampul / Bersama</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={settingsData.cover_photo} 
                  onChange={(e) => setSettingsData({ ...settingsData, cover_photo: e.target.value })}
                  placeholder="/foto-prewedding.jpg atau https://..." 
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary-500 focus:border-primary-500" 
                />
                <label className="shrink-0 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer flex items-center gap-1.5 text-xs font-medium border border-gray-300 transition-colors">
                  <Upload size={14} />
                  <span>Upload Foto</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, (url) => setSettingsData({ ...settingsData, cover_photo: url }));
                    }}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-400 mt-1">Kosongkan jika ingin menggunakan foto bawaan tema atau foto mempelai pria.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Groom Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="text-lg font-bold text-gray-900">Mempelai Pria</h3>
          <span className="text-xs px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">Groom</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input name="groom_full_name" value={formData.groom_full_name} onChange={handleChange} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 text-sm" placeholder="Steven Pratama, S.Kom." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Panggilan</label>
            <input name="groom_nickname" value={formData.groom_nickname} onChange={handleChange} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 text-sm" placeholder="Steven" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ayah</label>
            <input name="groom_father_name" value={formData.groom_father_name} onChange={handleChange} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 text-sm" placeholder="Bpk. Hendra Pratama" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ibu</label>
            <input name="groom_mother_name" value={formData.groom_mother_name} onChange={handleChange} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 text-sm" placeholder="Ibu Ratna Dewi" />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Akun Instagram (Opsional)</label>
            <div className="flex gap-2 items-center">
              <span className="p-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"><InstagramIcon size={18} /></span>
              <input 
                type="text" 
                value={settingsData.groom_instagram} 
                onChange={(e) => setSettingsData({ ...settingsData, groom_instagram: e.target.value })}
                placeholder="@steven_pratama atau https://instagram.com/steven_pratama" 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 text-sm" 
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Foto Mempelai Pria (URL / Upload)</label>
            <div className="flex gap-3 items-center">
              {formData.groom_photo ? (
                <img src={formData.groom_photo} alt="Groom Preview" className="w-14 h-14 rounded-full object-cover border border-gray-300 shadow-sm shrink-0" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-400 shrink-0">
                  <ImageIcon size={20} />
                </div>
              )}
              <input 
                name="groom_photo" 
                value={formData.groom_photo} 
                onChange={handleChange} 
                type="text" 
                placeholder="/groom-default.png atau link gambar..." 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 text-sm" 
              />
              <label className="shrink-0 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer flex items-center gap-1.5 text-xs font-medium border border-gray-300 transition-colors">
                <Upload size={14} />
                <span>Upload</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, (url) => setFormData(prev => ({ ...prev, groom_photo: url })));
                  }}
                />
              </label>
            </div>
            <p className="text-xs text-gray-400 mt-1">Kosongkan untuk menggunakan foto bawaan tema (/groom-default.png)</p>
          </div>
        </div>
      </div>

      {/* Bride Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="text-lg font-bold text-gray-900">Mempelai Wanita</h3>
          <span className="text-xs px-2.5 py-1 bg-pink-50 text-pink-700 rounded-full font-medium">Bride</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input name="bride_full_name" value={formData.bride_full_name} onChange={handleChange} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 text-sm" placeholder="Bunga Lestari, S.Ked." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Panggilan</label>
            <input name="bride_nickname" value={formData.bride_nickname} onChange={handleChange} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 text-sm" placeholder="Bunga" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ayah</label>
            <input name="bride_father_name" value={formData.bride_father_name} onChange={handleChange} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 text-sm" placeholder="Bpk. Suryo Wibowo" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ibu</label>
            <input name="bride_mother_name" value={formData.bride_mother_name} onChange={handleChange} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 text-sm" placeholder="Ibu Tri Wahyuni" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Akun Instagram (Opsional)</label>
            <div className="flex gap-2 items-center">
              <span className="p-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"><InstagramIcon size={18} /></span>
              <input 
                type="text" 
                value={settingsData.bride_instagram} 
                onChange={(e) => setSettingsData({ ...settingsData, bride_instagram: e.target.value })}
                placeholder="@bunga_lestari atau https://instagram.com/bunga_lestari" 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 text-sm" 
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Foto Mempelai Wanita (URL / Upload)</label>
            <div className="flex gap-3 items-center">
              {formData.bride_photo ? (
                <img src={formData.bride_photo} alt="Bride Preview" className="w-14 h-14 rounded-full object-cover border border-gray-300 shadow-sm shrink-0" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-400 shrink-0">
                  <ImageIcon size={20} />
                </div>
              )}
              <input 
                name="bride_photo" 
                value={formData.bride_photo} 
                onChange={handleChange} 
                type="text" 
                placeholder="/bride-default.png atau link gambar..." 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 text-sm" 
              />
              <label className="shrink-0 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer flex items-center gap-1.5 text-xs font-medium border border-gray-300 transition-colors">
                <Upload size={14} />
                <span>Upload</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, (url) => setFormData(prev => ({ ...prev, bride_photo: url })));
                  }}
                />
              </label>
            </div>
            <p className="text-xs text-gray-400 mt-1">Kosongkan untuk menggunakan foto bawaan tema (/bride-default.png)</p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Semua data mempelai, foto bersama, dan akun Instagram akan otomatis tersinkronisasi ke seluruh tema undangan.
        </p>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isSaving ? 'Menyimpan...' : 'Simpan Data Mempelai'}
        </button>
      </div>
    </div>
  );
};

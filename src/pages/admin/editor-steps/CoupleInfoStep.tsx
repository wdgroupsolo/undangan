import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { editorService } from '../../../services/editorService';
import { Upload } from 'lucide-react';

interface CoupleInfoStepProps {
  invitationId: string;
}

export const CoupleInfoStep: React.FC<CoupleInfoStepProps> = ({ invitationId }) => {
  const queryClient = useQueryClient();
  
  const { data: couple, isLoading } = useQuery({
    queryKey: ['couple', invitationId],
    queryFn: () => editorService.getCouple(invitationId),
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

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (couple) {
      setFormData({
        groom_full_name: couple.groom_full_name || '',
        groom_nickname: couple.groom_nickname || '',
        groom_father_name: couple.groom_father_name || '',
        groom_mother_name: couple.groom_mother_name || '',
        groom_photo: couple.groom_photo || '',
        bride_full_name: couple.bride_full_name || '',
        bride_nickname: couple.bride_nickname || '',
        bride_father_name: couple.bride_father_name || '',
        bride_mother_name: couple.bride_mother_name || '',
        bride_photo: couple.bride_photo || '',
      });
    }
  }, [couple]);

  const saveMutation = useMutation({
    mutationFn: (data: any) => editorService.upsertCouple(invitationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['couple', invitationId] });
      alert('Data mempelai berhasil disimpan!');
    },
    onError: (err) => {
      alert('Gagal menyimpan data.');
      console.error(err);
    },
    onSettled: () => setIsSaving(false)
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsSaving(true);
    saveMutation.mutate(formData);
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500">Memuat data...</div>;

  return (
    <div className="space-y-8">
      {/* Groom Section */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Mempelai Pria</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input name="groom_full_name" value={formData.groom_full_name} onChange={handleChange} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Panggilan</label>
            <input name="groom_nickname" value={formData.groom_nickname} onChange={handleChange} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ayah</label>
            <input name="groom_father_name" value={formData.groom_father_name} onChange={handleChange} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ibu</label>
            <input name="groom_mother_name" value={formData.groom_mother_name} onChange={handleChange} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Foto Mempelai Pria (URL)</label>
            <div className="flex gap-3 items-center">
              {formData.groom_photo && (
                <img src={formData.groom_photo} alt="Groom Preview" className="w-12 h-12 rounded-full object-cover border border-gray-300 shadow-sm shrink-0" />
              )}
              <input 
                name="groom_photo" 
                value={formData.groom_photo} 
                onChange={handleChange} 
                type="text" 
                placeholder="/groom-default.png atau link gambar..." 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 text-sm" 
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">Kosongkan untuk menggunakan foto default tema (/groom-default.png)</p>
          </div>
        </div>
      </div>

      {/* Bride Section */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Mempelai Wanita</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input name="bride_full_name" value={formData.bride_full_name} onChange={handleChange} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Panggilan</label>
            <input name="bride_nickname" value={formData.bride_nickname} onChange={handleChange} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ayah</label>
            <input name="bride_father_name" value={formData.bride_father_name} onChange={handleChange} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ibu</label>
            <input name="bride_mother_name" value={formData.bride_mother_name} onChange={handleChange} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Foto Mempelai Wanita (URL)</label>
            <div className="flex gap-3 items-center">
              {formData.bride_photo && (
                <img src={formData.bride_photo} alt="Bride Preview" className="w-12 h-12 rounded-full object-cover border border-gray-300 shadow-sm shrink-0" />
              )}
              <input 
                name="bride_photo" 
                value={formData.bride_photo} 
                onChange={handleChange} 
                type="text" 
                placeholder="/bride-default.png atau link gambar..." 
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 text-sm" 
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">Kosongkan untuk menggunakan foto default tema (/bride-default.png)</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium transition-colors cursor-pointer"
        >
          {isSaving ? 'Menyimpan...' : 'Simpan Data Mempelai'}
        </button>
      </div>
    </div>
  );
};

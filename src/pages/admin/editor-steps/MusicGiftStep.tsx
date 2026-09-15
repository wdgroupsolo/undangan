import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { editorService } from '../../../services/editorService';
import { Plus, Trash2, CreditCard } from 'lucide-react';

export const MusicGiftStep: React.FC<{ invitationId: string }> = ({ invitationId }) => {
  const queryClient = useQueryClient();
  
  // -- Music State --
  const { data: music, isLoading: isLoadingMusic } = useQuery({
    queryKey: ['music', invitationId],
    queryFn: () => editorService.getMusic(invitationId),
    enabled: !!invitationId,
  });

  const [musicData, setMusicData] = useState({ music_name: '', music_url: '', autoplay: true });

  useEffect(() => {
    if (music) {
      setMusicData({ 
        music_name: music.music_name || '', 
        music_url: music.music_url || '', 
        autoplay: music.autoplay ?? true 
      });
    }
  }, [music]);

  const saveMusicMutation = useMutation({
    mutationFn: (data: any) => editorService.upsertMusic(invitationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['music', invitationId] });
      alert('Musik berhasil disimpan');
    }
  });

  // -- Gift State --
  const [isAddingGift, setIsAddingGift] = useState(false);
  const [giftForm, setGiftForm] = useState({ id: '', type: 'bank', provider: '', account_name: '', account_number: '' });

  const { data: gifts, isLoading: isLoadingGifts } = useQuery({
    queryKey: ['gifts', invitationId],
    queryFn: () => editorService.getGifts(invitationId),
    enabled: !!invitationId,
  });

  const saveGiftMutation = useMutation({
    mutationFn: (data: any) => editorService.saveGift(invitationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gifts', invitationId] });
      setIsAddingGift(false);
      setGiftForm({ id: '', type: 'bank', provider: '', account_name: '', account_number: '' });
    }
  });

  const deleteGiftMutation = useMutation({
    mutationFn: (id: string) => editorService.deleteGift(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['gifts', invitationId] })
  });

  if (isLoadingMusic || isLoadingGifts) return <div>Memuat...</div>;

  return (
    <div className="space-y-8">
      {/* Background Music Section */}
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Background Music</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul Lagu / Artis</label>
            <input value={musicData.music_name} onChange={e => setMusicData({...musicData, music_name: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="e.g. A Thousand Years - Christina Perri" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL Musik (.mp3)</label>
            <input value={musicData.music_url} onChange={e => setMusicData({...musicData, music_url: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="https://example.com/music.mp3" />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={() => saveMusicMutation.mutate(musicData)} className="px-4 py-2 bg-primary-600 text-white rounded-lg">Simpan Musik</button>
        </div>
      </div>

      {/* Amplop Digital Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Amplop Digital (Gift)</h3>
          {!isAddingGift && (
            <button onClick={() => setIsAddingGift(true)} className="flex items-center space-x-2 text-sm bg-primary-100 text-primary-700 px-3 py-1.5 rounded-lg hover:bg-primary-200">
              <Plus size={16} /> <span>Tambah Rekening/E-Wallet</span>
            </button>
          )}
        </div>

        {isAddingGift && (
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipe</label>
                <select value={giftForm.type} onChange={e => setGiftForm({...giftForm, type: e.target.value})} className="w-full px-3 py-2 border rounded-lg bg-white">
                  <option value="bank">Transfer Bank</option>
                  <option value="ewallet">E-Wallet (OVO/Dana/dll)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Bank / Provider</label>
                <input value={giftForm.provider} onChange={e => setGiftForm({...giftForm, provider: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="e.g. BCA / OVO" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pemilik Rekening</label>
                <input value={giftForm.account_name} onChange={e => setGiftForm({...giftForm, account_name: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Rekening / No. HP</label>
                <input value={giftForm.account_number} onChange={e => setGiftForm({...giftForm, account_number: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button onClick={() => setIsAddingGift(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Batal</button>
              <button onClick={() => saveGiftMutation.mutate(giftForm)} className="px-4 py-2 bg-primary-600 text-white rounded-lg">Simpan Rekening</button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gifts?.map(gift => (
            <div key={gift.id} className="bg-white p-5 rounded-xl border border-gray-200 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                  <CreditCard size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{gift.provider}</h4>
                  <p className="text-gray-900 font-mono text-sm">{gift.account_number}</p>
                  <p className="text-sm text-gray-500">a.n {gift.account_name}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => { setGiftForm(gift as any); setIsAddingGift(true); }} className="text-blue-600 text-sm hover:underline">Edit</button>
                <button onClick={() => deleteGiftMutation.mutate(gift.id)} className="text-red-600 hover:bg-red-50 p-1 rounded"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { editorService } from '../../../services/editorService';
import { useToast } from '../../../context/ToastContext';
import { Plus, Trash2, CreditCard, QrCode, Upload } from 'lucide-react';

export const MusicGiftStep: React.FC<{ invitationId: string }> = ({ invitationId }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
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
      toast.success('Pengaturan musik berhasil disimpan');
    },
    onError: (err: any) => {
      console.error('Save music error:', err);
      toast.error('Gagal menyimpan musik: ' + (err?.message || 'Terjadi kesalahan'));
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
      toast.success('Data amplop digital / rekening berhasil disimpan!');
    },
    onError: (err: any) => {
      console.error('Save gift error:', err);
      toast.error('Gagal menyimpan: ' + (err?.message || 'Terjadi kesalahan'));
    }
  });

  const deleteGiftMutation = useMutation({
    mutationFn: (id: string) => editorService.deleteGift(id, invitationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gifts', invitationId] });
      toast.success('Rekening berhasil dihapus');
    },
    onError: (err: any) => {
      console.error('Delete gift error:', err);
      toast.error('Gagal menghapus: ' + (err?.message || 'Terjadi kesalahan'));
    }
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
          <h3 className="text-lg font-bold text-gray-900">Amplop Digital (Transfer Bank &amp; QRIS)</h3>
          {!isAddingGift && (
            <button 
              onClick={() => {
                setGiftForm({ id: '', type: 'bank', provider: 'BCA', account_name: '', account_number: '' });
                setIsAddingGift(true);
              }} 
              className="flex items-center space-x-2 text-sm bg-primary-100 text-primary-700 px-3 py-1.5 rounded-lg hover:bg-primary-200"
            >
              <Plus size={16} /> <span>Tambah Rekening / QRIS</span>
            </button>
          )}
        </div>

        {isAddingGift && (
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Pembayaran</label>
                <select 
                  value={giftForm.type} 
                  onChange={e => {
                    const newType = e.target.value;
                    if (newType === 'qris') {
                      setGiftForm({
                        ...giftForm,
                        type: 'qris',
                        provider: 'QRIS',
                        account_number: giftForm.account_number || '/qr-code.png'
                      });
                    } else {
                      setGiftForm({
                        ...giftForm,
                        type: newType,
                        provider: giftForm.provider === 'QRIS' ? (newType === 'bank' ? 'BCA' : 'OVO') : giftForm.provider,
                        account_number: giftForm.account_number === '/qr-code.png' ? '' : giftForm.account_number
                      });
                    }
                  }} 
                  className="w-full px-3 py-2 border rounded-lg bg-white"
                >
                  <option value="bank">Transfer Bank (BCA, Mandiri, BRI, BNI, dll)</option>
                  <option value="qris">QRIS (Scan Barcode / QR Code)</option>
                  <option value="ewallet">E-Wallet (OVO / Dana / GoPay / ShopeePay)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {giftForm.type === 'qris' ? 'Nama Provider / Layanan' : 'Nama Bank / Provider'}
                </label>
                <input 
                  value={giftForm.provider} 
                  onChange={e => setGiftForm({...giftForm, provider: e.target.value})} 
                  className="w-full px-3 py-2 border rounded-lg" 
                  placeholder={giftForm.type === 'qris' ? 'QRIS' : 'e.g. BCA / OVO'} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {giftForm.type === 'qris' ? 'Nama Merchant / Penerima' : 'Nama Pemilik Rekening'}
                </label>
                <input 
                  value={giftForm.account_name} 
                  onChange={e => setGiftForm({...giftForm, account_name: e.target.value})} 
                  className="w-full px-3 py-2 border rounded-lg" 
                  placeholder="e.g. Bagas &amp; Siti"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {giftForm.type === 'qris' ? 'URL Gambar QRIS / Upload' : 'Nomor Rekening / No. HP'}
                </label>
                <div className="flex gap-2">
                  <input 
                    value={giftForm.account_number} 
                    onChange={e => setGiftForm({...giftForm, account_number: e.target.value})} 
                    className="w-full px-3 py-2 border rounded-lg" 
                    placeholder={giftForm.type === 'qris' ? 'e.g. /qr-code.png atau URL' : 'e.g. 1234567890'} 
                  />
                  {giftForm.type === 'qris' && (
                    <label className="shrink-0 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer flex items-center gap-1 text-xs font-medium border">
                      <Upload size={14} />
                      <span>Upload</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            try {
                              const url = await editorService.uploadFile('invitations', 'qris', file);
                              setGiftForm({ ...giftForm, account_number: url });
                            } catch (err) {
                              console.error('Upload error:', err);
                              const reader = new FileReader();
                              reader.onload = () => {
                                setGiftForm({ ...giftForm, account_number: reader.result as string });
                              };
                              reader.readAsDataURL(file);
                            }
                          }
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button 
                type="button"
                onClick={() => setIsAddingGift(false)} 
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                Batal
              </button>
              <button 
                type="button"
                disabled={saveGiftMutation.isPending}
                onClick={() => {
                  if (!giftForm.provider?.trim()) {
                    return toast.error('Nama Bank / Provider wajib diisi');
                  }
                  if (!giftForm.account_number?.trim()) {
                    return toast.error('Nomor Rekening / Barcode wajib diisi');
                  }
                  saveGiftMutation.mutate(giftForm);
                }} 
                className="px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {saveGiftMutation.isPending ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gifts?.map((gift: any) => {
            const isQris = gift.type === 'qris' || gift.provider?.toUpperCase() === 'QRIS';
            return (
              <div key={gift.id} className="bg-white p-5 rounded-xl border border-gray-200 flex justify-between items-center shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isQris ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                    {isQris ? <QrCode size={24} /> : <CreditCard size={24} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-gray-900">{gift.provider}</h4>
                      {isQris && <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded">QRIS</span>}
                    </div>
                    <p className="text-gray-900 font-mono text-xs truncate max-w-[200px]">{gift.account_number}</p>
                    <p className="text-xs text-gray-500">a.n {gift.account_name}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => { setGiftForm(gift as any); setIsAddingGift(true); }} className="text-blue-600 text-sm hover:underline">Edit</button>
                  <button onClick={() => deleteGiftMutation.mutate(gift.id)} className="text-red-600 hover:bg-red-50 p-1 rounded"><Trash2 size={18} /></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

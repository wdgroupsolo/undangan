import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { editorService } from '../../../services/editorService';
import { invitationService } from '../../../services/invitationService';
import { Upload, Trash2, Image as ImageIcon, Video, Check } from 'lucide-react';

export const GalleryStep: React.FC<{ invitationId: string }> = ({ invitationId }) => {
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoSaved, setVideoSaved] = useState(false);

  const { data: gallery, isLoading } = useQuery({
    queryKey: ['gallery', invitationId],
    queryFn: () => editorService.getGallery(invitationId),
    enabled: !!invitationId,
  });

  const { data: invitation } = useQuery({
    queryKey: ['invitation', invitationId],
    queryFn: () => invitationService.getInvitation(invitationId),
    enabled: !!invitationId,
  });

  useEffect(() => {
    if (invitation?.settings?.video_url) {
      setVideoUrl(invitation.settings.video_url);
    }
  }, [invitation]);

  const saveVideoMutation = useMutation({
    mutationFn: (url: string) =>
      invitationService.updateInvitation(invitationId, {
        settings: {
          ...(invitation?.settings || {}),
          video_url: url,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitation', invitationId] });
      setVideoSaved(true);
      setTimeout(() => setVideoSaved(false), 2500);
    },
  });

  const saveMutation = useMutation({
    mutationFn: (url: string) => editorService.saveGalleryImage(invitationId, url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery', invitationId] });
      setImageUrl('');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => editorService.deleteGalleryImage(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['gallery', invitationId] })
  });

  if (isLoading) return <div>Memuat...</div>;

  return (
    <div className="space-y-6">
      {/* Video YouTube Section */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-3">
        <div className="flex items-center gap-2 text-gray-900 font-bold">
          <Video className="w-5 h-5 text-primary-600" />
          <h4>Video Galeri (YouTube Embed)</h4>
        </div>
        <p className="text-xs text-gray-500">
          Video ini akan disematkan di bagian atas Galeri. Masukkan link YouTube biasa atau format embed.
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=5qap5aO4i9A"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary-500"
          />
          <button
            type="button"
            onClick={() => saveVideoMutation.mutate(videoUrl)}
            disabled={saveVideoMutation.isPending}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
          >
            {videoSaved ? (
              <>
                <Check size={16} /> Tersimpan
              </>
            ) : saveVideoMutation.isPending ? (
              'Menyimpan...'
            ) : (
              'Simpan Video'
            )}
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2">
        <h3 className="text-lg font-bold text-gray-900">Galeri Foto</h3>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">Tambah Foto Galeri (URL)</label>
        <div className="flex space-x-2">
          <input 
            type="text" 
            value={imageUrl} 
            onChange={e => setImageUrl(e.target.value)} 
            placeholder="https://example.com/foto.jpg atau /gallery-grid-1.jpg" 
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500" 
          />
          <button 
            onClick={() => { if(imageUrl) saveMutation.mutate(imageUrl); }}
            disabled={!imageUrl || saveMutation.isPending}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 flex items-center cursor-pointer"
          >
            <Upload size={18} className="mr-2" /> Tambah
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Foto yang ditambahkan akan otomatis muncul di bagian slideshow dan grid galeri tema.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gallery?.map((image) => (
          <div key={image.id} className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
            {image.image_url ? (
              <img src={image.image_url} alt="Gallery" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-400">
                <ImageIcon size={32} />
              </div>
            )}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button 
                onClick={() => deleteMutation.mutate(image.id)}
                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {gallery?.length === 0 && (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-dashed">
          Belum ada foto di galeri.
        </div>
      )}
    </div>
  );
};

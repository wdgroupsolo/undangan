import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { editorService } from '../../../services/editorService';
import { Plus, Trash2, Calendar } from 'lucide-react';

export const StoryStep: React.FC<{ invitationId: string }> = ({ invitationId }) => {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ id: '', title: '', date: '', description: '' });

  const { data: stories, isLoading } = useQuery({
    queryKey: ['stories', invitationId],
    queryFn: () => editorService.getStories(invitationId),
    enabled: !!invitationId,
  });

  const saveMutation = useMutation({
    mutationFn: (data: any) => editorService.saveStory(invitationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['stories', invitationId] });
      setIsAdding(false);
      setFormData({ id: '', title: '', date: '', description: '' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => editorService.deleteStory(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['stories', invitationId] })
  });

  if (isLoading) return <div>Memuat...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">Love Story / Perjalanan Cinta</h3>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="flex items-center space-x-2 text-sm bg-primary-100 text-primary-700 px-3 py-1.5 rounded-lg hover:bg-primary-200">
            <Plus size={16} /> <span>Tambah Cerita</span>
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Judul Cerita (Momen)</label>
              <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="Awal Bertemu" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal/Tahun</label>
              <input type="text" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="12 Jan 2020 / Tahun 2020" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Singkat</label>
              <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border rounded-lg" rows={3} placeholder="Ceritakan bagaimana momen tersebut terjadi..." />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Batal</button>
            <button onClick={() => saveMutation.mutate(formData)} className="px-4 py-2 bg-primary-600 text-white rounded-lg">Simpan Cerita</button>
          </div>
        </div>
      )}

      <div className="space-y-4 relative border-l-2 border-gray-200 ml-4 pl-6">
        {stories?.map((story, index) => (
          <div key={story.id} className="relative bg-white p-5 rounded-xl border border-gray-200">
            <div className="absolute -left-9 top-6 bg-primary-500 w-4 h-4 rounded-full border-4 border-white shadow-sm"></div>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center text-primary-600 text-sm font-semibold mb-1">
                  <Calendar size={14} className="mr-1" /> {story.date}
                </div>
                <h4 className="font-bold text-gray-900 text-lg">{story.title}</h4>
                <p className="text-gray-600 mt-2 text-sm leading-relaxed">{story.description}</p>
              </div>
              <div className="flex space-x-2 pl-4">
                <button onClick={() => { setFormData(story as any); setIsAdding(true); }} className="text-blue-600 text-sm hover:underline">Edit</button>
                <button onClick={() => deleteMutation.mutate(story.id)} className="text-red-600 hover:bg-red-50 p-1 rounded"><Trash2 size={18} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {stories?.length === 0 && !isAdding && (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl border border-dashed">Belum ada cerita yang ditambahkan.</div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { editorService } from '../../../services/editorService';
import { Plus, Trash2, MapPin } from 'lucide-react';

export const EventsStep: React.FC<{ invitationId: string }> = ({ invitationId }) => {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ id: '', name: '', event_date: '', start_time: '', end_time: '', location: '', address: '', maps_url: '', description: '' });

  const { data: events, isLoading } = useQuery({
    queryKey: ['events', invitationId],
    queryFn: () => editorService.getEvents(invitationId),
    enabled: !!invitationId,
  });

  const saveMutation = useMutation({
    mutationFn: (data: any) => editorService.saveEvent(invitationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events', invitationId] });
      setIsAdding(false);
      setFormData({ id: '', name: '', event_date: '', start_time: '', end_time: '', location: '', address: '', maps_url: '', description: '' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => editorService.deleteEvent(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events', invitationId] })
  });

  if (isLoading) return <div>Memuat...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-900">Rangkaian Acara</h3>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="flex items-center space-x-2 text-sm bg-primary-100 text-primary-700 px-3 py-1.5 rounded-lg hover:bg-primary-200">
            <Plus size={16} /> <span>Tambah Acara</span>
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Acara (Akad/Resepsi)</label>
              <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
              <input type="date" value={formData.event_date} onChange={e => setFormData({...formData, event_date: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jam Mulai</label>
              <input type="time" value={formData.start_time} onChange={e => setFormData({...formData, start_time: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jam Selesai</label>
              <input type="time" value={formData.end_time} onChange={e => setFormData({...formData, end_time: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Gedung/Lokasi</label>
              <input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link Google Maps</label>
              <input value={formData.maps_url} onChange={e => setFormData({...formData, maps_url: e.target.value})} className="w-full px-3 py-2 border rounded-lg" placeholder="https://goo.gl/maps/..." />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
              <textarea value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-3 py-2 border rounded-lg" rows={2} />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Batal</button>
            <button onClick={() => saveMutation.mutate(formData)} className="px-4 py-2 bg-primary-600 text-white rounded-lg">Simpan Acara</button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {events?.map(event => (
          <div key={event.id} className="bg-white p-5 rounded-xl border border-gray-200 flex justify-between items-start">
            <div>
              <h4 className="font-bold text-gray-900">{event.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{event.event_date} • {event.start_time} - {event.end_time}</p>
              <p className="text-sm text-gray-600 mt-2 flex items-start"><MapPin size={16} className="mr-1 mt-0.5" /> {event.location} - {event.address}</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => { setFormData(event as any); setIsAdding(true); }}
                className="text-blue-600 text-sm hover:underline"
              >Edit</button>
              <button onClick={() => deleteMutation.mutate(event.id)} className="text-red-600 hover:bg-red-50 p-1 rounded"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
        {events?.length === 0 && !isAdding && (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl border border-dashed">Belum ada acara yang ditambahkan.</div>
        )}
      </div>
    </div>
  );
};

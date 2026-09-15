import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { themeService } from '../../services/themeService';
import { clientService } from '../../services/clientService';
import { invitationService } from '../../services/invitationService';
import { CoupleInfoStep } from './editor-steps/CoupleInfoStep';
import { EventsStep } from './editor-steps/EventsStep';
import { StoryStep } from './editor-steps/StoryStep';
import { GalleryStep } from './editor-steps/GalleryStep';
import { MusicGiftStep } from './editor-steps/MusicGiftStep';
import { ThemeSettingsStep } from './editor-steps/ThemeSettingsStep';

const steps = [
  'Client & Theme',
  'Couple Info',
  'Events',
  'Story',
  'Gallery & Video',
  'Music & Gift',
  'Theme Content & Settings',
  'Publish'
];

export const InvitationEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isCreating = !id;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const clientId = searchParams.get('clientId');
  
  const [currentStep, setCurrentStep] = useState(0);

  // Form State for Step 1
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [selectedThemeId, setSelectedThemeId] = useState('');

  const { data: themes } = useQuery({
    queryKey: ['themes'],
    queryFn: themeService.getActiveThemes,
  });

  const { data: currentInvitation } = useQuery({
    queryKey: ['invitation', id],
    queryFn: () => invitationService.getInvitation(id!),
    enabled: !!id && !isCreating,
  });

  useEffect(() => {
    if (currentInvitation) {
      setTitle(currentInvitation.title || '');
      setSlug(currentInvitation.slug || '');
      setSelectedThemeId(currentInvitation.theme_id || '');
    }
  }, [currentInvitation]);

  const { data: client } = useQuery({
    queryKey: ['client', clientId],
    queryFn: () => clientService.getClient(clientId!),
    enabled: !!clientId && isCreating,
  });

  const createMutation = useMutation({
    mutationFn: invitationService.createInvitation,
    onSuccess: (data) => {
      navigate(`/admin/invitations/${data.id}`);
      setCurrentStep(1);
    },
    onError: (err) => {
      alert('Failed to create invitation. Make sure slug is unique.');
      console.error(err);
    }
  });

  const handleCreateInvitation = () => {
    if (!clientId) return alert('Client is required');
    if (!title || !slug || !selectedThemeId) return alert('Please fill all required fields');
    
    createMutation.mutate({
      client_id: clientId,
      theme_id: selectedThemeId,
      title,
      slug,
      status: 'draft'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {isCreating ? 'Create Invitation' : 'Edit Invitation'}
          </h1>
          {!isCreating && currentInvitation?.slug && (
            <a
              href={`/invitation/${currentInvitation.slug}`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>Lihat Undangan</span>
              <span className="text-sm">↗</span>
            </a>
          )}
        </div>
        <button 
          onClick={() => navigate('/admin/invitations')}
          className="text-gray-500 hover:text-gray-700 font-medium cursor-pointer"
        >
          Cancel
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row overflow-hidden min-h-[600px]">
        {/* Editor Sidebar / Steps */}
        <div className="w-full md:w-64 bg-gray-50 border-r border-gray-200 p-6">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Steps</h2>
          <nav className="space-y-1">
            {steps.map((step, index) => (
              <button
                key={step}
                disabled={isCreating && index > 0} // Lock other steps until created
                onClick={() => setCurrentStep(index)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  currentStep === index
                    ? 'bg-primary-100 text-primary-700'
                    : isCreating && index > 0 
                      ? 'text-gray-400 opacity-50 cursor-not-allowed' 
                      : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                {index + 1}. {step}
              </button>
            ))}
          </nav>
        </div>

        {/* Editor Content Area */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-3xl">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{steps[currentStep]}</h2>
            
            {currentStep === 0 && isCreating && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                  <p className="text-sm text-blue-800">
                    <strong>Selected Client:</strong> {client?.name || 'Loading...'}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Invitation Title *</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. The Wedding of Rizky & Aulia" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug *</label>
                    <div className="flex items-center">
                      <span className="bg-gray-100 border border-r-0 border-gray-300 px-3 py-2 rounded-l-lg text-gray-500 text-sm">wdgroup.com/</span>
                      <input type="text" value={slug} onChange={e => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} placeholder="rizky-aulia" className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Theme *</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {themes?.map(theme => (
                      <div 
                        key={theme.id}
                        onClick={() => setSelectedThemeId(theme.id)}
                        className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${
                          selectedThemeId === theme.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'
                        }`}
                      >
                        <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-3">
                        </div>
                        <h3 className="font-bold text-gray-900 text-sm">{theme.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{theme.category}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 0 && !isCreating && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Invitation Title *</label>
                    <input 
                      type="text" 
                      value={title} 
                      onChange={e => setTitle(e.target.value)} 
                      placeholder="e.g. The Wedding of Bagas & Siti" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug *</label>
                    <div className="flex items-center">
                      <span className="bg-gray-100 border border-r-0 border-gray-300 px-3 py-2 rounded-l-lg text-gray-500 text-sm">/invitation/</span>
                      <input 
                        type="text" 
                        value={slug} 
                        onChange={e => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} 
                        placeholder="bagas-siti" 
                        className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm" 
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Pilihan Tema</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {themes?.map(theme => (
                      <div 
                        key={theme.id}
                        onClick={() => setSelectedThemeId(theme.id)}
                        className={`cursor-pointer border-2 rounded-xl p-4 transition-all ${
                          selectedThemeId === theme.id ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500/20' : 'border-gray-200 hover:border-primary-300'
                        }`}
                      >
                        <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-3 overflow-hidden">
                          {theme.preview_image ? (
                            <img src={theme.preview_image} alt={theme.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-[#f4ede2] flex items-center justify-center text-xs text-gray-400">Preview</div>
                          )}
                        </div>
                        <h3 className="font-bold text-gray-900 text-sm">{theme.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">{theme.category}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => {
                      if (!title || !slug) return alert('Judul dan slug wajib diisi');
                      invitationService.updateInvitation(id!, { title, slug, theme_id: selectedThemeId })
                        .then(() => alert('Data undangan berhasil diperbarui!'))
                        .catch(err => { console.error(err); alert('Gagal memperbarui undangan'); });
                    }}
                    className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium text-sm transition-colors cursor-pointer"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            )}

            {currentStep === 1 && !isCreating && <CoupleInfoStep invitationId={id!} />}
            {currentStep === 2 && !isCreating && <EventsStep invitationId={id!} />}
            {currentStep === 3 && !isCreating && <StoryStep invitationId={id!} />}
            {currentStep === 4 && !isCreating && <GalleryStep invitationId={id!} />}
            {currentStep === 5 && !isCreating && <MusicGiftStep invitationId={id!} />}
            {currentStep === 6 && !isCreating && <ThemeSettingsStep invitationId={id!} />}

            {currentStep === 7 && (
              <div className="bg-green-50 text-green-800 p-4 rounded-lg border border-green-200 mb-6 text-center py-12">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Undangan Siap Dipublish!</h3>
                <p className="text-sm mb-6 max-w-md mx-auto">
                  Semua data (Mempelai, Acara, Cerita, Galeri & Video, Musik/Hadiah, dan Pengaturan Tema) telah tersimpan. Klik tombol Publish di bawah untuk mengaktifkan URL publik klien ini.
                </p>
                <button 
                  onClick={() => {
                    invitationService.updateInvitation(id!, { status: 'published' })
                      .then(() => {
                        alert('Yeay! Undangan berhasil dipublish.');
                        navigate('/admin/invitations');
                      })
                      .catch(err => {
                        console.error(err);
                        alert('Gagal mempublish undangan');
                      });
                  }}
                  className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors font-bold shadow-lg hover:shadow-xl cursor-pointer"
                >
                  Publish Sekarang
                </button>
              </div>
            )}

            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
              <button 
                disabled={currentStep === 0}
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                Previous
              </button>
              
              {currentStep === 0 && isCreating ? (
                <button 
                  onClick={handleCreateInvitation}
                  disabled={createMutation.isPending}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-bold disabled:opacity-50"
                >
                  {createMutation.isPending ? 'Saving...' : 'Save & Continue'}
                </button>
              ) : currentStep < steps.length - 1 ? (
                <button 
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Next Step
                </button>
              ) : (
                <div /> /* Hide the bottom publish button since we moved it to the center */
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

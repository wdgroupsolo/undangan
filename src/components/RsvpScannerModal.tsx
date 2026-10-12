import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Camera, 
  Upload, 
  Keyboard, 
  CheckCircle2, 
  RefreshCw, 
  AlertCircle, 
  Users, 
  Building2, 
  Volume2, 
  VolumeX, 
  QrCode,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import { rsvpService, RSVPItem } from '../services/rsvpService';
import { useToast } from '../context/ToastContext';

interface RsvpScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  invitations?: any[];
  selectedInvitationId?: string;
  onCheckInSuccess: (rsvp: RSVPItem, isNew: boolean) => void;
}

export const RsvpScannerModal: React.FC<RsvpScannerModalProps> = ({
  isOpen,
  onClose,
  invitations = [],
  selectedInvitationId = '',
  onCheckInSuccess,
}) => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<'camera' | 'upload' | 'manual'>('camera');
  const [invitationId, setInvitationId] = useState<string>(selectedInvitationId || '');

  // Scanner state
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [cameras, setCameras] = useState<Array<{ id: string; label: string }>>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Manual input state
  const [manualCode, setManualCode] = useState('');
  const [manualGuestCount, setManualGuestCount] = useState('1');

  // Success result state
  const [checkInResult, setCheckInResult] = useState<{
    rsvp: RSVPItem;
    isNew: boolean;
    rawCode: string;
  } | null>(null);

  // Demo blocked result state
  const [demoBlockedResult, setDemoBlockedResult] = useState<{
    rawCode: string;
    message: string;
  } | null>(null);

  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const readerElementId = 'qr-camera-reader-viewport';

  // Sync invitationId if prop changes
  useEffect(() => {
    if (selectedInvitationId) {
      setInvitationId(selectedInvitationId);
    } else if (invitations.length > 0 && !invitationId) {
      setInvitationId(invitations[0].id);
    }
  }, [selectedInvitationId, invitations]);

  // Synthesize pleasing audio beep on successful scan
  const playBeep = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // Note A5
      gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch {}
  };

  // Synthesize warning buzzer for blocked demo barcode
  const playBuzzer = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, audioCtx.currentTime); // Low warning buzzer
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.45);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.45);
    } catch {}
  };

  // Parse decoded QR or Barcode text
  const parseScannedData = (text: string) => {
    let name = '';
    let attendance: 'attending' | 'not_attending' | 'maybe' = 'attending';
    let code = '';
    let invId = invitationId;

    const trimmed = text.trim();

    // Check if piped format: e.g. INV:xxx|GUEST:Budi|ATT:attending|CODE:WD-1234
    if (trimmed.includes('|')) {
      const parts = trimmed.split('|');
      parts.forEach(part => {
        const [k, ...vParts] = part.split(':');
        const key = k?.trim().toUpperCase();
        const val = vParts.join(':').trim();
        if (key === 'GUEST' || key === 'NAME') name = val;
        if (key === 'INV') invId = val || invId;
        if (key === 'CODE') code = val;
        if (key === 'ATT') {
          if (val === 'hadir' || val === 'attending') attendance = 'attending';
          else if (val === 'maybe') attendance = 'maybe';
          else attendance = 'not_attending';
        }
      });
    } else if (trimmed.includes('?to=')) {
      // URL format: e.g. https://.../?to=Budi
      try {
        const url = new URL(trimmed.startsWith('http') ? trimmed : `https://dummy.com/${trimmed}`);
        const toParam = url.searchParams.get('to');
        if (toParam) name = decodeURIComponent(toParam.replace(/\+/g, ' ')).trim();
      } catch {}
    } else if (/^(WD|RWG|SG|MG|SF)-[A-Z0-9]+-[0-9]+/i.test(trimmed)) {
      // Direct ticket code: e.g. WD-JOGL-8492
      code = trimmed;
      name = trimmed;
    } else {
      // Plain text name
      name = trimmed;
    }

    return {
      name: name || trimmed,
      attendance,
      code,
      invitationId: invId || invitationId,
      raw: trimmed
    };
  };

  // Handle successful check-in
  const processCheckIn = async (rawText: string, guestCountNumber = 1) => {
    const parsed = parseScannedData(rawText);
    if (!parsed.name) {
      toast.error('Format Barcode / QR tidak valid.');
      return;
    }

    // Intercept Theme Demo Barcode (Demo Tema Portofolio di landing page)
    const upperRaw = rawText.toUpperCase();
    const upperCode = (parsed.code || '').toUpperCase();
    const isDemo = upperRaw.includes('DEMO-TESTIMONIAL-PORTOFOLIO-LOCKED') || 
      upperRaw.includes('DO-NOT-SCAN') || 
      upperCode.includes('WD-DEMO-SAMPLE') || 
      upperCode.includes('WD-DEMO-TESTIMONI');

    if (isDemo) {
      playBuzzer();
      setDemoBlockedResult({
        rawCode: rawText,
        message: 'Barcode ini adalah versi Demo Tema Portofolio. Sistem otomatis mengunci barcode demo sehingga tidak dapat dipindai untuk presensi tamu sungguhan.'
      });
      toast.info('Barcode Demo Tema Terdeteksi: Mode portofolio tidak dapat digunakan untuk presensi resmi.', 'Mode Demo Terkunci');
      return;
    }

    try {
      const activeInv = invitations.find(i => i.id === parsed.invitationId);
      const result = await rsvpService.checkInRsvp({
        invitation_id: parsed.invitationId || invitationId || (invitations[0]?.id || ''),
        name: parsed.name,
        attendance: parsed.attendance,
        number_of_guests: guestCountNumber,
        code: parsed.code,
        invitation_title: activeInv?.title,
        client_name: activeInv?.client?.name,
      });

      playBeep();
      setCheckInResult({
        rsvp: result.rsvp,
        isNew: result.isNew,
        rawCode: rawText,
      });
      onCheckInSuccess(result.rsvp, result.isNew);
      toast.success(`Check-in berhasil: ${result.rsvp.name}`);
    } catch (err: any) {
      if (err?.isDemoBlocked) {
        playBuzzer();
        setDemoBlockedResult({
          rawCode: rawText,
          message: 'Barcode ini adalah versi demo portofolio dan tidak dapat digunakan untuk presensi resmi.'
        });
        toast.info('Barcode Demo Terkunci.', 'Mode Demo');
      } else {
        toast.error('Gagal memverifikasi presensi tamu.');
      }
    }
  };

  // Initialize and start live camera scanner
  const startCamera = async (cameraIdToUse?: string) => {
    setCameraError(null);
    try {
      // Stop existing instance if running
      if (html5QrCodeRef.current) {
        try {
          if (html5QrCodeRef.current.isScanning) {
            await html5QrCodeRef.current.stop();
          }
          html5QrCodeRef.current.clear();
        } catch {}
      }

      // Check available cameras
      const devices = await Html5Qrcode.getCameras();
      if (!devices || devices.length === 0) {
        setCameraError('Tidak ada perangkat kamera yang terdeteksi.');
        return;
      }

      setCameras(devices.map(d => ({ id: d.id, label: d.label || `Kamera ${d.id}` })));

      const activeCamId = cameraIdToUse || selectedCameraId || devices[0].id;
      setSelectedCameraId(activeCamId);

      const html5QrCode = new Html5Qrcode(readerElementId);
      html5QrCodeRef.current = html5QrCode;

      await html5QrCode.start(
        activeCamId,
        {
          fps: 12,
          qrbox: { width: 240, height: 240 },
          aspectRatio: 1.0,
        },
        async (decodedText) => {
          // Temporarily pause on scan
          try {
            await html5QrCode.stop();
            setIsScanning(false);
          } catch {}
          processCheckIn(decodedText);
        },
        () => {
          // Ignore per-frame decode misses
        }
      );

      setIsScanning(true);
    } catch (err: any) {
      console.warn('Camera start error:', err);
      setCameraError(
        err?.message?.includes('Permission') 
          ? 'Izin akses kamera ditolak. Silakan izinkan akses kamera di browser Anda.' 
          : 'Gagal menghubungkan ke kamera. Gunakan fitur upload gambar atau input manual.'
      );
      setIsScanning(false);
    }
  };

  // Stop camera
  const stopCamera = async () => {
    if (html5QrCodeRef.current) {
      try {
        if (html5QrCodeRef.current.isScanning) {
          await html5QrCodeRef.current.stop();
        }
        html5QrCodeRef.current.clear();
      } catch {}
      html5QrCodeRef.current = null;
    }
    setIsScanning(false);
  };

  // Handle image file scan
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const scanner = new Html5Qrcode('qr-file-scan-temp');
      const decoded = await scanner.scanFile(file, true);
      processCheckIn(decoded);
    } catch {
      toast.error('Tidak dapat membaca Barcode atau QR Code dari gambar yang diunggah.');
    } finally {
      e.target.value = '';
    }
  };

  // Handle manual input submit
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) {
      toast.error('Mohon masukkan kode atau nama tamu');
      return;
    }
    processCheckIn(manualCode.trim(), parseInt(manualGuestCount, 10) || 1);
    setManualCode('');
  };

  // Resume camera for next guest scan
  const handleScanNext = () => {
    setCheckInResult(null);
    setDemoBlockedResult(null);
    setManualCode('');
    if (activeTab === 'camera') {
      startCamera();
    }
  };

  // Effects for open/close and tab switching
  useEffect(() => {
    if (isOpen && activeTab === 'camera' && !checkInResult && !demoBlockedResult) {
      // Delay slightly for modal DOM mount
      const timer = setTimeout(() => {
        startCamera();
      }, 300);
      return () => {
        clearTimeout(timer);
        stopCamera();
      };
    } else {
      stopCamera();
    }
  }, [isOpen, activeTab, checkInResult, demoBlockedResult]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
              <QrCode size={20} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">Scan Presensi Kehadiran Tamu</h3>
              <p className="text-xs text-gray-500">Scan Barcode / QR Code dari undangan tamu digital</p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              type="button"
              onClick={() => setSoundEnabled(v => !v)}
              className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              title={soundEnabled ? 'Matikan Suara Beep' : 'Aktifkan Suara Beep'}
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={19} />
            </button>
          </div>
        </div>

        {/* Target Invitation Filter Selector */}
        <div className="px-5 py-3 bg-gray-50/80 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-1.5 text-gray-600 font-medium">
            <Building2 size={15} className="text-gray-400" />
            <span>Klien Undangan:</span>
          </div>
          <select
            value={invitationId}
            onChange={(e) => setInvitationId(e.target.value)}
            className="w-full sm:w-auto bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-primary-500 font-medium"
          >
            <option value="">Semua Undangan / Otomatis</option>
            {invitations.map((inv) => (
              <option key={inv.id} value={inv.id}>
                {inv.title || inv.slug} ({inv.client?.name || 'Tanpa Klien'})
              </option>
            ))}
          </select>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-100 bg-gray-50/40 px-5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setActiveTab('camera');
              setCheckInResult(null);
              setDemoBlockedResult(null);
            }}
            className={`py-3 px-4 border-b-2 flex items-center space-x-2 transition-all cursor-pointer ${
              activeTab === 'camera'
                ? 'border-primary-600 text-primary-700 bg-white font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Camera size={15} />
            <span>Kamera Live</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('upload');
              setCheckInResult(null);
              setDemoBlockedResult(null);
            }}
            className={`py-3 px-4 border-b-2 flex items-center space-x-2 transition-all cursor-pointer ${
              activeTab === 'upload'
                ? 'border-primary-600 text-primary-700 bg-white font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Upload size={15} />
            <span>Unggah Foto QR</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('manual');
              setCheckInResult(null);
              setDemoBlockedResult(null);
            }}
            className={`py-3 px-4 border-b-2 flex items-center space-x-2 transition-all cursor-pointer ${
              activeTab === 'manual'
                ? 'border-primary-600 text-primary-700 bg-white font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Keyboard size={15} />
            <span>Scanner Gun / Manual</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1">
          
          {/* DEMO BLOCKED SCREEN */}
          {demoBlockedResult ? (
            <div className="bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-6 text-center animate-in zoom-in-95 duration-200 space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-amber-500 text-white flex items-center justify-center mx-auto shadow-md">
                <ShieldAlert size={34} />
              </div>

              <div>
                <span className="inline-block text-[11px] font-black tracking-wider uppercase text-amber-900 bg-amber-200/90 border border-amber-300 px-3.5 py-1 rounded-full mb-1.5">
                  🔒 BARCODE DEMO TERDETEKSI (TERKUNCI)
                </span>
                <h4 className="text-xl font-bold text-gray-900 mt-1">
                  Barcode Tidak Dapat Di-Scan
                </h4>
                <p className="text-xs text-amber-900/90 font-medium max-w-md mx-auto mt-2 leading-relaxed">
                  {demoBlockedResult.message}
                </p>

                <div className="mt-3 py-1.5 px-3 bg-white/90 border border-amber-200 rounded-lg inline-block text-[11px] font-mono text-gray-700">
                  Kode Terbaca: <span className="font-bold text-red-600 line-through">{demoBlockedResult.rawCode}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  type="button"
                  onClick={handleScanNext}
                  className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <span>Mengerti / Scan Barcode Lain</span>
                  <ArrowRight size={15} />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-medium text-xs py-3 px-5 rounded-xl transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          ) : checkInResult ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center animate-in zoom-in-95 duration-200 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 size={32} />
              </div>

              <div>
                <span className="inline-block text-[11px] font-bold tracking-wider uppercase text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full mb-1">
                  {checkInResult.isNew ? 'Presensi Tamu Baru Berhasil' : 'Terkonfirmasi Hadir'}
                </span>
                <h4 className="text-xl font-bold text-gray-900 mt-1">
                  {checkInResult.rsvp.name}
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  Status: <strong className="text-emerald-700">Hadir</strong> ({checkInResult.rsvp.number_of_guests || 1} orang tamu)
                </p>
                {checkInResult.rsvp.invitation?.title && (
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Acara: {checkInResult.rsvp.invitation.title}
                  </p>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                <button
                  type="button"
                  onClick={handleScanNext}
                  className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <span>Lanjut Scan Tamu Berikutnya</span>
                  <ArrowRight size={15} />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-medium text-xs py-3 px-5 rounded-xl transition-colors cursor-pointer"
                >
                  Selesai
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* TAB 1: LIVE CAMERA SCANNER */}
              {activeTab === 'camera' && (
                <div className="space-y-4">
                  {cameraError ? (
                    <div className="p-5 bg-rose-50 border border-rose-200 rounded-xl text-center space-y-3">
                      <AlertCircle className="w-8 h-8 text-rose-500 mx-auto" />
                      <p className="text-xs text-rose-700 leading-relaxed font-medium">
                        {cameraError}
                      </p>
                      <div className="flex justify-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => startCamera()}
                          className="inline-flex items-center space-x-1.5 px-4 py-2 bg-rose-600 text-white rounded-lg text-xs font-semibold hover:bg-rose-700 shadow-xs cursor-pointer"
                        >
                          <RefreshCw size={13} />
                          <span>Coba Lagi</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveTab('manual')}
                          className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-xs font-semibold hover:bg-gray-50 cursor-pointer"
                        >
                          Input Manual
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      {/* Viewport for html5-qrcode */}
                      <div className="relative w-full max-w-[320px] aspect-square rounded-2xl overflow-hidden bg-black shadow-inner border-2 border-gray-800">
                        <div id={readerElementId} className="w-full h-full object-cover" />

                        {/* Animated Laser Scanning Line */}
                        {isScanning && (
                          <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center">
                            {/* Scanning Target Corners */}
                            <div className="w-56 h-56 border-2 border-primary-400/70 rounded-xl relative shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                              <span className="absolute -top-1 -left-1 w-4 h-4 border-t-3 border-l-3 border-primary-500" />
                              <span className="absolute -top-1 -right-1 w-4 h-4 border-t-3 border-r-3 border-primary-500" />
                              <span className="absolute -bottom-1 -left-1 w-4 h-4 border-b-3 border-l-3 border-primary-500" />
                              <span className="absolute -bottom-1 -right-1 w-4 h-4 border-b-3 border-r-3 border-primary-500" />
                              
                              {/* Laser line moving vertically */}
                              <div 
                                className="w-full h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_8px_#ef4444]"
                                style={{
                                  animation: 'laser-scan 2s ease-in-out infinite alternate',
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Camera Selector (if multiple cameras available) */}
                      {cameras.length > 1 && (
                        <div className="mt-3 flex items-center space-x-2 text-xs text-gray-600">
                          <span>Pilih Kamera:</span>
                          <select
                            value={selectedCameraId}
                            onChange={(e) => {
                              setSelectedCameraId(e.target.value);
                              startCamera(e.target.value);
                            }}
                            className="bg-white border border-gray-300 rounded-md px-2 py-1 text-xs"
                          >
                            {cameras.map(cam => (
                              <option key={cam.id} value={cam.id}>
                                {cam.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      <p className="text-xs text-gray-500 text-center mt-3">
                        Posisikan Barcode atau QR Code tamu di dalam kotak pemindai kamera.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: UPLOAD IMAGE */}
              {activeTab === 'upload' && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-primary-500 transition-colors bg-gray-50/50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      id="qr-file-upload-input"
                      className="hidden"
                    />
                    <label
                      htmlFor="qr-file-upload-input"
                      className="flex flex-col items-center justify-center cursor-pointer space-y-3"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center shadow-xs">
                        <Upload size={24} />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-primary-600 hover:text-primary-700">
                          Klik untuk memilih foto / tangkapan layar
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, atau WebP yang memuat Barcode atau QR Code presensi tamu
                        </p>
                      </div>
                    </label>
                  </div>
                  <div id="qr-file-scan-temp" className="hidden" />
                </div>
              )}

              {/* TAB 3: MANUAL INPUT OR SCANNER GUN */}
              {activeTab === 'manual' && (
                <form onSubmit={handleManualSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                      Kode Tiket / Barcode / Nama Tamu
                    </label>
                    <input
                      type="text"
                      autoFocus
                      required
                      placeholder="Contoh: WD-JOGL-8492 atau scan via Barcode Scanner Gun..."
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono"
                    />
                    <p className="text-[11px] text-gray-500 mt-1">
                      Barcode Scanner Gun (USB/Bluetooth) akan otomatis mengisi dan menekan Enter.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">
                      Jumlah Tamu yang Hadir
                    </label>
                    <div className="flex items-center space-x-2">
                      <Users size={16} className="text-gray-400" />
                      <select
                        value={manualGuestCount}
                        onChange={(e) => setManualGuestCount(e.target.value)}
                        className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-primary-500"
                      >
                        <option value="1">1 Orang</option>
                        <option value="2">2 Orang</option>
                        <option value="3">3 Orang</option>
                        <option value="4">4 Orang</option>
                        <option value="5">5+ Orang</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-md transition-all active:scale-98 cursor-pointer mt-2"
                  >
                    Verifikasi Kehadiran Tamu
                  </button>
                </form>
              )}
            </>
          )}

        </div>

      </div>

      <style>{`
        @keyframes laser-scan {
          0% { transform: translateY(0px); opacity: 0.8; }
          100% { transform: translateY(220px); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
};

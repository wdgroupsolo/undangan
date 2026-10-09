import React, { useState, useEffect } from 'react';
import { siteSettingsService, SiteSettings } from '../services/siteSettingsService';
import { WebClientMaintenanceScreen } from './WebClientMaintenanceScreen';

export const WebClientGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(siteSettingsService.getSettingsSync());

  useEffect(() => {
    siteSettingsService.getSettings().then(setSettings);

    const handleSettingsChanged = (e: Event) => {
      const customEvent = e as CustomEvent<SiteSettings>;
      if (customEvent.detail) {
        setSettings(customEvent.detail);
      }
    };

    window.addEventListener('wedding:site-settings-changed', handleSettingsChanged);
    return () => window.removeEventListener('wedding:site-settings-changed', handleSettingsChanged);
  }, []);

  if (settings.client_status === 'paused') {
    return (
      <WebClientMaintenanceScreen
        brandName={settings.brand_name}
        title={settings.maintenance_title}
        message={settings.maintenance_message}
        contactPhone={settings.contact_phone}
      />
    );
  }

  return <>{children}</>;
};

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AdminLayout } from '../layouts/AdminLayout';
import { Login } from '../pages/admin/Login';
import { Dashboard } from '../pages/admin/Dashboard';
import { Clients } from '../pages/admin/Clients';
import { Themes } from '../pages/admin/Themes';
import { Invitations } from '../pages/admin/Invitations';
import { InvitationEditor } from '../pages/admin/InvitationEditor';
import { Guests } from '../pages/admin/Guests';
import { RSVP } from '../pages/admin/RSVP';
import { Analytics } from '../pages/admin/Analytics';
import { Settings } from '../pages/admin/Settings';
import { Home } from '../pages/public/Home';
import { ThemeCatalog } from '../pages/public/ThemeCatalog';
import { InvitationRenderer } from '../pages/invitation/InvitationRenderer';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/themes" element={<ThemeCatalog />} />
      
      {/* Admin Auth Route */}
      <Route path="/admin/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="clients" element={<Clients />} />
          <Route path="themes" element={<Themes />} />
          <Route path="invitations" element={<Invitations />} />
          <Route path="invitations/create" element={<InvitationEditor />} />
          <Route path="invitations/:id" element={<InvitationEditor />} />
          <Route path="guests" element={<Guests />} />
          <Route path="rsvp" element={<RSVP />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      {/* Public Invitation Route */}
      <Route path="/invitation/:slug" element={<InvitationRenderer />} />

      {/* 404 Catch All */}
      <Route path="*" element={<div className="p-8 text-center font-bold text-2xl">404 Not Found</div>} />
    </Routes>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-primary-50">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-primary-800 tracking-tighter">WD GROUP</div>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary-600 font-medium">Home</Link>
            <Link to="/themes" className="text-gray-600 hover:text-primary-600 font-medium">Themes</Link>
            <Link to="/features" className="text-gray-600 hover:text-primary-600 font-medium">Features</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/admin/login" className="text-primary-600 font-medium hover:text-primary-700">Login</Link>
          </div>
        </div>
      </header>

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-primary-900 tracking-tight mb-6">
            Beautiful Wedding Invitations
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Kelola dan buat undangan pernikahan digital dengan tema elegan, modern, dan profesional bersama WD Group.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/themes" className="bg-primary-600 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200">
              Lihat Tema
            </Link>
            <a href="#contact" className="bg-white text-primary-600 px-8 py-3 rounded-full text-lg font-bold hover:bg-primary-50 transition-colors border border-primary-200">
              Hubungi Kami
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

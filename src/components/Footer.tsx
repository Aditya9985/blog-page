import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-primary-50 via-white to-accent-50 border-t border-primary-100 shadow-inner mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-serif font-extrabold bg-gradient-to-r from-primary-600 via-accent-500 to-primary-400 bg-clip-text text-transparent">LC Corporate</span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-gray-500 text-base">{new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <span className="text-gray-600 text-base">Made with</span>
            <Heart className="h-5 w-5 mx-1 text-accent-500 animate-pop" />
            <span className="text-gray-600 text-base">by the LC Corporate Team</span>
            <a href="https://github.com/lc-corporate" target="_blank" rel="noopener noreferrer" className="ml-3 text-gray-400 hover:text-primary-500 transition-colors">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
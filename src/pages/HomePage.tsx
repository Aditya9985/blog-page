import React from 'react';
import BlogList from '../components/BlogList';


const HomePage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-16 md:py-24 mb-10 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-extrabold font-serif bg-gradient-to-r from-primary-600 via-accent-500 to-primary-400 bg-clip-text text-transparent drop-shadow-lg mb-4 animate-pop">
          Welcome to LC Corporate Blogosphere
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto mb-8 animate-fade-in">
          Discover, share, and connect with the latest insights, stories, and trends from our vibrant community.
        </p>
        <a
          href="#latest-posts"
          className="btn-gradient !bg-black !text-white !px-12 !py-5 !text-2xl !rounded-full !shadow-2xl hover:scale-105 transform transition-all duration-300 ease-out hover:shadow-3xl relative group animate-pulse-slow"
          style={{ 
            background: '#111827', 
            color: '#fff', 
            fontWeight: 800, 
            fontSize: '2rem', 
            padding: '1.25rem 3rem', 
            borderRadius: '9999px',
            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
          }}
        >
          <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
            Explore Latest Posts
          </span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400 to-accent-400 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300 -z-10"></div>
        </a>
      </section>
      <div id="latest-posts">
        <BlogList />
      </div>
    </>
  );
};

export default HomePage;
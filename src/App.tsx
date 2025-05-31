import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AddBlogPage from './pages/AddBlogPage';
import BlogDetailPage from './pages/BlogDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="add" element={<AddBlogPage />} />
        <Route path="blog/:id" element={<BlogDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
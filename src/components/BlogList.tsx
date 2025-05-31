import React, { useState, useMemo } from 'react';
import BlogCard from './BlogCard';
import { useBlogContext } from '../context/BlogContext';
import { Search, Filter } from 'lucide-react';

const BlogList: React.FC = () => {
  const { blogs } = useBlogContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');

  // Get unique tags from all blogs
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogs.forEach(blog => blog.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, [blogs]);

  // Filter blogs based on search term and selected tag
  const filteredBlogs = useMemo(() => {
    return blogs
      .filter(blog => {
        const matchesSearch = searchTerm === '' || 
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.summary.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesTag = selectedTag === '' || blog.tags.includes(selectedTag);
        
        return matchesSearch && matchesTag;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [blogs, searchTerm, selectedTag]);

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="font-serif text-4xl font-extrabold text-primary-700 mb-2 drop-shadow">Latest Posts</h1>
          <p className="text-lg text-gray-700">Discover thoughts, stories, and ideas from our community</p>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-300" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-2 w-full sm:w-64 rounded-full border border-primary-200 bg-white/80 shadow focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent-300" />
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="pl-12 pr-8 py-2 rounded-full border border-accent-200 bg-white/80 shadow appearance-none focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent cursor-pointer transition-all"
            >
              <option value="">All tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-16 bg-white/80 rounded-2xl shadow-lg animate-fade-in">
          <div className="mb-4">
            <Search className="h-14 w-14 text-primary-200 mx-auto animate-bounce" />
          </div>
          <h2 className="text-2xl font-bold text-primary-700 mb-2">No posts found</h2>
          <p className="text-gray-600 text-lg">
            {searchTerm || selectedTag
              ? "Try adjusting your search or filter criteria."
              : "Be the first to add a blog post!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
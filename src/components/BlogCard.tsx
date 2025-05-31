import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Blog } from '../types/blog';
import { Calendar, Clock, Tag, Share2 } from 'lucide-react';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.summary,
          url: `${window.location.origin}/blog/${blog.id}`,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Card */}
      <article className="glass-card rounded-2xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.025] group animate-fade-in overflow-visible p-7">
        {/* Meta Info */}
        <div className="flex items-center justify-between text-gray-500 text-sm mb-3">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <time dateTime={blog.createdAt}>
              {format(new Date(blog.createdAt), 'MMMM d, yyyy')}
            </time>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{blog.readingTime}</span>
            </div>
            <button
              onClick={handleShare}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Share post"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Title & Summary */}
        <h2 className="font-serif font-extrabold text-2xl md:text-3xl text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors drop-shadow">
          <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
        </h2>
        <p className="text-gray-700 mb-4 line-clamp-3 text-lg">{blog.summary}</p>

        {/* Tags */}
        {blog.tags.length > 0 && (
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Tag className="h-4 w-4 text-accent-400" />
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700 rounded-full text-xs font-semibold shadow hover:from-primary-200 hover:to-accent-200 transition-colors cursor-pointer border border-primary-100"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {/* More Button - OUTSIDE */}
      <div className="pl-2">
        <Link
          to={`/blog/${blog.id}`}
          className="btn-gradient inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full shadow-md group transition-transform hover:scale-105"
          style={{
            fontSize: '0.85rem',
            boxShadow: '0 2px 8px 0 rgba(0,0,0,0.12)',
          }}
        >
          More
          <svg
            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
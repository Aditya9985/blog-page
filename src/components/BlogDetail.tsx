import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useBlogContext } from '../context/BlogContext';
import { Calendar, Clock, Tag, Share2, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getBlogById } = useBlogContext();
  const navigate = useNavigate();
  
  const blog = id ? getBlogById(id) : undefined;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog?.title,
          text: blog?.summary,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  if (!blog) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Blog post not found</h2>
        <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/" 
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto animate-slide-up">
      <div className="mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back
        </button>
      </div>
      
      <header className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-6">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            <time dateTime={blog.createdAt}>
              {format(new Date(blog.createdAt), 'MMMM d, yyyy')}
            </time>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            <span>{blog.readingTime}</span>
          </div>
          
          <button
            onClick={handleShare}
            className="inline-flex items-center hover:text-gray-700 transition-colors"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Share
          </button>
        </div>

        {blog.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="h-5 w-5 text-gray-400" />
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {blog.content}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export default BlogDetail;
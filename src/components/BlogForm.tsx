import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useBlogContext } from '../context/BlogContext';
import { BlogFormData } from '../types/blog';
import { X } from 'lucide-react';

const BlogForm: React.FC = () => {
  const navigate = useNavigate();
  const { addBlog } = useBlogContext();
  const [tags, setTags] = React.useState<string[]>([]);
  const [tagInput, setTagInput] = React.useState('');
  
  const { 
    register, 
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BlogFormData>();

  const content = watch('content', '');
  const estimatedReadingTime = Math.ceil(content.split(/\s+/).length / 200);

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const onSubmit = (data: BlogFormData) => {
    addBlog({
      ...data,
      tags,
      createdAt: new Date().toISOString(),
    });
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto animate-slide-up">
      <h1 className="font-serif text-3xl font-bold text-gray-900 mb-2">Create a New Blog Post</h1>
      <p className="text-gray-600 mb-8">Share your thoughts, ideas, and stories with the world</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            className={`w-full px-4 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
            placeholder="Enter a catchy title"
            {...register('title', { 
              required: 'Title is required',
              maxLength: { value: 100, message: 'Title must be less than 100 characters' }
            })}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
            Summary
          </label>
          <textarea
            id="summary"
            rows={3}
            className={`w-full px-4 py-2 border ${errors.summary ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500`}
            placeholder="Write a brief summary of your blog post"
            {...register('summary', { 
              required: 'Summary is required',
              maxLength: { value: 200, message: 'Summary must be less than 200 characters' }
            })}
          />
          {errors.summary && (
            <p className="mt-1 text-sm text-red-500">{errors.summary.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md mb-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 hover:text-primary-800"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder={tags.length === 0 ? "Add tags (press Enter or comma to add)" : ""}
              className="flex-1 min-w-[120px] outline-none bg-transparent"
            />
          </div>
          <p className="text-sm text-gray-500">Press Enter or comma to add a tag</p>
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <div className="mb-2">
            <span className="text-sm text-gray-500">
              Estimated reading time: {estimatedReadingTime} min
            </span>
          </div>
          <textarea
            id="content"
            rows={15}
            className={`w-full px-4 py-2 border ${errors.content ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 font-mono text-sm`}
            placeholder="Write your blog post content here... (Markdown supported)"
            {...register('content', { 
              required: 'Content is required',
              minLength: { value: 50, message: 'Content must be at least 50 characters' }
            })}
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>
          )}
          <p className="mt-2 text-sm text-gray-500">
            Supports Markdown formatting
          </p>
        </div>
        
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors disabled:opacity-70"
          >
            {isSubmitting ? 'Publishing...' : 'Publish Blog'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
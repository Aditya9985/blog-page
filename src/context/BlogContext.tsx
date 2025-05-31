import React, { createContext, useState, useEffect, useContext } from 'react';
import { Blog, BlogFormData } from '../types/blog';

// Custom reading time calculation function
const calculateReadingTime = (text: string): string => {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

interface BlogContextType {
  blogs: Blog[];
  addBlog: (blog: BlogFormData) => void;
  getBlogById: (id: string) => Blog | undefined;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function useBlogContext() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlogContext must be used within a BlogProvider');
  }
  return context;
}

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  
  useEffect(() => {
    const savedBlogs = localStorage.getItem('blogs');
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    } else {
      const sampleBlogs: Blog[] = [
        {
          id: '1',
          title: 'Getting Started with React',
          content: '# Getting Started with React\n\nReact is a popular JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update the DOM when data changes.\n\n## Components\n\nComponents are the building blocks of React applications. They are reusable pieces of code that return React elements describing what should appear on the screen.\n\nThere are two types of components:\n- Function components\n- Class components\n\nFunction components are simpler and more modern, especially with the introduction of Hooks in React 16.8.\n\n## Creating Your First App\n\nTo create a basic React app, you can use Create React App, a command-line tool that sets up a new React project with a good default configuration:\n\n```bash\nnpx create-react-app my-app\n```\n\nOnce your app is set up, you can start building components, managing state, and handling user interactions. React\'s declarative approach makes it easier to understand and debug your code, while its virtual DOM implementation ensures efficient updates.',
          summary: 'Learn the basics of React and how to set up your first application with practical examples and best practices.',
          createdAt: '2023-10-15T14:30:00Z',
          tags: ['React', 'JavaScript', 'Web Development'],
          readingTime: '3 min read'
        },
        {
          id: '2',
          title: 'Modern CSS Techniques',
          content: '# Modern CSS Techniques\n\nCSS has evolved significantly over the years, with modern features that make styling web applications more powerful and flexible than ever before.\n\n## Layout Systems\n\n### CSS Grid\nCSS Grid is perfect for two-dimensional layouts. Here\'s a basic example:\n\n```css\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}\n```\n\n### Flexbox\nFlexbox excels at one-dimensional layouts:\n\n```css\n.flex-container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n```\n\n## CSS Custom Properties\n\nCSS Variables allow you to define reusable values:\n\n```css\n:root {\n  --primary-color: #3b82f6;\n}\n\n.button {\n  background-color: var(--primary-color);\n}\n```\n\n## Modern Selectors\n\nNew selectors provide more flexibility:\n\n- `:is()`\n- `:where()`\n- `:has()`\n\nThese features make CSS more powerful and maintainable than ever before.',
          summary: 'Discover modern CSS techniques including Grid, Flexbox, CSS variables, and advanced selectors to elevate your web styling.',
          createdAt: '2023-11-20T09:15:00Z',
          tags: ['CSS', 'Web Design', 'Frontend'],
          readingTime: '4 min read'
        },
      ];
      setBlogs(sampleBlogs);
      localStorage.setItem('blogs', JSON.stringify(sampleBlogs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('blogs', JSON.stringify(blogs));
  }, [blogs]);

  const addBlog = (blog: BlogFormData) => {
    const readingTime = calculateReadingTime(blog.content);
    const newBlog: Blog = {
      ...blog,
      id: crypto.randomUUID(),
      readingTime,
    };
    
    setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
  };

  const getBlogById = (id: string) => {
    return blogs.find((blog) => blog.id === id);
  };

  const value = {
    blogs,
    addBlog,
    getBlogById,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
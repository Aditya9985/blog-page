export interface Blog {
  id: string;
  title: string;
  content: string;
  summary: string;
  createdAt: string;
  tags: string[];
  readingTime?: string;
}

export type BlogFormData = Omit<Blog, 'id' | 'readingTime'>;
export interface ICategories {
  id: number;
  name: string;
  created_at: string;
  description: string;
}

export interface IPosts {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  created_at: string;
  updated_at: string;
  categories: Category;
  thumbnail: string;
  summary: string;
}

interface Category {
  name: string;
}

export interface IFormCategory {
  name: string;
  description: string;
}

export interface ImenuBar {
  name: string;
  code: string;
}

export interface IFormPost {
  title: string;
  author: string;
  category: number;
  image: string;
  summary: string;
}

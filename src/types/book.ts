export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BorrowRecord {
  id: string;
  bookId: string;
  bookTitle: string;
  isbn: string;
  quantity: number;
  dueDate: Date;
  borrowedAt: Date;
}

export interface BookFormData {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
}

export interface BorrowFormData {
  quantity: number;
  dueDate: Date;
}
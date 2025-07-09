# Minimal Library Management System 📚

## Project Overview

This project is a minimal library management system built using **React**, **Redux Toolkit Query (RTK Query)**, and **TypeScript**. It enables users to:

- View a list of books
- Perform CRUD operations on books
- Borrow books
- View a simple borrow summary

All functionality is implemented on the client side interacting with a RESTful API. This project focuses on core features without authentication, category filters, or payment integration. The goal is to showcase clean UI design, proper state management, and essential library management functionality.

---

## Live Demo

[Try the live application here](https://your-live-link-here.com)  
*Replace the URL above with your actual deployed app link.*

---

## Features

### 1. Public Routes 🚀

- All pages are accessible without login or authentication.
- Focus on essential book and borrowing features only.

### 2. Book Management 🛠️

- **Book List Table**  
  Displays all books in a table with columns:  
  `Title`, `Author`, `Genre`, `ISBN`, `Copies`, `Availability`, and `Actions`.

- **Actions**  
  - **Edit Book:** Opens a form pre-filled with book data to update info. Changes update via API and reflect instantly.  
  - **Delete Book:** Confirmation dialog before deletion.  
  - **Borrow Book:** Opens a form to borrow copies of the book.

- **Business Logic**  
  - If `copies` is set to 0, the book is marked as unavailable.

- **Add New Book**  
  - Button to open a form to add a new book.  
  - Fields: `Title`, `Author`, `Genre`, `ISBN`, `Description`, `Copies`, `Available` (optional, defaults to true).  
  - After creation, redirects to the book list and updates UI immediately.

### 3. Borrow Book

- Accessed from the “Borrow” button in the book list.
- Form fields:  
  `Quantity` (number), `Due Date` (date).
- **Business Logic**  
  - Quantity cannot exceed available copies.  
  - When copies reach 0, the book is marked unavailable.
- On successful borrow, shows a success message and redirects to the borrow summary page.

### 4. Borrow Summary

- Displays a list of borrowed books with total quantity borrowed for each.
- Data is retrieved from an aggregation API.
- Columns: `Book Title`, `ISBN`, `Total Quantity Borrowed`.

---

## Landing Page Components

- **Navbar**  
  Simple navigation with links to:  
  - All Books  
  - Add Book  
  - Borrow Summary

- **Book Table/List/Grid**  
  Shows books with all core actions (view, edit, delete, borrow).

- **Footer**  
  Standard footer with site information or credits.

---

## Page List

- `/books` – List all books with options to view, edit, delete, and borrow.  
- `/create-book` – Form to add a new book.  
- `/books/:id` – Detailed view of a single book’s information.  
- `/borrow-summary` – Aggregated summary of all borrowed books.

---

## Tech Stack

- React  
- Redux Toolkit Query (RTK Query)  
- TypeScript  
- RESTful API (backend not included)

---

## Getting Started

1. Clone the repository  
2. Install dependencies (`npm install` or `yarn`)  
3. Run the development server (`npm start` or `yarn dev`)  
4. Connect to your RESTful API backend  

 
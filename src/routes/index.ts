import MainLayOut from "@/MainLayout/MainLayout";
import AllBooks from "@/components/pages/AllBooks/AllBooks";
import BookDetails from "@/components/pages/BookDetails/BookDetails";
import BorrowSummary from "@/components/pages/BorrowSummary/BorrowSummary";
import CreateBook from "@/components/pages/CreateBook/CreateBook";

import Home from "@/components/pages/Home/Home";

import { createBrowserRouter } from "react-router";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: MainLayOut,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/books",
        Component: AllBooks,
      },

      {
        path: "/books/:id",
        Component: BookDetails,
      },
      {
        path: "/create-book",
        Component: CreateBook,
      },
      {
        path: "/borrow-summary",
        Component: BorrowSummary,
      }
    ],
  },
]);

export default routes;

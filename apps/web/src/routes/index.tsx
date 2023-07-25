import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home";
import InvoicesPage from "../pages/Invoices";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/invoices",
    element: <InvoicesPage />,
  },
]);

export default router;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/home/page";
import RootLayout from "./pages/layout";
import AuthLayout from "./pages/authentication/layout";
import SigninPage from "./pages/authentication/signin";
import SignupPage from "./pages/authentication/signup";
import { Provider } from "react-redux";
import { store } from "./store";
import DashboardLayout from "./pages/dashboard/layout";
import ProductList from "./pages/dashboard/productList";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          { path: "signin/*", element: <SigninPage /> },
          { path: "signup/*", element: <SignupPage /> },
        ],
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <ProductList />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);

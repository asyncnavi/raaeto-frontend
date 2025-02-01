import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/home/page";
import RootLayout from "./pages/layout";
import AuthLayout from "./pages/authentication/layout";
import SigninPage from "./pages/authentication/signIn.tsx";
import SignupPage from "./pages/authentication/signUp.tsx";
import { Provider } from "react-redux";
import { store } from "./store";
import DashboardLayout from "./pages/dashboard/layout";
import ProductList from "./pages/product/list.tsx";
import ProductDetail from "./pages/product/detail.tsx";
import {HeroUIProvider} from "@heroui/react";

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
      {
        path: "/product/:id",
        element : <ProductDetail />
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <HeroUIProvider>
        <RouterProvider router={router} />
      </HeroUIProvider>
    </Provider>
  </StrictMode>,
);

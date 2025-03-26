import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/home/page";
import BaseLayout from "./layouts/base.tsx";
import AuthLayout from "./layouts/auth.tsx";
import SigninPage from "./pages/authentication/signIn.tsx";
import SignupPage from "./pages/authentication/signUp.tsx";
import { Provider } from "react-redux";
import { store } from "./store";
import OrganizationLayout from "./layouts/organization.tsx";
import {HeroUIProvider} from "@heroui/react";
import OrganizationDashboard from "./pages/organization/dashboard.tsx";
import SingleProductPage from "./pages/organization/products/single.tsx";

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
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
        path: "/o",
        element: <OrganizationLayout />,
        children: [
          {
            path: "",
            element: <OrganizationDashboard />,
          },
          {
            path: "product/:id",
            element : <SingleProductPage />
          },
        ],
      }
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

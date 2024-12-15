import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="container mx-auto flex justify-center py-4">
      <Outlet />
    </div>
  );
}

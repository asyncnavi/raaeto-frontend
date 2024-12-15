import { Outlet } from "react-router-dom";
import Header from "../../shared/header";

const DashboardLayout = () => {
  return (
    <div>
      <Header />
      <main className="py-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

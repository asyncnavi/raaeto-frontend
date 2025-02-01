import { Outlet } from "react-router-dom";
import Header from "../../shared/header.tsx";
const DashboardLayout = () => {
  return (
    <div>
      <Header />

        <main className="py-4 px-2 container mx-auto">
            <h2 className="text-2xl font-bold">Dashboard</h2>

            <Outlet/>
        </main>
    </div>
  );
};

export default DashboardLayout;

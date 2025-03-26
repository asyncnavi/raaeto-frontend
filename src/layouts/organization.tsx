import { Outlet } from "react-router-dom";
import Header from "@/components/common/header";

const OrganizationLayout = () => {
  return (
    <div>
        <Header />
        <main className="py-4 px-2 container mx-auto">
            <Outlet/>
        </main>
    </div>
  );
};

export default OrganizationLayout;

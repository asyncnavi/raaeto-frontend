import { IconArrowLeft } from "@tabler/icons-react";
import Header from "../../shared/header";

const SingeleProductPage = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto py-4">
        <div className="text-xl flex items-end gap-2 underline">
          <div className="border-2 border-black shadow-[4px_4px_black] hover:text-lime-400 hover:shadow-[4px_4px_#a3e635] transition-all .3s ease-in cursor-pointer  w-10 h-10  flex justify-center items-center rounded-lg ">
            <IconArrowLeft />
          </div>
          <span>Product / </span>
          <span>Good Product</span>
        </div>
      </main>
    </div>
  );
};

export default SingeleProductPage;
